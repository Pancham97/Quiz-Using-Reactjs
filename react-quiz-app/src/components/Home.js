/*eslint-env jquery*/
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../stylesheets/style.css';
import CheckUserStatus from './CheckUserStatus';


class Home extends React.Component {

    componentDidMount() {
        $(document).ready(function(){            
            $('.parallax').parallax();
          });
    }
    
    render() {
        return(
          
<div className="home">
<Navbar />
    <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
            <div className="container">
                <h1 className="header center ">Learn with React.</h1>
                <div className="row center">
                    <h5 className="header col s12 light">Test your skills with our wide range of tests and analyze your level</h5>
                </div>
                <div className="row center">
                    <CheckUserStatus />
                </div>
            </div>
        </div>
        <div className="parallax"><img src={require("../images/banner/home-banner.jpg")} alt="Unsplashed background img 1" /></div>
    </div>

    {/* // <!--    Banner end.--> */}

    <div className="intro-section">
        <div className="container partner-section">
            <div className="section">
                <div className="row center">
                    <div className="col m12">
                        <span className="title-text text-center">Co-created with the leaders of the industry</span>
                    </div>
                </div>

                <div className="row center partners companies">
                    <div className="col m12 ">
                        <img className="partners" src={require("../images/logos/amazon.png")} alt="partner-amazon" />
                        <img className="partners" src={require("../images/logos/at&t.png")} alt="partner-atandt" />
                        <img className="partners" src={require("../images/logos/didi.png")} alt="partner-didi" />
                        <img className="partners" src={require("../images/logos/facebook.png")} alt="partner-facebook" />
                        <img className="partners" src={require("../images/logos/google.png")} alt="partner-google" />
                        <img className="partners" src={require("../images/logos/ibm.png")} alt="partner-ibm" />
                        <img className="partners" src={require("../images/logos/nvidia.png")} alt="partner-nvidia" />
                    </div>
                </div>
            </div>
        </div>

        {/* <!--    End of partners container.--> */}


        <div className="row test-demo">
            <div className="container">
                <div className="col m3 s6">
                    <div className="card-panel center-align">
                        <div className="card-info">
                            <div className="row">
                                <i className="material-icons">android</i>
                            </div>
                            <div className="row">
                                Introduction to Java
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col m3 s6">
                    <div className="card-panel center-align">
                        <div className="card-info">
                            <div className="row">
                                <i className="material-icons">book</i>
                            </div>
                            <div className="row">
                                English Literature (Shakespearean)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col m3 s6">
                    <div className="card-panel center-align">
                        <div className="card-info">
                            <div className="row">
                                <i className="material-icons">desktop_mac</i>
                            </div>
                            <div className="row">
                                General Knowledge
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col m3 s6">
                    <div className="card-panel center-align">
                        <div className="card-info">
                            <div className="row">
                                <i className="material-icons">developer_mode</i>
                            </div>
                            <div className="row">
                                Web Development
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="container">
        <div className="section">

            {/* <!--   Icon Section   --> */}
            <div className="row">
                <div className="col s12 m4">
                    <div className="icon-block center-align">
                        <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                        <h5 className="center">Speed up your development</h5>

                        <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                    </div>
                </div>

                <div className="col s12 m4">
                    <div className="icon-block center-align">
                        <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                        <h5 className="center">Personal growth</h5>

                        <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                    </div>
                </div>

                <div className="col s12 m4">
                    <div className="icon-block center-align">
                        <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                        <h5 className="center">Test and improvise</h5>

                        <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
            <div className="container">
                <div className="row center">
                    <h5 className="header col s12 light">We help shape the future of young generation. Join us and learn.</h5>
                </div>
                <div className="row center">
                    <CheckUserStatus />
                </div>
            </div>
        </div>
        <div className="parallax"><img src={require("../images/background3.jpg")} alt="Unsplashed background img 3" /></div>
    </div>

    {/* // <!--    End of pre-footer banner.--> */}
    <Footer />
    </div>
    
        );
    }        
}

export default Home;
