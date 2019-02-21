import React from 'react';
import { Link } from 'react-router-dom';

class CheckUserStatus extends React.Component {
    render() {
        // console.log(localStorage.getItem('accessToken'))
        if(localStorage.getItem('accessToken')) {
            if(localStorage.getItem('role') === 'ROLE_USER') {
                return <Link to="/user" className="btn-large waves-effect primary-button">Go to dashboard</Link>
            } else {
                return <Link to="/admin" className="btn-large waves-effect primary-button">Go to dashboard</Link>
            }
            
        } else {
            return <Link to="/register" className="btn-large waves-effect primary-button">Get Started</Link>
        }
    }
}

export default CheckUserStatus;