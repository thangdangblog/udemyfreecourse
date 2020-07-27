import React,{useState,useEffect} from 'react';
import {Text,View,FlatList,TouchableOpacity,Image,StyleSheet} from 'react-native';
import ListPost from '../Api/listCourse'
import Helpers from '../Helpers/Helpers';

const HomeScreen = (props) => {
  const argsSchema = {
    title: {
      rendered : ""
    },
    meta_box: {
      url_img: "https://udemy-images.udemy.com/course/480x270/3342014_edfd_4.jpg"
    },
    _links: {
      self : [
        {
          href : ""
        }
      ]
    }
  };
  const [dataCourse,setDataCourse] = useState({argsSchema});

  useEffect(() => {
    ListPost({
      per_page : 10
    }).then((result) => {
      setDataCourse(result.data);
    }).catch((error) => {
      console.log(error);
    });
  },[]);

  console.log(props);
  
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.oneItem} onPress={() => props.navigation.navigate("coursePage",{
        link : item._links.self[0].href
      })
      } >
        <View style={styles.container_oneItem}>
          <Image style={styles.imageThumbnail} source={{
              uri : item.meta_box.url_img
            }} />
          <View style={styles.rightOneItem}>
            <Text>{Helpers.replaceSpecificCharacter(item.title.rendered)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  const styles = StyleSheet.create({
    oneItem:{
      marginBottom: 5,
      padding: 5
    },
    container_oneItem:{
      borderColor: '#cccccc',
      borderWidth: 1,
      flexDirection: "row",
    },
    imageThumbnail:{
      width: "40%",
      height: 90,
      resizeMode: "cover"
    },
    rightOneItem:{
      width: "58%",
      marginLeft: "2%"
    }
  });

  return (
    <View>
      <FlatList
      data={dataCourse}
      renderItem = {renderItem}
      keyExtractor = {(item) => item.id.toString()} 
    />
    </View>
    
  );

  
  
}

export default HomeScreen;