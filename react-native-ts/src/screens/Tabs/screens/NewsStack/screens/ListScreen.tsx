import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'This is the content of post 1',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is the content of post 2',
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'This is the content of post 3',
  },
];

type Props = {};

const ListScreen = (props: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={['top', 'bottom']}>
      {posts.map((post: any) => {
        return (
          <Pressable
            key={post.id}
            onPress={() => {
              navigation.navigate('Details' as never, {
                post_id: post.id,
              });
            }}
          >
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

export default ListScreen;
