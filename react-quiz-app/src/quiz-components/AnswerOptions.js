import React from 'react';
import PropTypes from 'prop-types';
 
 
class AnswerOption extends React.Component {
	checkStatus() {
		if(this.props.answerOption === this.props.answer) {
			document.getElementById(this.props.answerOption).checked = true;
		}

		if(localStorage.getItem('checkboxValues')) {
			if(JSON.parse(localStorage.getItem('checkboxValues'))[this.props.questionId - 1]) {
				document.getElementById(JSON.parse(localStorage.getItem('checkboxValues'))[this.props.questionId - 1]).checked = true;
			}
		}
		
		
		// return false;
	}

	componentDidMount() {
		// this.props.checkedAnswer ? document.getElementById(this.props.checkedAnswer).checked = true : console.log()
		if(this.props.answerOption === this.props.answer) {
			document.getElementById(this.props.answerOption).checked = true;
		}

		if(localStorage.getItem('checkboxValues')) {
			if(JSON.parse(localStorage.getItem('checkboxValues'))[this.props.questionId - 1]) {
				document.getElementById(JSON.parse(localStorage.getItem('checkboxValues'))[this.props.questionId - 1]).checked = true;
			}
		}
	}

	render() {
		return (
			<li className="answerOption">
				<input
					type="radio"
					className="radioCustomButton"
					name="radioGroup"
					// checked={this.checkStatus()}
					id={this.props.answerOption}
					value={this.props.answerOption}
					// disabled={this.props.answer}
					onChange={this.props.OnAnswerSelected}
					checkedAnswer={this.props.checkedAnswer}
					questionId={this.props.questionId}
				/>
	 
				<label className="radioCustomLabel" htmlFor={this.props.answerOption}>
					{this.props.answerOption}
				</label>
	 
			</li>
		);
	}
}
 
AnswerOption.propTypes = {
	// answerType: PropTypes.string.isRequired,
	answerOption: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
	OnAnswerSelected: PropTypes.string.isRequired,
	questionId: PropTypes.number
 
};
 
export default AnswerOption;