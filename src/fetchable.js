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
         return (<div>{err.toString()}</div>)
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
         return (<div>Loading...</div>)
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
        return <div>{data.toString()}</div>
      }
    }

    render() {
      const body = (this.props.loading === null || this.props.loading === true)
        ? this.getLoading(this.props.loading)
        : (this.props.error) ? this.getError(this.props.error) : this.getData(this.props.data)

      if(this.props.Container)
      {
        const Container = this.props.Container;
        return (
          <Container>
            {body}
          </Container>
        )
      }
      else
      {
        return (
          <div>
            {body}
          </div>
        )
      }
    }
  }
  FetchableContainer.contextTypes =  { store: PropTypes.object };
  return connect((state, props) => {
    return state.yarl[fetching.slice] || {data: null, error: null, loading: null};
  })(FetchableContainer)
}
