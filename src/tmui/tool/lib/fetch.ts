import { fetchConfig,fetchConfigMethod } from './interface';
let config:fetchConfig={
    url:"",
    data:{},
	statusCode:200,
    header:{
        // "content-type":"application/json"
    },
    method:"POST",
    timeout:60000,
    dataType:"json",
    responseType:"text",
    sslVerify:true,
    withCredentials:false,
    firstIpv4:false
}

function request(cog:fetchConfig = config,complete?:Function,beforeRequest?:Function,afterRequest?:Function):Promise<UniApp.GeneralCallbackResult|UniApp.RequestSuccessCallbackResult>{
    let newConfig = {...config,...cog}
    return new Promise(async (resolve,reject)=>{
        if(typeof beforeRequest === 'function'){
            let opts = await beforeRequest(newConfig);
            if(typeof opts !=='object'){
                opts = {};
            }
            newConfig = {...newConfig,...opts};
        }
        uni.request({
            url:newConfig.url||"",
            data:newConfig.data,
            header:newConfig.header,
            method:newConfig.method,
            timeout:newConfig.timeout,
            dataType:newConfig.dataType,
            responseType:newConfig.responseType,
            sslVerify:newConfig.sslVerify,
            withCredentials:newConfig.withCredentials,
            firstIpv4:newConfig.firstIpv4,
            async success(result) {
				
				if(result.statusCode !==newConfig?.statusCode){
					reject(result)
					return;
				}
                if(typeof afterRequest === 'function'){
                    let opts = await afterRequest(result);
                    
					try{
						if(typeof opts !=='object'){
						    opts = result;
						}
						if(typeof opts ==='object' && Object.keys(opts)?.length==0){
						    opts = result;
						}
					}catch(e){
						console.error('tmui:',e)
					}
                    result = {...opts};
                }
                resolve(result)
            },
            fail(result) {
                reject(result)
            },
            complete(result) {
                if(typeof complete === "function"){
                    complete(result)
                }
            },
        })
    })
}
var beforeRequest:Function = (val:fetchConfig)=>val;
var afterRequest:Function = (val:fetchConfig)=>val;
export class fetchNet {

    /**
     * ??????????????????
     * @param cog ??????????????????fetchConfig
     * @param beforeRequest ????????????????????????????????????Promise,?????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @param afterRequest ????????????????????????????????????Promise,???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     */
    constructor(cog:fetchConfig,beforeRequestFun?:Function,afterRequesFunt?:Function){
        config = {...config,...(cog||{})};
        if(typeof beforeRequestFun == 'function'){
            beforeRequest = beforeRequestFun;
        }
        if(typeof afterRequesFunt == 'function'){
            afterRequest = afterRequesFunt;
        }
    }
    static get(url:string,data:object={},opts:fetchConfig={}){
        let cfg:fetchConfig =  {...config,...(opts||{}),url:url,method:"GET",data:data};
        return request(cfg)
    }
    static post(url:string,data:object={},opts:fetchConfig={}){
        let cfg:fetchConfig =  {...config,...(opts||{}),url:url,method:"POST",data:data};
        return request(cfg)
    }
    /**
     * ??????
     * @param cog ??????
     * @param complete ??????????????????????????????
     */
    static async request(cog:fetchConfig = config,beforeFun?:Function,afterFun?:Function,complete?:Function){
        let newConfig = {...config,...cog}
        if(typeof beforeFun == 'function'){
            let testFun = await beforeFun();
            let cb:UniApp.GeneralCallbackResult = {errMsg:"????????????"}
            if(!testFun) return cb;
        }
        return request(newConfig,complete,(beforeFun||beforeRequest),(afterFun||afterRequest));
    }
}
