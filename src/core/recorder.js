/*
 * Filename: c:\Users\檀庭稳\Desktop\webWatch\src\core\recorder.js
 * Path: c:\Users\檀庭稳\Desktop\webWatch
 * Created Date: Friday, June 2nd 2023, 2:59:27 pm
 * Author: lootoe-company
 *
 * Copyright (c) 2023 Your Company
 *
 * 需要的功能如下：
 * 全量录制视频
 * 定量录制视频
 */
import * as rrweb from 'rrweb'

export class Recorder {
  /**分布录制的事件集 */
  eventMatrix = [[]]
  /**停止录制时的所有事件集 */
  allEvents = []
  /**开始DOM录制 */
  start
  /**结束DOM录制，不是真正结束，而是获取此时的事件副本 */
  stop

  /**是否调用了停止方法 */
  recording

  /**真正地停止录制 */
  rrwebStopFn

  /**最多能录制多少个事件集，防止存储的数据太多 */
  maxLength = 40

  constructor(config) {
    const __this = this
    this.start = () => {
      // 没有录制时，才能开始
      if (!this.recording) {
        this.allEvents = []
        this.recording = true

        this.stop = () => {
          this.recording = false
        }
      }
    }

    let options = typeof config === 'object' ? config : {}

    this.rrwebStopFn = rrweb.record({
      emit(event, isCheckout) {
        if (isCheckout) {
          if (__this.eventMatrix.length >= __this.maxLength) {
            __this.eventMatrix = []
          }
          __this.eventMatrix.push([])
        }
        const lastIndex = __this.eventMatrix.length - 1
        __this.eventMatrix[lastIndex].push(event)
        // 正在录制时才会向所有的添加至所有事件
        __this.recording && __this.allEvents.push(event)
      },
      /**每隔多久制作一次快照，默认是1秒，大于这个时间会导致录制时间不准确 */
      checkoutEveryNms: 1 * 1000,
      ...options,
    })
  }

  /**获取从开始到结束的所有事件 */
  getAllEvents() {
    // 没有结束的话，就返回空
    if (!this.recording) {
      return this.allEvents
    } else {
      return []
    }
  }

  /**获取特定时间的事件 */
  getRecentEvents(time) {
    const actualCount = Math.min(this.eventMatrix.length, time)
    const lastIndex = this.eventMatrix.length - 1
    const eventsSource = []
    for (let i = 0; i < actualCount; i++) {
      eventsSource.push(this.eventMatrix[lastIndex - i])
    }
    const events = eventsSource.flat()
    return events
  }

  /**调试用的播放器 */
  debugPlay(events) {
    if (events.length > 2) {
      const player = new rrweb.Replayer(events)
      player.play()
      // 播放完就销毁
      player.on('finish', () => {
        const elemPlayer = document.querySelector('.replayer-wrapper')
        player.destroy()
        elemPlayer && elemPlayer.remove()
      })
    }
  }

  destory() {
    this.stop()
    this.rrwebStopFn()
    this.eventMatrix = null
    this.allEvents = null
  }
}
