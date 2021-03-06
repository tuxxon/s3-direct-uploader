
/**
 *  
 *  @author Gordon Ahn
 *  
 *  Created by Gordon Ahn on JUne 19, 2020
 * 
 */

const  kGRAY = "gray";
const  kEP = "ep";
const  kDE = "de";
const  kNORMALCARTOON = 'normal-cartoon';
const  kCARTOONBASIC = 'cartoon-basic';
const  kCARTOONLITE = 'cartoon-lite';
const  kPS_COLOR = "ps-color";
const  kPS_GRAY = "ps-gray";
const  kSKETCHIFY = "sketchify";
const  kSOURCE = "source";
const  kSTYLE = "style";
const  kLS_IMAGES = "images";

function convertImageByParams(src_name,dest_name, flags, sigma_s, sigma_r, shade_factor) {

    var apigClient = apigClientFactory.newClient();
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        name: src_name,
        filter: dest_name,
        flags: flags,
        sigma_s: sigma_s,
        sigma_r: sigma_r,
        shade_factor: shade_factor
    };

    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        /*
        headers: {
            headers_param0: 'headers_param0',
            headers_param1: 'headers_param1'
        },
        */
        queryParams: {
            name: src_name,
            filter: dest_name,
            flags: flags,
            sigma_s: sigma_s,
            sigma_r: sigma_r,
            shade_factor: shade_factor
        }
    };

    apigClient.fullimageGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            let filter_image = result.data.body.images;
            let images = JSON.parse(localStorage.getItem(kLS_IMAGES));
            $('#fullImage').attr('src', filter_image['dest']);
            images[dest_name] = filter_image['dest'];
            localStorage.setItem(kLS_IMAGES, JSON.stringify(images));

            //console.log("[debug] convertImageByParams(images) ===> %s", JSON.stringify(images));
        })
        .catch(function(result){
            //This is where you would put   an error callback
            // catch errors...
            console.log("[debug] error: convertImageByParams() ===> %s", JSON.stringify(result));
        });

}

function convertImageByUsingSketchify(src_name, sigma) {

    var apigClient = apigClientFactory.newClient();
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        name: "public/"+src_name,
        sigma: sigma
    };

    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        /*
        headers: {
            headers_param0: 'headers_param0',
            headers_param1: 'headers_param1'
        },
        */
        queryParams: {
            name: "public/"+src_name,
            sigma: sigma
        }
    };

    apigClient.sketchifyFullimageGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            //console.log("[debug] sketchifyFullimageGet(result) ===> %s", JSON.stringify(result));

            let filter_image = result.data.body.images;
            let images = JSON.parse(localStorage.getItem(kLS_IMAGES));
            $('#fullImage').attr('src', filter_image['dest']);
            images[kSKETCHIFY] = filter_image['dest'];
            localStorage.setItem(kLS_IMAGES, JSON.stringify(images));

            //console.log("[debug] sketchifyFullimageGet(images) ===> %s", JSON.stringify(images));
        })
        .catch(function(result){
            //This is where you would put   an error callback
            // catch errors...
            console.log("[debug] error: convertImageByUsingSketchify() ===> %s", JSON.stringify(result));
        });

}


function convertImageByUsingNormalCartoon(src_name, min, max) {

    var apigClient = apigClientFactory.newClient();
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        name: "public/"+src_name,
        min: min,
        max: max
    };

    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        /*
        headers: {
            headers_param0: 'headers_param0',
            headers_param1: 'headers_param1'
        },
        */
        queryParams: {
            name: "public/"+src_name,
            min: min,
            max: max
        }
    };

    apigClient.normalCartoonFullimageGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            //console.log("[debug] normalCartoonFullimageGet(result) ===> %s", JSON.stringify(result));

            let filter_image = result.data.body.images;
            let images = JSON.parse(localStorage.getItem(kLS_IMAGES));
            $('#fullImage').attr('src', filter_image['dest']);
            images[kNORMALCARTOON] = filter_image['dest'];
            localStorage.setItem(kLS_IMAGES, JSON.stringify(images));

            //console.log("[debug] normalCartoonFullimageGet(images) ===> %s", JSON.stringify(images));
        })
        .catch(function(result){
            //This is where you would put   an error callback
            // catch errors...
            console.log("[debug] error: normalCartoonFullimageGet() ===> %s", JSON.stringify(result));
        });

}


function convertImageByUsingBasicCartoon(src_name, blockSize, C) {

    var apigClient = apigClientFactory.newClient();
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        name: "public/"+src_name,
        blocksize: blockSize,
        paramC: C
    };

    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        /*
        headers: {
            headers_param0: 'headers_param0',
            headers_param1: 'headers_param1'
        },
        */
        queryParams: {
            name: "public/"+src_name,
            blocksize: blockSize,
            paramC: C
        }
    };

    apigClient.basicCartoonFullimageGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            //console.log("[debug] basicCartoonFullimageGet(result) ===> %s", JSON.stringify(result));

            let filter_image = result.data.body.images;
            let images = JSON.parse(localStorage.getItem(kLS_IMAGES));
            $('#fullImage').attr('src', filter_image['dest']);
            images[kCARTOONBASIC] = filter_image['dest'];
            localStorage.setItem(kLS_IMAGES, JSON.stringify(images));

            //console.log("[debug] basicCartoonFullimageGet(images) ===> %s", JSON.stringify(images));
        })
        .catch(function(result){
            //This is where you would put   an error callback
            // catch errors...
            console.log("[debug] error: basicCartoonFullimageGet() ===> %s", JSON.stringify(result));
        });

}

function convertImageByUsingCartoonLite(src_name, blockSize, C) {

    var apigClient = apigClientFactory.newClient();
    var params = {
        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
        name: "public/"+src_name,
        blocksize: blockSize,
        paramC: C
    };

    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        /*
        headers: {
            headers_param0: 'headers_param0',
            headers_param1: 'headers_param1'
        },
        */
        queryParams: {
            name: "public/"+src_name,
            blocksize: blockSize,
            paramC: C
        }
    };

    apigClient.cartoonLiteFullimageGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            //console.log("[debug] cartoonLiteFullimageGet(result) ===> %s", JSON.stringify(result));

            let filter_image = result.data.body.images;
            let images = JSON.parse(localStorage.getItem(kLS_IMAGES));
            $('#fullImage').attr('src', filter_image['dest']);
            images[kCARTOONLITE] = filter_image['dest'];
            localStorage.setItem(kLS_IMAGES, JSON.stringify(images));

            //console.log("[debug] cartoonLiteFullimageGet(images) ===> %s", JSON.stringify(images));
        })
        .catch(function(result){
            //This is where you would put   an error callback
            // catch errors...
            console.log("[debug] error: cartoonLiteFullimageGet() ===> %s", JSON.stringify(result));
        });

}
