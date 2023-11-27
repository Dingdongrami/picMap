import { Pressable, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { selectState } from '../../../stores/circle-selection';
import { useRecoilState } from 'recoil';

export const SinglePhotoIcon = ({ index }) => {
  const [selection, setSelection] = useRecoilState(selectState);
  const [checkedPhotos, setCheckedPhotos] = useState([]);
  const navigation = useNavigation();
  const clickPhoto = index => {
    console.log(index);
    navigation.navigate('PhotoCom', { index });
  };
  // selection이 false가 되면 checkedPhotos를 초기화
  useEffect(() => {
    if (!selection) {
      setCheckedPhotos([]);
    }
  }, [selection]);

  return (
    <View style={styles.albumContainer}>
      <View style={styles.photoRow}>
        <View key={index}>
          <Pressable onPress={() => clickPhoto(index)}>
            <View style={styles.imageContainer}>
              {selection && (
                <Checkbox
                  value={checkedPhotos[index]}
                  onValueChange={() => {
                    const itemIndex = index;
                    const newCheckedPhotos = [...checkedPhotos];
                    newCheckedPhotos[itemIndex] = !newCheckedPhotos[itemIndex];
                    setCheckedPhotos(newCheckedPhotos);
                    console.log(itemIndex);
                  }}
                  color={checkedPhotos ? '#D6D3D1' : undefined}
                  style={styles.checkbox}
                />
              )}
              <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
