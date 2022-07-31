import React, { useEffect } from "react";
import { Select, Button, Form, InputNumber, DatePicker } from "antd";
import {
  actGetCumRap,
  actGetHeThongRap,
  actGetTaoLichChieu,
} from "./reducer/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";

export default function Showtime() {
  const dataHTR = useSelector((state) => state.heThongRapReducer.data);
  const dataCR = useSelector((state) => state.cumRapReducer.data);
  const dispatch = useDispatch();
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: (values) => {
      dispatch(actGetTaoLichChieu(values));
      alert("Đã tạo lịch chiếu");
    },
  });

  useEffect(() => {
    dispatch(actGetHeThongRap());
  }, []);

  let record = {};
  if (localStorage.getItem("recordParams")) {
    record = JSON.parse(localStorage.getItem("recordParams"));
  }

  const handleChangeHeThongRap = (values) => {
    return dataHTR?.map((item) => {
      return item.maHeThongRap === values
        ? dispatch(actGetCumRap(item.maHeThongRap))
        : values;
    });
  };

  const handleChangeCumRap = (values) => {
    formik.setFieldValue("maRap", values);
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeInputNumber = (values) => {
    formik.setFieldValue("giaVe", values);
  };

  const convertSelectHTR = () => {
    return dataHTR?.map((cinema) => {
      return { label: cinema.tenHeThongRap, value: cinema.maHeThongRap };
    });
  };

  const convertSelectCR = () => {
    return dataCR?.map((cinema) => {
      return { label: cinema.tenCumRap, value: cinema.maCumRap };
    });
  };

  return (
    <Form
      style={{ position: "relative" }}
      name="basic"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 6,
      }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-center">
        Tạo lịch chiếu: <p className="text-2xl">{params.tenphim}</p>{" "}
      </h3>
      <img
        src={record.hinhAnh}
        alt={record.hinhAnh}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://picsum.photos/200";
        }}
        style={{
          width: "300px",
          height: "auto",
          position: "absolute",
          top: "-5%",
          left: "120px",
        }}
      />
      <Form.Item label="Hệ thống rạp">
        <Select
          options={convertSelectHTR()}
          onChange={handleChangeHeThongRap}
          placeholder="Please select"
        />
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select
          options={convertSelectCR()}
          onChange={handleChangeCumRap}
          placeholder="Please select"
        />
      </Form.Item>

      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker
          format="DD/MM/YYYY hh:mm:ss"
          showTime
          onChange={onChangeDate}
          onOk={onOk}
        />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber
          min={75000}
          onChange={onChangeInputNumber}
          prefix="₫"
          style={{
            width: "40%",
          }}
        />
      </Form.Item>

      <Form.Item label="Chức năng">
        <Button htmlType="submit">Tạo lịch chiếu</Button>
      </Form.Item>
    </Form>
  );
}
