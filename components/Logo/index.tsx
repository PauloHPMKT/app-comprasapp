import { StyleSheet, Text, View } from "react-native";
import { LogoContainer } from "./styles";
import { FontAwesome6 } from "@expo/vector-icons";

export function Logo() {
  return (
    <LogoContainer>
      <FontAwesome6 name="cart-shopping" size={36} color="red" />
      <View>
        <Text style={styles.smallTitle}>Bem vindo(a) ao</Text>
        <Text style={styles.title}>COMPRAS<Text style={styles.titleLight}>APP</Text></Text>
      </View>
    </LogoContainer>
  )
}

const styles = StyleSheet.create({
  smallTitle: {
    fontSize: 14,
    opacity: 0.9
  },
  title: {
    fontSize: 20,
    fontWeight: "700"
  },
  titleLight: {
    fontSize: 20,
    fontWeight: "400"
  }
});
