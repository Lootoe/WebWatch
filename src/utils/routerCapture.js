/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\utils\routerCapture.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Friday, June 2nd 2023, 8:59:22 am
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 *
 * 拦截路由跳转
 */
import { ACTIONTYPE } from '../enums/type'
const originPushState = window.history.pushState
const originReplaceState = window.history.replaceState

function __handleRouterChange(funcName, resHandle) {
  const origin = window.history[funcName]
  return function (...args) {
    const to = args.length >= 2 ? args[2] : undefined
    if (to) {
      const pak = {
        type: ACTIONTYPE.ROUTER,
        detail: {
          changeType: funcName,
          from: window.location.href,
          to: String(to),
        },
      }
      resHandle && resHandle(pak)
    }
    return origin.apply(this, args)
  }
}

export function captureRouteChange(resHandle) {
  window.history.pushState = __handleRouterChange('pushState', resHandle)
  window.history.replaceState = __handleRouterChange('replaceState', resHandle)
}

export function destory() {
  window.history.pushState = originPushState
  window.history.replaceState = originReplaceState
}
