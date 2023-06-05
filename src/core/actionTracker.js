/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\core\captureUserAction.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 2:27:01 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */
import { domCapture, errorCapture, requestCapture, routerCapture } from '../utils/index'
import { getFullTime } from '../utils/tools'
import { uid } from 'uid'
import { ERRORTYPE } from '../enums/type'
export class ActionTracker {
  /**当有用户行为时触发 */
  onAction
  /**当报错的时候触发 */
  onError

  constructor() {
    /**其作为回调函数，this为undefined ，所以需要在这里绑定一下*/
    this.__dispatchAction = this.__dispatchAction.bind(this)
    this.__dispatchError = this.__dispatchError.bind(this)
    this.__dispatchAPIError = this.__dispatchAPIError.bind(this)
  }

  /**对捕获的数据统一加工处理 */
  __handlePak(pak) {
    //   添加时间字符串
    const timeStamp = Date.now()
    const timeNow = getFullTime(timeStamp)
    pak.time = timeNow
    pak.id = uid(7)
    return pak
  }

  __dispatchAction(pak) {
    const result = this.__handlePak(pak)
    this.onAction && this.onAction(result)
  }

  __dispatchError(pak) {
    const result = this.__handlePak(pak)
    this.onError && this.onError(result)
  }

  __dispatchAPIError(xhrData) {
    const response = JSON.parse(xhrData.data.response)
    const code = response.code
    if (code && code !== 200) {
      xhrData.type = ERRORTYPE.API
      this.__dispatchError(xhrData)
    }
  }

  init() {
    domCapture.captureDOM(this.__dispatchAction)
    routerCapture.captureRouteChange(this.__dispatchAction)
    errorCapture.captureCodeError(this.__dispatchError)
    errorCapture.capturePromiseError(this.__dispatchError)
    errorCapture.captureAPIError(data => {
      requestCapture.captureRequest(data, this.__dispatchAPIError)
    }, this.__dispatchError)
  }

  destory() {
    errorCapture.desotry()
    domCapture.destory()
    routerCapture.destory()
  }
}
