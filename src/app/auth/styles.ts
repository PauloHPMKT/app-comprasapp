import styled from "styled-components/native"

export const BaseInput = styled.TextInput`
  height: 40px;
  border-color:rgb(184, 182, 182);
  border-width: 1px;
  padding: 0 10px;
  border-radius: 6px;
  background-color: #fff;
`

export const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
`

export const LoginContent = styled.View`
  display: flex;
  flex: 2;
  padding: 20px;
  border-radius: 6px;
  width: 90%;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
`

