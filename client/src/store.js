import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getAllImagesReducer,
  getImageReducer,
  uploadImageReducer,
} from './redux/ImageUploadReducers';

const reducers = combineReducers({
  allImages: getAllImagesReducer,
  image: getImageReducer,
  upload: uploadImageReducer,
});

const initialState = {};

const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, devTools);

export default store;
