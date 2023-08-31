import { CategoryData } from '@/types/comm';
import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import osun from '../../assets/images/osun.webp'
import avatar from '../../assets/images/avatar.webp'
interface DataType {
  checked: boolean;
  author: string;
  content: string;
  createTime: string;
  updateTime: string;
  _id: string;
}
interface ApothegmData {
  content: any;
  data: []
}
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
  // 时间问候
  const [welcome, setWelcome] = useState("")
  // 名言警句
  const [apoList, setApoList] = useState<DataType[]>([])
  // 索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 警句
  const [currentContent, setCurrentContent] = useState('');
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

  // 获取名言警句
  useEffect(() => {
    props.BlogActions.asyncApothegmListAction().then((res: ApothegmData) => {
      let { data } = res.data as unknown as ApothegmData;
      // 筛选已上线数据
      let filterData = data.filter((item: DataType) => item.checked === true)
      filterData.sort(() => Math.random() - 0.5)
      setApoList(filterData);
    });
  }, [props.BlogActions]);

  // 打字机效果
  useEffect(() => {
    if (apoList.length > 0) {
      const currentData = apoList[currentIndex];
      const content = currentData.content;
      let currentText = '';
      let index = 0;
      let isReversing = false; // 标记是否正在回退
      const interval = setInterval(() => {
        if (!isReversing) {
          currentText += content[index];
          setCurrentContent(currentText);
          index++;

          if (index >= content.length) {
            clearInterval(interval);
            // 在此处设置延迟，然后继续到下一条数据
            setTimeout(() => {
              isReversing = true; // 开始回退
              const reverseInterval = setInterval(() => {
                currentText = currentText.slice(0, -1);
                setCurrentContent(currentText);

                if (currentText.length === 0) {
                  clearInterval(reverseInterval);
                  isReversing = false; // 回退结束
                  if (currentIndex + 1 < apoList.length) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    // 如果已经到达最后一条数据，继续循环
                    setCurrentIndex(0);
                  }
                }
              }, 150); // 回退速度（毫秒）
            }, 5000); // 延迟时间（毫秒）
          }
        }
      }, 150); // 打字速度（毫秒）

      return () => clearInterval(interval);
    }
  }, [apoList, currentIndex]);

  // 跳转到文章页面
  const handleJumpArticles = () => {
    history.replace(`/timeline`)
  }
  // 分类
  const handleJumpCategories = () => {
    history.replace(`/category`)
  }
  // 详情
  const handleJumpTags = () => {
    history.replace(`/tags`)
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
          <span className=''>
            {currentContent}
          </span>
        </p>
      </div>
      <div
        className="flex justify-around w-64 h-20 pl-1 pt-2  rounded-xl overflow-clip"
      >
        <p className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer text-[var(--color-icon-default)] hover:bg-[var(--user-content-color)] hover:text-[var(--color-icon-default)] transform duration-300 ease-in" onClick={handleJumpArticles}>
          <span>文章</span>
          <span className="text-sm">{articleCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer text-[var(--color-icon-default)] hover:bg-[var(--user-content-color)] hover:text-[var(--color-icon-default)] transform duration-300 ease-in" onClick={handleJumpCategories}>
          <span>分类</span>
          <span className="text-sm">{categoriesCount}</span>
        </p>
        <p className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl cursor-pointer text-[var(--color-icon-default)] hover:bg-[var(--user-content-color)] hover:text-[var(--color-icon-default)] transform duration-300 ease-in" onClick={handleJumpTags}>
          <span>标签</span>
          <span className="text-sm">{tagsCount}</span>
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
export default connect(null, mapDispatchToProps)(withRouter(User));
