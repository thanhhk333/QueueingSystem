import React from 'react';
import Icon from '@ant-design/icons';
const saveSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.89 5.88086H5.10999C3.39999 5.88086 2 7.28084 2 8.99084V20.3509C2 21.8009 3.04 22.4208 4.31 21.7108L8.23999 19.5208C8.65999 19.2908 9.34 19.2908 9.75 19.5208L13.68 21.7108C14.95 22.4208 15.99 21.8009 15.99 20.3509V8.99084C16 7.28084 14.6 5.88086 12.89 5.88086Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 8.99084V20.3509C16 21.8009 14.96 22.4108 13.69 21.7108L9.76001 19.5208C9.34001 19.2908 8.65999 19.2908 8.23999 19.5208L4.31 21.7108C3.04 22.4108 2 21.8009 2 20.3509V8.99084C2 7.28084 3.39999 5.88086 5.10999 5.88086H12.89C14.6 5.88086 16 7.28084 16 8.99084Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const SaveIcon = props => <Icon component={saveSvg} {...props} />;
export default SaveIcon;
