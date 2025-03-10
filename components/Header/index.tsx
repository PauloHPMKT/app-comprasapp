import React from "react";
import { Text, View } from "react-native";
import { Container } from "./styles";
import { StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Logo } from "../Logo";

export function Header() {
  return (
    <Container>
      <Logo />
    </Container>
  )
}
