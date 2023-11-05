import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

export const CircleHeader = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'IropkeBatang', color: '#44403C' }}>PicMap</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-sharp" size={25} color={'#44403C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TimeLine')}>
          <FontAwesome name="globe" size={24} color={'#44403C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          {user?.profileImage ? (
            <Image source={user?.profileImage} style={styles.image} contentFit="cover" />
          ) : (
            <FontAwesome name="user-circle-o" style={{ marginLeft: 2 }} size={24} color={'#44403C'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/icons/circle_array_btn.png')} style={styles.rightHeader} />
        </TouchableOpacity>
      </View>
    </View>
  );
};