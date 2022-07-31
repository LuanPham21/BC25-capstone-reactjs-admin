import { combineReducers } from "redux";
import LoginAuthReducer from "containers/AuthPage/LoginPage/reducer";
import ListUserReducer from "containers/Home/User/ListUser/reducer";
import CreateUserReducer from "containers/Home/User/CreateUser/reducer";
import {
  GetUserReducer,
  UpdateUserReducer,
} from "containers/Home/User/UpdateUser/reducer";

import {
  ListMovieReducer,
  DeleteMovieReducer,
} from "containers/Home/Movie/ListMovie/reducer";
import CreateMovieReducer from "containers/Home/Movie/CreateMovie/reducer";
import {
  GetMovieReducer,
  UpdateMovieReducer,
} from "containers/Home/Movie/UpdateMovie/reducer";
import {
  cumRapReducer,
  heThongRapReducer,
  lichChieuReducer,
} from "containers/Home/Movie/Showtime/reducer";

const rootReducer = combineReducers({
  LoginAuthReducer,
  ListUserReducer,
  DeleteMovieReducer,
  CreateUserReducer,
  GetUserReducer,
  UpdateUserReducer,
  ListMovieReducer,
  CreateMovieReducer,
  GetMovieReducer,
  UpdateMovieReducer,
  cumRapReducer,
  heThongRapReducer,
  lichChieuReducer,
});

export default rootReducer;
