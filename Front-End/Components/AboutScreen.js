import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
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

      <Text style={styles.miniTitle}>Who We Are</Text>

      <Text style={styles.developmentTitle}>Meet Our Development Team</Text>

      {/* Product Owner */}
      <View style={styles.teamMember}>
        <Image 
          source={require('../assets/TANO.jpg')}  // Replace with your local image path
          style={styles.memberImage}
        />
        <Text style={styles.developmentTeam}>Product Owner: Tano, Russel Ken A.</Text>
      </View>

      {/* Developer */}
      <View style={styles.teamMember}>
        <Image 
          source={require('../assets/KENT.jpeg')}  // Replace with your local image path
          style={styles.memberImage}
        />
        <Text style={styles.developmentTeam}>Developer: Tallafer, Kent D.</Text>
      </View>

      {/* UI/UX Designer */}
      <View style={styles.teamMember}>
        <Image 
          source={require('../assets/REYN.jpg')}  // Replace with your local image path
          style={styles.memberImage}
        />
        <Text style={styles.developmentTeam}>UI/UX Designer: Melgar, Reigne Margaret R.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 40,  // Adjusted padding for more modern feel
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'transparent',
    padding: 10,
  },
  title: {
    fontSize: 40,  // Kept your original font size
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    color: '#0056b3',
  },
  content: {
    fontSize: 24,  // Kept your original font size
    lineHeight: 32,
    marginBottom: 30,
    textAlign: 'left',
    color: '#333',
  },
  subTitle: {
    fontSize: 30,  // Kept your original font size
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 24,  // Kept your original font size
    lineHeight: 30,
    color: '#333',
    marginBottom: 12,
    textAlign: 'left',
  },
  miniTitle: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  developmentTitle: {
    fontSize: 30,  // Kept your original font size
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0056b3',
    textAlign: 'center',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
  },
  memberImage: {
    width: 100,      // Set width and height to the same value
    height: 100,     // This will make the image a square
    borderRadius: 50, // Half of width/height to make the image circular
    marginRight: 20,
  },
  developmentTeam: {
    fontSize: 20,  // Kept your original font size
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
});

export default AboutScreen;
