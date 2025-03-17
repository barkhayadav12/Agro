import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FertilizerImage from '../assets/fertilizer_recommendation.jpeg';

const { width, height } = Dimensions.get('window');

const cards = [
  {
    title: "Disease Detection",
    description: "Advanced AI-powered crop disease detection system",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&h=800"
  },
  {
    title: "Fertilizer Recommendation",
    description: "Precision fertilizer recommendations for optimal yield",
    image: FertilizerImage 
  },
  {
    title: "Crop Recommendation",
    description: "Smart crop suggestions based on soil and climate data",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&h=800"
  },
  {
    title: "Outbreak Prediction",
    description: "Early warning system for pest and disease outbreaks",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&h=800"
  },
];

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#2E8B57" />

      {/* Navbar */}
      <View style={styles.navbar}>
        <Ionicons name="leaf" size={28} color="white" style={styles.leafIcon} />
        <Text style={styles.navbarTitle}>AgroAssist</Text>
      </View>

      {/* Image Cards with Navigation */}
      <View style={styles.imageContainer}>
        <View style={styles.card}>
          <Image 
            source={typeof cards[currentIndex].image === "string" 
              ? { uri: cards[currentIndex].image } 
              : cards[currentIndex].image
            } 
            style={styles.image} 
          />
          <View style={styles.overlay}>
            <Text style={styles.cardTitle}>{cards[currentIndex].title}</Text>
            <Text style={styles.cardDescription}>{cards[currentIndex].description}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.arrowRight} onPress={goToNextImage}>
          <Ionicons name="chevron-forward" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  leafIcon: {
    marginRight: 8, // Small gap between icon and text
  },
  navbarTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  imageContainer: {
    width: width * 0.9, 
    height: height * 0.6,  // Increased height for better visibility
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Moved downward
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDescription: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  arrowRight: {
    position: 'absolute',
    right: -20,  
    top: '50%',
    transform: [{ translateY: -16 }],
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    padding: 10,
    zIndex: 10, 
  },
});

export default HomeScreen;



