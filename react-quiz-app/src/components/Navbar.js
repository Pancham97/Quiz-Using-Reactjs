/*eslint-env jquery*/
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/logo.png';
import '../stylesheets/style.css';
import M from 'materialize-css';

class Navbar extends React.Component {
    state = {
        isLoggedIn: false,
        redirect: false,
    };

    componentDidMount(){
        $(document).ready(function() {
            // console.log("Mounted");
            $('.sidenav').sidenav();
            $(".dropdown-trigger").dropdown();

        });

        let accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            this.setState({ isLoggedIn: true });
        }
    }

    logOut() {
        window.location.reload();
        localStorage.clear();
        this.setState({ redirect: true });        
    }

    render() {
        const redirect = this.state.redirect;
        if(redirect) {
            return <Redirect to="/" />
        }

        if(this.state.isLoggedIn) {
            const userFullName = localStorage.getItem('name');
            // console.log(userFullName);
            return(
                <div className="navbar">
                    <div className="navbar-fixed">
                        <ul id="dropdown" className="dropdown-content">
                            <li><Link to="/history">View History</Link></li>
                            <li className="divider"></li>
                            <li><a className="waves-effect" onClick={() => this.logOut()}>Logout</a></li>
                        </ul>

                        <nav role="navigation" id="navbar">
                            <div className="nav-wrapper container">
                                <Link to="/" id="logo-container" className="logo-container brand-logo">
                                    <img src={ logo } alt="Company logo" />
                                </Link>

                                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a className="dropdown-trigger" href="#!" data-target="dropdown">{userFullName}<i className="material-icons right">arrow_drop_down</i></a></li>
                                    {/* <li><a className="btn waves-effect teal" onClick={() => this.logOut()}>Log out</a></li> */}
                                </ul>
                            </div>
                        </nav>

                        
                    </div>

                    <ul className="sidenav" id="mobile-demo">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register Now</Link></li>
                    </ul>
                </div>
            );
        } else {
            return(
                <div className="navbar">
                    <div className="navbar-fixed">
                        <nav role="navigation" id="navbar">
                            <div className="nav-wrapper container">
                                <Link to="/" id="logo-container" className="logo-container brand-logo">
                                    <img src={ logo } alt="Company logo" />
                                </Link>

                                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/register' className="btn waves-effect teal">Register Now</Link></li>
                                </ul>
                            </div>
                        </nav>

                        
                    </div>

                    <ul className="sidenav" id="mobile-demo">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register Now</Link></li>
                    </ul>
                </div>
            );
        }
    }
}

export default Navbar;