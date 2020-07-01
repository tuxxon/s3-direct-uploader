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




// Configure AWS SDK for JavaScript & set region and credentials
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-northeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:e7b9de8c-8776-47f7-8e1a-9183b498e2ce',
});


const  FULLIMAGE_URL = "fullimage.html?id=";
const  kGRAY = "gray";
const  kEP = "ep";
const  kDE = "de";
const  kSTYLE = "style";
const  kSKETCHIFY = "sketchify";
const  kPS_COLOR = "ps-color";
const  kPS_GRAY = "ps-gray";
const  kSOURCE = "source";

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


function extractExtFrom(srcpath) {
    let re = /(?:\.([^.]+))?$/;
    let ext = "." + re.exec(srcpath)[1];

    return ext;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*
jQuery.fn.delay = function(time, func) {
    this.each(function() {
        setTimeout(func,time);
    });
    return this;
}
*/
function AjaxSketchify(imgUrl) {

    $.get(imgUrl)
        .done(function() { 
            // Do something now you know the image exists.
            $("#sketchifyImage").attr("src",imgUrl);
            $("#sketchifyHref").attr("href",imgUrl);
        })
        .fail(function() { 
            // Image doesn't exist - do something else.
            sleep(200).then(() => {
                let aUrl = imgUrl.split('?');
                AjaxSketchify(aUrl[0]+"?t="+ new Date().getTime());
            });

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

            $("#grayImage").attr("src",images[kGRAY]);
            $("#grayHref").attr("href",FULLIMAGE_URL+images[kGRAY]);
        
            $("#edgePreservingImage").attr("src",images[kEP]);
            $("#edgePreservingHref").attr("href",FULLIMAGE_URL+images[kEP]);
        
            $("#detailEnhanceImage").attr("src",images[kDE]);
            $("#detailEnhanceHref").attr("href",FULLIMAGE_URL+images[kDE]);
        
            $("#stylizationImage").attr("src",images[kSTYLE]);
            $("#stylizationHref").attr("href",FULLIMAGE_URL+images[kSTYLE]);
        
            $("#pencilSketchGrayImage").attr("src",images[kPS_GRAY]);
            $("#pencilSketchGrayHref").attr("href",FULLIMAGE_URL+images[kPS_GRAY]);
        
            $("#pencilSketchColorImage").attr("src",images[kPS_COLOR]);
            $("#pencilSketchColorHref").attr("href",FULLIMAGE_URL+images[kPS_COLOR]);

            if (images[kSKETCHIFY]) {
                $("#sketchifyImage").attr("src",images[kSKETCHIFY]);
                $("#sketchifyHref").attr("href",FULLIMAGE_URL+images[kSKETCHIFY]);
            }
            else {
                let srcpath = images[kSOURCE];
                let ext = extractExtFrom(srcpath);

                let imgUrl = "https://cartoonaf.s3.ap-northeast-2.amazonaws.com/public/"+result.data.body.hash+"/sketchify"+ext;
                AjaxSketchify(imgUrl);
            }
        
            localStorage.setItem("hashimage", result.data.body.hash);
            localStorage.setItem("images", JSON.stringify(result.data.body.images));      
        })
        .catch(function(result){
            //This is where you would put   an error callback
            // catch errors...
        });

}

/**
 * show data from localstorge when refresing or clicking back button.
 */
function showImagesOnRefreshing() {

    //var hashimage = localStorage.getItem("hashimage");
    //if (hashimage == null || hashimage.length === 0 )
    //    return;

    var images = JSON.parse(localStorage.getItem("images"));
    if (images == null || images.length === 0 )
        return;

    /**
     *  The image to be analyzed.
     */
    $('.image-upload-wrap').hide();
    $('#loading').show();
    $('.file-upload-image').attr('src', images['source']);
    $('.file-upload-content').show();
    $('.image-title').html("refresh");
    $('#loading').hide();

    /**
     *  Gender and result-message
     */
    $('#gender').val(localStorage.getItem("imageSex"));
    $('.result-message')[0].innerHTML = localStorage.getItem("resultMessage");

    /**
     *  Converted images.
     */
    $("#grayImage").attr("src",images[kGRAY]);
    $("#grayHref").attr("href",FULLIMAGE_URL+images[kGRAY]);

    $("#edgePreservingImage").attr("src",images[kEP]);
    $("#edgePreservingHref").attr("href",FULLIMAGE_URL+images[kEP]);

    $("#detailEnhanceImage").attr("src",images[kDE]);
    $("#detailEnhanceHref").attr("href",FULLIMAGE_URL+images[kDE]);

    $("#stylizationImage").attr("src",images[kSTYLE]);
    $("#stylizationHref").attr("href",FULLIMAGE_URL+images[kSTYLE]);

    $("#pencilSketchGrayImage").attr("src",images[kPS_GRAY]);
    $("#pencilSketchGrayHref").attr("href",FULLIMAGE_URL+images[kPS_GRAY]);

    $("#pencilSketchColorImage").attr("src",images[kPS_COLOR]);
    $("#pencilSketchColorHref").attr("href",FULLIMAGE_URL+images[kPS_COLOR]);

    $("#sketchifyImage").attr("src",images[kSKETCHIFY]);
    $("#sketchifyHref").attr("href",FULLIMAGE_URL+images[kSKETCHIFY]);

}

function showLoadingForSlides() {
    const LOADING_IMAGE = "img/redspinner.svg";

    $("#grayImage").attr("src",LOADING_IMAGE);
    $("#edgePreservingImage").attr("src",LOADING_IMAGE);
    $("#detailEnhanceImage").attr("src",LOADING_IMAGE);
    $("#stylizationImage").attr("src",LOADING_IMAGE);
    $("#pencilSketchGrayImage").attr("src",LOADING_IMAGE);
    $("#pencilSketchColorImage").attr("src",LOADING_IMAGE);
    $("#sketchifyImage").attr("src",LOADING_IMAGE);
}
/**
 * Post an image to s3 with a signed url.
 * 
 * @param {*} filename : image filename to post.
 */

function postImagesForCartoon(filename) { 

	/// Prepare to call Lambda function
    let lambda = new AWS.Lambda();
    let ext = extractExtFrom(filename);

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

    showLoadingForSlides();

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
            var img = $('.file-upload-image')[0];
            if (img.naturalWidth > 2000 &&  img.naturalHeight > 1100) {
                $('#imageSizeConfirm').click(function(e) {
                    $('#imageSizeAlert').modal('hide');
                    return;
                });
                $('#imageSizeAlert').modal('show');
                return;
            }
    
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

