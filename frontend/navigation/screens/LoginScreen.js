import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from './../../config';
import { loginValidationSchema } from '../../utils';

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; 
      console.log('User ID:', userId);
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Welcome back!</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter password"
              secureTextEntry
            />
            {touched.password && errors.password && <Text>{errors.password}</Text>}
            {errorState !== '' && <Text>{errorState}</Text>}
            <Button onPress={handleSubmit} title="Login" />
          </View>
        )}
      </Formik>
      <Button title="Create a new account?" onPress={() => navigation.navigate('Signup')} />
      <Button title="Forgot Password" onPress={() => navigation.navigate('MainContainer')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
});
