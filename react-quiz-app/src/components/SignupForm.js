import React from 'react';
import { logo } from '../images/logo.png';
import { Link } from 'react-router-dom';
import '../stylesheets/signup.css';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
            role: ['user'],
         };
 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.signUpForm.reset();
        console.log(JSON.stringify(this.state));
        event.preventDefault();
        fetch("/api/auth/signup", {
            body: JSON.stringify(this.state),
            'cache-control': 'no-cache',
            // credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            // mode: 'cors',
        })
        .then((response) => {
            if (response.status === 200) { // Successfully resgistered!
                // console.log(JSON.parse(response));

                document.getElementById('info').style.color = "green";
                document.getElementById('info').style.textAlign = "center";
                document.getElementById('info').innerHTML = "Registration Successful!";
            } else {
                document.getElementById('info').style.color = "red";
                document.getElementById('info').style.textAlign = "center";
                document.getElementById('info').innerHTML = "Registration Failed!";
            }
        });
    }

    render() {
        return(
            <div className="signup-class valign-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card-panel">
                                <div className="row center-align brand-logo">
                                    <Link to="/"><img src={ require("../images/logo.png") } alt="Brand logo" /></Link>
                                </div>

                                <div className="row title center-align">Sign up</div>
                                <div className="row center-align">Create an account at React JS</div>

                                <div className="signup-form">
                                    <form  ref={(element) => this.signUpForm = element} onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="full-name" type="text" className="validate" onChange={e => this.setState({name: e.target.value})} />
                                                <label htmlFor="full-name">Full Name</label>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="email" type="email" className="validate" onChange={e => this.setState({email: e.target.value})} />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="username" type="text" className="validate" onChange={e => this.setState({username: e.target.value})} />
                                                <label htmlFor="username">User Name</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input id="password" type="password" className="validate" onChange={e => this.setState({password: e.target.value})} />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            
                                            <div className="input-field col s6">
                                                <input id="repassword" type="password" className="validate" />
                                                <label htmlFor="repassword">Confirm Password</label>
                                            </div>
                                        </div>

                                        <div className="row infoClass center-align">
                                            <span id="info"></span>
                                        </div>

                                        <div className="row">
                                            <div className="input-field center-align">
                                                <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up</button>
                                            </div>
                                        </div>

                                        <div className="row center-align">
                                            <Link to="/login">Log in instead</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;