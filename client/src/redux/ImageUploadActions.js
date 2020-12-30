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
import axios from 'axios';

export const getAllImages = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_IMAGE_REQUEST });

    const { data } = await axios.get('/api/images/getAll');

    dispatch({
      type: GET_ALL_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_IMAGE_FAIL,
      payload: error.message,
    });
  }
};

export const getImage = (filename) => async (dispatch) => {
  try {
    dispatch({ type: GET_IMAGE_BY_FILENAME_REQUEST });

    const { data } = await axios.get(`/api/images/${filename}`);

    dispatch({
      type: GET_IMAGE_BY_FILENAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_IMAGE_BY_FILENAME_FAIL,
      payload: error.response.data,
    });
  }
};

export const uploadImage = (image) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const { data } = await axios.post('/api/images/upload', image, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: error.response.data,
    });
  }
};
