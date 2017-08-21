import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  // Css for HighScoreScreen.js
  highScoreText: {
    color: 'white',
    bottom:60,
    fontSize:20,
    fontFamily:'Pixeled'
  },
  container:{
    justifyContent: 'flex-start',
  },
  highScoreCotainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#182445',
  },
  // Css for Map.js
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleBar: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: 64,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  titleBarText: {
    color: '#f44242',
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
    paddingTop: 30
  },
  map: {
    flex: 0.7,
    width: width,
    height: height
  },
  scoreBar: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  scoreBarGroup: {
    flex: 1
  },
  scoreBarHeader: {
    color: '#fff',
    fontWeight: "400",
    textAlign: 'center'
  },
  scoreBarContent: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
    color: '#f44242',
    textAlign: 'center'
  }
});