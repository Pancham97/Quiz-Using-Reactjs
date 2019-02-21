import React, {Component} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

// import './App.css';
import Body from './components/Body';
import LoginContainer from './components/LoginContainer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  checkInactivity() {
    var time = new Date().getTime();
   
    ['mousemove', 'keypress'].forEach(event => {
      document.body.addEventListener(event, e => {
        time = new Date().getTime();
      })
    })

     var refresh = () => {
      if(new Date().getTime() - time >= 1000 * 60 * 10) {
        localStorage.clear();
        this.setState({ redirect: true });
      } else {
      setTimeout(refresh, 1000);
      }
     }

     refresh();
  }

  logoutAfterJwtExpires() {
    if(localStorage.getItem('loginTime')) {
      var lastclear = localStorage.getItem('loginTime'),
      time_now = (new Date()).getTime();
  
      // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
      if ((time_now - lastclear) > 1000 * 60 * 60 * 2) {
        localStorage.clear();
        this.setState({ redirect: true });
      }
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.logoutAfterJwtExpires(); 
      this.checkInactivity();
    }, 1000);
  }

  render() {
    if(this.state.redirect === true) {
      return(
        <div>
          <Redirect to='/' />
          {window.location.reload()}
        </div>
      );
    } else {
      return (
        <div className = "App" >
          <Body />
        </div>
      );
    }
  }
}

export default App;