import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

const InputImage = (props: any) => {
  // form
  const [form] = Form.useForm();
  // 窗口显示隐藏
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (props.fileList.length > 0) {
      form.setFieldsValue({
        url: props.fileList[0].thumbUrl ? props.fileList[0].thumbUrl : '',
      });
    }
  }, [form, props.fileList, props.imgUrl]);
  // 点击确定
  const onOk = () => {
    let val = form.getFieldsValue();
    props.onChangeVal(val.url);
    setVisible(false);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onVisible = () => {
    setVisible(true);
    if (props.imgUrl.url === '') {
      form.resetFields();
    }
    // 重新赋值
    if (props.fileList.length > 0) {
      form.setFieldsValue({
        url: props.fileList[0].thumbUrl ? props.fileList[0].thumbUrl : '',
      });
    }
  };
  return (
    <div>
      <Button className="btn-input" onClick={onVisible} type="primary">
        输入链接
      </Button>
      <div>
        <Modal
          forceRender
          title={<div style={{ textAlign: 'left' }}>图片链接 </div>}
          open={visible}
          onOk={onOk}
          onCancel={onCancel}
        >
          <Form form={form}>
            <Form.Item
              label="图片链接"
              name="url"
              rules={[{ required: true, message: '请输入图片链接' }]}
            >
              <Input placeholder="请输入图片链接" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default InputImage;
