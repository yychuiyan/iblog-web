import {
  Input,
  InputRef,
  Popconfirm,
  Modal,
  Spin,
  message,
  Form,
  Button,
  Row,
  Col,
  Avatar
} from 'antd'
import { useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { themeChange } from 'theme-change'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons'
import { LoginOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import jwtDecode from 'jwt-decode'
import UploadImage from '@/components/upload'
import QQLoginButton from '@/components/qq/QQLoginButton'
import IconFont from '../iconfont'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncModeAction, qqLogin } from '@/redux/actionCreator'
import { useArticleSearch } from '@/api/articles'
import { TokenType } from '@/types/comm'
import { useLogin, useLoginFindPassowrd, useLoginOut, useLoginRegister } from '@/api/login'
import { UserLoginType } from '@/api/login/type'
const objLogin = {
  0: '登录',
  1: '注册',
  2: '找回'
}
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
  // 登录模态框
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  // 登录参数
  const [loginInfoParams, setLoginInfoParams] = useState<UserLoginType>(null)
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
  // 登录时执行操作
  const [isLogin, setIsLogin] = useState<number>(0)
  // 图片列表
  const [imageList, setImageList] = useState<any>()
  // 图片地址
  const [imgUrl] = useState<any>([])
  // 头像信息
  const [avatar, setAvatar] = useState('')
  // 登录数据
  const [loginInfo, setLoginInfo] = useState<UserLoginType>()
  // 登录状态
  const [loginStatus, setLoginStatus] = useState(false)
  // 注册参数
  const [registerParams, setRegisterParams] = useState<UserLoginType>(null)
  // 找回密码参数
  const [findPasswordParams, setFindPasswordParams] = useState<UserLoginType>(null)

  // 表单数据
  const [form] = Form.useForm()

  // 文章搜索
  const { articleSearch, isLoading, isArticleSearchFetched } = useArticleSearch(1, 1, searchValue)
  const articleSearchSource =
    isArticleSearchFetched && articleSearch && articleSearch.data ? articleSearch.data.data : ''
  // 用户登录
  const { loginInfoStatus, isLoginInfoStatusFetched } = useLogin(loginInfoParams)
  useEffect(() => {
    if (isLoginInfoStatusFetched) {
      if (loginInfoStatus && loginInfoStatus?.code === 0) {
        setLoginStatus(true)
        setLoginInfo(loginInfoStatus && loginInfoStatus)
        setAvatar(loginInfoStatus && loginInfoStatus.avatar)
        localStorage.setItem('zhj', 'success')
        localStorage.setItem('yychuiyan', loginInfoStatus.data.token)
        message.success('登录成功！')
        setIsLoginModalOpen(false)
        window.location.reload()
        form.resetFields()
      } else if (loginInfoStatus && loginInfoStatus?.code === 110401) {
        message.error('请检查用户名或密码后重新登录！')
        setIsLoginModalOpen(isLoginModalOpen)
      } else if (loginInfoStatus && loginInfoStatus?.code === 110601) {
        message.error({
          content: loginInfoStatus && loginInfoStatus?.msg,
          duration: 6
        })
        setIsLoginModalOpen(isLoginModalOpen)
      } else {
        message.error('出现未知错误，请联系管理员解决！')
        setIsLoginModalOpen(!isLoginModalOpen)
        form.resetFields()
      }
    }
  }, [form, isLoginInfoStatusFetched, isLoginModalOpen, loginInfoStatus])
  // QQ登录
  useSelector((state: any) => state.qqLogin)
  // QQ登录授权
  useEffect(() => {
    const grant_type = 'authorization_code'
    const clientId = '102055926'
    const clientSecret = 'gIivvkTzKSM3Wmpe'
    const redirectUri = `https://yychuiyan.com/home`
    const encoded_redirect_uri = encodeURIComponent(redirectUri)
    const authorizationCode: string | any = new URLSearchParams(window.location.search).get('code')
    // QQ是否正常登录
    if (authorizationCode !== null) {
      dispatch(
        qqLogin(grant_type, clientId, clientSecret, authorizationCode, encoded_redirect_uri)
      ).then((res: any) => {
        console.log('登录成功后数据：', res)
        if (res.success) {
          setLoginInfo(res)
          setAvatar(res.avatar)
          setLoginStatus(true)
          window.location.href = `https://yychuiyan.com/home`
        } else {
          message.error('登录异常！')
        }
      })
    }
    // 获取登录态
    const isLoginInfo = localStorage.getItem('zhj')
    if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
      const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as TokenType
      setLoginInfo(token)
      setAvatar(token.avatar)
      setLoginStatus(true)
    }
  }, [dispatch])
  // 退出登录
  const { loginOut } = useLoginOut()
  // 注册
  const { loginRegister, isLoginRegisterFetched } = useLoginRegister(registerParams)
  useEffect(() => {
    if (isLoginRegisterFetched) {
      if (loginRegister && loginRegister.code === 0) {
        message.success('注册成功！')
        setTimeout(() => {
          setIsLogin(0)
          form.resetFields()
        }, 1000)
      } else {
        message.error('出现未知错误，请联系管理员解决！')
      }
    }
  }, [form, isLoginRegisterFetched, loginRegister])
  // 找回密码
  const { loginFindPassword, isLogFindPasswordFetched } = useLoginFindPassowrd(findPasswordParams)
  useEffect(() => {
    if (isLogFindPasswordFetched) {
      if (loginFindPassword && loginFindPassword.code === 110201) {
        message.warning('新密码与旧密码相同!')
      } else if (loginFindPassword && loginFindPassword.code === 0) {
        message.success('用户密码修改成功!')
        setTimeout(() => {
          setIsLogin(0)
          form.resetFields()
        }, 1000)
      } else {
        message.error('出现未知错误，请联系管理员解决！')
      }
    }
  }, [form, isLogFindPasswordFetched, loginFindPassword])
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
  // 登录模块
  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
  }
  // 模态框关闭
  const handleLoginCancel = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
    form.resetFields()
  }
  // 登录
  const handleLoginSuccess = async () => {
    await form.validateFields()
    const formData = form.getFieldsValue()
    if (formData) {
      if (formData.password !== formData.verifyPassword) {
        return message.warning('两次密码不相同，请检查后重新输入')
      }
    }
    const { username, password, verifyPassword } = formData
    const loginParams = {
      username,
      password,
      verifyPassword
    }
    setLoginInfoParams(loginParams)
  }
  // 注册
  const handleRegisterSuccess = async () => {
    await form.validateFields()
    const formDataFields = form.getFieldsValue()

    if (formDataFields) {
      if (formDataFields.password !== formDataFields.verifyPassword) {
        return message.warning('两次密码不相同，请检查后重新输入')
      }
    }
    // 获取表单值
    if (typeof imageList === 'object') {
      formDataFields.cover = imageList.url
    } else {
      formDataFields.avatar = imageList
    }
    // if (formDataFields.avatar === undefined) {
    //   return message.warning('头像不能为空哦~')
    // }
    const { username, password, email, avatar } = formDataFields

    setRegisterParams({
      username,
      password,
      email,
      avatar
    })
  }
  // 找回密码
  const handleFindPassword = async () => {
    await form.validateFields()
    const formDataFields = form.getFieldsValue()
    if (formDataFields) {
      if (formDataFields.password !== formDataFields.verifyPassword) {
        return message.warning('两次密码不相同，请检查后重新输入')
      }
    }
    const { username, password } = formDataFields
    setFindPasswordParams({
      username,
      password
    })
  }
  // 退出登录
  const handleLoginOut = async () => {
    try {
      await loginOut()
      message.success('已退出登录~')
      setLoginStatus(false)
      localStorage.removeItem('yychuiyan')
      localStorage.removeItem('zhj')
      window.location.reload()
      // 你可以在这里添加成功登出的逻辑，比如跳转到登录页或显示提示信息
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }
  // 用户名校验
  const validateName = (_rule, value: string) => {
    if (!value) {
      return Promise.reject('请输入用户名')
    }
    if (value.length < 2 || value.length > 20) {
      return Promise.reject('字符不能小于2大于20')
    } else {
      const reg = /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/
      if (!reg.test(value)) {
        return Promise.reject('用户名不能包含特殊字符')
      } else {
        return Promise.resolve()
      }
    }
  }
  // 密码校验
  const validatePassword = (_rule, value: string) => {
    if (!value) {
      return Promise.reject('请输入密码')
    }
    if (value.length < 6 || value.length > 20) {
      return Promise.reject('字符不能小于6大于20')
    } else {
      const reg = /^[A-Za-z0-9_]{6,20}$/
      if (!reg.test(value)) {
        return Promise.reject('必须是长度为6-20位,字母大小,下划线组成')
      } else {
        return Promise.resolve()
      }
    }
  }
  // 切换注册页面
  const handleChangeRegister = () => {
    setIsLogin(1)
    form.resetFields()
  }
  // 回到登录页面
  const handleBakLogin = () => {
    setIsLogin(0)
    form.resetFields()
  }
  // 修改密码
  const handleForgetLogin = () => {
    setIsLogin(2)
    form.resetFields()
  }
  // 获取图片信息
  const handleChange = (data: string) => {
    setImageList(data)
  }
  // 获取移除的图片信息
  const handleRemove = () => {
    setImageList('')
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
          {loginStatus === false ? (
            <div className="cursor-pointer ml-5 flex lg:ml-10 lg:mt-1" onClick={handleLogin}>
              <LoginOutlined style={{ fontSize: '20px', marginRight: '3px', marginLeft: '3px' }} />
              <span className="text-base" style={{ userSelect: 'none' }}>
                登录
              </span>
            </div>
          ) : (
            <Popconfirm
              placement="bottom"
              title={<p style={{ userSelect: 'none' }}>您是否选择退出登录？</p>}
              description={<div></div>}
              icon={<LoginOutlined />}
              onConfirm={handleLoginOut}
              okText="是"
              cancelText="否"
            >
              <div
                className="cursor-pointer flex items-center ml-5 lg:ml-10"
                style={{ userSelect: 'none' }}
              >
                {loginStatus ? (
                  <Avatar src={`${avatar}`}></Avatar>
                ) : (
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="27607"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M903.7 447.2H798.2V350c0-6.8-3.7-13-9.5-16.4-5.9-3.4-13.1-3.3-18.9 0.1l-148.2 87.7c-8.9 5.3-11.9 16.9-6.6 25.8 5.3 8.9 16.9 11.9 25.8 6.6l119.7-70.9V466c0 10.4 8.4 18.8 18.9 18.8h105.4V540H779.4c-10.4 0-18.9 8.4-18.9 18.8v82.9l-119.8-70.9c-8.9-5.3-20.6-2.3-25.8 6.6-5.3 9-2.3 20.5 6.6 25.8l148.3 87.7c2.9 1.7 6.3 2.6 9.6 2.6 3.2 0 6.4-0.8 9.3-2.5 5.9-3.3 9.5-9.6 9.5-16.4v-97.2h105.4c10.4 0 18.9-8.4 18.9-18.8V466c0-10.4-8.4-18.8-18.8-18.8z"
                      fill=""
                      p-id="27608"
                    ></path>
                    <path
                      d="M728.7 730.3c-12.7-0.3-21.9 9.5-22 21.5l-0.6 51.6H595V198.8c0-10.5-7.6-19.6-18-21.4L427.2 151h286.4l-1.4 122c-0.1 12 9.5 21.9 21.5 22h0.3c11.9 0 21.6-9.6 21.8-21.5l1.7-144.1c0.1-5.8-2.2-11.4-6.3-15.5s-9.7-6.5-15.5-6.5H178.8c-1.1 0-2.1 0.5-3.2 0.7-1.3 0.2-2.5 0.3-3.7 0.7-1.8 0.6-3.4 1.6-5 2.6-0.7 0.5-1.5 0.6-2.2 1.2-0.2 0.2-0.3 0.5-0.5 0.7-1.7 1.5-2.9 3.4-4 5.4-0.4 0.6-0.9 1.1-1.2 1.8-1.2 2.7-1.9 5.6-1.9 8.7v0.2l8 696c0.1 10.4 7.6 19.3 17.9 21.2l386.4 69.6c1.3 0.2 2.6 0.3 3.9 0.3 5.1 0 10-1.8 14-5.1 4.9-4.1 7.8-10.2 7.8-16.7v-47.9h132.7c11.9 0 21.6-9.6 21.8-21.5l0.8-73.1c-0.1-11.9-9.7-21.8-21.7-21.9zM551.5 868.8L208.4 807l-7.5-651.8 350.6 61.9v651.7z"
                      fill=""
                      p-id="27609"
                    ></path>
                  </svg>
                )}
                <span></span>
                <span className="text-base ml-1" style={{ userSelect: 'none' }}>
                  {loginInfo.username}
                </span>
              </div>
            </Popconfirm>
          )}
        </div>
        {/* 搜索 */}
        <div className="flex">
          <div className="w-24  flex items-center justify-center lg:hidden">
            <IconFont
              iconName="icon-sousuo"
              className="text-[20px]"
              onIconClick={showModal}
            ></IconFont>
          </div>
          {/* 切换主题 */}
          <div
            className="h-8 w-16  rounded-3xl bg-base-200 border border-solid border-1 border-[var(--bgcolor-navbar-hover)] relative top-4 right-3"
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
        {/* 登录注册 */}
        <Modal
          open={isLoginModalOpen}
          closable={false}
          centered
          footer={null}
          title={
            <div style={{ textAlign: 'center', marginBottom: '20px', userSelect: 'none' }}>
              欢迎登录本网站
            </div>
          }
          onCancel={handleLoginCancel}
        >
          <Form
            form={form}
            layout="horizontal"
            name="basic"
            className="userAddFrom"
            // onFinish={onFinish}
          >
            {objLogin[isLogin] === '登录' ? (
              <div>
                <Form.Item name="username" rules={[{ validator: validateName }]}>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入昵称"
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{ validator: validatePassword }]}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入密码"
                  />
                </Form.Item>

                <Form.Item name="verifyPassword" rules={[{ validator: validatePassword }]}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="再次确认密码"
                  />
                </Form.Item>
              </div>
            ) : objLogin[isLogin] === '注册' ? (
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="avatar" label="头像上传">
                    <UploadImage
                      handleChange={handleChange}
                      handleRemove={handleRemove}
                      imgUrlArr={imgUrl}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="username" rules={[{ validator: validateName }]}>
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="请输入昵称"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      {
                        pattern:
                          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                        message: '邮箱格式不正确'
                      }
                    ]}
                  >
                    <Input maxLength={30} placeholder="请输入你的邮箱" />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ validator: validatePassword }]}>
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="请输入密码"
                    />
                  </Form.Item>

                  <Form.Item name="verifyPassword" rules={[{ validator: validatePassword }]}>
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="再次确认密码"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <div style={{ userSelect: 'none' }}>
                <p className="text-[#fb7877] mb-2 font-medium">
                  📢 公告：昵称、头像、邮箱修改功能迭代中···
                </p>
                <Form.Item name="username" rules={[{ validator: validateName }]}>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入昵称"
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{ validator: validatePassword }]}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入新密码"
                  />
                </Form.Item>

                <Form.Item name="verifyPassword" rules={[{ validator: validatePassword }]}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="确认新密码"
                  />
                </Form.Item>
              </div>
            )}
            <Form.Item>
              {objLogin[isLogin] === '登录' ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-[calc(100%-0px)]"
                  onClick={handleLoginSuccess}
                >
                  登录
                </Button>
              ) : objLogin[isLogin] === '注册' ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-[calc(100%-0px)]"
                  onClick={handleRegisterSuccess}
                >
                  注册
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-[calc(100%-0px)]"
                  onClick={handleFindPassword}
                >
                  功能迭代中
                </Button>
              )}
              <div
                className=" relative top-3 text-[var(--color-font-color)]"
                style={{ userSelect: 'none' }}
              >
                <div className="absolute right-0">
                  {objLogin[isLogin] === '登录' ? (
                    <p>
                      没有账号？点我
                      <span
                        className="cursor-pointer ml-1 text-blue-500"
                        onClick={handleChangeRegister}
                      >
                        注册
                      </span>
                      <br />
                      忘记密码？点我
                      <span
                        className="cursor-pointer ml-1 text-blue-500"
                        onClick={handleForgetLogin}
                      >
                        找回
                      </span>
                    </p>
                  ) : objLogin[isLogin] === '注册' ? (
                    <span className="cursor-pointer ml-1 text-blue-500" onClick={handleBakLogin}>
                      返回登录页面
                    </span>
                  ) : (
                    <span className="cursor-pointer ml-1 text-blue-500" onClick={handleBakLogin}>
                      返回登录页面
                    </span>
                  )}
                </div>
                <div className="flex text-[var(--color-font-color)]">
                  推荐登录：
                  <QQLoginButton />
                </div>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </nav>
  )
}
export default NavBar
