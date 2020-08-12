import React, {useContext, useState} from 'react'
import {TouchableOpacity, StyleSheet, TextInput, Text} from 'react-native'
import ContextFilter from '../context/ContextFilter'

const Filter = () => {

    const {titleFilter, setTitleFilter, fromAge, setFromAge,toAge, setToAge, gender, setGender, handleSubmit} = useContext(ContextFilter)

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
                placeholder="fromAge"
                onChangeText={value => setFromAge(value)}
                value={fromAge}
            />
            <TextInput
                style={styles.textInput}
                placeholder="toAge"
                onChangeText={value => setToAge(value)}
                value={toAge}
            />
            <TextInput
                style={styles.textInput}
                placeholder="gender"
                onChangeText={value => setGender(value)}
                value={gender}
            />
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



