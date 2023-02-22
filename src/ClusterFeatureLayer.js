import { setOptions, GeoJSON, markerClusterGroup } from 'leaflet';
import { FeatureManager } from 'esri-leaflet';
import packageInfo from '../package.json';
var version = packageInfo.version;
export { version as VERSION };

export var FeatureLayer = FeatureManager.extend({

  statics: {
    EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
    CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
  },

  /**
   * Constructor
   */

  initialize: function (options) {
    FeatureManager.prototype.initialize.call(this, options);

    options = setOptions(this, options);

    this._layers = {};
    this._leafletIds = {};

    this.cluster = markerClusterGroup(options);
    this._key = 'c' + (Math.random() * 1e9).toString(36).replace('.', '_');

    this.cluster.addEventParent(this);
  },

  /**
   * Layer Interface
   */

  onAdd: function (map) {
    FeatureManager.prototype.onAdd.call(this, map);
    this._map.addLayer(this.cluster);
  },

  onRemove: function (map) {
    FeatureManager.prototype.onRemove.call(this, map);
    this._map.removeLayer(this.cluster);
  },

  /**
   * Feature Management Methods
   */

  createNewLayer: function (geojson) {
    var layer = GeoJSON.geometryToLayer(geojson, this.options);
    // trap for GeoJSON without geometry
    if (layer) {
      layer.defaultOptions = layer.options;
    }
    return layer;
  },

  createLayers: function (features) {
    var markers = [];

    for (var i = features.length - 1; i >= 0; i--) {
      var geojson = features[i];
      var layer = this._layers[geojson.id];

      if (!layer) {
        layer = this.createNewLayer(geojson);
        layer.feature = GeoJSON.asFeature(geojson);
        layer.defaultOptions = layer.options;
        layer._leaflet_id = this._key + '_' + geojson.id;

        this.resetStyle(layer.feature.id);

        // cache the layer
        this._layers[layer.feature.id] = layer;

        this._leafletIds[layer._leaflet_id] = geojson.id;

        if (this.options.onEachFeature) {
          this.options.onEachFeature(layer.feature, layer);
        }

        this.fire('createfeature', {
          feature: layer.feature
        });
      }

      // add the layer if it is within the time bounds or our layer is not time enabled
      if (!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson))) {
        markers.push(layer);
      }
    }

    if (markers.length) {
      this.cluster.addLayers(markers);
    }
  },

  addLayers: function (ids) {
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

  removeLayers: function (ids, permanent) {
    var layersToRemove = [];
    for (var i = ids.length - 1; i >= 0; i--) {
      var id = ids[i];
      var layer = this._layers[id];
      this.fire('removefeature', {
        feature: layer.feature,
        permanent: permanent
      });
      layersToRemove.push(layer);
      if (this._layers[id] && permanent) {
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

    if (layer) {
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

  // This is the same as the Layer.openPopup method except it excludes the `FeatureGroup`
  // logic to work around https://github.com/Leaflet/Leaflet/issues/8761
  openPopup (latlng) {
    if (this._popup) {
      if (this._popup._prepareOpen(latlng || this._latlng)) {
        // open the popup on the map
        this._popup.openOn(this._map);
      }
    }
    return this;
  },

  // This is the same as the `Layer.openTooltip` method except it excludes the `FeatureGroup`
  // logic to work around https://github.com/Leaflet/Leaflet/issues/8761
  openTooltip (latlng) {
    if (this._tooltip) {
      if (this._tooltip._prepareOpen(latlng)) {
        // open the tooltip on the map
        this._tooltip.openOn(this._map);

        if (this.getElement) {
          this._setAriaDescribedByOnLayer(this);
        } else if (this.eachLayer) {
          this.eachLayer(this._setAriaDescribedByOnLayer, this);
        }
      }
    }
    return this;
  }
});

export function featureLayer (options) {
  return new FeatureLayer(options);
}

export default featureLayer;
