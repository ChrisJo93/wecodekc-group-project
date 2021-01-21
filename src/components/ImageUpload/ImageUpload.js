import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import './ImageUpload.css';

//material ui imports
import { Typography } from '@material-ui/core';

class ImageUpload extends Component {
  state = {
    image: '',
  };

  handleFinishedUpload = (info) => {
    console.log('File uploaded with filename', info.filename);
    console.log('Access it on s3 at', info.fileUrl);
    this.setState(
      {
        image: info.fileUrl,
      },
      () => {
        console.log(this.state);
      }
    );

    this.props.dispatch({
      type: 'POST_IMAGE_URL',
      payload: { link: info.fileUrl },
    });
  };

  handleImageUpload = (property) => {
    console.log(property);
  };

  render() {
    const dropStyles = {
      width: '200px',
      height: '200px',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '100%',
    };

    const innerDropElement = (
      <div className="innerDrop">
        <Typography>Upload a profile picture</Typography>
        <img src={this.state.image} />
      </div>
    );

    const uploadOptions = {
      server: 'http://localhost:5000',
      // signingUrlQueryParams: { uploadType: 'avatar' },
    };
    const s3Url = 'https://wecodekc.s3.amazonaws.com';

    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
        style={dropStyles}
        children={innerDropElement}
        imageComponent={this.handleImageUpload}
      />
    );
  }
}

export default connect()(ImageUpload);
