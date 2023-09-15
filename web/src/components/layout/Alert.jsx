import React from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertaFeedback(props) {


  return (
    <>
        <Alert onClose={() => props.setShow(false) } dismissible key={props.alerta.variant} variant={props.alerta.variant}>
            {props.alerta.message}
        </Alert>
    </>
  );
}

export default AlertaFeedback;
