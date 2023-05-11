import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MarkDown from '@/components/markdown/MarkDown';
import '@/components/markdown/github-markdown-dark.css';
import PageDesc from '@/components/sidemenu/PageDesc';
const About = (props: any) => {
  // 选中状态
  const [isChecked, setIsChecked] = useState(false);
  // 关于信息
  const [list, setList] = useState([]);
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
  // 获取关于列表数据
  useEffect(() => {
    props.BlogActions.asyncAboutListAction(isChecked).then((res: any) => {
      // 获取关于
      let { data } = res.data;

      setList(data);
    });
  }, [props.BlogActions, isChecked]);
  const handleClickChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    // @ts-ignore
    <div className="w-1200 mx-auto pb-5 lg:w-[calc(100%-38px)] lg:mx-auto " ref={myRef}>
      <PageDesc title="关于" />
      <div className="w-1000 min-h-screen mx-auto my-10  bg-base-100 rounded-2xl lg:w-full">
        <div className="flex items-center w-full h-20">
          <p
            className={`text-2xl mx-3 ${isChecked ? 'text-gray-500' : ' bg-base-100'}`}
            style={{ userSelect: 'none' }}
          >
            关于本站
          </p>
          <div
            className="h-10 w-20 rounded-3xl bg-base-200 relative cursor-pointer "
            onClick={handleClickChecked}
          >
            <p
              className={`rounded-3xl h-10 w-10 absolute left-5  ${isChecked ? 'translate-x-1/2 transition-all ' : '-translate-x-1/2 transition-all'
                }`}
              style={{ backgroundColor: 'var(--color-icon-default)' }}
            ></p>
          </div>
          <p
            className={`text-2xl mx-3  ${isChecked ? 'bg-base-100' : 'text-gray-500'}`}
            style={{ userSelect: 'none' }}
          >
            关于我
          </p>
        </div>

        {/* 具体内容-关于本站 */}
        {isChecked
          ? list.map((item: any) => {
            return (
              <div className={`block ${isChecked ? 'block' : 'hidden'}`} key={item._id}>
                <div className="rounded-lg">
                  <div className="markdown-body content">
                    <MarkDown content={item.content} />
                    {/* <Comment title={list.map((item: any) => item.title)} /> */}
                  </div>
                </div>
              </div>
            );
          })
          : list.map((item: any) => {
            return (
              <div className={`block ${isChecked ? 'hidden' : 'block'}`} key={item._id}>
                <div>
                  <div className="markdown-body content">
                    <MarkDown content={item.content} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(About);
