import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

export const actCreateMovie = (movie, navigate) => {
  return (dispatch) => {
    dispatch(actCreateMovieRequest);
    api
      .post("QuanLyPhim/ThemPhimUploadHinh", movie)
      .then((result) => {
        dispatch(actCreateMovieSuccess(result.data.content));

        alert("Thêm phim thành công");

        //Redirect to /admin
        navigate("/movie", { replace: true });
      })
      .catch((error) => {
        dispatch(actCreateMovieFailed(error));
      });
  };
};

export const actCreateMovieRequest = () => {
  return {
    type: ActionType.CREATE_MOVIE_REQUEST,
  };
};

export const actCreateMovieSuccess = (data) => {
  return {
    type: ActionType.CREATE_MOVIE_SUCCESS,
    payload: data,
  };
};

export const actCreateMovieFailed = (data) => {
  return {
    type: ActionType.CREATE_MOVIE_FAILED,
    payload: data,
  };
};
