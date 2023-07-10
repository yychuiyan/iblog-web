import React, { useEffect, useRef, useState } from 'react';
import Category from '@/components/sidemenu/Category';
import Social from '@/components/sidemenu/Social';
import User from '@/components/sidemenu/User';
import Content from '@/components/content/HomePage';
import ContentCT from '@/components/content';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import HotArticles from '@/components/sidemenu/HotArticles';
import { Affix, FloatButton } from 'antd';
import WebSite from '@/components/sidemenu/WebSite';
import useTypewriter from 'react-typewriter-hook';
import { ArticleList, DataType } from '@/types/comm'
import Affiche from '@/components/sidemenu/Affiche';
import qs from 'qs';
const Home = (props: any) => {
  // 文章列表
  const [list, setList] = useState<DataType[]>([]);
  // 诗词列表
  const [verse, setVerse] = useState<any>();
  // 滚动位置
  const myRef = React.useRef();
  const navRef = React.useRef();
  const { c } = qs.parse(props.location.search.slice(1));
  const { t } = qs.parse(props.location.search.slice(1));
  // 获取诗词
  useEffect(() => {
    props.BlogActions.asyncVerseAction().then((res: { content: string }) => {
      setVerse(res.content);
    });
  }, [props.BlogActions]);
// 打字机效果
  const name = useTypewriter(verse);
  // 获取文章列表数据
  useEffect(() => {
    props.BlogActions.asyncArticleAllListAction(1, 1).then((res: ArticleList) => {
      // 获取文章
      let { data } = res.data as unknown as ArticleList;
      setList(data);
    });
  }, [props.BlogActions]);
  // 默认顶部
  useEffect(() => {
    if (navRef.current) {
      window.scrollTo({
        //@ts-ignore
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [navRef.current]);
  // 点击滑动到数据页面
  const handleScroll = () => {
    if (myRef.current) {
      // window.scrollTo(0, myRef.current.offsetTop || 0);
      window.scrollTo({
        //@ts-ignore
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
  return (
    // @ts-ignore
    <div className="w-full" ref={navRef}>
      <div
        className="flex justify-center items-center flex-col h-screen relative bottom-10 lg:h-36"
        style={{ userSelect: 'none' }}
      >
        <p className="h-12 text-5xl lg:hidden">夜雨炊烟</p>
        {/* 古诗词 */}
        <p className="h-12  mt-3 text-3xl lg:mt-48 lg:text-lg lg:hidden">{name}</p>

        <p className='hidden lg:block lg:mt-48 lg:w-full'><Affiche /></p>
        {/* 动画图标显示 */}
        <div className="flex justify-center items-center w-full h-20 absolute bottom-0 lg:hidden">
          <div className="animate-bounce">
            <div
              className=" flex items-center justify-center h-14 w-14  rounded-full border-10 shadow-2xl cursor-pointer"
              onClick={handleScroll}
            >
              <p className="flex items-center justify-center h-14 w-14 opacity-40 bg-gray-50 rounded-full border-10 shadow-2xl cursor-pointer"></p>
              <svg
                // @ts-ignore
                t="1680518417234"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="16296"
                width="40"
                height="40"
                className="icon absolute"
              >
                <path
                  d="M128.759037 245.033739l383.064442 383.064442 388.096039-388.097062 0.033769 0.070608c13.138228-12.709463 31.024597-20.528546 50.730405-20.528546 40.377616 0 73.114205 32.736589 73.114205 73.115228 0 19.705807-7.820106 37.591153-20.530592 50.730405l0.035816 0.034792-438.681134 438.685227-0.035816-0.035816c-13.280468 13.780865-31.915897 22.3838-52.585659 22.3838-0.071631 0-0.107447 0-0.178055 0-0.072655 0-0.10847 0-0.146333 0-20.669762 0-39.341007-8.601912-52.621475-22.3838l-0.035816 0.035816L20.336676 343.425653l0.179079-0.179079c-12.565177-13.139252-20.313651-30.951943-20.313651-50.587142 0-40.378639 32.736589-73.115228 73.114205-73.115228C95.485213 219.544205 115.334283 229.432413 128.759037 245.033739z"
                  p-id="16297"
                  fill="#fff"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* @ts-ignore */}
      <div className="flex justify-between w-1200 mx-auto mt-10 lg:w-full sm:w-full" ref={myRef}>
        <article className="w-[calc(100%-320px)] lg:w-full sm:w-full">
          {
            Boolean(c) === false || Boolean(t) === false ? <Content /> : <ContentCT />
          }

        </article>
        <aside className="w-300 lg:hidden">
          <User data={list} />
          <Social />
          <Affiche />
          <Category data={list} />
          <Affix offsetTop={70}>
            <div>
              <HotArticles data={list} />
              <WebSite data={list} />
            </div>
          </Affix>
          <FloatButton.BackTop shape="square" />
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
export default connect(null, mapDispatchToProps)(Home);
