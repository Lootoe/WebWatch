/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\enums\type.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 3:36:56 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */

/**错误的类型 */
export const ERRORTYPE = {
  RESOURE: 'ResourceError',
  CODE: 'CodeError',
  API: 'RequestError',
}

/**客户端操作类型 */
export const ACTIONTYPE = {
  CLICK: 'Click',
  ROUTER: 'Router Change',
  API: 'Request',
}

/**点击下面这些元素不会响应事件 */
export const IgnoreElement = [HTMLBodyElement, HTMLHtmlElement]

export const VERSION = '1.0.0'
