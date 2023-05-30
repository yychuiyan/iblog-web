import { ConfigProvider, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
const MyPagination = (props: any) => {
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(0);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(0);
  // 组件类型
  const [text, setText] = useState();
  useEffect(() => {
    setText(props.text);
    setTotal(props.total);
    setCurrentPage(props.currentPage);
    setPageSize(props.pageSize);
  }, [props]);

  const onChangePage = (page: number, pageSize: number) => {
    // 将切换的页码参数传递过去
    props.onChange(page, pageSize);
  };
  return (
    <div>
      {/* 中文语言包 */}
      <ConfigProvider locale={zhCN}>
        {/* 为true显示评论留言 false首页 */}
        {text === 'cm' ? (
          <Pagination
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'end',
              fontSize: '20px',
            }}
            className=""
            current={currentPage} // 当前页
            pageSize={pageSize} // 每页条数
            total={total} // 数据总数
            pageSizeOptions={[10, 20, 50, 100]} // 每页显示多少条
            onChange={onChangePage} // 监听pageSize回调
            // showSizeChanger // 展示 pageSize 切换器
            // showQuickJumper // 快速跳转至某页
            // showTotal={total => `共 ${total} 条`} // 展示页码
          />
        ) : (
          <Pagination
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
            }}
            current={currentPage} // 当前页
            pageSize={pageSize} // 每页条数
            total={total} // 数据总数
            pageSizeOptions={[10, 20, 50, 100]} // 每页显示多少条
            onChange={onChangePage} // 监听pageSize回调
            // showSizeChanger // 展示 pageSize 切换器
            // showQuickJumper // 快速跳转至某页
            // showTotal={total => `共 ${total} 篇文章`} // 展示页码
          />
        )}
      </ConfigProvider>
    </div>
  );
};
export default MyPagination;
