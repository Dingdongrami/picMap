import React, { useEffect, useState } from 'react'; // useState 추가
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { MyPage } from './screens/MyPage'; // MyPage 추가
import { SafeAreaView } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    IropkeBatang: require('./assets/fonts/IropkeBatangM.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <MyPage />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
  },
});