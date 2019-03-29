require([
    "esri/Map",
    "esri/views/MapView",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "dojo/domReady!"
  ], function(Map, MapView, QueryTask, Query, GraphicsLayer, Graphic) {
    return {
      init: function() {
      var resultsLayer = new GraphicsLayer();
  
      var map = new Map({
      basemap: "streets",
      layers: [resultsLayer]
      });
  
      var view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 12,
      center: [$("#longitude").val(), $("#latitude").val()]
      });
  
    var watershedURL =
      "https://inlandwaters.geoplatform.gov/arcgis/rest/services/NHDPlus/WatershedBoundaryDataset/MapServer/10/query";
  
    var qTask = new QueryTask({
      url: watershedURL
    });
  
    var params = new Query({
      returnGeometry: true,
      where: "HUC12 = '051302030106'",
      outFields: ["*"]
    });
  
    qTask
      .execute(params)
      .then(getWatershedResults)
      .catch(promiseRejected);
  
    // Called each time the promise is resolved
    function getWatershedResults(response) {
      
    }
  
    // Called each time the promise is rejected
    function promiseRejected(error) {
      console.error("Promise rejected: ", error.message);
    }
  }}
  });
  