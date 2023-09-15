import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'

import Button from '../components/App/Button'

const SubscribeScreen = () => {
  const stripe = useStripe()
  // console.log(stripe)

  useEffect(() => {
    initializePaymentSheet()
  }, [])

  const handleSubscribe = () => {
    stripe.presentPaymentSheet()
  }

  const initializePaymentSheet = async () => {
    
    stripe.initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      // customerId: 'cus_OTPoENFpaYa8nV',
      // customerEphemeralKeySecret: '',
      paymentIntentClientSecret: 'pi_3NgTMuCOFDLqegrS0o20Yi5a_secret_3krH89HgzBe3SgU9O1TM7XXM9',
      // customerEphemeralKeySecret: ephemeralKey,
      // paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
      // defaultBillingDetails: {
      //   name: 'Jane Doe',
      // }
    }).then(async (res) => {
      console.log('res', res)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <Button style={{marginTop: 'auto'}} onPress={handleSubscribe}>
        Subscribe
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  }
})

const ScreenWrapper = (props) => {
  return (
    <StripeProvider publishableKey="pk_test_51HHsuZCOFDLqegrSKVXfCZHgJuPrv4xHSutXlB9UcLzqEMUdnk1vBNFyjO0jSBUiXlqBC9zM1gu4c9Ytzwl84JCI00LuTqSVuZ">
      <SubscribeScreen {...props} />
    </StripeProvider>
  )
}

export default ScreenWrapper
