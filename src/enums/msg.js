/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\enums\msg.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Friday, June 2nd 2023, 10:32:13 am
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */

import * as Type from './type'

/**当错误没有具体消息时，将会采用此消息 */
export const ERRORMSG = {
  [Type.ERRORTYPE.RESOURE]: 'Resource Load Failed',
  [Type.ERRORTYPE.CODE]: 'Unexpected Code Error',
  [Type.ERRORTYPE.API]: 'Request Failed',
  PROMISE: 'Promise Rejected',
}
