import Alert from 'react-bootstrap/Alert';

const AlertEvent = (heading, description, setAlert) => {


    return (
        <Alert variant="warning" 
            style={{position:'absolute', display:'flex', justifyContent:'center', flexDirection:'column',
            zIndex:400, top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            textAlign: 'center',
            width:'350px',
            height:'210px'}}>
            <Alert.Heading>{heading}</Alert.Heading>
            <hr />
            <p>{description}</p>
            <div className="d-flex justify-content-end">
            <Button onClick={() => setAlert} variant="outline-success">
                Close
            </Button>
            </div>
        </Alert>
    );
}

export default AlertEvent;