import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import TextLoop from 'react-text-loop'
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
const Affiche = (props: any) => {
  // 公告列表
  const [list, setList] = useState<DataType[]>([])
  useEffect(() => {
    props.BlogActions.asyncAfficheListAction().then((res: AfficheData) => {
      // 获取友链
      let { data } = res.data as unknown as AfficheData;
      // 筛选已上线数据
      let filterData = data.filter((item: DataType) => item.checked === true)
      console.log("data12", filterData);
      setList(filterData);
    });
  }, [props.BlogActions]);
  return (
    <div className="bg-base-100 mb-5 h-auto mx-auto px-5 pb-3 rounded-2xl transition duration-500 ease-in-out transform hover:scale-x-[105%] hover:scale-y-[110%] cursor-pointer">
      <p
        className="flex items-center py-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none' }}
      >
        <svg className="icon w-7 h-7 pr-1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1626"><path d="M946.176 513.024c0-159.232-121.856-290.816-276.992-306.176V84.48c0-11.264-6.144-22.016-16.384-27.136s-22.528-4.608-31.744 2.048l-358.4 250.368H111.104c-16.896 0-30.72 13.824-30.72 30.72V686.08c0 16.896 13.824 30.72 30.72 30.72h151.552l358.4 250.368c5.12 3.584 11.264 5.632 17.408 5.632 4.608 0 9.728-1.024 14.336-3.584 10.24-5.12 16.384-15.872 16.384-27.136v-122.368c155.136-15.872 276.992-146.944 276.992-306.688z m-276.992-100.864c43.008 13.312 74.752 53.248 74.752 100.864 0 47.616-31.744 87.552-74.752 100.864V412.16z m-527.36-40.96h99.84V655.36H141.824V371.2z m465.92 512l-304.64-212.992V356.352L607.744 143.36v739.84z m61.44-125.44v-80.384c77.312-14.336 136.192-82.432 136.192-163.84s-58.88-149.504-136.192-163.84V268.8c121.344 15.36 215.552 118.784 215.552 244.224 0 125.44-94.208 229.376-215.552 244.736z" fill='var(--bgcolor-social-default)' p-id="1627"></path></svg>
        公告
      </p>
      {
        list.map((item: DataType) => (
          <p className='px-1 pt-2 h-16 overflow-hidden'>{item.content}</p>
        )
        )
      }
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Affiche);
