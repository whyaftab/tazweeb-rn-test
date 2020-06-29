import React from 'react';
import {Modal, View, Text, ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';

export const ModalBox = ({
  children,
  visible,
  onPressClose,
  animationType = 'fade',
  containerStyle,
  loading,
  container,
}) => (
  <Modal
    animationType={animationType}
    transparent={true}
    visible={visible}
    onRequestClose={onPressClose}>
    <View style={[styless.container, container]}>
      <View
        style={[
          styless.innerContainer,
          containerStyle,
          loading && {justifyContent: 'center', alignItems: 'center'},
        ]}>
        {onPressClose && (
          <Icon
            icon="close"
            color="#333"
            size={20}
            containerStyle={{position: 'absolute', top: 0, right: 0}}
            onPress={onPressClose}
          />
        )}
        {loading ? <ActivityIndicator /> : children}
      </View>
    </View>
  </Modal>
);

const styless = {
  container: {
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: 'center',
    color: '#333',
  },
  innerContainer: {
    width: '95%',
    borderRadius: 10,
    paddingTop: 30,
    backgroundColor: '#fff',
    minHeight: 300,
  },
};
