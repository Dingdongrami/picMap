import React from 'react';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { AltScreen } from '../components/header';
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  const ctx = require.context('./app');
  const [fontsLoaded] = useFonts({
    IropkeBatang: require('../assets/fonts/IropkeBatangM.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <AltScreen />
      </RecoilRoot>
    </RootSiblingParent>
    // <ExpoRoot context={ctx} />
  );
}

registerRootComponent(App);
