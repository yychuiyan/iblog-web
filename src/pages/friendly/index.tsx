import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import PageDesc from '@/components/sidemenu/PageDesc';
interface DataType {
  avatar: string;
  createTime: string;
  desc: string;
  link: string;
  name: string;
  updateTime: string;
  _id: string;
}
interface FriendlyData{
  data:[]
}
const Friendly = (props: any) => {
  // 友链列表
  const [list, setList] = useState<DataType[]>([]);
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
  // 获取友链列表数据
  useEffect(() => {
    props.BlogActions.asyncFriendlyListAction().then((res: FriendlyData) => {
      // 获取友链
      let { data } = res.data as unknown as FriendlyData;
      let shuffle = data.sort(() => Math.random() - 0.5);
      setList(shuffle);
    });
  }, [props.BlogActions]);
  // 跳转页面
  const handleJump = (link:string) => {
    window.open(link);
  };
  return (
    // @ts-ignore
    <div className="w-1200  mx-auto pb-5 lg:w-full lg:mx-5" ref={myRef} style={{ userSelect: "none" }}>
      <PageDesc title="友链" />
      <div className="w-1000 min-h-screen bg-base-100 mt-10 mx-auto my-10  rounded-2xl lg:h-[calc(100%-160px)]  lg:w-full sm:w-full">
        {list.map((item) => {
          return (
            <div
              className="flex float-left w-280 h-20 p-2 ml-6 mt-6 bg-base-200 rounded-2xl hover:ring-2 hover:transition hover:duration-500 cursor-pointer"
              key={item._id}
              onClick={() => handleJump(item.link)}
            >
              {/* 头像 */}
              <div>
                <img src={item.avatar} alt="" className="w-20 h-20 rounded-xl" />
              </div>
              <div className="ml-2 w-48">
                <p className="flex justify-start text-xl">{item.name}</p>
                <div className="flex items-center h-12">
                  <p className="line-clamp-2 overflow-hidden">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Friendly);
