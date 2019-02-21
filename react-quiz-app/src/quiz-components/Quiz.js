import React from 'react';
import PropTypes from 'prop-types';

import Question from '../quiz-components/Question';
import QuestionCount from '../quiz-components/QuestionCount';
import AnswerOption from '../quiz-components/AnswerOptions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MarksCount from './MarksCount';

function Quiz (props) {
    function renderAnswerOptions(key) {
        return (
            <AnswerOption 
                key={key.option}
                answerOption={key.option}
                answer={props.answer}
                questionId={props.questionId}
                OnAnswerSelected={props.onAnswerSelected}
                checkedAnswer={props.checkedAnswer}
            />
        );
    }

    return (
        <ReactCSSTransitionGroup
            className="container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear
            transitionAppearTimeout={100} >
            
            <div className="row">
                <div className="col m8">
                    <div className="test-name">
                        Skill Assessment: <span>{props.testName}</span>
                    </div>
                </div>
                <div className="col m4">
                    <QuestionCount
                        counter={props.questionId}
                        total={props.questionTotal}
                    />
                </div>
            </div>
            <div key={props.questionId}>
                <div className="row">
                    <div className="col m9">
                        <Question content={props.question} />
                    </div>
                    <div className="col m3">
                        <MarksCount 
                            questionMark={props.questionMark} />                        
                    </div>
                </div>
                
                <ul className="answerOptions">
                    {props.answerOptions.map(renderAnswerOptions)}
                </ul>
            </div>
        </ReactCSSTransitionGroup>
    );
}

Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    option: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    testName: PropTypes.string.isRequired,
    questionMark: PropTypes.number,
};

export default Quiz;