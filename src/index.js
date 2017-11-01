// @flow
import React from 'react'
import {withHandlers, withState, compose, lifecycle, withProps} from 'recompose'
import {observer, inject} from 'mobx-react'
import R from 'ramda'


const withLoad =
  compose(
    withState('loading', 'setLoading', false),
    withState('error', 'setError', null),
    withHandlers({
      apiTrigger: (props) => () => {
        props.setLoading(true)
        return props.api.split('.').reduce((o,i)=>o[i], props[props.store])()
        .then(res => {
          props.setLoading(false)
        })
        .catch(error => {
          props.setLoading(false)
          if (error.response) {
            props.setError(error.response.data.message)
          } else {
            props.setError(error.message)
          }
        })
      }
    }),
    lifecycle({
      componentDidMount() {
        this.props.autoFetch && this.props.apiTrigger()
      }
    })
  )

const Databinder = (props) => {
  return (
    <div>
      {
        props.errorPlacement!=='inplace'? [
          props.loading? React.createElement(props.loadComponent) : React.createElement(props.component, props),
          props.error!==null? React.createElement(props.errorComponents[props.errorPlacement], {...props}) : null
        ] :
          props.loading? React.createElement(props.loadComponent)
            : props.error!==null? React.createElement(props.errorComponents[props.errorPlacement], {...props})
              : React.createElement(props.component, props)
      }
    </div>
  )
}

const withConfigs = (configObj) =>
  compose(
    inject(configObj.store),
    // withProps('store', configObj))
    withProps(configObj)
  )

const binderCreator = ({store, loadComponent, errorComponents}) => 
  withConfigs({
    store: store,
    loadComponent: loadComponent,
    errorComponents: errorComponents
  })(withLoad(observer(Databinder)))
  

export default binderCreator
