import React, { Component } from 'react';
import {
  PropTypes,
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableElement,
  TouchableOpacity,
  Switch,
  AlertIOS,
  ActivityIndicator,
  AppState,
  ScrollView,
  StatusBar,
  ActivityIndicatorIOS,
} from 'react-native'
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {Actions} from "react-native-router-flux";
import ComponentList from "../components/componentList"
import { doLogout }  from '../actions'
import * as appActions  from '../actions/appActions'


class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }
  componentWillMount() {
    /*const { isAuth, closeDrawer } = this.props;
    if(!isAuth){
      closeDrawer();
    }*/
  }
  _logOut(){
    const { closeDrawer, doLogout } = this.props;
    doLogout()
    closeDrawer();
    appActions.resetExecutionStatesForDrawer();
  }

  _closeDrawer(){
    const { closeDrawer, appActions } = this.props;
    closeDrawer();
    appActions.resetExecutionStatesForDrawer();
  }

  render() {
    const { closeDrawer, isAuth } = this.props;
    return(
      <ScrollView style={styles.container}>
        <Text style={styles.controlText}>Control Panel</Text>
        <TouchableOpacity style={styles.button} onPress={this._closeDrawer.bind(this)}>
          <Text style={styles.controlText}>Close Drawer</Text>
        </TouchableOpacity>
        <Button containerStyle={styles.signin} onPress={this._logOut.bind(this) } >
          <Text style={styles.whiteFont}>Logout</Text>
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#514B54',
  },
  controlText: {
    color: 'white'
  },
  button: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})

ControlPanel.propTypes = {
  closeDrawer: React.PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: bindActionCreators(doLogout, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
