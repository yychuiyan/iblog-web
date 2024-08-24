import qs from 'qs'
import { CategoryData } from '@/types/comm'
import IconFont from '../iconfont'
import { useArticleAllList } from '@/api/articles'
import { useNavigate, useLocation } from 'react-router-dom'
// 分类数量
const categoryCountFunction = (archiceAllSource) => {
  // 分类数量
  const newList =
    archiceAllSource &&
    archiceAllSource.map((item) => {
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
const CategorySwitch = () => {
  // 路由信息
  const location = useLocation()
  const navigate = useNavigate()
  const { c } = qs.parse(location.search.slice(1))
  // 获取全部文章
  const { articleAllList, isArticleAllListFetched } = useArticleAllList(1, 1)
  const articleAllSource =
    isArticleAllListFetched && articleAllList && articleAllList.data ? articleAllList.data.data : ''

  const artickeAllSourceTop =
    articleAllSource &&
    articleAllSource
      .map((item) => {
        return {
          ...item,
          isTop: Number(item.isTop)
        }
      })
      .sort((prev, curr) => {
        return curr.createTime - prev.createTime
      })
  const articleAllSourceFormat =
    artickeAllSourceTop &&
    artickeAllSourceTop.sort((prev, curr) => {
      return curr.isTop - prev.isTop
    })
  // 分类列表
  const categoryArticleList = categoryCountFunction(articleAllSourceFormat)

  // 路由跳转
  const handleCategory = (name: string) => {
    navigate(`/category?c=${name}`)
  }
  return (
    <div
      className="h-auto mb-5 overflow-hidden pb-3 bg-base-100 rounded-2xl mx-auto text-lg transition duration-500 ease-in-out  transform hover:translate-y-1 hover:scale-105
      lg:transition-none lg:hover:-translate-y-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
    "
      style={{ userSelect: 'none' }}
    >
      <p
        className="flex py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        <IconFont iconName="icon-grouping" className="text-[28px] pr-1"></IconFont>
        分类信息
      </p>
      <div className="w-[calc(100%+10px)] h-96 overflow-auto ">
        {categoryArticleList &&
          categoryArticleList.map((item: CategoryData, index: number) => {
            return (
              <p
                className={`flex justify-between  items-center${
                  item.name === c
                    ? ' h-8  m-3 px-3 text-base text-[var(--article-content-tags-bgcolor-hover-font)] bg-[var(--article-content-tags-bgcolor-hover)] hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 rounded-lg cursor-pointer'
                    : ' h-8  m-3 px-3  text-base  rounded-lg bg-base-100 hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 cursor-pointer'
                }`}
                key={index}
                onClick={() => handleCategory(item.name)}
              >
                <span>{item.name}</span>
                <span>{item.count}</span>
              </p>
            )
          })}
      </div>
    </div>
  )
}

export default CategorySwitch
