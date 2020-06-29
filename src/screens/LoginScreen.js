import React, {Component} from 'react';
import {View, StyleSheet, Button, AsyncStorage} from 'react-native';
import {withTheme, Text, Card, Input} from 'react-native-elements';
import {login} from '../services/api';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'customer@gmail.com',
      password: 'test12',
      error: '',
    };
  }

  onChangeText = (field, value) =>
    this.setState({
      [field]: value,
      error: '',
    });

  submit = async () => {
    login(this.state.email, this.state.password)
      .then(async ({data}) => {
        await AsyncStorage.setItem('token', data.token);
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          error: e.response?.data.message || e,
        });
      });
  };

  render() {
    const {
      colors: {primary},
      demoStyles: {elevationStyle},
    } = this.props.theme;
    const {email, password} = this.state;
    return (
      <View style={[styles.containerStyle, {backgroundColor: primary}]}>
        <Card containerStyle={[styles.cardStyle, elevationStyle]}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(value) => this.onChangeText('email', value)}
          />
          <Input
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(value) => this.onChangeText('password', value)}
          />
          <Button
            title="Submit"
            disabled={!email || !password}
            onPress={this.submit}
          />
          {this.state.error != '' && (
            <Text style={styles.errorStyle}>{this.state.error}</Text>
          )}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    padding: 20,
    width: '90%',
    borderRadius: 10,
  },
  errorStyle: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default withTheme(LoginScreen);
