import {Text, StyleSheet, View, Dimensions, RefreshControl, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import DropdownComponent from '../Components/DropDown';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { store } from '../store/store';
import { setScaleAddress } from '../store';
import { useDispatch } from 'react-redux';
import { useBluetooth } from 'rn-bluetooth-classic';

const screenWidth = Dimensions.get("window").width;

const HomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const { connectToDevice } = useBluetooth();

  useEffect(() => {
    const addres = store.getState().settings.scaleAddress;
    if (addres) {
      connectToDevice(addres);
    }
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  })
  return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F9F9F9"}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
        <Header refresh={refreshing} handleClick={onRefresh} />
        <View style={styles.recordSection}>
          <Text style={styles.heading}>Total Records</Text>
          <Text style={styles.normalText}>Today: 30</Text>
          <Text style={styles.normalText}>This Week: 112</Text>
          <Text style={styles.normalText}>This Month: 305</Text>
        </View>
        <View
          style={{
            marginTop: 30,
            gap: 5,
            flex: 1,
          }}
          >
          <DropdownComponent title={"Products"} />
          <DropdownComponent title={"Location"} />
          <DropdownComponent title={"Sub-Location"} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('RecordPage')} style={[styles.button, styles.button_Bg, {
          marginTop: 30,
        }]}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          console.log(store.getState());
        }} style={[styles.button, styles.button_Bg, {
          marginTop: 30,
        }]}>
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#F9F9F9",
    paddingVertical: 10,
    paddingTop: 50,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  normalText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  recordSection: {
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    width: screenWidth * 0.9,
    marginTop: 20,
  },
  button: {
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.9,
  },
  button_Bg: {
    backgroundColor: "#F2F2F2",
  },
});