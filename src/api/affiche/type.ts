export interface AfficheType {
  checked?: boolean
  content?: string
  createTime?: string
  updateTime?: string
  _id?: string
}

export interface AfficheListResponse {
  data: {
    data: AfficheType[]
  }
}
