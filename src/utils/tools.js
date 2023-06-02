/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\utils\tools.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Thursday, June 1st 2023, 6:12:21 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */

export function getFullTime(timeStamp) {
  if (typeof timeStamp !== 'number') return 'illegalParam'
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hours = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()
  return `${year}-${month}-${day} ${hours}:${minute}:${second}`
}
