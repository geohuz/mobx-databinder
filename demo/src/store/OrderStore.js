import { types, applySnapshot} from 'mobx-state-tree'
import {dataApi} from './apiBase'

const Order = types.model("Order", {
  order_code: types.optional(types.string, ""),
  buyer_elevator: types.optional(types.string, 'false')
})

const OrderStore = types.model('OrderStore', {
   orders: types.array(Order),
  })
  .actions(self => ({
    loadOrders: 
      () => dataApi.get(`/order_header_client_view`)
      .then(json => applySnapshot(self.orders, json.data))
  }))

export default OrderStore
