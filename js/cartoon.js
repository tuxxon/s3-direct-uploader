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
            var images = result.data.body.images;

            $("#grayImage").attr("src",images['gray']);
        })
        .catch(function(result){
            //This is where you would put an error callback
            // catch errors...
        });

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
            $("#upload-form > input[name^='submit']").click();
            //result.innerHTML = output;

            showImagesToBeCartoonized(paramFilename);
        }
    });
    
    /**
    console.log("...UUID>" + UUID.generate() );

    var startUrl = SERVER_URL + UPLOAD_URI + "name="+UUID.generate()+".png";

    console.log("...postURL>" + startUrl );

    $.ajax({
        type: "GET",
        url: startUrl,
        beforeSend: function (xhr) {
            //xhr.setRequestHeader("Content-type","application/json");
            console.log("...portNo>"+8080);
            //xhr.setRequestHeader("Access-Control-Allow-Origin","http://127.0.0.1:8080");
        },
        success: function (res) {
            console.log(res);
        }
    });
    */

    /**
     *  No. 1 Logic.
    $.post( postUrl, function( data ) {
        console.log(".. result >"+ data)
        //$( ".result" ).html( data );
    });
    */
    //console.log("...cv images!!!...");
}

$(document).ready(function() 
{
    $('#upload-btn').on('click', function() {
        $("#upload-form").submit();
    });
});