import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import PageDesc from '@/components/sidemenu/PageDesc';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';
import IconFont from '@/components/iconfont';
interface DataType {
  title: string;
  avatar: string;
  createTime: string;
  desc: string;
  link: string;
  name: string;
  updateTime: string;
  _id: string;
}
interface NavigationData {
  classify: string;
  status: boolean;
  data: []
}
const FE_Tools = (props: any) => {
  // 工具列表
  const [navigation, setNavgation] = useState<DataType[]>([]);
  // 文字显示和隐藏
  const [fontStatus, setFontStatus] = useState(null)
  // 滚动位置
  const myRef = React.useRef();
  useEffect(() => {
    if (myRef.current) {
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  // 获取工具列表数据
  useEffect(() => {
    props.BlogActions.asyncNavigationListAction().then((res: NavigationData) => {
      // 获取工具
      let { data } = res.data as unknown as NavigationData;
      // 获取在线数据
      let online = data.filter((item: NavigationData) => item.status === true)
      // 筛选工具列表数据
      let tools = online.filter((item: NavigationData) => item.classify === "工具管理")
      setNavgation(tools)
    });
  }, [props.BlogActions]);
  // 跳转页面
  const handleJump = (link: string) => {
    window.open(link);
  };
  // 鼠标移入移出
  const handleMouseEnter = (id: string | any) => {
    setFontStatus(id)
  }
  const handleMouseLeave = () => {
    setFontStatus(null);
  };

  return (
    // @ts-ignore
    <div className="w-1200  mx-auto lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: "none" }}>
      <Helmet>
        <title>工具集 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="工具集" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        <div className='mt-2'>
          <div>
            {
              navigation.length > 0 ? <div className='mt-0'>
                {navigation.map((item) => {
                  return (
                    <div className='lg:w-full lg:mx-auto lg:flex lg:justify-center' key={item._id}>
                      <div
                        className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                        key={item._id}
                        onClick={() => handleJump(item.link)}
                      >
                        { }
                        <div className='relative overflow-hidden rounded-xl'>
                          <LazyLoadImage src={item.avatar} alt="Image" loading='lazy' effect="blur" className="image_friendly_page w-20 h-20 rounded-xl" />
                        </div>
                        <div className="ml-2 w-48">
                          <p className="flex justify-start text-xl line-clamp-1 overflow-hidden">{item.title}</p>
                          <div className="flex items-center h-12">
                            <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div> : <div></div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(FE_Tools);
