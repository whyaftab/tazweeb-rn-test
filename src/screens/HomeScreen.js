import React, {Component} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getSellers} from '../services/api';
import {SearchBar, ListItem} from 'react-native-elements';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
    };
  }

  componentDidMount = () => {
    this.fetchSellers();
  };

  fetchSellers = () => {
    getSellers(this.state.search).then(({data}) =>
      this.setState({
        data: data.data,
      }),
    );
  };

  updateSearch = (search) =>
    this.setState({
      search,
    });

  onPressSeller = (item) => {
    console.log(item);
    if (item && Object.keys(item._slot).length) {
      this.props.navigation.navigate('AppointmentAdd', {slot: item._slot});
    } else {
      alert('Seller does not have any slot field yet!');
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <SearchBar
          placeholder="Seller Name.."
          onChangeText={this.updateSearch}
          value={this.state.search}
          onSubmitEditing={this.fetchSellers}
        />
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
          renderItem={({item}) => (
            <ListItem
              title={item.name}
              onPress={() => this.onPressSeller(item)}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    );
  }
}

export default HomeScreen;
