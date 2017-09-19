// @flow
import React from 'react';
import Button from 'material-ui/Button'
import { observer, inject } from 'mobx-react'
import binderCreator from '../../src'
import LoadSpinner from './components/Spinner'
import ErrorPopup from './components/ErrorPopup'
import ErrorInplace from './components/ErrorInplace'

const Binder = binderCreator(
  { store: 'appStore', 
    loadComponent: LoadSpinner, 
    errorComponents: {
      'popup': ErrorPopup, 
      'inplace': ErrorInplace
    }
  }
)

const Orders = ({appStore: {orderStore}}) => {
return (
  <div>
    <h1> Orders </h1>
    {orderStore.orders.map(item=>
      <div>
        <div>{item.order_code}</div>
      </div>
    )}
    <Binder
      component={
        ({bindData})=> <Button raised color='primary' onClick={bindData}>刷新数据</Button>
      }
      api={orderStore.loadOrders}
      errorPlacement='popup'
      autoFetch={false}
    />
  </div>
)}

const LoginButton = ({bindData}) => 
  <Button raised color='primary' onClick={bindData}>请登录</Button>

const App = ({appStore: {orderStore, auth}}) => {
  return (
    <div>
      <Binder component={LoginButton}
        api={auth.login}
        errorPlacement='popup'
        autoFetch={false}
      />
      {auth.token===''? null :
        <Binder component={Orders}
          api={orderStore.loadOrders}
          errorPlacement='inplace'
          autoFetch 
        />
      }
    </div> 
  )
}

export default inject('appStore')(observer(App))
