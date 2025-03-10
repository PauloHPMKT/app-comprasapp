import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
	margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
	background-color: #fafafa;
	flex: 1;
`

export const ContainerView = styled.View`
  padding: 20px 12px;
  flex-direction: row;
  align-items: center;
  gap: 10px; /* Espaçamento entre os itens */
`

export const BaseInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  padding: 0 10px;
  border-radius: 6px;
`
