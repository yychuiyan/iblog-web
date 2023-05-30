import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const LastUpdate = (props: any) => {
  const [lastData, setLastData] = useState([]);
  useEffect(() => {
    let lastUpdateData = props.data.sort((curr: any, prev: any) => {
      return prev.createTime - curr.createTime;
    });
    let newLastUpdate = lastUpdateData.slice(0, 6);
    setLastData(newLastUpdate);
  }, [props.data]);
  const handleLastUpdate = (id: string) => {
    props.history.push(`/rblog/article/detail/${id}`);
  };
  return (
    <div className=" mb-5 rounded-2xl pb-2 bg-base-100 mx-auto text-xl transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-105 lg:hidden">
      <p
        className="py-2 pl-2 border border-solid  border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none', color: 'var(--color-icon-default)' }}
      >
        最近更新
      </p>
      {lastData.map((item: CategoryData) => {
        return (
          <div key={item._id}>
            <span
              className="inline-block mb-1 mt-2 px-2 mx-1 text-base cursor-pointer line-clamp-1 overflow-hidden hover:font-medium hover:transition hover:duration-500"
              onClick={() => handleLastUpdate(item._id)}
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(LastUpdate);
