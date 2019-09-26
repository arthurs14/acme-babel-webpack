import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import { HashRouter, Link, NavLink, Route, Switch } from 'react-router-dom';

const { render } = ReactDOM;
const { Component } = React;

const People = ({ people })=> {
  return (
    <ul>
      {
        people.map(person => <li key={ person.id}>{ person.name}</li>)
      }
    </ul>
  );
};

const Places = ({ places })=> {
  return (
    <ul>
      {
        places.map(place => <li key={ place.id}>{ place.name}</li>)
      }
    </ul>
  );
};

const Things = ({ things })=> {
  return (
    <ul>
      {
        things.map(thing => <li key={ thing.id}>{ thing.name}</li>)
      }
    </ul>
  );
};


const Nav = ({ people, places, things })=> {
  const links = [
    { text: 'People', to: '/people', count: people.length},
    { text: 'Places', to: '/places', count: places.length },
    { text: 'Things', to: '/things', count: things.length }
  ];
  return (
    <nav>
      {
        links.map( link=> <NavLink key={ link.text } to={ link.to }>{ link.text }</NavLink>)
      }
    </nav>
  );
};

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
        <Route render={()=> <Nav { ...this.state }/>} />
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

render(<App />, document.querySelector('#root'));
