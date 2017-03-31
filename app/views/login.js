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
import { doLogin }  from '../actions';
import {Actions} from "react-native-router-flux";



class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: 'rloreto@gmail.com',
      password: 'holamundo'
    };
  }

  componentWillUnmount() {
    console.log('Component-Lifecycle', 'componentWillUnmount', 'LoginScreen');
  }

  render() {

    const {  doLogin, isAuth, isLoading, error } = this.props;

    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require('../images/xlQ56UK.jpg')} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Pasword"
                        placeholderTextColor="#FFF"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.activityIndicatorContainer}>
                    
                  <Text style={styles.error} hidden={error}>{error}</Text>
                  <ActivityIndicator hidden={!error}
                      animating={isLoading}
                      style={[{height: 80}]}
                  />
                </View>
      
            </View>
            <Button disabled={isLoading} containerStyle={styles.signin} onPress={() => doLogin(this.state.username, this.state.password)}>
              <Text style={styles.whiteFont}>Sign In</Text>
            </Button>
            <View style={styles.signup}>
                <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}> Sign Up</Text></Text>
            </View>
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    error: {
      color: '#FF3366',
      justifyContent: 'center',
      alignItems: 'center'
    },
})

function stateToProps(state) {
  return {
    counter: state.counter,
    isAuth: state.loginReducer.isAuth,
    isLoading: state.loginReducer.isLoading,
    error: state.loginReducer.error
  };
}


const mapDispatchToProps = (dispatch) => {
  return { doLogin: bindActionCreators(doLogin, dispatch) }
}

export default connect(stateToProps, mapDispatchToProps)(Login)
