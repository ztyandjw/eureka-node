const os = require('os')


class LeaseInfo {
	constructor(renewalIntervalInSecs, durationInSecs, registrationTimestamp, lastRenewalTimestamp, 
		renewalTimestamp, evictionTimestamp, serviceUpTimestamp){
      this.renewalIntervalInSecs = 30
      this.durationInSecs = 90
      this.registrationTimestamp = 0
      this.lastRenewalTimestamp = 0
      this.renewalTimestamp = 0
      this.evictionTimestamp = 0
      this.serviceUpTimestamp = 0
    }

    static build() {
    	return new LeaseInfo()
    }
}
var isInstanceInfoDirty = false






class InstanceInfo {

    constructor(internalIsntanceInfo) {
      this.instance = internalIsntanceInfo
    }
    static build(internalIsntanceInfo) {
        return new InstanceInfo(internalIsntanceInfo)
    }

    getAppName() {
        return this.instance.app
    }

    getId() {
        return this.instance.instanceId
    }

    getLastDirtyTimestamp() {
        return this.instance.lastDirtyTimestamp
    }

    isDirtyWithTime() {
        if(isInstanceInfoDirty) {
            return this.instance.lastDirtyTimestamp
        }
        else {
            return null
        }
    }


    unsetIsDirty() {
        isInstanceInfoDirty = false
    }

    setIsDirtyWithTime() {
        setIsDirty()
        return this.instance.lastDirtyTimestamp
    }

    setIsDirty() {
        isInstanceInfoDirty = true
        this.instance.lastDirtyTimestamp = new Date().valueOf()
    }
}

class InternalIsntanceInfo {

    


    constructor(appName, port) {
        this.instanceId = InternalIsntanceInfo.generateHostName() + ":" + appName + ":" + port
        this.app = appName
        this.hostName = InternalIsntanceInfo.generateHostName()
        this.status = 'UP'
        this.overriddenStatus = 'UNKNOWN'
        this.ipAddr = InternalIsntanceInfo.generateIpAddress()
        this.lastUpdatedTimestamp = new Date().valueOf()
        this.lastDirtyTimestamp = this.lastUpdatedTimestamp
    }
   static build(appName, port) {
        return new InternalIsntanceInfo(appName, port).portWrapper(port).dataCenterWrapper().leaseInfoWrapper()
    }
    static generateHostName() {
　　    return os.hostname()
    }
    static generateIpAddress() {
      var interfaces = os.networkInterfaces();
      for (var devName in interfaces) {
          var iface = interfaces[devName];
          for (var i = 0; i < iface.length; i++) {
              var alias = iface[i]
              if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                  return alias.address
              }
          }
      }
    }
  	portWrapper(port) {
        var obj = {}
        obj['@enabled'] = true
        obj['$'] = port
    		this.port = obj
        return this
  	}
    dataCenterWrapper() {
        var obj = {}
        obj['@class'] = "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo"
        obj['name'] = 'MyOwn'
        this.dataCenterInfo = obj
        return this
    }
    leaseInfoWrapper() {
        this.leaseInfo = LeaseInfo.build()
        return this
    }


}

function create(appName, port) {
    return InstanceInfo.build(InternalIsntanceInfo.build(appName, port))
}







exports.create = create


