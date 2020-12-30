import React, { useRef, useState } from 'react';
import tempImg from '../images/image.svg';

const UploadSuccess = ({ uploadedImage, imageLink, uploadAnotherHandler }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyLinkRef = useRef(null);
  const copied = document.querySelector('.Copied');

  const copyLinkHandler = (e) => {
    copyLinkRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');

    copied.style.display = 'block';
    copied.classList.remove('hidden');

    setTimeout(() => {
      copied.classList.add('hidden');
      copied.style.display = 'none';
    }, 2000);
  };

  return (
    <div className='GeneralContainer SuccessContainer'>
      <div className='IconContainer'>
        <i className='material-icons CheckIcon'>check_circle</i>
      </div>
      <h2 className='SuccessHeading'>Uploaded Successfully!</h2>
      <div className='ImageContainer'>
        <img
          src={uploadedImage ? uploadedImage : tempImg}
          alt='uploaded successfully'
        />
      </div>
      <div className='InputGroup'>
        <input
          className='CopyLink'
          type='text'
          defaultValue={imageLink ? imageLink : null}
          ref={copyLinkRef}
        />
        <button onClick={copyLinkHandler} className='CopyLinkBtn'>
          Copy Link
        </button>
      </div>
      <div className='UploadAgainContainer'>
        <button onClick={uploadAnotherHandler} className='UploadAgainBtn'>
          Upload Another
        </button>
      </div>
      <div className='Copied'>
        <p>{copySuccess}</p>
      </div>
    </div>
  );
};

export default UploadSuccess;
