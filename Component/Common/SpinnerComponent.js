import React from 'react';
import {ActivityIndicator,View,StyleSheet} from 'react-native';

const SpinnerLoading = ({visiable}) => {
  return (
    <View style={[styles.containerSpinner,visiable === true ? {} : {display: "none"}]}>
    <ActivityIndicator size="large" color="#00ff00" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerSpinner: {
    position:"absolute",
    height: "100vh",
    backgroundColor: "#fff",
    width: "100%",
    zIndex:9999,
    top: 0,
    left: 0
  },
  spinner:{
    position:"absolute",
    top: "35%",
    left: "50%",
    transform: [
      {
        translateX: "-50%",
        translateY: "-50%"
      }
    ],
    zIndex:10000
  }
});

export default SpinnerLoading;