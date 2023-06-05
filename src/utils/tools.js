/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\utils\tools.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 6:12:21 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */

/**将时间戳转换为具体时间 */
export function getFullTime(timeStamp) {
  if (typeof timeStamp !== 'number') return 'illegalParam'
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const actualMonth = month <= 9 ? `0${month}` : month
  const day = d.getDate()
  const actualDay = day <= 9 ? `0${day}` : day
  const hours = d.getHours()
  const actualHours = hours <= 9 ? `0${hours}` : hours
  const minute = d.getMinutes()
  const actualMinute = minute <= 9 ? `0${minute}` : minute
  const second = d.getSeconds()
  const actualSecond = second <= 9 ? `0${second}` : second
  return `${year}-${actualMonth}-${actualDay} ${actualHours}:${actualMinute}:${actualSecond}`
}

/**将DOM转换为字符串 */
const serializer = new XMLSerializer()
export function serializeDOM(dom) {
  // 去除他的子节点，可以用复制节点来替代
  const domItSelf = dom.cloneNode(false)
  // <div xmlns="http://www.w3.org/1999/xhtml " id="unique"></div>
  const str = serializer.serializeToString(domItSelf)
  // 去除xmlns属性
  // 后面的\s{1}主要是去除空格，不然最后结果会有两个空格
  const reg = /xmlns\S+xhtml"\s{1}/
  const result = str.replace(reg, '')
  return result
}

/**
 *
 * @param {string} url 请求的URL
 * @param {object} data 请求的数据
 */
export function report(url, data, errCalllback) {
  const pak = JSON.stringify(data)
  // 当发生错误时，中断fetch请求
  const controller = new AbortController()
  const signal = controller.signal
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: signal,
    body: pak,
  }).catch(err => {
    controller.abort('fecth失败，中断请求')
    errCalllback(err)
  })
}
