import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogScreen from '../screens/BlogScreen';
import Home from '../screens/Home';
import TopStories from '../screens/TopStoriesScreen';
import BusinessNews from '../screens/BusinessNews';
import AllTopStories from '../screens/AllTopStories';
import AllBusinessNews from '../screens/AllBusinessNews';
import Entertainment from '../screens/Entertainment';
import AllEntertainment from '../screens/AllEntertainment';
import Sports from '../screens/Sports';
import AllSports from '../screens/AllSports';
import Search from '../screens/Search';
import NewsStand from '../screens/NewsStand';
import TopHeadlines from '../screens/TopHeadlines';
import General from '../screens/General';
import AllGeneral from '../screens/AllGeneral';
import Technology from '../screens/Technology';
import AllTechnology from '../screens/AllTechnology';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// Custom header component with an image
const CustomHeader = ({ scene }) => {
    return (
      <Image
        source={require('../img/news_pulse.png')}
        style={{
          resizeMode: 'cover',
        }}
      />
    );
  };
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        options={{
            headerTitle: (props) => <CustomHeader {...props} />,
          headerStyle: {
            backgroundColor: 'aliceblue', // Change the background color
          },
          headerTintColor: '#FF5733', // Change the text color
          headerTitleStyle: {
            fontWeight: '700',
            height:80,
          },
         
        }}
        component={Home}
      />
      <Stack.Screen name="BlogScreen" options={{ title: '' }} component={BlogScreen} />
      <Stack.Screen name="BusinessNews" options={{ title: '' }} component={BusinessNews} />
      <Stack.Screen name="AllBusinessNews" options={{ title: '' }} component={AllBusinessNews} />
      <Stack.Screen name="Entertainment" options={{ title: '' }} component={Entertainment} />
      <Stack.Screen name="AllEntertainment" options={{ title: '' }} component={AllEntertainment} />
      <Stack.Screen name="Sports" options={{ title: '' }} component={Sports} />
      <Stack.Screen name="AllSports" options={{ title: '' }} component={AllSports} />
      <Stack.Screen name="AllTopStories" options={{ title: '' }} component={AllTopStories} />
      <Stack.Screen name='Search' options={{ title: '' }} component={Search}/>
      <Stack.Screen name='General' options={{ title: '' }} component={General}/>
      <Stack.Screen name='AllGeneral' options={{ title: '' }} component={AllGeneral}/>
      <Stack.Screen name='Technology' options={{ title: '' }} component={Technology}/>
      <Stack.Screen name='AllTechnology' options={{ title: '' }} component={AllTechnology}/>


    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator  screenOptions={{
        tabBarStyle: { backgroundColor: 'aliceblue', height:65 }, // Style for the entire tabBar
        tabBarItemStyle: { paddingBottom: 5, paddingTop: 5 }, // Style for each tab
        tabBarLabelStyle: { fontSize: 13 }, // Style for the tab labels
        tabBarIconStyle: { marginBottom: 0 }, // Style for the tab icons
        activeTintColor: '#FF5733', // Color for the active tab
        inactiveTintColor: '#888', // Color for inactive tabs
        
      }}>
      <Tab.Screen name="For You" options={{
          headerTitle: "Abhinav Mishra News",
          headerShown: false, // Hide the header if needed
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../img/home-icon.png')} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }} 
        component={HomeStack} />
           <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../img/search-icon.png')} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
        component={Search}
      />

<Tab.Screen
        name="Headlines"
        options={{
          tabBarLabel: "Headlines",
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../img/headlines.png')} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
        component={TopHeadlines}
      />

<Tab.Screen
        name="NewsStand"
        options={{
          tabBarLabel: "NewsStand",
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../img/newsstand.png')} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
        component={NewsStand}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
