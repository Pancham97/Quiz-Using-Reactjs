import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import QuizBody from './QuizBody';
import DemoAJAX from './DemoAJAX';
import LoginContainer from './LoginContainer';
import UserDashboard from './UserDashboard';
import demoAutoSuggest from './demoAutoSuggest';
import PreQuiz from './PreQuiz';
import TestHistory from './TestHistory';
import Excel from './admin/AdminDash';
import demoCompo from './admin/demoCompo';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Body = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/home' component={Home}/>
            <Route path='/login' render={()=> <LoginContainer />} />
            <Route path='/register' component={SignupForm}/>
            <Route path='/quiz' component={QuizBody}/>
            <Route path='/ajax' component={DemoAJAX} />
            <Route path='/user' component={UserDashboard} />
            {/* <Route path='/suggest' component={demoAutoSuggest} /> */}
            <Route path='/quiz-details' component={PreQuiz} />
            <Route path='/history' component={TestHistory} />
            <Route path='/admin' component={Excel} />
            <Route path='/demo' component={demoCompo} />
        </Switch>
    </main>
)
export default Body;
