/**错误的类型 */
export const ERRORTYPE = {
  RESOURE: 'ResourceError',
  CODE: 'CodeError',
  API: 'RequestError',
}

/**当错误没有具体消息时，将会采用此消息 */
export const ERRORMSG = {
  [ERRORTYPE.RESOURE]: 'Resource Load Failed',
  [ERRORTYPE.CODE]: 'Unexpected Code Error',
  [ERRORTYPE.API]: 'Request Failed',
  PROMISE: 'Promise Rejected',
}
