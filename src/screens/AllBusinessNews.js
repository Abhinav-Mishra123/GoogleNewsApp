import React, { useState } from 'react'
import { useEffect } from 'react';
import { Text, View, Button, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import BlogScreen from './BlogScreen';
import { api_key } from '../api/api';
import { base_url } from '../api/api';

function AllBusinessNews({ navigation }) {

    const [latestNews, setLatesNews] = useState([])

    async function getLatestNews() {
        const url = `${base_url}/top-headlines?country=in&category=business&apiKey=${api_key}`;
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log("new items", result);
            return result;
        } catch (error) {
            throw new Error('Error fetching news:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLatestNews();
                setLatesNews(data.articles)
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchData();
    }, []);

    function renderNewsItem ({ item, index })  {
        if (!item.urlToImage) {
            return null
        }
        const truncatedTitle = item.title.length > 70 ? `${item.title.slice(0, 70)}...` : item.title;
        const formattedDate = formatPublishedDate(item.publishedAt);
        if (index == 0 || index == 1) {
            return (
                <TouchableOpacity style={styles.firstNewsCard} onPress={() => handleBlogPress(item.url)}>
                    <View>
                        <View style={{ paddingHorizontal: 0 }}>
                            {item.urlToImage && <Image style={styles.firstnewsImage} source={{ uri: item.urlToImage }} />}
                        </View>
                        <Text style={styles.firstNewsName}>{item.source.name}</Text>
                        <Text style={styles.firstnewsTitle}>{truncatedTitle}</Text>
                        <Text style={styles.firstnewsPublisher}>{formattedDate}</Text>
                    </View>
                </TouchableOpacity>


            )
        }
        else {
            return (
                <TouchableOpacity style={styles.newsCard} onPress={() => handleBlogPress(item.url)}>
                    <View style={styles.twoColumnContainer}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.newsTitle}>{truncatedTitle.slice(0, 50)}</Text>
                            <Text style={styles.newsPublisher}>{item.source.name}</Text>
                            <Text style={styles.newsPublisher}>{formattedDate}</Text>
                        </View>
                        <View style={styles.rightColumn}>
                            {item.urlToImage && <Image style={styles.newsImage} source={{ uri: item.urlToImage }} />}
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    };

    function formatPublishedDate (publishedAt) {
        const currentDate = new Date();
        const publishedDate = new Date(publishedAt);
        const timeDiff = currentDate - publishedDate;
        const minutes = Math.floor(timeDiff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return `${days}d ago`;
        }
        else if (hours > 0) {
            return `${hours}h ago`
        }
        else {
            return `${minutes}m ago`
        }
    }

    function handleBlogPress(blogUrl) {
        navigation.navigate('BlogScreen', { blogUrl });
    };


    return (
        <>
            <FlatList
                data={latestNews}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => renderNewsItem({ item, index })}
                ListHeaderComponent={
                
                <Text style={styles.topStoriesHeading}>All Business Stories</Text>}
            />
        </>
    )
}


const styles = StyleSheet.create({
    topStoriesHeading: {
        fontSize: 20,
        fontWeight: "800",
        color: "#000",
        paddingVertical: 4,
        paddingLeft:10,
        marginLeft:10,
        height:50,
        textAlignVertical:"center"
    },
    firstNewsCard: {
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        backgroundColor: "white",
        shadowColor: "aliceblue",
        elevation: 4,
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 3 }

    },
    firstnewsImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 8,
    },
    firstnewsTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: "#000",
        textAlign: "justify"
    },
    firstNewsName: {
        fontSize: 12,
        color: '#000',
        marginBottom: 4,
    },
    firstnewsPublisher: {
        fontSize: 13,
        color: '#000',
        marginBottom: 4,
    },
    newsCard: {
        borderRadius: 8,
        padding: 10,
        marginHorizontal:10,
        marginBottom: 16,
        elevation: 6, // for Android shadow
        shadowColor: '#fff', // for iOS shadow
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
        fontSize: 16,
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

export default AllBusinessNews