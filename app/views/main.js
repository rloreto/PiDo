import React, { Component } from 'react';
import {
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
  StatusBar
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import ComponentList from "../components/componentList"

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    }
});
class Main extends Component {
  constructor(props) {
    super(props);
  }
  debugger;
  render() {
    return(
        <ComponentList/>

    );
  }
}



function mapStateToProps(state) {
  return {  }
}

export default connect(mapStateToProps)(Main);
