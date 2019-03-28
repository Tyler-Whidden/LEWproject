require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/widgets/Search",
    'esri/tasks/Locator',
    'esri/geometry/SpatialReference',
    'esri/geometry/Point',
    'esri/geometry/support/webMercatorUtils'
  ], function(
    Map,
    SceneView,
    Search,
    Locator, SpatialReference, Point, webMercatorUtils) {

      let locatorTask = null;

        function getLocationFromInput(input, successFunc, errorFunc) {
            // input = document.getElementById('addressLocator').value;
            if (!locatorTask) locatorTask = new Locator('//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer');
            locatorTask.outSpatialReference = SpatialReference.WebMercator;
        
            const params = {
              address: {
                SingleLine: input
              },
              outFields: [
                'Loc_name',
                'City',
                'Place_addr',
                'Region',
                'RegionAbbr',
                'Country'
              ]
            };
        
            locatorTask.addressToLocations(params).then(function(candidates) {
            //   processCandidates(candidates, successFunc, errorFunc);
              console.log(candidates);
            });
          }
    

    var map = new Map({
      basemap: "satellite",
      ground: "world-elevation"
    });

    var view = new SceneView({
      scale: 123456789,
      container: "viewDiv",
      map: map
    });

    var searchWidget = new Search({
      view: view
    });

    // Add the search widget to the top right corner of the view
    view.ui.add(searchWidget, {
      position: "top-right"
    });

    
  });


  //

  // function parseGeolocationCoords(coords, successFunc, errorFunc) {
  //   if (!locatorTask) locatorTask = new Locator(mapConfig.locatorUrl);
  //   locatorTask.outSpatialReference = SpatialReference.WebMercator;

  //   const point = new Point({
  //     x: coords.lon,
  //     y: coords.lat,
  //     spatialReference: SpatialReference.WQGS84
  //   });

  //   const location = webMercatorUtils.geographicToWebMercator(point);

  //   locatorTask.locationToAddress(location, 0).then(function(candidate) {
  //     processCandidate(candidate, successFunc, errorFunc);
  //   });
  // }
