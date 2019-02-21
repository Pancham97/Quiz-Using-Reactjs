import React from 'react';

class demoAutoSuggest extends React.Component {
  render() {
    console.log(this.props.location.state.response);
    return(
      <div className="demo-suggest">
        {this.props.location.state.response.name}
      </div>
    );
  }
}

export default demoAutoSuggest;