# Esri Leaflet Cluster

[![Build Status](https://travis-ci.org/Esri/esri-leaflet-cluster.svg?branch=master)](https://travis-ci.org/Esri/esri-leaflet-cluster)

> enables visualization of ArcGIS Feature Services as clusters using the [L.MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster) Leaflet Plugin.

### Demos
A live demo is available on the [Esri Leaflet website](http://esri.github.io/esri-leaflet/examples/clustering-feature-layers.html).

### Example
Here is a quick example to get you started. Just change the paths to point to the proper libraries and go.

<a href="http://esri.github.io/esri-leaflet/examples/clustering-feature-layers.html">
  <img src="https://github.com/Esri/esri-leaflet-cluster/raw/master/cluster-example.jpg" alt="Demo">
</a>

```html
<html>
<head>
  <meta charset=utf-8 />
  <title>Clustering points</title>
  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />

  <!-- Load Leaflet from CDN-->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css"
    integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw=="
    crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"
    integrity="sha512-mNqn2Wg7tSToJhvHcqfzLMU6J4mkOImSPTxVZAdo+lcPlk+GhZmYgACEe0x35K7YzW1zJ7XyJV/TT1MrdXvMcA=="
    crossorigin=""></script>

  <!-- Load Esri Leaflet from CDN -->
  <script src="https://unpkg.com/esri-leaflet@2.1.0/dist/esri-leaflet.js"
    integrity="sha512-Tojl3UMd387f6DdAJlo+fKfJZiP55fYT+6Y58yKbHydnueOdSFOxrgLPuUxm7VW1szEt3hZVwv3V2sSUCuT35w=="
    crossorigin=""></script>

  <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.0.4/dist/MarkerCluster.Default.css">
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.0.4/dist/MarkerCluster.css">
  <script src="https://unpkg.com/leaflet.markercluster@1.0.4/dist/leaflet.markercluster.js"></script>

  <!-- Load Esri Leaflet Cluster from CDN -->
  <script src="https://unpkg.com/esri-leaflet-cluster@2.0.0/dist/esri-leaflet-cluster.js"
    integrity="sha512-mhpdD3igvv7A/84hueuHzV0NIKFHmp2IvWnY5tIdtAHkHF36yySdstEVI11JZCmSY4TCvOkgEoW+zcV/rUfo0A=="
    crossorigin=""></script>

  <style>
    body {margin:0;padding:0;}
    #map {position: absolute;top:0;bottom:0;right:0;left:0;}
  </style>
</head>
<body>

<div id="map"></div>

<script>
  var map = L.map('map').setView([45.526, -122.667], 15);

  L.esri.basemapLayer('Streets').addTo(map);
  L.esri.Cluster.featureLayer({
    url: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Trimet_Transit_Stops/FeatureServer/0'
  }).addTo(map);
</script>

</body>
</html>
```

### Documentation & Examples

A full [API Reference](http://esri.github.io/esri-leaflet/api-reference/layers/cluster-feature-layer.html) and examples can be found on the [Esri Leaflet](http://esri.github.io/esri-leaflet/) website.

### Development Instructions

If you'd like to inspect and modify the source of Esri Leaflet Cluster, follow the instructions below to set up a local development environment.

1. [Fork and clone Esri Leaflet Cluster](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-cluster` folder
3. Install the [`package.json`](https://github.com/Esri/esri-leaflet/blob/master/package.json#L14-L49) dependencies by running `npm install`
4. Run `npm start` from the command line. This will compile minified source in a brand new `dist` directory, launch a tiny webserver and begin watching the raw source for changes.
5. Run `npm test` to make sure you haven't introduced a new 'feature' accidentally.
6. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

### Dependencies

* version [1.0.2](https://github.com/Esri/esri-leaflet-cluster/releases/tag/v1.0.2) (available on [CDN](https://cdn.jsdelivr.net/leaflet.esri.clustered-feature-layer/1.0.2/esri-leaflet-clustered-feature-layer.js)) can be used in apps alongside:
  *  [Leaflet](http://leafletjs.com) version `0.7.x`.
  * Esri Leaflet version `1.x`
  * [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) version `0.4`

* version [2.0.0](https://github.com/Esri/esri-leaflet-cluster/releases/tag/v2.0.0) (available on [CDN](https://unpkg.com/esri-leaflet-cluster@2.0.0)) can be used in apps alongside:
  *  [Leaflet](http://leafletjs.com) version `1.x`.
  * Esri Leaflet version `2.x`
  * [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) version `1.x`

### Resources

* [Importing Data Into Feature Services](https://developers.arcgis.com/tools/csv-to-feature-service/)
* [ArcGIS for Developers](http://developers.arcgis.com)
* [ArcGIS REST Services](http://resources.arcgis.com/en/help/arcgis-rest-api/)
* [@Esri](http://twitter.com/esri)
* [@EsriPDX](http://twitter.com/esripdx)

### Issues

Find a bug or want to request a new feature?  Please let us know by submitting an [issue](https://github.com/Esri/esri-leaflet-cluster/issues).

Please take a look at [previous Esri Leaflet issues](https://github.com/Esri/esri-leaflet/issues?labels=FAQ&milestone=&page=1&state=closed) and [previous Esri Leaflet Cluster issues](https://github.com/Esri/esri-leaflet-cluster/issues?labels=FAQ&milestone=&page=1&state=closed)that resolve common problems.

You can also post issues on the [GIS Stackexchange](http://gis.stackexchange.com/questions/ask?tags=esri-leaflet,leaflet) an/or the [Esri Leaflet place](https://geonet.esri.com/discussion/create.jspa?sr=pmenu&containerID=1841&containerType=700&tags=esri-leaflet,leaflet) on GeoNet.

### Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/Esri/esri-leaflet/blob/master/CONTRIBUTING.md).

### Licensing
Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.