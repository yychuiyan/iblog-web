import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import { Carousel } from 'antd';
import LinesEllipsis from 'react-lines-ellipsis'
import IconFont from '../iconfont';
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
interface WeatherDataType {
  key: string;
  location: string;
  language: string;
  unit: string;
}
interface WeatherData {
  data: [];
  results: []
}

const Affiche = (props: any) => {
  // 公告列表
  const [list, setList] = useState<DataType[]>([])
  // 天气
  const [weather, setWeather] = useState<any>({})
  useEffect(() => {
    props.BlogActions.asyncAfficheListAction().then((res: AfficheData) => {
      // 获取公告
      let { data } = res.data as unknown as AfficheData;
      // 筛选已上线数据
      let filterData = data.filter((item: DataType) => item.checked === true)
      setList(filterData);
    });
  }, [props.BlogActions]);
  useEffect(() => {
    props.BlogActions.asyncWeatherAction("S9-DW0MuEOY_vZLcz", "shanghai", "zh-Hans", "c").then((res: any) => {
      // 获取天气
      let weatherData = res.results
      setWeather(weatherData[0])
    });
  }, [props.BlogActions]);
  return (
    <div>
      {/* PC */}
      <div className="block lg:hidden bg-base-100 mb-5 h-auto mx-auto  pb-3 rounded-2xl transition duration-500 ease-in-out transform hover:scale-x-[105%] hover:scale-y-[108%] cursor-pointer " style={{ userSelect: "none" }}>
        <div
          className="flex items-center justify-between py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1 lg:hidden"
        >
          <div className='flex items-center'>
            <IconFont iconName='icon-gonggao' className=' text-[28px] pr-1'></IconFont>
            <span>叭叭两句</span>
          </div>
          <div className='flex mr-[10%]'>
            <IconFont iconName='icon-weizhi-xianxing' className='text-[20px] ml-5'></IconFont>
            <div>&nbsp;{weather.location?.name} {weather.now?.text} {weather.now?.temperature}°C</div>
          </div>
        </div>
        <Carousel autoplay autoplaySpeed={5000} dotPosition="left" dots={false} className='px-3 h-20 lg:h-10'>
          {
            list.map((item: DataType, index: number) => (
              <div className='pt-[5px] h-20 text-base text-[var(--color-font-color)]  overflow-hidden' key={index}>
                <LinesEllipsis
                  text={item.content}
                  maxLine="3"
                />
              </div>
            )
            )
          }
        </Carousel>

      </div>
      {/* 移动端 */}
      <div className="hidden lg:block lg:relative top-2 lg:h-24 lg:mx-auto   lg:rounded-xl lg:bg-base-100 lg:w-[calc(100%-30px)] sm:w-[calc(100%-45px)]">
        <svg className="icon w-8 h-8 absolute -left-4 -top-4 transform rotate-45" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34085"><path d="M163.84 496.14h558.74V900.3L333.72 638.5l-169.88 1.55V496.14z" fill="#FDD668" p-id="34086"></path><path d="M906.53 503.22c0-90.22-71-163.52-159.94-168.67V64L277.36 342.58l-137.52-27.77v376.82l137.52-27.77 469.23 278.6V671.89c88.97-5.15 159.94-78.45 159.94-168.67zM187.84 373.47l69.82 14.11v231.28L187.84 633z m510.75 484.67L305.66 624.85V381.6l392.93-233.3z m48-234.25V382.55c62.49 5.05 111.94 56.92 111.94 120.67s-49.45 115.63-111.94 120.67z" fill='var(--bgcolor-social-default)' p-id="34087"></path></svg>
        <Carousel autoplay autoplaySpeed={5000} dotPosition="left" dots={false} className='lg:px-3'>
          {
            list.map((item: DataType, index: number) => (
              <div className='lg:pt-[5px] lg:h-20  lg:text-base lg:text-[var(--color-font-color)] lg:overflow-y-hidden' key={index}>
                <LinesEllipsis
                  text={item.content}
                  maxLine="3"
                />
              </div>
            )
            )
          }
        </Carousel>
      </div >
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Affiche);
