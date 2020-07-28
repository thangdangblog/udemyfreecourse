import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{title:"Udemy Free Course"}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{title:"Free Course"}} name="coursePage" component={CourseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;