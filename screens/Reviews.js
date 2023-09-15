import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { fetchReviews } from '../api'

import Header from '../components/Header'
import Applist from '../components/App/List'
import ReviewCard from '../components/ReviewCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import ReplyReviewModal from '../components/ReplyReviewModal'
import fetchAccountAndReviews from '../api/fetchAccountAndReviews'
import AppText from '../components/App/Text'
import refreshToken from '../api/RefreshToken'

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
const ReviewsScreen = () => {
  const insets = useSafeAreaInsets()
  const focused = useIsFocused()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // useEffect(() => {
  //   fetchReviews().then(res => {
  //     setReviews(res.data)
  //   })
  //   console.log("working")
  // }, [])





  useEffect(() => {
    getAsyncStorage()
    // AsyncStorage.clear()
  }, [focused])

  async function getAsyncStorage() {


    // const value = await AsyncStorage.getItem("accessToken");
    const value = await refreshToken()
    if (value !=null) {
      setError(false)

      setLoading(reviews.length <1 ?true:false)
      const reviewsRes = await fetchAccountAndReviews(value);
      setLoading(false)
      if (reviewsRes !== null) {
        if (reviewsRes.length > 0) {

          setReviews(reviewsRes)
        } else {
          setError(true)
          setErrorMessage("You currently have no reviews!")

        }

      } else {
        setError(true)

        setErrorMessage("It seems Like something bad happened please re connect your google account and try again!")
      }

    } else {
      setError(true)
      setErrorMessage("Please, notice, that you have not connected your Google account, so we cant track your Google Data. If you want to do this, you need to connect your Google account on General Profile page.")

    }


  }




  const renderReview = ({ item }) => {
    return (
      <ReviewCard item={item} />
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
{
  error === true &&
      <View style={styles.WarningCarWrapper}>
        <View style={styles.warningCard}>
          <AppText color="#EF8354">{errorMessage}</AppText>
        </View>
      </View>
}

      { loading === true &&

      <Text 
      // onPress={()=> AsyncStorage.clear()}
      style={styles.loadingTxt}>Loading....</Text>
      }
      <View style={styles.content}>
        <Applist
          data={reviews}
          renderItem={renderReview} />
      </View>
      {/* <ReplyReviewModal/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
  warningCard: {
    padding: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    // alignSelf:'center'
  },
  WarningCarWrapper: {
    backgroundColor: '#EF8354',
    borderRadius: 6,
    margin: 10,
    width: WindowWidth / 1.12,
    alignSelf: 'center'
  },
  loadingTxt:{ 
    color: "#3E7EFF", 
  fontSize: 20, 
  alignSelf: "center", 
  top: 250, fontWeight: '600' }
})

export default ReviewsScreen
