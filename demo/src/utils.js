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

export default Binder