import * as ActionType from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const initialStateDelete = {
  loading: false,
  data: null,
  error: null,
};

const ListMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_MOVIE_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.LIST_MOVIE_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.LIST_MOVIE_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

const DeleteMovieReducer = (state = initialStateDelete, action) => {
  switch (action.type) {
    case ActionType.DELETE_MOVIE_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.DELETE_MOVIE_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.DELETE_MOVIE_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export { ListMovieReducer, DeleteMovieReducer };
