import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/PreQuiz.css';

class PreQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testId: this.props.location.state.response.id,
            total: 0,
            testName: this.props.location.state.response.name,
            duration: JSON.parse(this.props.location.state.response.time),
            questions: JSON.parse(this.props.location.state.response.questions),
            response: this.props.location.state.response,
        }

        this.calculateTotalMarks = this.calculateTotalMarks.bind(this);
    }

    componentWillMount() {
        this.calculateTotalMarks();

        console.log(this.state);
    }

    calculateTotalMarks() {
        let totalMarks = 0;
        this.state.questions.map(element => {
            totalMarks += element.mark;
        })

        this.state.total = totalMarks;
    }

    render() {
        return(
            <div className="pre-quiz valign-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="card">
                            <div className="col m6 offset-m3">
                                <div id={this.state.testId} className="card-panel center-align">
                                    <div className="card-info">
                                        <div className="row">
                                            Skill Assessment: <span>{this.state.testName}</span>
                                        </div>

                                        <div className="row">
                                            Total Marks: <span>{this.state.total}</span>
                                        </div>

                                        <div className="row">
                                            Duration: <span>{this.state.duration / 60} minutes</span>
                                        </div> 

                                        <div className="row">
                                            <Link to={{pathname: "/quiz", state: {response: this.state.response}}} className="btn-large waves-effect primary-button">Start test</Link>
                                        </div>

                                        <div className="gap"></div>

                                        <div className="row">
                                        <Link to="/user">Go to dashboard</Link>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

export default PreQuiz;