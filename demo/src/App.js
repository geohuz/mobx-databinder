// @flow
import React from 'react';
import Button from 'material-ui/Button'
import { observer, inject } from 'mobx-react'
import binderCreator from '../../src'
import LoadSpinner from './components/Spinner'
import ErrorPopup from './components/ErrorPopup'
import ErrorInplace from './components/ErrorInplace'

const Binder = binderCreator(
  { store: 'store', 
    loadComponent: LoadSpinner, 
    errorComponents: {
      'popup': ErrorPopup, 
      'inplace': ErrorInplace
    }
  }
)

const Orders = ({store, ...props}) => {
return (
  <div>
    <h1> Orders </h1>
    {store.orderStore.orders.map(item=>
      <div>
        <div>{item.order_code}</div>
      </div>
    )}
    <Binder
      component={
        ({bindData})=> <Button raised color='primary' onClick={bindData}>刷新数据</Button>
      }
      api={store.orderStore.loadOrders}
      errorPlacement='popup'
      autoFetch={false}
    />
  </div>
)}

const LoginButton = ({bindData}) => 
  <Button raised color='primary' onClick={bindData}>请登录</Button>

const App = ({store}) => {
  return (
    <div>
      <Binder component={LoginButton}
        api={store.auth.login}
        errorPlacement='popup'
        autoFetch={false}
      />
      {store.auth.token===''? null :
        <Binder component={Orders}
          api={store.orderStore.loadOrders}
          errorPlacement='inplace'
          autoFetch 
        />
      }
    </div> 
  )
}

export default inject('store')(observer(App))
