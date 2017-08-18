import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, dispatch, applyMiddleware} from 'redux';

const yarlReduce = require('@yarljs/reduce')
const yarlFetch = require('@yarljs/fetch');
import {Fetchable} from '../src';

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
      <div id="test-loader">Choo Choo Loading</div>
    )
  }
}

class TestData extends React.Component {
  render() {
    return (
      <div id="test-data">Data...</div>
    )
  }
}

class TestError extends React.Component {
  render() {
    return (
      <div id="test-error">Error :(</div>
    )
  }
}

class TestContainer extends React.Component {
  render() {
    return (<div id="test-container">{this.props.children}</div>)
  }
}


const CategoryContainer = Fetchable(
  yarlFetch.fetching("http://localhost:8081/chuck/jokes/categories",
      "getChuckStuff",
      {method: "GET"}
    ),
  {}, undefined)


const RandomContainer = Fetchable(
  yarlFetch.fetching("http://localhost:8081/chuck/jokes/random",
      "randomChuckJoke",
      {method: "GET"}
    ),
  {}, undefined)

  // Data={TestData}
  // Loader={TestLoader}
  // Error={TestError}
const Root = () => {
  return (
    <Provider store={store}>
      <div>
        <CategoryContainer
          Container={TestContainer}
          Loading={TestLoader}
          Data={TestData}
          Error={TestError}
        />
        <RandomContainer />
      </div>
    </Provider>
  );
}
ReactDOM.render(<Root />, document.getElementById('react-root'));
