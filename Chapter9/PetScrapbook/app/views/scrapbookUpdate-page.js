var observable = require("data/observable");
var frame = require("ui/frame");
var fileSystemService = require("~/data/fileSystemService");
var camera = require("camera");
var geolocation = require("nativescript-geolocation");

exports.onLoaded = function(args) {
    var page = args.object;
    var scrapbookPage = page.navigationContext.model;

    page.bindingContext = scrapbookPage;
};

exports.onDoneTap = function(args) {    
    var page = args.object;
    var scrapbookPage = page.bindingContext;
    
    fileSystemService.fileSystemService.savePage(scrapbookPage);

    frame.topmost().navigate({ 
        moduleName: "views/scrapbook-page"
    });
};

exports.onAddImageTap = function (args) {
    var page = args.object;
    var scrapbookPage = page.bindingContext;

    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }

    camera.takePicture({ width: 100, height: 100, keepAspectRatio: true }).then(function (picture) {
        scrapbookPage.set("image", picture);

        geolocation.getCurrentLocation().then(function (location) {
            scrapbookPage.set("lat", location.latitude);
            scrapbookPage.set("long", location.longitude);
        });
    });
};