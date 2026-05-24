import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { listaProdutos } from '../mocks/ListaProdutos';
import Texto from '../components/Texto';

export default function Produtos() {
  // lembra se o modal está aberto ou não, e qual produto foi clicado
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  // Função ao clicar em um produto
  const abrirModal = (produto: any) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };

  // Como cada produto deve ser desenhado na lista
  const renderizarProduto = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.cardProduto} onPress={() => abrirModal(item)}>
      <Image source={{ uri: item.imagem }} style={styles.imagemProduto} />
      {/* evita que nomes muito grandes quebrem o visual */}
      <Texto style={styles.nomeProduto} numberOfLines={2}>{item.nome}</Texto>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Texto style={styles.tituloProdutos}>PRODUTOS</Texto>

      <FlatList
        data={listaProdutos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarProduto}
        numColumns={2} // 2 produtos por linha
        columnWrapperStyle={styles.linhaFlatlist}
        contentContainerStyle={styles.listaContainer}
      />

      <Modal animationType="fade" transparent={true} visible={modalVisivel}>
        {/* Blur no background do modal */}
        <BlurView intensity={40} tint="dark" style={styles.containerBlur}>

          {/* exibe informação caso tenho um produto selecionado */}
          {produtoSelecionado && (
            <View style={styles.conteudoModal}>

              {/* Botão de Fechar (O X no canto superior direito) */}
              <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisivel(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>

              {/* Informações do Produto dentro do modal */}
              <Image source={{ uri: produtoSelecionado.imagem }} style={styles.imagemModal} />
              <Texto style={styles.categoriaModal}>{produtoSelecionado.categoria}</Texto>
              <Texto style={styles.nomeModal}>{produtoSelecionado.nome}</Texto>
              <Texto style={styles.descricaoModal}>{produtoSelecionado.descricao}</Texto>
              <Texto style={styles.precoModal}>{produtoSelecionado.preco}</Texto>

              {/* Botão de Compra */}
              <TouchableOpacity style={styles.botaoComprar}>
                <Texto style={styles.textoBotaoComprar}>Comprar</Texto>
              </TouchableOpacity>

            </View>
          )}

        </BlurView>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  tituloProdutos: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listaContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  linhaFlatlist: {
    justifyContent: 'space-around', // Espalha os 2 itens igualmente na linha
    marginBottom: 15,
  },

  // Visual do Produto na Lista
  cardProduto: {
    width: '45%',
    alignItems: 'center',
  },
  imagemProduto: {
    width: '100%',
    aspectRatio: 1, // mantem a proporção 1:1 (Quadrado)
    borderRadius: 10,
    marginBottom: 8,
  },
  nomeProduto: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: '#333',
  },

  // Visual do Modal (Janela Pop-up)
  containerBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoModal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    // Sombra para profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  botaoFechar: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  imagemModal: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  categoriaModal: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
  },
  nomeModal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  descricaoModal: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  precoModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 20,
  },
  botaoComprar: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
  },
  textoBotaoComprar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});