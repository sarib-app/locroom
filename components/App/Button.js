import React, { Children } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AppText from './Text'
import { MAIN_COLOR } from '../../config'

const Button = ({children, style, variant = 'main', ...props}) => {
  return (
    <TouchableOpacity style={[styles.container, style, styles[variant]]} {...props}>
      {
        typeof children === 'string'
          ? <AppText color="#fff" style={styles[`${variant}_title`]}>{ children }</AppText>
          : children
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_COLOR,
    width: '100%',
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3E7EFF',
  },
  secondary_title: {
    color: '#3E7EFF',
  },
  warning: {
    backgroundColor:'#FDEDE6',
  },
  warning_title: {
    color: '#EF8354',
  }
})

export default Button
