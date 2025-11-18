import { Link } from 'react-router-dom';
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, message, Popconfirm } from 'antd';
import locale from 'dayjs/plugin/buddhistEra';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useChannel } from '@/hooks/useChannel';
import { getArticleList,deleteArticle } from '@/apis/article';
import { useState,useEffect } from 'react';
import img404 from '@/assets/error.png'
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate();
  const status = {
    1: <Tag color='warning'>待审核</Tag>,
    2: <Tag color='success'>审核通过</Tag>,
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" onClick={() => navigate(`/publish/${data.id}`)} icon={<EditOutlined />} />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
 const data = [
  {
    id: 'art-001',
    title: 'Vue3 + Vite 项目性能优化与最佳实践',
    status: 1, // 待审核
    pubdate: '2023-11-10 10:25:30',
    read_count: 892,
    comment_count: 23,
    like_count: 67,
    cover: {
      type: 1, // 单图
      images: ['https://picsum.photos/id/26/400/300']
    }
  },
  {
    id: 'art-002',
    title: 'Node.js 后端接口设计与安全防护',
    status: 2, // 审核通过
    pubdate: '2023-11-05 16:40:15',
    read_count: 1532,
    comment_count: 58,
    like_count: 142,
    cover: {
      type: 3, // 三图
      images: [
        'https://picsum.photos/id/42/400/300',
        'https://picsum.photos/id/43/400/300',
        'https://picsum.photos/id/44/400/300'
      ]
    }
  },
  {
    id: 'art-003',
    title: 'TypeScript 类型系统进阶：泛型与条件类型',
    status: 1, // 待审核
    pubdate: '2023-11-01 09:12:08',
    read_count: 645,
    comment_count: 17,
    like_count: 39,
    cover: {
      type: 0, // 无图
      images: []
    }
  }
];
  const [count,setCount] = useState(0);
  const { channelList } = useChannel();
  const [list,setList] = useState([]);
  const [reqData,setReqData] = useState({
    page: 1,
    per_page: 4,
    channel_id: '',
    status: '',
    begin_pubdate: '',
    end_pubdate: ''
  });

  const onFinish = (formVal) => {
    console.log(formVal);
    setReqData({
      ...reqData,
      ...formVal,
      begin_pubdate: formVal[0].format('YYYY-MM-DD'),
      end_pubdate: formVal[1].format('YYYY-MM-DD'),
    })


  }

  async function onConfirm(data) {
    deleteArticle(data.id).then(res => {
      console.log(res,152);
      
      if(res.data.message === "OK"){
        message.success('删除成功');
        setReqData({
          ...reqData,
        })
      }
    })
  }

  useEffect(() => {
    async function getList() {
      const res = await getArticleList(reqData);
        setList(res.data.data.results);
        setCount(res.data.data.total_count);
    }
    getList();
  },[reqData])

  function onPageChange(page) {
    setCount(page);
    setReqData({
      ...reqData,
      page,
    })
  } 

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' } 
          ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form 
          initialValues={{ status: null }}
          onFinish={onFinish}
        >
          <Form.Item label="状态" name="status"> 
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channelId"> 
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            > 
              {channelList.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={
          {
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange
          }
        } />
      </Card>
    </div>
  );
};


export default Article;