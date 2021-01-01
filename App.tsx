import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Asset, useAssets } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Button, Share } from 'react-native';

export default function App() {
  const [videoAssets] = useAssets([
    require('./assets/sample-video.mp4'),
    require('./assets/sample-video.webm'),
  ]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {videoAssets?.map((asset) => (
        <Button
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
