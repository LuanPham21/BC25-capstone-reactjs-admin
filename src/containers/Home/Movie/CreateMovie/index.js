import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  Switch,
  DatePicker,
} from "antd";
import { actCreateMovie } from "./reducer/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

export default function CreateMovie() {
  const prop = useSelector((state) => state.CreateMovieReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    maNhom: "GP01",
    SapChieu: false,
    DangChieu: false,
    Hot: false,
    danhGia: 0,
    hinhAnh: {},
  });
  const [imgSrc, setImgSrc] = useState("");

  const handleChangeDatePicker = (value) => {
    const ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    setState({
      ...state,
      ngayKhoiChieu,
    });
  };

  const handleChange = (values) => {
    setState({
      ...state,
      ...values,
    });
  };
  console.log(state);

  const handleCreateUser = () => {
    let formData = new FormData();
    for (let key in state) {
      if (key !== "hinhAnh") {
        formData.append(key, state[key]);
      } else {
        formData.append("File", state.hinhAnh, state.hinhAnh.name);
      }
    }
    console.log(formData.get("File"));
    dispatch(actCreateMovie(formData, navigate));
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        //Hình base 64
        setImgSrc(e.target.result);
      };
    }
    setState({
      ...state,
      hinhAnh: file,
    });
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
        Thêm phim
      </Title>
      {renderNoti()}
      <Form.Item
        name="tenPhim"
        label="Tên phim"
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
        name="trailer"
        label="Trailer"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="moTa"
        label="Mô tả"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ngayKhoiChieu"
        label="Ngày khởi chiếu"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item name="DangChieu" label="Đang chiếu">
        <Switch />
      </Form.Item>
      <Form.Item name="SapChieu" label="Sắp chiếu">
        <Switch />
      </Form.Item>
      <Form.Item name="Hot" label="Hot">
        <Switch />
      </Form.Item>
      <Form.Item name="danhGia" label="Số sao">
        <InputNumber min={1} max={10} />
      </Form.Item>
      <Form.Item name="hinhAnh" label="Hình ảnh">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/gif,image/png"
        />

        <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Thêm phim
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
