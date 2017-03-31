import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { StyleSheet} from 'react-native'
import { Provider, connect } from 'react-redux'
import createSagaMiddleware, { END } from 'redux-saga'

import reducerCombine from './reducers'
import createLogger from 'redux-logger'
import promise from 'redux-promise'
import AppRouter from './appRouter'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducerCombine,
  applyMiddleware(sagaMiddleware)
  
)
store.runSaga = sagaMiddleware.run
store.close = () => store.dispatch(END)
sagaMiddleware.run(rootSaga)

 

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
})



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    );
  }
}

export default App
