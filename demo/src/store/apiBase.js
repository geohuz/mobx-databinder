import axios from 'axios'
import errorLog from './errorLog'
import {process} from 'mobx-state-tree'

export const dataApi = axios.create({
  baseURL: '',  // put your api server
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
