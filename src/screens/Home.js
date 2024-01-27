import React, { useState } from 'react'
import { useEffect } from 'react';
import { Text, View, Button, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import TopStoriesScreen from './TopStoriesScreen';
import BusinessNews from './BusinessNews';
import Entertainment from './Entertainment';
import Sports from './Sports';
import Search from './Search';


function Home({ navigation }) {

    return (
        <View>
            <FlatList
                data={[{ key: 'top' }, { key: 'business' }, { key: 'entertainment' }, { key: 'sports' }]} // Dummy data for two sections
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        {item.key === 'top' && <TopStoriesScreen navigation={navigation} />}
                        {item.key === 'business' && <BusinessNews navigation={navigation} />}
                        {item.key === 'entertainment' && <Entertainment navigation={navigation} />}
                        {item.key === 'sports' && <Sports navigation={navigation} />}
                    </View>
                )}
            />
        </View>
    );

}



export default Home