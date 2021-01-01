import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Asset, useAssets } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Button, Share } from 'react-native';

export default function App() {
  const [assets] = useAssets([
    require('./assets/sample-video.mp4'),
    require('./assets/sample-video.webm'),
    require('./assets/sample.jpeg'),
  ]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {assets?.map((asset) => (
        <Button
          key={asset.localUri}
          onPress={async () => {
            if (asset?.localUri) {
              const contentUrl = await FileSystem.getContentUriAsync(
                asset.localUri
              );
              Share.share({
                url: contentUrl,
              });
            }
          }}
          title={`Share ${asset.name}.${asset.type}.`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
