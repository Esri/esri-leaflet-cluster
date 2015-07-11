/*! esri-leaflet-clustered-feature-layer - v1.0.2 - 2015-07-11
*   Copyright (c) 2015 Environmental Systems Research Institute, Inc.
*   Apache License*/
(function (factory) {
  // define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet', 'esri-leaflet'], function (L, Esri) {
      return factory(L, Esri);
    });

  // define a common js module that relies on 'leaflet'
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('leaflet'), require('esri-leaflet'));
  }

  // define globals if we can find the proper place to attach them to.
  if(window && window.L && window.L.esri) {
    var ClusteredFeatureLayer = factory(L, L.esri);

    window.L.esri.Layers.ClusteredFeatureLayer = ClusteredFeatureLayer;

    window.L.esri.Layers.clusteredFeatureLayer = function(options){
      return new ClusteredFeatureLayer(options);
    };

    window.L.esri.ClusteredFeatureLayer = ClusteredFeatureLayer;

    window.L.esri.clusteredFeatureLayer = function(options){
      return new ClusteredFeatureLayer(options);
    };
  }
}(function (L, Esri) {

  var ClusteredFeatureLayer = Esri.Layers.FeatureManager.extend({

    statics: {
      EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
      CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
    },

    /**
     * Constructor
     */

    initialize: function (options) {
      Esri.Layers.FeatureManager.prototype.initialize.call(this, options);

      options = L.setOptions(this, options);

      this._layers = {};
      this._leafletIds = {};

      this.cluster = new window.L.MarkerClusterGroup(options);
      this._key = 'c'+(Math.random() * 1e9).toString(36).replace('.', '_');

      // @TODO enable at Leaflet 0.8
      // this.cluster.addEventParent(this);

      // @TODO remove from Leaflet 0.8
      this.cluster.on(ClusteredFeatureLayer.EVENTS, this._propagateEvent, this);
      this.cluster.on(ClusteredFeatureLayer.CLUSTEREVENTS, this._propagateClusterEvent, this);
    },

    /**
     * Layer Interface
     */

    onAdd: function(map){
      Esri.Layers.FeatureManager.prototype.onAdd.call(this, map);
      this._map.addLayer(this.cluster);
    },

    onRemove: function(map){
      Esri.Layers.FeatureManager.prototype.onRemove.call(this, map);
      this._map.removeLayer(this.cluster);
    },

    /**
     * Feature Managment Methods
     */

    createLayers: function(features){
      var markers = [];

      for (var i = features.length - 1; i >= 0; i--) {
        var geojson = features[i];
        var layer = this._layers[geojson.id];

        if(!layer){
          // @TODO Leaflet 0.8
          //newLayer = L.GeoJSON.geometryToLayer(geojson, this.options);

          var newLayer = L.GeoJSON.geometryToLayer(geojson, this.options.pointToLayer, L.GeoJSON.coordsToLatLng, this.options);
          newLayer.feature = L.GeoJSON.asFeature(geojson);
          newLayer.defaultOptions = newLayer.options;
          newLayer._leaflet_id = this._key + '_' + geojson.id;

          this.resetStyle(newLayer.feature.id);

          // bind a popup if we have one
          if(this._popup && newLayer.bindPopup){
            newLayer.bindPopup(this._popup(newLayer.feature, newLayer));
          }

          // cache the layer
          this._layers[newLayer.feature.id] = newLayer;

          this._leafletIds[newLayer._leaflet_id] = geojson.id;

          if(this.options.onEachFeature){
            this.options.onEachFeature(newLayer.feature, newLayer);
          }

          this.fire('createfeature', {
            feature: newLayer.feature
          });

          // add the layer if it is within the time bounds or our layer is not time enabled
          if(!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson)) ){
            markers.push(newLayer);
          }
        }
      }

      if(markers.length){
        this.cluster.addLayers(markers);
      }
    },

    addLayers: function(ids){
      var layersToAdd = [];
      for (var i = ids.length - 1; i >= 0; i--) {
        var layer = this._layers[ids[i]];
        this.fire('addfeature', {
          feature: layer.feature
        });
        layersToAdd.push(layer);
      }
      this.cluster.addLayers(layersToAdd);
    },

    removeLayers: function(ids, permanent){
      var layersToRemove = [];
      for (var i = ids.length - 1; i >= 0; i--) {
        var id = ids[i];
        var layer = this._layers[id];
        this.fire('removefeature', {
          feature: layer.feature,
          permanent: permanent
        });
        layersToRemove.push(layer);
        if(this._layers[id] && permanent){
          delete this._layers[id];
        }
      }
      this.cluster.removeLayers(layersToRemove);
    },

    /**
     * Styling Methods
     */

    resetStyle: function (id) {
      var layer = this._layers[id];

      if(layer){
        layer.options = layer.defaultOptions;
        this.setFeatureStyle(layer.feature.id, this.options.style);
      }

      return this;
    },

    setStyle: function (style) {
      this.eachFeature(function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
      }, this);
      return this;
    },

    setFeatureStyle: function (id, style) {
      var layer = this._layers[id];

      if (typeof style === 'function') {
        style = style(layer.feature);
      }
      if (layer.setStyle) {
        layer.setStyle(style);
      }
    },

    /**
     * Popup Methods
     */

    bindPopup: function (fn, options) {
      this._popup = fn;
      for (var i in this._layers) {
        var layer = this._layers[i];
        var popupContent = this._popup(layer.feature, layer);
        layer.bindPopup(popupContent, options);
      }
    },

    unbindPopup: function () {
      this._popup =  false;
      for (var i in this._layers) {
        this._layers[i].unbindPopup();
      }
    },

    /**
     * Utility Methods
     */

    eachFeature: function (fn, context) {
      for (var i in this._layers) {
        fn.call(context, this._layers[i]);
      }
      return this;
    },

    getFeature: function (id) {
      return this._layers[id];
    },

    // from https://github.com/Leaflet/Leaflet/blob/v0.7.2/src/layer/FeatureGroup.js
    //  @TODO remove at Leaflet 0.8
    _propagateEvent: function (e) {
      e = L.extend({
        layer: this._layers[this._leafletIds[e.target._leaflet_id]],
        target: this
      }, e);
      this.fire(e.type, e);
    },

    _propagateClusterEvent: function (e) {
      e = L.extend({
        layer: e.target,
        target: this
      }, e);
      this.fire(e.type, e);
    }
  });

  return ClusteredFeatureLayer;
}));

//# sourceMappingURL=esri-leaflet-clustered-feature-layer-src.js.map