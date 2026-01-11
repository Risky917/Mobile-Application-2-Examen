import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "./../api/products";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./../navigation/types";
import { addToCart } from "./../features/cartSlice";
import { toggleFavorite } from "../features/favoritesSlice";
import { selectIsFavorite } from "../features/selectors";
import { useTheme } from "../theme/ThemeContext";
import { RootState } from "../store/store";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  const { productId } = route.params;
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => 
    data ? selectIsFavorite(state, data.id) : false
  );

  const handleFavoriteToggle = () => {
    if (data) {
      dispatch(toggleFavorite({
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.images?.[0]
      }));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      padding: 16,
      alignItems: "center",
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorText: {
      color: colors.error,
      fontSize: 16,
      textAlign: 'center',
    },
    imageContainer: {
      position: 'relative',
      marginBottom: 16,
    },
    image: {
      width: 250,
      height: 150,
      borderRadius: 8,
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    favoriteText: {
      fontSize: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
      textAlign: "center",
      color: colors.text,
    },
    price: {
      fontSize: 20,
      marginBottom: 16,
      color: colors.primary,
      fontWeight: '600',
    },
    description: {
      fontSize: 16,
      marginBottom: 24,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    addButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: 'center',
      flex: 1,
    },
    addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    favoriteButtonLarge: {
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: isFavorite ? colors.accent : colors.border,
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    favoriteButtonTextLarge: {
      fontSize: 20,
    },
  });

  if (isLoading) return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
  
  if (error) return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>Error loading product</Text>
    </View>
  );
  
  if (!data) return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>No product data available</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.images?.[0] && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: data.images[0] }} style={styles.image} />
            <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
              <Text style={styles.favoriteText}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.price}>${data.price}</Text>
        <Text style={styles.description}>{data.description}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              dispatch(addToCart({ id: data.id, title: data.title, price: data.price, quantity: 1 }))
            }
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.favoriteButtonLarge}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.favoriteButtonTextLarge}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
