import { useState, useEffect } from 'react';
import { getChannelList } from '@/apis/article';
import { message } from 'antd';

function useChannel() {
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    getChannelList()
      .then(res => {
        setChannelList(res.data.data.channels);
      })
      .catch(err => {
        message.error('获取频道列表失败，请重试');
      });
  }, []);
  return { channelList };
}

export { useChannel };