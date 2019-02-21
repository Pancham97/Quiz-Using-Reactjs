import React from 'react';
import PropTypes from 'prop-types';

function MarksCount (props) {
    return (
        <div className="marks-count right-align">
            Marks: <span>{props.questionMark}</span>
        </div>
    );
}

MarksCount.propTypes = {
    questionMark: PropTypes.number.isRequired,
};

export default MarksCount;