import React, { useEffect, useRef, useState } from 'react';
import { Card, Form, Input, Button, message, List, Avatar, Row, Col, Modal, Tooltip } from 'antd';
import { Comment } from '@ant-design/compatible';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { CloudUploadOutlined, CommentOutlined, MessageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { withRouter } from 'react-router-dom';
import PageDesc from '@/components/sidemenu/PageDesc';
interface DataType {
  _id: string;
  nickname: any;
  content: any;
  children: any;
  messageTime: any;
  pid: string;
  targetReplayId: string;
  targetReplayContent: string;
  currentReplayContent: string;
  auditTime: string;
  auditStatus: string;
  avatar: string;
  email: string;
  nickName: string;
}
interface MessageData {
  data: DataType[];
  totalCount: number;
  page: number;
  pageSize: number;
}
const Message = (props: any) => {
  // 留言列表数据
  const [messageList, setMessageList] = useState<DataType[]>([]);

  // 回复的文本对象信息
  const [replyObj, setReplyObj] = useState({ _id: '', pid: '-1' });
  // 分页总数
  const [total, setTotal] = useState(0);
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 每页显示条数
  const [pageSize, setPageSize] = useState(10);
  // 是留言还是回复（1是留言，2是回复）
  const [type, setType] = useState(1);
  // 功能名称
  const [text, setText] = useState('cm');
  // 回复框显示隐藏
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyForm] = Form.useForm();
  const [form] = Form.useForm();
  // 页面效果
  const replyArea = useRef(null);
  dayjs.extend(relativeTime);
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
  useEffect(() => {
    props.BlogActions.asyncMessageListAction(currentPage, pageSize, 1).then((res: MessageData) => {
      // 获取留言数据
      let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
      // 时间格式化
      data.map((item) => {
        item.messageTime = dayjs(item.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
        item.children.map((it: any) => {
          it.messageTime = dayjs(it.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
        });
      });
      setMessageList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  }, [currentPage, pageSize, props.BlogActions]);
  // 提交留言数据
  const onFinish = (values: DataType) => {
    props.BlogActions.asyncMessageInsertAction({
      pid: replyObj.pid,
      targetReplayId: replyObj._id || '-1',
      targetReplayContent: '',
      currentReplayContent: values.content,
      auditTime: 0,
      auditStatus: '1',
      avatar: 'http://dummyimage.com/100x100',
      email: values.email,
      nickName: values.nickname,
    }).then(() => {
      setTimeout(() => {
        message.success('留言成功~');
        if (type === 1) {
          form.resetFields();
        }
        if (type === 2) {
          setReplyObj({ _id: '', pid: '-1' });
          replyForm.resetFields();
        }
        // 重新调用查询接口
        props.BlogActions.asyncMessageListAction(currentPage, pageSize, 1).then((res: MessageData) => {
          // 获取留言数据
          let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
          // 时间格式化
          data.map((item) => {
            item.messageTime = dayjs(item.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
            item.children.map((it: any) => {
              it.messageTime = dayjs(it.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
            });
          });
          setMessageList(data);
          setTotal(totalCount);
          setCurrentPage(page);
          setPageSize(pageSize);
        });
        // 邮件提醒 默认接收邮箱
        let email = "haoju.zhang@outlook.com"
        let title = `您的博客收到来自${values.nickname}<${values.email}>的留言`
        let content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上收到新的留言</p><hr /><span style="color: cadetblue;">${values.nickname}:</span><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/rblog/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
        let newContent = content.split('\n').join('\n<br/>\n')
        props.BlogActions.asyncSendMailAction({
          email,
          subject: title,
          html: newContent
        });
      }, 500);
    });
  };
  const onFinishFailed = () => { };
  // 回复控件
  const replyMsg = (item: any) => {
    setReplyObj(item);
    replyForm.resetFields();
    if (replyArea) {
      setTimeout(() => {
        // @ts-ignore
        replyArea?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }, 100);
    }
  };
  // 提交回复
  const onFinishReply = (values: DataType) => {
    setType(2);
    props.BlogActions.asyncMessageInsertAction({
      pid: replyObj.pid === '-1' ? replyObj._id : replyObj.pid,
      targetReplayId: replyObj._id || '-1',
      //@ts-ignore
      targetReplayContent: `${values?.nickname}@${replyObj?.nickName} ${replyObj?.currentReplayContent}`,
      currentReplayContent: values.content,
      auditTime: 0,
      auditStatus: '1',
      avatar: 'http://dummyimage.com/100x100',
      email: values.email,
      nickName: values.nickname,
    }).then(() => {
      setTimeout(() => {
        message.success('回复成功~');
        if (type === 1) {
          form.resetFields();
        }
        if (type === 2) {
          setReplyObj({ _id: '', pid: '-1' });
          replyForm.resetFields();
        }
        // 重新调用查询接口
        props.BlogActions.asyncMessageListAction(currentPage, pageSize, 1).then((res: any) => {
          // 获取留言数据
          let { data, totalCount, page, pageSize } = res.data;
          // 时间格式化
          data.map((item: DataType) => {
            item.messageTime = dayjs(item.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
            item.children.map((it: any) => {
              it.messageTime = dayjs(it.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
            });
          });
          setMessageList(data);
          setReplyObj(data);
          setTotal(totalCount);
          setCurrentPage(page);
          setPageSize(pageSize);
        });
        // 邮件提醒
        //@ts-ignore
        let email = replyObj.email
        let title = `您在夜雨炊烟小站中的留言收到了回复`
        //@ts-ignore
        let content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客中的留言：</p><hr /><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${replyObj.currentReplayContent}</span></p>收到<span style="color: cadetblue; padding-right:2px;">${values.nickname}</span>的回复:<p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/rblog/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
        let newContent = content.split('\n').join('\n<br/>\n')
        props.BlogActions.asyncSendMailAction({
          email,
          subject: title,
          html: newContent
        });
      }, 500);
    });
    // 关闭窗口
    cancelReply();
  };
  const cancelReply = () => {
    setReplyObj({ _id: '', pid: '-1' });
  };
  // 前台处理留言数据 层级始终为两层
  // const articleMessage = (params: any) => {
  //   // 查询所有留言数据
  //   let message = params.filter((item: any) => item.pid === '-1');
  //   const pids = Array.isArray(message) ? message.map((i: any) => i._id) : [];
  //   let resReply: any[] = [];
  //   // 查询出所有的回复内容 数组对象过滤数组
  //   resReply = params.filter((item: any) => pids.indexOf(item.pid) > -1);

  //   // 遍历
  //   let newMessage = message.map((item: any) => {
  //     const children = resReply.filter((it: any) => it.pid === item._id);
  //     const tranformChildren = children.map((innerItem: any) => ({
  //       ...innerItem,
  //     }));
  //     return {
  //       ...item,
  //       children: tranformChildren,
  //     };
  //   });
  //   // 时间格式化
  //   newMessage.map((item: any) => {
  //     item.messageTime = dayjs(item.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
  //     item.children.map((it: any) => {
  //       it.messageTime = dayjs(it.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss');
  //     });
  //   });
  //   setList(newMessage);
  // };
  // 跳转页数
  const onChangePage = (page: number, pageSize: number) => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncArticleCommentsAction(page, pageSize, 1).then((res: MessageData) => {
      // 获取留言数据
      let { data, totalCount, page, pageSize } = res.data as unknown as MessageData;
      setMessageList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  return (
    // @ts-ignore
    <div className="w-1200 mx-auto pb-5 lg:w-full lg:mx-5 sm:w-full" ref={myRef}>
      <PageDesc title="留言板" />
      <div className="w-1000 mx-auto mt-10 lg:w-full sm:w-full">
        <Card className=" rounded-2xl bg-base-100">
          <div
            style={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bolder',
              marginBottom: '24px',
              position: 'relative',
            }}
            className="lg:w-full sm:w-full"
          >
            {/* <p className="text-xl" style={{ userSelect: 'none' }}>欢迎来到夜雨炊烟的小站</p> */}
            <div className="h-36 px-20 mt-5 font-normal lg:px-0">
              <div className="flex flex-col items-start w-[100%]  absolute">
                <p className="flex absolute text-xl">本站信息:</p>
                <div className="flex items-start justify-center flex-col w-800 mt-8 bg-base-200  rounded-xl hover:transition hover:duration-500 hover:shadow cursor-pointer lg:w-full">
                  <p className="pl-2 py-1">
                    <span>name: </span>
                    <span>夜雨炊烟</span>
                  </p>
                  <p className="pl-2 pb-1">
                    <span>link: </span>
                    <span>https://yychuiyan.com/</span>
                  </p>
                  <p className="pl-2 pb-1 lg:flex lg:flex-col lg:items-start">
                    <span>avatar: </span>
                    <span>https://op.yychuiyan.com/avatar.webp</span>
                  </p>
                  <p className="pl-2 pb-1">
                    <span>desc: </span>
                    <span>三餐烟火暖，四季皆安然。</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="w-800 mx-auto  lg:w-full sm:w-full"
          >
            <Row>
              <Col span={12} className="pr-2 mt-5 lg:mt-8">
                <Form.Item
                  label=""
                  name="nickname"
                  rules={[
                    { required: true, message: '请输入你的昵称' },
                    { whitespace: true, message: '输入不能为空' },
                    { min: 2, message: '昵称不能小于2个字符' },
                    { max: 30, message: '主题不能大于30个字符' },
                  ]}
                >
                  <Input maxLength={30} placeholder="请输入你的昵称" />
                </Form.Item>
              </Col>
              <Col span={12} className="pl-2 mt-5 lg:mt-8">
                <Form.Item
                  label=""
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    {
                      pattern:
                        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确',
                    },
                  ]}
                >
                  <Input maxLength={30} placeholder="请输入你的邮箱" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label=""
              name="content"
              rules={[
                { required: true, message: '请输入你的内容' },
                { whitespace: true, message: '留言不能为空' },
                // { min: 6, message: '内容不能小于6个字符' },
              ]}
            >
              <Input.TextArea
                placeholder="请输入留言内容"
                autoSize={{
                  minRows: 6,
                  maxRows: 12,
                }}
              />
              <div>表情</div>
            </Form.Item>

            <Form.Item className="">
              <Button
                type="primary"
                htmlType="submit"
                className="w-800 mx-auto lg:w-full sm:w-full"
              >
                <CloudUploadOutlined />
                &nbsp;提交留言
              </Button>
            </Form.Item>
          </Form>
          <Row className="mt:h-4 w-full mx-auto lg:w-full sm:w-full">
            <Col span={24} className="sm:w-full lg:w-full">
              <b style={{ marginBottom: '24px', color: 'var(--color-icon-default)', userSelect: 'none' }}>
                留言展示&nbsp;
                <CommentOutlined />
              </b>
              {messageList.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  className="sm:w-full lg:w-full"
                  dataSource={messageList}
                  renderItem={(item, index) => (
                    <List.Item actions={[]} key={index}>
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: '#1890ff', userSelect: 'none' }} >
                            {item.nickName?.slice(0, 1)?.toUpperCase()}
                          </Avatar>
                        }
                        title={
                          <b style={{ color: 'var(--color-icon-default)', userSelect: 'none' }}>{item.nickName}</b>
                        }
                        description={
                          <>
                            <div className="user_content font-normal lg:w-full">
                              <pre
                                className="lg:overflow-auto"
                                dangerouslySetInnerHTML={{
                                  __html: item.currentReplayContent.replace(
                                    /((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g,
                                    ($url) => {
                                      return (
                                        "<a href='" + $url + "' target='_blank'>" + $url + '</a>'
                                      );
                                    }
                                  ),
                                }}
                              ></pre>
                            </div>
                            {/* 子留言 */}
                            <div
                              className="sm:w-full lg:w-full"
                              style={{
                                fontSize: '12px',
                                marginTop: '8px',
                                marginBottom: '16px',
                                alignItems: 'center',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                              }}
                            >
                              <span className="user_desc" style={{ userSelect: 'none' }}>
                                用户&nbsp;{item.nickName}&nbsp;&nbsp;发表于&nbsp;
                                {item.messageTime}
                              </span>
                              <span>
                                {/* {
                              <a
                                style={{ color: 'red', fontSize: '12px', marginRight: '12px' }}
                                onClick={() => removeMsg(item)}
                              >
                                <DeleteOutlined />
                                &nbsp; Delete
                              </a>
                            } */}
                                <a
                                  style={{ fontSize: '12px', marginRight: '12px' }}
                                  onClick={() => replyMsg(item)}
                                >
                                  <MessageOutlined />
                                  &nbsp; 回复
                                </a>
                              </span>
                            </div>
                            {/* 回复的内容 */}
                            {item.children && item.children.length ? (
                              <>
                                {item.children.map((innerItem: any, innerIndex: any) => (
                                  <Comment
                                    key={innerIndex}
                                    className="bg-base-100"
                                    author={
                                      <span className="replay_title" style={{ userSelect: 'none' }}>
                                        {innerItem.targetReplayContent.substring(0, 40) + '···'}
                                      </span>
                                    }
                                    avatar={
                                      // https://img.paulzzh.tech/touhou/random
                                      // https://source.unsplash.com/random
                                      // <Avatar src="https://img.paulzzh.tech/touhou/random"></Avatar>
                                      <Avatar style={{ backgroundColor: '#1890ff', userSelect: 'none' }}>
                                        {innerItem.nickName?.slice(0, 1)?.toUpperCase()}
                                      </Avatar>
                                    }
                                    content={
                                      <span className="user_content font-normal">
                                        <pre
                                          className="lg:overflow-auto"
                                          dangerouslySetInnerHTML={{
                                            __html: innerItem.currentReplayContent.replace(
                                              /((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g,
                                              ($url: string) => {
                                                return (
                                                  "<a href='" +
                                                  $url +
                                                  "' target='_blank'>" +
                                                  $url +
                                                  '</a>'
                                                );
                                              }
                                            ),
                                          }}
                                        ></pre>
                                      </span>
                                    }
                                    datetime={
                                      <Tooltip title={innerItem.messageTime}>
                                        <span style={{ userSelect: 'none' }}>{dayjs(innerItem.messageTime).fromNow()}</span>
                                      </Tooltip>
                                    }
                                    actions={[
                                      // <>
                                      //   {innerItem.canDel ? (
                                      //     <a
                                      //       style={{
                                      //         color: 'red',
                                      //         fontSize: '12px',
                                      //         marginRight: '12px',
                                      //       }}
                                      //       onClick={() => removeMsg(innerItem)}
                                      //     >
                                      //       <DeleteOutlined />
                                      //       &nbsp; Delete
                                      //     </a>
                                      //   ) : null}
                                      // </>,
                                      <a
                                        style={{ fontSize: '12px', marginRight: '12px' }}
                                        onClick={() => replyMsg(innerItem)}
                                      >
                                        <MessageOutlined />
                                        &nbsp; 回复
                                      </a>,
                                    ]}
                                  />
                                ))}
                              </>
                            ) : null}

                            {/* 回复的表单 */}
                            {replyObj._id === item._id || replyObj.pid === item._id ? (
                              <div style={{ marginTop: '12px' }} ref={replyArea}>
                                <Form
                                  form={replyForm}
                                  name="reply"
                                  onFinish={onFinishReply}
                                  onFinishFailed={onFinishFailed}
                                >
                                  <Row>
                                    <Col span={12} className="pr-2">
                                      <Form.Item
                                        label=""
                                        name="nickname"
                                        rules={[
                                          { required: true, message: '请输入你的昵称' },
                                          { whitespace: true, message: '输入不能为空' },
                                          { min: 2, message: '昵称不能小于2个字符' },
                                          { max: 30, message: '主题不能大于30个字符' },
                                        ]}
                                      >
                                        <Input maxLength={30} placeholder="请输入你的昵称" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={12} className="pl-2">
                                      <Form.Item
                                        label=""
                                        name="email"
                                        rules={[
                                          { required: true, message: '请输入邮箱' },
                                          {
                                            pattern:
                                              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                            message: '邮箱格式不正确',
                                          },
                                        ]}
                                      >
                                        <Input maxLength={30} placeholder="请输入你的邮箱" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item
                                    label=""
                                    name="content"
                                    rules={[
                                      { required: true, message: '请输入你的内容' },
                                      { whitespace: true, message: '输入不能为空' },
                                    ]}
                                  >
                                    <Input.TextArea
                                      placeholder="请输入留言内容"
                                      autoSize={{
                                        minRows: 6,
                                        maxRows: 12,
                                      }}
                                    // showCount
                                    // maxLength={300}
                                    />
                                  </Form.Item>
                                  <Form.Item>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                      <Button
                                        style={{ marginRight: '12px' }}
                                        onClick={() => cancelReply()}
                                      >
                                        取消
                                      </Button>
                                      <Button type="primary" htmlType="submit">
                                        {/* <CloudUploadOutlined /> */}
                                        &nbsp;回复
                                      </Button>
                                    </div>
                                  </Form.Item>
                                  <Form.Item></Form.Item>
                                </Form>
                              </div>
                            ) : null}
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <div className="flex justify-center">暂无留言~</div>
              )}
              <MyPagination
                text={text}
                pageSize={pageSize}
                currentPage={currentPage}
                total={total}
                onChange={onChangePage}
              ></MyPagination>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(Message));
