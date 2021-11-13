import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './MessageCard.style';

import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

const MessageCard = ({message, onDisslike}) => {
  const formattedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.innerContainer}>
          <Text style={styles.user}>{message.username}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Text style={styles.text}>{message.text}</Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.disslikeContainer}
            onPress={onDisslike}>
            {!!message.disslike && (
              <View style={styles.disslikeCountContainer}>
                <Text style={styles.disslikeCountText}>{message.disslike}</Text>
              </View>
            )}
            <Text style={styles.disslikeText}>Bana ne?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MessageCard;
