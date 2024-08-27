import { Image, StyleSheet, Platform, useWindowDimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { useState } from 'react';

type ObjectData = {
  [key: string]: string
}
type FormData = ObjectData & {
  userName?: string;
  password?: string
}

export default function HomeScreen() {
  const { width, height} = useWindowDimensions();
  const [isLogin, setLogin] = useState(false);
  const [form, setForm] = useState<FormData>({
    userName: "",
    password: ""
  });
  const onChangeText = (dataForm: FormData) => {
    setForm(data => ({
      ...data,
      ...dataForm
    }))
  }

  const onSubmit = () => {
    for (let key in form) {
      if (!form[key]) {
        return;
      }
    }
    setLogin(true)
  }
  if (isLogin) {
    return (
      <ThemedView style={{ justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%"}}>
        <ThemedText>
          Login success!
        </ThemedText>
      </ThemedView>
    )
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={[styles.reactLogo, { width: width }]}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sign In</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">UserName</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <ThemedTextInput style={styles.input} onChangeText={text => onChangeText({userName: text})} id='userName' nativeID='userName' testID='userName'/>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">Password</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <ThemedTextInput style={styles.input} onChangeText={text => onChangeText({password: text})} id='password' nativeID='password' testID='password'/>
        </ThemedView>
      </ThemedView>
      <ThemedButton style={{ backgroundColor: '#1D3D47', paddingVertical: 5, borderRadius: 3, marginTop: 20}} onPress={onSubmit}>
        <ThemedText type="defaultSemiBold" style={{ color: "white", textAlign: 'center'}} testID='submit'>Submit</ThemedText>
      </ThemedButton>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    justifyContent: "center"
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 120,
    width: 0,
    bottom: 10,
    left: 0,
    position: 'absolute',
  },
  inputContainer: { borderColor: "#ccc", borderWidth: 1, paddingVertical: 3, borderRadius: 3},
  input: {
    fontSize: 20
  }
});
