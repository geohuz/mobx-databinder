import OrderStore from './OrderStore'
import Auth from './Auth'

const allStore = {
  orderStore: OrderStore.create({orders: []}),
  auth: Auth.create()
}

export default allStore
