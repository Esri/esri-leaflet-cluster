# Changelog

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

[2.0.0-beta.1]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.2...v2.0.0-beta.1
[1.0.2]: https://github.com/Esri/esri-leaflet-clustered-layer/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/Esri/esri-leaflet-clustered-layer/compare/v1.0.0-rc.4...v1.0.0
[Release Candidate 4]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.0-rc.3...v1.0.0-rc.4
[Release Candidate 3]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.0-rc.2...v1.0.0-rc.3
[Release Candidate 2]: https://github.com/Esri/esri-leaflet-clustered-feature-layer/compare/v1.0.0-rc.1...v1.0.0-rc.2