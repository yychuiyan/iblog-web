import { lazy, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const Home = lazy(() => import('@/pages/home'));
const Category = lazy(() => import('@/pages/category'));
const Tags = lazy(() => import('@/pages/tags'));
const TimeLine = lazy(() => import('@/pages/timeline'));
const About = lazy(() => import('@/pages/about'));
const Message = lazy(() => import('@/pages/message'));
const Friendly = lazy(() => import('@/pages/friendly'));
const Essay = lazy(() => import('@/pages/essay'));
const Reader = lazy(() => import('@/pages/reader'));
const FE_Project = lazy(() => import('@/pages/navigation/fe-project'));
const FE_Tools = lazy(() => import('@/pages/navigation/fe-tools'));
const FE_Website = lazy(() => import('@/pages/navigation/fe-website'));
const ArticleDetail = lazy(() => import('@/components/content/ArticleDetail'));
import NavBar from '@/components/header';
import NotFound from '@/pages/404';
import Footer from '@/components/footer';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import './index.css'
const LayoutIndex = (props: any) => {
  NProgress.start();
  NProgress.done();
  return (
    <div className='parent'>
      <div className={`${Boolean(props.mode) ? 'bg1' : 'bg0'}`}>
      <NavBar></NavBar>
        <main className="flex justify-between  w-full min-h-screen mx-auto lg:w-full" >
          <Suspense fallback={<></>}>
          <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/" render={() => <Redirect to="/home"></Redirect>} exact></Route>
              <Route path="/article/detail/:id" component={ArticleDetail}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/tags" component={Tags}></Route>
              <Route path="/timeline" component={TimeLine}></Route>
              <Route path="/reader" component={Reader}></Route>
              <Route path="/essay" component={Essay}></Route>
              <Route path="/message" component={Message}></Route>
              <Route path="/links" component={Friendly}></Route>
              <Route path="/project" component={FE_Project}></Route>
              <Route path="/tools" component={FE_Tools}></Route>
              <Route path="/website" component={FE_Website}></Route>
              <Route path="/about" component={About}></Route>
              <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </main>
      <Footer></Footer>
    </div>
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
