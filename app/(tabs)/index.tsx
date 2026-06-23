import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TaskFlow() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={headerStyles.title}>TaskFlow</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter Task"
          placeholderTextColor="#9CA3AF"
          style={styles.taskInput}
        />
        <TouchableOpacity style={styles.addButton} activeOpacity={0.85}>
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.taskList}>
        <View style={styles.taskRow}>
          <MaterialIcons name="check-box-outline-blank" size={22} color="#4B5563" />
          <Text style={styles.taskText}>Study React Native</Text>
        </View>

        <View style={styles.taskRow}>
          <MaterialIcons name="check-box-outline-blank" size={22} color="#4B5563" />
          <Text style={styles.taskText}>Finish Assignment</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  headerContainer: {
    marginBottom: 24,
  },
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
  taskList: {
    marginTop: 8,
  },
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
});
