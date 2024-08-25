import { useEffect, useRef, useState } from 'react'
import { Card, Form, Input, Button, message, List, Avatar, Row, Col, Tooltip, Popover } from 'antd'
import { Comment } from '@ant-design/compatible'
import MyPagination from '@/components/pagination'
import { CloudUploadOutlined, CommentOutlined, MessageOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { emojiList } from '@/utils/emoji'
import jwtDecode from 'jwt-decode'
import IconFont from '../iconfont'
import { useAddArticleComment, useCommentList } from '@/api/articles'
import { CommentType, CommentTypeResponse } from '@/api/articles/type'
import { TokenType } from '@/types/comm'
import { useSendEmail } from '@/api/sendEmail'
import { useLocation } from 'react-router-dom'

const ArticleComment = (props) => {
  // 路由信息
  const location = useLocation()
  // 评论列表数据
  const [commentList, setCommentList] = useState<CommentType[]>([])
  // 评论内容
  const [commentContent, setCommentContent] = useState<CommentType>(null)
  // 回复的文本对象信息
  const [replyObj, setReplyObj] = useState<CommentType>({ _id: '', pid: '-1' })
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1)
  // 每页显示条数
  const [pageCount, setPageCount] = useState(10)
  // 是留言还是回复（1是留言，2是回复）
  const [type, setType] = useState(1)
  // 回复框显示隐藏
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyForm] = Form.useForm()
  const [form] = Form.useForm()
  // 功能名称
  const [text] = useState('cm')
  // 页面效果
  const replyArea = useRef<HTMLDivElement>(null)
  // 邮件参数
  const [emailParams, setEmailParams] = useState<{
    email?: string
    subject?: string
    html?: string
  }>(null)
  // 表情显示隐藏
  const [open, setOpen] = useState(false)
  // 回复表情显示隐藏
  const [replyOpen, setReplyOpen] = useState(false)
  // 登录数据
  const [loginInfo, setLoginInfo] = useState<TokenType>()
  dayjs.extend(relativeTime)

  // 表情内容
  const [emoji, setEmoji] = useState('')
  const [emojiReply, setEmojiReply] = useState('')

  // 获取文章标题
  const articleTitle = props.title.join('')
  const parts = location.pathname.split('/')
  const commentArticleId = parts[parts.length - 1]
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
  // 获取评论列表
  const {
    articleCommentList,
    isCommentListFetched,
    mutate: articleCommentMutate
  } = useCommentList(currentPage, pageCount, commentArticleId)
  const commentListData =
    isCommentListFetched && articleCommentList && articleCommentList.data
      ? articleCommentList.data
      : ''

  useEffect(() => {
    if (isCommentListFetched) {
      setCommentList(articleCommentList.data.data)
    }
  }, [articleCommentList, isCommentListFetched])

  const { totalCount } = commentListData as CommentTypeResponse
  // 提交评论数据
  const { addArticleComment, isAddArticleCommentFetched } = useAddArticleComment(commentContent)
  const commentListSource =
    isCommentListFetched && articleCommentList && articleCommentList.data
      ? articleCommentList.data.data
      : ''
  // 排序
  commentListSource &&
    commentListSource.forEach((item) =>
      item.children.sort((prev, curr) => {
        prev.messageTime - curr.messageTime
      })
    )
  // 接收邮件
  const { isSendEmailFetched } = useSendEmail(emailParams)
  useEffect(() => {
    if (isSendEmailFetched) {
      console.log('')
    }
  }, [isSendEmailFetched])
  useEffect(() => {
    if (isAddArticleCommentFetched) {
      if (addArticleComment.res && addArticleComment.res.pid === '-1') {
        // 当数据成功获取后，更新消息列表
        setCommentList((prevState) => [addArticleComment.res, ...prevState])
      } else {
        // 回复内容
        const parentComment =
          commentListSource &&
          commentListSource.find((message) => message._id === addArticleComment.res.pid)

        // 如果找到了父评论
        if (parentComment) {
          // 将新回复插入到该父留言的 children 数组中
          parentComment.children.push(addArticleComment.res)
        } else {
          console.error('未找到对应的评论')
        }
        setCommentList((prevState) => [parentComment, ...prevState])
      }
    }
  }, [isAddArticleCommentFetched])
  // 提交评论
  const onFinish = (values) => {
    if (values.content === undefined || values.content === '') {
      return message.warning('评论不能为空哦！')
    }
    try {
      // 更新 messageContent 状态
      setCommentContent({
        pid: replyObj.pid,
        targetReplayId: replyObj._id || '-1',
        targetReplayContent: '',
        currentReplayContent: values.content,
        avatar: loginInfo ? loginInfo.avatar : (loginInfo as string),
        email: values.email,
        nickName: values.nickname,
        articleId: commentArticleId,
        articleTitle: articleTitle
      })

      // 邮件提醒
      const email = 'haoju.zhang@outlook.com'
      const title = `您的文章【${articleTitle}】收到来自${values.nickname}<${values.email}>的评论`
      const content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上的文章《${articleTitle}》收到新的评论</p><hr /><span style="color: cadetblue">${values.nickname}:</span><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/article/detail/${commentArticleId}"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
      const newContent = content.split('\n').join('\n<br/>\n')
      setEmailParams({
        email,
        subject: title,
        html: newContent
      })
      setTimeout(() => {
        message.success('评论成功！')
        setCurrentPage(1)
        if (type === 1) {
          form.resetFields()
        }
        if (type === 2) {
          setReplyObj({ _id: '', pid: '-1' })
          replyForm.resetFields()
        }
        setCommentContent(null)
        setEmailParams(null)
        articleCommentMutate() // 即时更新数据
      }, 500)
    } catch (error) {
      message.error('评论失败，请重试！')
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
      avatar: loginInfo ? loginInfo.avatar : (loginInfo as string),
      email: values.email,
      nickName: values.nickname,
      articleId: commentArticleId,
      articleTitle: articleTitle
    }
    setCommentContent(replyParmas)
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
      const title = `您在夜雨炊烟小站文章《${articleTitle}》的评论收到了回复`
      const content = `<div><br /><p>您在<span style="color: cadetblue; padding: 3px">夜雨炊烟</span>博客上的文章《${articleTitle}》的评论：</p><hr /><p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${replyObj.currentReplayContent}</span></p>收到<span style="color: cadetblue;padding-right:2px;">${values.nickname}</span>的回复:<p style="width: 98%;min-height: 30px;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;background-color: #f5f5f5;border-radius: 10px;"><span>${values.content}</span></p><p><a href="https://yychuiyan.com/article/detail/${commentArticleId}"target="_blank"style="text-decoration: none; color: #5c8fef">点击查看详情</a></p></div>`
      const newContent = content.split('\n').join('\n<br/>\n')
      setEmailParams({
        email,
        subject: title,
        html: newContent
      })
      articleCommentMutate() // 即时更新数据
    }, 500)
    cancelReply()
  }
  // 关闭窗口
  const cancelReply = () => {
    setReplyObj({ _id: '', pid: '-1' })
  }
  // 处理评论数据 层级始终为两层
  // const articleMessage = (params: any) => {
  //   // 查询所有留言数据
  //   const message = params.filter((item: any) => item.pid === '-1')
  //   const pids = Array.isArray(message) ? message.map((i: any) => i._id) : []
  //   let resReply: any[] = []
  //   // 查询出所有的回复内容 数组对象过滤数组
  //   resReply = params.filter((item: any) => pids.indexOf(item.pid) > -1)

  //   // 遍历
  //   const newMessage = message.map((item: any) => {
  //     const children = resReply.filter((it: any) => it.pid === item._id)
  //     const tranformChildren = children.map((innerItem: any) => ({
  //       ...innerItem
  //     }))
  //     return {
  //       ...item,
  //       children: tranformChildren
  //     }
  //   })
  //   // 时间格式化
  //   newMessage.map((item: DataType) => {
  //     item.commentTime = dayjs(item.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss')
  //     item.children.map((it: { commentTime: string | number | any }) => {
  //       it.commentTime = dayjs(it.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss')
  //     })
  //   })
  //   setList(newMessage)
  // }
  const onChangePage = (currentPage, pageCount) => {
    setCurrentPage(currentPage)
    setPageCount(pageCount)
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
              marginLeft: '36px'
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
                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
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
            //   { whitespace: true, message: '内容不能为空' },
            // ]}
          >
            <Input.TextArea
              placeholder="请输入评论内容"
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
              <span className="text-[var(--color-icon-default)]">表情</span>
            </div>
          </Popover>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              <CloudUploadOutlined />
              &nbsp;提交评论
            </Button>
          </Form.Item>
        </Form>
        <Row style={{ marginTop: '36px' }}>
          <Col span={24}>
            <b
              style={{
                marginBottom: '24px',
                color: 'var(--color-icon-default)',
                userSelect: 'none'
              }}
            >
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
                        item.nickName.trim() === '夜雨炊烟' ? (
                          <Avatar
                            style={{ userSelect: 'none' }}
                            src={'https://op.yychuiyan.com/avatar1511.webp'}
                          />
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
                                    return "<a href='" + $url + "' target='_blank'>" + $url + '</a>'
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
                              {dayjs(item.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
                            <span style={{ userSelect: 'none' }}>
                              <a
                                style={{
                                  fontSize: '12px',
                                  marginRight: '12px',
                                  color: '#276ff5'
                                }}
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
                                    innerItem.nickName.trim() === '夜雨炊烟' ? (
                                      <Avatar
                                        style={{ userSelect: 'none' }}
                                        src={'https://op.yychuiyan.com/avatar1511.webp'}
                                      />
                                    ) : innerItem.avatar ? (
                                      <Avatar
                                        style={{ userSelect: 'none' }}
                                        src={innerItem.avatar}
                                      />
                                    ) : (
                                      <Avatar
                                        style={{ backgroundColor: '#1890ff', userSelect: 'none' }}
                                      >
                                        {innerItem.nickName?.slice(0, 1)?.toUpperCase()}
                                      </Avatar>
                                    )
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
                                              )
                                            }
                                          )
                                        }}
                                      ></pre>
                                    </div>
                                  }
                                  datetime={
                                    <Tooltip title={item.commentTime}>
                                      <span style={{ userSelect: 'none' }}>
                                        {dayjs(
                                          dayjs(innerItem.commentTime * 1000).format(
                                            'YYYY-MM-DD HH:mm:ss'
                                          )
                                        ).fromNow()}
                                      </span>
                                    </Tooltip>
                                  }
                                  actions={[
                                    <a
                                      style={{
                                        fontSize: '12px',
                                        marginRight: '12px',
                                        color: '#276ff5',
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
                                  //   { whitespace: true, message: '内容不能为空' },
                                  // ]}
                                >
                                  <Input.TextArea
                                    placeholder="请输入评论内容"
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
                                        className="inline-block cursor-pointer px-2 text-[20px] hover:bg-blue-400 w-5 h-8 rounded-md"
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
                                      // onClick={() => cancelReply()}
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
              <div className="flex justify-center" style={{ userSelect: 'none' }}>
                暂无评论~
              </div>
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
  )
}

export default ArticleComment
