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
  Image,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actListMovie, actDeleteMovie } from "./reducer/action";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function ListMovie() {
  const loading = useSelector((state) => state.ListMovieReducer.loading);
  const dataListMovie = useSelector((state) => state.ListMovieReducer.data);
  const props = useSelector((state) => state.DeleteMovieReducer);
  const originData = [];
  const [visible, setVisible] = useState(false);
  const [deleteMovie, setdeleteMovie] = useState();
  const [modalText, setModalText] = useState("Content of the modal");

  const dispatch = useDispatch();

  dataListMovie?.map((movie, index) => {
    originData?.push({
      key: index,
      maPhim: `${movie.maPhim}`,
      hinhAnh: `${movie.hinhAnh}`,
      tenPhim: `${movie.tenPhim}`,
      moTa: `${movie.moTa}`,
    });
  });

  useEffect(() => {
    dispatch(actListMovie());
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
    const inputNode =
      inputType === "hinhAnh" ? (
        <Image width={200} height={200} src={dataIndex} />
      ) : (
        <Input />
      );
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

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;
  const { Title } = Typography;

  const showModal = (maPhim) => {
    const movie = originData?.find((item) => item.maPhim === maPhim);

    if (movie) {
      setdeleteMovie(movie);
      setVisible(true);
      setModalText(`Bạn có chắc muốn xoá movie ${movie.tenPhim}`);
    }
  };

  const { Search } = Input;

  const onSearch = (value) => {
    console.log(value);
    dispatch(actListMovie(value));
  };
  const handleOk = () => {
    console.log(deleteMovie.maPhim);
    dispatch(actDeleteMovie(deleteMovie.maPhim));
    setVisible(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      width: "10%",
      editable: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: "15%",
      editable: true,
      render: (hinhAnh) => <Image width={200} height={200} src={hinhAnh} />,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      width: "15%",
      editable: true,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      width: "50%",
      editable: true,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <>
            <Link to={`updatemovie/${record.maPhim}`}>
              <Typography.Link>Sửa</Typography.Link>
            </Link>
            <Typography.Link
              className="ml-4"
              onClick={() => showModal(record.maPhim)}
            >
              Xoá
            </Typography.Link>
          </>
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
        inputType: col.dataIndex === "hinhAnh" ? "number" : "text",
        dataIndex: col?.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <Form form={form} component={false}>
        <Title className="text-center" level={3}>
          Quản lý phim
        </Title>
        <Link to="/movie/createmovie">
          <Button type="primary" className="mb-3">
            Thêm phim
          </Button>
        </Link>
        <Search
          placeholder="Nhập tên phim..."
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
      <Modal
        title="Xoá phim"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
