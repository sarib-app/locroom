import React, { useState, useContext } from 'react'
import { View, StyleSheet, Alert ,TouchableOpacity} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

import { AuthContext } from '../contexts'

import ProfileImage from '../components/ProfileImage'
import AppText from '../components/App/Text'
import AppSwitch from '../components/App/Switch'
import AppButton from '../components/App/Button'
import { ProfileIcon } from '../components/Icons'
// import {GOOGLE_BUSINESS_SCOPE, WEB_CLIENT_ID} from '@env';

import { authorize } from 'react-native-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

// GoogleSignin.configure({
//   webClientId: WEB_CLIENT_ID,
//   scopes: [GOOGLE_BUSINESS_SCOPE],
// });
const config = {
  issuer: 'https://accounts.google.com',
  clientId: "60164497777-al4ri6vs19fkbbhkhr5mh7rp63pvmfos.apps.googleusercontent.com",
  redirectUrl: 'com.locom:/oauth2redirect',
  scopes: ['https://www.googleapis.com/auth/plus.business.manage'],
};
const ProfileScreen = () => {
  const insets = useSafeAreaInsets()

  const [isAutomated, setIsAutomated] = useState(false)

  const user = useSelector(({$auth}) => $auth.user)

  const handleChangeAutomated = value => {
    setIsAutomated(value)
  }



  async function signInWithGoogle() {
    try {
      const authState = await authorize(config);
  
      const accessToken = authState.accessToken;

      // const expirationTime = new Date().getTime() 
      const expirationTime = Date.parse(authState.accessTokenExpirationDate)

        const refreshToken = authState.refreshToken
        const expirationTimeStr = String(expirationTime);
        
// console.log("refresh token 1",expirationTimeStr)
      AsyncStorage.setItem("accessToken",accessToken)
      AsyncStorage.setItem("expirationTime",expirationTimeStr)
      AsyncStorage.setItem("refreshToken",refreshToken)

      // Handle authentication success
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication error:', error);
    }
  }



  return (
    <View style={[styles.container, {paddingTop: insets.top + 59}]}>
      <View style={{alignItems: 'center'}}>
        <ProfileImage size={105} uri={user.picture} style={{marginBottom: 8}} />
        <AppText size={22}>
          {user.firstName} {user.lastName}
        </AppText>
        <AppText
          color="#8083A3"
          size={14}
          weight={400}
          style={{marginBottom: 70}}>
          {user.email}{' '}
        </AppText>
      </View>

      <TouchableOpacity style={styles.card}>
        <ProfileIcon style={{marginRight: 11}} />
        <AppText>Account information</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={()=> signInWithGoogle() }>
        <ProfileIcon style={{marginRight: 11}} />
        <AppText>Google Business Profile</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <ProfileIcon style={{marginRight: 11}} />
        <AppText>Team Members</AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    height: 56,
    width: '100%',
    borderRadius: 14,
    // shadowColor: '#999BA8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
})

export default ProfileScreen
