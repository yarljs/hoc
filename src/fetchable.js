import React from 'react';
import {connect} from 'react-redux'
import yarlReduce from '@yarljs/reduce';
import yarlFetch from '@yarljs/fetch';
import * as PropTypes from 'prop-types';

export function Fetchable(fetching, params, transform) {
  class FetchableContainer extends React.Component {
    constructor(props) {
      super(props)

      this.getLoading = this.getLoading.bind(this);
      this.getData = this.getData.bind(this);
      this.getError = this.getError.bind(this);
    }

    componentDidMount() {
      this.context.store.dispatch(fetching(params, transform));
    }

    getError(err) {
      if(this.props.Error)
      {
        let Error = this.props.Error;
        return <Error error={err} />
      }
      else
      {
         return (<div className={`${fetching.slice}-error`}>{err.toString()}</div>)
      }
    }

    getLoading(loading) {
      if(this.props.Loader)
      {
        let Loader = this.props.Loader;
        return <Loader loading={loading} />
      }
      else
      {
         return (<div>loading...</div>)
      }
    }

    getData(data) {
      if(this.props.Data)
      {
        let Data = this.props.Data;
        return <Data data={data} />
      }
      else
      {
        let body;
        if(Array.isArray(this.props.data))
        {
          const items = this.props.data.map((e, i) => {
            return <div className={`${fetching.slice}-data-item`} key={i}>{e}</div>
          })
          body = <div className=${`${fetching.slice}-data-list`}></div>
        }
        else if(typeof this.props.data === "object")
        {
          body = Object.keys(this.props.data).map((e, i) => {
            return (
              <div key={i} className={`${fetching.slice}-data-${e}-container`}>
                <div className={`${fetching.slice}-data-${e}-label`}>{e}</div>
                <div className={`${fetching.slice}-data-${e}-value`}>{this.props.data[e]}</div>
              </div>
            )
          })
        }
        else
        {
          body = <div className={`${fetching.slice}-data-value`}>{this.props.data.toString()}</div>
        }

        return (
          <div className={`${fetching.slice}-data-container`}>
            {body}
          </div>
        )
      }
    }

    render() {
      const body = (this.props.loading === null || this.props.loading === true)
        ? this.getLoading(this.props.loading)
        : (this.props.error) ? this.getError(this.props.error) : this.getData(this.props.data)

      return (
        <div className={`${fetching.slice}-container`}>
          {body}
        </div>
      )
    }
  }
  FetchableContainer.contextTypes =  { store: PropTypes.object };
  return connect((state, props) => {
    return state.yarl[fetching.slice] || {data: null, error: null, loading: null};
  })(FetchableContainer)
}
