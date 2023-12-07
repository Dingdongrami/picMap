import React, { useLayoutEffect, useMemo } from 'react';
import { FlatList, Text } from 'react-native';
import { PersonRow } from '../../components';
import { acceptFriend, fetchReceivedRequests } from '../../api/friendsApi';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

const ReceivedFriendRequest = () => {
  const queryClient = useQueryClient();
  const { data: userList } = useQuery({
    queryKey: ['receivedList', 17],
    queryFn: () => fetchReceivedRequests(17),
    refetchOnWindowFocus: true,
    enabled: true,
  });

  const { mutate: acceptMutate } = useMutation({
    mutationFn: args => acceptFriend(args.requesterId, args.receiverId),
    onSuccess: () => {
      console.log('accept success');
      queryClient.invalidateQueries(['receivedList', 17]);
      queryClient.invalidateQueries(['friendsList', 17]);
    },
  });

  const handleAccept = (requesterId, receiverId) => {
    acceptMutate({ requesterId, receiverId });
  };

  const renderItem = ({ item }) => (
    <PersonRow
      key={item?.requesterId}
      user={item}
      button={{
        icon: require('../../assets/icons/add.png'),
        style: { width: 10, height: 10 },
        onPress: () => handleAccept(item?.requesterId, item?.receiverId),
      }}
    />
  );

  return (
    <FlatList
      style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}
      data={userList}
      renderItem={renderItem}
      keyExtractor={item => item.requesterId.toString()}
      showsVerticalScrollIndicator={false}
      // 비어있는 경우
      ListEmptyComponent={() => (
        <Text
          style={{
            color: '#78716c',
            fontSize: 14,
            fontFamily: 'IropkeBatang',
            flex: 1,
            textAlign: 'center',
            paddingVertical: 30,
          }}>
          받은 친구 요청이 없어요!
        </Text>
      )}
    />
  );
};

export default ReceivedFriendRequest;
