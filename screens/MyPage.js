import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { CirclePost, MyProfile } from '../components';
import { ScrollView } from 'react-native';

export const MyPage = () => {
  // Example data (let's say you want to render 10 CirclePost components)
  const [data, setData] = useState(Array(10).fill({}));

  return (
    <ScrollView>
      <MyProfile />
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CirclePost />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }} // Optional: for some padding around your list
      />
    </ScrollView>
  );
};
