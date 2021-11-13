import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import styles from './Login.style';

import authErrorMessageParser from '../../../utils/authErrorMessageParser';

import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';

import {showMessage} from 'react-native-flash-message';

const initialFormValues = {
  usermail: '',
  password: '',
};

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('SignPage');
  };

  const handleFormSubmit = async formValues => {
    if (!formValues.usermail && !formValues.password) {
      showMessage({
        message: 'E-posta adresi ve şifre alanları doldurulmak zorunda.',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      setLoading(false);
      navigation.navigate('MessagesScreen');
    } catch (error) {
      setLoading(false);
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Bana ne?</Text>
        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <Input
                value={values.usermail}
                onType={handleChange('usermail')}
                placeholder="E-Postanızı giriniz.."
              />
              <Input
                value={values.password}
                onType={handleChange('password')}
                placeholder="Şifrenizi giriniz.."
                isSecure={true}
              />
              <Button
                text="Giriş Yap"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>

        <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp} />
      </View>
    </ScrollView>
  );
};

export default Login;
