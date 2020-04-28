


// function xixi(adf, f) {
// 	f(adf)
// }

// xixi('123', () => {
	
// })




    // Promise.timeout = function(timeout, cb) {
    //   return Promise.race([
    //     new Promise(cb),
    //     new Promise(function(resolve, reject) {
    //       setTimeout(function() {
    //         reject('Future Timed out');
    //       }, timeout);
    //     })
    //   ]);
    // }
    
    // function delayedHello(cb){
    //   setTimeout(function(){
    //     cb('Hello');
    //     }, 1000);
    //   }
    
    // Promise.timeout(800, delayedHello).then(function(data){
    //   console.log(data);
    //   }).catch(function(e){
    //   console.log(e);
    //   }); //delayedHello doesn't make it.

    // Promise.timeout(1200, delayedHello).then(function(data){
    //   console.log(data);
    //   }).catch(function(e){
    //   console.log(e);
    //   }); //delayedHello makes it.


// console.log(`%{}{} - Heartbeat status: {}`, 'aa', 'bb', 'cc');

// var a = []
// a.push(1)
// a.push(2)
// console.log(a)

// var c = []

// a.forEach((n) => {
// 	c.push(n)
// })
// console.log(c)


var a = new Map()
a.set('UP', '1')
a.set('DOWN', '3')

a.forEach((k, v) => {
	console.log(k)
	console.log(v)
})
