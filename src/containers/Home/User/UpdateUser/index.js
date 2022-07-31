import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import Loader from "components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { actGetUser, actUpdateUser } from "./reducer/action";

export default function UpdateUser() {
  const prop = useSelector((state) => state.UpdateUserReducer);
  const loading = useSelector((state) => state.GetUserReducer.loading);
  const data = useSelector((state) => state.GetUserReducer.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editstate, editsetState] =
    useState({
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    }) || {};

  useEffect(() => {
    if (data) {
      editsetState({
        taiKhoan: data.taiKhoan,
        matKhau: data.matKhau,
        email: data.email,
        soDt: data.soDt,
        maNhom: "GP01",
        maLoaiNguoiDung: data.maLoaiNguoiDung,
        hoTen: data.hoTen,
      });
    }
  }, [data]);

  const param = useParams();
  useEffect(() => {
    dispatch(actGetUser(param.id));
    editsetState(data);
  }, []);

  if (!data) return <Loader />;
  const handleChange = (values) => {
    editsetState({
      ...editstate,
      ...values,
    });
  };

  const handleEditUser = () => {
    dispatch(actUpdateUser(editstate, navigate));
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
      onFinish={handleEditUser}
      onValuesChange={handleChange}
      onFieldsChange={editstate}
      validateMessages={validateMessages}
      initialValues={editstate}
    >
      <Title className="text-center" level={3}>
        Cập nhật thông tin người dùng
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
        <Input value={editstate?.taiKhoan} />
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
          Sửa tài khoản
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
