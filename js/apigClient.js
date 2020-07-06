/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://fz53s03zpl.execute-api.ap-northeast-2.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.basicCartoonFullimageGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['paramC', 'blocksize', 'name', 'body'], ['body']);
        
        var basicCartoonFullimageGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/basic-cartoon-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['paramC', 'blocksize', 'name', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(basicCartoonFullimageGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.basicCartoonFullimageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var basicCartoonFullimageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/basic-cartoon-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(basicCartoonFullimageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.cartoonLiteFullimageGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['paramC', 'blocksize', 'name', 'body'], ['body']);
        
        var cartoonLiteFullimageGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/cartoon-lite-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['paramC', 'blocksize', 'name', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(cartoonLiteFullimageGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.cartoonLiteFullimageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var cartoonLiteFullimageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/cartoon-lite-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(cartoonLiteFullimageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.cartoonafGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['name', 'body'], ['body']);
        
        var cartoonafGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/cartoonaf').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['name', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(cartoonafGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.cartoonafPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['filter', 'name', 'body', 'flags', 'sigma_s', 'shade_factor', 'sigma_r'], ['body']);
        
        var cartoonafPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/cartoonaf').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['filter', 'name', 'flags', 'sigma_s', 'shade_factor', 'sigma_r']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(cartoonafPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.cartoonafPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['name', 'body'], ['body']);
        
        var cartoonafPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/cartoonaf').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['name', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(cartoonafPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.cartoonafOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var cartoonafOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/cartoonaf').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(cartoonafOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.fullimageGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['filter', 'name', 'body', 'flags', 'sigma_s', 'shade_factor', 'sigma_r'], ['body']);
        
        var fullimageGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['filter', 'name', 'flags', 'sigma_s', 'shade_factor', 'sigma_r']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(fullimageGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.fullimageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var fullimageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(fullimageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.imageGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var imageGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/image').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(imageGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.imageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var imageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/image').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(imageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.normalCartoonFullimageGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['min', 'name', 'max', 'body'], ['body']);
        
        var normalCartoonFullimageGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/normal-cartoon-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['min', 'name', 'max', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(normalCartoonFullimageGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.normalCartoonFullimageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var normalCartoonFullimageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/normal-cartoon-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(normalCartoonFullimageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sketchifyFullimageGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['sigma', 'name', 'body'], ['body']);
        
        var sketchifyFullimageGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sketchify-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['sigma', 'name', ]),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sketchifyFullimageGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sketchifyFullimageOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sketchifyFullimageOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sketchify-fullimage').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sketchifyFullimageOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
