import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import BottomComponent from './Bottom';

const { width } = Dimensions.get('window');

const EmergencyScreen = ({ navigation }) => {
    const handleEmergency = () => {
        console.log('Emergency Pressed');
    };

    return (
        <View style={styles.container}>
            <Text h4 style={styles.header}>Emergency Mode</Text>
            <Text style={styles.description}>
                Press the button below for an emergency alert.
            </Text>

            <View style={styles.buttonContainer}>
                {/* Emergency Button with Inner Shadow Effect */}
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={handleEmergency}
                    accessibilityLabel="Emergency Button"
                    accessibilityRole="button"
                >
                    {/* Inner Shadow Effect inside the Button */}
                    <View style={styles.innerShadow}>
                        <Icon name="warning" color="white" size={60} />
                        <Text style={styles.buttonTitle}>Emergency</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <BottomComponent navigation={navigation} disableButton={'Emergency'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        textAlign: 'center',
        fontSize: 22,
        color: '#555',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    circleButton: {
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: (width * 0.7) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF4500', // Emergency red
        elevation: 12, // Outer shadow
        shadowColor: '#8B0000', // Darker red shadow for outer depth
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        borderWidth: 3,
        borderColor: '#FF6347', // Slightly lighter red for a glossy look
    },
    innerShadow: {
        width: '95%',
        height: '95%',
        borderRadius: (width * 0.7) / 2,
        backgroundColor: '#FF5733', // Slightly lighter red for inner depth
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#D84315', // Inner shadow effect (darker red)
        shadowOffset: { width: 0, height: -5 }, // Shadow positioned inside
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    buttonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default EmergencyScreen;