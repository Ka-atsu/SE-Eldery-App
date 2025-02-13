import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#0056b3" />
      </TouchableOpacity>

      {/* About Content */}
      <Text style={styles.title}>About</Text>

      <Text style={styles.content}>
        Senior Reach is an emergency alert app designed specifically to assist elderly individuals in times of distress.
        With user-friendly features like 'Notify Mode' and 'Emergency Mode', help is just a tap away. Seniors can easily
        update emergency contact information and access support, ensuring they stay safe and connected with loved ones.
      </Text>
      
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
     
      <Text style={styles.miniTitle}>
        Who We Are
      </Text>

      <Text style={styles.developmentTitle}>
          Meet Our Development Team
      </Text>

      <Text style={styles.developmentTeam}>
        Product Owner: Tano, Russel Ken A.
      </Text>
      <Text style={styles.developmentTeam}>
        Developer: Tallafer, Kent D.
      </Text>
      <Text style={styles.developmentTeam}>
        UI/UX Designer: Melgar, Reigne Margaret R.
      </Text>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 40,  // More padding for spacing
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,  // Enough space at the bottom
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'transparent',
    padding: 10,
  },
  title: {
    fontSize: 40, // Increased title size
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    color: '#0056b3',
  },
  developmentTitle: {
    fontSize: 30, // Larger title for clarity
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0056b3',
  },
  miniTitle: {
    fontSize: 24, // Slightly larger for better visibility
    marginTop: 20,
  },
  developmentTeam: {
    fontSize: 24,  // Increased font size for easier reading
  },
  content: {
    fontSize: 24, // Larger font for readability
    lineHeight: 32, // Increased line height
    marginBottom: 30,
    textAlign: 'left',
    color: '#333',
  },
  subTitle: {
    fontSize: 30, // Increased subtitle size for emphasis
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 24, // Larger text for key features
    lineHeight: 30, // Spaced out for easy reading
    color: '#333',
    marginBottom: 12,
    textAlign: 'left',
  },
});

export default AboutScreen;