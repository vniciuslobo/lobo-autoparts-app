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
    require('../../assets/video.mp4'),
    (player) => {
      player.loop = true;
      player.muted = false;
    }
  );

  return (
    <ScrollView style={styles.container}>
      {/* 1. Imagem Padrão do Topo */}
      <Texto style={styles.tituloTopo}>LOBO AUTOPARTS</Texto>
      <Image
        source={require('../../assets/icon.png')} // Pegando o ícone padrão do Expo
        style={styles.imagemTopo}
      />

      {/* 2. Texto Centralizado na tela, mas alinhado à esquerda/justificado */}
      <View style={styles.containerTexto}>
        <Texto>
          Em nossa loja, motor não é só peça, é paixão. Somos especializados na venda de peças de preparação e manutenção automotiva, com foco em desempenho, confiabilidade que só quem tem aquela alma turbinada entende.
        </Texto>
        <Texto>
          Trabalhamos com carros de rua, pista e projetos personalizados. Gostamos de elevar o nível, aqui cada produto é feito com alma de entusiasta.
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
  tituloTopo: {
    marginTop: 70,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  imagemTopo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    // marginTop: 70,
    marginBottom: 25,
    borderRadius: 20,
  },
  containerTexto: {
    paddingHorizontal: 30, // Isso "empurra" o texto para o centro
    marginBottom: 25,
  },
  containerVideo: {
    alignItems: 'center',
    marginBottom: 25,
  },
  video: {
    width: 330,
    height: 187
  },
  tituloSlider: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 25,
    textAlign: 'center'
  },
  sliderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40 // Espaço extra para não colar no menu inferior
  },
  cardCategoria: {
    alignItems: 'center',
    marginRight: 20
  },
  imagemCategoria: {
    width: 150,
    height: 110,
    borderRadius: 5,
    marginBottom: 5
  },
  textoCategoria: {
    fontSize: 16,
    fontWeight: '500'
  },
});