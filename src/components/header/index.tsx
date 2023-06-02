import { Input, InputRef, List, Modal, Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { themeChange } from 'theme-change';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

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
  const [isShow, setIsShow] = useState(false);
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
  }, []);
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
            className="dropdown dropdown-end text-xl font-medium flex cursor-pointer ml-3"
          >
            <span>{item.title}</span>
            <div>
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </div>
            {/* 下拉显示 */}
            <div className="dropdown-content bg-base-100  shadow-2xl  rounded-t-box rounded-b-box top-px w-32 overflow-y-auto mt-12">
              <div tabIndex={0} className="bg-base-100">
                <li
                  key={item.children.path}
                  className="flex flex-col items-center cursor-pointer rounded-xl text-xl font-medium"
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
          <ul className={`flex items-center font-medium text-xl list-none h-16`}>
            <li
              className={`px-5 cursor-pointer  ${selectKeys === item.path
                ? 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl ring-1  ring-current'
                : 'flex justify-center items-center w-15 h-8 ml-2 rounded-xl hover:ring-1 hover:transition hover:duration-300 ring-current '
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
    let searchVals = inputRef.current?.input?.value;
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
    localStorage.setItem('localmode', i);
    props.BlogActions.asyncModeAction(Number(localStorage.getItem('localmode')));
  };

  return (
    <nav
      className={`shadow-sm  w-full backdrop-blur-none bg-base-100  h-16 z-50 fixed top-0
      ${isShow ? 'fixed -top-16' : 'fixed top-0'}
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
          <div className="flex items-center cursor-pointer" onClick={handleHomeRouter}>
            <span className="text-xl ml-2 lg:hidden lg:text-base lg:ml-2 lg:z-50">夜雨炊烟</span>
          </div>
        </div>
        {/* 中间导航栏 */}
        <div className="flex items-center">
          {/* pc */}
          <div
            className="flex items-center w-52 h-8 rounded-xl border-[1px] border-solid bg-base-100  cursor-pointer
            lg:hidden
            "
            onClick={showModal}
          >
            <span className="flex items-center bg-base-100 h-full w-full rounded-xl text-xs px-3 ">
              搜索想要查看的文章内容
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
        </div>
        {/* 切换主题 */}
        <div className="dropdown dropdown-end flex items-center">
          <div className="flex items-center flex-col mr-5 ml-2">
            {/* <Switcher /> */}
            <div tabIndex={0} className="flex items-center cursor-pointer">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </svg>
              <span className="text-lg">主题</span>
              <div>
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </div>
            </div>
            <div className="dropdown-content  bg-base-100  shadow-2xl  rounded-t-box rounded-b-box top-px w-52 overflow-y-auto mt-16">
              <div className="grid grid-cols-1 gap-5 p-2" tabIndex={0}>
                <button
                  className="outline-base-content overflow-hidden rounded-lg  text-left"
                  data-set-theme="light"
                  onClick={() => handleChangeImage(0)}
                >
                  <div data-theme="light" className="bg-base-100  w-full cursor-pointer font-sans">
                    <div className="grid grid-cols-5 grid-rows-3">
                      <div className="col-span-5 row-span-3 row-start-1 flex gap-2 py-3 px-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3 invisible"
                        >
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                        </svg>{' '}
                        <div className="flex-grow text-sm font-bold">light</div>{' '}
                        <div className="flex flex-shrink-0 flex-wrap gap-1 h-full">
                          <div className="bg-primary w-2 rounded"></div>{' '}
                          <div className="bg-secondary w-2 rounded"></div>{' '}
                          <div className="bg-accent w-2 rounded"></div>{' '}
                          <div className="bg-neutral w-2 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  className="outline-base-content overflow-hidden rounded-lg text-left"
                  data-set-theme="night"
                  onClick={() => handleChangeImage(1)}
                >
                  <div data-theme="night" className="bg-base-100 w-full cursor-pointer font-sans">
                    <div className="grid grid-cols-5 grid-rows-3">
                      <div className="col-span-5 row-span-3 row-start-1 flex gap-2 py-3 px-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3 invisible"
                        >
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                        </svg>
                        <div className="flex-grow text-sm font-bold">night</div>
                        <div className="flex flex-shrink-0 flex-wrap gap-1 h-full">
                          <div className="bg-primary w-2 rounded"></div>
                          <div className="bg-secondary w-2 rounded"></div>
                          <div className="bg-accent w-2 rounded"></div>
                          <div className="bg-neutral w-2 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  className="outline-base-content overflow-hidden rounded-lg text-left"
                  data-set-theme="navy"
                  onClick={() => handleChangeImage(2)}
                >
                  <div data-theme="navy" className="bg-base-100  w-full cursor-pointer font-sans">
                    <div className="grid grid-cols-5 grid-rows-3">
                      <div className="col-span-5 row-span-3 row-start-1 flex gap-2 py-3 px-4 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3 invisible"
                        >
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                        </svg>
                        <div className="flex-grow text-sm font-bold">navy</div>
                        <div className="flex flex-shrink-0 flex-wrap gap-1 h-full">
                          <div className="bg-primary w-2 rounded"></div>
                          <div className="bg-secondary w-2 rounded"></div>
                          <div className="bg-accent w-2 rounded"></div>
                          <div className="bg-neutral w-2 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
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
