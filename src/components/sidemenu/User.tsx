import { useNavigate } from 'react-router-dom'
import { useArticleAllList } from '@/api/articles'
import { ArticleType } from '@/api/articles/type'
import { useEffect, useState } from 'react'
import { useApothegmList } from '@/api/apothegm'
import { ApothegmType } from '@/api/apothegm/type'

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
  const categoryNumber = categoryArticles.length
  return categoryNumber
}
// 标签数量
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
  const tagsCount = tags.length
  return tagsCount
}

// 跳转到分类页
const User = () => {
  // 头像显示隐藏
  const [avatarShow, setAvatarShow] = useState(false)
  // 路由跳转
  const navigate = useNavigate()

  // 获取全部文章
  const { articleAllList, isArticleAllListFetched } = useArticleAllList(1, 1)
  // 名言警句
  const [apothegmState, setApothegmState] = useState<ApothegmType[]>([])
  const archiceAllSource =
    isArticleAllListFetched && articleAllList && articleAllList.data ? articleAllList.data.data : ''
  // 文章数量
  const archicleNumber = archiceAllSource.length
  // 分类数量
  const categoryNumber = categoryCountFunction(archiceAllSource)
  // 标签数量
  const tagsNumber = tagsCountFunction(archiceAllSource)
  // 获取名言警句
  const { apothegmList, isApothegmListFetched } = useApothegmList()
  // 索引
  const [currentIndex, setCurrentIndex] = useState(0)
  // 警句
  const [currentContent, setCurrentContent] = useState('')
  const apothegmSource =
    isApothegmListFetched && apothegmList && apothegmList.data ? apothegmList.data.data : ''
  const filterApothegmData =
    apothegmSource &&
    apothegmSource.filter((item) => item.checked === true).sort(() => Math.random() - 0.5)

  useEffect(() => {
    if (isApothegmListFetched) {
      setApothegmState(filterApothegmData)
    }
  }, [isApothegmListFetched])
  useEffect(() => {
    if (apothegmState.length > 0) {
      const currentData = apothegmState[currentIndex]
      const content = currentData.content
      let currentText = ''
      let index = 0
      let isReversing = false // 标记是否正在回退
      const interval = setInterval(() => {
        if (!isReversing) {
          currentText += content[index]
          setCurrentContent(currentText)
          index++

          if (index >= content.length) {
            clearInterval(interval)
            // 在此处设置延迟，然后继续到下一条数据
            setTimeout(() => {
              isReversing = true // 开始回退
              const reverseInterval = setInterval(() => {
                currentText = currentText.slice(0, -1)
                setCurrentContent(currentText)

                if (currentText.length === 0) {
                  clearInterval(reverseInterval)
                  isReversing = false // 回退结束
                  if (currentIndex + 1 < apothegmState.length) {
                    setCurrentIndex(currentIndex + 1)
                  } else {
                    // 如果已经到达最后一条数据，继续循环
                    setCurrentIndex(0)
                  }
                }
              }, 150) // 回退速度（毫秒）
            }, 5000) // 延迟时间（毫秒）
          }
        }
      }, 150) // 打字速度（毫秒）

      return () => clearInterval(interval)
    }
  }, [apothegmState, currentIndex])

  // 跳转到文章页面
  const handleJumpArticles = () => {
    navigate(`/timeline`)
  }
  // 分类
  const handleJumpCategories = () => {
    navigate(`/category`)
  }
  // 详情
  const handleJumpTags = () => {
    navigate(`/tags`)
  }
  // 鼠标移动事件
  const handleMouseEnter = () => {
    setAvatarShow(!avatarShow)
  }
  const handleMouseLeave = () => {
    setAvatarShow(avatarShow)
  }

  return (
    <div
      className="flex flex-col bg-base-100 rounded-2xl items-center mb-5 rounded-3xltransition duration-500 ease-in-out  transform  hover:scale-105 lg:hidden"
      style={{ userSelect: 'none' }}
    >
      <div className="flex flex-col items-center justify-center">
        {
          <img
            src={`${avatarShow ? 'https://op.yychuiyan.com/avatar1513.webp' : 'https://op.yychuiyan.com/avatar1511.webp'}`}
            alt=""
            className={`image-container w-24 h-24 mt-3 rounded-full ${avatarShow ? 'rotate' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        }
        <p className="flex items-center justify-center w-64 h-5   pl-2 mt-3 overflow-clip">
          <span className="">{currentContent}</span>
        </p>
      </div>
      <div className="flex justify-around w-64 h-20 pl-1 pt-2  rounded-xl overflow-clip">
        <p
          className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer text-[var(--color-icon-default)] hover:bg-[var(--user-content-color)] hover:text-[var(--color-icon-default)] transform duration-300 ease-in"
          onClick={handleJumpArticles}
        >
          <span>文章</span>
          <span className="text-sm">{archicleNumber}</span>
        </p>
        <p
          className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer text-[var(--color-icon-default)] hover:bg-[var(--user-content-color)] hover:text-[var(--color-icon-default)] transform duration-300 ease-in"
          onClick={handleJumpCategories}
        >
          <span>分类</span>
          <span className="text-sm">{categoryNumber}</span>
        </p>
        <p
          className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer text-[var(--color-icon-default)] hover:bg-[var(--user-content-color)] hover:text-[var(--color-icon-default)] transform duration-300 ease-in"
          onClick={handleJumpTags}
        >
          <span>标签</span>
          <span className="text-sm">{tagsNumber}</span>
        </p>
      </div>
    </div>
  )
}

export default User
