import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { api_key } from '../api/api';

function NewsStand({ navigation }) {
  const [TheHinduNews, setTheHinduNews] = useState([]);
  const [techcrunchNews, setTechCrunchNews] = useState([]);
  const [bbcNews, setBbcNews] = useState([]);
  const [cnnNews, setCNNNews] = useState([]);
  const [TheTimesOfIndiaNews, setTheTImesOfIndia] = useState([]);

  const fetchHinduNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?sources=the-hindu&apiKey=${api_key}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };


  const fetchTechCrunchNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${api_key}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  const fetchBBCNEWS = async () => {
    const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${api_key}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };
  const fetchCNNNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?sources=CNN&apiKey=${api_key}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };
  const fetchTheTimesOfIndia = async () => {
    const url = `https://newsapi.org/v2/top-headlines?sources=the-times-of-india&apiKey=${api_key}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  const fetchDataHinduNews = async () => {
    try {
      const data = await fetchHinduNews();
      setTheHinduNews(data.articles);
    } catch (error) {
      console.error('Error fetching BBC News:', error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await fetchTechCrunchNews();
      setTechCrunchNews(data.articles);
    } catch (error) {
      console.error('Error fetching TechCrunch news:', error);
    }
  };

  const fetchDataBBCNews = async () => {
    try {
      const data = await fetchBBCNEWS();
      setBbcNews(data.articles);
    } catch (error) {
      console.error('Error fetching BBC News:', error);
    }
  };

  const fetchDataCNNNews = async () => {
    try {
      const data = await fetchCNNNews();
      setCNNNews(data.articles);
    } catch (error) {
      console.error('Error fetching BBC News:', error);
    }
  };

  const fetchDataTheTimesOfIndia = async () => {
    try {
      const data = await fetchTheTimesOfIndia();
      setTheTImesOfIndia(data.articles);
    } catch (error) {
      console.error('Error fetching BBC News:', error);
    }
  };


  useEffect(() => {
    fetchDataHinduNews()
    fetchData();
    fetchDataBBCNews();
    fetchDataCNNNews();
    fetchDataTheTimesOfIndia();
  }, []);

  const handleBlogPress = (blogUrl) => {
    navigation.navigate('BlogScreen', { blogUrl });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.newsContainer}>
        <Text style={{ fontSize: 18, paddingHorizontal: 15, fontWeight: 'bold', color: 'black', }}>The Hindu News</Text>
        {/* <Image source={require("../img/bbc-news.png")} style={{width:30, height:30}}></Image> */}
        {TheHinduNews && TheHinduNews.map((item, index) => (
          <TouchableOpacity
            style={styles.newsCard}
            onPress={() => handleBlogPress(item.url)}
            key={index}
          >
            <View style={styles.twoColumnContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.newsTitle}>{item.title.slice(0, 50)}</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {item.source.name == 'The Hind' ? <Image source={require("../img/thehindu-logo.jpeg")} style={{ width: 80, height: 30 }}></Image> : <Text style={styles.newsPublisher}>{item.source.name}</Text>}
                  <Text style={{
                    fontSize: 12,
                    color: '#000',
                    marginBottom: 0, marginLeft: 15
                  }}>{formatPublishedDate(item.publishedAt)}</Text>
                </View>
              </View>
              <View style={styles.rightColumn}>
                {item.urlToImage && <Image style={styles.newsImage} source={{ uri: item.urlToImage }} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.newsContainer}>
          <Text style={styles.newsCategory}>TechCrunch</Text>
          {techcrunchNews && techcrunchNews.map((item, index) => (
            <TouchableOpacity
              style={styles.newsCard}
              onPress={() => handleBlogPress(item.url)}
              key={index}
            >
              <View style={styles.twoColumnContainer}>
                <View style={styles.leftColumn}>
                  <Text style={styles.newsTitle}>{item.title.slice(0, 50)}</Text>
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {item.source.name == "TechCrunch" ? <Image source={require("../img/techcrunch_logo.jpeg")} style={{ width: 30, height: 20 }}></Image> : <Text style={styles.newsPublisher}>{item.source.name}</Text>}
                  <Text  style={{
                      fontSize: 12,
                      color: '#000',
                      marginBottom: 0, marginLeft: 15
                    }}>{formatPublishedDate(item.publishedAt)}</Text>
                </View>
                </View>
                <View style={styles.rightColumn}>
                  {item.urlToImage && <Image style={styles.newsImage} source={{ uri: item.urlToImage }} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.newsContainer}>
          <Text style={{ fontSize: 18, paddingHorizontal: 15, fontWeight: 'bold', color: 'red', }}>BBC News</Text>
          {/* <Image source={require("../img/bbc-news.png")} style={{width:30, height:30}}></Image> */}
          {bbcNews && bbcNews.map((item, index) => (
            <TouchableOpacity
              style={styles.newsCard}
              onPress={() => handleBlogPress(item.url)}
              key={index}
            >
              <View style={styles.twoColumnContainer}>
                <View style={styles.leftColumn}>
                  <Text style={styles.newsTitle}>{item.title.slice(0, 50)}</Text>
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {item.source.name == 'BBC News' ? <Image source={require("../img/bbc-news.png")} style={{ width: 30, height: 30 }}></Image> : <Text style={styles.newsPublisher}>{item.source.name}</Text>}
                    <Text style={{
                      fontSize: 12,
                      color: '#000',
                      marginBottom: 0, marginLeft: 15
                    }}>{formatPublishedDate(item.publishedAt)}</Text>
                  </View>
                </View>
                <View style={styles.rightColumn}>
                  {item.urlToImage && <Image style={styles.newsImage} source={{ uri: item.urlToImage }} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.newsContainer}>
        <Text style={{ fontSize: 18, paddingHorizontal: 15, fontWeight: 'bold', color: 'black', }}>The Times Of India News</Text>
        {/* <Image source={require("../img/bbc-news.png")} style={{width:30, height:30}}></Image> */}
        {TheTimesOfIndiaNews && TheTimesOfIndiaNews.map((item, index) => (
          <TouchableOpacity
            style={styles.newsCard}
            onPress={() => handleBlogPress(item.url)}
            key={index}
          >
            <View style={styles.twoColumnContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.newsTitle}>{item.title.slice(0, 50)}</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {item.source.name == 'The Times of India' ? <Image source={require("../img/timesofIndia.png")} style={{ width: 30, height: 30 }}></Image> : <Text style={styles.newsPublisher}>{item.source.name}</Text>}
                  <Text style={{
                    fontSize: 12,
                    color: '#000',
                    marginBottom: 0, marginLeft: 15
                  }}>{formatPublishedDate(item.publishedAt)}</Text>
                </View>
              </View>
              <View style={styles.rightColumn}>
                {item.urlToImage && <Image style={styles.newsImage} source={{ uri: item.urlToImage }} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.newsContainer}>
        <Text style={{ fontSize: 18, paddingHorizontal: 15, fontWeight: 'bold', color: 'red', }}>CNN News</Text>
        {/* <Image source={require("../img/bbc-news.png")} style={{width:30, height:30}}></Image> */}
        {cnnNews && cnnNews.map((item, index) => (
          <TouchableOpacity
            style={styles.newsCard}
            onPress={() => handleBlogPress(item.url)}
            key={index}
          >
            <View style={styles.twoColumnContainer}>
              <View style={styles.leftColumn}>
                <Text style={styles.newsTitle}>{item.title.slice(0, 50)}</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {item.source.name == 'CNN' ? <Image source={require("../img/cnn_news.png")} style={{ width: 30, height: 30 }}></Image> : <Text style={styles.newsPublisher}>{item.source.name}</Text>}
                  <Text style={{
                    fontSize: 12,
                    color: '#000',
                    marginBottom: 0, marginLeft: 15
                  }}>{formatPublishedDate(item.publishedAt)}</Text>
                </View>
              </View>
              <View style={styles.rightColumn}>
                {item.urlToImage && <Image style={styles.newsImage} source={{ uri: item.urlToImage }} />}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>



    </ScrollView>
  );
}

const formatPublishedDate = (publishedAt) => {
  const currentDate = new Date();
  const publishedDate = new Date(publishedAt);
  const timeDiff = currentDate - publishedDate;
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else {
    return `${minutes}m ago`;
  }
};

const styles = StyleSheet.create({
  newsContainer: {
    marginRight: 15,
  },
  newsCategory: {
    fontSize: 18,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    color: '#2EB868',
  },
  newsCard: {
    borderRadius: 8,
    width: 420,
    padding: 10,
    marginBottom: 16,
    elevation: 6, // for Android shadow
    shadowColor: '#EEEAEA', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#E0DEDE',
    borderWidth: 0.8,
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
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  newsPublisher: {
    fontSize: 12,
    color: '#000',
    marginBottom: 0,
  },
});

export default NewsStand;
