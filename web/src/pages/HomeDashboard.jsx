import { Card, Container, Row, Col } from "react-bootstrap";
import BatalhoesCRChart from "../components/dashboard/BatalhoesCRChart";
import EfetivoCRChart from "../components/dashboard/EfetivoCRChat";
import { useEffect, useState } from "react";
import { getBatalhoesTotal, getEfetivoTotal } from "../services/batalhao-service";


export function HomeDashboard(){
    const [batalhoesTotal, setBatalhoesTotal] = useState([]);
    const [efetivoTotal, setEfetivoTotal] = useState([]);

    useEffect(() => {
        findBatalhoesTotal();
        findEfetivoTotal();
        // eslint-disable-next-line
    }, []);

    async function findBatalhoesTotal() {
        try {
            const result = await getBatalhoesTotal();
            setBatalhoesTotal(result.data[0]);
            //console.log("AQUI: ",efetivoTotal.somaEfetivo)
        } catch (error) {
            console.error(error);
            //navigate('/');
        }
    }

    async function findEfetivoTotal() {
        try {
            const result = await getEfetivoTotal();
            setEfetivoTotal(result.data[0]);
            //console.log("AQUI: ",efetivoTotal.somaEfetivo)
        } catch (error) {
            console.error(error);
            //navigate('/');
        }
    }

    return(
        <Container fluid className="cor-page min-height ">
    
            {/* <Card style={{ width: '15rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card> */}
            <Row className="d-flex justify-content-between p-3">
                <Row className="d-flex justify-content-between col-6">
                    <Row>
                        <Col>
                            <Card
                                key='dark'
                                style={{ width: '15rem' }}
                                className="mb-2"
                                bg="dark"
                                text="light"
                                >
                                <Card.Header className="d-flex justify-content-center"><Card.Title> Número de Batalhões</Card.Title></Card.Header>
                                <Card.Body>
                                    
                                    <Card.Text className="d-flex justify-content-center" >
                                        <h1>{batalhoesTotal.somaBatalhao}</h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                key='dark'
                                style={{ width: '15rem' }}
                                className="mb-2"
                                bg="dark"
                                text="light"
                                >
                                <Card.Header className="d-flex justify-content-center"><Card.Title> Efetivo total </Card.Title></Card.Header>
                                <Card.Body>
                                    
                                    <Card.Text className="d-flex justify-content-center" >
                                        <h1>{efetivoTotal.somaEfetivo}</h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Card
                                key='dark'
                                style={{ width: '15rem' }}
                                className="mb-2"
                                bg="dark"
                                text="light"
                                >
                                <Card.Header className="d-flex justify-content-center"><Card.Title> 1x2 Informação</Card.Title></Card.Header>
                                <Card.Body>
                                    
                                    <Card.Text className="d-flex justify-content-center" >
                                        <h1>{batalhoesTotal.somaBatalhao}</h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                key='dark'
                                style={{ width: '15rem' }}
                                className="mb-2"
                                bg="dark"
                                text="light"
                                >
                                <Card.Header className="d-flex justify-content-center"><Card.Title> 2x2 Info</Card.Title></Card.Header>
                                <Card.Body>
                                    
                                    <Card.Text className="d-flex justify-content-center" >
                                        <h1>{efetivoTotal.somaEfetivo}</h1>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    
                </Row>
                <Row className="col-6" >
                    <Col>
                        <Card.Header className="d-flex justify-content-start"><Card.Title> Batalhões por Comando Regional</Card.Title></Card.Header>
                        <BatalhoesCRChart></BatalhoesCRChart>
                    </Col>
                </Row>
            </Row>
        
            <EfetivoCRChart className="p-4 bg-danger"></EfetivoCRChart>
        </Container>
    )
}