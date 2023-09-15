import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertaFeedback(props) {

  useEffect(() => {
    props.setShow(false)
    const timer = setTimeout(() => {
      props.setShow(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <Alert key={props.alerta.variant} variant={props.alerta.variant}>
            {props.alerta.message}
        </Alert>
        {/* <Alert onClose={() => props.setShow(false) } dismissible key={props.alerta.variant} variant={props.alerta.variant}>
            {props.alerta.message}
        </Alert> */}
    </>
  );
}

export default AlertaFeedback;
