import {AsyncStorage} from 'react-native';

export const tokenName = 'token';

export async function getStorageParams() {
  try {
    const token = await AsyncStorage.getItem(tokenName);
    return {
      token,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function logout() {
  try {
    await AsyncStorage.setItem(tokenName, '');
  } catch (e) {
    console.log(e);
  }
}
