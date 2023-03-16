import { Button } from "antd";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios.get('/api/isLogin').then((res: AxiosResponse<API.Result<API.IsLogin>>) => {
      setIsLogin(!!res.data?.data);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    axios.get('/api/logout').then((res) => {
      if (res.data?.success) {
        setIsLogin(false);
      }
    });
  }

  if (loading) {
    return null;
  }

  if (isLogin) {
    return (
      <div style={{ margin: "100px auto", textAlign: "center" }}>
        <Button type="primary" style={{ marginRight: 24 }}>
          爬取内容
        </Button>
        <Button type="primary" style={{ marginRight: 24 }}>
          显示内容
        </Button>
        <Button type="primary" onClick={handleLogout}>退出</Button>
      </div>
    );
  }

  return <Navigate to="/login" />
}

export default Home;
