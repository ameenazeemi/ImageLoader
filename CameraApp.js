

function cameraApp() { }

cameraApp = {
    _pictureSource: null,
    _destinationType: null,
    imagesArray:ko.observableArray(),

    run: function () {
        var that = this;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
    },

    capturePhoto: function () {
        var that = this;

        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function () {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
            quality: 50,
            destinationType: that._destinationType.DATA_URL
        });
    },
    
   

    _capturePhotoEdit: function () {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function () {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
            quality: 20, allowEdit: true,
            destinationType: cameraApp._destinationType.DATA_URL
        });
    },

    _getPhotoFromLibrary: function () {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.PHOTOLIBRARY);
    },

    getPhotoFromAlbum: function () {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    },

    _getPhoto: function (source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function () {
            that._onPhotoURISuccess.apply(that, arguments);
        }, function () {
            cameraApp._onFail.apply(that, arguments);
        }, {
            quality: 50,
            destinationType: cameraApp._destinationType.FILE_URI,
            sourceType: source
        });
    },

    _onPhotoDataSuccess: function (imageData) {
        /*
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';

        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
        */
        imgDisplay = "data:image/jpeg;base64," + imageData;

        cameraApp.imagesArray.push(imgDisplay);
    },

    _onPhotoURISuccess: function (imageURI) {

        try
        {
            


            cameraApp.imagesArray.push(imageURI);

            /*
            //_imagesArray.push(imageURI);
        
            var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';

            // Show the captured photo.
            smallImage.src = imageURI;
            */
            
        }
        catch (e)
        {
            alert(e.message);
        }
    },

    _onFail: function (message) {
        alert(message);
    }
}