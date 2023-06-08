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
        className="py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
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
