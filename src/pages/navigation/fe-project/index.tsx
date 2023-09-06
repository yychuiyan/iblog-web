import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import PageDesc from '@/components/sidemenu/PageDesc';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet';
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
const FE_Project = (props: any) => {
  // 项目列表
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
  // 获取项目列表数据
  useEffect(() => {
    props.BlogActions.asyncNavigationListAction().then((res: NavigationData) => {
      // 获取项目
      let { data } = res.data as unknown as NavigationData;
      // 获取在线数据
      let online = data.filter((item: NavigationData) => item.status === true)
      // 筛选项目列表数据
      let project = online.filter((item: NavigationData) => item.classify === "项目列表")
      setNavgation(project)
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
        <title>作品 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="作品" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        <div className='mt-2'>
          {navigation.map((item) => {
            return (
              <div
                className="home_reader_page  float-left w-72 h-96  ml-[2.1rem] mb-2 mt-5 bg-base-200 rounded-lg hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4"
                key={item._id}
                onClick={() => handleJump(item.link)}
                onMouseEnter={() => handleMouseEnter(item._id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`relative w-72 h-96 flex justify-center`}>
                  {/* 封面 */}
                  <div className='flex justify-center overflow-hidden rounded-lg w-full h-full'>
                    <LazyLoadImage src={item.avatar} alt="Image" loading='lazy' effect="blur" className="image_reader_page rounded-lg w-full h-full" />
                  </div>
                  <div className={`flex flex-wrap  absolute top-[30%] px-2`}>
                    <div className="flex justify-center flex-wrap w-full">
                      <p className=' text-3xl font-medium line-clamp-1 overflow-hidden'>{item.title}</p>
                    </div>
                    <div className={`flex justify-center w-full h-full pt-2 ${fontStatus === item._id ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'}`}>
                      {fontStatus === item._id && <div>
                        <span className="text-xl line-clamp-2 overflow-hidden">{item.desc}</span>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
export default connect(null, mapDispatchToProps)(FE_Project);
