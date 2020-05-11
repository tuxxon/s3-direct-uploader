var uploader = new qq.s3.FineUploader({
    debug: false, // defaults to false
    element: document.getElementById('fine-uploader'),
    request: {
        // S3 Bucket URL
        endpoint: 'https://cf.stackcraft.co.s3.amazonaws.com', 
        // iam ACCESS KEY
        accessKey: 'AKIAXTQ5R7IXKVQ5E6R6' 
    },
    objectProperties: {
        region: 'ap-northeast-2',
        key(fileId) {
            var prefixPath = 'uploads'
            var filename = this.getName(fileId)
            return prefixPath + '/' + filename
        }
    },
    signature: {
        // version
        version: 4,
        // AWS API Gate URL
        endpoint: 'https://ie4lf9ccwb.execute-api.ap-northeast-2.amazonaws.com/prod/image'
    },
    retry: {
        enableAuto: true // defaults to false
    }
});