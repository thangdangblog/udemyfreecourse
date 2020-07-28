import React,{useState,useEffect} from 'react';
import {Text,View,FlatList,TouchableOpacity,Image,StyleSheet} from 'react-native';
import ListPost from '../Api/listCourse'
import Helpers from '../Helpers/Helpers';
import SpinnerLoading from '../Component/Common/SpinnerComponent';

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
  const [stateSpinner, setStateSpinner] = useState(true);
  const [currentPage,setCurrentPage] = useState(1);
  const pagePage = 4;

  useEffect(() => {
    ListPost({
      per_page : pagePage,
      page: currentPage
    }).then((result) => {
      setDataCourse(result.data);
      setStateSpinner(false);
    }).catch((error) => {
      console.log(error);
    });
  },[]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setStateSpinner(true);

    ListPost({
      per_page : pagePage,
      page: currentPage + 1
    }).then((result) => {
      setDataCourse(result.data);
      setStateSpinner(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  const prePage = () => {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    setStateSpinner(true);
    ListPost({
      per_page : pagePage,
      page: currentPage === 1 ? 1 : currentPage - 1
    }).then((result) => {
      setDataCourse(result.data);
      setStateSpinner(false);
    }).catch((error) => {
      console.log(error);
    });
  }

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

  return (
    <View style={styles.container}>
      <SpinnerLoading visiable={stateSpinner} />
      <FlatList
        data={dataCourse}
        renderItem = {renderItem}
        keyExtractor = {(item) => item.id.toString()} 
      />
      <View style={styles.tool}>
        <TouchableOpacity style={styles.buttonDirection} onPress={prePage}>
          <Text style={{textAlign: "center",color:"#fff"}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDirection} onPress={nextPage}>
          <Text style={{textAlign: "center",color:"#fff"}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  },
  spinner:{
    color: "#fff",
    position: "absolute"
  },
  tool:{
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  buttonDirection:{
    width: "40%",
    backgroundColor: "blue",
    marginLeft: "6.666666%",
    padding: 10
  }
});

export default HomeScreen;