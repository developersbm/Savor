import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
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
      console.log("UserID:", userCredential.user.uid); // Print UserID
      navigation.navigate('MainContainer');
    } catch (error) {
      setErrorState(error.message);
      console.log(error);
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
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button}>
              <Text style={styles.buttonText}>Create a new account?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MainContainer')} style={styles.button}>
              <Text style={styles.buttonText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4169E1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
