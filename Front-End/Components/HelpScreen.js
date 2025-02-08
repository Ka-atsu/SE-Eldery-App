import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const HelpScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#007bff" />
      </TouchableOpacity>

      <Text style={styles.title}>Help</Text>
      <Text style={styles.content}>
        Welcome to the app help page. Here you can find information about how to use the app effectively.
      </Text>

      <Text style={styles.subTitle}>How to Use the App:</Text>
      
      <Text style={styles.content}>
        <Text style={styles.bold}>1. Notify Mode: </Text>In case you want to notify someone, go back from here if you are in Emergency mode. Click the blue button at the bottom (the Home icon). Inside the Notify Mode, you'll see a large button labeled "Notify Others". Tap on this button to send an alert to your emergency contact.
      </Text>

      {/* Image for Notify Mode */}
      <View style={styles.imageRow}>
        <Image
          source={require('../assets/Step1-a.png')}  // Image 1
          style={styles.image}
        />
        <Image
          source={require('../assets/Step1-b.png')}  // Image 2 (use different image for Step 2)
          style={styles.image}
        />
      </View>

      <Text style={styles.content}>
        <Text style={styles.bold}>2. Emergency Mode: </Text>If there's an emergency, navigate to the "Emergency Mode" screen (the red button at the bottom) and press the large "Emergency" button to send an alert to your emergency contact.
      </Text>

      <View style={styles.imageRow}>
        <Image
          source={require('../assets/Step2-b.png')}  // Image 1
          style={styles.image}
        />
        <Image
          source={require('../assets/Step2-a.png')}  // Image 2 (use different image for Step 2)
          style={styles.image}
        />
      </View>

      <Text style={styles.content}>
        <Text style={styles.bold}>3. Edit Profile: </Text>You can update your name and emergency contact information from the "Profile" screen. To do this, tap the yellow button on either the home screen or emergency screen. Then, click on "Edit Profile" to make changes.
      </Text>

      <View style={styles.imageRow}>
        <Image
          source={require('../assets/Step3-a.png')}  // Image 1
          style={styles.image}
        />
        <Image
          source={require('../assets/Step3-b.png')}  // Image 2 (use different image for Step 2)
          style={styles.image}
        />
      </View>

      <Text style={styles.content}>
        <Text style={styles.bold}>3A. Edit Profile: </Text>This is a text box where you can update your name and contacts. After making changes, click "Save Profile" to save your updates.
      </Text>

      <View style={styles.imageRow}>
        <Image
          source={require('../assets/Step3a-a.png')}  // Image 1
          style={styles.image}
        />
        <Image
          source={require('../assets/Step3a-b.png')}  // Image 2 (use different image for Step 2)
          style={styles.image}
        />
      </View>

      <Text style={styles.content}>
        <Text style={styles.bold}>3B. Add Contacts: </Text>While you're in the "Edit Profile" section, simply click "Add" to include a new contact.
      </Text>

      <Image
        source={require('../assets/Step3b-a.png')}  // Image 2 (use different image for Step 2)
        style={styles.image}
      />

      <Text style={styles.content}>
      <Text style={styles.bold}>4. Add Profile Picture: </Text>
      Click on the Edit Picture (pencil icon). {"\n"}
      Select your desired picture from your device. {"\n"}
      Adjust the picture by moving it within the selection box. {"\n"}
      Click Crop to finalize and set your new profile picture.
      </Text>

      

      <View style={styles.imageRow}>
        <Image
          source={require('../assets/Step4-a.png')}  // Image 1
          style={styles.image}
        />
        <Image
          source={require('../assets/Step4-b.png')}  // Image 2 (use different image for Step 2)
          style={styles.image}
        />
      </View>

      <Image
          source={require('../assets/Step4-c.png')}  // Image 2 (use different image for Step 2)
          style={styles.image}
      />
      <Text style={styles.content}>
        <Text style={styles.bold}>5. Logout: </Text>To log out, go to your profile screen and tap the "Log out" button.
      </Text>

      <View style={styles.imageRow}>
        <Image
          source={require('../assets/Step5.png')}  // Image 1
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 40, // Increased padding for a more open layout
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
    fontSize: 38, // Larger title for better visibility
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 60,
    color: '#0056b3',  // Contrasting color for clarity
  },
  subTitle: {
    fontSize: 30, // Slightly larger subtitle
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
    color: '#333',
  },
  content: {
    fontSize: 24, // Larger font size for better readability
    lineHeight: 36, // Increase line height for better text clarity
    marginBottom: 30, // Increased margin for better spacing
    textAlign: 'left',
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  imageRow: {
    flexDirection: 'row',  // Arranges the images horizontally
    justifyContent: 'space-between',  // Adds space between the images
    marginBottom: 20,  // Adds space below the row of images
  },
  image: {
    width: '48%',  // Adjust the width to fit both images on the same line (space them out a bit)
    height: 300,
    resizeMode: 'contain',  // Ensures the image maintains its aspect ratio
  },
});

export default HelpScreen;