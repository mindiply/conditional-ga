# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.0.16] - 2018-11-07
### New
- Removed google id code
- Moved to typescript and generating type definitions

## [0.0.12] - 2018-05-14
### New
- Added two new configuration options to enable Google Optimize:
  - useGoogleOptimize (Boolean) to enable it
  - googleOptimizeId (String) to configure the unique id of the google Optimize
    project

## [0.0.10] - 2017-11-15
- If USE_GA is set on window or the global scope, setting it to
false will stop GA from initializing

## [0.0.8] - 2017-11-11
### Changed
- When initializing with initGA, check first of all for the window
object, and stop if it's undefined

## [0.0.6] - 2017-05-30
### Changed
- Publishing both src and lib in npm package
