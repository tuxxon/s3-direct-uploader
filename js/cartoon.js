/**
 *  
 *  @author Gordon Ahn
 *  
 *  Created by Gordon Ahn on May 29, 2020
 * 
 */


 /**
  * 
  * @param {*} image 
  */

  /**
 function getRawFromImage() {
    
    function(buffer) {
        var words = new Uint32Array(buffer),
            hex = '';
        for (var i = 0; i < words.length; i++) {
          hex += words.get(i).toString(16);  // this will convert it to a 4byte hex string
        }
        console.log(hex);
    
 } 
 */


// Configure AWS SDK for JavaScript & set region and credentials
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-northeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:e7b9de8c-8776-47f7-8e1a-9183b498e2ce',
});


const SERVER_URL = "https://fz53s03zpl.execute-api.ap-northeast-2.amazonaws.com/dev"
const UPLOAD_URI = "/image?"
const CONVERT_URI = "/cartoonaf?"
const  FULLIMAGE_URL = "fullimage.html?id=";

function getSignedURLforUploading() {

}

function getImagesForCartoon_apigateway() {

    var apigClient = apigClientFactory.newClient();

    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        name: 'test1234.png'
    };
    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        /*
        headers: {
            param0: '',
            param1: ''
        },
        */
        queryParams: {
            name: 'test1234.png'
            //param1: ''
        }
    };

    apigClient.imageGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            console.log("==== apigClient => %s",result);
        })
        .catch(function(result){
            //This is where you would put an error callback
        });

}

function showImagesToBeCartoonized(filename) {
    var apigClient = apigClientFactory.newClient();

    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        name: filename
    };
    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        /*
        headers: {
            param0: '',
            param1: ''
        },
        */
        queryParams: {
            name: filename
            //param1: ''
        }
    };

    apigClient.cartoonafGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            let images = result.data.body.images;

            $("#grayImage").attr("src",images['gray']);
            $("#grayHref").attr("href",FULLIMAGE_URL+images['gray']);

            $("#edgePreservingImage").attr("src",images['edgePreserving']);
            $("#edgePreservingHref").attr("href",FULLIMAGE_URL+images['edgePreserving']);

            $("#detailEnhanceImage").attr("src",images['detailEnhance']);
            $("#detailEnhanceHref").attr("href",FULLIMAGE_URL+images['detailEnhance']);

            $("#stylizationImage").attr("src",images['stylization']);
            $("#stylizationHref").attr("href",FULLIMAGE_URL+images['stylization']);

            $("#pencilSketchGrayImage").attr("src",images['pencilSketch_gray']);
            $("#pencilSketchGrayHref").attr("href",FULLIMAGE_URL+images['pencilSketch_gray']);

            $("#pencilSketchColorImage").attr("src",images['pencilSketch_color']);
            $("#pencilSketchColorHref").attr("href",FULLIMAGE_URL+images['pencilSketch_color']);

            localStorage.setItem("hashimage", result.data.body.hash);
            localStorage.setItem("images", JSON.stringify(result.data.body.images));            
        })
        .catch(function(result){
            //This is where you would put   an error callback
            // catch errors...
        });

}

function showImagesOnRefreshing() {

    //var hashimage = localStorage.getItem("hashimage");
    //if (hashimage == null || hashimage.length === 0 )
    //    return;

    var images = JSON.parse(localStorage.getItem("images"));
    if (images == null || images.length === 0 )
        return;


    $('.image-upload-wrap').hide();
    $('#loading').show();
    $('.file-upload-image').attr('src', images['source']);
    $('.file-upload-content').show();
    $('.image-title').html("refresh");
    $('#loading').hide();

    $('#gender').val(localStorage.getItem("imageSex"));
    $('.result-message')[0].innerHTML = localStorage.getItem("resultMessage");


    $("#grayImage").attr("src",images['gray']);
    $("#grayHref").attr("href",FULLIMAGE_URL+images['gray']);

    $("#edgePreservingImage").attr("src",images['edgePreserving']);
    $("#edgePreservingHref").attr("href",FULLIMAGE_URL+images['edgePreserving']);

    $("#detailEnhanceImage").attr("src",images['detailEnhance']);
    $("#detailEnhanceHref").attr("href",FULLIMAGE_URL+images['detailEnhance']);

    $("#stylizationImage").attr("src",images['stylization']);
    $("#stylizationHref").attr("href",FULLIMAGE_URL+images['stylization']);

    $("#pencilSketchGrayImage").attr("src",images['pencilSketch_gray']);
    $("#pencilSketchGrayHref").attr("href",FULLIMAGE_URL+images['pencilSketch_gray']);

    $("#pencilSketchColorImage").attr("src",images['pencilSketch_color']);
    $("#pencilSketchColorHref").attr("href",FULLIMAGE_URL+images['pencilSketch_color']);

}

/**
 * Post an image to s3 with a signed url.
 * 
 * @param {*} filename : image filename to post.
 */

function postImagesForCartoon(filename) { 

	/// Prepare to call Lambda function
    var lambda = new AWS.Lambda();

    var re = /(?:\.([^.]+))?$/;
    var ext = "." + re.exec(filename)[1];

    var paramFilename = UUID.generate() + ext;
    var input = {
        //name: "test1234.png",
        resource: "",
        httpMethod: "POST",
        queryStringParameters: {
            name: paramFilename
        }
    };

    var params = {
        FunctionName: 'upload-image-to-s3',
		InvocationType : 'RequestResponse',
        Payload: JSON.stringify(input)
    };

    lambda.invoke(params, function(err, data) {
        //var result = document.getElementById('result');
        if (err) {
            console.log(err, err.stack);
            //result.innerHTML = err;
        } 
        else {
            /**
             * Initialize the inputs of form 
             * in order to post an image to s3 with a signed url.
             */
            var output = JSON.parse(data.Payload);
            $("#upload-form").attr('action', output.body.url);
            $("#upload-form > input[name^='key']").val(output.body.fields['key']);
            $("#upload-form > input[name^='x-amz-credential']").val(output.body.fields['x-amz-credential']);
            $("#upload-form > input[name^='x-amz-date']").val(output.body.fields['x-amz-date']);
            $("#upload-form > input[name^='policy']").val(output.body.fields['policy']);
            $("#upload-form > input[name^='x-amz-signature']").val(output.body.fields['x-amz-signature']);

            var uploadForm = $('#upload-form');
            var formData = new FormData($('form')[0]);

            /**
             *  Upload an image through Ajax.. using event driven way.
             */
            uploadForm.submit(function (e) {
        
                e.preventDefault();

                $.ajax({
                    type: uploadForm.attr('method'),
                    url: uploadForm.attr('action'),
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        /**
                         *  Showing the images to be cartoonized.
                         */
                        showImagesToBeCartoonized(paramFilename);
                    },
                    error: function (data) {
                        console.log('[debug] An error occurred.');
                        console.log('[debug] = %s',JSON.stringify(data));
                    },
                });
            });

            $("#upload-form > input[name^='submit']").click();
        }
    });
    
}

/*--- Initialize a image slider from jssor --- */
window.jssor_1_slider_init = function() {

    var jssor_1_options = {
      $AutoPlay: 1,
      $AutoPlaySteps: 5,
      $SlideDuration: 160,
      $SlideWidth: 200,
      $SlideSpacing: 3,
      $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$,
        $Steps: 5
      },
      $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$,
        $SpacingX: 16,
        $SpacingY: 16
      }
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    /*#region responsive code begin*/

    var MAX_WIDTH = 980;

    function ScaleSlider() {
        var containerElement = jssor_1_slider.$Elmt.parentNode;
        //var containerElement = document.getElementsByClassName('file-upload-content');
        var containerWidth = containerElement.clientWidth;

        if (containerWidth) {

            var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

            jssor_1_slider.$ScaleWidth(expectedWidth);
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    ScaleSlider();

    $Jssor$.$AddEvent(window, "load", ScaleSlider);
    $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    /*#endregion responsive code end*/
};

jssor_1_slider_init();


/*----   ----*/

