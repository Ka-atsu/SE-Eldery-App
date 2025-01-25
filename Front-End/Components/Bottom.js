import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const BottomComponent = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.gradientButton}
                onPress={() => navigation.navigate('Details')}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['#28a745', '#218838']}
                    style={styles.gradientBackground}
                >
                    <Icon name="settings" size={50} color="white" style={styles.icon} />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    gradientButton: {
        width: 75, 
        height: 75, 
        borderRadius: 40, 
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5, // Adds shadow on Android
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 30, // Keeps gradient corners rounded
    },
    icon: {
        // No extra styling needed for centering
    },
});

export default BottomComponent;