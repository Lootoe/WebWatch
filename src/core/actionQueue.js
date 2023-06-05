/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\core\action.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Monday, June 5th 2023, 9:37:49 am
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 *
 * 维护action堆栈
 */
export class ActionQueue {
  /**队列的最大存储量 */
  queue = []
  config
  reqStack = []
  isReporting = false

  constructor(config) {
    this.config = Object.assign(this.defaultConfig, config)
  }

  get defaultConfig() {
    return {
      queueSize: 10,
      beforePush: null,
    }
  }

  /**为了触发入队列之前的钩子函数 */
  pushAction(action) {
    if (typeof this.config.beforePush === 'function') {
      let result = this.config.beforePush(action)
      if (!result) {
        this.__pushAction(action)
      } else {
        this.__pushAction(result)
      }
      return
    } else {
      this.__pushAction(action)
    }
  }

  __pushAction(action) {
    // 如果时间不存在就添加时间，方便下面对比
    if (this.queue.length >= this.config.queueSize) {
      this.queue.shift()
    }
    this.queue.push(action)
  }

  // 拿到当前所有actions副本
  getActions() {
    return [...this.queue]
  }

  idleReport(fn) {
    if (!this.isReporting) {
      this.isReporting = true
      this.reqStack.push(fn)
      requestIdleCallback(() => {
        this.isReporting = false
        const callback = this.reqStack.shift()
        callback()
      })
    }
  }
}
