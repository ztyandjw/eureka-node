var started = false
var discoverClient = require('./discoverClient')

//启动立刻注册
async function start(instanceInfo) {
	if(started == false) {
		started = true
		instanceInfo.setIsDirty()
		dirtyTimestamp = instanceInfo.isDirtyWithTime()
		if(dirtyTimestamp != null) {
			registerOk = await discoverClient.register(instanceInfo)
			if(registerOk) {
				instanceInfo.unsetIsDirty()
			}
			else {
				throw new Error('register discover failed')
			}
		}
	}
}

exports.start = start
