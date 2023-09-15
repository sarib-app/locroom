import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput,TouchableOpacity, StyleSheet, Dimensions ,Pressable, Alert} from "react-native";
import AppText from './App/Text'
import ProfileImage from './ProfileImage'
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TouchableHighlight } from "react-native-gesture-handler";
// import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
function ReplyReviewModal({showModal,onClose,item}) {
const [respond,setRespond]=useState("")
const [isPressed,setIsPressed]=useState(false)
const [loading,setLoading]=useState(false)
const accountId = item.name.split('/')[1];
const locationId = item.name.split('/')[3];
const reviewId = item.reviewId;


function respondNow(){
    if(respond){
        getAsyncStorage()
    }
    else{
        setIsPressed(true)
    }
}

async function getAsyncStorage(){
    const value=await AsyncStorage.getItem("accessToken");
    if(value){
        replyReview(value)
    }
  
  }



const replyReview = async (accessToken) => {
    setLoading(true)
    try {
      // Extract accountId, locationId, and reviewId from the review data
    
  
      const apiUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`;
  
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: respond,
        }),
      });
    //   console.log(response)
      if (response.status === 200) {
        console.log('Reply posted successfully.');
        Alert.alert("Congratulations!","Respond to this review has been submitted successfully!")
      } else {
        console.error('Failed to post reply:', response.status);
        Alert.alert("Ooops","We are sorry something bad happened try to login with google again and respond to this review thanks!")
      }
    } catch (error) {
      console.error('API request error:', error);
      Alert.alert("Ooops","Something went wrong please try again later!")
    }
    finally{
        setLoading(false)
        setIsPressed(false)
        
    }
  };




    return (

        <Modal
            transparent={true}
            collapsable={true}
            visible={showModal}
            animationType="slide"
        >
            
            <Pressable
            
            onPress={()=>onClose()}
            
            style={styles.container} >



                <View style={styles.SubContainer}>



                    <View
                        style={styles.Header}
                    >

                        <Text style={styles.HeaderText}>Response a review</Text>
                    </View>


                    <View style={styles.CardContainer}>
      <ProfileImage size={38} uri={item.reviewer.profilePhotoUrl} style={{marginRight: 12}} />
      <View style={{flex: 1}}>
        
        <View style={styles.row}>
          <AppText weight={500}>{ item.reviewer.displayName }</AppText>
          <AppText color="#8083A3" weight={500}>{ moment(item.createTime).fromNow() }</AppText>
        </View>
        <View style={[styles.row,{alignItems:"center"}]}>
        <View
        style={{width:WindowWidth/1.4}}
        >
        <AppText color="#8083A3" size={14} weight={400}>{item.comment}</AppText>

        </View>
        {/* <AppText color="#8083A3" weight={500}>{ moment(item.createTime).fromNow() }</AppText>  */}
        
        </View>
      </View>
    </View>


    <Pressable style={styles.GenerateButton}>
          <Text style={{color:"#FFFFFF",fontWeight:'bold'}}>
            Use AI response assistance
          </Text>
        </Pressable>


<View style={[styles.ReplyContainer,{borderColor:isPressed === true && !respond  ?"red": 'rgba(228, 230, 232, 0.6)'}]}>
<Text style={{color:"#8083A3",fontWeight:'600',margin:5,marginBottom:0}}>
           Response Text
          </Text>
          <TextInput
          style={{flex:1,color:"#171721",fontSize:12,fontWeight:'bold', textAlignVertical: 'top'}}
          multiline={true}
          numberOfLines={4}
          onChangeText={(e)=>setRespond(e)}
          value={respond}
          
          />
</View>



<Pressable

onPress={()=> loading===false&& respondNow()}
style={styles.ResponseButton}>
          <Text style={{color:"#FFFFFF",fontWeight:'bold'}}>
            {loading === false ? "Send a response":"Loading...."}
          </Text>
        </Pressable>


                </View>



            </Pressable>

        </Modal>


    )

}
export default ReplyReviewModal

const styles = StyleSheet.create({
    container: {
        // width: WindowWidth,
        flex:1,
        // height: WindowHeight,
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    SubContainer: {
        width: WindowWidth,
        height: WindowHeight / 1.3,
        backgroundColor: "white",
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center'

    },
    
    Header: {
        width: WindowWidth,
        height: WindowHeight / 12,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomColor: "#E4E6E8",
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    HeaderText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    CardContainer: {
        // height: 89,
    
        width:WindowWidth/1.1,
        margin:10,
        borderWidth: 1,
        borderColor: 'rgba(228, 230, 232, 0.6)',
        borderRadius: 14,
        // marginBottom: 8,
        padding: 12,
        flexDirection: 'row',
      },
      ReplyContainer: {
        // height: 89,
    
        width:WindowWidth/1.1,
        height:WindowHeight/7,
        margin:10,
        borderWidth: 1,
        borderColor: 'rgba(228, 230, 232, 0.6)',
        borderRadius: 14,
        marginBottom: 8,
        // padding: 12,
        // flexDirection: 'row',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      GenerateButton:{
        backgroundColor:"#5FDCB3",
        alignItems:'center',
        justifyContent:'center',
        width:WindowWidth/1.1,
        padding:10,
        borderRadius:10
      },
      ResponseButton:{
        backgroundColor:"#3E7EFF",
        alignItems:'center',
        justifyContent:'center',
        width:WindowWidth/1.18,
        padding:20,
        borderRadius:10,
        position:'absolute',
        bottom:30
      }
})