import { Input, InputRef, Popconfirm, Modal, Spin, message, Popover, Form, Button, Row, Col } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { themeChange } from 'theme-change';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { LoginOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';
import UploadImage from '@/components/upload'
interface DataType {
  password: string,
  username: string;
  verifyPassword: string;
}
const NavBar = (props: any) => {
  const items = [
    {
      path: '/rblog/home',
      title: '首页',
    },
    {
      path: '/rblog/rindex',
      title: '索引',
      children: [
        {
          path: '/rblog/category',
          title: '分类',
        },
        {
          path: '/rblog/tags',
          title: '标签',
        },
        {
          path: '/rblog/timeline',
          title: '时间线',
        },
      ],
    },
    {
      path: '/rblog/essay',
      title: '随笔',
    },
    {
      path: '/rblog/message',
      title: '留言',
    },
    {
      path: '/rblog/friendly',
      title: '友链',
    },
    {
      path: '/rblog/about',
      title: '关于',
    },
  ];
  // 移动端侧边栏显示
  const [navbar, setNavbar] = useState(false);
  // 下拉框显示
  const [show, setShow] = useState(false);
  // 路由选中
  const [selectKeys, setSelectKeys] = useState();
  // 搜索时，模态框的显示隐藏
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 登录模态框
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // 搜索输入的文本信息
  const [searchVal, setSearchVal] = useState<any>('');
  // 符合条件的数据
  const [list, setList] = useState([]);
  // 搜索输入框中值
  const inputRef = useRef<InputRef>(null);
  // 移动端导航栏数据
  const [mobileList, setMobileList] = useState([]);
  // 页面可视化宽度
  const [clientWidth, setClientWidth] = useState(970);
  // 背景图片
  const [mode, setMode] = useState<any>();
  // 导航栏滚动显示隐藏
  const [isShow, setIsShow] = useState(true);
  // 选中状态
  const [isChecked, setIsChecked] = useState(false);
  // 是否为登录
  const [isLogin, setIsLogin] = useState(true)
  // 图片列表
  const [imageList, setImageList] = useState<any>();
  // 图片地址
  const [imgUrl, setImgUrl] = useState<any>([]);
  // 登录数据
  const [loginInfo, setLoginInfo] = useState<any>()
  // 登录状态
  const [loginStatus, setLoginStatus] = useState(false)
  // 表单数据
  const [form] = Form.useForm();
  useEffect(() => {
    // 监听
    window.addEventListener('scroll', handleScroll);
    // 销毁
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // 默认主题
  useEffect(() => {
    if (localStorage.getItem('theme') === null || localStorage.getItem('localmode') === null) {
      localStorage.setItem('theme', 'light');
      localStorage.setItem('localmode', '0');
    }
  }, [localStorage]);
  let lastScrollTop = 0;
  const handleScroll = () => {
    let clientHeight = document.documentElement.clientHeight; //可视区域高度
    let scrollTop = document.documentElement.scrollTop; //滚动条滚动高度
    let scrollHeight = document.documentElement.scrollHeight; //滚动内容高度
    //  console.log("scrollTop", scrollTop, 'lastScrollY', lastScrollTop, 'clientHeight', clientHeight, 'scrollHeight', scrollHeight);
    if (scrollTop > lastScrollTop) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
    lastScrollTop = document.documentElement.scrollTop;
    // 判断是否滚动到底部
    if (scrollTop + clientHeight === scrollHeight) {
      // console.log("滚动到底部", scrollHeight);
    }
  };
  // 主题
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  // 移动端导航数据处理
  useEffect(() => {
    let newRouterList: any = []; // 用于存放转换后的数组
    const routerList = (arrays: any[]) => {
      arrays.map((item) => {
        let { title, path, children } = item;
        if (children) {
          return routerList(children);
        }
        newRouterList.push({
          title: title,
          path: path,
        });
      });
    };
    routerList(items);
    setMobileList(newRouterList);
  }, [setMobileList]);
  // 页面可视化宽度
  useEffect(() => {
    window.addEventListener('resize', setPageHeight);
  }, [window.addEventListener]);
  // 获取动态路由信息
  useEffect(() => {
    setSelectKeys(props.location.pathname);
  }, [props.location]);
  useEffect(() => {
    if (navbar) {
      document.addEventListener('click', handleCancel, true);
    } else {
      document.removeEventListener('click', handleCancel, true);
    }
  }, [navbar]);
  // 背景图片
  useEffect(() => {
    props.BlogActions.asyncModeAction(Number(localStorage.getItem('localmode')));
    setIsChecked(Boolean(Number(localStorage.getItem('localmode'))))
  }, []);
  // 登录信息 解析token
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const token = jwtDecode(localStorage.getItem('token') as string) as object | any;
      setLoginStatus(true)
      setLoginInfo(token._doc)
    }
  }, [])
  // 页面可视化宽度
  let setPageHeight = () => {
    setClientWidth(document.body.clientWidth);
  };
  // 切换路由
  const handleRouter = (e: string) => {
    props.history.push(e);
  };
  // 阻止冒泡
  const handleCancel = () => {
    setNavbar(!navbar);
    document.removeEventListener('click', handleCancel, true);
  };
  const handleDropdown = () => {
    setShow(!show);
    document.removeEventListener('click', handleDropdown, true);
  };
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
            <span className="text-[var(--color-font-color)]">{item.title}</span>
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
            <div className="dropdown-content bg-base-100 shadow-2xl  rounded-t-box rounded-b-box top-px w-28 overflow-y-auto mt-12">
              <div tabIndex={0} className="bg-base-100 -ml-2">
                <li
                  key={item.children.path}
                  className="flex flex-col items-center justify-center cursor-pointer rounded-xl text-base font-medium"
                >
                  {renderMenu(item.children)}
                </li>
              </div>
            </div>

          </div>
        );
      }
      // 如果没有 正常渲染列表 添加点击事件进行路由跳转
      return (
        <div onClick={handleCancel} key={item.path}>
          <ul
            className={`flex items-center font-medium text-xl text-[var(--color-font-color)] list-none h-16`}
          >
            <li
              className={`px-5 cursor-pointer  ${selectKeys === item.path
                ? 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl text-[var(--bgcolor-navbar-default)] bg-[var(--bgcolor-navbar-click)]'
                : 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl hover:bg-[var(--bgcolor-navbar-hover)] hover:text-[var(--bgcolor-navbar-default)] hover:transition hover:duration-300 ring-current '
                }`}
              onClick={() => handleRouter(item.path)}
            >
              {item.title}
            </li>
          </ul>
        </div>
      );
    });
  };
  // 遍历路由mobile
  const renderMobileMenu = (menuList: any) => {
    menuList
      .map((item: any) => {
        return item;
      })
      .flat();
    return menuList.map((item: any) => {
      // 如果没有 正常渲染列表 添加点击事件进行路由跳转
      return (
        <div onClick={handleCancel} key={item.path} className="">
          <ul className={`flex items-center font-medium text-xl list-none h-16`}>
            <li
              className={`px-5 cursor-pointer  ${selectKeys === item.path
                ? 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl ring-1 ring-current'
                : 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl hover:ring-1 ring-current '
                }`}
              onClick={() => handleRouter(item.path)}
            >
              {item.title}
            </li>
          </ul>
        </div>
      );
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(!isModalOpen);
  };
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onChangeSearch = () => {
    // 获取输入框中值
    let searchValData = inputRef.current?.input?.value;
    let searchVals = searchValData?.replace(/\\/g, "/");
    setSearchVal(searchVals);
    // 获取文章列表数据
    setTimeout(() => {
      props.BlogActions.asyncArticleSearchListAction(1, 1, searchVals).then((res: any) => {
        // 获取文章
        let { data } = res.data;
        setList(data);
      });
    }, 100);
  };

  // 点击文章名称跳转到详情页面
  const handleSearchData = (id: string) => {
    props.history.push(`/rblog/article/detail/${id}`);
    // 模态框
    setIsModalOpen(!isModalOpen);
  };
  // 跳转到首页
  const handleHomeRouter = () => {
    props.history.push('/rblog/home');
  };
  // 背景图片显示
  const handleChangeImage = (i: number | string | any) => {
    setIsChecked(!isChecked)
    localStorage.setItem('localmode', i);
    props.BlogActions.asyncModeAction(Number(localStorage.getItem('localmode')));
  };
  // 登录
  const handleLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
  };
  const handleLoginCancel = () => {
    setIsLoginModalOpen(!isLoginModalOpen)
  };

  // 点击登录按钮
  const onFinish = async (values: DataType) => {
    console.log("values", values);

    await form.validateFields();
    if (values.password !== values.verifyPassword) {
      return message.error('两次密码不相同，请检查后重新输入');
    }
    props.BlogActions.asyncLoginAction({
      ...values,
    }).then((res: {
      data: any; code: number, username: DataType
    }) => {
      if (res.code === 0) {
        message.success('恭喜你,登录成功')
        setLoginStatus(true)
        setLoginInfo(res.data)
      }
      console.log("code", res);

    });
    setIsLoginModalOpen(!isLoginModalOpen)
    form.resetFields();
  };
  // 切换注册页面
  const handleChangeRegister = () => {
    setIsLogin(!isLogin)
  }
  const handleForgetLogin = () => {
    setIsLogin(!isLogin)
  }
  // 获取图片信息
  const handleChange = (data: string) => {
    setImageList(data);
  };
  // 退出登录
  const handleLoginOut = () => {
    console.log("退出登录");
    setLoginStatus(false)
    localStorage.removeItem('token')
  }
  // QQ登录操作
  const handleLoginQQ = () => {

  }
  // 用户名校验
  const validateName = (_rule: any, value: string) => {
    if (!value) {
      return Promise.reject('请输入用户名');
    }
    if (value.length < 2 || value.length > 20) {
      return Promise.reject('字符不能小于2大于20');
    } else {
      const reg = /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/;
      if (!reg.test(value)) {
        return Promise.reject('用户名不能包含特殊字符');
      } else {
        return Promise.resolve();
      }
    }
  };
  // 密码校验
  const validatePassword = (_rule: any, value: string) => {
    if (!value) {
      return Promise.reject('请输入密码');
    }
    if (value.length < 6 || value.length > 20) {
      return Promise.reject('字符不能小于6大于20');
    } else {
      const reg = /^[A-Za-z0-9_]{6,20}$/;
      if (!reg.test(value)) {
        return Promise.reject('必须是长度为6-20位,字母大小,下划线组成');
      } else {
        return Promise.resolve();
      }
    }
  };
  return (
    <nav
      className={`shadow-sm  w-full backdrop-blur-none bg-[var(--bgcolor-navbar-default)]  h-16 z-50 fixed top-0
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
            <span className="text text-xl ml-2 lg:hidden lg:text-base lg:ml-2 lg:z-50">
              夜雨炊烟
            </span>
          </div>
        </div>
        {/* 中间导航栏 */}
        <div className="flex items-center">
          {/* pc */}
          <div
            className="flex items-center w-48 h-8 rounded-xl border-[1px] border-solid border-[var(--bgcolor-navbar-hover)] bg-base-100  cursor-pointer
            lg:hidden
            "
            onClick={showModal}
          >
            <span className="flex items-center bg-base-100 text-[var(--border-search-color)] h-full w-full rounded-xl text-xs px-3 ">
              搜索想要查看的文章
            </span>
          </div>
          {/* 移动 */}
          <div
            className="absolute right-24 top-5 w-9 h-9  cursor-pointer hidden lg:block
            "
            onClick={showModal}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </div>
          {/* navbar */}
          <div
            className={`flex items-center lg:z-30 lg:flex lg:flex-col  lg:absolute  lg:-left-32   lg:bg-base-100 lg:top-0 lg:min-h-screen  lg:pt-12 lg:w-36  lg:border-r-secondary  ${navbar
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
            <span
              className="hidden lg:block lg:absolute lg:top-5 lg:text-xl lg:ml-2 lg:z-50  lg:cursor-pointer sm:text-xl"
              onClick={handleHomeRouter}
            >
              夜雨炊烟
            </span>
            {/* 导航栏 */}
            {window.innerWidth > 970 ? renderMenu(items) : renderMobileMenu(mobileList)}
          </div>
          {
            loginStatus === false ?
              <div className='cursor-pointer flex' onClick={handleLogin}>
                <span>
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="22559" width="20" height="20">
                    <path d="M347.562667 560.938667a21.333333 21.333333 0 0 0 30.165333 30.165333l128-128a21.290667 21.290667 0 0 0 4.608-6.954667c0.597333-1.493333 0.682667-3.029333 0.938667-4.608 0.213333-1.194667 0.725333-2.304 0.725333-3.541333 0-1.621333-0.597333-3.072-0.938667-4.565333-0.256-1.152-0.256-2.389333-0.725333-3.498667a22.357333 22.357333 0 0 0-4.736-7.125333L377.728 304.938667a21.333333 21.333333 0 0 0-30.165333 30.165333L439.082667 426.666667H64a21.333333 21.333333 0 0 0 0 42.666666h375.168l-91.605333 91.605334zM889.216 0c-3.285333 0-6.485333 0.64-9.685333 0.981333C877.909333 0.597333 876.373333 0 874.666667 0h-512A106.794667 106.794667 0 0 0 256 106.666667v213.333333a21.333333 21.333333 0 0 0 42.666667 0v-213.333333C298.666667 71.381333 327.381333 42.666667 362.666667 42.666667h408.064l-160.213334 68.650666A92.074667 92.074667 0 0 0 554.666667 196.010667V853.333333H362.666667c-30.677333 0-56.746667-21.333333-63.104-30.165333L298.666667 575.914667A21.333333 21.333333 0 0 0 277.333333 554.666667h-0.085333a21.333333 21.333333 0 0 0-21.248 21.418666l0.981333 248.618667c-0.853333 9.344 3.541333 19.114667 13.354667 29.866667 17.450667 19.114667 52.096 41.429333 92.330667 41.429333H554.666667v35.882667a92.245333 92.245333 0 0 0 128.384 84.693333l242.432-103.893333A92.074667 92.074667 0 0 0 981.333333 827.989333V92.117333C981.333333 41.344 939.989333 0 889.216 0zM938.666667 827.989333c0 19.797333-11.776 37.674667-29.994667 45.44l-242.432 103.893334A49.493333 49.493333 0 0 1 597.333333 931.882667V196.010667c0-19.797333 11.776-37.674667 29.994667-45.44l242.432-103.893334A49.493333 49.493333 0 0 1 938.666667 92.117333v735.872zM661.333333 469.333333a21.333333 21.333333 0 0 0-21.333333 21.333334v85.333333a21.333333 21.333333 0 0 0 42.666667 0v-85.333333a21.333333 21.333333 0 0 0-21.333334-21.333334z"
                      fill='var(--bgcolor-navbar-click)'
                      p-id="22560">
                    </path>
                  </svg>
                </span>
                <span className='text-[var(--bgcolor-navbar-click)] text-sm'>登录</span>
              </div> : <Popconfirm
                placement="bottom"
                title={<p>您是否选择退出登录？</p>}
                description={<div></div>}
                icon={<LoginOutlined spin />}
                onConfirm={handleLoginOut}
                okText="是"
                cancelText="否"
              >
                <div className='cursor-pointer flex'>
                <span>
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="27607"
                    width="20"
                    height="20">
                    <path d="M903.7 447.2H798.2V350c0-6.8-3.7-13-9.5-16.4-5.9-3.4-13.1-3.3-18.9 0.1l-148.2 87.7c-8.9 5.3-11.9 16.9-6.6 25.8 5.3 8.9 16.9 11.9 25.8 6.6l119.7-70.9V466c0 10.4 8.4 18.8 18.9 18.8h105.4V540H779.4c-10.4 0-18.9 8.4-18.9 18.8v82.9l-119.8-70.9c-8.9-5.3-20.6-2.3-25.8 6.6-5.3 9-2.3 20.5 6.6 25.8l148.3 87.7c2.9 1.7 6.3 2.6 9.6 2.6 3.2 0 6.4-0.8 9.3-2.5 5.9-3.3 9.5-9.6 9.5-16.4v-97.2h105.4c10.4 0 18.9-8.4 18.9-18.8V466c0-10.4-8.4-18.8-18.8-18.8z" fill="" p-id="27608"></path><path d="M728.7 730.3c-12.7-0.3-21.9 9.5-22 21.5l-0.6 51.6H595V198.8c0-10.5-7.6-19.6-18-21.4L427.2 151h286.4l-1.4 122c-0.1 12 9.5 21.9 21.5 22h0.3c11.9 0 21.6-9.6 21.8-21.5l1.7-144.1c0.1-5.8-2.2-11.4-6.3-15.5s-9.7-6.5-15.5-6.5H178.8c-1.1 0-2.1 0.5-3.2 0.7-1.3 0.2-2.5 0.3-3.7 0.7-1.8 0.6-3.4 1.6-5 2.6-0.7 0.5-1.5 0.6-2.2 1.2-0.2 0.2-0.3 0.5-0.5 0.7-1.7 1.5-2.9 3.4-4 5.4-0.4 0.6-0.9 1.1-1.2 1.8-1.2 2.7-1.9 5.6-1.9 8.7v0.2l8 696c0.1 10.4 7.6 19.3 17.9 21.2l386.4 69.6c1.3 0.2 2.6 0.3 3.9 0.3 5.1 0 10-1.8 14-5.1 4.9-4.1 7.8-10.2 7.8-16.7v-47.9h132.7c11.9 0 21.6-9.6 21.8-21.5l0.8-73.1c-0.1-11.9-9.7-21.8-21.7-21.9zM551.5 868.8L208.4 807l-7.5-651.8 350.6 61.9v651.7z"
                      fill=""
                      p-id="27609">
                    </path>
                  </svg>
                </span>
                <span className='text-[var(--bgcolor-navbar-click)] text-sm'>{loginInfo.username}</span>
              </div>
              </Popconfirm>

          }
        </div>
        {/* 切换主题 */}
        <div className="h-8 w-16  rounded-3xl bg-base-200 border border-solid border-1 border-[var(--bgcolor-navbar-hover)] relative top-4 right-3" tabIndex={0}>
          {
            isChecked ? <button
              className="rounded-3xl border-none h-8 w-8 absolute left-[0.9rem] bg-[var(--bgcolor-navbar-default)]  translate-x-1/2 transition-all  cursor-pointer"
              data-set-theme="light"
              onClick={() => handleChangeImage(0)}
            >

              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27119" width="30" height="30"><path d="M565 200.4c25.6 44.6 40.4 96.2 40.4 151.3 0 167.9-136.1 304-304 304-22.9 0-45.2-2.6-66.7-7.4C284.5 760.7 397 839.2 527.8 839.2c177 0 320.5-143.5 320.5-320.5 0-164.4-123.8-299.8-283.3-318.3zM312.9 243.6h-39.2v-39.2c0-10.8-8.8-19.6-19.6-19.6s-19.6 8.8-19.6 19.6v39.2h-39.2c-10.8 0-19.6 8.8-19.6 19.6s8.8 19.6 19.6 19.6h39.2V322c0 10.8 8.8 19.6 19.6 19.6s19.6-8.8 19.6-19.6v-39.2h39.2c10.8 0 19.6-8.8 19.6-19.6s-8.8-19.6-19.6-19.6z" fill="#FFF0C2" p-id="27120"></path><path d="M306.9 245.6h-35.2v-35.2c0-9.7-7.9-17.6-17.6-17.6-9.7 0-17.6 7.9-17.6 17.6v35.2h-35.2c-9.7 0-17.6 7.9-17.6 17.6 0 9.7 7.9 17.6 17.6 17.6h35.2V316c0 9.7 7.9 17.6 17.6 17.6 9.7 0 17.6-7.9 17.6-17.6v-35.2h35.2c9.7 0 17.6-7.9 17.6-17.6 0-9.7-7.9-17.6-17.6-17.6z" fill="#FFC445" p-id="27121"></path><path d="M427.8 475.3h-27.5v-27.5c0-7.6-6.2-13.8-13.8-13.8-7.6 0-13.8 6.2-13.8 13.8v27.5h-27.5c-7.6 0-13.8 6.2-13.8 13.8 0 7.6 6.2 13.8 13.8 13.8h27.5v27.5c0 7.6 6.2 13.8 13.8 13.8 7.6 0 13.8-6.2 13.8-13.8v-27.5h27.5c7.6 0 13.8-6.2 13.8-13.8 0-7.6-6.2-13.8-13.8-13.8z" fill="#FFF0C2" p-id="27122"></path><path d="M423.6 476.7h-24.7V452c0-6.8-5.5-12.4-12.4-12.4-6.8 0-12.4 5.5-12.4 12.4v24.7h-24.7c-6.8 0-12.4 5.5-12.4 12.4 0 6.8 5.5 12.4 12.4 12.4h24.7v24.7c0 6.8 5.5 12.4 12.4 12.4 6.8 0 12.4-5.5 12.4-12.4v-24.7h24.7c6.8 0 12.4-5.5 12.4-12.4 0-6.8-5.5-12.4-12.4-12.4z" fill="#FFC445" p-id="27123"></path><path d="M563.4 223c23.8 41.4 37.5 89.4 37.5 140.6 0 156-126.5 282.5-282.5 282.5-21.3 0-42-2.4-62-6.9 46.3 104.5 150.8 177.4 272.4 177.4 164.5 0 297.9-133.4 297.9-297.9 0-152.7-115.1-278.6-263.3-295.7z" fill="#FFB948" p-id="27124"></path></svg>
              <div data-theme="light" className="">
                <div className="flex-grow text-sm font-bold"></div>
              </div>
            </button> :
              <button
                className="flex items-center justify-center rounded-3xl border-none h-8 w-8 absolute left-[1.04rem] bg-[var(--bgcolor-navbar-default)]  -translate-x-1/2 transition-all  cursor-pointer"
                data-set-theme="night"
                onClick={() => handleChangeImage(1)}
              >
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24606" width="20" height="20"><path d="M512 0a58.514286 58.514286 0 0 1 58.514286 58.514286v73.142857a58.514286 58.514286 0 1 1-117.028572 0V58.514286a58.514286 58.514286 0 0 1 58.514286-58.514286z m0 833.828571a58.514286 58.514286 0 0 1 58.514286 58.514286v73.142857a58.514286 58.514286 0 1 1-117.028572 0v-73.142857a58.514286 58.514286 0 0 1 58.514286-58.514286z m512-321.828571a58.514286 58.514286 0 0 1-58.514286 58.514286h-73.142857a58.514286 58.514286 0 1 1 0-117.028572h73.142857a58.514286 58.514286 0 0 1 58.514286 58.514286z m-833.828571 0a58.514286 58.514286 0 0 1-58.514286 58.514286H58.514286a58.514286 58.514286 0 1 1 0-117.028572h73.142857a58.514286 58.514286 0 0 1 58.514286 58.514286z m683.871085-362.042514a58.514286 58.514286 0 0 1 0 82.753828l-51.726628 51.726629a58.514286 58.514286 0 1 1-82.753829-82.753829l51.726629-51.726628a58.514286 58.514286 0 0 1 82.753828 0zM284.437943 739.562057a58.514286 58.514286 0 0 1 0 82.753829l-51.726629 51.726628a58.514286 58.514286 0 1 1-82.753828-82.753828l51.726628-51.726629a58.514286 58.514286 0 0 1 82.753829 0z m589.604571 134.480457a58.514286 58.514286 0 0 1-82.753828 0l-51.726629-51.726628a58.514286 58.514286 0 0 1 82.753829-82.753829l51.726628 51.726629a58.514286 58.514286 0 0 1 0 82.753828zM284.437943 284.437943a58.514286 58.514286 0 0 1-82.753829 0l-51.726628-51.726629a58.514286 58.514286 0 1 1 82.753828-82.753828l51.726629 51.726628a58.514286 58.514286 0 0 1 0 82.753829zM512 731.428571c-121.183086 0-219.428571-98.245486-219.428571-219.428571 0-121.183086 98.245486-219.428571 219.428571-219.428571 121.183086 0 219.428571 98.245486 219.428571 219.428571 0 121.183086-98.245486 219.428571-219.428571 219.428571z" fill="#F7B500" p-id="24607"></path></svg>
                <div data-theme="night" className="">
                  <div className="flex-grow text-sm font-bold"></div>
                </div>
              </button>
          }
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
            className={`${searchVal !== '' ? 'block' : 'hidden'
              } mt-2 py-2 rounded-lg px-4 font-medium border border-solid max-h-96 overflow-auto`}
          >
            <Spin size="large" spinning={props.isLoading}>
              {list.length > 0 ? (
                list.map((item: any) => {
                  return (
                    <div
                      key={item._id}
                      className="hover:bg-base-300 hover:transition hover:duration-500 rounded-lg p-2 cursor-pointer "
                      onClick={() => handleSearchData(item._id)}
                    >
                      {item.title}
                    </div>
                  );
                })
              ) : (
                <div>No recent searches</div>
              )}
            </Spin>
          </div>
        </Modal>
        <Modal
          open={isLoginModalOpen}
          closable={false}
          centered
          footer={null}
          title={<div style={{ textAlign: 'center', marginBottom: "20px" }}>欢迎登录本网站</div>}
          onCancel={handleLoginCancel}
        >
          <Form
            form={form}
            layout="horizontal"
            name="basic"
            className="userAddFrom"
            onFinish={onFinish}
          >
            {isLogin ? <div>
              <Form.Item
                name="username"
                rules={[{ validator: validateName }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入昵称" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ validator: validatePassword }]}
              >
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
            </div> : <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="avatar"
                  label="头像上传"
                  rules={[{ required: true, message: '头像不能为空' }]}
                >
                  {/* @ts-ignore */}
                  <UploadImage handleChange={handleChange} imgUrlArr={imgUrl} />
                </Form.Item>

              </Col>
              <Col span={12}>
                <Form.Item
                  name="username"
                  rules={[{ validator: validateName }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    {
                      pattern:
                        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确',
                    },
                  ]}
                >
                  <Input maxLength={30} placeholder="请输入你的邮箱" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ validator: validatePassword }]}
                >
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
            </Row>}
            <Row gutter={24}>
              <Col span={12}>

              </Col>
              <Col span={12}>

              </Col>
            </Row>

            <Form.Item>
              {
                isLogin ?
                  <Button type="primary" htmlType="submit" className="w-[calc(100%-0px)]">
                    登录
                  </Button> :
                  <Button type="primary" htmlType="submit" className="w-[calc(100%-0px)]">
                    注册
                  </Button>
              }
              <div className=' relative top-3'>
                <div className='absolute right-0'>{isLogin ?
                  <p>
                    没有账号？点我<span className='cursor-pointer ml-1 text-blue-500' onClick={handleChangeRegister}>注册</span><br />
                    忘记密码？点我<span className='cursor-pointer ml-1 text-blue-500' onClick={handleChangeRegister}>找回</span></p> :
                  <span className='cursor-pointer ml-1 text-blue-500' onClick={handleForgetLogin}>返回登录页面</span>}
                </div>
                <p className='flex items-center'>推荐登录：
                  <span className='cursor-pointer' onClick={handleLoginQQ}><svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066" width="30" height="30"><path d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z" fill="#FAAD08" p-id="4067"></path><path d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z" fill="#FAAD08" p-id="4068"></path><path d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z" fill="#000000" p-id="4069"></path><path d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017" fill="#000000" p-id="4070"></path><path d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453" fill="#FFFFFF" p-id="4071"></path><path d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498" fill="#FAAD08" p-id="4072"></path><path d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135" fill="#000000" p-id="4073"></path><path d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927" fill="#FFFFFF" p-id="4074"></path><path d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574" fill="#EB1C26" p-id="4075"></path><path d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z" fill="#EB1C26" p-id="4076"></path></svg></span>
                </p>
              </div>
            </Form.Item>
          </Form>
        </Modal>

      </div>
    </nav>
  );
};
// 将状态映射为属性
const mapStateToProps = (state: any) => {
  return {
    isLoading: state.LoadingReducer.isLoading,
  };
};
// 输出
const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
