import React from 'react';
import logo from '../images/logo.png';
import '../stylesheets/style.css';

class Footer extends React.Component {
    render() {
        return(
            <div className="footer">
            <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12 logo-container">
                        <img className="brand-logo" src={ logo } alt="Brand logo" />
                        <p className="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
    
    
                    </div>
                    <div className="col l3 s12">
                        <h5 className="white-text">Settings</h5>
                        <ul>
                            <li><a className="white-text" href="#!">About</a></li>
                            <li><a className="white-text" href="#!">Contact Us</a></li>
                            <li><a className="white-text" href="#!">Offers</a></li>
                            <li><a className="white-text" href="#!">Careers</a></li>
                        </ul>
                    </div>
                    <div className="col l3 s12">
                        <h5 className="white-text">Connect</h5>
                        <ul>
                            <li><a className="white-text" href="#!">Facebook</a></li>
                            <li><a className="white-text" href="#!">LinkedIn</a></li>
                            <li><a className="white-text" href="#!">Twitter</a></li>
                            <li><a className="white-text" href="#!">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    Made by <a className="brown-text text-lighten-3" href="#">NP Complete</a> with <i className="material-icons white-text love">favorite</i>
                </div>
            </div>
        </footer>
        </div>
    
        );
    }
}

export default Footer;