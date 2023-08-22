import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import PageDesc from '@/components/sidemenu/PageDesc';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import IconFont from '@/components/iconfont';
interface DataType {
  avatar: string;
  createTime: string;
  desc: string;
  link: string;
  name: string;
  updateTime: string;
  _id: string;
}
interface FriendlyData{
  checked: boolean;
  status: boolean;
  data:[]
}
const Friendly = (props: any) => {
  // 友链列表
  const [list, setList] = useState<DataType[]>([]);
  // 失效友链
  const [invalidLink, setInvalidLink] = useState<DataType[]>([]);
  // 滚动位置
  const myRef = React.useRef();
  useEffect(() => {
    if (myRef.current) {
      // window.scrollTo(0, myRef.current.offsetTop || 0);
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  // 获取友链列表数据
  useEffect(() => {
    props.BlogActions.asyncFriendlyListAction().then((res: FriendlyData) => {
      // 获取友链
      let { data } = res.data as unknown as FriendlyData;
      let shuffle = data.sort(() => Math.random() - 0.5);
      // 筛选已下线数据
      let lineData = shuffle.filter((item: FriendlyData) => item.checked === true)
      let friendlyData = lineData.filter((item: FriendlyData) => item.status === true)
      let invalidLink = lineData.filter((item: FriendlyData) => item.status === false)
      console.log("invalidLink1", invalidLink);
      setList(friendlyData);
      setInvalidLink(invalidLink)
    });
  }, [props.BlogActions]);
  // 跳转页面
  const handleJump = (link:string) => {
    window.open(link);
  };
  return (
    // @ts-ignore
    <div className="w-1200  mx-auto lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: "none" }}>
      <PageDesc title="友链" desc="" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-[90%] lg:pb-6 lg:w-full sm:w-full">
        <div className='mt-2'>
          <div className='mx-5'>
            <p className='flex text-2xl'>
              <IconFont iconName='icon-chengchangdaoshi' className=' text-[28px]'></IconFont>
              <span className='ml-2'>优秀博主</span>
            </p>
            <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"></p>
          </div>
          {list.map((item) => {
            return (
              <div
                className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4"
                key={item._id}
                onClick={() => handleJump(item.link)}
              >
                {/* 头像 */}
                <div className='relative overflow-hidden rounded-xl'>
                  <LazyLoadImage src={item.avatar} alt="Image" loading='lazy' effect="blur" className="image_friendly_page w-20 h-20 rounded-xl" />
                </div>
                <div className="ml-2 w-48">
                  <p className="flex justify-start text-xl">{item.name}</p>
                  <div className="flex items-center h-12">
                    <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {
          invalidLink.length > 0 ? <div className='mt-5'>
          <div className='mx-5'>
            <div className='text-2xl flex'>
              <IconFont iconName='icon-jiankongbaojing' className='text-[28px]'></IconFont>
              <span className='ml-2'>失联博主</span>
              <span className='text-[13px] pt-1 text-[var(--article-content-default)]'>(网站正常后可联系博主恢复友链信息，长时间未更新将取消贵站链接。)</span>
            </div>
            <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mb-2 lg:w-full"></p>
          </div>
          {invalidLink.map((item) => {
            return (
              <div
                className="home_friendly_page  flex float-left w-280 h-20 p-2 ml-6 mt-5 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer lg:ml-4"
                key={item._id}
                onClick={() => handleJump(item.link)}
              >
                {/* 头像 */}
                <div className='relative overflow-hidden rounded-xl'>
                  <LazyLoadImage src={item.avatar} alt="Image" loading='lazy' effect="blur" className="image_friendly_page w-20 h-20 rounded-xl" />
                </div>
                <div className="ml-2 w-48">
                  <p className="flex justify-start text-xl">{item.name}</p>
                  <div className="flex items-center h-12">
                    <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </div> : <div></div>
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
export default connect(null, mapDispatchToProps)(Friendly);
