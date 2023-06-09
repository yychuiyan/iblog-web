import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const LastUpdate = (props: any) => {
  const [lastData, setLastData] = useState([]);
  useEffect(() => {
    let lastUpdateData = props.data.sort((curr: any, prev: any) => {
      return prev.createTime - curr.createTime;
    });
    let newLastUpdate = lastUpdateData.slice(0, 6);
    setLastData(newLastUpdate);
  }, [props.data]);
  const handleLastUpdate = (id: string) => {
    props.history.push(`/rblog/article/detail/${id}`);
  };
  return (
    <div className=" mb-5 rounded-2xl pb-2 bg-base-100 mx-auto text-xl transition duration-500 ease-in-out  transform hover:scale-x-[105%] hover:scale-y-[105%] lg:hidden">
      <p
        className="flex items-center py-2 pl-2 border border-solid  border-t-0 border-l-0 border-r-0 border-b-1"
        style={{ userSelect: 'none', color: 'var(--color-icon-default)' }}
      >
        <span>最近更新</span>
      </p>
      {lastData.map((item: CategoryData) => {
        return (
          <div key={item._id}>
            <span
              className="inline-block mb-1 mt-2 px-2 mx-1 text-base cursor-pointer line-clamp-1 overflow-hidden  hover:text-[#ff6347] hover:transition hover:duration-500"
              onClick={() => handleLastUpdate(item._id)}
            >
              {/* <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6287" width="25" height="25"><path d="M503.552 385.28a23.04 23.04 0 0 1 22.8352 20.1472l0.1792 2.8672V692.736a23.04 23.04 0 0 1-45.9008 2.8928l-0.1792-2.8928V408.32a23.04 23.04 0 0 1 23.04-23.04z" fill="#FF6D00" p-id="6288"></path><path d="M341.76 568.96a23.04 23.04 0 0 1 29.952-4.5568l2.5344 1.8688 124.6464 105.6a5.5296 5.5296 0 0 0 3.712 1.3824 5.888 5.888 0 0 0 2.56-0.6144l1.1264-0.6912 126.6688-105.6768a23.04 23.04 0 0 1 31.7696 33.2032l-2.2528 2.176-126.7456 105.728a51.968 51.968 0 0 1-62.976 2.4576l-3.6864-2.816-124.6208-105.5744a23.04 23.04 0 0 1-2.688-32.4864z" fill="#FF6D00" p-id="6289"></path><path d="M503.5264 149.76a297.728 297.728 0 0 1 285.6448 214.6304l1.9712 7.168 2.5856 0.5888a250.2912 250.2912 0 0 1 116.9408 65.408l6.4 6.5536a250.0864 250.0864 0 0 1 68.2496 172.0576 249.984 249.984 0 0 1-73.6512 177.8176 250.2912 250.2912 0 0 1-169.472 73.4208l-8.3968 0.128h-107.4176a23.04 23.04 0 0 1-2.8672-45.8752l2.8672-0.2048h107.4432a204.288 204.288 0 0 0 145.28-60.0832 203.8784 203.8784 0 0 0 60.1088-145.2032 204.032 204.032 0 0 0-55.68-140.4672 204.2368 204.2368 0 0 0-115.2256-61.7728 23.04 23.04 0 0 1-18.7648-18.0224 251.5968 251.5968 0 0 0-246.016-200.0384 251.5968 251.5968 0 0 0-246.016 200.0384 23.04 23.04 0 0 1-18.7648 18.0224 204.3136 204.3136 0 0 0-115.2256 61.7984 204.0064 204.0064 0 0 0-55.7056 140.4672c0 54.8608 21.3504 106.3424 60.1344 145.152a203.776 203.776 0 0 0 136.96 59.9552l8.2176 0.1536h107.52a23.04 23.04 0 0 1 2.8928 45.9008l-2.8672 0.2048h-107.52a250.0096 250.0096 0 0 1-177.792-73.6A250.0608 250.0608 0 0 1 21.7344 616.192c0-64.256 24.2688-125.3888 68.224-172.0832a250.624 250.624 0 0 1 123.392-71.9872l2.5344-0.5632 1.9968-7.168a297.728 297.728 0 0 1 277.9648-214.528l7.68-0.1024z" fill="#666666" p-id="6290"></path></svg> */}
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(LastUpdate);
