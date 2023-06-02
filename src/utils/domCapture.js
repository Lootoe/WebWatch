/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\utils\domCapture.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 3:02:27 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 *
 * 拦截点击事件
 */

import * as TYPE from '../enums/type'
import * as Tools from './tools'
let eventTable = {}

function __handleDOMEvent(event) {
  const x = event.screenX
  const y = event.screenY
  return {
    /**点击在屏幕的什么位置 */
    clickPos: [x, y],
    /**是鼠标点击还是屏幕触控 */
    pointerType: event.pointerType,
  }
}

export function captureDOM(resHandle) {
  eventTable.handleClickEvent = event => {
    // 点击这些元素不会响应
    const elemConstructor = event.target.constructor
    const exist = TYPE.IgnoreElement.includes(elemConstructor)
    if (exist) return
    const domString = Tools.serialize(event.target)
    const data = __handleDOMEvent(event)
    const pak = {
      type: TYPE.ACTIONTYPE.CLICK,
      detail: {
        dom: domString,
        ...data,
      },
    }
    resHandle && resHandle(pak)
  }
  window.addEventListener('click', eventTable.handleClickEvent)
}

export function destory() {
  window.removeEventListener('click', eventTable.handleClickEvent)
  eventTable = null
}
