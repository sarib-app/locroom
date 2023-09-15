import AsyncStorage from "@react-native-async-storage/async-storage";
import { authorize,refresh } from 'react-native-app-auth'



const config = {
    issuer: 'https://accounts.google.com',
    clientId: "60164497777-al4ri6vs19fkbbhkhr5mh7rp63pvmfos.apps.googleusercontent.com",
    redirectUrl: 'com.locom:/oauth2redirect',
    scopes: ['https://www.googleapis.com/auth/plus.business.manage'],
  };
const refreshToken = async (tokens) => {

    const accessToken = await AsyncStorage.getItem("accessToken");
    const expirationTime = await AsyncStorage.getItem("expirationTime");
    const refreshToken = await AsyncStorage.getItem("refreshToken");



if(accessToken){
    console.log("refresh token 2",refreshToken)
const storedExpirationTime = parseInt(expirationTime, 10);

// Now, you can compare storedExpirationTime with the current time
const currentTimestamp = new Date().getTime();
    try {
      // Check if the access token has expired
      if (currentTimestamp >= storedExpirationTime) {
        // Use the stored refresh token to obtain a new access token
        const newToken = await refresh(config, {
          refreshToken: refreshToken,
        });
  
        // Update the stored tokens with the new values
        const newaccessToken = newToken.accessToken;
        const newrefreshToken = newToken.refreshToken;
        const newexpirationTime = Date.parse(newToken.accessTokenExpirationDate)
        AsyncStorage.setItem("accessToken",newaccessToken)
        AsyncStorage.setItem("expirationTime",newrefreshToken)
        AsyncStorage.setItem("refreshToken",newexpirationTime)
  return newaccessToken
        // You can now use the new access token for authenticated requests
        // console.log('New Access Token:', accessToken);
        // console.log('New Refresh Token:', refreshToken);
      }
      else{

          return accessToken;
      }
  
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
}
else{
    return null
}
  };

  export default refreshToken