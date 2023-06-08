import { CategoryData } from '@/types/comm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const HotArticles = (props: any) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    let hotUpdateData = props.data.sort((curr: any, prev: any) => {
      return prev.views - curr.views;
    });
    let newHotdata = hotUpdateData.slice(0, 6);
    setList(newHotdata);
  }, [props.data]);

  const handleLastUpdate = (id: string) => {
    props.history.push(`/rblog/article/detail/${id}`);
  };
  return (
    <div className="mb-5 rounded-2xl bg-base-100 pb-2 mx-auto text-lg  transition duration-500 ease-in-out  transform hover:-translate-y-0 hover:scale-105">
      <p
        className="flex items-center py-2 pl-2 border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 border-b-1 "
        style={{ userSelect: 'none' }}
      >
        {/* <span>
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28974" width="25" height="25"><path d="M418.048 950.08c-48.704-28.864-83.584-79.616-85.568-139.328C329.6 699.2 407.104 644.48 452.992 569.728c65.664-107.52 47.744-174.208 47.744-174.208S555.52 426.368 587.392 540.864c9.92 33.856 11.968 67.776 8.96 99.648-4.928 80.64-39.808 153.28-39.808 153.28s60.736-12.928 77.632-123.456c27.968 28.864 53.824 70.656 56.768 114.496 4.992 75.712-39.744 145.344-107.52 175.168 117.312-26.88 201.152-126.4 230.016-199.104 36.8-91.52 26.88-173.184 20.864-243.904-7.936-96.512 25.856-168.256 25.856-168.256s-64.704 18.944-112.512 97.536C725.76 482.176 716.8 534.848 716.8 534.848s4.992-46.72-25.92-132.352c-30.784-83.648-58.752-113.472-75.712-175.168C593.344 144.64 642.048 64 642.048 64S449.024 99.904 361.344 268.096C283.712 417.408 315.584 507.072 315.584 507.072S282.688 476.16 265.792 433.344 252.672 351.744 252.672 351.744 115.456 503.04 182.208 693.248C227.008 826.624 313.536 914.24 418.048 950.08z" p-id="28975" fill="#fb6c28"></path></svg>
        </span> */}
        <span>热门文章</span>
      </p>
      {list.map((item: CategoryData) => {
        return (
          <div key={item._id}>
            <span
              className="inline-block mb-1 mt-2 px-2 mx-1 text-base  cursor-pointer line-clamp-1 overflow-hidden hover:font-medium hover:transition hover:duration-500"
              onClick={() => handleLastUpdate(item._id)}
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(HotArticles);
