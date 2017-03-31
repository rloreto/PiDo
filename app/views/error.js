'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Button from 'react-native-button';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Actions } from "react-native-router-flux";



class Error extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    console.log('Component-Lifecycle', 'componentWillUnmount', 'LoginScreen');
  }

  render() {

    return (
        <View style={styles.container}>
            
        </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
    },
    activityIndicatorContainer: {
      alignItems: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})


function stateToProps(state) {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

export default connect(stateToProps, mapDispatchToProps)(Error)
