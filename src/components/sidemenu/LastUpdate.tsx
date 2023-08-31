import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { colors } from '@/utils/enum';
import styled from 'styled-components';
import IconFont from '../iconfont';
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
    props.history.push(`/article/detail/${id}`);
  };
  // 使用styled-components创建带有背景颜色的标签组件
  const RandomColorTag = styled.span`
    display:inline-block;
    line-height: 25px;
    width:14px;
    height:25px;
    text-align:center;
    border-radius: 8px;
    padding-left:5px;
    padding-right:5px;
    margin-right:5px;
    color:#fff;
    font-size:15px;
    background-color: ${props => props.color};`;
  return (
    <div className=" mb-5 rounded-2xl pb-2 bg-base-100 mx-auto text-xl transition duration-500 ease-in-out  transform hover:scale-x-[105%] hover:scale-y-[105%] lg:hidden" style={{ userSelect: "none" }}>
      <div
        className="flex items-center py-2 pl-2 border border-solid  border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none', color: 'var(--color-icon-default)' }}
      >
        <IconFont iconName='icon-gengxin' className='text-[29px] text-[var(--color-icon-default)] pr-1'></IconFont>
        <span className='pb-1'>最近更新</span>
      </div>
      {lastData.map((item: CategoryData, index: number) => {
        return (
          <div key={item._id} className=''>
            <div className='flex items-center justify-between hover:text-[#ff6347] hover:transition hover:duration-500'>
              <div
                className="mt-2 pl-1  mx-1 text-base  cursor-pointer line-clamp-1 overflow-hidden"
              onClick={() => handleLastUpdate(item._id)}
              >
                <RandomColorTag key={item.id} color={colors[index % colors.length]}>
                  <span>{index + 1}</span>
                </RandomColorTag>
                <span>{item.title}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(LastUpdate);
