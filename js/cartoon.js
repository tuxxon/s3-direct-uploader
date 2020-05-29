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

 const SERVER_URL = "https://fz53s03zpl.execute-api.ap-northeast-2.amazonaws.com/dev"
 const UPLOAD_URI = "/image?"
 const CONVERT_URI = "/cartoonaf?"

function getSignedURLforUploading() {

}

function getImagesForCartoon() {
    console.log("...UUID>" + UUID.generate() );

    var postUrl = SERVER_URL + UPLOAD_URI + "name="+UUID.generate()+".png";

    console.log("...postURL>" + postUrl );

    $.post( postUrl, function( data ) {
        console.log(".. result >"+ data)
        //$( ".result" ).html( data );
    });
    //console.log("...cv images!!!...");
}