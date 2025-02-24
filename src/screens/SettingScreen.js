import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Button } from 'react-native';

const SettingsScreen = () => {
  const [name, setName] = useState('Thắng Phạm');
  const [email, setEmail] = useState('tp@gmail.com');
  const [password, setPassword] = useState('********');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

  const handleSave = () => {
    // Xử lý lưu thông tin ở đây
    console.log('Thông tin đã lưu:', { name, email, password, notificationsEnabled });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Họ Tên</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nhập họ tên" 
          value={name} 
          onChangeText={setName} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nhập email" 
          value={email} 
          onChangeText={setEmail} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Mật Khẩu</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nhập mật khẩu" 
          secureTextEntry={true} 
          value={password} 
          onChangeText={setPassword} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Thông Báo</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleSwitch}
        />
      </View>

      <Button title="Lưu" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SettingsScreen;