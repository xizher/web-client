/**
 * 自定义事件类
 */
export declare class CustomEvent {
  /**
   * 绑定事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param scope 事件处理函数上下文
   * @returns 事件处理函数
   */
  on (name: string, fn: Function, scope?: Object): Function
  /**
   * 触发事件
   * @param name 触发的事件名称
   * @param data 触发传递的数据
   */
  fire (name: string, data?: any): void
  /**
   * 取消特定的绑定事件
   * @param name 取消的绑定事件
   * @param fn 需要的判定事件处理函数（null则移除全部）
   */
  off (name: string, fn?: Function): void
  /**
   * 绑定一次性事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param scope 事件处理函数上下文
   * @returns 事件处理函数
   */
  one (name: string, fn?: Function, scope?: any): Function
}