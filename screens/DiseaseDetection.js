import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [treatment, setTreatment] = useState([]);
  const [description, setDescription] = useState([]);

  const handleImageUpload = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to your gallery.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      setResult(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      Alert.alert("No Image Selected", "Please select an image first.");
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post("http://localhost:8000/bluelock/disease", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data.prediction[0]);

      const treatArray = response.data.prediction[0].treatment.split("\r\n");
      setTreatment(treatArray);

      const desArray = response.data.prediction[0].description.split("\r\n");
      setDescription(desArray);
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert("Prediction Failed", "Unable to analyze the image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Disease Identification</Text>

      {!selectedImage ? (
        <TouchableOpacity onPress={handleImageUpload} style={{ padding: 15, backgroundColor: '#4CAF50', borderRadius: 8 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Upload Image</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 10 }} />
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Text style={{ color: 'red', marginBottom: 10 }}>Remove Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePredict} style={{ padding: 15, backgroundColor: '#4CAF50', borderRadius: 8 }}>
            {isAnalyzing ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontSize: 16 }}>Predict Disease</Text>}
          </TouchableOpacity>
        </View>
      )}

      {result && (
        <View style={{ marginTop: 20, width: '100%', padding: 15, backgroundColor: '#E8F5E9', borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2E7D32' }}>Analysis Results</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{result.name}</Text>

          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Description:</Text>
          {description.map((point, index) => (
            <Text key={index}>&bull; {point}</Text>
          ))}

          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Treatment:</Text>
          {treatment.map((point, index) => (
            <Text key={index}>&bull; {point}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default DiseaseDetection;