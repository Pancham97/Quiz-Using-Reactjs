import React from 'react';
import Navbar from './Navbar';
import '../stylesheets/user-dashboard.css';
import Autosuggest from 'react-autosuggest';
import TestCards from './TestCards';

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            testsArray: [],
        };

        // this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    }

    componentWillMount() {
        fetch('/api/tests/all', {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                // 'Authorisation': '',
            }
        })
        .then(response => {
            response.json().then(data => {
                // console.log(data);
                this.setState({testsArray: data});
            })
        })
    }
    


    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue = (suggestion) => suggestion.name;
    
    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div id={suggestion.id} onClick={(event) => this.handleSuggestionClick(suggestion.id, event)}>
            {suggestion.name}
        </div>
    );

    handleSuggestionClick = (id, event) => {
        // console.log("HSC: " + id);

        fetch(`/api/tests/${id}`, {
            'cache-control': 'no-cache',
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
            },
        })
        .then((response) => {
            response.json().then((data) => { 
                // console.log(data);
                this.setState({ testsArray: data });
            });
        });
    };


  
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
            testsArray: [],
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
    fetch(`/api/subcategory/search?name=${value}`, {
        'cache-control': 'no-cache',
        'method': 'GET',
        'headers': {
            'content-type': 'application/json',
        },
    })
    .then((response) => {
        response.json().then((data) => { 
            this.setState({
                suggestions: data
            })
        });
    });
    };
    
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };


    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange,
        };
        

        // Finally, render it!
        return (
            <div className='user'>
                <Navbar />

                <div className="search-row valign-wrapper">
                    <div className="container">
                        <h4 className="center-align block-title">Hi, {localStorage.getItem('name')}!</h4>
                        <h2 className="center-align block-title">Search for a test</h2>
                        
                        <div className="row">
                            <div className="gap"></div>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}
                            />
                        </div>
                    </div>
                </div>

                <div className="search-results">
                    <div className="double-gap"></div>
                
                    <div className="container">
                        <div className="row tests-list">
                            {this.state.testsArray.map((dataObject, index) => {
                                return(<TestCards testName={dataObject.name} key={index} testId={dataObject.id} />);
                            })}
                        </div>
                    </div>
                </div>
            </div>      
        );
    }   
}

export default UserDashboard;