import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OneSignal from 'react-native-onesignal'
import { useNavigation, CommonActions } from '@react-navigation/native'

import $auth from '../store/auth'

import { fetchUser } from '../api'

const AuthProvider = ({children}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const token = useSelector(({$auth}) => $auth.token)
  const user = useSelector(({$auth}) => $auth.user)

  useEffect(() => {
    OneSignal.promptForPushNotificationsWithUserResponse((res) => {
      console.log('fallbackToSettingsOrHandler', res)
    }, (res) => {
      console.log('promptForPushNotificationsWithUserResponse', res)
    })
    // OneSignal.setExternalUserId(externalUserId)
  }, [])
  
  useEffect(() => {
    if (token && user?.id) {
      OneSignal.setExternalUserId(user.id)

      fetchUser(user.id).then(res => {
        console.log('fetchUser', res)
        if (!res.error) {
          dispatch($auth.set.user(res))
          // if (!res.isSubscibed) {
          //   navigation.dispatch(
          //     CommonActions.reset({
          //       index: 0,
          //       routes: [{name: 'Subscribe'}]
          //     })
          //   )
          //   navigation.navigate('Subscribe')
          // }
        } else {
          dispatch($auth.set.logout())
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Auth'}]
            })
          )
          navigation.navigate('Auth')
        }
      })
    }
  }, [token, user?.id])

  return children
}

export default AuthProvider