import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Button,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actListUser } from "./reducer/action";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function ListUser() {
  const loading = useSelector((state) => state.ListUserReducer.loading);
  const dataListUser = useSelector((state) => state.ListUserReducer.data);
  const originData = [];

  const dispatch = useDispatch();

  dataListUser?.map((user, index) => {
    originData?.push({
      stt: `${index + 1}`,
      taiKhoan: `${user.taiKhoan}`,
      hoTen: `${user.hoTen}`,
      email: `${user.email}`,
      soDT: `${user.soDT}`,
    });
  });

  useEffect(() => {
    dispatch(actListUser());
  }, []);

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const { Search } = Input;

  const onSearch = (value) => {
    console.log(value);
    dispatch(actListUser(value));
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;
  const { Title } = Typography;

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "10%",
      editable: true,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: "15%",
      editable: true,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      width: "15%",
      editable: true,
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Link to={`updateuser/${record.taiKhoan}`}>
            <Typography.Link>Sửa</Typography.Link>
          </Link>
        );
      },
    },
  ];
  const mergedColumns = columns?.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col?.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Title className="text-center" level={3}>
        Danh sách thông tin người dùng
      </Title>
      <Link to="/user/createuser">
        <Button type="primary" className="mb-3">
          Tạo tài khoản
        </Button>
      </Link>
      <Search
        placeholder="Nhập thông tin người dùng..."
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={originData || {}}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{}}
      />
    </Form>
  );
}
