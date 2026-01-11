import React, { useState, useMemo } from "react";
import { View, FlatList, ActivityIndicator, Text, StyleSheet, TextInput } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "./../api/products";
import ProductCard from "./../components/ProductCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./../navigation/types";
import { useTheme } from "../theme/ThemeContext";
import { useDebounce } from "../hooks/useDebounce";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  const { data, isLoading, error } = useQuery<Product[]>({ queryKey: ["products"], queryFn: fetchProducts });
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    if (!debouncedSearchTerm.trim()) return data;
    
    return data.filter(product => 
      product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data, debouncedSearchTerm]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchContainer: {
      padding: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchInput: {
      height: 44,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text,
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
    emptyText: {
      color: colors.textSecondary,
      fontSize: 16,
      textAlign: 'center',
    },
    resultText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: 'center',
      padding: 8,
    },
  });

  if (isLoading) return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
  
  if (error) return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>Error loading products</Text>
    </View>
  );
  
  if (!data || data.length === 0) return (
    <View style={styles.centered}>
      <Text style={styles.emptyText}>No products found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={colors.textSecondary}
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      
      {debouncedSearchTerm.trim() && (
        <Text style={styles.resultText}>
          {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{debouncedSearchTerm}"
        </Text>
      )}
      
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={
          debouncedSearchTerm.trim() ? (
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No products found matching "{debouncedSearchTerm}"</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
