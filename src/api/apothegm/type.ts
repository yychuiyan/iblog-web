export interface ApothegmType {
  checked: boolean
  author: string
  content: string
  createTime: string
  updateTime: string
  _id: string
}

export interface ApothegmTypeResponse {
  data: {
    data?: ApothegmType[]
  }
}
