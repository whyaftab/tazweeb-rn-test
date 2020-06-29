import React, {Component} from 'react';
import {View, StyleSheet, Button, AsyncStorage} from 'react-native';
import {withTheme, Text, Card, Input} from 'react-native-elements';
import {login, sendAppointmentRequest} from '../services/api';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ModalBox} from '../components';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isCalendarVisible: false,
      date: '',
      time: '',
      slot: {days: []},
      selectedDate: '',
      time: new Date(),
    };
  }

  componentDidMount = () => {
    this.setState({
      slot: this.props.route.params?.slot,
    });
  };

  onChangeText = (field, value) =>
    this.setState({
      [field]: value,
      error: '',
    });

  submit = async () => {
    sendAppointmentRequest(this.state.password + '' + this.state.time)
      .then(async ({data}) => {
        await AsyncStorage.setItem('token', data.token);
      })
      .catch((e) =>
        this.setState({
          error: e.response?.data.message || e,
        }),
      );
  };

  onDayPress = (data) => {
    this.setState({
      isCalendarVisible: false,
      selectedDate: data.dateString,
    });
  };

  toggleCalendar = () =>
    this.setState((prev) => ({isCalendarVisible: !prev.isCalendarVisible}));

  render() {
    const {email, password} = this.state;
    return (
      <View style={[styles.containerStyle]}>
        {this.state.error != '' && (
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        )}
        <TouchableOpacity onPress={this.toggleCalendar} style={{width: '100%'}}>
          <Input
            placeholder="date"
            editable={false}
            value={this.state.selectedDate}
            pointerEvents="none"
            containerStyle={{width: '100%'}}
            style={{width: '100%'}}
            inputContainerStyle={{width: '100%'}}
          />
        </TouchableOpacity>

        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.time}
          mode="time"
          is24Hour={true}
          display="default"
          minimumDate={new Date()}
          maximumDate={new Date()}
        />

        <Button
          title="Submit"
          disabled={!email || !password}
          onPress={this.submit}
        />

        <ModalBox
          visible={this.state.isCalendarVisible}
          onPressClose={this.toggleCalendar}>
          <Calendar
            disabledDaysIndexes={this.state.slot.days}
            hideExtraDays
            minDate={new Date()}
            onDayPress={this.onDayPress}
          />
        </ModalBox>
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
    borderRadius: 20,
  },
  errorStyle: {
    color: 'red',
  },
});

export default withTheme(LoginScreen);
