import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';

const WebSite = (props: any) => {
  // 访问量
  const [viewCount, setViewCount] = useState();
  // 运行天数
  const [days, setDays] = useState(0);
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
      className="flex flex-col  justify-around bg-base-100 h-20 mb-3 mx-auto rounded-3xl transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-105"
      style={{ userSelect: 'none' }}
    >
      <div className="">
        <p className="flex justify-between px-8 text-xl">
          <span>访问量</span>
          <span>{viewCount}</span>
        </p>
      </div>
      <div className="">
        <p className="flex justify-between px-8 text-xl">
          <span>本网站已运行</span>
          <span>{days}天</span>
        </p>
      </div>
    </div>
  );
};

export default WebSite;
