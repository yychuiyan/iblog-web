import { useNavigate, useLocation } from 'react-router-dom'
import qs from 'qs'
import styled from 'styled-components'
import { colors } from '@/utils/enum'
import IconFont from '../iconfont'
import { ArticleType } from '@/api/articles/type'
import { useArticleAllList } from '@/api/articles'
// 标签列表
const tagsCountFunction = (archiceAllSource) => {
  // 展开全部标签数据
  const newTags = archiceAllSource && archiceAllSource.map((item) => item.tags)
  const newArr: ArticleType[] = []
  for (let i = 0; i < newTags.length; i++) {
    newArr.push(...newTags[i])
  }
  // 遍历去重
  const tagsArr = []
  for (let i = 0; i < newArr.length; i++) {
    tagsArr.indexOf(newArr[i]) === -1 ? tagsArr.push(newArr[i]) : tagsArr
  }
  // 转换为数组对象
  let i = 0
  const tags = tagsArr.map((tag) => {
    return {
      name: tag,
      id: i++
    }
  })
  const tagsList = tags
  return tagsList
}
const Tags = () => {
  // 路由跳转
  const location = useLocation() // 列表
  const navigate = useNavigate()

  const { t } = qs.parse(location.search.slice(1))
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
  // 标签数量
  const tagsList = tagsCountFunction(articleAllSourceFormat)

  const handleTags = (name: string, event: React.MouseEvent) => {
    event.preventDefault()
    navigate(`/tags?t=${name}`)
  }
  // 使用styled-components创建带有背景颜色的标签组件
  const RandomColorTag = styled.span`
    display: inline-block;
    line-height: 30px;
    border-radius: 8px;
    padding-left: 5px;
    padding-right: 5px;
    color: #fff;
    font-size: 15px;
    background-color: ${(props) => props.color};
  `

  return (
    <div
      className="overflow-y-auto overflow-x-hidden z-200 pb-3 mb-5 bg-base-100 rounded-2xl mx-auto text-lg  transition duration-500 ease-in-out  transform hover:translate-y-1 hover:scale-105
      lg:transition-none lg:hover:-translate-y-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
    "
      style={{ userSelect: 'none' }}
    >
      <p
        className="flex py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        <IconFont
          iconName="icon-biaoqian"
          className="text-[28px] text-[var(--color-icon-default)] pr-1"
        ></IconFont>
        全部标签
      </p>
      <div className="max-h-[24.5rem] w-[calc(100%+10px)] overflow-auto">
        {tagsList &&
          tagsList.map((item, index) => {
            return (
              <p
                className={`inline-block my-2 mx-1 text-lg rounded-lg  cursor-pointer
            ${
              item.name === t
                ? 'my-1  text-lg rounded-lg ring-1 ring-current cursor-pointer'
                : 'my-1  text-lg rounded-lg bg-base-100 hover:ring-1 hover:ring-current cursor-pointer'
            }`}
                key={item.id}
                onClick={(e) => handleTags(item.name, e)}
              >
                <RandomColorTag key={item.id} color={colors[index % colors.length]}>
                  <span>{item.name}</span>
                </RandomColorTag>
                {/* <span className={`inline-block w-auto h-7 rounded px-1 bg-green-600`}>{item.name}</span> */}
              </p>
            )
          })}
      </div>
    </div>
  )
}

export default Tags
