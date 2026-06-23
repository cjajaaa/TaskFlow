import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TaskForm({ task, setTask, onAdd }) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        placeholder="Enter Task"
        placeholderTextColor="#9CA3AF"
        style={styles.taskInput}
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={onAdd}>
        <MaterialIcons name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  taskInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
