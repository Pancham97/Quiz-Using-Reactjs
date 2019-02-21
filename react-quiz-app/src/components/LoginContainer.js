import React from 'react';
import { withRouter } from 'react-router';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class LoginContainer extends React.Component {  
    render() {
        let accessToken = localStorage.getItem('accessToken');
        let role = localStorage.getItem('role');

        if(accessToken) {
            if(role === 'ROLE_USER') {
                return(
                    <Redirect to='/user' />
                );
            } else {
                return (
                    <Redirect to='/admin' />
                );
            }
            
        } else {
            return(
                <LoginForm />
            );
            
        }
    }
}

  export default withRouter(LoginContainer);