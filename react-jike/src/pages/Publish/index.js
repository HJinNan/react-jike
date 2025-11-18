import { 
  Card, 
  Breadcrumb, 
  Form, 
  Button, 
  Input, 
  Select, 
  Space, 
  message,
  Radio,
  Upload
} from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import {createArticle} from '@/apis/article';
import { PlusOutlined } from '@ant-design/icons';
import { useChannel } from '@/hooks/useChannel';
import { getArticleDetail, updateArticle } from '@/apis/article';
import { useSearchParams } from 'react-router-dom';



// 注意：Select 的 Option 组件需要正确解构（是 Option 不是 0ption）
const { Option } = Select;

const Publish = () => {
  const { channelList } = useChannel();
  const [imageList, setImageList] = useState([]);
  const [imageType, setImageType] = useState(0);

  const onFinish = (formValues) => {
    console.log(imageList.length,imageType,33);
    if(imageType> 0 && imageList.length !== imageType){
      message.warning(`请上传${imageType}张图片`);
      return;
    }
    const { title, content, channel_id } = formValues;
    const reqData ={
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => {
          if(item.response){
            return item.response.data.url;
          }else{
            return item.url;
          }
        }),
      },
      channel_id,
    }
    if(articleId){
      updateArticle({reqData, id: articleId}).then(res => {
        message.success('文章更新成功！');
      })
    }else{
      createArticle(reqData).then(res => {
        message.success('文章发布成功！');
      })
    }
  }

  const onChangeUpload = (info) => {
    console.log('正在上传中',info);
    const { fileList } = info;
    if(imageType === 0){
      setImageList([]);
      return;
    }
    setImageList(fileList);
  }

  const onChangeType = (e) => {
    const { value } = e.target;
    setImageType(value);
  }

  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  const [form] = Form.useForm();
  useEffect(() => {
      async function getArticleDetailFun(){
        const res = await getArticleDetail(articleId);
        const data = res.data
        console.log(res, 80);
        form.setFieldsValue({
          ...data,
          type: data.cover.type,
        });
        setImageType(data.cover.type);
        setImageList(data.cover.images.map(url => ({ url })));
      }
      if(articleId)getArticleDetailFun();
  },[articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: articleId ? '编辑文章' : '发布文章' }
          ]} />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }} // 修正语法错误（f 改为 {）
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title" // 修正引号和拼写
            rules={[{ required: true, message: '请输入文章标题' }]} // 修正中文逗号
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]} // 修正数组语法和中文逗号
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                channelList.map(item => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item label="封面">
          <Form.Item name="type">
            <Radio.Group onChange={onChangeType}>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>
          </Form.Item>
            {
              imageType > 0 && (
                <Upload
                  listType="picture-card"
                  showUploadList
                  action={'http://geek.itheima.net/v1_0/upload'}
                  name='image'
                  onChange={onChangeUpload}
                  maxCount={imageType}
                  fileList={imageList}
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>
              )
            }
          </Form.Item>

          <Form.Item
            label="内容"
            name="content" // 修正拼写和引号
            rules={[{ required: true, message: '请输入文章内容' }]} // 修正中文引号和语法
          >
            {/* 这里可以添加内容输入组件，例如 Input.TextArea */}
            <ReactQuill
              className='publish-quill'
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '更新文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;