import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import styles from './Sign.style';

import {showMessage} from 'react-native-flash-message';

import authErrorMessageParser from '../../../utils/authErrorMessageParser';

import auth from '@react-native-firebase/auth';

import {Formik} from 'formik';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    navigation.goBack();
  };

  const handleFormSubmit = async formValues => {
    if (!formValues.usermail && !formValues.password) {
      showMessage({
        message: 'E-posta adresi ve şifre alanları doldurulmak zorunda.',
        type: 'danger',
      });
      return;
    }

    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return;
    }
    
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
      });
      navigation.navigate('LoginPage');
      setLoading(false);
    } catch (error) {
      setLoading(true);
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      setLoading(false);
      return;
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
                placeholder="E-Postanızı giriniz.."
                value={values.usermail}
                onType={handleChange('usermail')}
              />
              <Input
                placeholder="Şifrenizi giriniz.."
                value={values.password}
                onType={handleChange('password')}
                isSecure={true}
              />
              <Input
                placeholder="Şifrenizi tekrar giriniz.."
                value={values.repassword}
                onType={handleChange('repassword')}
                isSecure={true}
              />

              <Button
                text="Kayıt Ol"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>

        <Button text="Giriş Yap" theme="secondary" onPress={handleLogin} />
      </View>
    </ScrollView>
  );
};

export default Sign;
