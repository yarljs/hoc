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
    getChuckStuff: {
      data: null,
      error: null,
      loading: null,
    }
  }
}

// Create a store with our middleware
const store = createStore(
  yarlReduce.reduce,
  defaultState,
  applyMiddleware(yarlFetch.middleware)
);


class Test extends React.Component {
  render() {
    return (
      <div>Fooo Foo Foo</div>
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
      <Container>
        <Test />
      </Container>
    </Provider>
  );
}
ReactDOM.render(<Root />, document.getElementById('react-root'));
