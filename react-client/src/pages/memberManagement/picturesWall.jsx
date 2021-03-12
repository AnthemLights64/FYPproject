import React from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  // Get the array of names of all the uploaded images
  getImages = () => {
    return this.state.fileList.map(file => file.name);
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // file: Image files for the current operation
  // fileList: An array of all uploaded image file objects
  handleChange = async ({ file, fileList }) => {
    if (file.status==='done') {
      const result = file.response;
      if (result.status===0) {
        message.success("Successfully uploaded the image!");
        const {name, url} = result.data;
        file = fileList[fileList.length-1];
        file.name = name;
        file.url = url;
      } else {
        message.error("Failed to upload image.");
      }
    } else if (file.status==='removed') {
      const result = await reqDeleteImg(file.name);
      if (result.data.status===0) {
        message.success("Successfully deleted the image!");
      } else {
        message.error("Failed to detele the image.");
      }
    }

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/management/member/image/upload" // The address of the uploaded images
          accept="image/*" // Only accept image files
          name="image" // Parameter name of request
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}