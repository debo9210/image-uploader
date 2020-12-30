import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from './ImageUpload';
import Uploading from './Uploading';
import UploadSuccess from './UploadSuccess';
import { uploadImage } from '../redux/ImageUploadActions';

const ImageUploader = () => {
  const dispatch = useDispatch();

  const dropArea = useRef(null);
  const imageNameRef = useRef(null);

  const [imageName, setImageName] = useState('');
  const [picture, setPicture] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const { loading, imageData, success, error } = useSelector(
    (state) => state.upload
  );

  const setImageNameHandler = (e) => {
    setImageName(e.target.value);
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.current.classList.add('Highlight');
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.current.classList.remove('Highlight');
  };

  const dropImageHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let file = dt.files;

    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = function () {
      setPicture(reader.result);
    };
    dropArea.current.classList.remove('Highlight');

    let formData = new FormData(); //formdata object
    formData.append('imageUpload', file[0]);
    formData.append('name', imageName);
    setTimeout(() => {
      dispatch(uploadImage(formData));
    }, 3000);
    imageNameRef.current.value = '';
  };

  const inputFileHandler = (e) => {
    e.preventDefault();
    let formData = new FormData(); //formdata object
    formData.append('imageUpload', e.target.files[0]);
    formData.append('name', imageName);
    dispatch(uploadImage(formData));
    imageNameRef.current.value = '';
  };

  const uploadAnother = (e) => {
    window.location.reload();
  };

  useEffect(() => {
    if (error) {
      if (error.name) {
        setErrorMsg(error.name);
      } else if (error.imageUpload) {
        setErrorMsg(error.imageUpload);
      }
    }

    if (imageData) {
      setImageSrc(imageData.image);
    }
  }, [error, imageData]);
  return (
    <div>
      {/* <ImageUpload
        dropAreaRef={dropArea}
        dragEnterHandler={dragEnterHandler}
        dragLeaveHandler={dragLeaveHandler}
        dropImageHandler={dropImageHandler}
        picture={picture}
        inputFileHandler={inputFileHandler}
        setImageNameHandler={setImageNameHandler}
        inputRef={imageNameRef}
        errorMsg={errorMsg}
      /> */}
      {/* <Uploading /> */}
      {/* <UploadSuccess /> */}

      {loading ? (
        <Uploading />
      ) : success ? (
        <UploadSuccess
          uploadedImage={imageSrc}
          imageLink={imageSrc}
          uploadAnotherHandler={uploadAnother}
        />
      ) : (
        <ImageUpload
          dropAreaRef={dropArea}
          dragEnterHandler={dragEnterHandler}
          dragLeaveHandler={dragLeaveHandler}
          dropImageHandler={dropImageHandler}
          picture={picture}
          inputFileHandler={inputFileHandler}
          setImageNameHandler={setImageNameHandler}
          inputRef={imageNameRef}
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
};

export default ImageUploader;
