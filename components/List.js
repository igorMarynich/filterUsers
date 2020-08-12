import React, {useState ,useEffect, useContext} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import axios from 'axios'

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Filter from './Filter'
import ContextFilter from '../context/ContextFilter'


const List = () => {
    const [result, setResult] = useState([])
    const [filteredResult, setFilteredResult] = useState([])
    const {titleFilter, fromAge, toAge, selectedValue} = useContext(ContextFilter)

    useEffect(() => {
        axios.get('https://gorest.co.in/public-api/users?_format=json&access-token=watW3SWa15uY_Emzh4nxgrWitAuPKsgravUh')
        .then(res => setResult(res.data.result))
    }, [])

    // useEffect(() => {
    //   setResultChange([...result])
    // }, [])

    // useEffect( () => {
    //     const listTitle = []
    //     const listLitter = []
    //     // titleFilter.length >  2
    //     // ? filterTitles.map(res => listTitle.push(res.first_name))
    //     // : result.map(res => listTitle.push(res.first_name))
    //     titleFilter.length < result.length - 1
    //     ? filterAge.map(res => listTitle.push(res.first_name))
    //     : result.map(res => listTitle.push(res.first_name))
    //     listTitle.map(title => listLitter.push(title[0]))
    //     const uniqueLitter = new Set(listLitter)
    //     const uniqueArrayOfLitter = [...uniqueLitter]
    //     setListOfLitters(uniqueArrayOfLitter.sort())
    // }, [result, titleFilter])

    useEffect( () => {
      setFilteredResult(
        result.filter( filterRes => {
          console.log('filterRes', filterRes)
          filterRes.allGender = 'both'
          const age = new Date().getFullYear() - filterRes.dob.substr(0, 4)
          return ((filterRes.first_name.toLowerCase().includes(titleFilter.toLowerCase()))
            && (age > fromAge && age < toAge)
            && (filterRes.gender.toLowerCase() === selectedValue
              ? filterRes.gender.toLowerCase() === selectedValue
              : filterRes.allGender.toLowerCase() === selectedValue))
        })
      )
    }, [titleFilter, fromAge, toAge, selectedValue, result])

    console.log('filteredResult', filteredResult.length)
    console.log('result', result.length)
    console.log('selectedValue', selectedValue)

    return(
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
              <Filter />
              <View style={styles.body}>
                {
                  filteredResult.map(res => {
                    return <Text key={res.id} style={res.status === 'active' ? styles.infoActive : styles.infoInactive} key={res.id}>{`#${res.id} - ${res.first_name} ${res.last_name} ${res.last_name} - ${new Date().getFullYear() - res.dob.substr(0, 4)} year old - ${res.gender}`}</Text>
                  })
                }
              </View>
            </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    litter: {
      marginTop: 10,
      marginBottom: 10
    },
    infoActive: {
      marginTop: 10,
      marginBottom: 10,
      color: 'black'
    },
    infoInactive: {
      marginTop: 10,
      marginBottom: 10,
      color: 'grey'
    },
    scrollView: {
      backgroundColor: Colors.lighter,
      // flex: 1,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });

export default List