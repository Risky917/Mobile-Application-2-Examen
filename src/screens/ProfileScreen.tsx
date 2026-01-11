import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, FlatList, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalItems, selectSubtotal, selectFavorites, selectTotalFavorites } from "../features/selectors";
import { removeFavorite } from "../features/favoritesSlice";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/types";
import { useTheme } from "../theme/ThemeContext";

export default function ProfileScreen() {
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const favorites = useSelector(selectFavorites);
  const totalFavorites = useSelector(selectTotalFavorites);
  const dispatch = useDispatch();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const { theme, colors, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    themeSection: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    themeLabel: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    currentTheme: {
      fontSize: 14,
      color: colors.textSecondary,
      textTransform: 'capitalize',
    },
    statsSection: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    statLabel: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    favoritesSection: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      flex: 1,
    },
    favoriteItem: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: colors.surface,
      borderRadius: 8,
      marginBottom: 8,
      alignItems: 'center',
    },
    favoriteImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
      marginRight: 12,
    },
    favoriteInfo: {
      flex: 1,
    },
    favoriteTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    favoritePrice: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
    removeButton: {
      padding: 8,
    },
    removeButtonText: {
      fontSize: 18,
    },
    emptyFavorites: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: 16,
      fontStyle: 'italic',
    },
  });

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteItem}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      )}
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.favoritePrice}>${item.price}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => dispatch(removeFavorite(item.id))}
      >
        <Text style={styles.removeButtonText}>❤️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Theme Section */}
      <View style={styles.themeSection}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.themeToggle}>
          <View style={{ flex: 1 }}>
            <Text style={styles.themeLabel}>Dark Mode</Text>
            <Text style={styles.currentTheme}>Current: {theme} theme</Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={theme === 'dark' ? colors.accent : colors.surface}
          />
        </View>
      </View>

      {/* Cart Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Cart Summary</Text>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total items in cart:</Text>
          <Text style={styles.statValue}>{totalItems}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Subtotal:</Text>
          <Text style={styles.statValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.buttonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Favorites Section */}
      <View style={styles.favoritesSection}>
        <Text style={styles.sectionTitle}>Favorites ({totalFavorites})</Text>
        {favorites.length === 0 ? (
          <Text style={styles.emptyFavorites}>No favorites yet</Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderFavoriteItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
