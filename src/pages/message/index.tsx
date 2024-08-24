import React, { useEffect, useRef, useState } from 'react'
import { Card, Form, Input, Button, message, List, Avatar, Row, Col, Tooltip, Popover } from 'antd'
import { Comment } from '@ant-design/compatible'
import MyPagination from '@/components/pagination'
import { CloudUploadOutlined, CommentOutlined, MessageOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PageDesc from '@/components/sidemenu/PageDesc'
import { emojiList } from '@/utils/emoji'
import { SoundOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-solid-svg-icons'
import jwtDecode from 'jwt-decode'
import avatar from '../../assets/images/avatar.webp'
import IconFont from '@/components/iconfont'
import { Helmet } from 'react-helmet'
import { useAddMessageBorad, useMessageBoradList } from '@/api/message'
import { useSendEmail } from '@/api/sendEmail'
import { MessageBoradType, MessageBoradTypeResponse } from '@/api/message/type'
import { LoginInfoType, TokenType } from '@/types/comm'

const Message = () => {
  // 留言列表数据
  const [messageList, setMessageList] = useState<MessageBoradType[]>([])
  // 留言内容
  const [messageContent, setMessageContent] = useState<MessageBoradType>(null)
  // 回复的文本对象信息
  const [replyObj, setReplyObj] = useState<MessageBoradType>({ _id: '', pid: '-1' })
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1)
  // 每页显示条数
  const [pageCount, setPageCount] = useState(10)
  // 是留言还是回复（1是留言，2是回复）
  const [type, setType] = useState(1)
  // 功能名称
  const [text] = useState('cm')
  // 回复的表单
  const [replyForm] = Form.useForm()
  const [form] = Form.useForm()
  // 页面效果
  const replyArea = useRef(null)
  // 邮件参数
  const [emailParams, setEmailParams] = useState<{
    email?: string
    subject?: string
    html?: string
  }>(null)
  // 登录数据
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>()
  // 表情显示隐藏
  const [open, setOpen] = useState(false)
  // 回复表情显示隐藏
  const [replyOpen, setReplyOpen] = useState(false)
  dayjs.extend(relativeTime)
  // 滚动位置
  const myRef = React.useRef<HTMLDivElement>(null)
  const messageRef = React.useRef<HTMLDivElement>(null)

  // 表情内容
  const [emoji, setEmoji] = useState('')
  const [emojiReply, setEmojiReply] = useState('')
  useEffect(() => {
    if (myRef.current) {
      window.scroll({
        top: myRef.current.offsetTop - 80 || 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [])
  // 登录信息 解析token
  useEffect(() => {
    // 获取登录态
    const isLoginInfo = localStorage.getItem('zhj')
    if (isLoginInfo === 'success' && localStorage.getItem('yychuiyan') !== null) {
      const token = jwtDecode(localStorage.getItem('yychuiyan') as string) as TokenType
      setLoginInfo(token)
    } else {
      setLoginInfo(null)
    }
  }, [])
  // 获取留言列表
  const {
    messageBoardList,
    isMessageBoradListFetched,
    mutate: messageBoradMutate
  } = useMessageBoradList(currentPage, pageCount, 1)
  const messageBoardListData =
    isMessageBoradListFetched && messageBoardList && messageBoardList.data
      ? messageBoardList.data
      : ''

  useEffect(() => {
    if (isMessageBoradListFetched) {
      setMessageList(messageBoardList.data.data)
    }
  }, [isMessageBoradListFetched, messageBoardList, messageBoardListData])

  const { totalCount } = messageBoardListData as MessageBoradTypeResponse
  // 提交留言数据
  const { addMessageBoard, isAddMessageBoradFetched } = useAddMessageBorad(messageContent)
  const messageBoardListSource =
    isMessageBoradListFetched && messageBoardList && messageBoardList.data
      ? messageBoardList.data.data
      : ''
  // 排序
  messageBoardListSource &&
    messageBoardListSource.forEach((item) =>
      item.children.sort((prev, curr) => {
        prev.messageTime - curr.messageTime
      })
    )
  // 接收邮件
  const { sendEmail, isSendEmailFetched } = useSendEmail(emailParams)
  useEffect(() => {
    if (isSendEmailFetched) {
      console.log('')
    }
  }, [sendEmail, isSendEmailFetched])
  useEffect(() => {
    if (isAddMessageBoradFetched) {
      // if (addMessageBoard.msg !== '添加留言成功') {
      //   message.error('数据异常！')
      //   return
      // }
      if (addMessageBoard.res && addMessageBoard.res.pid === '-1') {
        // 当数据成功获取后，更新消息列表
        setMessageList((prevState) => [addMessageBoard.res, ...prevState])
      } else {
        // 回复内容
        const parentMessage =
          messageBoardListSource &&
          messageBoardListSource.find((message) => message._id === addMessageBoard.res.pid)

        // 如果找到了父留言
        if (parentMessage) {
          // 将新回复插入到该父留言的 children 数组中
          parentMessage.children.push(addMessageBoard.res)
          console.log('找到父留言：', parentMessage)
        } else {
          console.error('未找到对应的留言')
        }
        setMessageList((prevState) => [parentMessage, ...prevState])
      }
    }
  }, [isAddMessageBoradFetched])
  // 提交留言
  const onFinish = async (values) => {
    if (values.content === undefined || values.content === '') {
      return message.warning('留言不能为空哦！')
    }
    try {
      // 更新 messageContent 状态
      setMessageContent({
        pid: replyObj.pid,
        targetReplayId: replyObj._id || '-1',
        targetReplayContent: '',
        currentReplayContent: values.content,
        auditTime: 0,
        auditStatus: '1',
        avatar: loginInfo ? loginInfo.avatar : (loginInfo as string),
        email: values.email,
        nickName: values.nickname
      })

      // 邮件提醒 默认接收邮箱
      const email = 'haoju.zhang@outlook.com'
      const title = `您的博客收到来自${values.nickname}<${values.email}>的留言`
      const content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上收到新的留言</p><hr /><span style="color: cadetblue;">${values.nickname}:</span><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
      const newContent = content.split('\n').join('\n<br/>\n')
      setEmailParams({
        email,
        subject: title,
        html: newContent
      })
      setTimeout(() => {
        message.success('留言成功！')
        setCurrentPage(1)
        if (type === 1) {
          form.resetFields()
        }
        if (type === 2) {
          setReplyObj({ _id: '', pid: '-1' })
          replyForm.resetFields()
        }
        setMessageContent(null)
        setEmailParams(null)
        messageBoradMutate() // 调用留言数据
      }, 500)
    } catch (error) {
      message.error('留言失败，请重试！')
    }
  }

  // 提交一次
  const onFinishFailed = () => {
    return
  }
  // 回复控件
  const replyMsg = (item) => {
    setReplyObj(item)
    replyForm.resetFields()
    if (replyArea) {
      setTimeout(() => {
        replyArea?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }, 100)
    }
  }
  // 提交回复
  const onFinishReply = (values) => {
    if (values.content === undefined || values.content === '') {
      return message.warning('回复内容不能为空哦！')
    }
    setType(2)
    const replyParmas = {
      pid: replyObj.pid === '-1' ? replyObj._id : replyObj.pid,
      targetReplayId: replyObj._id || '-1',
      targetReplayContent: `${values?.nickname}@${replyObj?.nickName} ${replyObj?.currentReplayContent}`,
      currentReplayContent: values.content,
      auditTime: 0,
      auditStatus: '1',
      avatar: loginInfo ? loginInfo.avatar : (loginInfo as string),
      email: values.email,
      nickName: values.nickname
    }
    setMessageContent(replyParmas)
    setTimeout(() => {
      message.success('回复成功！')
      if (type === 1) {
        form.resetFields()
      }
      if (type === 2) {
        setReplyObj({ _id: '', pid: '-1' })
        replyForm.resetFields()
      }
      // 邮件提醒
      const email = replyObj.email
      const title = `您在夜雨炊烟小站中的留言收到了回复`
      const content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客中的留言：</p><hr /><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${replyObj.currentReplayContent}</span></p>收到<span style="color: cadetblue; padding-right:2px;">${values.nickname}</span>的回复:<p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/message"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
      const newContent = content.split('\n').join('\n<br/>\n')
      setEmailParams({
        email,
        subject: title,
        html: newContent
      })
      messageBoradMutate() // 调用留言数据
    }, 500)
    cancelReply()
  }
  const cancelReply = () => {
    setReplyObj({ _id: '', pid: '-1' })
  }
  // 跳转页数
  const onChangePage = (currentPage, pageCount) => {
    setCurrentPage(currentPage)
    setPageCount(pageCount)
    window.scroll({
      top: messageRef.current.offsetTop + 180 || 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  // 点击表情
  const handleAddEmoji = (item) => {
    form.setFieldsValue({
      content: emoji.concat(item)
    })
    setEmoji(emoji.concat(item))
    setOpen(!open)
  }
  const onChangeVal = (e) => {
    setEmoji(e.target.value)
  }
  // 回复表情
  const handleReplyEmoji = (item) => {
    replyForm.setFieldsValue({
      content: emojiReply.concat(item)
    })
    setEmojiReply(emojiReply.concat(item))
    setReplyOpen(!replyOpen)
  }
  const onChangeReplyVal = (e) => {
    setEmojiReply(e.target.value)
  }
  const msgContent = `name: 夜雨炊烟\nlink: https://yychuiyan.com\navatar: https://op.yychuiyan.com/avatar.webp\ndesc: 三餐烟火暖，四季皆安然。`
  // 点击复制
  const handleCopy = () => {
    navigator.clipboard.writeText(msgContent)
    message.info({
      content: '复制成功!',
      icon: <SoundOutlined style={{ color: 'var(--bgcolor-social-default)' }} />,
      className: 'text-[var(--bgcolor-social-default)]'
    })
  }
  return (
    <div className="w-1200 mx-auto pb-5 lg:w-full lg:mx-5 sm:w-[calc(100%-40px)]" ref={myRef}>
      <Helmet>
        <title>留言板 | 夜雨炊烟</title>
      </Helmet>
      <PageDesc title="留言板" />
      <div className="w-1000 mx-auto mt-10 lg:w-full">
        <Card className=" rounded-2xl bg-base-100">
          <div
            style={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 'bolder',
              marginBottom: '24px',
              position: 'relative'
            }}
            className="lg:w-full sm:w-full"
          >
            {/* <p className="text-xl" style={{ userSelect: 'none' }}>欢迎来到夜雨炊烟的小站</p> */}
            <div className="h-36 px-20 mt-5 font-normal lg:px-0 lg:mt-1">
              <div className="flex flex-col items-start w-[100%]  absolute">
                <p className="flex absolute text-xl" style={{ userSelect: 'none' }}>
                  本站信息:
                </p>
                <div
                  className="flex items-start relative justify-center flex-col w-800 mt-8 bg-base-200  rounded-xl hover:transition hover:duration-500 hover:shadow cursor-pointer lg:w-full"
                  style={{ userSelect: 'none' }}
                >
                  <p className="absolute right-2 top-2" onClick={handleCopy}>
                    <FontAwesomeIcon icon={faClone} size="xl" />
                  </p>
                  <p className="pl-2 py-1">
                    <span>name: </span>
                    <span>夜雨炊烟</span>
                  </p>
                  <p className="pl-2 pb-1">
                    <span>link: </span>
                    <span>https://yychuiyan.com</span>
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
                    { max: 30, message: '主题不能大于30个字符' }
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
                    { required: true, message: '请输入你的邮箱' },
                    {
                      pattern:
                        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确'
                    }
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
              //   { whitespace: true, message: '留言不能为空' },
              // { min: 6, message: '内容不能小于6个字符' },
              // ]}
            >
              <Input.TextArea
                placeholder="请输入留言内容"
                onChange={onChangeVal}
                value={emoji}
                autoSize={{
                  minRows: 6,
                  maxRows: 12
                }}
              />
            </Form.Item>
            <Popover
              overlayStyle={{ width: '280px' }}
              placement="top"
              open={open}
              onOpenChange={() => setOpen(!open)}
              content={emojiList.map((item) => {
                return (
                  <span
                    className="inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md"
                    key={item.id}
                    onClick={() => handleAddEmoji(item.emoji)}
                  >
                    {item.emoji}
                  </span>
                )
              })}
            >
              <div
                className="-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200"
                style={{ userSelect: 'none' }}
              >
                <span>
                  <IconFont
                    iconName="icon-biaoqing"
                    className="text-[20px] text-[var(--color-icon-default)] pr-1"
                  ></IconFont>
                </span>
                <span className="text-[var(--color-icon-default)]" style={{ userSelect: 'none' }}>
                  表情
                </span>
              </div>
            </Popover>
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

          <Row className="mt:h-4 w-full mx-auto lg:w-full sm:w-full" ref={messageRef}>
            <Col span={24} className="sm:w-full lg:w-full">
              <b
                style={{
                  marginBottom: '24px',
                  color: 'var(--color-icon-default)',
                  userSelect: 'none'
                }}
              >
                留言展示&nbsp;
                <CommentOutlined />
              </b>
              {messageList && messageList.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  className="sm:w-full lg:w-full"
                  dataSource={messageList && messageList}
                  renderItem={(item: MessageBoradType, index) => (
                    <List.Item actions={[]} key={index}>
                      <List.Item.Meta
                        avatar={
                          item.nickName.trim() === '夜雨炊烟' ? (
                            <Avatar style={{ userSelect: 'none' }} src={avatar} />
                          ) : item.avatar ? (
                            <Avatar style={{ userSelect: 'none' }} src={item.avatar} />
                          ) : (
                            <Avatar style={{ backgroundColor: '#1890ff', userSelect: 'none' }}>
                              {item.nickName?.slice(0, 1)?.toUpperCase()}
                            </Avatar>
                          )
                        }
                        title={
                          <b style={{ color: 'var(--color-icon-default)', userSelect: 'none' }}>
                            {item.nickName}
                          </b>
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
                                      )
                                    }
                                  )
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
                                justifyContent: 'space-between'
                              }}
                            >
                              <span className="user_desc" style={{ userSelect: 'none' }}>
                                用户&nbsp;{item.nickName}&nbsp;&nbsp;发表于&nbsp;
                                {dayjs(item.messageTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                              </span>
                              <span style={{ userSelect: 'none' }}>
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
                                {item.children.map((innerItem, innerIndex) => (
                                  <Comment
                                    key={innerIndex}
                                    className="bg-base-100"
                                    author={
                                      <span className="replay_title" style={{ userSelect: 'none' }}>
                                        {innerItem.targetReplayContent.substring(0, 40) + '···'}
                                      </span>
                                    }
                                    avatar={
                                      innerItem.nickName.trim() === '夜雨炊烟' ? (
                                        <Avatar style={{ userSelect: 'none' }} src={avatar} />
                                      ) : innerItem.avatar ? (
                                        <Avatar
                                          style={{ userSelect: 'none' }}
                                          src={innerItem.avatar}
                                        />
                                      ) : (
                                        <Avatar
                                          style={{
                                            backgroundColor: '#1890ff',
                                            userSelect: 'none'
                                          }}
                                        >
                                          {innerItem.nickName?.slice(0, 1)?.toUpperCase()}
                                        </Avatar>
                                      )
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
                                                )
                                              }
                                            )
                                          }}
                                        ></pre>
                                      </span>
                                    }
                                    datetime={
                                      <Tooltip title={innerItem.messageTime}>
                                        <span style={{ userSelect: 'none' }}>
                                          {dayjs(
                                            dayjs(innerItem.messageTime * 1000).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                            )
                                          ).fromNow()}
                                        </span>
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
                                        style={{
                                          fontSize: '12px',
                                          marginRight: '12px',
                                          userSelect: 'none'
                                        }}
                                        onClick={() => replyMsg(innerItem)}
                                      >
                                        <MessageOutlined />
                                        &nbsp; 回复
                                      </a>
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
                                          { max: 30, message: '主题不能大于30个字符' }
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
                                          { required: true, message: '请输入你的邮箱' },
                                          {
                                            pattern:
                                              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                            message: '邮箱格式不正确'
                                          }
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
                                    //   { whitespace: true, message: '输入不能为空' },
                                    // ]}
                                  >
                                    <Input.TextArea
                                      placeholder="请输入回复内容"
                                      onChange={onChangeReplyVal}
                                      value={emojiReply}
                                      autoSize={{
                                        minRows: 6,
                                        maxRows: 12
                                      }}
                                      // showCount
                                      // maxLength={300}
                                    />
                                  </Form.Item>
                                  <Popover
                                    overlayStyle={{ width: '280px' }}
                                    placement="top"
                                    open={replyOpen}
                                    onOpenChange={() => setReplyOpen(!replyOpen)}
                                    content={emojiList.map((item) => {
                                      return (
                                        <span
                                          className=" inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md"
                                          key={item.id}
                                          onClick={() => handleReplyEmoji(item.emoji)}
                                        >
                                          {item.emoji}
                                        </span>
                                      )
                                    })}
                                  >
                                    <div
                                      className="-mt-5 mb-1 flex items-center justify-center w-16 h-8 text-center rounded cursor-pointer border-1 border-solid border-base-200"
                                      style={{ userSelect: 'none' }}
                                    >
                                      <span>
                                        <IconFont
                                          iconName="icon-biaoqing"
                                          className="text-[20px] text-[var(--color-icon-default)] pr-1"
                                        ></IconFont>
                                      </span>
                                      <span className="text-[var(--color-icon-default)]">表情</span>
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
                <div className="flex justify-center">暂无留言~</div>
              )}
              <MyPagination
                text={text}
                pageSize={pageCount}
                currentPage={currentPage}
                total={totalCount}
                onChange={onChangePage}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default Message
