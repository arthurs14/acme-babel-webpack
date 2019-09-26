import React from 'react';

const People = ({ people })=> {
  return (
    <ul>
      {
        people.map(person => <li key={ person.id}>{ person.name}</li>)
      }
    </ul>
  );
};

export default People;
