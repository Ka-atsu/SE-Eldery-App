import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const BottomComponent = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button 
                title="View Details" 
                onPress={() => navigation.navigate('Details')} 
                buttonStyle={styles.button} 
                titleStyle={styles.buttonTitle} 
                icon={<Icon name="info" size={20} color="white" />} 
                iconContainerStyle={styles.iconContainer} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingBottom: 20, 
    },
    button: {
        width: 200, 
        height: 60, 
        backgroundColor: '#28a745', 
        borderRadius: 30, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonTitle: {
        fontSize: 18, 
        fontWeight: 'bold', 
    },
    iconContainer: {
        marginRight: 10, 
    },
});

export default BottomComponent;