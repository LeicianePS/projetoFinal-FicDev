import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertaFeedback(props) {

  useEffect(() => {
    setTimeout(() => {
      props.setShow(false);
    }, 2500);

  }, []);

  return (
    <div className='d-flex justify-content-end'>
        <Alert key={props.alerta.variant} variant={props.alerta.variant} className='col-md-6'>
            {props.alerta.message}
        </Alert>


        {/* <Alert onClose={() => props.setShow(false) } dismissible key={props.alerta.variant} variant={props.alerta.variant}>
            {props.alerta.message}
        </Alert> */}
    </div>
  );
}

export default AlertaFeedback;
