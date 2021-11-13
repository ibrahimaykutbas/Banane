import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';

import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ContentInputModal from '../../components/modal/ContentInput/ContentInputModal';
import parseContentData from '../../utils/parseContentData';

import styles from './Messages.style';

import MessageCard from '../../components/card/MessageCard/MessageCard';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Messages = () => {
  const [inputModalVisible, setInputModalVisible] = useState(false);

  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    database()
      .ref('/messages/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});
        setContentList(parsedData);
      });
  }, []);

  const handleInputToggle = () => {
    setInputModalVisible(!inputModalVisible);
  };

  const handleSendContent = content => {
    handleInputToggle();
    sendContent(content);
  };

  const sendContent = content => {
    const userMail = auth().currentUser.email;

    const contentObject = {
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      disslike: 0,
    };

    database().ref('/messages/').push(contentObject);
  };

  const handleDisslike = item => {
    database()
      .ref(`messages/${item.id}/`)
      .update({disslike: item.disslike + 1});
  };

  const renderContent = ({item}) => (
    <MessageCard message={item} onDisslike={() => handleDisslike(item)} />
  );
  
  return (
    <View style={styles.container}>
      <FlatList data={contentList} renderItem={renderContent} />
      <FloatingButton icon="plus" onPress={handleInputToggle} />
      <ContentInputModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
      />
    </View>
  );
};

export default Messages;
