import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './pages/auth/Login/Login';
import Sign from './pages/auth/Sign/Sign';

import Messages from './pages/Messages/Messages';

import FlashMessage from 'react-native-flash-message';

import colors from './styles/color';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user); // Boolean değer olarak döner
    });
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignPage" component={Sign} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {!userSession ? (
        <AuthStack /> /* AuthStack() */
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="MessagesScreen"
            component={Messages}
            options={{
              title: 'Dertler',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold', color: colors.purple},
              headerBackVisible: false,
              headerRight: () => (
                <Icon
                  name="logout"
                  size={25}
                  color={colors.purple}
                  onPress={() => auth().signOut()}
                />
              ),
            }}
          />
        </Stack.Navigator>
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
