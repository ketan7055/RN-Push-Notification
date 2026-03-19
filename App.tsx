import React, { useEffect } from 'react';
import {Alert, Platform, PermissionsAndroid, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import messaging from '@react-native-firebase/messaging';

function App() {
  useEffect(() => {
    async function setupMessaging() {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        }

        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log('Authorization status:', authStatus);

        if (enabled) {
          const token = await messaging().getToken();
          console.log('Token:', token);
        }
      } catch (error) {
        console.log('FCM setup error:', error);
      }
    }

    setupMessaging();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification:', JSON.stringify(remoteMessage));
      Alert.alert(
        remoteMessage.notification?.title ?? 'Notification',
        remoteMessage.notification?.body ?? '',
      );
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F0FF" />
      <LoginScreen />
    </SafeAreaProvider>
  );
}

export default App;
