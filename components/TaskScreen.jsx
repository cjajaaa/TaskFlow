import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { supabase } from '../lib/supabase';
import AddTaskModal from './AddTaskModal';
import TaskItem from './TaskItem';

export default function TaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });

    if (error) {
      console.log({ error });
      return;
    }

    setTasks(data ?? []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleSubmitTask = async (title) => {
    const trimmed = title?.trim();
    if (!trimmed) {
      return;
    }

    const { error } = await supabase.from('tasks').insert([{ title: trimmed, completed: false }]);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Unable to add task',
        text2: error.message || 'Please try again.',
      });
      return;
    }

    setModalVisible(false);
    await loadTasks();
    Toast.show({
      type: 'success',
      text1: 'Task added',
      text2: 'Your task was saved successfully.',
    });
  };

  const toggleTask = async (item) => {
    setTasks((prev) => prev.map((task) => (task.id === item.id ? { ...task, completed: !task.completed } : task)));

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: !item.completed })
        .eq('id', item.id)
        .select();

      if (error) {
        console.log('toggleTask error', error);
        setTasks((prev) => prev.map((task) => (task.id === item.id ? { ...task, completed: item.completed } : task)));
        Toast.show({
          type: 'error',
          text1: 'Unable to update task',
          text2: error.message || 'Please try again.',
        });
        return;
      }

      if (data && data.length > 0) {
        setTasks((prev) => prev.map((task) => (task.id === item.id ? data[0] : task)));
      } else {
        await loadTasks();
      }
    } catch (err) {
      console.log('toggleTask exception', err);
      setTasks((prev) => prev.map((task) => (task.id === item.id ? { ...task, completed: item.completed } : task)));
      Toast.show({
        type: 'error',
        text1: 'Unable to update task',
        text2: 'Please try again.',
      });
    }
  };

  const handleDeleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Unable to delete task',
        text2: error.message || 'Please try again.',
      });
      return;
    }

    await loadTasks();
    Toast.show({
      type: 'success',
      text1: 'Task deleted',
      text2: 'The task was removed.',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>TaskFlow</Text>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No tasks yet. Add one to get started.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.taskList}
          renderItem={({ item }) => <TaskItem item={item} onToggle={toggleTask} onDelete={handleDeleteTask} />}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleOpenModal} activeOpacity={0.85}>
        <MaterialIcons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleSubmitTask} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 16,
  },
  taskList: {
    paddingBottom: 24,
  },
});
