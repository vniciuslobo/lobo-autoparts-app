import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Texto from '../components/Texto';

export default function Perfil() {
  // Estados do Formulário Simplificado
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  // Estados da Imagem, Câmera e Permissão
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [ladoCamera, setLadoCamera] = useState<'front' | 'back'>('front'); // Controla o lado da câmera
  const [permissao, pedirPermissao] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // Buscar foto da Galeria
  const escolherDaGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Mantém a proporção 1:1 quadrada
      quality: 1,
    });

    if (!resultado.canceled) {
      setFotoPerfil(resultado.assets[0].uri);
      setModalVisivel(false);
    }
  };

  // Pedir permissão e abrir Câmera
  const iniciarCamera = async () => {
    if (!permissao?.granted) {
      await pedirPermissao();
    }
    setModalVisivel(false);
    setCameraVisivel(true);
  };

  // Tirar a foto
  const tirarFoto = async () => {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      if (foto) {
        setFotoPerfil(foto.uri);
        setCameraVisivel(false);
      }
    }
  };

  // Remover a foto atual
  const removerFoto = () => {
    setFotoPerfil(null);
    setModalVisivel(false);
  };

  // Alternar entre câmera Frontal e Traseira
  const inverterCamera = () => {
    setLadoCamera(anterior => (anterior === 'front' ? 'back' : 'front'));
  };

  // MODO CÂMERA ATIVA
  if (cameraVisivel) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} facing={ladoCamera} ref={cameraRef}>
          <View style={styles.containerBotoesCamera}>
            
            {/* Botão Cancelar */}
            <TouchableOpacity style={styles.botaoAcaoCamera} onPress={() => setCameraVisivel(false)}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Botão Capturar Foto */}
            <TouchableOpacity style={styles.botaoCapturar} onPress={tirarFoto}>
              <Ionicons name="camera" size={32} color="#000000" />
            </TouchableOpacity>

            {/* Botão Girar Câmera (Nova Função!) */}
            <TouchableOpacity style={styles.botaoAcaoCamera} onPress={inverterCamera}>
              <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
            </TouchableOpacity>

          </View>
        </CameraView>
      </View>
    );
  }

  // TELA DO PERFIL
  return (
    // TouchableWithoutFeedback faz o teclado fechar ao clicar fora de qualquer input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
  
        <Texto style={styles.tituloPerfil}>PERFIL</Texto>
        {/* ÁREA DA FOTO */}
        <View style={styles.areaAvatar}>
          <TouchableOpacity onPress={() => setModalVisivel(true)} activeOpacity={0.8}>
            <Image 
              source={fotoPerfil ? { uri: fotoPerfil } : require('../../assets/generic-profile.png')} 
              style={styles.imagemPerfil} 
            />
            <View style={styles.iconeEdicao}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* CAMPOS DE TEXTO */}
        <View style={styles.formulario}>
          
          <Texto style={styles.label}>Nome Completo</Texto>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome completo"
          />

          <Texto style={styles.label}>E-mail</Texto>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="exemplo@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Texto style={styles.label}>WhatsApp</Texto>
          <TextInput
            style={styles.input}
            value={whatsapp}
            onChangeText={setWhatsapp}
            placeholder="11 99999-9999"
            keyboardType="phone-pad"
          />

        </View>

        {/* OPÇÃO DE REMOVER FOTO */}
        <Modal animationType="fade" transparent={true} visible={modalVisivel}>
          <BlurView intensity={25} tint="dark" style={styles.blurContainer}>
            <View style={styles.modalConteudo}>
              <Texto style={styles.tituloModal}>Foto de Perfil</Texto>
              
              <TouchableOpacity style={styles.botaoModal} onPress={iniciarCamera}>
                <Ionicons name="camera-outline" size={22} color="#333" />
                <Texto style={styles.textoBotaoModal}>Tirar Foto</Texto>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botaoModal} onPress={escolherDaGaleria}>
                <Ionicons name="image-outline" size={22} color="#333" />
                <Texto style={styles.textoBotaoModal}>Escolher da Galeria</Texto>
              </TouchableOpacity>

              {/* Só mostra o botão de remover se o usuário tiver colocado uma foto */}
              {fotoPerfil && (
                <TouchableOpacity style={[styles.botaoModal, styles.botaoRemover]} onPress={removerFoto}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                  <Texto style={[styles.textoBotaoModal, { color: 'red' }]}>Remover Foto</Texto>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.botaoCancelarModal} onPress={() => setModalVisivel(false)}>
                <Texto style={styles.textoCancelarModal}>Cancelar</Texto>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f7',
    paddingTop: 60,
  },
  areaAvatar: {
    alignItems: 'center',
    marginVertical: 30,
  },
  tituloPerfil: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  imagemPerfil: {
    width: 150,
    height: 150,
    aspectRatio: 1, // Mantem a proporção de 1:1 (Quadrado)
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#cecece',
  },
  iconeEdicao: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#f57c00',
    padding: 7,
    borderRadius: 16,
  },
  formulario: {
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderRadius: 5,
    padding: 14,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Space Grotesk'
  },
  
  // Estilos do Janela Pop-up (Modal)
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
    elevation: 5,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  botaoModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  botaoRemover: {
    backgroundColor: '#fff5f5',
  },
  textoBotaoModal: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
    fontWeight: '500',
  },
  botaoCancelarModal: {
    marginTop: 10,
    padding: 10,
  },
  textoCancelarModal: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },

  // Estilos da Câmera
  containerBotoesCamera: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 50,
  },
  botaoCapturar: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: '#fff'
  },
  botaoAcaoCamera: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});