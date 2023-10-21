import { Post, Circle, Map } from '../../../screens/mycomponent';
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Middle } from '../Middle';

const Tab = createBottomTabNavigator();

const Label = ({ label }) => {
  return(
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#44403C'}}>
      {label}
    </Text>
  </View>
  )
}

export const AltComponent = () => {
  return(
    <Tab.Navigator
      initialRouteName="Post"
      screenOptions={({ route }) => ({
        // tabBarOptions: (props) => <Middle {...props} /> ,
        headerShown: false,
        tabBarIcon: () => null,
        tabBarLabel: route.name,
        tabBarActiveBackgroundColor: '#FFE3E0',
        tabBarLabelStyle:{
          color: '#000000',
          fontSize: 15,
          alignItems: 'center',
          marginBottom: 12
        },
      })}
    >
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Map" component={Map}/>
      <Tab.Screen name="Circle" component={Circle} />
    </Tab.Navigator>
  );
};