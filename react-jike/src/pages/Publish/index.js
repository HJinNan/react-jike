import { 
  Card, 
  Breadcrumb, 
  Form, 
  Button, 
  Input, 
  Select, 
  Space, 
  message
} from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { getChannelList } from '@/apis/article';
import {createArticle} from '@/apis/article';



// 注意：Select 的 Option 组件需要正确解构（是 Option 不是 0ption）
const { Option } = Select;

const Publish = () => {
  const [channelList, setChannelList] = useState([]);

  const onFinish = (formValues) => {
    console.log(formValues);
    const { title, content, channel_id } = formValues;
    const reqData ={
      title,
      content,
      cover: {
        type: 0,
        images: []
      },
      channel_id,
    }
    createArticle(reqData)
      .then(res => {
        message.success('文章发布成功！');
      })
      .catch(err => {
        message.error('文章发布失败，请重试');
      });
  }

  useEffect(() => {
    getChannelList().then(res => {
      setChannelList(res.data.data.channels);
    })
  }, []);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' }
          ]} />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }} // 修正语法错误（f 改为 {）
          initialValues={{ type: 1 }}
          onFinish={onFinish}
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
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;