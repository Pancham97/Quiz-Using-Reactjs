import React from 'react';
import CreateTable from './CreateTable';
import Navbar from './Navbar';

class TestHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        fetch(`/api/score/${id}`, {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
            },
            'cache-control': 'no-cache',
        })
        .then(response => {
            response.json().then(data => {
                this.setState({data: data});
                console.log(this.state.data);
            })
        })
    }
    render() {
        return(
            <div className="history">
                <Navbar />
                <div className="table">
                    <table id="history-table">
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th>Score</th>
                                <th>Max Marks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.data.map(element => {
                                    return (
                                        <tr key={element.id}>
                                            <td>{element.test.name}</td>
                                            <td>{element.score}</td>
                                            <td>{element.maximumMarks}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TestHistory;