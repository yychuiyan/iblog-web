import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const Home = lazy(() => import('@/pages/home'));
const Category = lazy(() => import('@/pages/category'));
const Tags = lazy(() => import('@/pages/tags'));
const TimeLine = lazy(() => import('@/pages/timeline'));
const About = lazy(() => import('@/pages/about'));
const Message = lazy(() => import('@/pages/message'));
const Friendly = lazy(() => import('@/pages/friendly'));
const Essay = lazy(() => import('@/pages/essay'));
const ArticleDetail = lazy(() => import('@/components/content/ArticleDetail'));
import NavBar from '@/components/header';
import NotFound from '../404';
import Footer from '@/components/footer';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import classnames from 'classnames';
import s from './index.module.css';
const LayoutIndex = (props: any) => {
  NProgress.start();
  NProgress.done();
  const [clasess, setClasses] = useState<any>([])
  useEffect(() => {
    const bgClasses = [s.bg0, s.bg1];
    setClasses(bgClasses)
  }, [setClasses])
  // 在组件渲染完成后添加滚动事件监听
  useEffect(() => {
    const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const backgroundElements = document.querySelectorAll('.img_style');

    // 调整背景图像的位置，根据需要进行调整
    backgroundElements.forEach(element => {
      // @ts-ignore
      element.style.backgroundPositionY = `${-scrollTop}px`;
    });
  };

    window.addEventListener('scroll', handleScroll);

  // 清除滚动事件监听
    return () => {
    window.removeEventListener('scroll', handleScroll);
  };
  }, []);

  return (
    <div className={classnames(s.img_style, clasess[props.mode])}>
      <NavBar></NavBar>
      <main className="flex justify-betwee  w-full min-h-screen mx-auto lg:w-full">
        <Suspense fallback={<></>}>
          <Switch>
            <Route path="/rblog/home" component={Home}></Route>
            <Route path="/" render={() => <Redirect to="/rblog/home"></Redirect>} exact></Route>
            <Route path="/rblog/article/detail/:id" component={ArticleDetail}></Route>
            <Route path="/rblog/category" component={Category}></Route>
            <Route path="/rblog/tags" component={Tags}></Route>
            <Route path="/rblog/timeline" component={TimeLine}></Route>
            <Route path="/rblog/essay" component={Essay}></Route>
            <Route path="/rblog/message" component={Message}></Route>
            <Route path="/rblog/friendly" component={Friendly}></Route>
            <Route path="/rblog/about" component={About}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Suspense>
      </main>
      <Footer></Footer>
    </div>
  );
};

// 将状态映射为属性
const mapStateToProps = (state: any) => {
  return {
    mode: state.ModeReducer.mode,
  };
};
// 输出
const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
