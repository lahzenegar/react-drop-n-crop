/* global FileReader */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';

import bytesToSize from './util/bytesToSize';
import fileSizeLessThan from './util/fileSizeLessThan';
import fileType from './util/fileType';

class DropNCrop extends Component {
  static propTypes = {
    allowedFileTypes: PropTypes.array,
    canvasHeight: PropTypes.string,
    canvasWidth: PropTypes.string,
    className: PropTypes.string,
    cropperOptions: PropTypes.object,
    instructions: PropTypes.node,
    maxFileSize: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.shape({
      result: PropTypes.string,
      filename: PropTypes.string,
      filetype: PropTypes.string,
      src: PropTypes.string,
      error: PropTypes.string,
    }),
  };

  static defaultProps = {
    allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
    canvasHeight: '360px',
    canvasWidth: '100%',
    cropperOptions: {
      guides: true,
      viewMode: 0,
      autoCropArea: 1,
    },
    maxFileSize: 3145728,
  };

  onCrop = () => {
    const { value, onChange } = this.props;

    if (typeof this.cropperRef.getCroppedCanvas() !== 'undefined') {
      onChange({
        ...value,
        result: this.cropperRef.getCroppedCanvas().toDataURL(value.filetype),
      });
    }
  };

  onDrop = files => {
    const { onChange, maxFileSize, allowedFileTypes } = this.props;
    const fileSizeValidation = fileSizeLessThan(maxFileSize)(files);
    const fileTypeValidation = fileType(allowedFileTypes)(files);

    if (fileSizeValidation.isValid && fileTypeValidation.isValid) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          src: reader.result,
          filename: files[0].name,
          filetype: files[0].type,
          result: reader.result,
          error: null,
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      onChange({
        error: !fileTypeValidation.isValid
          ? fileTypeValidation.message
          : !fileSizeValidation.isValid ? fileSizeValidation.message : null, // TODO: Update error state to be an array to handle both messages if necessary
      });
    }
  };

  render() {
    const {
      canvasHeight,
      canvasWidth,
      className,
      cropperOptions,
      instructions,
      allowedFileTypes,
      maxFileSize,
      value,
    } = this.props;

    const dropNCropClasses = {
      'drop-n-crop': true,
      [`${className}`]: className,
    };

    return (
      <div className={classNames(dropNCropClasses)}>
        {value && value.src ? (
          <Cropper
            ref={input => {
              this.cropperRef = input;
            }}
            src={value && value.src}
            style={{
              height: canvasHeight,
              width: canvasWidth,
            }}
            cropend={this.onCrop} // Only use the cropend method- it will reduce the callback/setState lag while cropping
            {...cropperOptions}
          />
        ) : (
          <Dropzone
            className="dropzone"
            activeClassName="dropzone--active"
            onDrop={this.onDrop}
            style={{
              height: canvasHeight,
              width: canvasWidth,
            }}
          >
            <div key="dropzone-instructions">
              {!instructions ? (
                <div className="dropzone-instructions">
                  <div className="dropzone-instructions--main">
                    <svg width="16px" height="16px" viewBox="0 0 24 24">
                      <path
                        fill="#757575"
                        d="M18.5,10.5h-5v-5C13.5,4.7,12.8,4,12,4s-1.5,0.7-1.5,1.5v5h-5C4.7,10.5,4,11.2,4,12s0.7,1.5,1.5,1.5h5v5c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5v-5h5c0.8,0,1.5-0.7,1.5-1.5S19.3,10.5,18.5,10.5z"
                      />
                    </svg>
                    <div>انتخاب تصویر</div>
                  </div>
                  <div className="dropzone-instructions--sub">
                    <div>
                      می‌توانید تصویر مورد نظر را انتخاب و داخل این کادر رها
                      کنید.
                    </div>
                    <div>
                      نوع فایل قابل آپلود
                      <span>
                        {allowedFileTypes
                          .map(mimeType => `.${mimeType.split('/')[1]}`)
                          .join(', ')}
                      </span>
                    </div>
                    <div>
                      حجم مجاز فایل <span>{bytesToSize(maxFileSize)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                instructions
              )}
              {value && value.error ? (
                <div key="dropzone-validation" className="dropzone-validation">
                  {value && value.error}
                </div>
              ) : null}
            </div>
          </Dropzone>
        )}
      </div>
    );
  }
}

export default DropNCrop;
