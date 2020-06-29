/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from 'axios';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as theme from './src/constants/theme.json';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import AppointmentAddScreen from './src/screens/AppointmentAddScreen';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: '',
    };
    this.axiosSetter();
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({
      token,
    });
  };

  axiosSetter = async () => {
    const token = await AsyncStorage.getItem('token');

    const self = this;
    await Axios.interceptors.request.use(
      function (config) {
        config.baseURL = 'http://192.168.43.62:8080/api/';
        config.headers = {'x-access-token': token};
        // spinning start to show
        self.setState({
          loading: true,
        });
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    Axios.interceptors.response.use(
      function (response) {
        // spinning hide
        self.setState({
          loading: false,
        });

        return response;
      },
      function (error) {
        self.setState({
          loading: false,
        });
        return Promise.reject(error);
      },
    );
  };

  render() {
    return (
      <>
        <Spinner visible={this.state.loading} />
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              {!this.state.token ? (
                <Stack.Screen name="Login" component={LoginScreen} />
              ) : (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen
                    name="AppointmentAdd"
                    component={AppointmentAddScreen}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
