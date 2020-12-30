import React from 'react';
import ImageLogo from '../images/image.svg';

const ImageUpload = ({
  dropAreaRef,
  dragEnterHandler,
  dragLeaveHandler,
  dropImageHandler,
  picture,
  inputFileHandler,
  setImageNameHandler,
  inputRef,
  errorMsg,
}) => {
  const ERROR = <span style={{ color: 'tomato' }}>{errorMsg}</span>;

  return (
    <div className='GeneralContainer'>
      <h2 className='HeadingStatus'>Upload your image</h2>
      <p className='FileType'>File should be Jpeg, Jpg, Png,...</p>
      <div className='ImageNameContainer'>
        <input
          className='ImageName'
          type='text'
          placeholder='Enter image name'
          onChange={setImageNameHandler}
          ref={inputRef}
        />
        <small className='Required'>{errorMsg ? ERROR : '* required'}</small>
      </div>
      <div
        className='DropContainer'
        onDragEnter={dragEnterHandler}
        onDragOver={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropImageHandler}
        ref={dropAreaRef}
      >
        <div className='ImgLogoContainer'>
          <div>
            <img
              className='ImgLogo'
              src={picture ? picture : ImageLogo}
              alt='example'
            />
          </div>
          <p className='DragInstruction'>Drag & Drop your image here</p>
        </div>
      </div>
      <p className='Or'>Or</p>
      <div className='BtnContainer'>
        <div>
          <label htmlFor='file-upload' className='FileBtn'>
            Choose a file
          </label>
          <input
            id='file-upload'
            type='file'
            name='imageUpload'
            onChange={inputFileHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
