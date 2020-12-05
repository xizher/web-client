/**
 * 对象深拷贝
 * @param obj Javascript对象
 * @returns 深拷贝后的对象引用
 */
export declare function deepCopy (obj: Object): Object
/**
 * 获取GUID字符串
 * @returns GUID字符串
 */
export declare function guid (): String
/**
 * 获取当前页面的根地址
 * @returns 根地址字符串
 */
export declare function getRootPath (): String
/**
 * 获取指定范围随机数
 * @param minValue 最小值
 * @param maxValue 最大值
 * @returns 指定范围的随机数
 */
export declare function randomRange (minValue: Number, maxValue: Number): Number

/**
 * 加密算法
 * @param str 需要加密的字符串
 * @returns 加密后的字符串
 */
export declare function enCrypto (str: string): string

/**
 * 解密算法
 * @param str 需要解密的字符串
 * @returns 解密后的字符串
 */
export declare function deCrypto (str: string): string

/**
 * Crypto加密解密配置
 * @param options 配置信息
 */
export declare function setCryptoConfig (options: {
  key: string, iv: string
}) : void

/**
 * 设置cookie
 * @param key cookid键
 * @param value cookie值
 * @param options cookie过期事件配置
 */
export declare function setCookie (key: string, value: string, options: {
  days?: number, hours?: number, minutes?: number
}) : void

/**
 * 删除cookie
 * @param key cookie键
 */
export declare function delCookie (key: string) : void

/**
 * 获取cookie
 * @param key cookie键
 */
export declare function getCookie (key) : string

/**
 * 正则表达检查工具类
 */
export declare class RegExpHelper {
  /**
   * 是否为非负整数
   * @param val 检查对象
   */
  static NON_NEGATIVE_INTEGER (val: any) : boolean
  /**
   * 是否为正整数
   * @param val 检查对象
   */
  static POSITION_INTEGER (val: any) : boolean
  /**
   * 是否为email
   * @param val 检查对象
   */
  static EMAIL (val: any) : boolean
  /**
   * 是否为url
   * @param val 检查对象
   */
  static URL (val: any) : boolean
}

/**
 * 设置localStorage
 * @param key localStorage键
 * @param value localStorage值
 */
export declare function setLocalStorage(key: string, value: string) : void
/**
 * 获取localStorage
 * @param key localStorage键
 */
export declare function getLocalStorage(key: string) : void
/**
 * 删除localStorage
 * @param key localStorage键
 */
export declare function delLocalStorage(key: string) : void
/**
 * 设置sessionStorage
 * @param key sessionStorage键
 * @param value sessionStorage值
 */
export declare function setSessionStorage(key: string, value: string) : void
/**
 * 获取sessionStorage
 * @param key sessionStorage键
 */
export declare function getSessionStorage(key: string) : void
/**
 * 删除sessionStorage
 * @param key sessionStorage键
 */
export declare function delSessionStorage(key: string) : void


/**
 * 获取定位信息
 * @param options 定位配置
 */
export declare function getGeoLocation (options: {
  enableHighAccuracy?: boolean,
  timeout?: Number
  maximumAge?: Number
}) : Promise<{
  lat: Number
  lon: Number
  detial: {
    timestamp: Number
    coords: {
      accuracy: any
      altitude: any
      altitudeAccuracy: any
      heading: any
      latitude: any
      longitude: any
      speed: any
    }
  }
}>

/**
 * 启动定位监听
 * @param success 定位变化回调事件
 * @param error 定位失败回调事件
 * @param options 定位配置
 * @returns 关闭定位监听的对象
 */
export declare function watchGeoLocation (success: ({ lon, lat, detial }: {
  lon: Number, lat: Number, detial: {
    timestamp: Number
    coords: {
      accuracy: any
      altitude: any
      altitudeAccuracy: any
      heading: any
      latitude: any
      longitude: any
      speed: any
    }
  }
}) => void, error: ({ code, message }: {
  code: Number, message: String
}) => void, options: {
  enableHighAccuracy?: boolean,
  timeout?: Number
  maximumAge?: Number
}) : { remove: () => void }

/**
 * 判断网页是否通过移动端设备打开
 * @returns 是否通过移动端设备打开
 */
export declare function isFromMobileBrowser () : boolean
