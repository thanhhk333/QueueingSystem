import { Button } from 'antd';
import React from 'react';

export default function Submitbtn({ title }) {
  return (
    <div>
      <Button
        htmlType="submit"
        type="primary"
        className="normal-button"
        style={{
          backgroundColor: '#FF9138',
          color: '#fff',
          border: '1px solid #FF9138',
        }}
      >
        {title}
      </Button>
    </div>
  );
}
