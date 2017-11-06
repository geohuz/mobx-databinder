// @flow
import React from 'react';
import Button from 'material-ui/Button'
import { observer, inject } from 'mobx-react'
import Binder from './utils'


const LoginButton = ({apiTrigger}) => 
  <Button raised color='primary' onClick={apiTrigger}>请登录</Button>

const App = ({appStore: {orderStore, auth}}) => {
  return (
    <div>
      <Binder component={LoginButton}
        api={auth.login}
        errorPlacement='popup'
        autoFetch={false}
      />
    </div> 
  )
}

export default inject('appStore')(observer(App))
