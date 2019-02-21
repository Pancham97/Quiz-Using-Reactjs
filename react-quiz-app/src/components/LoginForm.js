import React from 'react';
import { logo  } from '../images/logo.png';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/login.css';
import PropTypes from 'prop-types';


class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
           username: '',
           password: '',
           redirect: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    //when the user clicks the login button
    handleSubmit(event) {
        console.log(JSON.stringify(this.state));
        event.preventDefault();
        fetch("/api/auth/signin", {
            body: JSON.stringify(this.state),
            'cache-control': 'no-cache',
            // credentials: 'include',
            headers: {
                'Authorization' : 'tokenJSON.access',
                'content-type': 'application/json',
            },
            method: 'POST',
            // mode: 'cors',
        })
        .then((response) => {
            if (response.status === 200) { // Successfully logged in!
                let tokenValue;
                let userFullName;
                let tokenType;
                let role;
                let id;

                document.getElementById('info').hidden = true;

                response.json().then(data => {
                    tokenValue = data.accessToken;
                    userFullName = data.name;
                    tokenType = data.tokenType;
                    role = data.role[0].name;
                    id = data.id;

                    var values = data;
                    console.log(values);

                    localStorage.clear();
                    localStorage.setItem('accessToken', tokenValue);
                    localStorage.setItem('name', userFullName);
                    localStorage.setItem('tokenType', tokenType);
                    localStorage.setItem('role', role);
                    localStorage.setItem('loginTime', new Date().getTime());
                    localStorage.setItem('id',id);

                    this.setState({ redirect: true });
                   
                    console.log(JSON.stringify(this.state));
                    // this.props.user = userFullName;
                });
            } else {
                document.getElementById('info').innerHTML = "Incorrect username or password!";
            }
        });
    }

    render() {
        const { redirect } = this.state;
        // console.log(redirect);

        if(! redirect === true) {
            return(
                <div className="login-class valign-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m6 offset-m3">
                                <div className="card-panel">
                                    <div className="row center-align brand-logo">
                                        <Link to="/"><img src={require("../images/logo.png")} alt="Brand logo" /></Link>
                                    </div>
    
                                    <div className="row title center-align">Sign in</div>
                                    <div className="row center-align">Use your email ID to log in</div>
    
                                    
                                    <div className="login-form">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="input-field col s10 offset-s1">
                                                    <input id="username" type="text" className="validate" onChange={e => this.setState({username: e.target.value})} />
                                                    <label htmlFor="username">Username</label>
                                                </div>
                                            </div>
    
                                            <div className="row">
                                                <div className="input-field col s10 offset-s1">
                                                    <input id="password" type="password" className="validate" onChange={e => this.setState({password: e.target.value})} />
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                            </div>
    
                                            <div className="row infoClass center-align">
                                                <span id="info"></span>
                                            </div>
    
                                            <div className="row">
                                                <div className="input-field center-align">
                                                    <button className="btn waves-effect waves-light" type="submit" name="action">Log in</button>
                                                </div>
                                            </div>
    
                                            <div className="row center-align">
                                                <Link to="/register">Create Account</Link>
                                            </div>
                                        </form>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            if(localStorage.getItem('role') === 'ROLE_USER') {
                return(
                    <Redirect to='/user' />
                );
            } else {
                return(
                    <Redirect to='/admin' />
                );
            }
        }
    }
    
    componentWillUnmount() {
        document.body.style.backgroundImage = "none";
    }
}

export default LoginForm;