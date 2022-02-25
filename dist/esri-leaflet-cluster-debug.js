/* esri-leaflet-cluster - v3.0.0 - Fri Feb 25 2022 10:54:49 GMT-0600 (Central Standard Time)
 * Copyright (c) 2022 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leaflet'), require('esri-leaflet')) :
  typeof define === 'function' && define.amd ? define(['exports', 'leaflet', 'esri-leaflet'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.L = global.L || {}, global.L.esri = global.L.esri || {}, global.L.esri.Cluster = {}), global.L, global.L.esri));
})(this, (function (exports, leaflet, esriLeaflet) { 'use strict';

  var name = "esri-leaflet-cluster";
  var description = "Esri Leaflet plugin for visualizing Feature Layers as clusters with L.markercluster.";
  var version$1 = "3.0.0";
  var author = "Patrick Arlt <parlt@esri.com> (http://patrickarlt.com)";
  var contributors = [
  	"Patrick Arlt <parlt@esri.com> (http://patrickarlt.com)",
  	"John Gravois <jgravois@esri.com> (http://johngravois.com)"
  ];
  var peerDependencies = {
  	"esri-leaflet": "*",
  	leaflet: "*",
  	"leaflet.markercluster": "^1.0.0"
  };
  var devDependencies = {
  	"@rollup/plugin-json": "^4.1.0",
  	"@rollup/plugin-node-resolve": "^13.1.3",
  	chai: "4.3.6",
  	"gh-release": "^6.0.1",
  	"http-server": "^14.1.0",
  	karma: "^6.3.16",
  	"karma-chai-sinon": "^0.1.5",
  	"karma-chrome-launcher": "^3.1.0",
  	"karma-coverage": "^2.2.0",
  	"karma-mocha": "^2.0.1",
  	"karma-mocha-reporter": "^2.2.5",
  	"karma-sourcemap-loader": "^0.3.8",
  	mkdirp: "^0.5.1",
  	mocha: "^9.2.0",
  	"node-sass": "^7.0.1",
  	rollup: "^2.67.2",
  	"rollup-plugin-terser": "^7.0.2",
  	semistandard: "^11.0.0",
  	sinon: "^13.0.1",
  	"sinon-chai": "3.7.0",
  	snazzy: "^9.0.0",
  	watch: "^1.0.2"
  };
  var homepage = "https://github.com/Esri/esri-leaflet-cluster";
  var jspm = {
  	registry: "npm",
  	format: "es6",
  	main: "src/ClusterFeatureLayer.js"
  };
  var keywords = [
  	"arcgis",
  	"esri",
  	"esri leaflet",
  	"gis",
  	"leaflet plugin",
  	"mapping"
  ];
  var license = "Apache-2.0";
  var main = "dist/esri-leaflet-cluster-debug.js";
  var module = "src/ClusterFeatureLayer.js";
  var readmeFilename = "README.md";
  var repository = {
  	type: "git",
  	url: "git+https://github.com/Esri/esri-leaflet-cluster.git"
  };
  var scripts = {
  	prebuild: "mkdirp dist",
  	build: "rollup -c profiles/debug.js & rollup -c profiles/production.js",
  	lint: "semistandard | snazzy",
  	pretest: "npm run build",
  	release: "./scripts/release.sh",
  	start: "watch 'npm run build' src & http-server -p 5678 -c-1 -o",
  	test: "npm run lint && karma start"
  };
  var semistandard = {
  	globals: [
  		"expect",
  		"L",
  		"sinon"
  	]
  };
  var packageInfo = {
  	name: name,
  	description: description,
  	version: version$1,
  	author: author,
  	contributors: contributors,
  	peerDependencies: peerDependencies,
  	devDependencies: devDependencies,
  	homepage: homepage,
  	"jsnext:main": "src/ClusterFeatureLayer.js",
  	jspm: jspm,
  	keywords: keywords,
  	license: license,
  	main: main,
  	module: module,
  	readmeFilename: readmeFilename,
  	repository: repository,
  	scripts: scripts,
  	semistandard: semistandard
  };

  var version = packageInfo.version;

  var FeatureLayer = esriLeaflet.FeatureManager.extend({

    statics: {
      EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
      CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
    },

    /**
     * Constructor
     */

    initialize: function (options) {
      esriLeaflet.FeatureManager.prototype.initialize.call(this, options);

      options = leaflet.setOptions(this, options);

      this._layers = {};
      this._leafletIds = {};

      this.cluster = leaflet.markerClusterGroup(options);
      this._key = 'c' + (Math.random() * 1e9).toString(36).replace('.', '_');

      this.cluster.addEventParent(this);
    },

    /**
     * Layer Interface
     */

    onAdd: function (map) {
      esriLeaflet.FeatureManager.prototype.onAdd.call(this, map);
      this._map.addLayer(this.cluster);
    },

    onRemove: function (map) {
      esriLeaflet.FeatureManager.prototype.onRemove.call(this, map);
      this._map.removeLayer(this.cluster);
    },

    /**
     * Feature Management Methods
     */

    createNewLayer: function (geojson) {
      var layer = leaflet.GeoJSON.geometryToLayer(geojson, this.options);
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
          layer.feature = leaflet.GeoJSON.asFeature(geojson);
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
    }
  });

  function featureLayer (options) {
    return new FeatureLayer(options);
  }

  exports.FeatureLayer = FeatureLayer;
  exports.VERSION = version;
  exports["default"] = featureLayer;
  exports.featureLayer = featureLayer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=esri-leaflet-cluster-debug.js.map
