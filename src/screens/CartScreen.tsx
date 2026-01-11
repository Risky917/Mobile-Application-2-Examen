import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { selectTotalItems, selectSubtotal } from "../features/selectors";
import { increaseQuantity, decreaseQuantity, removeItem } from "../features/cartSlice";
import ItemCounter from "../components/ItemCounter";
import { useTheme } from "../theme/ThemeContext";

export default function CartScreen() {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.text,
    },
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    summaryText: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },
    item: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 14,
      color: colors.primary,
      marginBottom: 8,
      fontWeight: '600',
    },
    itemActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    removeButton: {
      backgroundColor: colors.error,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    removeButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
        <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <View style={styles.itemActions}>
              <ItemCounter
                quantity={item.quantity}
                onIncrease={() => dispatch(increaseQuantity(item.id))}
                onDecrease={() => dispatch(decreaseQuantity(item.id))}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => dispatch(removeItem(item.id))}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
