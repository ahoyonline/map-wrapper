/**
 * The MapWrapper is a component that abstracts a mapping software layer. 
 */
MapWrapper = {
  /**
   * Default options for the wrapper
   */
  options: {
    mapZoom: 13,
    mapCentre: [51.488, 0],
    loadOnRegistration: true
  },
  /**
   * The user using this map. This is used by the field "editedBy" on the
   * mapData. If edited by is null, it means that the field is in edit mode
   * but the user is anonymous, otherwise ia a meteor userId
   */
  userId: null,
  /**
   * The listener that gets notified if the data changes
   */
  listener: null,
  /*
   * Instance of a map handler
   */
  _handler: null,
  /**
   * Loads the mapping software, this might be necessaryto the handler to
   * load DOM components (add scripts etc.)
   */
  load: function() {
    this._handler.onLoad();
  },
  /**
   * Initializes the map software. Tipically this is called when the
   * template is rendered
   */
  initialize: function(template) {
    this._handler.onInitialize(template);
  },
  /**
   * Draws on the map the features defined in mapData
   */
  drawFeatures: function() {
    this._handler.drawFeatures();
  },
  notifyListener: function(type, index) {
    if (this.listener) {
      this.listener(MapWrapper.mapData, type, index);
    }
  },
  /**
   * Registers a map handler implementation. If load on registration is 
   * true, once the handler registers, the MapWrapper loads
   */
  regitsterMapHandler: function(handler) {
    this._handler = handler;
    if (this.options.loadOnRegistration) {
      this.load();
    }
  }
};

/**
 * Once the mapWrapper template is created, the default options are
 * extended with the options passed
 */
Template.mapWrapper.onCreated(function() {
  if (this.data) {
    if (this.data.options) {
      $.extend(MapWrapper.options, this.data.options);
    }
    MapWrapper.listener = this.data.listener ? this.data.listener : null;
    MapWrapper.userId = this.data.userId ? this.data.userId : null;
  }
});

/**
 * Initializes the the MapWrapper, which will initialize the handler
 * and call autorun on the template's mapData. This allows the MapWrapper
 * to be reactive to changes to the mapData
 */
Template.mapWrapper.onRendered(function() {
  MapWrapper.initialize(this);
  this.autorun(function() {
    MapWrapper.mapData = Template.currentData().mapData;
    MapWrapper.drawFeatures(MapWrapper.mapData);
    MapWrapper.userId = Template.currentData().userId;
  });
});

Template.mapWrapper.onDestroyed(function() {
  MapWrapper._handler.onTemplateDestroyed(this);
});