const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise{
    constructor(executor){
        //状态
        this.state = PENDINGclear
        //成功的值
        this.value = undefined 
        //失败的值
        this.reason = undefined

        //池子
        //成功的回调
        this.onFulfiledCallbacks = []
        //失败的回调
        this.onRejectedCallbacks = []

        //成功的回调
        const resolve =(value) => {
            if(this.state == PENDING){
                this.state = FULFILLED
                this.value = value
                this.onFulfiledCallbacks.forEach(fn => fn())
            }
        }
        //失败的回调
        const reject =(reason) => {
            if(this.state == PENDING){
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try{
            executor(resolve,reject)
        }catch(e){
            reject(e)
        }
    }
    //then调用，发现你的异步操作还没做完
    //我等，你把我的相关方法加到你的回调池子里去
    then(onFulfiled,onRejected){
        if(this.state === FULFILLED){
            onFulfiled(this.value)
        }
        if(this.state === REJECTED){
            onRejected(this.reason)
        }
        if(this.state === PENDING){
            this.onFulfiledCallbacks.push(()=>{
                onFulfiled(this.value)
            })
            this.onRejectedCallbacks.push(() =>{
                onRejected(this.reason)
            })
        }
    }

    catch(onRejected){
        if(this.state === REJECTED){
            onRejected(this.reason)
        }
        if(this.state === PENDING){
            this.onRejectedCallbacks.push(() =>{
                onRejected(this.reason)
            })
        }
    }
}
MyPromise.all = function (promises){
    return new MyPromise((resolve,reject) =>{
        let result = []
        let count = 0
        promises.forEach((p,index) =>{
            p.then(
                (res)=>{
                    result[index] = res
                    count++;
                    if(count === promises.length){
                        resolve(result)
                    }
                },
                (err) =>{
                    reject(err)
                }
            )
        })
    })
}
MyPromise.race = function (promises){
    return new MyPromise((resolve,reject)=>{
        promises.forEach((p) =>{
            p.then(
                (res) => {
                    resolve(res)
                },
                (err) => {
                    reject(err)
                }
            )
        })
    })
}

const p = new MyPromise((resolve,reject) => {
    console.log('1111')
    setTimeout(() =>{
        resolve('成功')
    },1000)
})
p.then((res) =>{
    console.log('2222')
    console.log(res)
})