import {
  GET_ALL_IMAGE_FAIL,
  GET_ALL_IMAGE_REQUEST,
  GET_ALL_IMAGE_SUCCESS,
  GET_IMAGE_BY_FILENAME_FAIL,
  GET_IMAGE_BY_FILENAME_REQUEST,
  GET_IMAGE_BY_FILENAME_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from './constants';

export const getAllImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_IMAGE_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    case GET_ALL_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getImageReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGE_BY_FILENAME_REQUEST:
      return { ...state, loading: true };
    case GET_IMAGE_BY_FILENAME_SUCCESS:
      return {
        ...state,
        loading: false,
        image: action.payload,
      };
    case GET_IMAGE_BY_FILENAME_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { ...state, loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        imageData: action.payload,
      };
    case UPLOAD_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
