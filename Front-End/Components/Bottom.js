import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const BottomComponent = ({ navigation, disableButton }) => {

    return (
        <View style={styles.container}>
            {/* Navigate to Home */}
            <TouchableOpacity
                style={styles.gradientButton}
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.8}
                disabled={disableButton === "Home"}
            >
                <LinearGradient
                    colors={['#007bff', '#0056b3']}
                    style={styles.gradientBackground}
                >
                    <Icon name="home" size={30} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            {/* Navigate to Emergency */}
            <TouchableOpacity
                style={styles.gradientButton}
                onPress={() => navigation.navigate('Emergency')}
                activeOpacity={0.8}
                disabled={disableButton === 'Emergency'}
            >
                <LinearGradient
                    colors={['#dc3545', '#b21f2d']}
                    style={styles.gradientBackground}
                >
                    <Icon name="warning" size={30} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            {/* Navigate to Settings */}
            <TouchableOpacity
                style={styles.gradientButton}
                onPress={() => navigation.navigate('Settings')}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['#28a745', '#218838']}
                    style={styles.gradientBackground}
                >
                    <Icon name="settings" size={30} color="white" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    gradientButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
});

export default BottomComponent;