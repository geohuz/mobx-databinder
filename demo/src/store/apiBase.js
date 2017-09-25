import axios from 'axios'
import errorLog from './errorLog'
import {process} from 'mobx-state-tree'

export const dataApi = axios.create({
  baseURL: 'http://123.123.123.123:3000',
  timeout: 10000
})

export const APICall = (caller, afterSuccCall) =>  process(function* () {
  try {
    let res = yield caller()
    afterSuccCall(res)
  } catch (e) {
    errorLog(e)
    throw(e)
  }
})
