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
  AppState
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';

var styles = StyleSheet.create({

    rowStyle: {
        paddingVertical: 20,
        paddingLeft: 16,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderWidth: 1,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowText: {
        color: '#212121',
        fontSize: 16,
        marginRight: 10,
        flex: 1,
    },
    rowSwitch: {
      marginRight: 15,
      flexDirection: 'row',
    }
  });

class SwitchBlind extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { rowData, upBlindStart, upBlindStop, downBlindStart, downBlindStop  } = this.props;

    return(
      <View style={styles.rowStyle}>
        <Text style={styles.rowText}>{rowData.name}</Text>
        <View style={styles.rowSwitch}>
          <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, borderLeftColor: 'red'}}
            onPressIn={() =>  upBlindStart(rowData)}
            onPressOut={() => upBlindStop(rowData)}>
            Up
          </Button>
          <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, borderLeftColor: 'red'}}
            onPressIn={() => downBlindStart(rowData)}
            onPressOut={() => downBlindStop(rowData)}>
            Down
          </Button>
        </View>

      </View>
    );
  }
}



function mapStateToProps(state) {
  return {  }
}

export default connect(mapStateToProps)(SwitchBlind);
