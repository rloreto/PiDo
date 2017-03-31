import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Switch,
  AlertIOS,
  ActivityIndicator,
  AppState,
  Picker,
  MapView,
} from 'react-native'
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
        flex: 1,
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
      marginRight: 15
    }
});

class SwitchAudio extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { rowData, changeAudioSwitch } = this.props;
    return(<TouchableOpacity onPress={(value)=>{changeAudioSwitch(rowData)}}>
        <View style={styles.rowStyle}>
            <Text style={styles.rowText}>{rowData.name}</Text>
            <Switch style={styles.rowSwitch} onValueChange={(value)=>{changeAudioSwitch(rowData)}} value={rowData.value === 1} />
        </View>
    </TouchableOpacity>);
  }
}



function mapStateToProps(state) {
  return {  }
}

export default connect(mapStateToProps)(SwitchAudio);
