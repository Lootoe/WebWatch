/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\utils\requestCapture.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 3:02:35 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 *
 * 拦截接口请求
 */

import { ACTIONTYPE } from '../enums/type'

/**捕获接口请求，参数是CaptureAPIError传过来的数据 */
export function captureRequest(data, resHandle) {
  const pak = {
    type: ACTIONTYPE.API,
    data: data,
  }
  resHandle && resHandle(pak)
}
