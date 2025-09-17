import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {};

const NewsDetailsScreen = (props: Props) => {
  const { route } = props;
  const { post_id } = route.params;

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <Text>NewsDetailsScreen</Text>
      <Text>Post ID: {post_id}</Text>
    </SafeAreaView>
  );
};

export default NewsDetailsScreen;
