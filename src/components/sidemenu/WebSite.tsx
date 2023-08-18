import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import IconFont from '../iconfont';
const WebSite = (props: any) => {
  // 访问量
  const [viewCount, setViewCount] = useState();
  // 运行天数
  const [days, setDays] = useState(0);
  // 网站访问量
  const [visitNumber, setVisitNumber] = useState()
  // 网站访问量
  useEffect(() => {
    props.BlogActions.asyncWebsitVisitNumberAction().then((res: any) => {
      let { data } = res.data
      setVisitNumber(data[0].visitNumber)
    })
  }, [props.BlogActions])
  useEffect(() => {
    let articles = props.data;
    let viewTemp = articles.map((item: CategoryData) => item.views);

    let init = 0;
    let viewCount = viewTemp.reduce((prev: any, curr: any) => {
      return prev + curr;
    }, init);
    setViewCount(viewCount);
  }, [props.data]);
  useEffect(() => {
    countDown('2023/03/22 00:00:00');
  }, []);
  function countDown(start: any) {
    // 获取当前时间
    let endDate = new Date().getTime();
    let starDate = new Date(start).valueOf();
    let intervalTime = endDate - starDate;
    // 计算天
    let days = Math.floor(intervalTime / 24 / 60 / 60 / 1000);
    setDays(days);
  }

  return (
    <div
      className="flex flex-col  justify-around bg-base-100 py-2 pr-7 pl-5 h-32 text-xl mb-3 mx-auto rounded-3xl transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-105"
      style={{ userSelect: 'none' }}
    >
      <div className="flex justify-between">
        <p className="flex">
          <IconFont iconName='icon-fangwenliang' className=' text-[28px] pr-2'></IconFont>
          <span>网站访问量</span>
        </p>
        <p><span>{visitNumber}</span></p>
      </div>
      <div className="flex justify-between">
        <p className="flex">
          <IconFont iconName='icon-wiappfangwenliang' className=' text-[28px] pr-2'></IconFont>
          <span>文章访问量</span>
        </p>
        <p>
          <span>{viewCount}</span>
        </p>
      </div>
      <div className="flex justify-between">
        <p className="flex">
          <IconFont iconName='icon-wangzhan' className='text-[28px] pr-2'></IconFont>
          <span>本网站已运行</span>
        </p>
        <p>
          <span>{days}天</span>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(WebSite);
