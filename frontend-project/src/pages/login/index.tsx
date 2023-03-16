import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import qs from "qs";
import type { ValidateErrorEntity } from "rc-field-form/lib/interface";

interface FormValues {
  password?: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios.get('/api/isLogin').then((res) => {
      setIsLogin(!!res.data?.data);
      setLoading(false);
    });
  }, []);

  const onFinish = (values: FormValues) => {
    if (values.password) {
      axios
        .post("/api/login", qs.stringify({ password: values.password }))
        .then((res) => {
          if (res.data?.success) {
            setIsLogin(true);
          }
        });
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<FormValues>) => {
    console.log("Failed:", errorInfo.values.password);
  };

  if (loading) {
    return null;
  }

  if (isLogin) {
    return <Navigate to="/" />
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 600, margin: "100px auto" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
