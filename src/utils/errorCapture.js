/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\utils\errorCapture.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 3:02:21 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 *
 * 拦截错误事件
 */

import StackTracey from 'stacktracey'
import { proxy, unProxy } from 'ajax-hook'

import * as Type from '../enums/type'
import * as Msg from '../enums/msg'

let eventTable = {}

/**处理资源报错 */
function __handleResourceError(event) {
  // script image采用src，link采用href
  const url = event.target.src || event.target.href
  return {
    type: Type.ERRORTYPE.RESOURE,
    message: event.message || Msg.ERRORMSG[Type.ERRORTYPE.RESOURE],
    detail: {
      url: url,
    },
  }
}

/**处理代码报错 */
function __handleCodeError(event, stack) {
  const tracey = new StackTracey(stack)
  // 拿到详细的报错信息
  const errorStack = tracey.items[0]
  return {
    type: Type.ERRORTYPE.CODE,
    message: event.message || event.reason.msg || Msg.ERRORMSG[Type.ERRORTYPE.CODE],
    detail: {
      line: errorStack.line,
      column: errorStack.column,
      fileName: errorStack.fileName,
    },
  }
}

function __handlePromiseError(event, message) {
  return {
    type: Type.ERRORTYPE.CODE,
    message: message || Msg.ERRORMSG.PROMISE,
    detail: {
      reason: event.reason,
    },
  }
}

function __handleAPIError(xhrData, message) {
  return {
    type: Type.ERRORTYPE.API,
    message: message || Msg.ERRORMSG[Type.ERRORTYPE.API],
    datail: xhrData,
  }
}

/**error事件处理 */
export function captureCodeError(errHandle) {
  eventTable.handleCodeError = event => {
    event.preventDefault()
    // 判断是否是资源报错，资源报错与代码报错区分开
    const isResource = event.target instanceof HTMLScriptElement || event.target instanceof HTMLLinkElement || event.target instanceof HTMLImageElement
    // 资源报错没有target，但是能拿到URL；
    // 代码报错有，代码报错能拿到报错堆栈
    let pak = null
    if (isResource) {
      pak = __handleResourceError(event)
    } else {
      pak = __handleCodeError(event, event.error.stack)
    }
    errHandle && errHandle(pak)
  }
  window.addEventListener('error', eventTable.handleCodeError, true)
}

/**unhandledrejection事件处理 */
export function capturePromiseError(errHandle) {
  eventTable.handlePromiseError = event => {
    event.preventDefault()
    let pak = null
    if (typeof event.reason === 'string') {
      pak = __handlePromiseError(event)
    } else {
      // 对象情况下有可能是代码报错引起的，此时能捕获到错误堆栈
      // 也有可能是自行Reject的，此时只有Reject的信息
      // 所以需要判断一下是哪一种
      if (event.reason.stack) {
        pak = __handleCodeError(event, event.reason.stack)
      } else {
        pak = __handlePromiseError(event)
      }
    }
    errHandle && errHandle(pak)
  }
  window.addEventListener('unhandledrejection', eventTable.handlePromiseError)
}

export function captureAPIError(resHandle, errHandle) {
  proxy({
    //请求发起前进入
    onRequest: (config, handler) => {
      const xhrData = Object.assign(
        {},
        {
          method: config.method,
          url: config.url,
          body: config.body,
        }
      )
      // 挂载在config上，保证每次ajax请求的xhrData不同
      config.xhrData = xhrData
      handler.next(config)
    },
    onResponse: (response, handler) => {
      const status = response.status
      let xhrData = response.config.xhrData
      if (status === 200) {
        xhrData = Object.assign(xhrData, { response: response.response })
        resHandle && resHandle(xhrData)
      } else {
        const pak = __handleAPIError(xhrData)
        errHandle && errHandle(pak)
      }
      handler.next(response)
    },
  })
}

/**移除所有事件监听器 */
export function desotry() {
  eventTable.handleCodeError && window.removeEventListener('error', eventTable.handleCodeError)
  eventTable.handlePromiseError && window.removeEventListener('unhandledrejection', eventTable.handlePromiseError)
  unProxy()
  eventTable = null
}
