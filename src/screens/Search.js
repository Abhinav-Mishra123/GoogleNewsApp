import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';

const { api_key, base_url } = require("../api/api");

function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const onChangeText = (text) => {
        setSearchQuery(text);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const searchNews = async () => {
        try {
            const url = `${base_url}/everything?q=${searchQuery}&sortBy=popularity&apiKey=${api_key}`;
            const response = await fetch(url);
            const result = await response.json();

            setSearchResults(result.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            searchNews();
        } 
        else{
            getAllNews();

        }
    }, [searchQuery]);

    const getAllNews = async () => {
        try {
            const url = `${base_url}/everything?q=india&sortBy=popularity&apiKey=${api_key}`;
            const response = await fetch(url);
            const result = await response.json();

            setSearchResults(result.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const renderNewsItem = ({ item }) => {
        if (!item.urlToImage) {
          return null;
        }
      
        return (
          <TouchableOpacity style={styles.newsCard} onPress={() => handleBlogPress(item.url)}>
            <View style={styles.twoColumnContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.newsTitle}>{item.title.slice(0, 50)}</Text>
                <Text style={styles.newsPublisher}>{item.source.name}</Text>
                <Text style={styles.newsPublisher}>{item.publishedAt.slice(0,10)}</Text>
              </View>
              <View style={styles.rightColumn}>
                {item.urlToImage && <Image style={styles.newsImage} source={{ uri: item.urlToImage }} />}
              </View>
            </View>
          </TouchableOpacity>
        );
      };
    const handleBlogPress = (blogUrl) => {
        navigation.navigate('BlogScreen', { blogUrl });
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Search..."
                    onChangeText={onChangeText}
                    value={searchQuery}
                />
                {searchQuery ? (
                    <TouchableOpacity onPress={clearSearch} style={styles.closeIconContainer}>
                        <Image style={styles.closeIcon} source={require("../img/close-icon.png")} />
                    </TouchableOpacity>
                ) : null}
            </View>
            <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderNewsItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textinput: {
        flex: 1,
        height: 40,
        backgroundColor: "#fff0f0",
        borderRadius: 5,
        paddingLeft: 10,
        marginRight: 10,
    },
    closeIconContainer: {
        paddingHorizontal:5,
        position:"absolute",
        right:10,
        top:10
    },
    closeIcon: {
        width: 25,
        height: 25,
        tintColor: 'black',
    },
    newsItem: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
      newsCard: {
        borderRadius: 8,
        padding: 10,
        marginHorizontal:10,
        marginBottom: 16,
        elevation: 6, // for Android shadow
        shadowColor: '#EEEAEA', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor:"#E0DEDE",
        borderWidth:0.8
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftColumn: {
        width: '70%',
    },
    rightColumn: {
        width: '30%',
    },
    newsImage: {
        width: '100%',
        height: 80, // Adjust the height as needed
        resizeMode: 'cover',
        borderRadius: 8, // Optional: Add border radius for rounded corners
        marginBottom: 8, // Optional: Add margin at the bottom
        objectFit: "cover"
    },
    newsTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 8,
        color: "#000"
    },
    newsPublisher: {
        fontSize: 12,
        color: '#000',
        marginBottom: 0,
        
    },
});

export default Search;
