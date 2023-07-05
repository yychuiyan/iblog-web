import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import osun from '../../assets/images/osun.webp'
import avatar from '../../assets/images/avatar.webp'
// 跳转到分类页
const User = (props: any) => {
  // 文章数量
  const [articleCount, setArticleCount] = useState<any>();
  // 分类数量
  const [categoriesCount, setCategoriesCount] = useState<any>();
  // 标签数量
  const [tagsCount, setTagsCount] = useState<any>();
  // 头像显示隐藏
  const [avatarShow, setAvatarShow] = useState(false)
  // 路由跳转
  const history = useHistory()
  // 文章数量
  useEffect(() => {
    let articleCount = props.data.length;
    setArticleCount(articleCount);
  }, [props]);
  // 分类数量
  useEffect(() => {
    let articleList = props.data;
    let newList = articleList.map((item: CategoryData) => {
      return {
        categories: item.categories,
        _id: item._id,
      };
    });
    // 分类的数量汇总
    let obj = {};
    for (let i = 0; i < newList.length; i++) {
      let item = newList[i].categories;
      obj[item] = obj[item] + 1 || 1;
    }

    // 将对象封装成数组对象格式
    let newArticles = [];
    let key = Object.keys(obj); // 取出当前对象的索引
    let values = Object.values(obj); // 取出当前对象的值
    let i = 1;
    let arrObj = key.map((item, index) => {
      return {
        count: values[index], // values是一个数组，加index是为了拿到跟索引同个位置的值
        name: item,
        id: i++,
      };
    });
    newArticles = arrObj;
    let categoriesCount = newArticles.length;
    setCategoriesCount(categoriesCount);
  }, [props.data]);
  // 标签数量
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
    let tagsCount = tags.length;
    setTagsCount(tagsCount);
  }, [props.data]);
  // 跳转到文章页面
  const handleJumpArticles = () => {
    history.replace(`/rblog/timeline`)
  }
  // 分类
  const handleJumpCategories = () => {
    history.replace(`/rblog/category`)
  }
  // 详情
  const handleJumpTags = () => {
    history.replace(`/rblog/tags`)
  }
  // 鼠标移动事件
  const handleMouseEnter = () => {
    setAvatarShow(!avatarShow)
  }
  const handleMouseLeave = () => {
    setAvatarShow(avatarShow)
  }
  return (
    <div className="flex flex-col bg-base-100 rounded-2xl items-center mb-5 rounded-3xltransition duration-500 ease-in-out  transform  hover:scale-105 lg:hidden" style={{ userSelect: "none" }}>
      <div className="flex flex-col items-center justify-center">
        {
          <img
            src={`${avatarShow ? osun : avatar}`}
            alt=""
            className={`image-container w-24 h-24 mt-3 rounded-full ${avatarShow ? 'rotate' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        }
        <p
          className="flex items-center justify-center w-64 h-5   pl-2 mt-3 overflow-clip"
        >
          <span>三餐烟火暖，四季皆安然。</span>

        </p>
      </div>
      <div
        className="flex justify-around w-64 h-20 pl-1 pt-2  rounded-xl overflow-clip"
      >
        <p className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer hover:bg-[var(--user-content-color)] hover:text-[var(--user-content-font)] transform duration-300 ease-in" onClick={handleJumpArticles}>
          <span>文章</span>
          <span className="text-sm">{articleCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer hover:bg-[var(--user-content-color)] hover:text-[var(--user-content-font)] transform duration-300 ease-in" onClick={handleJumpCategories}>
          <span>分类</span>
          <span className="text-sm">{categoriesCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer hover:bg-[var(--user-content-color)] hover:text-[var(--user-content-font)] transform duration-300 ease-in" onClick={handleJumpTags}>
          <span>标签</span>
          <span className="text-sm">{tagsCount}</span>
        </p>
      </div>
    </div>
  );
};

export default withRouter(User);
