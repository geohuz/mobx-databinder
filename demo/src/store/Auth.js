import { types } from 'mobx-state-tree'
import {dataApi} from './apiBase'

const Auth = types.model("Auth", {
  user: '',
  pass: '',
}).actions(self => ({
  login: ()=>dataApi.post('/rpc/login', {
        name: self.user,
        pass: self.pass,
      }).then(res=> {
        dataApi.defaults.headers.common['Authorization'] = `Bearer ${res.data[0].token}`
        self.token = res.data[0].token
      })
}))

export default Auth
