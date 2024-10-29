import React, { useContext, useCallback } from 'react';
import { View, Text, Button, Image } from '@AppComponents';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect, Slot } from 'expo-router';
import { DataContext } from '@context/DataProvider';
import { DataContextValue } from '@context/Types';

export default function Welcome() {
  // const insets = useSafeAreaInsets();

  const { isUser, isLoading } = useContext(DataContext) as DataContextValue;
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (isUser) {
        router.navigate({ pathname: '/(drawer)/one' });
      }
    }, [isUser])
  );

  if (isLoading) {
    return <Slot />;
  }

  return (
    <View className="dark container flex-1 items-center justify-center bg-primary-500 text-white">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/logo/logo.png')}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
        <Text category="h1" className="text-center text-white">
          Welcome to {'\n'}Furlab
        </Text>
        <Text category="label" className="text-center text-white" status="control">
          BETA
        </Text>
      </View>
      <View className="flex-2">
        <Text className="mb-5 text-white">Get started by creating an account or logging in</Text>
        <View className="gap-4">
          <Button
            onPress={() => {
              router.navigate({ pathname: '/(onboarding)/login' });
            }}>
            Login
          </Button>
          <Button
            onPress={() => {
              router.navigate({ pathname: '/(onboarding)/disclaimer' });
            }}>
            Create an account
          </Button>
        </View>
      </View>
    </View>
  );
}