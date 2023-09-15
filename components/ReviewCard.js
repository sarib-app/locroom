import React ,{useState}from 'react'
import { View, StyleSheet,Dimensions, Pressable,Text } from 'react-native'
import moment from 'moment'

import AppText from './App/Text'
import ProfileImage from './ProfileImage'
import ReplyReviewModal from './ReplyReviewModal'

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height;
const ReviewCard = ({item}) => {

  const [showResponseModal,setShowResponseModal]=useState(false)

  function handleResponseModa(){
    setShowResponseModal(false)
  }
  return (
    <View style={styles.container}>
      <ProfileImage size={38} uri={item.reviewer.profilePhotoUrl} style={{marginRight: 12}} />
      <View style={{flex: 1}}>
        
        <View style={styles.row}>
          <AppText weight={500}>{ item.reviewer.displayName }</AppText>
          <AppText color="#8083A3" weight={500}>{ moment(item.createTime).fromNow() }</AppText>
        </View>
        <View style={[styles.row,{alignItems:"center"}]}>
        <View
        style={{width:WindowWidth/1.85}}
        >
        <AppText color="#8083A3" size={14} weight={400}>{ item.comment}</AppText>

        </View>
        {/* <AppText color="#8083A3" weight={500}>{ moment(item.createTime).fromNow() }</AppText>  */}

        {
          item?.reviewReply ?
          <Pressable 
          // onPress={()=>setShowResponseModal(true)}
          style={[styles.ReplyButton,{backgroundColor:'transparent'}]}>
          <Text style={{color:"#5FDCB3"}}>
            Replied
          </Text>
        </Pressable>
      :
      <Pressable 
          onPress={()=>setShowResponseModal(true)}
          style={styles.ReplyButton}>
          <Text style={{color:"#FFFFFF"}}>
            Reply
          </Text>
        </Pressable>
      }
        </View>
      </View>
{
  showResponseModal === true &&
      <ReplyReviewModal
      showModal={showResponseModal}
      onClose={handleResponseModa}
      item={item}
      />
}

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: 89,

    borderWidth: 1,
    borderColor: 'rgba(228, 230, 232, 0.6)',
    borderRadius: 14,
    marginBottom: 8,
    padding: 12,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ReplyButton:{
    backgroundColor:"#5FDCB3",
    alignItems:'center',
    justifyContent:'center',
    width:63,
    height:36,
    borderRadius:10
  }
})

export default ReviewCard
