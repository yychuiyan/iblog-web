import { Input, InputRef, Modal, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { themeChange } from 'theme-change'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons'
import Notification from '@/components/notification'
import IconFont from '../iconfont'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { asyncModeAction } from '@/redux/actionCreator'
import { useArticleSearch } from '@/api/articles'
const NavBar = () => {
  const items = [
    {
      path: '/home',
      title: '首页'
    },
    {
      path: '/rindex',
      title: '索引',
      children: [
        {
          path: '/project',
          title: '作品'
        },
        {
          path: '/category',
          title: '分类'
        },
        {
          path: '/tags',
          title: '标签'
        },
        {
          path: '/timeline',
          title: '时间线'
        }

        // {
        //   path: '/reader',
        //   title: '书友会'
        // }
      ]
    },
    {
      path: '/essay',
      title: '随笔'
    },
    {
      path: '/message',
      title: '留言'
    },
    {
      path: '/links',
      title: '友链'
    },
    {
      path: '/about',
      title: '关于'
    }
    // {
    //   path: '/frontend-nav',
    //   title: '导航',
    //   children: [
    //     {
    //       path: '/project',
    //       title: '作品'
    //     },
    //     {
    //       path: '/tools',
    //       title: '工具'
    //     },
    //     {
    //       path: '/website',
    //       title: '常用网站'
    //     }
    //   ]
    // }
  ]
  // 路由
  const navigate = useNavigate()
  const location = useLocation()
  // redux
  const dispatch = useDispatch()
  // 移动端侧边栏显示
  const [navbar, setNavbar] = useState(false)
  // 路由选中
  const [selectKeys, setSelectKeys] = useState<string>()
  // 搜索时，模态框的显示隐藏
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 搜索输入的文本信息
  const [searchValue, setSearchValue] = useState('')
  // 搜索输入框中值
  const inputRef = useRef<InputRef>(null)
  // 移动端导航栏数据
  const [mobileList, setMobileList] = useState([])
  // 导航栏滚动显示隐藏
  const [isShow, setIsShow] = useState(true)
  // 选中状态
  const [isChecked, setIsChecked] = useState(false)

  // 文章搜索
  const { articleSearch, isLoading, isArticleSearchFetched } = useArticleSearch(1, 1, searchValue)
  const articleSearchSource =
    isArticleSearchFetched && articleSearch && articleSearch.data ? articleSearch.data.data : ''
  // 主题切换状态
  useEffect(() => {
    // 监听
    window.addEventListener('scroll', handleScroll)
    // 销毁
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  let lastScrollTop = 0
  const handleScroll = () => {
    const clientHeight = document.documentElement.clientHeight //可视区域高度
    const scrollTop = document.documentElement.scrollTop //滚动条滚动高度
    const scrollHeight = document.documentElement.scrollHeight //滚动内容高度
    //  console.log("scrollTop", scrollTop, 'lastScrollY', lastScrollTop, 'clientHeight', clientHeight, 'scrollHeight', scrollHeight);
    if (scrollTop > lastScrollTop) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
    lastScrollTop = document.documentElement.scrollTop
    // 判断是否滚动到底部
    if (scrollTop + clientHeight === scrollHeight) {
      // console.log("滚动到底部", scrollHeight);
    }
  }
  // 主题
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])
  // 移动端导航数据处理
  useEffect(() => {
    const newRouterList: any = [] // 用于存放转换后的数组
    const routerList = (arrays: any[]) => {
      arrays.map((item) => {
        const { title, path, children } = item
        if (children) {
          return routerList(children)
        }
        newRouterList.push({
          title: title,
          path: path
        })
      })
    }
    routerList(items)
    setMobileList(newRouterList)
  }, [])

  // 获取动态路由信息
  useEffect(() => {
    setSelectKeys(location.pathname)
  }, [location.pathname])
  useEffect(() => {
    if (navbar) {
      document.addEventListener('click', handleCancel, true)
    } else {
      document.removeEventListener('click', handleCancel, true)
    }
  }, [navbar])
  // 默认主题
  useEffect(() => {
    if (localStorage.getItem('theme') === null || localStorage.getItem('localmode') === null) {
      localStorage.setItem('theme', 'light')
      localStorage.setItem('localmode', '0')
    }
  }, [])
  // 背景图片
  useEffect(() => {
    const localMode = Number(localStorage.getItem('localmode'))
    dispatch(asyncModeAction(localMode)) // 使用 dispatch 调用 asyncModeAction
    setIsChecked(Boolean(localMode))
  }, [dispatch])
  // 切换背景图片
  const handleChangeImage = (i: number | string) => {
    setIsChecked(!isChecked)
    localStorage.setItem('localmode', i.toString()) // 确保存储的是字符串
    const localMode = Number(localStorage.getItem('localmode'))
    dispatch(asyncModeAction(localMode)) // 使用 dispatch 调用 asyncModeAction
  }

  // 切换路由
  const handleRouter = (e: string) => {
    navigate(e)
  }
  // 阻止冒泡
  const handleCancel = () => {
    setNavbar(!navbar)
    document.removeEventListener('click', handleCancel, true)
  }
  // 模态框
  const handleModalCancel = () => {
    setIsModalOpen(!isModalOpen)
  }
  // 搜索 模块框显示
  const showModal = () => {
    onChangeSearch()
    setIsModalOpen(!isModalOpen)
  }
  // 文章查询
  const onChangeSearch = () => {
    // 获取输入框中值
    const searchValData = inputRef.current?.input?.value
    const searchValContent = searchValData?.replace(/\\/g, '/')
    setSearchValue(searchValContent)
  }
  // 点击文章名称跳转到详情页面
  const handleSearchData = (id: string) => {
    navigate(`/article/detail/${id}`)
    // 模态框
    setIsModalOpen(!isModalOpen)
  }
  // 跳转到首页
  const handleHomeRouter = () => {
    navigate('/home')
  }
  // 跳转到后台管理页面
  const handleBackLogin = () => {
    window.open(`https://iblog.yychuiyan.com/admin/home`)
  }
  // 遍历路由pc
  const renderMenu = (menuList: string[] | any) => {
    return menuList.map((item: any) => {
      // 如果有子数组就渲染下拉菜单下的列表数据
      if (item.children?.length > 0) {
        return (
          <div
            key={item.path}
            tabIndex={0}
            className="dropdown dropdown-end text-xl font-medium flex cursor-pointer ml-4"
          >
            <span className="text-[var(--color-font-color)]" style={{ userSelect: 'none' }}>
              {item.title}
            </span>
            <div>
              <svg
                className="fill-current text-[var(--color-font-color)]"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </div>
            {/* 下拉显示 */}
            <div className="dropdown-content bg-base-100 shadow-2xl  rounded-t-box rounded-b-box top-0 w-32 overflow-y-auto mt-12">
              <div tabIndex={0} className="bg-base-100 -ml-2">
                <li
                  key={item.children.path}
                  className="flex flex-col items-center  cursor-pointer rounded-xl text-base font-medium"
                  style={{ userSelect: 'none' }}
                >
                  {renderMenu(item.children)}
                </li>
              </div>
            </div>
          </div>
        )
      }
      // 如果没有 正常渲染列表 添加点击事件进行路由跳转
      return (
        <div onClick={handleCancel} key={item.path}>
          <ul
            className={`flex items-center font-medium text-xl text-[var(--color-font-color)] list-none h-16`}
          >
            <li
              className={`px-5 cursor-pointer  ${
                selectKeys === item.path
                  ? 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl text-[var(--bgcolor-navbar-default)] bg-[var(--bgcolor-navbar-click)]'
                  : 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl hover:bg-[var(--bgcolor-navbar-hover)] hover:text-[var(--bgcolor-navbar-default)] hover:transition hover:duration-300 ring-current '
              }`}
              onClick={() => handleRouter(item.path)}
              style={{ userSelect: 'none' }}
            >
              {item.title}
            </li>
          </ul>
        </div>
      )
    })
  }
  // 遍历路由mobile
  const renderMobileMenu = (menuList) => {
    const mobileMenuList = menuList.filter(
      (item) => item.title !== '作品' && item.title !== '工具' && item.title !== '常用网站'
    )
    mobileMenuList
      .map((item) => {
        return item
      })
      .flat()
    return mobileMenuList.map((item) => {
      // 如果没有 正常渲染列表 添加点击事件进行路由跳转
      return (
        <div onClick={handleCancel} key={item.path} className="">
          <ul className={`flex items-center font-medium text-xl list-none h-16`}>
            <li
              className={`px-5 cursor-pointer  ${
                selectKeys === item.path
                  ? 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl ring-1 ring-current'
                  : 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl hover:ring-1 ring-current '
              }`}
              onClick={() => handleRouter(item.path)}
              style={{ userSelect: 'none' }}
            >
              {item.title}
            </li>
          </ul>
        </div>
      )
    })
  }

  return (
    <nav
      className={`shadow-sm w-full backdrop-blur-none bg-[var(--bgcolor-navbar-default)]  h-16 z-[1000] fixed top-0
      ${
        isShow
          ? 'fixed -top-16 transform duration-300 ease-in'
          : 'fixed top-0 transform duration-300 ease-in'
      }
        `}
    >
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="hidden lg:block">
            <div
              className="flex items-center h-16 rounded-lg outline-none focus:border-gray-400 focus:border lg:ml-3"
              onClick={() => setNavbar(!navbar)}
            >
              <FontAwesomeIcon icon={faBars} size="xl" />
            </div>
          </div>
          <div className="rainbow-text flex items-center cursor-pointer" onClick={handleHomeRouter}>
            <span
              className="text text-xl ml-2 lg:hidden lg:text-base lg:ml-2 lg:z-50"
              style={{ userSelect: 'none' }}
            >
              夜雨炊烟
            </span>
          </div>
        </div>
        {/* 中间导航栏 */}
        <div className="flex items-center justify-center">
          {/* pc */}
          <div className="w-32 lg:hidden"></div>
          {/* 隐藏 */}
          {/* <div
            className="flex items-center w-48 h-8 rounded-xl border-[1px] border-solid border-[var(--bgcolor-navbar-hover)] bg-base-100  cursor-pointer
            lg:hidden
            "
            onClick={showModal}
            style={{ userSelect: "none" }}
          >
            <span className="flex items-center bg-base-100 text-[var(--border-search-color)] h-full w-full rounded-xl text-xs px-3 ">
              搜索想要查看的文章
            </span>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </div> */}
          {/* 移动 */}
          <div
            className="absolute right-24 top-5 w-9 h-9  cursor-pointer hidden lg:block lg:top-6 lg:right-20"
            onClick={showModal}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </div>
          {/* navbar */}
          <div
            className={`flex items-center lg:z-30 lg:flex lg:flex-col  lg:absolute  lg:-left-32   lg:bg-base-100 lg:top-0 lg:min-h-screen  lg:pt-12 lg:w-36  lg:border-r-secondary  ${
              navbar
                ? 'lg:transform lg:delay-200 lg:duration-300 lg:ease-in lg:translate-x-32 '
                : 'lg:transform lg:delay-200 lg:duration-300 lg:ease-in lg:-translate-x-32'
            }`}
          >
            {navbar ? (
              <div
                className={`lg:absolute lg:top-0  lg:left-36 lg:bg-black  lg:w-[115vw] sm:w-[100vh]  lg:min-h-screen  lg:opacity-50 lg:transform lg:ease-in sm:opacity-50 sm:transform sm:ease-in`}
              ></div>
            ) : (
              <div
                className={`lg:absolute lg:top-0 lg:-translate-x-full lg:bg-black  lg:w-[115vw] sm:w-[100vh]  lg:min-h-screen  lg:opacity-0 lg:transform lg:ease-in sm:opacity-0 sm:transform sm:ease-in`}
              ></div>
            )}
            {/* 移动端 */}
            <div className="rainbow-text" onClick={handleHomeRouter}>
              <span
                className="text hidden lg:block lg:absolute lg:top-5 lg:left-9 lg:text-xl lg:z-50  lg:cursor-pointer sm:text-xl"
                style={{ userSelect: 'none' }}
              >
                夜雨炊烟
              </span>
            </div>
            {/* 导航栏 */}
            {window.innerWidth > 970 ? renderMenu(items) : renderMobileMenu(mobileList)}
          </div>
          {/* 消息通知 */}
          <div className="flex items-center ml-2">
            <Notification />
          </div>
        </div>
        {/* 搜索 */}
        <div className="flex">
          <div className="w-24 flex items-center justify-center lg:hidden">
            <IconFont
              iconName="icon-sousuo"
              className="text-[20px]"
              onIconClick={showModal}
            ></IconFont>
          </div>
          {/* 切换主题 */}
          <div
            className="h-8 w-16 rounded-3xl bg-base-200 border border-solid border-1 border-[var(--bgcolor-navbar-hover)] relative top-4 right-3"
            tabIndex={0}
          >
            {isChecked ? (
              <button
                className="rounded-3xl border-none h-8 w-8 absolute left-[0.9rem] bg-[var(--bgcolor-navbar-default)]  translate-x-1/2 transition-all  cursor-pointer"
                data-set-theme="light"
                onClick={() => handleChangeImage(0)}
              >
                <IconFont
                  iconName="icon-yueliang"
                  className="text-[30px] text-[#FFB948]"
                ></IconFont>
                <div data-theme="light" className="">
                  <div className="flex-grow text-sm font-bold"></div>
                </div>
              </button>
            ) : (
              <button
                className="flex items-center justify-center rounded-3xl border-none h-8 w-8 absolute left-[1.04rem] bg-[var(--bgcolor-navbar-default)]  -translate-x-1/2 transition-all  cursor-pointer"
                data-set-theme="night"
                onClick={() => handleChangeImage(1)}
              >
                <IconFont
                  iconName="icon-taiyang1"
                  className="text-[22px] text-[#F7B500]"
                ></IconFont>
                <div data-theme="night" className="">
                  <div className="flex-grow text-sm font-bold"></div>
                </div>
              </button>
            )}
          </div>
          {/* 后台 */}
          <div
            className="w-16 flex items-center cursor-pointer lg:hidden"
            onClick={handleBackLogin}
          >
            <span>
              <IconFont iconName="icon-houtaituichufanhuichu" className=" text-[28px]"></IconFont>
            </span>
            <span style={{ userSelect: 'none' }}>后台</span>
          </div>
        </div>
      </div>
      {/* 模态框展示 */}
      <div className="bg-base-200">
        <Modal
          title=""
          footer={[]}
          destroyOnClose
          open={isModalOpen}
          onCancel={handleModalCancel}
          style={{ userSelect: 'none' }}
        >
          <p>搜索文章</p>
          <Input
            ref={inputRef}
            prefix={
              <SearchOutlined className="border border-solid border-b-0 border-t-0 border-l-0 border-gray-500 w-7 h-4 text-2xl mr-1 " />
            }
            placeholder="请输入文章标题"
            className="h-9 w-full mt-3"
            onChange={() => onChangeSearch()}
          />
          <div
            className={`${
              Boolean(searchValue) === true
                ? 'block mt-2 py-2 rounded-lg px-4 font-medium border border-solid max-h-96 overflow-auto'
                : 'hidden'
            }`}
          >
            <Spin size="large" spinning={isLoading}>
              {articleSearchSource && articleSearchSource.length > 0 ? (
                articleSearchSource &&
                articleSearchSource.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="rounded-lg p-2 hover:bg-[var(--article-content-tags-bgcolor-hover)] hover:text-[var(--article-content-tags-bgcolor-hover-font)] hover:transition hover:duration-500 cursor-pointer "
                      onClick={() => handleSearchData(item._id)}
                    >
                      {item.title}
                    </div>
                  )
                })
              ) : Boolean(searchValue) === false ? (
                ''
              ) : (
                <div>未查询到相关文章内容!</div>
              )}
            </Spin>
          </div>
        </Modal>
      </div>
    </nav>
  )
}
export default NavBar
