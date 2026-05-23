import React from 'react';
import { View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import Texto from '../components/Texto';

// Nossas categorias para o Slider
const categorias = [
  { id: '1', titulo: 'Manutenção', imagem: 'https://picsum.photos/100?random=1' },
  { id: '2', titulo: 'Performance', imagem: 'https://picsum.photos/100?random=2' },
  { id: '3', titulo: 'Armazenamento', imagem: 'https://picsum.photos/100?random=3' },
  { id: '4', titulo: 'Memória', imagem: 'https://picsum.photos/100?random=4' },
];

export default function Inicio() {
  // Configurando um vídeo público da internet para testes
  const player = useVideoPlayer(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    (player) => {
      player.loop = true;
      player.muted = false;
    }
  );

  return (
    <ScrollView style={styles.container}>
      {/* 1. Imagem Padrão do Topo */}
      <Image
        source={require('../../assets/icon.png')} // Pegando o ícone padrão do Expo
        style={styles.imagemTopo}
      />

      {/* 2. Texto Centralizado na tela, mas alinhado à esquerda/justificado */}
      <View style={styles.containerTexto}>
        <Texto>
          Bem-vindo ao app! Encontre aqui os melhores componentes e serviços
          para extrair o máximo de velocidade e eficiência do seu equipamento,
          seja para o dia a dia ou tarefas pesadas.
        </Texto>
      </View>

      {/* Reprodutor de Vídeo */}
      <View style={styles.containerVideo}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
          nativeControls={true}
        />
      </View>

      {/* 4. Slider de Categorias */}
      <Texto style={styles.tituloSlider}>Categorias</Texto>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categorias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sliderContainer}
        renderItem={({ item }) => (
          <View style={styles.cardCategoria}>
            <Image source={{ uri: item.imagem }} style={styles.imagemCategoria} />
            <Texto style={styles.textoCategoria}>{item.titulo}</Texto>
          </View>
        )}
      />
    </ScrollView>
  );
}

// Estilizações
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagemTopo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 20,
  },
  containerTexto: {
    paddingHorizontal: 30, // Isso "empurra" o texto para o centro
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    textAlign: 'justify', // Justificado, conforme você pediu
    color: '#333',
    lineHeight: 24,
  },
  containerVideo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  video: {
    width: 320,
    height: 200,
    borderRadius: 10,
  },
  tituloSlider: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  sliderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Espaço extra para não colar no menu inferior
  },
  cardCategoria: {
    alignItems: 'center',
    marginRight: 15,
  },
  imagemCategoria: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  textoCategoria: {
    fontSize: 14,
    fontWeight: '500',
  },
});