import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Linking, Image, StyleSheet, Button } from 'react-native';
import DetailCourse from '../Api/courseDetail';
import SpinnerLoading from '../Component/Common/SpinnerComponent';
import DetailCourseUdemy from '../Api/detailCourseUdemy';
import Helpers from '../Helpers/Helpers';
const CourseScreen = ({ route }) => {
  const argsSchema = {
    title: {
      rendered: ""
    },
    content:{
      rendered: ""
    },
    meta_box: {
      couponCode: "",
      id_course: "",
      isValid: "",
      price: "",
      url_enroll: "",
      url_img: "https://udemy-images.udemy.com/course/480x270/3342014_edfd_4.jpg",
    }
  };
  const [detailCourse, setDetailCourse] = useState(argsSchema);
  const [stateSpinner, setStateSpinner] = useState(true);
  const linkApi = route.params.link;


  useEffect(() => {

    // DetailCourseUdemy({
    //   id : "python-gui",
    //   coupon: "DDFE5266D18994645EA9"
    // }).then((result) => {
    //   console.log(result);
    // });


    DetailCourse(linkApi).then((result) => {
      setDetailCourse(result.data);
      setStateSpinner(false);
    }).catch((e) => console.log(e));
  }, []);

  const handlePress = (url) => useCallback(
    async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }
  );
  

  return (
    <View>
      <SpinnerLoading visiable={stateSpinner} />
      <View style={styles.wrapImage}>
        <Image style={styles.thumbnail} source={{
          uri: detailCourse.meta_box.url_img
        }} />
        <View style={styles.filterBackground}></View>
        <Text style={styles.titleCourse}>{Helpers.replaceSpecificCharacter(detailCourse.title.rendered)}</Text>
      </View>

      <View>
        <Text>{Helpers.stripHtml(detailCourse.content.rendered)}</Text>
      </View>
      <Button onPress={handlePress(detailCourse.meta_box.url_enroll)} title="Take Course" />
    </View>
  );
}

const styles =  StyleSheet.create({
  thumbnail: {
    height: "100%",
    resizeMode: "cover"
  },
  wrapImage:{
    height: 200,
    position: "relative"
  },
  filterBackground:{
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#00000096"
  },
  titleCourse:{
    position: "absolute",
    left: "0",
    top: "50%",
    transform: [{
      translateY: "-50%",
    }],
    width: "100%",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default CourseScreen;