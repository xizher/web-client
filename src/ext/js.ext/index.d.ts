interface Date {
  /**
   * 日期格式化
   * @param fmt 格式化字符串
   * @returns 日期格式化结果
   */
  $format (fmt: string) : string
  /**
   * 获得当前日期的前些天或后些天
   * @param day 日期天数间隔数，-1表示前一天，1表示后一天，默认为1
   * @returns 新日期
   */
  $getNextDate (day: number): Date
  /**
   * 获得月份
   * @param b 是否获得真实月份
   */
  $getMonth (): Number
}

interface Array<T> {
  /**
   * 在数组指定位置插入对象
   * @param index 位置索引
   * @param item 插入的对象
   */
  $insert (index: number, item: any) : void
  /**
   * 删除数组指定位置的对象
   * @param index 删除的位置索引
   */
  $remove (index: number) : void
  /**
   * 清空数组
   */
  $clear () : void
  /**
   * 重置数组
   * @param items 新的数组子集
   */
  $reset (...items) : void
  /**
   * 移除数组指定的值（针对简单类型的数据）
   * @param val 移除的值
   * @param options 移除方式配置
   * @param options.many 是否移除所有，否则仅移除第一个，默认为false
   */
  $removeByValue (val: any, options: {
    many: boolean
  }) : void
  /**
   * 数组去重
   * @returns 范围唯一值数组
   */
  $unique () : void
  
  /**
   * 获得数组的唯一值
   * @returns 范围唯一值数组
   */
  $getUnique () : Array<any>
  /**
   * 判断数组是否相等（针对简单数组）
   * @param array 对比的目标数组
   * @returns 返回判断结果
   */
  $equal (array: Array<string | number | boolean>) : boolean
  /**
   * 查找对象数组中指定属性名和属性值的对象（针对简单对象数组）
   * @param propName 指定属性名
   * @param propValue 指定属性值
   * @returns 符合要求的第一个目标对象，不存在返回null
   */
  $findItem (propName: string, propValue: string | number | boolean) : object
  /**
   * 查找对象数组中指定属性名和属性值的所有对象（针对简单对象数组）
   * @param propName 指定属性名
   * @param propValue 指定属性值
   * @returns 目标对象数组，不存在空数组
   */
  $findItems (propName: string, propValue: string | number | boolean): object[]
  /**
   * 输出对象数组中指定属性名的属性值数组（针对简单对象数组）
   * @param propName 属性名
   * @returns 目标属性值数组
   */
  $propToArr (propName: string) : Array<any>
  /**
   * 获得数字数组总和
   * @returns 总和
   */
  $sum () : number
  /**
   * 获得数组最后一位对象
   * @returns 返回数组最后一位对象
   */
  $last () : any
  /**
   * 获得数字数组最大值
   * @returns 数字数组最大值
   */
  $max () : number
  /**
   * 获得数字数组最小值
   * @returns 数字数组最小值
   */
  $min () : number
  /**
   * 获得数字数组平均值
   * @returns 数字数组平均值
   */
  $ave () : number
}

interface Number {
  /**
   * 获取中文数字
   * @returns 中文数字
   */
  $toChineseNum () : string
  /**
   * 向下取整
   * @returns 向下取整结果
   */
  $floor () : number
  /**
   * 向上取整
   * @returns 向上取整结果
   */
  $ceil () : number
  /**
   * 获得绝对值
   * @returns 绝对值结果
   */
  $abs () : number
  /**
   * 获得保留数
   * @param count 保留的小数位
   * @returns 保留count位小数的数
   */
  $round (count: number) : number
  /**
   * 数字转日期格式化
   * @param fmt 格式化字符串
   */
  $toDateFormat (fmt: string) : string
}

interface String {
  /**
   * 判断是否为字符串数组中的某个值
   * @param arr 字符串数组
   * @returns 判断结果
   */
  $contain (arr: string[]) : boolean
  /**
   * 清空字符串所有空格
   * @returns 清空所有空格后的字符串
   */
  $trimAll () : string
  /**
   * 字符串替换（所有）
   * @param searchValue 被替换的字符串
   * @param replaceValue 替换字符串
   * @returns 替换后的字符串
   */
  $replaceAll (searchValue: string, replaceValue) : string

}