import { Button } from 'antd';
import React from 'react';

export default function CancelBtn() {
  return (
    <div>
      <Button
        htmlType="submit"
        type="primary"
        className="normal-button mr-5 "
        style={{
          backgroundColor: 'white',
          color: '#FF9138',
          border: '1px solid #FF9138',
        }}
      >
        Hủy
      </Button>
    </div>
  );
}
