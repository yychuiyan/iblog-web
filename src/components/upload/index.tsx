import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogActions from '@/redux/actionCreator';
import InputImage from './InputImage';
const UploadImage: React.FC = (props: any) => {
  // 预览模态框
  const [previewOpen, setPreviewOpen] = useState(false);
  // 预览图片
  const [previewImage, setPreviewImage] = useState('');
  // 预览头部
  const [previewTitle, setPreviewTitle] = useState('');
  // 图片信息
  const [fileList, setFileList] = useState<any>([]);
  // 删除后置空图片链接输入框
  const [imgUrl, setImgUrl] = useState({});
  // 图片赋值
  useEffect(() => {
    setFileList(props.imgUrlArr !== undefined ? props.imgUrlArr : []);
  }, [props.imgUrlArr]);
  // 上传之前的操作
  const beforeUpload = (file: any) => {
    // 上传图片格式
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/jpg' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('只允许上传 JPG/PNG/WEBP/JPG/GIT 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  // 上传操作
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  // 上传图片
  const handleUpload = (data: any) => {
    props.BlogActions.asyncFileUploadAction(data).then((result: any) => {
      message.success('上传成功');
      if (result) {
        props.handleChange(result);
        setFileList([
          {
            name: result.name,
            thumbUrl: result.url,
          },
        ]);
      }
    });
  };

  // 预览
  const handlePreview = (file: any) => {
    setPreviewImage(file.thumbUrl);
    setPreviewTitle(file.name);
    setPreviewOpen(true);
  };
  // 关闭预览
  const handleCancel = () => setPreviewOpen(false);
  // 删除图片
  const hanleRemove = (it: any) => {
    props.handleRemove(it)
    setFileList([]);
    setImgUrl({
      url: '',
    });
  };
  // 赋值上传图片
  const onChangeVal = (data: any) => {
    props.handleChange(data);
    // 截取
    let start = data.indexOf('images');
    let end = data.indexOf('?', start);
    let name = data.substring(start, end);
    setFileList([
      {
        name: name,
        thumbUrl: data,
      },
    ]);
  };
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
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    BlogActions: bindActionCreators(BlogActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(UploadImage);
