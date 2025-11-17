import { request } from '@/utils';
import { useEffect } from 'react';

const Layout = () => {

  useEffect(() => {
    request.get('/user/profile').then(res => {
      console.log(res);
    })
  }, [])

  return (
    <div>
      <h1>Layout</h1>
    </div>
  );
};

export default Layout;