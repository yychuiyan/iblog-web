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
interface ReaderData {
  checked: boolean;
  status: number;
  data: []
}
const FE_Website = (props: any) => {
  // 待网站
  const [waitReading, setWaitReading] = useState<DataType[]>([]);
  // 网站中
  const [reading, setReading] = useState<DataType[]>([]);
  // 已读完
  const [read, setRead] = useState<DataType[]>([]);
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
  // 获取网站列表数据
  useEffect(() => {
    props.BlogActions.asyncReaderListAction().then((res: ReaderData) => {
      // 获取网站
      let { data } = res.data as unknown as ReaderData;
      // 筛选已下架数据
      let validBooks = data.filter((item: ReaderData) => item.checked === true)
      // 获取待网站的书籍
      let waitReading = validBooks.filter((item: ReaderData) => item.status === 0)
      // 获取网站中的书籍
      let reading = validBooks.filter((item: ReaderData) => item.status === 1)
      // 获取已读完的书籍
      let read = validBooks.filter((item: ReaderData) => item.status === 2)
      setWaitReading(waitReading)
      setReading(reading)
      setRead(read)
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
        <title>常用网站 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="常用网站" desc="经常使用的前端网站。" />
      <div className="flex flex-col w-1000 min-h-screen bg-base-100 mt-10 pb-6 pt-2 mx-auto  rounded-2xl lg:min-h-screen lg:pb-6 lg:w-full sm:w-full">
        <div className='mt-2 lg:hidden'>
          <div className='mx-5'>
            <p className='flex text-2xl'>
              <IconFont iconName='icon-yuedu1' className='text-[28px]'></IconFont>
              <span className='ml-2'>常用网站</span>
            </p>
            <p className="w-full border border-t-0 border-l-0 border-r-0 border-b-1 border-solid mt-2 lg:w-full"></p>
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
export default connect(null, mapDispatchToProps)(FE_Website);
