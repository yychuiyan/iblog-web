import React, { useState, useEffect } from 'react';
import Content from '@/components/content';
import CategorySwitch from '@/components/sidemenu/CategorySwitch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { withRouter } from 'react-router-dom';
import { Affix, FloatButton } from 'antd';
import User from '@/components/sidemenu/User';
import PageDesc from '@/components/sidemenu/PageDesc';
const Category = (props: any) => {
  // 文章列表
  const [list, setList] = useState([]);
  // 页面可视化宽度
  const [clientWidth, setClientWidth] = useState(970);
  // 滚动位置
  const myRef = React.useRef();
  useEffect(() => {
    if (myRef.current) {
      // window.scrollTo(0, myRef.current.offsetTop || 0);
      window.scroll({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  // 获取文章列表数据
  useEffect(() => {
    props.BlogActions.asyncArticleAllListAction(1, 1).then((res: any) => {
      // 获取文章
      let { data } = res.data;
      setList(data);
    });
  }, [props.BlogActions]);
  // 页面可视化宽度
  useEffect(() => {
    window.addEventListener('resize', setPageHeight);
  }, [window.addEventListener]);

  // 页面可视化宽度
  let setPageHeight = () => {
    setClientWidth(document.body.clientWidth);
  };
  return (
    // @ts-ignore
    <div className="w-1200 mx-auto lg:w-full" ref={myRef}>
      <div className="mb-10">
        <PageDesc title="分类" />
      </div>
      <div className="flex flex-row justify-between lg:flex-col lg:justify-start lg:w-full sm:w-full">
        <article className="w-[calc(100%-320px)] lg:w-full lg:order-2 sm:w-full">
          <Content />
        </article>
        <aside className="w-300 hidden lg:w-full lg:block lg:order-1 sm:w-full">
          <User data={list} />
          <CategorySwitch data={list} />
          <FloatButton.BackTop shape="square" />
        </aside>
        <aside className="w-300 lg:w-full lg:hidden sm:w-full">
          <User data={list} />
          <Affix offsetTop={70}>
            <CategorySwitch data={list} />
          </Affix>
          <FloatButton.BackTop shape="square" />
        </aside>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(Category));
