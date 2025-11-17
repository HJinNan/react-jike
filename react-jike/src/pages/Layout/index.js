import { Layout, Menu, Popconfirm } from 'antd';
import { 
  HomeOutlined, 
  DiffOutlined, 
  EditOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';  // 修正图标导入路径和拼写
import './index.scss';  // 补充分号
import { Outlet } from 'react-router-dom';

const { Header, Sider } = Layout;  // 修正等号前后空格

// 修正菜单项数组格式（补充逗号、引号和对象结构）
const menuItems = [
  {
    label: '首页',  // 补充引号和逗号
    key: '1',
    icon: <HomeOutlined />,  // 修正图标组件名拼写（Home0utlined → HomeOutlined）
  },
  {
    label: '文章管理',
    key: '2',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '3',
    icon: <EditOutlined />,
  },
  // 可以补充退出登录的菜单项（使用 LogoutOutlined）
  {
    label: '退出登录',
    key: '4',
    icon: <LogoutOutlined />,
  }
];

const GeekLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header className="header">
        <div className="logo"/>
        <div className="user-info">
          <span className="user-name">柴柴老师</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出?"
              okText="退出"
              cancelText="取消"
              // onConfirm={handleLogout}
              placement="bottomRight"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>

      {/* 主体内容区 */}
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          theme="dark"
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            items={menuItems}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>
        <Layout className="layout-content" style={{padding: 20}}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout;