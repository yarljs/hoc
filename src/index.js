import React from 'react';
import {connect} from 'react-redux'
import yarlReduce from '@yarljs/reduce';
import yarlFetch from '@yarljs/fetch';
import * as PropTypes from 'prop-types';

export function Fetchable(fetching, params, transform) {
  class FetchableContainer extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {

      this.context.store.dispatch(fetching(params, transform));
    }

    getLoading(loading) {
      return (<div>loading ...</div>)
    }

    getData(data) {
      const body = this.props.data.map((e, i) => {
        return <div key={i}>{e}</div>
      })
      return (
        <div>
          {body}
        </div>
      )
    }

    getError(err) {
      return <div>{err.toString()}</div>
    }

    render() {
      const body = (this.props.loading === null || this.props.loading === true)
        ? this.getLoading(this.props.loading)
        : (this.props.error) ? this.getError(this.props.error) : this.getData(this.props.data)

      return (
        <div className={`${fetching.slice}-root-container`}>
          {body}
        </div>
      )
    }
  }
  FetchableContainer.contextTypes =  { store: PropTypes.object };
  return connect((state, props) => {
    return state.yarl[fetching.slice];
  })(FetchableContainer)
}
