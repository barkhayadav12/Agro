import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const FertilizerRecommendation = () => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    moisture: '',
    crop: '',
    soil: '',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    try {
      const response = await axios.post("http://10.0.2.2:8000/bluelock/fertilizer", formData);
      setResult(response.data.prediction);
    } catch (error) {
      Alert.alert("Error", "Failed to get recommendation. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setFormData({
      N: '', P: '', K: '', temperature: '', humidity: '', moisture: '',
      crop: '', soil: ''
    });
    setResult(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fertilizer Recommendation</Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          {!result ? (
            <>
              {['N', 'P', 'K', 'temperature', 'humidity', 'moisture', 'crop', 'soil'].map((field) => (
                <View key={field} style={styles.inputContainer}>
                  <Text style={styles.label}>{field}</Text>
                  <TextInput
                    style={styles.input}
                    value={formData[field]}
                    onChangeText={(value) => handleChange(field, value)}
                    placeholder={`Enter value for ${field}`}
                  />
                </View>
              ))}

              <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Get Recommendation</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.resultContainer}>
              <Ionicons name="checkmark-circle" size={50} color="green" />
              <Text style={styles.resultText}>Recommended Fertilizer:</Text>
              <Text style={styles.result}>{result}</Text>
              <TouchableOpacity style={styles.button} onPress={resetForm}>
                <Text style={styles.buttonText}>Make Another Recommendation</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  form: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  result: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
  },
});

export default FertilizerRecommendation;
