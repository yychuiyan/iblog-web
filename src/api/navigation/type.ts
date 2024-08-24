export interface NavigationType {
  category?: string
  classify: string
  status: boolean
  title: string
  avatar: string
  createTime: string
  desc: string
  link: string
  name: string
  updateTime: string
  _id: string
}
export interface NavigationTypeResponse {
  classify: string
  status: boolean
  data: {
    data: NavigationType[]
  }
}
export interface NavigationTypeFormat {
  category?: string
  site?: NavigationType[]
}
