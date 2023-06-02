/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\core\ua.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Friday, June 2nd 2023, 2:35:06 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */

import Bowser from 'bowser'

/**获取宿主信息 */
export function getUserAgent() {
  const userAgent = window.navigator.userAgent
  const res = Bowser.parse(userAgent)
  const { browser, os, platform } = res
  const osStr = os.version ? `${os.name} (${os.version})` : os.name
  const deviceStr = platform.model ? `${platform.model} ${platform.type}` : platform.type
  return {
    browser: `${browser.name} (${browser.version})`,
    os: osStr,
    device: deviceStr,
  }
}
