import { Text, View, FlatList } from 'react-native';
import { styles } from './styles';
import { CircleRoom, CreateCircleBtn } from '../../../components/circle';
import { data } from '../../../data/circle-dummy';
import { useEffect, useState } from 'react';

export const Circle = () => {
  const [filteredData, setFilteredData] = useState([]); // join: true

  useEffect(() => {
    setFilteredData(data.filter(item => item.join === true));
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CircleRoom item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      <CreateCircleBtn />
    </View>
  );
};
