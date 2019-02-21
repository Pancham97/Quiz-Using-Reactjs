import React from 'react';

class CreateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
    }

    render() {
        console.log(this.state.data);
        return(
            this.state.data.map(element => {
                console.log(element)
                return(
                    <tr>
                        <td>{element.test.name}</td>
                        <td>{element.score}</td>
                        <td>{element.maximumMarks}</td>
                    </tr>
                )
            })
        );
    }
}

export default CreateTable;