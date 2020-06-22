
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
const  kSTYLE = "style";
const  kPS_COLOR = "ps-color";
const  kPS_GRAY = "ps-gray";
const  kSOURCE = "source";
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
