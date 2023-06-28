import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { CategoryData } from '@/types/comm';
import styled from 'styled-components';
import { colors } from '@/utils/enum'
const Tags = (props: any) => {
  // 列表
  const [list, setList] = useState<any>([]);
  // 随机颜色
  const [randomColor, setRandomColor] = useState("")
  const { t } = qs.parse(props.location.search.slice(1));
  // 获取路由
  useEffect(() => {
    let tagsArticle = props.data;
    // 展开全部标签数据
    let newTags = tagsArticle.map((item: CategoryData) => item.tags);
    let newArr: any[] = [];
    for (let i = 0; i < newTags.length; i++) {
      newArr.push(...newTags[i]);
    }
    // 遍历去重
    let tagsArr = [];
    for (let i = 0; i < newArr.length; i++) {
      tagsArr.indexOf(newArr[i]) === -1 ? tagsArr.push(newArr[i]) : tagsArr;
    }
    // 转换为数组对象
    let i = 0;
    let tags = tagsArr.map((tag: CategoryData) => {
      return {
        name: tag,
        id: i++,
      };
    });
    console.log("list", list);

    setList(tags);
  }, [props.data]);

  const handleTags = (name: string) => {
    props.history.push(`/rblog/tags?t=${name}`);
  };
  // 使用styled-components创建带有背景颜色的标签组件
  const RandomColorTag = styled.span`
    display:inline-block;
    line-height: 30px;
    border-radius: 8px;
    padding-left:5px;
    padding-right:5px;
    color:#fff;
    font-size:15px;
    background-color: ${props => props.color};`

  return (
    <div
      className="overflow-y-auto overflow-x-hidden z-200 pb-3 mb-5 bg-base-100 rounded-2xl mx-auto text-lg  transition duration-500 ease-in-out  transform hover:translate-y-1 hover:scale-105
      lg:transition-none lg:hover:-translate-y-0 lg:hover:scale-100 lg:hover:ring-1 lg:mx-5
    "
    >

      <p
        className="flex py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        <svg className="icon w-7 h-7" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="101585"><path d="M110.933333 708.266667c-12.8 12.8-12.8 34.133333 0 46.933333 81.066667 93.866667 204.8 149.333333 337.066667 149.333333 132.266667 0 251.733333-55.466667 341.333333-157.866666 55.466667-64 85.333333-149.333333 85.333334-238.933334 0-89.6-29.866667-174.933333-81.066667-238.933333 0-4.266667-4.266667-4.266667-4.266667-8.533333-4.266667-4.266667-4.266667-12.8 0-17.066667l55.466667-59.733333c4.266667-4.266667 4.266667-12.8 0-17.066667l-17.066667-21.333333c-4.266667-4.266667-17.066667-4.266667-21.333333 0L746.666667 213.333333c-4.266667 4.266667-12.8 4.266667-21.333334 0-42.666667-29.866667-93.866667-42.666667-145.066666-42.666666-76.8 0-149.333333 34.133333-204.8 98.133333-55.466667 64-89.6 136.533333-128 209.066667-34.133333 76.8-72.533333 153.6-136.533334 230.4z m469.333334-499.2c42.666667 0 85.333333 12.8 119.466666 34.133333 8.533333 4.266667 8.533333 12.8 4.266667 17.066667L605.866667 384c-8.533333 12.8 8.533333 29.866667 21.333333 17.066667l106.666667-115.2c4.266667-4.266667 12.8-4.266667 17.066666 0l4.266667 4.266666c46.933333 55.466667 72.533333 132.266667 72.533333 209.066667 0 81.066667-25.6 153.6-72.533333 209.066667-81.066667 93.866667-192 145.066667-315.733333 145.066666-115.2 0-221.866667-46.933333-298.666667-123.733333-4.266667-4.266667-4.266667-12.8 0-17.066667 59.733333-76.8 98.133333-149.333333 136.533333-226.133333 38.4-59.733333 72.533333-128 123.733334-187.733333 46.933333-55.466667 110.933333-89.6 179.2-89.6z" fill="var(--bgcolor-social-default)" p-id="101586"></path></svg>
        全部标签
      </p>
      <div className='max-h-[24.5rem] w-[calc(100%+10px)] overflow-auto'>
        {list.map((item: CategoryData, index: number) => {
          return (
            <p
              className={`inline-block my-2 mx-1 text-lg rounded-lg  cursor-pointer
            ${item.name === t
                ? 'my-1  text-lg rounded-lg ring-1 ring-current cursor-pointer'
                : 'my-1  text-lg rounded-lg bg-base-100 hover:ring-1 hover:ring-current cursor-pointer'
                }`}
              key={item.id}
              onClick={() => handleTags(item.name)}
            >
              <RandomColorTag key={item.id} color={colors[index % colors.length]}>
                <span>{item.name}</span>
              </RandomColorTag>
              {/* <span className={`inline-block w-auto h-7 rounded px-1 bg-green-600`}>{item.name}</span> */}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(Tags);
