import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount (props) {
    return (
        <div className="question-count right-align">
            Question <span>{props.counter} of {props.total}</span>
        </div>
    );
}

QuestionCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default QuestionCount;