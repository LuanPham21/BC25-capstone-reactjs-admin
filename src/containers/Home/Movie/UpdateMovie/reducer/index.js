import * as ActionType from "./constants";

const initialStateUpdate = {
  loading: false,
  data: null,
  error: null,
};
const initialStateGet = {
  loading: false,
  data: null,
  error: null,
};

const UpdateMovieReducer = (state = initialStateUpdate, action) => {
  switch (action.type) {
    case ActionType.UPDATE_MOVIE_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.UPDATE_MOVIE_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.UPDATE_MOVIE_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

const GetMovieReducer = (state = initialStateGet, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIE_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_MOVIE_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_MOVIE_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export { GetMovieReducer, UpdateMovieReducer };
