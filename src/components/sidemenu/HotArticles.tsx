import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@/utils/enum'
import IconFont from '../iconfont';
const HotArticles = (props: any) => {
  // 文章列表
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    let hotUpdateData = props.data.sort((curr: any, prev: any) => {
      return prev.views - curr.views;
    });
    let newHotdata = hotUpdateData.slice(0, 6);
    setList(newHotdata);
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
    <div className="mb-5 rounded-2xl bg-base-100 pb-2 mx-auto text-lg  transition duration-500 ease-in-out  transform hover:-translate-y-0 hover:scale-105" style={{ userSelect: "none" }}>
      <p
        className="flex items-center py-2  pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1 "
        style={{ userSelect: 'none' }}
      >
        <IconFont iconName='icon-qushi' className=' text-[28px] pr-1'></IconFont>
        <span>热门文章</span>
      </p>
      {list.map((item: CategoryData, index: number) => {
        return (
          <div key={item._id} className=''>
            <div className='flex items-center justify-between'>
              <p
                className="mt-2 pl-1  mx-1 text-base  cursor-pointer line-clamp-1 overflow-hidden hover:text-[#ff6347] hover:transition hover:duration-500"
                onClick={() => handleLastUpdate(item._id)}
              >
                <span>{item.title}</span>
              </p>
              <p className='flex items-start justify-center mt-2 pt-1 pr-2'>
                <IconFont iconName='icon-chakan' className='text-[18px] text-[var(--color-icon-default)] pr-1'></IconFont>
                <span>
                  {item.views}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(HotArticles);
