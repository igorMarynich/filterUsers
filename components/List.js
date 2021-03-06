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
import ModalExample from './ModalExample'
import ModalFinish from './ModalFinish'
import ContextFilter from '../context/ContextFilter'


const List = () => {
    const [result, setResult] = useState([])
    const [filteredResult, setFilteredResult] = useState([])
    const {titleFilter, fromAge, toAge, selectedValue, modalVisible, setModalVisible, setIdRes} = useContext(ContextFilter)
    let arrayOfLitters = []
    let sortByAlfOfLitters = []

    useEffect(() => {
        axios.get('https://gorest.co.in/public-api/users?_format=json&access-token=watW3SWa15uY_Emzh4nxgrWitAuPKsgravUh')
        .then(res => setResult(res.data.result))
    }, [])

    useEffect( () => {
      const timer = setTimeout(() => {
        setFilteredResult(
          result.filter( filterRes => {
            filterRes.allGender = 'both'
            const age = new Date().getFullYear() - filterRes.dob.substr(0, 4)
            return (( titleFilter.length > 2
                  ? (filterRes.first_name.toLowerCase().includes(titleFilter.toLowerCase()) || filterRes.last_name.toLowerCase().includes(titleFilter.toLowerCase()))
                  : filterRes.first_name.toLowerCase())
              && (age > fromAge && age < toAge)
              && (filterRes.gender.toLowerCase() === selectedValue
                ? filterRes.gender.toLowerCase() === selectedValue
                : filterRes.allGender.toLowerCase() === selectedValue))
          })
        )
      }, 400);
      return () => clearTimeout(timer);
    }, [titleFilter, fromAge, toAge, selectedValue, result])

    const deleteUser = (id) => {
      setFilteredResult(filteredResult.filter( filterRes => filterRes.id !== id))
    }


    return(
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
              <Filter />
              <ModalExample deleteUser={deleteUser}/>
              <ModalFinish />
              <View style={styles.body}>
                {filteredResult.map( lit => {
                    arrayOfLitters.push(lit.first_name[0].toUpperCase())
                    arrayOfLitters.sort()
                    sortByAlfOfLitters = [...new Set(arrayOfLitters)]
                  })}
                {sortByAlfOfLitters.map( (lit, index) => {
                  return(
                    <View key={index}>
                       <Text key={index} style={styles.litter}>{`<${lit}>`}</Text>
                       {filteredResult.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1).map(res=> {
                          return lit === res.first_name[0].toUpperCase() &&
                            <Text
                              style={res.status === 'active' ? styles.infoActive : styles.infoInactive} key={res.id}
                              onPress={() => {
                                setModalVisible(!modalVisible);
                                setIdRes(res.id)
                              }}>
                                {`#${res.id} - ${res.first_name} ${res.last_name} - ${new Date().getFullYear() - res.dob.substr(0, 4)} year old - ${res.gender}`}</Text>
                        })}
                    </View>
                  )
                })}
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
    },
    body: {
      backgroundColor: Colors.white,
    },
  });

export default List