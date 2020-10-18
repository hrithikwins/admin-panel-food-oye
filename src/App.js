import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ContentsList} from './views/content-list';
import {EditContent} from './views/edit-content';
import {CreateContent} from './views/create-content';
import {CreateUser} from './views/create-user';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from './components/navbar';

function App() {
  return (
    <>
    <Router>
    <Navbar></Navbar>
      <Route exact path="/" component={ContentsList}></Route>
      <Route exact path="/edit/:id" component={EditContent}></Route>
      {/* <Route exact path="/create-user" component={CreateContent}></Route> */}
      <Route exact path="/create-user" component={CreateUser}></Route>
    </Router>
    </>
  );
}

export default App;
