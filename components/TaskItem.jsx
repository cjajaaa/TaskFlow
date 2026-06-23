import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <TouchableOpacity
      style={styles.taskRow}
      activeOpacity={0.8}
      onPress={() => onToggle(item)}
      onLongPress={() => onDelete(item.id)}>
      <MaterialIcons
        name={item.completed ? 'check-box' : 'check-box-outline-blank'}
        size={22}
        color={item.completed ? '#16A34A' : '#4B5563'}
      />
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    gap: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 6,
  },
  taskTextCompleted: {
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
});
