export interface ReaderType {
  status: number
  checked: boolean
  avatar: string
  createTime: string
  desc: string
  link: string
  name: string
  updateTime: string
  _id: string
}
export interface ReaderTypeResponse {
  checked: boolean
  status: number
  data: {
    data: ReaderType[]
  }
}
