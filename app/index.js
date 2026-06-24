import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import Toast from 'react-native-toast-message';

export default function Index() {
  const [task, setTask] = useState('');
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

  const addTask = async () => {
    const trimmed = task.trim();
    if (!trimmed) return;
    const { error } = await supabase.from('tasks').insert([{ title: trimmed, completed: false }]);
    if (error) {
      console.log({ error });
      Toast.show({ type: 'error', text1: 'Error adding task' });
      return;
    }
    setTask('');
    await loadTasks();
    Toast.show({ type: 'success', text1: 'Task added' });
  };

  async function handleSubmitTask(title) {
    try {
      const { error } = await supabase.from('tasks').insert([{ title, completed: false }]);
      if (error) {
        console.log({ error });
        Toast.show({ type: 'error', text1: 'Error adding task' });
        return;
      }
      setModalVisible(false);
      Toast.show({ type: 'success', text1: 'Task added' });
      await loadTasks();
    } catch (err) {
      console.log('handleSubmitTask exception', err);
      Toast.show({ type: 'error', text1: 'Error adding task' });
    }
  }

  const toggleTask = async (item) => {
    setTasks((prev) => prev.map((t) => (t.id === item.id ? { ...t, completed: !t.completed } : t)));
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: !item.completed })
        .eq('id', item.id)
        .select();
      if (error) {
        console.log('toggleTask error', error);
        setTasks((prev) => prev.map((t) => (t.id === item.id ? { ...t, completed: item.completed } : t)));
        Toast.show({ type: 'error', text1: 'Error updating task' });
        return;
      }
      if (data && data.length > 0) {
        setTasks((prev) => prev.map((t) => (t.id === item.id ? data[0] : t)));
      } else {
        await loadTasks();
      }
      Toast.show({ type: 'success', text1: 'Task updated' });
    } catch (err) {
      console.log('toggleTask exception', err);
      setTasks((prev) => prev.map((t) => (t.id === item.id ? { ...t, completed: item.completed } : t)));
      Toast.show({ type: 'error', text1: 'Error updating task' });
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
      console.log({ error });
      Toast.show({ type: 'error', text1: 'Error deleting task' });
      return;
    }
    await loadTasks();
    Toast.show({ type: 'success', text1: 'Task deleted' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={headerStyles.title}>TaskFlow</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 8 }}>
          <Text style={{ fontSize: 18, color: '#2563EB' }}>Add</Text>
        </TouchableOpacity>
      </View>

      <TaskForm task={task} setTask={setTask} onAdd={addTask} />

      <View style={styles.taskList}>
        {tasks.map((t) => (
          <TaskItem key={t.id} item={t} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </View>

      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleSubmitTask} />
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
  taskList: {
    marginTop: 8,
  },
});
