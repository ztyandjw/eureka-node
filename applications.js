
class Applications {
	var appNameApplicationMap = new Map()
	var instanceMap = new Map()
	constructor(applications) {
		this.applications = applications
		currentApplications = this.applications.applications.application
		for(i in currentApplications) {
			appNameApplicationMap.set(currentApplications[i].name, currentApplications)
		}
	}

	getReconcileHashCode() {
		array = populateInstanceCountArray()
		code = ''
		for(i in array) {
			map = array[i]
			map.forEach((k,v) => {
				code + k + '_' + v + '_'
			})
		}
		return code
	} 

	populateInstanceCountArray() {
		var map = new Map()
		for(i in this.applications.application) {
			instances = applications[i].instance
			for(j in instances) {
				let v = map.get(instances[j].status
				if(v == undefined) {
					map.set(instances[j].status, 0)
				}
				else {
					map.set(instances[j].status, v + 1)
				}
			}
		}
		var instanceCountArray=	Array.from(map)
		instanceCountArray.sort(function(a,b){return a[0].localeCompare(b[0])})
		console.log(instanceCountArray)
		return instanceCountArray
	}


	filterAndShuffle() {
		for(i in this.applications.application) {
			instances = applications[i].instance
			let instanceArray = []
			for(j in instances) {
				if(instances[j].status == 'UP') {
					instanceArray.push(instances[j])
				}
			}
			for (let k = instanceArray.length - 1; k > 0; k--) {
		        const v = Math.floor(Math.random() * (k + 1));
		        [instanceArray[k], instanceArray[v]] = [instanceArray[v], instanceArray[k]];
	    	}
	    	applications[i].instance = instanceArray
		}
	}

	addApplication(application) {
		this.applications.application.push(application)
	}

	removeInstance(instance) {
		name = instance.app
		instanceId = instance.instanceId
		for(i in this.applications.application) {
			if(applications[i].name == name) {
				instances = applications[i].instance
				let instancesArray = []
				for(j in instances) {
					if(instances[j].instanceId !== instanceId) {
						instancesArray.push(instances[j])
					}
				}
				applications[i].instance = instancesArray
			}
		}
	}

	addInstance(instance) {
		name = instance.app
		instanceId = instance.instanceId
		for(i in this.applications.application) {
			if(applications[i].name == name) {
				instances = applications[i].instance
				let instancesArray = []
				for(j in instances) {
					if(instances[j].instanceId == instanceId) {
						instancesArray.push(instances[j])
					}
					else {
						instancesArray.push(instances[j])
					}
				}
				applications[i].instance = instancesArray
				
			}
		}
	}
}




module.exports = Applications


// class Application {


// 	constructor(applicaton) {
// 		this.applicaton = applicaton
// 	}

// 	getInstances() {
// 		let result = []
// 		this.application.instance.forEach((n) => {
// 			result.add(new Instance(n))
// 		})
// 		return result

// 	}
// }


// class Instance {
// 	constructor(instance) {
// 		this.instance = instance
// 	}

// }







// function addInstance(apps, appName, instance) {

// 	applications = delta.applications.application
// 	for(i1 in applications) {
// 		application = applications[i1]

// 	}



// }