import { types } from 'mobx-state-tree'
import jwt_decode from 'jwt-decode'
import {APICall, dataApi} from './apiBase'

const Auth = types.model("Auth", {
  user: '13701240303',
  pass: '12356',
  token: '',
  entity: '',
}).actions(self => ({
  login: APICall(
    () =>
      dataApi.post('/rpc/login', {
        name: self.user,
        pass: self.pass,
        role: 'client',
        isvip: 'false'
      }),
    res => {
      // 注意次序: token要首先被设置
      dataApi.defaults.headers.common['Authorization'] = `Bearer ${res.data[0].token}`
      self.token = res.data[0].token
      const decoded =jwt_decode(res.data[0].token)
      self.entity = decoded.entity
    }
  )
}))

export default Auth
