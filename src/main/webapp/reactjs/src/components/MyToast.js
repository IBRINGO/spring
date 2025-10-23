import React from 'react';
import { Toast } from 'react-bootstrap';


const toastCss = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '1',
    boxShadow: '0px 0px 10px #000000',
    width: '250px'
  };

const MyToast = (MyToastProps) => {
  return (
    <div style={MyToastProps.show ? toastCss : { display: 'none' }}>
      <Toast
        className={`border text-white ${
          MyToastProps.type === 'success'
            ? 'bg-success'
            : MyToastProps.type === 'danger'
            ? 'bg-danger'
            : 'bg-info'
        }`}
        show={MyToastProps.show}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Voiture Shop</strong>
        </Toast.Header>
        <Toast.Body>{MyToastProps.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;
