/// <reference path="CameraApp.js" />
/// <reference path="AppData.js" />

"use strict";

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {


    cameraApp.run();

    if (typeof window.localStorage.getItem('detailImage') !== 'undefined' && window.localStorage.getItem('detailImage') != null) {
         window.localStorage.getItem('detailImage');
    }

    ////applying CSS layout

    //$("#demo1").als({
    //    visible_items: 3,
    //    scrolling_items: 2,
    //    orientation: "horizontal",
    //    circular: "no",
    //    autoscroll: "no"
    //});



}

window.MyApp = {};

$(function () {
    MyApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MyApp,

        defaultLayout: "navbar",
        navigation: [
            {
                title:"Selected",
                action: "#home",
                icon:"home"
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
 
    var selectedIndex = 0;
    var detailImage=ko.observable(true);
    var viewModel = {
        viewShown: function () {
            try {
                debugger;

                selectedIndex = MyAppData.ImageSelectedIndex();
                detailImage( MyAppData.IsShowDetailImage());
                //selectedIndex = cameraApp.imagesArray().length;
                //if (selectedIndex != 0)
                //{
                //    this.goToItem(selectedIndex);
                //}
             /*
                if (cameraApp.imagesArray().length == 0) {
                    selectedIndex = 0;
                }
                else {
                    selectedIndex = cameraApp.imagesArray().length ;
                }
                
                alert(selectedIndex);
               
               */
                
            }
            catch (e) {
                alert(e.message);
            }
            finally {
             
            }
        },
        
        galleryData: cameraApp.imagesArray,
        imageIndex: selectedIndex,
        detailImage: detailImage,
        listImage: !detailImage,
        goToItem : function (i) {
            $(".gallery").dxGallery("instance").goToItem(i, true);
              //.done(function () { DevExpress.ui.notify("Navigated to " + (i + 1) + " item", "success", 1000); })
        },       
        
        clickAction: function (data,event)
        {
            debugger;

            alert("click action of image");

            alert(data);

        }
        

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
    
    var _isDetailImage = ko.observable(false);

    

    var viewModel = {
        detailImage:MyAppData.IsShowDetailImage

    };
    return viewModel;
};


