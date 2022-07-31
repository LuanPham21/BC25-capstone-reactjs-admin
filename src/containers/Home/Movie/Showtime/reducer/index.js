import * as AcionType from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const cumRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case AcionType.CUM_RAP_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case AcionType.CUM_RAP_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case AcionType.CUM_RAP_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const heThongRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case AcionType.HE_THONG_RAP_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case AcionType.HE_THONG_RAP_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case AcionType.HE_THONG_RAP_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const lichChieuReducer = (state = initialState, action) => {
  switch (action.type) {
    case AcionType.TAO_LICH_CHIEU_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case AcionType.TAO_LICH_CHIEU_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case AcionType.TAO_LICH_CHIEU_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export { cumRapReducer, heThongRapReducer, lichChieuReducer };
