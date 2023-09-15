import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TAB_BAR_HEIGHT } from '../config'

import AppText from '../components/App/Text'
import AppButton from '../components/App/Button'
import { CrossIcon } from '../components/Icons'

const MemberProceedPayScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets()

  const { members } = route.params
  const totalPrice = members.reduce((acc, member) => acc + member.price, 0)

  const handleRemove = (member, index) => () => {

  }
  
  return (
    <View style={[styles.container, {paddingBottom: TAB_BAR_HEIGHT+15+insets.bottom+16}]}>
      <View style={styles.content}>
        <AppText color="#8083A3" weight={500} size={12}>Select team member to pay for</AppText>
        {
          members.map((member, i) => {
            return (
              <View key={i} style={styles.memberItem}>
                <AppText weight={700} size={12} style={{flex: 1}}>{`${member.firstname} ${member.lastname}`}</AppText>
                <AppText color="#8083A3" weight={600} size={12} style={{marginRight: 16}}>{member.price} USD</AppText>
                <Pressable onPress={handleRemove(member, i)}>
                  <CrossIcon />
                </Pressable>
              </View>
            )
          })
        }
        <View style={styles.row}>
          <AppText>Total</AppText>
          <AppText>{totalPrice} USD</AppText>
        </View>
      </View>
      <AppButton style={{marginTop: 'auto'}}>
        Continue
      </AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  content: {
    borderWidth: 1,
    borderColor: '#E4E6E8',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6E8',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default MemberProceedPayScreen
