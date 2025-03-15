import { useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainLogo } from "@/components/Logo";
import { BaseInput, Container, LoginContent } from "./styles";
import { CustomCheckBox } from "@/components/CustomCheckBox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (email === "teste@email.com" && password === "123456") {
      await AsyncStorage.setItem("authToken", "token_de_exemplo");
      router.replace("./painel/dashboard");
    } else {
      Alert.alert("Erro", "Credenciais inválidas!");
    }
  };

  return (
    <Container>
      <Container style={styles.LogoContainer}>
        <MainLogo />
      </Container>
      <LoginContent>
        <BaseInput
          placeholder="Insira seu e-mail"
          value={email}
          onChangeText={setEmail}
          style={{ width: '100%', height: 45 }}
        />
        <BaseInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ width: '100%', height: 45  }}
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomCheckBox
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              checkedColor="#ee2626"
              uncheckedColor="#ccc"
            >
              Lembrar-me
            </CustomCheckBox>
          </View>
          <Text style={{ fontSize: 12 }}>Esqueceu sua senha?</Text>
        </View>
      </LoginContent>
      <View style={{ flex: 3, width: '90%', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.createListButton}
          onPress={handleLogin}
        >
          <Text style={styles.createListButtonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Text>Ou</Text>
          <Text
            onPress={() => router.push("./register")}
            style={{ textDecorationLine: 'underline', color: '#f54e4e' }}>
            Crie uma conta com a gente!
          </Text>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  LogoContainer: {
    marginTop: 150,
    marginBottom: 50,
  },
  createListButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee2626',
    width: '90%',
    height: 50,
    borderRadius: 26,
  },
  createListButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: '400',
  },
})
