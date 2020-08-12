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
    const [listOfLitters, setListOfLitters] = useState([])
    const [filterTitles, setFilterTitles] = useState([])
    const [filterResult, setFilterResult] = useState([])
    const [filterAge, setFilterAge] = useState([])
    const {titleFilter, fromAge, toAge} = useContext(ContextFilter)

    useEffect(() => {
        axios.get('https://gorest.co.in/public-api/users?_format=json&access-token=watW3SWa15uY_Emzh4nxgrWitAuPKsgravUh')
        .then(res => setResult(res.data.result))
    }, [])

    useEffect( () => {
        const listTitle = []
        const listLitter = []
        // titleFilter.length >  2
        // ? filterTitles.map(res => listTitle.push(res.first_name))
        // : result.map(res => listTitle.push(res.first_name))
        titleFilter.length < result.length - 1
        ? filterAge.map(res => listTitle.push(res.first_name))
        : result.map(res => listTitle.push(res.first_name))
        listTitle.map(title => listLitter.push(title[0]))
        const uniqueLitter = new Set(listLitter)
        const uniqueArrayOfLitter = [...uniqueLitter]
        setListOfLitters(uniqueArrayOfLitter.sort())
    }, [result, titleFilter])

    useEffect(() => {
      const filterArray = filterAge.length === 0 ? filterResult : filterAge
      setFilterResult([...result])
      console.log('filterResult', filterResult)
      setFilterTitles(
        filterArray.filter( filterRes => {
          console.log('titleFilter', titleFilter.length)
          return filterRes.first_name.toLowerCase().includes(titleFilter.toLowerCase())
        })
      )
    }, [titleFilter])

    useEffect(() => {
      const filterArray = filterResult.length === 0 ? filterAge : filterResult
      setFilterResult([...result])
      setFilterAge(
        filterArray.filter( filterRes => {
          const age = new Date().getFullYear() - filterRes.dob.substr(0, 4)
          console.log('age', age)
          console.log('fromAge', fromAge)
          console.log('toAge', toAge)
          return age > fromAge && age < toAge
        })
      )
    }, [fromAge, toAge])

    // console.log('fromAge', fromAge)
    // console.log('toAge', toAge)
    console.log('filterAge', filterAge.length)

    return(
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
              <Filter />
              <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                  {listOfLitters && listOfLitters.map((lit, index) => (
                      <View key={index}>
                          <Text key={index} style={styles.litter}>{`<${lit}>`}</Text>
                          {
                          // titleFilter.length >  2
                          // result
                              // ? filterTitles.map(res => (
                              //   lit === res.first_name[0] && <Text key={res.id} style={res.status === 'active' ? styles.infoActive : styles.infoInactive} key={res.id}>{`#${res.id} - ${res.first_name} ${res.last_name} ${res.last_name} - ${new Date().getFullYear() - res.dob.substr(0, 4)} year old - ${res.gender}`}</Text>
                              // ))
                              // : result.map(res => (
                              //   lit === res.first_name[0] && <Text key={res.id} style={res.status === 'active' ? styles.infoActive : styles.infoInactive} key={res.id}>{`#${res.id} - ${res.first_name} ${res.last_name} ${res.last_name} - ${new Date().getFullYear() - res.dob.substr(0, 4)} year old - ${res.gender}`}</Text>
                              // ))
                               filterAge.map(res => {
                                console.log('filterAge', filterAge.length)
                                console.log('titleFilter.length', titleFilter.length)
                                console.log('result.length', result.length)
                                return lit === res.first_name[0] && <Text key={res.id} style={res.status === 'active' ? styles.infoActive : styles.infoInactive} key={res.id}>{`#${res.id} - ${res.first_name} ${res.last_name} ${res.last_name} - ${new Date().getFullYear() - res.dob.substr(0, 4)} year old - ${res.gender}`}</Text>
                              })
                           }
                      </View>
                      )
                  )}
                  </View>
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