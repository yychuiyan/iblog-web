import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import PageDesc from '@/components/sidemenu/PageDesc';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import IconFont from '@/components/iconfont';
import { Helmet } from 'react-helmet';
interface DataType {
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
  checked: boolean;
  status: number;
  data: []
}
const FE_Project = (props: any) => {
  // 项目列表
  const [navigation, setNavgation] = useState<DataType[]>([]);
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
      let { data } = res as unknown as NavigationData;
      // 筛选项目列表数据
      let project = data.filter((item: NavigationData) => item.classify === "项目列表")
      setNavgation(project)
    });
  }, [props.BlogActions]);
  // 跳转页面
  const handleJump = (link: string) => {
    window.open(link);
  };
  return (
    // @ts-ignore
    <div className="w-1200  mx-auto lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: "none" }}>
      <Helmet>
        <title>项目列表 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="项目列表" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        <div className='mt-2 lg:hidden'>
          {navigation.map((item) => {
            return (
              <div
                className="home_reader_page  float-left w-48 h-72 px-2 pb-2 pt-2 ml-8 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4"
                key={item._id}
                onClick={() => handleJump(item.link)}
              >
                {/* 封面 */}
                <div className='relative flex justify-center overflow-hidden rounded-lg w-48 h-72'>
                  <LazyLoadImage src={item.avatar} alt="Image" loading='lazy' effect="blur" className="image_reader_page rounded-lg w-full h-full" />
                </div>
                <div className='flex justify-center flex-wrap'>
                  <div className="flex justify-center text-xl line-clamp-1 overflow-hidden absolute">{item.name}</div>
                  <div className="flex items-center h-12 w-full">
                    <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
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
