export interface Action {
  type?: string;
  articles?: string;
  comments?: string;
  message?: string;
  messages?: string;
  views?: number;
  about?: string;
  essay?: string;
  friendly?: string;
  mail?: string;
  verse?: string;
  mode?: number;
  isLoading?: boolean;
  userToken?: string;
}
interface DataType {
  createYear: any;
  comment: string;
  createTime: number;
  isTop: number;
  introduction: string;
  title: string;
  cover: string;
  _id: string;
  page: number;
  pageSize: number;
  status: number;
  publishStatus: number;
  categories: string;
  tags: string[];
}
export interface ArticleList {
  isTop: number;
  data: DataType[];
}
export interface CategoryData {
  views: any;
  id: Key | null | undefined;
  tags: any;
  history: any;
  data: any;
  title: ReactNode;
  count: number;
  name: string;
  categories: string;
  _id: string;
}
