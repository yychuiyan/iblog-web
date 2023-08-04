import React, { useEffect, useRef, useState } from 'react';
import { Card, Form, Input, Button, message, List, Avatar, Row, Col, Modal, Tooltip, Popover } from 'antd';
import { Comment } from '@ant-design/compatible';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import MyPagination from '@/components/pagination';
import { CloudUploadOutlined, CommentOutlined, MessageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { withRouter } from 'react-router-dom';
import { emojiList } from '@/utils/emoji';
import jwtDecode from 'jwt-decode';
import avatar from '../../assets/images/avatar.webp'
interface DataType {
  _id: string;
  nickName: string;
  content: string;
  children: any;
  commentTime: string | number | any;
  pid: string;
  targetReplayId: string;
  targetReplayContent: string;
  currentReplayContent: string;
  avatar: string;
  email: string;
  nickname: string;
  articleId: string;
  articleTitle: string;
}
interface CommentData {
  data: DataType[];
  totalCount: number;
  page: number;
  pageSize: number;
}
const ArticleComment = (props: any) => {
  // 评论列表数据
  const [commentList, setCommentList] = useState<DataType[]>([]);
  // 处理后的分层评论列表
  const [list, setList] = useState([]);
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
  // 回复框显示隐藏
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyForm] = Form.useForm();
  const [form] = Form.useForm();
  // 功能名称
  const [text, setText] = useState('cm');
  // 名称Id
  const [articleId, setArticleId] = useState()
  // 页面效果
  const replyArea = useRef(null);
  // 表情显示隐藏
  const [open, setOpen] = useState(false)
  // 登录数据
  let [loginInfo, setLoginInfo] = useState<any>()
  dayjs.extend(relativeTime);

  // 表情内容
  const [emoji, setEmoji] = useState('')
  const [emojiReply, setEmojiReply] = useState('')
  // 获取文章标题
  let articleTitle = props.title.join('');
  // 登录信息 解析token
  useEffect(() => {
    // 获取登录态
    let isLoginInfo = localStorage.getItem('zhj')
    if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
      const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as object | any;
      setLoginInfo(token)
    } else {
      setLoginInfo(null)
    }
  }, [localStorage])
  // 获取列表
  useEffect(() => {
    let articleId = props.match.params.id;
    setArticleId(articleId)
    props.BlogActions.asyncArticleCommentsAction(currentPage, pageSize, articleId).then(
      (res: CommentData) => {
        // 获取评论数据
        let { data, totalCount, page, pageSize } = res.data as unknown as CommentData;
        // 时间格式化
        data.map((item) => {
          item.commentTime = dayjs(item.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
          item.children.map((it: { commentTime: string | number | any; }) => {
            it.commentTime = dayjs(it.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
          });
        });
        setCommentList(data);
        setTotal(totalCount);
        setCurrentPage(page);
        setPageSize(pageSize);
      }
    );
  }, [currentPage, pageSize, props.BlogActions, props.title]);

  // 提交评论数据
  const onFinish = (values: DataType) => {
    if (values.content === undefined || values.content === '') {
      return message.warning('评论内容不能为空😯')
    }
    props.BlogActions.asyncArticleCommentInsertAction({
      pid: replyObj.pid,
      targetReplayId: replyObj._id || '-1',
      targetReplayContent: '',
      currentReplayContent: values.content,
      avatar: Boolean(loginInfo) ? loginInfo.avatar : loginInfo,
      email: values.email,
      nickName: values.nickname,
      articleId: articleId,
      articleTitle: articleTitle,
    }).then(() => {
      setTimeout(() => {
        message.success('评论成功~');
        if (type === 1) {
          form.resetFields();
        }
        if (type === 2) {
          setReplyObj({ _id: '', pid: '-1' });
          replyForm.resetFields();
        }
        // 重新调用查询接口
        props.BlogActions.asyncArticleCommentsAction(currentPage, pageSize, articleId).then(
          (res: CommentData) => {
            // 获取评论数据
            let { data, totalCount, page, pageSize } = res.data as unknown as CommentData;
            // 时间格式化
            data.map((item) => {
              item.commentTime = dayjs(item.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
              item.children.map((it: { commentTime: string | number | any; }) => {
                it.commentTime = dayjs(it.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
              });
            });
            setCommentList(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          });
        // 邮件提醒
        let email = "haoju.zhang@outlook.com"
        let title = `您的文章【${articleTitle}】收到来自${values.nickname}<${values.email}>的评论`
        let content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上的文章《${articleTitle}》收到新的评论</p><hr /><span style="color: cadetblue">${values.nickname}:</span><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/rblog/article/detail/${articleId}"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
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
    if (values.content === undefined || values.content === '') {
      return message.warning('回复内容不能为空😯')
    }
    setType(2);
    props.BlogActions.asyncArticleCommentInsertAction({
      pid: replyObj.pid === '-1' ? replyObj._id : replyObj.pid,
      targetReplayId: replyObj._id || '-1',
      //@ts-ignore
      targetReplayContent: `${values?.nickname}@${replyObj?.nickName} ${replyObj?.currentReplayContent}`,
      currentReplayContent: values.content,
      avatar: Boolean(loginInfo) ? loginInfo.avatar : loginInfo,
      email: values.email,
      nickName: values.nickname,
      articleId: articleId,
      articleTitle: articleTitle,
    }).then(() => {
      setTimeout(() => {
        message.success('评论回复成功~');
        if (type === 1) {
          form.resetFields();
        }
        if (type === 2) {
          setReplyObj({ _id: '', pid: '-1' });
          replyForm.resetFields();
        }
        // 重新调用查询接口
        props.BlogActions.asyncArticleCommentsAction(currentPage, pageSize, articleId).then(
          (res: CommentData) => {
            // 获取评论数据
            let { data, totalCount, page, pageSize } = res.data as unknown as CommentData;
            // 时间格式化
            data.map((item) => {
              item.commentTime = dayjs(item.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
              item.children.map((it: { commentTime: string | number | any; }) => {
                it.commentTime = dayjs(it.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
              });
            });
            setCommentList(data);
            setTotal(totalCount);
            setCurrentPage(page);
            setPageSize(pageSize);
          }
        );
        // 邮件提醒
        //@ts-ignore
        let email = replyObj.email
        let title = `您在夜雨炊烟小站文章《${articleTitle}》的评论收到了回复`
        //@ts-ignore
        let content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上的文章《${articleTitle}》的评论：</p><hr /><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${replyObj.currentReplayContent}</span></p>收到<span style="color: cadetblue;padding-right:2px;">${values.nickname}</span>的回复:<p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/rblog/article/detail/${articleId}"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
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
  // 处理评论数据 层级始终为两层
  const articleMessage = (params: any) => {
    // 查询所有留言数据
    let message = params.filter((item: any) => item.pid === '-1');
    const pids = Array.isArray(message) ? message.map((i: any) => i._id) : [];
    let resReply: any[] = [];
    // 查询出所有的回复内容 数组对象过滤数组
    resReply = params.filter((item: any) => pids.indexOf(item.pid) > -1);

    // 遍历
    let newMessage = message.map((item: any) => {
      const children = resReply.filter((it: any) => it.pid === item._id);
      const tranformChildren = children.map((innerItem: any) => ({
        ...innerItem,
      }));
      return {
        ...item,
        children: tranformChildren,
      };
    });
    // 时间格式化
    newMessage.map((item: DataType) => {
      item.commentTime = dayjs(item.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
      item.children.map((it: { commentTime: string | number | any; }) => {
        it.commentTime = dayjs(it.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss');
      });
    });
    setList(newMessage);
  };
  // 跳转页数
  const onChangePage = (page: number, pageSize: number) => {
    // 重新调用接口将参数传递过去
    props.BlogActions.asyncArticleCommentsAction(page, pageSize, articleId).then((res: CommentData) => {
      // 获取评论数据
      let { data, totalCount, page, pageSize } = res.data as unknown as CommentData;
      setCommentList(data);
      setTotal(totalCount);
      setCurrentPage(page);
      setPageSize(pageSize);
    });
  };
  // 点击表情
  const handleAddEmoji = (item: any) => {
    form.setFieldsValue({
      content: emoji.concat(item)
    })
    setEmoji(emoji.concat(item))
    setOpen(!open)
  }
  const onChangeVal = (e: any) => {
    setEmoji(e.target.value)
  }
  // 回复表情
  const handleReplyEmoji = (item: any) => {
    replyForm.setFieldsValue({
      content: emojiReply.concat(item)
    })
    setEmojiReply(emojiReply.concat(item))
    setOpen(!open)
  }
  const onChangeReplyVal = (e: any) => {
    setEmojiReply(e.target.value)
  }
  return (
    <div className="w-full mx-auto lg:w-full  sm:w-full">
      <Card bordered={true} className=" bg-base-100 rounded-b-2xl mt-10 lg:mt-20 lg:mx-0">
        <div
          style={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bolder',
            marginBottom: '24px',
            position: 'relative',
            borderRadius: 0,
            color: 'var(--color-icon-default)',
            userSelect: 'none'
          }}
        >
          评论
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              position: 'absolute',
              left: '50%',
              marginLeft: '36px',
            }}
          ></span>
        </div>
        <Form name="basic" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row>
            <Col span={12} className="pr-2">
              <Form.Item
                label=""
                name="nickname"
                rules={[
                  { required: true, message: '请输入你的昵称' },
                  { whitespace: true, message: '输入不能为空' },
                  { min: 1, message: '昵称不能小于1个字符' },
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
                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
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
            // rules={[
            //   { required: true, message: '请输入你的内容' },
            //   { whitespace: true, message: '内容不能为空' },
            // ]}
          >
            <Input.TextArea
              placeholder="请输入评论内容"
              onChange={onChangeVal}
              value={emoji}
              autoSize={{
                minRows: 6,
                maxRows: 12,
              }}
            />
          </Form.Item>
          <Popover
            overlayStyle={{ width: '260px' }}
            placement="top"
            open={open}
            onOpenChange={() => setOpen(!open)}
            content={emojiList.map((item) => {
              return (
                <span
                  className=' inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md'
                  key={item.id}
                  onClick={() => handleAddEmoji(item.emoji)}>
                  {item.emoji}
                </span>
              )
            })
            }
          >
            <div className='-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200' style={{ userSelect: "none" }}>
              <span>
                <svg
                  className="icon w-6 h-6 pt-1"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2554" >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#333333" p-id="2555"></path><path d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zM288 421a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0z m224 272c-85.5 0-155.6-67.3-160-151.6a8 8 0 0 1 8-8.4h48.1c4.2 0 7.8 3.2 8.1 7.4C420 589.9 461.5 629 512 629s92.1-39.1 95.8-88.6c0.3-4.2 3.9-7.4 8.1-7.4H664a8 8 0 0 1 8 8.4C667.6 625.7 597.5 693 512 693z m176-224a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" fill="#E6E6E6" p-id="2556"></path><path d="M288 421a48 48 0 1 0 96 0 48 48 0 1 0-96 0z m376 112h-48.1c-4.2 0-7.8 3.2-8.1 7.4-3.7 49.5-45.3 88.6-95.8 88.6s-92-39.1-95.8-88.6c-0.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 0 0-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 0 0-8-8.4z m-24-112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z" fill="#333333" p-id="2557"></path></svg>
              </span>
              <span className='text-base text-[var(--bgcolor-navbar-click)]'>表情</span>
            </div>
          </Popover>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              <CloudUploadOutlined />
              &nbsp;提交评论
            </Button>
          </Form.Item>
        </Form>
        <Row style={{ marginTop: '36px' }} >
          <Col span={24}>
            <b style={{ marginBottom: '24px', color: 'var(--color-icon-default)', userSelect: 'none' }}>
              评论列表&nbsp;
              <CommentOutlined />
            </b>
            {commentList.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={commentList}
                renderItem={(item, index) => (
                  <List.Item actions={[]} key={index}>
                    <List.Item.Meta
                      avatar={
                        Boolean(item.avatar) ? <Avatar style={{ userSelect: 'none' }} src={item.avatar} /> :
                          <Avatar style={{ backgroundColor: '#1890ff', userSelect: 'none' }} >
                            {item.nickName?.slice(0, 1)?.toUpperCase()}
                          </Avatar>
                      }
                      title={<b style={{ color: 'var(--color-icon-default)', userSelect: 'none' }}>{item.nickName}</b>}
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
                              {item.commentTime}
                            </span>
                            <span style={{ userSelect: "none" }}>
                              <a
                                style={{ fontSize: '12px', marginRight: '12px', color: '#276ff5' }}
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
                                  author={
                                    <span className="replay_title" style={{ userSelect: 'none' }}>
                                      {innerItem.targetReplayContent.substring(0, 40) + '···'}
                                    </span>
                                  }
                                  className="bg-base-100"
                                  avatar={
                                    // https://img.paulzzh.tech/touhou/random
                                    // https://source.unsplash.com/random
                                    // <Avatar src="https://img.paulzzh.tech/touhou/random"></Avatar>
                                    Boolean(innerItem.avatar) ? <Avatar style={{ userSelect: 'none' }} src={innerItem.avatar} /> :
                                      <Avatar style={{ backgroundColor: '#1890ff', userSelect: 'none' }}>
                                        {innerItem.nickName?.slice(0, 1)?.toUpperCase()}
                                      </Avatar>
                                  }
                                  content={
                                    <div className="user_content font-normal">
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
                                    </div>
                                  }
                                  datetime={
                                    <Tooltip title={item.commentTime}>
                                      <span style={{ userSelect: 'none' }}>{dayjs(item.commentTime).fromNow()}</span>
                                    </Tooltip>
                                  }
                                  actions={[
                                    <a
                                      style={{
                                        fontSize: '12px',
                                        marginRight: '12px',
                                        color: '#276ff5',
                                        userSelect: "none"
                                      }}
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
                                  // rules={[
                                  //   { required: true, message: '请输入你的内容' },
                                  //   { whitespace: true, message: '内容不能为空' },
                                  // ]}
                                >
                                  <Input.TextArea
                                    placeholder="请输入评论内容"
                                    onChange={onChangeReplyVal}
                                    value={emojiReply}
                                    autoSize={{
                                      minRows: 6,
                                      maxRows: 12,
                                    }}
                                  // showCount
                                  // maxLength={300}
                                  />
                                </Form.Item>
                                <Popover
                                  overlayStyle={{ width: '260px' }}
                                  placement="top"
                                  open={open}
                                  onOpenChange={() => setOpen(!open)}
                                  content={emojiList.map((item) => {
                                    return (
                                      <span
                                        className=' inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md'
                                        key={item.id}
                                        onClick={() => handleReplyEmoji(item.emoji)}>
                                        {item.emoji}
                                      </span>
                                    )
                                  })
                                  }
                                >
                                  <div className='-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200' style={{ userSelect: "none" }}>
                                    <span>
                                      <svg
                                        className="icon w-6 h-6 pt-1"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        p-id="2554" >
                                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#333333" p-id="2555"></path><path d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zM288 421a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0z m224 272c-85.5 0-155.6-67.3-160-151.6a8 8 0 0 1 8-8.4h48.1c4.2 0 7.8 3.2 8.1 7.4C420 589.9 461.5 629 512 629s92.1-39.1 95.8-88.6c0.3-4.2 3.9-7.4 8.1-7.4H664a8 8 0 0 1 8 8.4C667.6 625.7 597.5 693 512 693z m176-224a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" fill="#E6E6E6" p-id="2556"></path><path d="M288 421a48 48 0 1 0 96 0 48 48 0 1 0-96 0z m376 112h-48.1c-4.2 0-7.8 3.2-8.1 7.4-3.7 49.5-45.3 88.6-95.8 88.6s-92-39.1-95.8-88.6c-0.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 0 0-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 0 0-8-8.4z m-24-112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z" fill="#333333" p-id="2557"></path></svg>
                                    </span>
                                    <span className='text-base text-[var(--bgcolor-navbar-click)]'>表情</span>
                                  </div>
                                </Popover>
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
                <div className="flex justify-center" style={{ userSelect: 'none' }}>暂无评论~</div>
            )}
            <MyPagination
              text={text}
              pageSize={pageSize}
              currentPage={currentPage}
              total={total}
              onChange={onChangePage}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(withRouter(ArticleComment));
