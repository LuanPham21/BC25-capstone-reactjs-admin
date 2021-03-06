import React, { useState, useEffect } from "react";
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
import { useFormik } from "formik";
import Loader from "components/Loader";
import { actGetMovie, actUpdateMovie } from "./reducer/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import moment from "moment";

export default function UpdateMovie() {
  const prop = useSelector((state) => state.UpdateMovieReducer);
  const loading = useSelector((state) => state.GetMovieReducer.loading);
  const data = useSelector((state) => state.GetMovieReducer.data);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: data?.maPhim,
      tenPhim: data?.tenPhim,
      trailer: data?.trailer,
      moTa: data?.moTa,
      ngayKhoiChieu: data?.ngayKhoiChieu,
      maNhom: "GP01",
      SapChieu: data?.sapChieu,
      DangChieu: data?.dangChieu,
      Hot: data?.hot,
      danhGia: data?.danhGia,
      hinhAnh: null,
    },
  });
  // console.log(moment(formik.values.ngayKhoiChieu));
  const param = useParams();
  useEffect(() => {
    dispatch(actGetMovie(param.id));
  }, []);

  useEffect(() => {
    if (data) {
      setState({
        maPhim: data?.maPhim,
        tenPhim: data?.tenPhim,
        trailer: data?.trailer,
        moTa: data?.moTa,
        ngayKhoiChieu: data?.ngayKhoiChieu,
        maNhom: "GP01",
        SapChieu: data?.sapChieu,
        DangChieu: data?.dangChieu,
        Hot: data?.hot,
        danhGia: data?.danhGia,
        hinhAnh: null,
      });
    }
  }, [data]);

  const handleChangeDatePicker = (value) => {
    const ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    setState({
      ...state,
      ngayKhoiChieu,
    });
    console.log(ngayKhoiChieu);
  };

  const handleChange = (values) => {
    setState({
      ...state,
      ...values,
    });
  };
  console.log(state);

  const handleEditMovie = () => {
    let formData = new FormData();
    for (let key in state) {
      if (key !== "hinhAnh") {
        formData.append(key, state[key]);
      } else {
        if (state.hinhAnh !== null) {
          formData.append("File", state.hinhAnh, state.hinhAnh.name);
        }
      }
    }
    console.log(formData.get("File"));
    console.log(state);
    dispatch(actUpdateMovie(formData, navigate));
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //T???o ?????i t?????ng ????? ?????c file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        //H??nh base 64
        setImgSrc(e.target.result);
      };
    }
    setState({
      ...state,
      hinhAnh: file,
    });
  };

  const renderNoti = () => {
    // const { error } = prop;
    // return (
    //   error && (
    //     <div className="alert alert-danger">{error.response.data.content}</div>
    //   )
    // );
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
    required: "${label} kh??ng ???????c b??? tr???ng!",
    types: {
      email: "${label} kh??ng ????ng ?????nh d???ng email!",
      number: "${label} kh??ng ????ng ?????nh d???ng s???!",
    },
    number: {
      range: "${label} ph???i t??? ${min} ?????n ${max} ch??? s???",
    },
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onValuesChange={handleChange}
      onFinish={handleEditMovie}
      validateMessages={validateMessages}
      initialValues={formik.values}
    >
      <Title className="text-center" level={3}>
        C???p nh???t th??ng tin phim
      </Title>
      {renderNoti()}
      <Form.Item
        name="tenPhim"
        label="T??n phim"
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
        label="M?? t???"
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
        label="Ng??y kh???i chi???u"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker
          format={"DD/MM/YYYY"}
          onChange={handleChangeDatePicker}
          value={moment(state.ngayKhoiChieu)}
        />
      </Form.Item>
      <Form.Item
        name="DangChieu"
        label="??ang chi???u"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Switch checked={state.DangChieu} />
      </Form.Item>
      <Form.Item
        name="SapChieu"
        label="S???p chi???u"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Switch checked={state.SapChieu} />
      </Form.Item>
      <Form.Item
        name="Hot"
        label="Hot"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Switch checked={state.Hot} />
      </Form.Item>
      <Form.Item
        name="danhGia"
        label="S??? sao"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={1} max={10} />
      </Form.Item>
      <Form.Item name="hinhAnh" label="H??nh ???nh">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/gif,image/png"
        />

        <img
          style={{ width: 150, height: 150 }}
          src={imgSrc === "" ? data?.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          C???p nh???t phim
        </Button>
      </Form.Item>
      <Link to="/user">
        <Button danger style={{ color: "#1890ff" }} type="text">
          Quay l???i
        </Button>
      </Link>
    </Form>
  );
}
