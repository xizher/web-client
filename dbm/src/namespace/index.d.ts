declare const WXZ : {
  Ajax: {
    axiosGet (url: string, params?: any, options?: any) : Promise<any>
    axiosPost (url: string, body?: any, options?: any) : Promise<any>
  }
}