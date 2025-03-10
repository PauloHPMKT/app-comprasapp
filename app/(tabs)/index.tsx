import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { BaseInput, Container, ContainerView } from './styles';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Logo } from '@/components/Logo';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [list, setList] = useState(false);
  const [buttonListCreate, setButtonListCreate] = useState('Defina um nome para sua lista');
  const [createListTitle, setCreateListTitle] = useState(false);

  function handleDefineListTile() {
    if (!createListTitle) {
      setCreateListTitle(true);
      setButtonListCreate('Criar lista');
    }

    if (createListTitle) {
      alert('Lista criada com sucesso');
    }
  }

  function handleChageText(value: string) {
    setText(value);
  }

  function handlePress() {
    setDisplayText(text);
  }

  return (
    <>
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Logo />
          <View style={{
            marginTop: 20,
            width: '100%',
            padding: 20,
            borderRadius: 6,
          }}>
            {createListTitle && (
              <BaseInput
                style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                placeholder="Insira um nome para a sua lista"
                value={text}
                onChangeText={handleChageText}
              />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={handleDefineListTile}
                style={styles.createListButton}
              >
                <Text style={styles.createListButtonText}>{buttonListCreate}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Header />
        <ContainerView>
          <BaseInput
            style={{ width: '80%', borderColor: 'gray', borderWidth: 1 }}
            placeholder="Digite algo"
            value={text}
            onChangeText={handleChageText}
          />
          <TouchableOpacity
            style={[styles.button, { width: '16%' }]}
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </ContainerView>
        <View>
          {!list ? (
            <Text>Lista Vazia!!!!</Text>
          ) : (
            <FlatList
              data={displayText}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
          )}
        </View> */}
      </Container>
    </>
  );
}

const styles = {
  button: {
    height: 40,
    backgroundColor: 'red',
    borderRadius: 6,
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
  },
  buttonText: {
    marginTop: 2,
    color: 'white',
    fontWeight: '600',
    fontSize: 24,
  },
  createListButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    alignSelf: 'flex-start',
  },
  createListButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
};
