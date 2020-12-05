export class RegExpHelper {
  static NON_NEGATIVE_INTEGER (val) {
    return /^\d+$/.test(val)
  }
  static POSITION_INTEGER (val) {
    return /^[0-9]*[1-9][0-9]*$/.test(val)
  }
  static EMAIL (val) {
    return /[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)
  }
  static URL (val) {
    return /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/.test(val)
  }
}

