import { View, Text, Pressable, Alert } from 'react-native';
import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';
import { styles } from './styles';
import { SingleMap, SinglePhotoIcon, OthersProfile, AddMethod } from '../../../components/circle';
import { MemorizedSingleMap } from '../../../components/circle/single/SingleMap';
import { FlatList } from 'react-native-gesture-handler';
import { circleSelectButtonState } from '../../../stores/circle-selection';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePhoto, fetchPhotos, fetchSortedPhotos } from '../../../api/photoApi';
import { useNavigation } from 'expo-router';
import CircleHeader from '../../../components/header/CircleHeader';

export const SingleCircle = ({ route }) => {
  const navigation = useNavigation();
  const { circleId } = route.params; //써클의 id값 찾아내기
  const [isReady, setIsReady] = useState(splashState);
  const [isMap, setIsMap] = useState(true);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const queryClient = useQueryClient();

  // 써클의 사진들을 불러오기
  const {
    data: photoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['photo'],
    queryFn: () => fetchPhotos(circleId),
  });

  // 사진 삭제하기
  const photoDeleteMutation = useMutation({
    mutationFn: () => deletePhoto(selectedPhotos),
    onSuccess: data => {
      queryClient.invalidateQueries('photo');
      setSelectedPhotos([]);
    },
  });

  // 사진 정렬하기
  const photoSortMutation = useMutation({
    mutationFn: args => fetchSortedPhotos(args.circleId, args.sortType),
    onSuccess: data => {
      queryClient.setQueryData(['photo'], data);
      // console.log('실시간 정렬');
    },
  });

  // 사진 선택하기
  const handleSelectedPhotos = photoId => {
    setSelectedPhotos(prevSelectedPhotos => {
      if (prevSelectedPhotos.includes(photoId)) {
        // 이미 선택된 사진이면 제거
        return prevSelectedPhotos.filter(id => id !== photoId);
      } else {
        // 선택되지 않은 사진이면 추가
        return [...prevSelectedPhotos, photoId];
      }
    });
  };

  // 모든 사진 선택하기
  const selectAllPhotos = () => {
    setSelectedPhotos(prevPhotos => {
      // Check if all photos are already selected
      const allSelected = prevPhotos.length === photoData.length;
      // If all photos are selected, deselect all. Else, select all.
      return allSelected ? [] : photoData.map(photo => photo.id);
    });
  };

  // selectedPhotos 비우기
  const clearSelectedPhotos = () => {
    setSelectedPhotos([]);
  };

  const handleScroll = e => {
    //스크롤 위치를 확인
    const yOffset = e.nativeEvent.contentOffset.y;
    if (yOffset > 110) {
      setIsMap(false);
    } else if (yOffset <= 0) {
      setIsMap(true);
    }
  };

  // 써클의 사진의 id를 전달받아서 사진을 불러오기
  const renderItem = ({ item, index }) => (
    <Pressable style={{ flex: 0.33 }}>
      <SinglePhotoIcon photo={item} handleSelectedPhotos={handleSelectedPhotos} selectedPhotos={selectedPhotos} />
    </Pressable>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CircleHeader circleId={circleId} photoSortMutation={photoSortMutation} />,
    });
  }, [navigation]);

  if (!isReady) {
    return <SplashUI />;
  } else {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <FlatList
          data={photoData}
          numColumns={3}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => (
            <HeaderComponent
              circleId={circleId}
              photoDeleteMutation={photoDeleteMutation}
              selectedPhotos={selectedPhotos}
              selectAllPhotos={selectAllPhotos}
              clearSelectedPhotos={clearSelectedPhotos}
            />
          )}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={styles.noPhotoText}>사진이 없네요!</Text>}
        />
        <AddMethod circleId={circleId} />
      </View>
    );
  }
};

const HeaderComponent = React.memo(({ circleId, photoDeleteMutation, selectAllPhotos, clearSelectedPhotos }) => {
  const [isMap, setIsMap] = useState(true);
  const [circleSelectButtonActive, setCircleSelectButtonActive] = useRecoilState(circleSelectButtonState);

  const changeSelection = () => {
    setCircleSelectButtonActive(!circleSelectButtonActive);
    clearSelectedPhotos();
  };

  const selectOptions = useMemo(() => [
    {
      text: '전체 선택',
      onPress: () => {
        selectAllPhotos();
      },
    },
    {
      text: '삭제',
      onPress: () => {
        // 선택된 사진을 삭제할건지 묻는 모달창 띄우기
        Alert.alert('사진 삭제', '선택된 사진을 삭제할까요?', [
          {
            text: '취소',
          },
          {
            text: '삭제',
            onPress: () => {
              // 선택된 사진 삭제하기
              photoDeleteMutation.mutate();
            },
          },
        ]);
      },
    },
    {
      text: '저장',
      // onPres
    },
    {
      text: '취소',
      onPress: changeSelection,
    },
  ]);

  return (
    <View style={{ marginBottom: 5 }}>
      <View style={styles.personBox}>
        <OthersProfile circleId={circleId} />
      </View>
      <View style={styles.mapContainer}>{isMap && <MemorizedSingleMap />}</View>
      <View style={styles.wrapper}>
        <Text style={styles.imageText}>사진</Text>
        {!circleSelectButtonActive ? (
          <Pressable onPress={changeSelection}>
            <Text style={styles.optionText}>선택</Text>
          </Pressable>
        ) : (
          <View style={{ flexDirection: 'row', gap: 16, marginRight: 16 }}>
            {selectOptions.map((item, index) => (
              <Pressable key={index} onPress={item?.onPress}>
                <Text style={styles.optionText2}>{item.text}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
});
