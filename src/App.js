import React from 'react';
import axios from 'axios';
import { HashRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import People from './People';
import Places from './Places';
import Things from './Things';

const { Component } = React;

class App extends Component{
  constructor(){
    super();
    this.state = {
      people: [],
      places: [],
      things: []
    };
  }

  async componentDidMount(){
    const urls = [
      '/api/people',
      '/api/places',
      '/api/things',
    ];
    const [people, places, things] = await Promise.all(
      urls.map( url => axios.get(url).then( response => response.data))
    );
    this.setState({ people, places, things });
  }

  render(){
    const { people, places, things } = this.state
    return (
      <HashRouter>
        <Route render={()=> <Nav people={people} places={places} things={things}/> } />
        <div className='container'>
          <h1>Acme Nouns</h1>
          <Route path='/people' render={()=> <People people={ people }/>} />
          <Route path='/places' render={()=> <Places places={ places }/>} />
          <Route path='/things' render={()=> <Things things={ things }/>} />
        </div>
      </HashRouter>
    );
  }
}

export default App
