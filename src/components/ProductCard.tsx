import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../api/products";
import { useTheme } from "../theme/ThemeContext";
import { selectIsFavorite } from "../features/selectors";
import { toggleFavorite } from "../features/favoritesSlice";
import { RootState } from "../store/store";

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, product.id));
  
  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0]
    }));
  };
  
  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      marginVertical: 6,
      marginHorizontal: 12,
      backgroundColor: colors.card,
      alignItems: "center",
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'relative',
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    favoriteText: {
      fontSize: 18,
    },
    image: { width: 150, height: 100, marginBottom: 8, borderRadius: 8 },
    title: { 
      fontWeight: "bold", 
      fontSize: 16, 
      marginBottom: 4, 
      textAlign: "center",
      color: colors.text 
    },
    price: { 
      fontSize: 14, 
      color: colors.primary,
      fontWeight: '600'
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
        <Text style={styles.favoriteText}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
      {product.images[0] && (
        <Image source={{ uri: product.images[0] }} style={styles.image} />
      )}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </TouchableOpacity>
  );
}
