import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@/utils/enum'
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
    props.history.push(`/rblog/article/detail/${id}`);
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
        <svg className="icon w-7 h-7 pr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="56377"><path d="M124.928 660.48h104.96v238.08h-104.96zM347.136 535.552h104.96v363.52h-104.96zM548.864 644.608h104.96v254.464h-104.96zM766.976 422.4h104.96v476.672h-104.96z" fill='var(--bgcolor-social-default)' p-id="56378"></path><path d="M666.112 124.928l110.592 118.784L535.04 473.6 351.744 307.2v-0.512l-0.512-0.512-1.536 2.048L61.44 536.576l32.768 41.472 254.976-202.752 186.368 169.472 1.024-1.024 0.512 0.512 275.456-262.144 100.864 108.544 12.8-260.096z" fill='var(--bgcolor-social-default)' p-id="56379"></path></svg>
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
                <svg className="icon w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13108" width="20" height="20"><path d="M511.837 704c-184.451 0-288.003-191.997-288.003-191.997S329.357 320 511.837 320c182.474 0 287.997 192.003 287.997 192.003S696.285 704 511.837 704zM511.833 384c-131.99 0-208.32 128.003-208.32 128.003S378.416 640 511.833 640s208.32-127.997 208.32-127.997S643.824 384 511.833 384zM511.833 576c-35.347 0-64-28.656-64-64.003 0-35.344 28.653-64 64-64s64 28.656 64 64C575.833 547.344 547.181 576 511.833 576z" fill='var(--bgcolor-social-default)' p-id="13109"></path></svg>
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
