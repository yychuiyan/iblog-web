export interface AboutType {
  content: string
  _id: string
  checked: boolean
  createTime: string
  updateTime: string
}
export interface AboutTypeResponse {
  data: {
    data: AboutType[]
  }
}
