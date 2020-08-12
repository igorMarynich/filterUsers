import React, {useContext} from 'react'
import {TouchableOpacity, StyleSheet, TextInput, Text, View} from 'react-native'
import {Picker} from '@react-native-community/picker'
import ContextFilter from '../context/ContextFilter'

const Filter = () => {

    const {titleFilter, setTitleFilter, fromAge, setFromAge,toAge, setToAge, selectedValue, setSelectedValue, handleSubmit} = useContext(ContextFilter)
    return(
        <TouchableOpacity style={styles.filter}>
            <Text style={styles.titleFilter}>Filter</Text>
            <TextInput
                style={styles.textInput}
                placeholder="name"
                onChangeText={value => setTitleFilter(value)}
                value={titleFilter}
            />
            <TextInput
                style={styles.textInput}
                keyboardType = 'number-pad'
                placeholder="fromAge"
                onChangeText={value => setFromAge(value)}
                value={fromAge}
            />
            <TextInput
                style={styles.textInput}
                keyboardType = 'number-pad'
                placeholder="toAge"
                onChangeText={value => setToAge(value)}
                value={toAge}
            />
            <View>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="both" value="both" />
                    <Picker.Item label="male" value="male" />
                    <Picker.Item label="female" value="female" />
                </Picker>
            </View>
            <Text
                style={styles.resetButton}
                onPress={handleSubmit}>
                    Reset
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    filter: {
        padding: 5,
        zIndex: 100
    },
    titleFilter: {
        fontSize: 20,
        fontWeight: "bold"
    },
    resetButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
      },
})

export default Filter



