import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { Audio } from 'expo-av';
import BottomComponent from './Bottom';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const playSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/notifalert.mp3')
            );
            await sound.playAsync();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    const handlePress = (type) => {
        if (type === 'notify') {
            console.log('Notify Others Pressed');
            playSound();
        }
    };

    return (
        <View style={styles.container}>
            <Text h4 style={styles.header}>Notify Mode</Text>
            <Text style={styles.description}>
                Press the button below to notify someone.
            </Text>

            <View style={styles.buttonContainer}>
                {/* Notify Button with Inner Shadow Effect */}
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => handlePress('notify')}
                    accessibilityLabel="Notify Button"
                    accessibilityRole="button"
                >
                    {/* Inner Shadow Effect inside the Button */}
                    <View style={styles.innerShadow}>
                        <Icon name="notifications" color="white" size={60} />
                        <Text style={styles.buttonTitle}>Notify Others</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <BottomComponent navigation={navigation} disableButton={"Home"} />
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
        fontSize: 24,
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
        backgroundColor: '#4682B4', // Blue tone for notification
        elevation: 12, // Outer shadow
        shadowColor: '#2F4F4F', // Darker blue shadow
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        borderWidth: 3,
        borderColor: '#5F9EA0', // Slightly lighter blue for glossy look
    },
    innerShadow: {
        width: '95%',
        height: '95%',
        borderRadius: (width * 0.7) / 2,
        backgroundColor: '#5A9FD4', // Slightly lighter blue inside for depth
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1E3F66', // Inner shadow effect (darker blue)
        shadowOffset: { width: 0, height: -5 }, // Inner shadow
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    buttonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
});

export default HomeScreen;