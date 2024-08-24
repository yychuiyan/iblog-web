export interface FriendlyType {
  status: boolean
  checked: boolean
  avatar: string
  createTime: string
  desc: string
  link: string
  name: string
  updateTime: string
  _id: string
}
export interface FriendlyTypeResponse {
  checked: boolean
  status: boolean
  data: {
    data: FriendlyType[]
  }
}
