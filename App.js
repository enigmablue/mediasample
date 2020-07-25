/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
console.disableYellowBox = true;

import Video from "react-native-video";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Container} from 'native-base';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const App: () => React$Node = () => {

  const [videoPaused, setVideoPaused] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [viewRef, setViewRef] = useState(null);
  const videoPlayer = React.useRef(null);
  let rate = 1.0;
  let paused = false

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const noop = () => {};


        const onSeek = seek => {
          videoPlayer?.current.seek(seek);
        };

        const onPaused = playerState => {
          setVideoPaused(!paused);
          setPlayerState(playerState);
        };

        const onReplay = () => {
          setPlayerState(PLAYER_STATES.PLAYING);
          videoPlayer?.current.seek(0);
        };

        const onProgress = data => {
          // Video Player will continue progress even if the video already ended
          if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
          }
        };

        const onLoad = data => {
          setDuration(data.duration);
          setIsLoading(false);
        };

        const onLoadStart = () => setIsLoading(true);

        const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

        const onSeeking = currentTime => {
          setCurrentTime(currentTime);
        }


          const renderControls = () => {

            return(
                    <View style={{ position: 'absolute', width: '100%', bottom: hp('5%') }}>
                                <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center' }}>
                                  <View style={{ marginLeft: wp('3%'), width: wp("85%")}}>

                                        <Text style={{ fontSize: 16, color: '#FFF' }}>
                                          {"John Wong"}
                                        </Text>

                                        <Text style={{ fontSize: 16, color: '#FFF'}}>
                                          {"Overwhelmed with standards, new challenges, and wishing you had time to incorporate social emotional learning?"}
                                        </Text>
                                      </View>

                                        <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 5, justifyContent: 'flex-end', alignItems: 'flex-end', bottom: hp('6%') }}>
                                          <Image style={{ height: 35, width: 35, marginRight:7, borderRadius: 43 / 2, bottom: 20 }}
                                                   source={{
                                                       uri:
                                                           ""
                                                   }} />
                                            <View style={{ alignItems: 'center' }}>

                                            <View style={{ alignItems: 'center' }}>
                                              <TouchableOpacity>
                                                <Image resizeMode="contain" style={{ height: 32, marginBottom: 5 }}
                                                source={

                                                  require('./images/heart.png')
                                                } />
                                                  <Text style={{ fontSize: 14, color: '#FFF', marginBottom: 20, textAlign: 'center' }}>
                                                    {0}
                                                </Text>
                                                </TouchableOpacity>
                                              </View>

                                                <TouchableOpacity>
                                                    <Image resizeMode="contain" style={{ height: 32, marginBottom: 5 }}
                                                           source={require('./images/comment1.png')} />
                                                    <Text style={{ fontSize: 14, color: '#FFF', marginBottom: 20, textAlign: 'center' }}>
                                                        { 0}
                                                    </Text>
                                                </TouchableOpacity>

                                                    <TouchableOpacity>
                                                        <Image resizeMode="contain" style={{ height: 33, marginBottom: 20 }}
                                                               source={require('./images/addShareToShare.png')} />
                                                    </TouchableOpacity>

                                                        <TouchableOpacity >
                                                            <Image resizeMode="contain" style={{ height: 22, marginBottom: 20 }}
                                                                   source={require('./images/three_dots.png')} />
                                                        </TouchableOpacity>

                                                        <TouchableOpacity >
                                                            <Image resizeMode="contain" style={{ height: 20, marginBottom: 20 }}
                                                                   source={require('./images/pin.png')
                                                                   }
                                                            />
                                                        </TouchableOpacity>

                                            </View>
                                            </View>
                                            </View>
                            </View>
                          )
          }


  return (
    <>
      <Container style={{flex:1}}>

      <View style={{flex:1}}>
      <Video
      source={{uri:"https://testsoqqle.s3.ap-southeast-1.amazonaws.com/stg/5ed6e73ad64748149c87941d/d49788cbba39565008217485f8d4ae6a.m3u8"}}   // Can be a URL or a local file.
      ref={ref => (videoPlayer.current = ref)}                                     // Store reference
      // Callback when video cannot be loaded
      fullscreen={false}
      resizeMode={"contain"}
      muted={false}
      poster={"https://media.giphy.com/media/VseXvvxwowwCc/giphy.gif"}
      rate={1.0}
      controls={false}
      paused = {paused}
      repeat={true}
      onEnd={onEnd}
     onLoad={onLoad}
     onLoadStart={onLoadStart}
     onProgress={onProgress}
      style={styles.mediaPlayer}
     onBuffer={(buffer)=>{console.log("starting buffer ")}}                // Callback when remote video is buffering
      onError={(error)=>{
        console.log(error)
      }}
    ignoreSilentSwitch={"ignore"}
        style={{height: '100%',width : '100%', position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        backgroundColor : "black",
        //   zIndex: 10,
        bottom: 0,
        right: 0}} >
    </Video>
    <MediaControls
      isFullScreen={isFullScreen}
      duration={duration}
      isLoading={isLoading}
      mainColor="orange"
      onFullScreen={noop}
      onPaused={onPaused}
      showOnStart={false}
      onReplay={onReplay}
      onSeek={onSeek}
      onSeeking={onSeeking}
      playerState={playerState}
      progress={currentTime}
      sliderStyle={{
             containerStyle: {
                alignItems: "center",
                alignSelf: "stretch",
                flex: 1,
                justifyContent: "center",
                marginBottom:-350,
             }}}
    >
      <MediaControls.Toolbar>
        <View>
          <Text></Text>
        </View>
      </MediaControls.Toolbar>
    </MediaControls>


</View>
  { renderControls()}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
