import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {createStore, dispatch, applyMiddleware} from 'redux';


const yarlReduce = require('@yarljs/reduce')
const yarlFetch = require('@yarljs/fetch');
import {Fetchable} from '../src/index.js';
// Make space for yarl in your store
const defaultState = {
  yarl: {

  }
}

// Create a store with our middleware
const store = createStore(
  yarlReduce.reduce,
  defaultState,
  applyMiddleware(yarlFetch.middleware)
);


class TestLoader extends React.Component {
  render() {
    return (
      <div>Choo Choo Loading</div>
    )
  }
}

class TestData extends React.Component {
  render() {
    return (
      <div>Data...</div>
    )
  }
}

class TestError extends React.Component {
  render() {
    return (
      <div>Error :(</div>
    )
  }
}

const Container = Fetchable(
  yarlFetch.fetching("http://localhost:8081/chuck/jokes/categories",
      "getChuckStuff",
      {method: "GET"}
    ),
  {}, undefined)



const Root = () => {
  return (
    <Provider store={store}>
      <Container
        Data={TestData}
        Loader={TestLoader}
        Error={TestError}
      />
    </Provider>
  );
}
ReactDOM.render(<Root />, document.getElementById('react-root'));
