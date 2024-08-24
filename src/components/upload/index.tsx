import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { message, Modal, Upload } from 'antd'
import InputImage from './InputImage'
import { useUploadImage } from '@/api/upload'
interface UploadImageProps {
  handleChange: (data: string) => void
  handleRemove: () => void
  imgUrlArr: string[] // 使用合适的类型代替 any
}
const UploadImage: React.FC<UploadImageProps> = (props: any) => {
  // 预览模态框
  const [previewOpen, setPreviewOpen] = useState(false)
  // 预览图片
  const [previewImage, setPreviewImage] = useState('')
  // 预览头部
  const [previewTitle, setPreviewTitle] = useState('')
  // 图片信息
  const [fileList, setFileList] = useState<any>([])
  // 删除后置空图片链接输入框
  const [imgUrl, setImgUrl] = useState({})
  // 上传参数
  const [uploadImageParams, setUploadImageParams] = useState()
  // 上传
  const { uploadImage, isUploadImageFetched, uploadFetch } = useUploadImage(uploadImageParams)
  useEffect(() => {
    if (isUploadImageFetched) {
      props.handleChange(uploadImage)
      setFileList([
        {
          name: uploadImage.name,
          thumbUrl: uploadImage.url
        }
      ])
    }
  }, [isUploadImageFetched])
  // 图片赋值
  useEffect(() => {
    setFileList(props.imgUrlArr !== undefined ? props.imgUrlArr : [])
  }, [props.imgUrlArr])
  // 上传之前的操作
  const beforeUpload = (file: any) => {
    // 上传图片格式
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/jpg' ||
      file.type === 'image/gif'
    if (!isJpgOrPng) {
      message.error('只允许上传 JPG/PNG/WEBP/JPG/GIT 文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小必须小于 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  // 上传操作
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  // 上传图片
  const handleUpload = (data) => {
    setUploadImageParams(data)
    uploadFetch() // 调用接口
    message.success('上传成功')
  }

  // 预览
  const handlePreview = (file) => {
    setPreviewImage(file.thumbUrl)
    setPreviewTitle(file.name)
    setPreviewOpen(true)
  }
  // 关闭预览
  const handleCancel = () => setPreviewOpen(false)
  // 删除图片
  const hanleRemove = (it) => {
    props.handleRemove(it)
    setFileList([])
    setImgUrl({
      url: ''
    })
  }
  // 赋值上传图片
  const onChangeVal = (data) => {
    props.handleChange(data)
    // 截取
    const start = data.indexOf('images')
    const end = data.indexOf('?', start)
    const name = data.substring(start, end)
    setFileList([
      {
        name: name,
        thumbUrl: data
      }
    ])
  }
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        customRequest={handleUpload}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        // onChange={handleChange}
        onRemove={hanleRemove}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {/* 预览 */}
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <InputImage
        onChangeVal={onChangeVal}
        fileList={fileList ? fileList : [{ name: '', thumbUrl: '' }]}
        imgUrl={imgUrl}
      />
    </>
  )
}

export default UploadImage
