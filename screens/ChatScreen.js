import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim().length === 0) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'user' && styles.userMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  message: { padding: 10, backgroundColor: '#ddd', borderRadius: 10, marginVertical: 5 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#2E8B57' },
  messageText: { color: '#fff' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  input: { flex: 1, borderWidth: 1, borderRadius: 10, padding: 10, marginRight: 10 },
  sendButton: { backgroundColor: '#2E8B57', padding: 10, borderRadius: 10 },
  sendText: { color: '#fff', fontWeight: 'bold' },
});

export default ChatScreen;
