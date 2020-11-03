export interface ITableState {
  tableHeader: Array<{  // 表头配置
    text?: string
    sortable?: boolean
    value?: string
    width?: number
  }>
  tableExpanded?: Array<any>,
  tableOptions: any // 表配置（分页...）
  tableDataset: Array<any> // 表数据
  tableTotal: number // 表数据条数
  loadDatasource () : void  // 表数据加载
}

export enum DialogType {
  Create, // 添加
  Update, // 更新
  WebFrame, // 网页
  Others, // 其他
}

export interface IDialogState {
  dialogVisible: Boolean // 弹窗可见状态
  dialogType?: DialogType // 弹窗显示内容
  closeDialog () : void // 关闭弹窗
  showDialog (item?: any) : void // 显示弹窗
}

export interface ICreationState {
  itemOfCreate: { [key: string]: any }
  createEnabled: any
  createItem () : void
  resetItem () : void
}


export interface IUpdatetionState {
  itemOfUpdate: { [key: string]: any }
  updateItem () : void
}

export interface IFocuState {
  focuItemId: number,
  
}
