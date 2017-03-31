import React, { Component } from 'react';
import {  bindActionCreators } from 'redux';
import { StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';

import reducerCombine from './reducers';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import Login from './views/login';
import Main from './views/main';
import Error from './views/error';

import ControlPanel from './views/controlPanel';
import { doCheckAuth } from './actions'
import * as appActions from './actions/appActions'

import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import Drawer from 'react-native-drawer'


var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const RouterWithRedux = connect()(Router);

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};


class AppRouter extends Component {


  constructor(props) {
    super(props);
    this.state={
      drawerOpen: false,
      drawerDisabled: false,
    };
  }


  closeDrawer = () => {
    if(this._drawer){
      this._drawer.close()
    }
  }

  openDrawer = () => {
    if(this._drawer){
      this._drawer.open()
    }
  }

  componentWillMount() {
    const { doCheckAuth } = this.props;
    if(doCheckAuth){
      doCheckAuth();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuth){
      if(nextProps.executeOpenDrawer){
          this.openDrawer()
      }
      if(nextProps.executeCloseDrawer) {
          this.closeDrawer()
      }
    }
  }

  render() {
    const { pendingToChechAuth, isAuth, appActions } = this.props;
    if (!pendingToChechAuth) {
      return (
        <Drawer ref={(ref) => this._drawer = ref}
         type="static"
         content={
           <ControlPanel closeDrawer={this.closeDrawer} />
         }
         acceptDoubleTap
         styles={drawerStyles}
         onOpen={() => {
           console.log('onopen')
           this.setState({drawerOpen: true})
            appActions.resetExecutionStatesForDrawer();
         }}
         onClose={() => {
           console.log('onclose')
           this.setState({drawerOpen: false})
           appActions.resetExecutionStatesForDrawer();
         }}
         captureGestures={false}
         tweenDuration={100}
         panThreshold={0.08}
         disabled={!isAuth}
         openDrawerOffset={(viewport) => {
           return 100
         }}
         closedDrawerOffset={() => 0}
         panOpenMask={0.2}
         negotiatePan>
          <RouterWithRedux  createReducer={reducerCreate}>
            <Scene key="root" hideNavBar>
              <Scene key="login" component={Login} initial={!isAuth} />
              <Scene key="main" component={Main} initial={isAuth} title="Main"/>
              <Scene key="error" component={Error} title="Error"/>
            </Scene>
          </RouterWithRedux>
        </Drawer>
      );
    } else {
      return (
        <View />
      )
    }

  }
}

const drawerStyles = {
  drawer: { shadowColor: '#FFFFFF', shadowOpacity: 0.3, shadowRadius: 3},
  main: {paddingLeft: 0},
}

const mapStateToProps = (state) => {
  return {
    pendingToChechAuth: state.loginReducer.pendingToChechAuth,
    isAuth: state.loginReducer.isAuth,
    executeOpenDrawer: state.appReducer.executeOpenDrawer,
    executeCloseDrawer: state.appReducer.executeCloseDrawer
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    doCheckAuth: bindActionCreators(doCheckAuth, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
