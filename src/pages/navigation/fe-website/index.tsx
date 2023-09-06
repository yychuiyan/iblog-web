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
  category: any;
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
  site: any;
  category: any;
  classify: string;
  status: boolean;
  data: []
}
const FE_Website = (props: any) => {
  // 常用网站列表
  const [navigation, setNavgation] = useState<any>();
  // const [navigation, setNavgation] = useState<DataType[]>([]);
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
  // 获取常用网站列表数据
  useEffect(() => {
    props.BlogActions.asyncNavigationListAction().then((res: NavigationData) => {
      // 获取常用网站
      let { data } = res.data as unknown as NavigationData;
      // 获取在线数据
      let online = data.filter((item: NavigationData) => item.status === true)
      // 筛选常用网站列表数据
      let website = online.filter((item: NavigationData) => item.classify === "常用网站")
      let newWebSite = website.map((item: NavigationData) => {
        return {
          category: item.category,
          site: { ...item }
        }
      })
      const result = {};
      newWebSite.forEach((item: any) => {
        const category = item.category;
        const site = item.site;
        if (!result[category]) {
          result[category] = {
            "category": category,
            "site": []
          };
        }
        result[category].site.push(site);
      });
      const mergedData = Object.values(result);
      const websiteData = [...mergedData]
      setNavgation(websiteData)
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
        <title>常用网站 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="常用网站" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        {
          navigation?.map((item: any, index: number) => (
            <div className='mt-2' key={index}>
              <div className='mx-5'>
                <p className='flex text-2xl'>
                  <span className='ml-2'>{item.category}</span>
                </p>
                <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"></p>
              </div>
              <div>
                {
                  item?.site.map((data: any) => (
                    <div key={data._id}>
                      <div className='lg:w-full lg:mx-auto lg:flex lg:justify-center'>
                        <div
                          className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:float-none lg:flex-wrap lg:ml-0"
                          key={data._id}
                          onClick={() => handleJump(data.link)}
                        >
                          { }
                          <div className='relative overflow-hidden rounded-xl'>
                            <LazyLoadImage src={data.avatar} alt="Image" loading='lazy' effect="blur" className="image_friendly_page w-20 h-20 rounded-xl" />
                          </div>
                          <div className="ml-2 w-48">
                            <p className="flex justify-start text-xl line-clamp-1 overflow-hidden">{data.title}</p>
                            <div className="flex items-center h-12">
                              <p className="line-clamp-2 overflow-hidden">{data.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(FE_Website);
