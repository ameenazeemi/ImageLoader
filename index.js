/// <reference path="CameraApp.js" />

"use strict";

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {

    cameraApp.run();




}

window.MyApp = {};

$(function () {
    MyApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MyApp,

        defaultLayout: "navbar",
        navigation: [
            {

                action: "#home",
            },
          {
              title: "Gallery",
              action: "#gallery",
              icon: "image"
          },

          {
              title: "Image",
              action: "#video",
              icon: "photo"
          }
          ,
          {
              title: "Settings",
              action: "#settings",
              icon: "preferences"
          }
        ]
    });
    MyApp.app.router.register(":view", { view: "home" });
    MyApp.app.navigate();
});

MyApp.home = function ()
{
    debugger;
    var viewModel = {
        
        galleryData: cameraApp.imagesArray,
    };
    return viewModel;
}

MyApp.gallery = function () {



    var viewModel = {
        viewShown: function () {
            try {
                                
                cameraApp.getPhotoFromAlbum();                
                
            }
            catch (e) {
                alert(e.message);
            }
            finally {
                MyApp.app.navigate("home");
            }
        },
        toolbarItems: [
             { align: 'left', widget: 'button', options: { type: 'back', text: 'Back' } },
             { align: 'right', widget: 'button', options: { icon: 'plus' } },
             { align: 'right', widget: 'button', options: { icon: 'find' } },
             { align: 'center', text: 'Products' }
        ],
        galleryData:cameraApp.imagesArray ,
        message: 'Welcome! to image',
        uploadImages: function () {


            alert('hello upload images');

        }

    };
    return viewModel;
};

MyApp.video = function () {
    var viewModel = {
        viewShown: function () {
            try {

                cameraApp.capturePhoto();


            }
            catch (e) {
                alert(e.message);
            }
            finally {
                MyApp.app.navigate("home");
            }
        },
        message: 'Welcome! to video'
    };
    return viewModel;
};

MyApp.settings = function () {
    var viewModel = {
        message: 'Welcome! to Settings'
    };
    return viewModel;
};


