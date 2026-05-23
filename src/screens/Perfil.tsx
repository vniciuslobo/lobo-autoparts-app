import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Perfil() {
  // Estados do Formulário
  const [nome, setNome] = useState('Seu Nome Aqui');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estados da Imagem e Câmera
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [permissao, pedirPermissao] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // Função para pegar foto da Galeria
  const escolherDaGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Força a proporção 1:1 (quadrada)
      quality: 1,
    });

    if (!resultado.canceled) {
      setFotoPerfil(resultado.assets[0].uri);
      setModalVisivel(false);
    }
  };

  // Função para abrir a Câmera
  const iniciarCamera = async () => {
    if (!permissao?.granted) {
      await pedirPermissao();
    }
    setModalVisivel(false);
    setCameraVisivel(true);
  };

  // Função para Bater a Foto
  const tirarFoto = async () => {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      setFotoPerfil(foto.uri);
      setCameraVisivel(false); // Fecha a câmera após tirar a foto
    }
  };

  // Função do Botão Salvar
  const salvarPerfil = () => {
    Alert.alert('Sucesso', 'Seu perfil foi salvo com sucesso!');
    // Limpando apenas Email e Senha (conforme você pediu), mas mantendo Nome e WhatsApp
    setEmail('');
    setSenha('');
  };

  // --- TELA DA CÂMERA (Ocupa a tela toda quando ativada) ---
  if (cameraVisivel) {
  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing="front" ref={cameraRef}>
        <View style={styles.containerBotoesCamera}>
          <TouchableOpacity style={styles.botaoCancelarCamera} onPress={() => setCameraVisivel(false)}>
            <Text style={styles.textoBotaoCamera}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCapturar} onPress={tirarFoto}>
            <Ionicons name="camera" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

  // --- TELA PRINCIPAL DO PERFIL ---
  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO COM COR DE FUNDO DESTACADA */}
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image 
            source={fotoPerfil ? { uri: fotoPerfil } : require('../../assets/icon.png')} 
            style={styles.imagemPerfil} 
          />
          <View style={styles.iconeEdicao}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Nome Editável */}
        <TextInput
          style={styles.inputNome}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* FORMULÁRIO */}
      <View style={styles.formulario}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="exemplo@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>WhatsApp</Text>
        <TextInput
          style={styles.input}
          value={whatsapp}
          onChangeText={setWhatsapp}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="********"
          secureTextEntry={true} // Esconde a senha
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPerfil}>
          <Text style={styles.textoBotaoSalvar}>Salvar</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DE ESCOLHA DE FOTO COM BLUR */}
      <Modal animationType="fade" transparent={true} visible={modalVisivel}>
        <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
          <View style={styles.modalConteudo}>
            <Text style={styles.tituloModal}>Alterar foto de perfil</Text>
            
            <TouchableOpacity style={styles.botaoModal} onPress={iniciarCamera}>
              <Ionicons name="camera-outline" size={24} color="#333" />
              <Text style={styles.textoBotaoModal}>Tirar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoModal} onPress={escolherDaGaleria}>
              <Ionicons name="image-outline" size={24} color="#333" />
              <Text style={styles.textoBotaoModal}>Escolher da Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoCancelarModal} onPress={() => setModalVisivel(false)}>
              <Text style={styles.textoCancelarModal}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // --- ESTILOS DO CABEÇALHO ---
  cabecalho: {
    backgroundColor: '#2C2F33', // Cor de destaque fazendo a divisão visual
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderColor: '#007AFF', // Detalhe azul
  },
  imagemPerfil: {
    width: 140,
    height: 140,
    aspectRatio: 1, // Proporção 1:1 solicitada
    borderRadius: 15, // Canto levemente arredondado para um quadrado moderno
    borderWidth: 3,
    borderColor: '#fff',
  },
  iconeEdicao: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2C2F33',
  },
  inputNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    minWidth: 200,
    paddingBottom: 5,
  },

  // --- ESTILOS DO FORMULÁRIO ---
  formulario: {
    padding: 30,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  botaoSalvar: {
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // --- ESTILOS DO MODAL ---
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConteudo: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botaoModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoBotaoModal: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  botaoCancelarModal: {
    marginTop: 15,
  },
  textoCancelarModal: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },

  // --- ESTILOS DA CÂMERA ---
  containerBotoesCamera: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 40,
  },
  botaoCapturar: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50,
  },
  botaoCancelarCamera: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoBotaoCamera: {
    color: '#fff',
    fontSize: 16,
  }
});