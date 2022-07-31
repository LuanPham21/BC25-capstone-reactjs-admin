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

const UpdateUserReducer = (state = initialStateUpdate, action) => {
  switch (action.type) {
    case ActionType.UPDATE_USER_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.UPDATE_USER_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.UPDATE_USER_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

const GetUserReducer = (state = initialStateGet, action) => {
  switch (action.type) {
    case ActionType.GET_USER_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_USER_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_USER_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export { UpdateUserReducer, GetUserReducer };
