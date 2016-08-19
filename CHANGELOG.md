# Changelog

## [Unreleased][unreleased]

## [2.0.0]

### Breaking Changes

* Namespace change (~~`L.esri.Cluster.clusteredFeatureLayer`~~ is now `L.esri.Cluster.featureLayer` )
* repository and npm package have been renamed esri-leaflet-cluster~~ed-feature-layer~~ for brevity's sake

### Added

* The build system has been refactored to use latest Rollup and Rollup plugins.
* Reworked bundling directives for various modules systems to resolve and simplify various issues
  * WebPack users no longer have to use the Babel loader.
  * Babelify with Babel 6 now works

### Removed

* `bindPopup` and `unbindPopup` logic have been removed from this plugin.  Equivalent functionality is available via [`L.Layer`](http://leafletjs.com/reference-1.0.0.html#layer-bindpopup) in Leaflet itself.

```js
clusterLayer.bindPopup(function (layer) {
  return "attribute value is: " + layer.feature.properties.ATTRIBUTENAME;
})
```

## [2.0.0-beta.1]

### Breaking Changes

* Namespace change (~~`L.esri.clusteredFeatureLayer`~~ is now `L.esri`**.Cluster.**`clusteredFeatureLayer` )
* Requires the 2.0.0-beta.6 release of Esri Leaflet.
* Requires the 1.0.0-beta.2 release of Leaflet.

### Added

* Better build/test/release automation.
* Support for JSPM in package.json. Now you can `import cluster from 'esri-leaflet-clustered-feature-layer/src/ClusteredFeatureLayer';` for more compact builds but, be aware of [caveats](http://blog.izs.me/post/44149270867/why-no-directories-lib-in-node-the-less-snarky)
* Support for browserify in the package.json. Now you can `var cluster = require('esri-leaflet-clustered-feature-layer/src/ClusteredFeatureLayer');` for more compact builds, but be aware of [caveats](http://blog.izs.me/post/44149270867/why-no-directories-lib-in-node-the-less-snarky)

## [1.0.2]

### Fixed

* Fix build system error. Ensure that tag contains built files.

## [1.0.0]

### Changed

* Update dependencies
* CDN moved to [JS Delivr](http://www.jsdelivr.com/#!leaflet.esri.clustered-feature-layer)

## [Release Candidate 4]

### Changed

* `bower install esri-leaflet-clustered-feature-layer` should now work without `bower cache clean`
* Update Esri Leaflet dependency to RC 4

## [Release Candidate 3]

### Changed

* fixed `bower install esri-leaflet-clustered-feature-layer`
* Update Esri Leaflet dependency to RC 3

## [Release Candidate 2]

## Release Candidate 1

[unreleased]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v2.0.0-beta.1...v2.0.0
[2.0.0-beta.1]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.2...v2.0.0-beta.1
[1.0.2]: https://github.com/Esri/esri-leaflet-clustered-layer/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/Esri/esri-leaflet-clustered-layer/compare/v1.0.0-rc.4...v1.0.0
[Release Candidate 4]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.0-rc.3...v1.0.0-rc.4
[Release Candidate 3]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.0-rc.2...v1.0.0-rc.3
[Release Candidate 2]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.0-rc.1...v1.0.0-rc.2