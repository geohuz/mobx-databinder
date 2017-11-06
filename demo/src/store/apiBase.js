import axios from 'axios'
import errorLog from './errorLog'
import {process} from 'mobx-state-tree'

export const dataApi = axios.create({
  baseURL: '',  // put your api server
  timeout: 10000
})

