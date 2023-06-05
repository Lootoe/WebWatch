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
import { VERSION } from '../enums/type'
export class WebWatch {
  actionQueue
  actionTracker
  recorder
  /**用户上报给服务器时的额外数据 */
  extra
  /**上报给服务器的地址 */
  remoteUrl
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
    const { rrwebOptions, remoteUrl } = options
    this.actionQueue = new ActionQueue({ queueSize, beforePush })
    this.actionTracker = new ActionTracker()
    this.recorder = new Recorder({ config: rrwebOptions })
    this.remoteUrl = remoteUrl
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
      const fn = () => {
        const agent = getUserAgent()
        const actions = this.actionQueue.getActions()
        const payload = {
          agent,
          actions,
          sdkVersion: VERSION,
          extra: this.extra,
        }
        this.beforeReport(payload)
        report(this.remoteUrl, payload, data => {
          console.log('服务器链接已关闭，上报失败', data)
        })
      }
      this.actionQueue.idleReport(fn)
    }
  }
}
