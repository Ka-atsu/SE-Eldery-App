import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#007bff" />
      </TouchableOpacity>

      {/* About Content */}
      <Text style={styles.title}>About</Text>

      <Text style={styles.content}>
        Senior Reach is an emergency alert app designed specifically to assist elderly individuals in times of distress.
        With user-friendly features like 'Notify Mode' and 'Emergency Mode', help is just a tap away. Seniors can easily
        update emergency contact information and access support, ensuring they stay safe and connected with loved ones.
      </Text>
      
      <View style={styles.termsContainer}>
        <Text style={styles.subTitle}>Key Features:</Text>
        <Text style={styles.featureText}>
          • Notify Mode: Send alerts to emergency contacts with a single tap.
        </Text>
        <Text style={styles.featureText}>
          • Emergency Mode: Quickly notify loved ones in case of an emergency.
        </Text>
        <Text style={styles.featureText}>
          • Easy Profile Management: Update emergency contact details anytime.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 40, 
    backgroundColor: '#ffffff',
    paddingBottom: 50, 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    padding: 15,
  },
  title: {
    fontSize: 38, 
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 80,
    color: '#0056b3', 
  },
  content: {
    fontSize: 22, 
    lineHeight: 30, 
    marginBottom: 30,
    textAlign: 'left',
    color: '#333',
  },
  imageRow: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  termsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    paddingVertical: 20,
  },
  subTitle: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 22,
    lineHeight: 28,
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default AboutScreen;