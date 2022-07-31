import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actCreateUser } from "./reducer/action";
import { useNavigate, Link } from "react-router-dom";

export default function CreateUser() {
  const prop = useSelector((state) => state.CreateUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
  });

  const handleChange = (values) => {
    console.log(values);
    setState({
      ...state,
      ...values,
    });
  };

  const handleCreateUser = () => {
    dispatch(actCreateUser(state, navigate));
  };

  const renderNoti = () => {
    const { error } = prop;
    return (
      error && (
        <div className="alert alert-danger">{error.response.data.content}</div>
      )
    );
  };

  const { Option } = Select;
  const { Title } = Typography;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} không được bỏ trống!",
    types: {
      email: "${label} không đúng định dạng email!",
      number: "${label} không đúng định dạng số!",
    },
    number: {
      range: "${label} phải từ ${min} đến ${max} chữ số",
    },
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={handleCreateUser}
      onValuesChange={handleChange}
      validateMessages={validateMessages}
    >
      <Title className="text-center" level={3}>
        Tạo thông tin người dùng
      </Title>
      {renderNoti()}
      <Form.Item
        name="taiKhoan"
        label="Tài khoản"
        rules={[
          {
            required: true,
            min: 0,
            max: 99,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="hoTen"
        label="Họ tên"
        rules={[
          {
            required: true,
            min: 0,
            max: 99,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
            min: 0,
            max: 99,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="soDT"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            min: 0,
            max: 99,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="matKhau"
        label="Mật khẩu"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="maLoaiNguoiDung"
        label="Loại người dùng"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Chọn loại người dùng" allowClear>
          <Option value="QuanTri">Quản trị</Option>
          <Option value="KhachHang">Khách hàng</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Tạo tài khoản
        </Button>
      </Form.Item>
      <Link to="/user">
        <Button danger style={{ color: "#1890ff" }} type="text">
          Quay lại
        </Button>
      </Link>
    </Form>
  );
}
