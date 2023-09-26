import { Card, Container, Row, Col } from "react-bootstrap";
import BatalhoesCRChart from "../components/dashboard/BatalhoesCRChart";
import EfetivoCRChart from "../components/dashboard/EfetivoCRChat";
import { useEffect, useState } from "react";
import { getBatalhoesTotal, getEfetivoTotal } from "../services/batalhao-service";
import { getSalariosTotal, getSalariosMedia} from "../services/militar-service";


export function HomeDashboard() {
    const [batalhoesTotal, setBatalhoesTotal] = useState({});
    const [efetivoTotal, setEfetivoTotal] = useState({});
    const [salariosTotal, setSalariosTotal] = useState({});
    const [salariosMedia, setSalariosMedia] = useState({});

    useEffect(() => {
        findBatalhoesTotal();
        findEfetivoTotal();
        findSalariosTotal();
        findSalariosMedia()
    }, []);

    async function findBatalhoesTotal() {
        try {
            const result = await getBatalhoesTotal();
            setBatalhoesTotal(result.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function findEfetivoTotal() {
        try {
            const result = await getEfetivoTotal();
            setEfetivoTotal(result.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function findSalariosTotal() {
        try {
            const result = await getSalariosTotal();
            setSalariosTotal(result.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function findSalariosMedia() {
        try {
            const result = await getSalariosMedia();
            setSalariosMedia(result.data[0]);
        } catch (error) {
            console.error(error);
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
            <Row className="d-flex justify-content-center p-3">
                <Col>
                    <Card
                        key='dark'
                        style={{ width: '14rem' }}
                        className="mb-2"
                        bg="dark"
                        text="light"
                    >
                        <Card.Header className="d-flex justify-content-center"><Card.Title>Batalhões</Card.Title></Card.Header>
                        <Card.Body> 
                            <Card.Text className="d-flex justify-content-center" >
                                <h2>{batalhoesTotal.somaBatalhao}</h2>
                            </Card.Text>
                        </Card.Body>
                    </Card> 
                </Col>
                <Col>
                    <Card
                        key='dark'
                        style={{ width: '14rem' }}
                        className="mb-2"
                        bg="dark"
                        text="light"
                        >
                        <Card.Header className="d-flex justify-content-center"><Card.Title> Efetivo total </Card.Title></Card.Header>
                        <Card.Body>
                            
                            <Card.Text className="d-flex justify-content-center" >
                                <h2>{efetivoTotal.somaEfetivo}</h2>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        key='dark'
                        style={{ width: '14rem' }}
                        className="mb-2"
                        bg="dark"
                        text="light"
                        >
                        <Card.Header className="d-flex justify-content-center"><Card.Title>Total Salários</Card.Title></Card.Header>
                        <Card.Body>
                            
                            <Card.Text className="d-flex justify-content-center" >
                                <h2>R$ {salariosTotal.somaSalario}</h2>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        key='dark'
                        style={{ width: '14rem' }}
                        className="mb-2"
                        bg="dark"
                        text="light"
                        >
                        <Card.Header className="d-flex justify-content-center"><Card.Title> Média Salários</Card.Title></Card.Header>
                        <Card.Body>
                            
                            <Card.Text className="d-flex justify-content-center" >
                                <h2>R$ {salariosMedia.mediaSalario}</h2>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Col className="col-12">
                <BatalhoesCRChart className="p-4 bg-danger col-12"></BatalhoesCRChart>
            </Col>
            
            <Col className="col-12">
                <EfetivoCRChart className="p-4 bg-danger"></EfetivoCRChart>
            </Col>
        </Container>
    )
}