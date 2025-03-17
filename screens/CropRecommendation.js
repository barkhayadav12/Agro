import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function CropRecommendation() {
  const [N, setN] = useState('');
  const [P, setP] = useState('');
  const [K, setK] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [isCalculating, setIsCalculating] = useState(true);

  const handleSubmit = () => {
    if (!N || !P || !K || !temperature || !humidity || !ph || !rainfall) {
      Alert.alert("Input Error", "Please fill in all fields.");
      return;
    }

    setIsAnalyzing(true);

    axios.post("http://localhost:8000/bluelock/crop", {
      N, P, K, temperature, humidity, ph, rainfall
    })
    .then(response => setResult(response.data.prediction))
    .catch(error => Alert.alert("Error", "Failed to fetch recommendation."))
    .finally(() => setIsAnalyzing(false));
  };

  const resetForm = () => {
    setN(''); setP(''); setK('');
    setTemperature(''); setHumidity('');
    setPh(''); setRainfall('');
    setResult(null);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Crop Recommendation</Text>
      
      {/* Switch for Automatic Mode */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 16 }}>Automatic Recommendation</Text>
        <Switch 
          value={isAutomatic} 
          onValueChange={() => setIsAutomatic(!isAutomatic)} 
        />
      </View>

      {/* Input Fields */}
      {!result && (
        <>
          <TextInput placeholder="Nitrogen" value={N} onChangeText={setN} keyboardType="numeric" editable={!isAutomatic}
            style={styles.input} />
          <TextInput placeholder="Phosphorus" value={P} onChangeText={setP} keyboardType="numeric" editable={!isAutomatic}
            style={styles.input} />
          <TextInput placeholder="Potassium" value={K} onChangeText={setK} keyboardType="numeric" editable={!isAutomatic}
            style={styles.input} />
          <TextInput placeholder="Temperature (°C)" value={temperature} onChangeText={setTemperature} keyboardType="numeric" editable={!isAutomatic}
            style={styles.input} />
          <TextInput placeholder="Humidity (%)" value={humidity} onChangeText={setHumidity} keyboardType="numeric" editable={!isAutomatic}
            style={styles.input} />
          <TextInput placeholder="pH Level" value={ph} onChangeText={setPh} keyboardType="numeric" editable={!isAutomatic}
            style={styles.input} />
          <TextInput placeholder="Rainfall (mm)" value={rainfall} onChangeText={setRainfall} keyboardType="numeric" editable={!isAutomatic}
            style={styles.input} />

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit} disabled={isAnalyzing} style={styles.button}>
            {isAnalyzing ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Get Recommendation</Text>}
          </TouchableOpacity>
        </>
      )}

      {/* Result Display */}
      {result && (
        <View style={styles.resultBox}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2E8B57', marginBottom: 10 }}>Recommended Crop</Text>
          <Text style={{ fontSize: 18, color: '#333' }}>{result}</Text>
          
          {/* Reset Button */}
          <TouchableOpacity onPress={resetForm} style={styles.button}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

// Styles
const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#E6F7E6',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  }
};
