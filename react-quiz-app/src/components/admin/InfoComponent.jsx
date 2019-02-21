import React from 'react';
import './styles.css';
import 
{Container,
Row,
Col,
} from 'reactstrap';
export default class InfoComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            isLoading: true,
            id: localStorage.getItem('id'),
            test: 0,
            scores:[],
          };
    }

    componentWillMount() {
        this.setState({ test: this.props.testId });
    }
    
    componentDidMount() {
        console.log(this.state.id);
        console.log(this.state.test);
        var userId = this.state.id;
        var testId = this.state.test
        fetch(`/api/score?user=${userId}&test=${testId}`, {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json'
            },
            'cache-control': 'no-cache',
        })
        .then(response => response.json())
        .then(marks => {
            console.log(marks);
            this.setState({scores: marks, isLoading: false});
        })
    }
    
    render() {
        const {isLoading,id,test,scores} = this.state;
        if (isLoading) {
            return (
                <Container>
                    <Row>
                        <Col xs="12">No data available</Col>
                    </Row>
                </Container>
            );
        }
        return(
            <div>
                <Container>
                    <Row className="TestTitle">
                        <Col sm="auto">{scores.test.name}</Col>
                    </Row>
                    <Row>
                        <Col sm="auto">
                            <Row className="Title">
                                <Col sm="auto">{scores.user.name}</Col>
                            </Row>
                            <Row className="EmailTitle">
                                <Col sm="auto">{scores.user.email}</Col>
                            </Row>
                        </Col>
                    
                    </Row>
                    <Row className="BlockTitle">
                        <Col sm="auto">Registration Details</Col>
                    </Row>
                    <Row>
                    <Col sm="6">
                            <Row>
                                <Col sm="auto" className="Title">Name</Col>
                                <Col sm="auto">{scores.user.name}</Col>
                            </Row>
                            <Row>
                                <Col sm="auto" className="Title">Email</Col>
                                <Col sm="auto">{scores.user.email}</Col>
                            </Row>
                        </Col>
                        <Col sm="6">
                            <Row>
                                <Col sm="auto" className="Title">Name</Col>
                                <Col sm="auto">{scores.user.name}</Col>
                            </Row>
                            <Row>
                                <Col sm="auto" className="Title">Email</Col>
                                <Col sm="auto">{scores.user.email}</Col>
                            </Row>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        )
    }
}