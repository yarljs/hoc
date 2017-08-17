import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {createStore, dispatch, applyMiddleware} from 'redux';


const yarlReduce = require('@yarljs/reduce')
const yarlFetch = require('@yarljs/fetch');
import {Fetchable} from '../src/index.js';
import {Atomizer} from '../src/atomRenderer';


// Write Some Matchers
const imgext = ["jpg", "jpeg", "svg", "gif", "png"];
const httpre = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
Atomizer(
  (name, data) => {
    if(typeof data !== "string") return 0.0;

    if(!httpre.exec(data)) return 0.0;

    const ext = data.split(".").pop();
    if(imgext.includes(ext))
    {
      return 1.0
    }
    return 0.0;

  },
  (name, data, styleMap) => {
    return (<img className={`${name} ${styleMap.atom}`} src={data} alt="name" />)
  },
  "imgurl"
)

Atomizer(
  (name, data) => {
    if(typeof data !== "string") return 0.0;

    if(!httpre.exec(data)) return 0.0;

    const ext = data.split(".").pop();
    if(imgext.includes(ext))
    {
      return 0.5
    }
    return 1.0;

  },
  (name, data, styleMap) => {
    return (<a className={`${name} ${styleMap.atom}`} href={data}>{name}</a>)
  },
  "anchor"
)

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
        <CategoryContainer />
        <RandomContainer />
      </div>
    </Provider>
  );
}
ReactDOM.render(<Root />, document.getElementById('react-root'));
