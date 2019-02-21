import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Navbar from '../components/Navbar';
import PdfComponent from '../components/admin/PdfComponent';

class Result extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: JSON.parse(this.props.subSkillAnalysis),
            testId: this.props.testId,
        };
    }

    calculateTotalMarks() {
        var response = this.state.response;
        let total = 0;
        response.map(element => {
            total = total + element.total;
        })

        // console.log(total);
        return total;
    }

    calculateObtainedMarks() {
        var response = this.state.response;
        let obtained = 0;
        response.map(element => {
            obtained = obtained + element.obtained;
        })

        // console.log(obtained);
        return obtained;
    }

    componentDidMount() {
        // console.log(this.props.testId);
        fetch('/api/score', {
            'body': JSON.stringify({
                "user_id": localStorage.getItem('id'),
	            "test_id": this.props.testId,
	            "max_marks": this.calculateTotalMarks(),
	            "obtained_marks": this.calculateObtainedMarks(),
	            "subSkillAnalysis": JSON.stringify(this.state.response),
            }),
            'method': 'POST',
            'headers': {
                'content-type': 'application/json',
            },
            'cache-control': 'no-cache',
        })
        .then(response => {
            if(response.status === 200) {
                console.log(response);
            } else {
                console.log(response);
            }
        })
    }
    
    render() {
        return (
            <div className="result">
                <Navbar />
            
                <div>
                    <ReactCSSTransitionGroup
                        className="container result"
                        component="div"
                        transitionName="fade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppear
                        transitionAppearTimeout={100}
                    >
                        <div>
                            Your correct answers <strong>{this.props.quizResult.correct}</strong>!<br />
                            Your incorrect answers <strong>{this.props.quizResult.incorrect}</strong>!
                        </div>
                    </ReactCSSTransitionGroup>
					
					<div className="row">
						subSkillAnalysis: {JSON.stringify(this.state.response)}
					</div>
					
                </div>
            </div>
        );
    }
    
}

Result.propTypes = {
    quizResult: PropTypes.object.isRequired,
};

export default Result;