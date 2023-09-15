import React, { useState } from 'react'
import { View, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TAB_BAR_HEIGHT } from '../config'

import AppText from '../components/App/Text'
import AppInput from '../components/App/Input'
import AppButton from '../components/App/Button'
import { ChevronIcon } from '../components/Icons'

const EMPTY_FORM = {firstname: '', lastname: '', email: '', phone: '', price: 1.5}

const MemberCreateScreen = ({navigation}) => {
  const insets = useSafeAreaInsets()

  const [currentIndex, setCurrentIndex] = useState(null)
  const [members, setMemebers] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)

  const handleAddAnother = () => {
    const isEdit = currentIndex !== null
    if (isEdit) {
      setMemebers(members.map((m, i) => i === currentIndex ? form : m))
    } else {
      setMemebers([...members, form])
    }
    setForm(EMPTY_FORM)
    setCurrentIndex(null)
  }

  const handleProceed = () => {
    const isEdit = currentIndex !== null
    if (isEdit) {
      setMemebers(members.map((m, i) => i === currentIndex ? form : m))
    }
    navigation.navigate('MemberProceedPay', {members})
  }

  const handlePressMember = (member, index) => () => {
    setForm(member)
    setCurrentIndex(index)
  }

  const handleChangeForm = field => value => {
    setForm(state => {
      return {
        ...state,
        [field]: value,
      }
    })
  }

  return (
    <View style={[styles.container, {paddingBottom: TAB_BAR_HEIGHT+15+insets.bottom+16}]}>
      <AppText weight={700} size={22}>Add new team member</AppText>
      <AppText color="#8083A3" weight={400} size={14}>Fill the fields below to add new team member</AppText>
      <ScrollView>
        <View style={{paddingTop: 24}}>
          {
            members.map((member, i) => {
              return (
                <Pressable key={i} style={styles.memberItem} onPress={handlePressMember(member, i)}>
                  <AppText weight={700} size={12} color="#fff">{`${member.firstname} ${member.lastname}`}</AppText>
                  <ChevronIcon color="#fff" style={{transform: [{rotate: '-90deg'}]}} />
                </Pressable>
              )
            })
          }
        </View>
        <View style={styles.form}>
          <AppInput
            value={form.firstname}
            onChangeText={handleChangeForm('firstname')}
            label="First name"
            placeholder=""
            style={{borderBottomWidth: 0}}
            containerStyle={styles.inputContainer} />
          <AppInput
            value={form.lastname}
            onChangeText={handleChangeForm('lastname')}
            label="Last name"
            placeholder=""
            style={{borderBottomWidth: 0}}
            containerStyle={styles.inputContainer} />
          <AppInput
            value={form.email}
            onChangeText={handleChangeForm('email')}
            label="Email"
            placeholder=""
            keyboardType="email-address"
            style={{borderBottomWidth: 0}}
            containerStyle={styles.inputContainer} />
          <AppInput
            value={form.phone}
            onChangeText={handleChangeForm('phone')}
            label="Phone"
            placeholder=""
            keyboardType="phone-pad"
            style={{borderBottomWidth: 0}}
            containerStyle={styles.inputContainer} />
        </View>
      </ScrollView>
      <AppButton style={{marginBottom: 8}} variant="secondary" onPress={handleAddAnother}>
        Add another member
      </AppButton>
      <AppButton onPress={handleProceed}>
        Proceed to pay
      </AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  form: {
    paddingTop: 16,
  },
  inputContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E4E6E8',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  memberItem: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#3E7EFF',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 23,
  }
})

export default MemberCreateScreen
