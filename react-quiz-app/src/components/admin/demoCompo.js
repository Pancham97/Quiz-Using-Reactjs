import React from 'react';

class demoCompo extends React.Component {

    componentDidMount() {
        fetch('/api/score?user=12&test=33', {
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
        return(
            <div>asdasd</div>
        );
    }
}

export default demoCompo;