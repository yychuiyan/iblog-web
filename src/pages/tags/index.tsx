import React, { useState, useEffect } from 'react';
import Content from '@/components/content';
import TagsDetail from '@/components/sidemenu/Tags';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { withRouter } from 'react-router-dom';
import { Affix, FloatButton } from 'antd';
import User from '@/components/sidemenu/User';
import PageDesc from '@/components/sidemenu/PageDesc';
import { ArticleList, DataType } from '@/types/comm'
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
const Tags = (props: any) => {
  // 文章列表
  const [list, setList] = useState<DataType[]>([]);
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
    props.BlogActions.asyncArticleAllListAction(1, 1).then((res: ArticleList) => {
      // 获取文章
      let { data } = res.data as unknown as ArticleList;
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
      <Helmet>
        <title>标签 | 夜雨炊烟</title>
      </Helmet>
      <div className="mb-10">
        <PageDesc title="标签" />
      </div>
      <div className="flex flex-row justify-between w-full lg:mx-auto lg:justify-start lg:flex-col lg:w-full sm:w-full">
        <article className="w-[calc(100%-320px)] lg:w-full lg:order-2 sm:w-full">
          <Content />
        </article>
        <aside className="w-300 lg:order-1 lg:w-full hidden lg:block sm:w-full">
          <User data={list} />
          <TagsDetail data={list} />
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
        <aside className="w-300 lg:hidden">
          <User data={list} />
          <Affix offsetTop={70}>
            <TagsDetail data={list} />
          </Affix>
          <FloatButton.BackTop shape="square" icon={<VerticalAlignTopOutlined />} />
        </aside>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(Tags));
