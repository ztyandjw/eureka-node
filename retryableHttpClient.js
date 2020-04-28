const region = 'shanghai'
const serviceUrls = {'shanghai-1': 'http://127.0.0.1:8661/eureka,http://127.0.0.1:8662/eureka'}
const numberOfRetries = 3
var restTemplate = require('./discoverRestHttpClient')
var currentHttpClient = require('./discoverRestHttpClient')
var DiscoverException = require('./DiscoverException')
var discoverRestHttpClient = require('./discoverRestHttpClient')


class EndPoint {
	constructor(serviceUrl, region, zone) {
		this.serviceUrl = serviceUrl
		this.region = region
		this.zone = zone
	}
}

var candidateHosts = getHostCandidates()


async function execute(requestType, requestExecutor, instanceInfo) {
	endpointIdx = 0
	for(retry = 0; retry < numberOfRetries; retry++ ) {
		// if(endpointIdx > candidateHosts.length) {
		// 	throw new Error('Cannot execute request on any known server')
		// }
		console.log(endpointIdx + ': ' + candidateHosts.length)
		if(endpointIdx == candidateHosts.length) {
			break
		}
		currentEndpoint = candidateHosts[endpointIdx]
		
		httpResponse = await requestExecutor(currentEndpoint.serviceUrl, instanceInfo).catch((error)=> {
			console.error('Request execution failed with message:' + error.message)
		})
		
		if((httpResponse !== undefined) && responseEvaluator(httpResponse, requestType)) {
			if(retry > 0) {
				console.log('Request execution succeeded on retry #' + retry)
			}
			return httpResponse
		}
		console.error('Request execution failure with status code' + httpResponse.statusCode + '; retrying on another server if available')
		
		endpointIdx++
	}
	throw new Error('Retry limit reached; giving up on completing the request')
}


function responseEvaluator(response, requestType) {
	statusCode = response.statusCode
	if (statusCode >= 200 && statusCode < 300 || statusCode == 302) {
        return true
    }
    else if(requestType == 'Register' && statusCode == 404) {
    	return true
    }
    else if(requestType == 'SendHeartBeat' && statusCode == 404) {
    	return true
    }
}

function getHostCandidates() {
	candidateHosts = []
	for(zone in serviceUrls) {
		urls = serviceUrls[zone].split(',')
		for(i = 0; i < urls.length; i++) {	
			if(urls[i].charAt(urls[i].length - 1) !== '/') {
				candidateHosts.push(new EndPoint(urls[i] + '/', region, zone))
			}
			else {
				candidateHosts.push(new EndPoint(urls[i], region, zone))
			}
		}
		
	}
	return candidateHosts

}

exports.execute = execute


