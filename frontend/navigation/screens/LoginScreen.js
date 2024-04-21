import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Image } from 'react-native';
import { auth } from './../../config';
import { loginValidationSchema } from '../../utils';

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("UserID:", userCredential.user.uid);
      navigation.navigate('MainContainer');
    } catch (error) {
      setErrorState(error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../../assets/logo.png')} style={styles.image} />
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
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MainContainer')}>
              <Text style={styles.buttonText2}>Forgot Password?</Text>
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
    marginBottom: 50
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
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
    fontWeight: '800',
    marginBottom: 20,
    marginTop: -20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 170, 
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  buttonText2: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
