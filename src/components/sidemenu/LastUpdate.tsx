import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { colors } from '@/utils/enum';
import styled from 'styled-components';
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
      <p
        className="flex items-center py-2 pl-2 border border-solid  border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none', color: 'var(--color-icon-default)' }}
      >
        <svg className="icon w-7 h-7 pr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="63626"><path d="M168.021333 504.192A343.253333 343.253333 0 0 1 268.629333 268.8a342.229333 342.229333 0 0 1 243.285334-100.778667A341.504 341.504 0 0 1 755.029333 268.8c9.856 9.898667 19.2 20.394667 27.733334 31.402667l-60.16 46.976a8.021333 8.021333 0 0 0 2.986666 14.122666l175.701334 43.008a8.021333 8.021333 0 0 0 9.898666-7.68l0.810667-180.906666a7.936 7.936 0 0 0-12.885333-6.314667L842.666667 253.44a418.858667 418.858667 0 0 0-330.922667-161.493333c-229.12 0-415.488 183.594667-419.797333 411.818666a8.021333 8.021333 0 0 0 8.021333 8.192H160a7.978667 7.978667 0 0 0 8.021333-7.808zM923.946667 512H864a7.978667 7.978667 0 0 0-8.021333 7.808 341.632 341.632 0 0 1-26.88 125.994667 342.186667 342.186667 0 0 1-73.685334 109.397333 342.442667 342.442667 0 0 1-243.328 100.821333 342.229333 342.229333 0 0 1-270.976-132.224l60.16-46.976a8.021333 8.021333 0 0 0-2.986666-14.122666l-175.701334-43.008a8.021333 8.021333 0 0 0-9.898666 7.68l-0.682667 181.034666c0 6.698667 7.68 10.496 12.885333 6.314667L181.333333 770.56a419.072 419.072 0 0 0 330.922667 161.408c229.205333 0 415.488-183.722667 419.797333-411.818667a8.021333 8.021333 0 0 0-8.021333-8.192z" fill='var(--bgcolor-social-default)' p-id="63627"></path></svg>
        <span>最近更新</span>
      </p>
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
