import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import BottomComponent from './Bottom';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    console.log("App executed");

    const handlePress = async (type) => {
        try {
            if (type === 'notify') {
                console.log('Notify Others Pressed');
            } else if (type === 'emergency') {
                console.log('Emergency Pressed');
            }
        } catch (error) {
            console.error('Error handling button press:', error);
        }
    };

    const renderButton = (title, iconName, backgroundColor, type) => (
        <TouchableOpacity
            style={[styles.circleButton, { backgroundColor }]}
            onPress={() => handlePress(type)}
            accessibilityLabel={title}
            accessibilityRole="button"
        >
            <Icon name={iconName} color="white" size={50} />
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text h4 style={styles.header}>Emergency Alert</Text>
            <Text style={styles.description}>
                Press the button below to notify someone in case of an emergency.
            </Text>
            <View style={styles.buttonContainer}>
                {renderButton('Notify Others', 'notifications', '#007bff', 'notify')}
                {renderButton('Emergency', 'warning', 'red', 'emergency')}
            </View>
            <BottomComponent navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
        marginTop: 20,
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 28,
        color: '#333',
    },
    description: {
        marginBottom: 150,
        textAlign: 'center',
        fontSize: 22,
        color: '#555',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    circleButton: {
        width: width * 0.55,
        height: width * 0.55,
        borderRadius: (width * 0.6) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 30,
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
});

export default HomeScreen;