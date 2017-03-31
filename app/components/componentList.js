import React, { Component } from 'react';
import {
  Dimensions,
  PixelRatio,
  Image,
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  AppState
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import SwitchBlind from './switchBlind';
import SwitchAudio from './switchAudio';
import Dimmer from './dimmer';
import Socket from './socket';
import { loadComponents, changeAudioSwitch, changeSocket, changeDimmer, upBlindStart, upBlindStop, downBlindStart, downBlindStop} from '../actions';
import * as appActions from '../actions/appActions'


import gradient from '../../img/gradient161.jpg';

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)


const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 150;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: window.width,
      height: window.height
  },
  activityIndicator: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  header: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3F51B5',
      flexDirection: 'column',
      paddingTop: 25
  },
  headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'
  },
  text: {
      color: 'white',
      paddingHorizontal: 8,
      fontSize: 16
  },
  rowStyle: {
      paddingVertical: 20,
      paddingLeft: 16,
      borderTopColor: 'white',
      borderLeftColor: 'white',
      borderRightColor: 'white',
      borderBottomColor: '#E0E0E0',
      borderWidth: 1
  },
  rowText: {
      color: '#212121',
      fontSize: 16
  },
  subText: {
      fontSize: 14,
      color: '#757575'
  },
  section: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 6,
      backgroundColor: '#2196F3'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedLeftHeaderSection: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});



class ComponentList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    this.state = {
        dataSource: ds.cloneWithRowsAndSections({}),
        scrollEnabled: true,
        headerText: 'Todos los dispositivos'
    };

  }

  componentDidMount() {
    const { componentActions } = this.props;
    AppState.addEventListener('change', this.handleAppStateChange);

    //this.startTimer();
  }

  componentWillMount() {
    this.setState({appState: AppState.currentState})
    const { loadComponents } = this.props;
    loadComponents();
  }

  handleAppStateChange(appState) {
    this.setState({appState: appState})

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isWorking!==this.props.isWorking){
      this.setState({
        isWorking:nextProps.isWorking
      })
    }
    if(nextProps.loaded!==this.props.loaded){
      this.setState({
        loaded: nextProps.loaded
      })
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.listViewData.dataBlob || {}, nextProps.listViewData.sectionIdentities || [], nextProps.listViewData.rowIdentities || [])
    })
  }

   startTimer(){
    if(!this.state.timerId){
      let timerId = this.setInterval(
           async () => {
            if(!this.state.isWorking && (this.state.appState==='active' || this.state.appState==='background')){
              console.log('reload componets');
              const { loadComponents } = this.props;
              loadComponents();
            }
          },
          5000
        );
        this.setState({
          timerId: timerId
        })
    }
  }

  stopTimer(){
    if(this.state.timerId){
      this.clearTimeout(this.state.timerId);
      this.setState({
        timerId: undefined
      })
    }
  }




  renderRow (rowData, sectionID, rowID) {

      const {  changeAudioSwitch, components, changeSocket, changeDimmer, upBlindStart, upBlindStop, downBlindStart, downBlindStop} = this.props;

      if(rowData.type ==='switchBlind'){
        return (<SwitchBlind rowData={rowData}  upBlindStart={upBlindStart} upBlindStop={upBlindStop}  downBlindStart={downBlindStart}  downBlindStop={downBlindStop}  ></SwitchBlind>);
      }

      if(rowData.type ==='switchAudio'){
        return (<SwitchAudio rowData={rowData} changeAudioSwitch={changeAudioSwitch}></SwitchAudio>);
      }

      if(rowData.type ==='dimmer'){
        return (<Dimmer rowData={rowData} changeDimmer={changeDimmer}>></Dimmer>);
      }


      if(rowData.type ==='socket'){
        return (<Socket rowData={rowData} changeSocket={changeSocket} ></Socket>);
      }

      return (<Text>TBD component</Text>);

  }
  renderSectionHeader(sectionData, sectionID) {
       return (
           <View style={styles.section}>
               <Text style={styles.text}>{sectionID}</Text>
           </View>
       );
   }
   renderLoadingView() {
     return (
       <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
        <ActivityIndicator
            animating={!this.state.loaded}
            style={[styles.activityIndicator, {height: 80}]}
            size="large"
        />
        </View>
       );
   }

  renderListView () {
     const { changeDimmer, changeAudioSwitch, components, appActions } = this.props;
     const { headerText} = this.state;
     const { onScroll = () => {} } = this.props;
      return (

        <View style={styles.container}>

             <ListView
                  ref="ListView"
                  enableEmptySections={true}
                  style = {styles.listview}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  renderSectionHeader = {this.renderSectionHeader}
                  renderScrollComponent={props => (
                    <ParallaxScrollView
                      onScroll={onScroll}

                      headerBackgroundColor="#333"
                      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                      parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                      backgroundSpeed={10}

                      renderBackground={() => (
                        <View key="background">
                          <Image style={{
                            width: window.width,
                            height: PARALLAX_HEADER_HEIGHT
                            }}
                            source={require('../../img/domotic.gif')}/>
                          <View style={{position: 'absolute',
                                        top: 0,
                                        width: window.width,
                                        backgroundColor: 'rgba(0,0,0,.4)',
                                        height: PARALLAX_HEADER_HEIGHT}}/>
                        </View>
                      )}

                      renderForeground={() => (
                        <View key="parallax-header" style={ styles.parallaxHeader }>

                          <Text style={ styles.sectionHeaderText }>
                            {headerText}
                          </Text>
                          <Text style={ styles.sectionTitleText }>

                          </Text>
                        </View>
                      )}

                      renderStickyHeader={() => (
                        <View key="sticky-header" style={styles.stickySection}>
                          <Text style={styles.stickySectionText}>{headerText}</Text>
                        </View>
                      )}

                      renderFixedHeader={() => (
                        <View>
                          <View key="fixed-left-header" style={styles.fixedLeftHeaderSection}>
                            <Icon name="user" size={24} color="#fff"
                              onPress={() => appActions.openDrawer()}/>
                          </View>
                          <View key="fixed-header" style={styles.fixedSection}>
                            <Text style={styles.fixedSectionText}
                                  onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                              Scroll to top
                            </Text>
                          </View>
                        </View>
                      )}/>
                  )}
             />
         </View>
      );
  }

  render() {
    const {  loaded } = this.props;
    if (!loaded) {
      return this.renderLoadingView();
    }
    return this.renderListView();

  }
}

reactMixin(ComponentList.prototype, TimerMixin);


const mapStateToProps = (state) => {
  return {
    loaded: state.component.loaded,
    listViewData: state.component.listViewData
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadComponents: bindActionCreators(loadComponents, dispatch),
    upBlindStart: bindActionCreators(upBlindStart, dispatch),
    upBlindStop: bindActionCreators(upBlindStop, dispatch),
    downBlindStart: bindActionCreators(downBlindStart, dispatch),
    downBlindStop: bindActionCreators(downBlindStop, dispatch),
    changeAudioSwitch: bindActionCreators(changeAudioSwitch, dispatch),
    changeDimmer: bindActionCreators(changeDimmer, dispatch),
    changeSocket: bindActionCreators(changeSocket, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
