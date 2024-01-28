// BlogScreen.js
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview'; 

function BlogScreen ({ route }) {
  const { blogUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: blogUrl }} />
    </View>
  );
};

export default BlogScreen;
