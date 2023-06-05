/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\core\index.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Monday, June 5th 2023, 11:14:11 am
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 */
import { ActionTracker } from './actionTracker'
import { ActionQueue } from './actionQueue'
import { Recorder } from './recorder'
import { getUserAgent } from './ua'
import { report } from '../utils/tools'
import { VERSION, ERRORTYPE } from '../enums/type'

export class WebWatch {
  actionQueue
  actionTracker
  recorder
  /**用户上报给服务器时的额外数据 */
  extra
  /**上报给服务器的地址 */
  actionUrl
  recordUrl
  /**在上报之前做点什么 */
  beforeReport
  /**
   *
   * @param {object} options 监控系统的配置
   * @param {any} extra 将会上报给服务器的用户定义的额外信息
   * @param {any} errHandle SDK内部错误的处理函数
   */
  constructor(options, extra) {
    const { queueSize, beforePush, beforeReport } = options
    const { rrwebOptions, actionUrl, recordUrl } = options
    this.actionQueue = new ActionQueue({ queueSize, beforePush })
    this.actionTracker = new ActionTracker()
    this.recorder = new Recorder({ config: rrwebOptions })
    this.actionUrl = actionUrl
    this.recordUrl = recordUrl
    this.extra = extra
    this.beforeReport = beforeReport
  }

  /**暴露给用户调用，init时才会开始提交actions */
  init() {
    // 将错误事件往队列里推
    this.actionTracker.init()
    this.actionTracker.onAction = pak => {
      this.actionQueue.pushAction(pak)
    }
    // 当捕获到错误时，拿当前队列的数据闲时上报
    this.actionTracker.onError = pak => {
      this.actionQueue.pushAction(pak)
      this.reportError()
    }
  }

  customError(message, detail) {
    // 拿到详细的报错信息
    const pak = {
      type: ERRORTYPE.CODE,
      message: message,
      detail: detail,
    }
    this.actionQueue.pushAction(pak)
    this.reportError()
  }

  reportError() {
    const fn = () => {
      // 上报actions
      const agent = getUserAgent()
      const actions = this.actionQueue.getActions()
      const payload1 = {
        agent,
        actions,
        sdkVersion: VERSION,
        extra: this.extra,
      }
      this.beforeReport(payload1)
      report(this.actionUrl, payload1, data => {
        console.log('服务器链接已关闭，上报失败', data)
      })
      // 上报events
      const evts = this.recorder.getRecentEvents(10)
      const payload2 = JSON.stringify({ events: evts })
      report(this.recordUrl, payload2, data => {
        console.log('服务器链接已关闭，上报失败', data)
      })
    }
    this.actionQueue.idleReport(fn)
  }
}
