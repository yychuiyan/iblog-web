import { CategoryData } from '@/types/comm'
import IconFont from '../iconfont'
import { useArticleAllList } from '@/api/articles'
import { useNavigate } from 'react-router-dom'
// 分类内容
const categoryListFunction = (archiceSource) => {
  // 分类数量
  const newList =
    archiceSource &&
    archiceSource.map((item) => {
      return {
        categories: item.categories,
        _id: item._id
      }
    })
  // 分类的数量汇总
  const obj = {}
  for (let i = 0; i < newList.length; i++) {
    const item = newList[i].categories
    obj[item] = obj[item] + 1 || 1
  }
  // 将对象封装成数组对象格式
  let categoryArticles = []
  const key = Object.keys(obj) // 取出当前对象的索引
  const values = Object.values(obj) // 取出当前对象的值
  let i = 1
  const arrObj = key.map((item, index) => {
    return {
      count: values[index], // values是一个数组，加index是为了拿到跟索引同个位置的值
      name: item,
      id: i++
    }
  })
  categoryArticles = arrObj
  return categoryArticles
}
const Category = () => {
  // 获取全部文章
  const { articleAllList, isArticleAllListFetched } = useArticleAllList(1, 1)
  // 路由跳转
  const navigate = useNavigate()
  const archiceAllSource =
    isArticleAllListFetched && articleAllList && articleAllList.data ? articleAllList.data.data : ''
  const categoryList = categoryListFunction(archiceAllSource)

  const handleCategory = (name: string) => {
    navigate(`/category?c=${name}`)
  }
  return (
    <div
      className="h-auto mb-5 pb-2 bg-base-100 rounded-2xl mx-auto text-lg transition duration-500 ease-in-out  transform  hover:scale-x-[104%] hover:scale-y-[102%]"
      style={{ userSelect: 'none' }}
    >
      <p
        className="flex py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        <IconFont iconName="icon-grouping" className="text-[28px] pr-1"></IconFont>
        分类信息
      </p>
      {categoryList.map((item: CategoryData, index: number) => {
        return (
          <p
            className="flex justify-between items-center h-8 m-3 px-3 text-base bg-base-200 rounded-lg hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 cursor-pointer"
            key={index}
            onClick={() => handleCategory(item.name)}
          >
            <span>{item.name}</span>
            <span>
              {item.count}
              <span></span>
            </span>
          </p>
        )
      })}
    </div>
  )
}

export default Category
