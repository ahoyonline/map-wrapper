# Map Wrapper #

## Description ##

Map Wrapper is a meteor component to add reactive maps to web applications.
This project is agnostic to the map implementation, so, after this package is 
added, an implementation package should be added too as
[ahoy:map-wrapper-google](https://github.com/ahoyonline/map-wrapper-google)

## Installation ##

Install the package through meteor
```sh
meteor add ahoy:map-wrapper
```
Don't forget to install your map implementation (e.g.)
```sh
meteor add ahoy:map-wrapper-google
```

## Use ##

## Development guide ##

### API ###

The communication with the MapWrapper component is 

#### MapWrapper ####

The MapWrapper exposes the following methods

#### load ####

Instructs the map component to load. This doesn't need to be called if the 
option loadOnRegistration is set to true (which is the default)

#### initialize ####

Runs the map component intialization. Typically, this method is called only
by the template, and does not need to be used

#### drawFeauters ####

Instructs the map handler to draw the features set in mapData

### Template data ###

The initialization of the component, and the data binding is done by specifying 
the following objects when using the template

#### mapData ####
mapData is the object containing the data to be displayed on the map.
The mapData is defined by its schema [mapData.schema.json](mapData.schema.json)

#### options ####
To iverride the options of the map, you can pass an object corresponding 
to the schema [options.schema.json](options.schema.json)
The object passed will extend the default options, therefore, you will need
to specify only the values that you want to differ from the defaults

#### listener ####
The listener is a callback function that will be called when the map data changes
The arguments passed to the function are

* The map data
* The type of feature that has changed ('polylines' or 'markers')
* the index of the feature changed

## Example ##

To use the map wrapper, simply include the template MapWrapper in you templates
and pass to it mapData and optionally options

```html
<template name="map_wrapper_container">
  <div class="map_wrapper_container">
    {{ >mapWrapper mapData=mapData options=options listener=listener }}
  </div>
</template>
```

... and bind the data to the wrapper, use reactive data (Session, ReactiveVar 
or collections) to bind to the MapWrapper, in this way, changes to the data 
will be reflected immediately on the map
```javascript
var mapDataReactive = new ReactiveVar({
  polylines: [],
  markers: []
});
Template.map_wrapper_container.helpers({
  mapData: function() {
    return mapDataReactive.get();
  },
  options: function(argument) {
    return {
      // ... options to change from default
    };
  },
  listener: function() {
    return function(newMapData, type, index) {
      mapDataReactive.set(newMapData);
    };
  }
});
```

Example of the library use can be found in 
[map-wrapper-test](https://github.com/ahoyonline/map-wrapper-test)

## Contribution ##

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License ##

This project is licensed MIT licensed. Do whatever you like with it but any responsibility for doing so is your own.
