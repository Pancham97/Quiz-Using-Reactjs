import React from 'react';
import '../stylesheets/testCard.css';
import { css } from 'react-emotion';
import { Link } from 'react-router-dom';

// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class TestCards extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            response: '',
            status: '',
            isLoading: true,
        };

        // this.handleCardClick = this.handleCardClick.bind(this);
    }

    componentDidMount() {
        let id = this.props.testId;
        // console.log("CDM: " + id);
        const accessToken = localStorage.getItem('accessToken');

        this.setState({isLoading: true});
        fetch(`/api/tests?id=${id}`, {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            response.json().then(dataObject => {
                
                this.setState({ isLoading: false });
                // console.log(JSON.parse(dataObject.subskillsBreaksdown));
                // console.log(JSON.parse(dataObject.questions));
                if(dataObject.questions) {
                    this.setState({ response: dataObject });
                    this.setState({status: "Not Appeared"});
                } else {
                    this.setState({ response: dataObject });
                    this.setState({status: "Appeared" });
                }
            });
        })
    }

    componentWillReceiveProps(newProps) {
        let id = newProps.testId;
        // console.log("CDM: " + id);
        const accessToken = localStorage.getItem('accessToken');

        this.setState({isLoading: true});
        fetch(`/api/tests?id=${id}`, {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            response.json().then(dataObject => {
                this.setState({ isLoading: false });
                // console.log("State "+this.state.isLoading)
                if(dataObject.questions) {
                    this.setState({ response: dataObject });
                    this.setState({status: "Not Appeared"});

                } else {
                    this.setState({ response: dataObject });
                    this.setState({status: "Appeared"});
                }
            });
        })

       

    }

    // handleCardClick(event, data) {
    //     const accessToken = localStorage.getItem('accessToken');
    //     fetch(`/api/tests?id=${data}`, {
    //         'method': 'GET',
    //         'headers': {
    //             'content-type': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`,
    //         },
    //     })
    //     .then(response => {
    //         response.json().then(dataObject => {
    //             if(dataObject.questions) {
    //                 console.log("Not given");
    //             } else {
    //                 console.log("Appeared");
    //             }
    //         });
    //     })
    // }



    render() {
        const isLoading = this.state.isLoading;
        return(
            isLoading ?
            <ClipLoader
                className={override}
                sizeUnit={"px"}
                size={60}
                color={'#123abc'}
                loading={this.state.isLoading} />
            :
            <div className="test-card">
                <div className="col m3 s6">
                    <div id={this.props.testId} className="card-panel center-align">
                    {/* onClick={(event) => this.handleCardClick(event, this.props.testId)} */}
                        <div className="card-info">
                            <div className="row">
                                <i className="material-icons">assessment</i>
                            </div>
                            <div id={this.props.testId} className="row">
                                {this.props.testName}
                            </div>
                            {this.state.status === "Appeared" ?  
                                <div className="row">
                                    Score: {this.state.response.score}/{this.state.response.maximumMarks}
                                    <Link to="/register" className="btn-large waves-effect primary-button">View Details</Link>
                                </div> : <div className="row">
                                            <Link to={{pathname: "/quiz-details", state: {response: this.state.response}}} className="btn-large waves-effect primary-button">Start test</Link>
                                        </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestCards;