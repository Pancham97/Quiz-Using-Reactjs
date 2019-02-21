import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/timer.css';

class Timer extends React.Component {
    render() {
        return ( 
            <div className="timer">
                <div className="right-align">
                    <span>{this.props.minutes} : { this.props.seconds }</span>
                </div>
            </div>
        );
    }
    
}

Timer.propTypes = {
    // hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
};

export default Timer;