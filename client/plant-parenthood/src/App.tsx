import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';
import NavBar from './components/navigation/NavBar';

import './App.css';

const Home = lazy(() => import('./components/home/Home'));
const Profile = lazy(() => import('./components/profile/Profile'));
const LoginPage = lazy(() => import('./components/profile/LoginPage'));

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={LoginPage} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
