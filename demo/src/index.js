import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import allStore from './store/allStore.js'
import {Provider} from 'mobx-react'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'

const theme = createMuiTheme()

const Main = () =>
  <MuiThemeProvider theme={theme}>
    <Provider appStore={allStore}>
      <App />
    </Provider>
  </MuiThemeProvider>

ReactDOM.render(<Main />, document.getElementById('demo'));
registerServiceWorker();
