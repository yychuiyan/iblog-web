import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { Carousel } from 'antd';
import LinesEllipsis from 'react-lines-ellipsis'
interface DataType {
  checked: boolean;
  content: string;
  createTime: string;
  updateTime: string;
  _id: string;
}
interface AfficheData {
  data: []
}
const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Affiche = (props: any) => {
  // 公告列表
  const [list, setList] = useState<DataType[]>([])

  useEffect(() => {
    props.BlogActions.asyncAfficheListAction().then((res: AfficheData) => {
      // 获取友链
      let { data } = res.data as unknown as AfficheData;
      // 筛选已上线数据
      let filterData = data.filter((item: DataType) => item.checked === true)
      setList(filterData);
    });
  }, [props.BlogActions]);
  return (
    <>
      <div className="bg-base-100 mb-5 h-auto mx-auto  pb-3 rounded-2xl transition duration-500 ease-in-out transform hover:scale-x-[105%] hover:scale-y-[108%] cursor-pointer">
      <p
          className="flex items-center py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
          <svg className="icon w-7 h-7 pr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14134"><path d="M588.7744 133.12c4.608 0 8.192 2.22208 9.18528 3.33824v751.08352c-0.99328 1.11616-4.57216 3.33824-9.18528 3.33824-3.7376 0-5.8368-1.49504-7.2448-2.79552l-235.60192-217.728-20.59776-19.03616H164.1984V372.67968h161.13152l20.59776-19.03616 235.60192-217.728c1.408-1.30048 3.5072-2.79552 7.2448-2.79552m0-71.68c-19.59424 0-39.57248 6.75328-55.89504 21.83168L297.27744 300.99968h-144.5376c-33.25952 0-60.22144 25.1904-60.22144 56.2688v309.46304c0 31.07328 26.96192 56.2688 60.22144 56.2688h144.5376l235.60192 217.728c16.31744 15.0784 36.30592 21.83168 55.89504 21.83168 41.2928 0 80.86528-29.9776 80.86528-75.17184V136.61184C669.6448 91.4176 630.0672 61.44 588.7744 61.44zM895.6416 537.6h-133.12a35.84 35.84 0 1 1 0-71.68h133.12a35.84 35.84 0 1 1 0 71.68zM906.28096 263.99744l-115.28704 66.56a35.84 35.84 0 1 1-35.84-62.07488l115.28704-66.56a35.84 35.84 0 1 1 35.84 62.07488zM870.44096 796.47744l-115.28704-66.56a35.84 35.84 0 1 1 35.84-62.07488l115.28704 66.56a35.84 35.84 0 1 1-35.84 62.07488z" fill="var(--bgcolor-social-default)" p-id="14135"></path></svg>
          叭叭两句
      </p>
        <Carousel autoplay autoplaySpeed={5000} dotPosition="left" dots={false} className='px-3 h-20'>
      {
            list.map((item: DataType) => (
              <p className='pt-[5px] h-20 text-base text-[var(--color-font-color)]  overflow-hidden'>
                <LinesEllipsis
                  text={item.content}
                  maxLine="3"
                />
              </p>
        )
        )
          }
        </Carousel>

      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Affiche);
