import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Edit from 'react-native-vector-icons/FontAwesome';
import Delete from 'react-native-vector-icons/MaterialIcons';
const App = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const handleAdd = () => {
    setTodoList([...todoList, {title: todo}]);
    setTodo('');
  };

  const handleDelete = index => {
    const tempArray = [...todoList];
    tempArray.splice(index, 1);
    setTodoList(tempArray);
  };
  const handleEdit = (item, index) => {
    setEditTodo(index);
    setTodo(item.title);
  };
  const handleUpdateTodo = () => {
    const updateTodo = todoList.map((item, index) => {
      if (index === editTodo) {
        return {...item, title: todo};
      }
      return item;
    });
    setTodoList(updateTodo);
    setEditTodo(null);
    setTodo('');
  };
  console.log('editTodo', editTodo);
  // console.log('setTodo', todoList);
  const dummyData = [
    {
      title: 'shehzad',
    },
    {
      title: 'shehzad',
    },
    {
      title: 'shehzad',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.TodoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Todo List"
          value={todo}
          onChangeText={text => setTodo(text)}
        />
        {editTodo !== null ? (
          <TouchableOpacity
            onPress={handleUpdateTodo}
            style={styles.addContainer}>
            <Text style={styles.addButton}> save </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleAdd} style={styles.addContainer}>
            <Text style={styles.addButton}> Add </Text>
          </TouchableOpacity>
        )}
      </View>

      {todoList.length <= 0 ? (
        <Image style={styles.image} source={require('./assets/todo.png')} />
      ) : (
        <FlatList
          data={todoList}
          renderItem={({item, index}) => {
            console.log(item, index);
            // console.log( index);
            return (
              <View style={styles.listContainer}>
                <Text style={styles.todo}>{item.title}</Text>
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => handleEdit(item, index)}>
                    <Edit name="edit" color="black" size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Delete name="delete" color="black" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 12,
    marginTop: 22,
    padding: 12,
  },
  TodoContainer: {
    flexDirection: 'row',
  },
  input: {
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 0.9,
    width: '83%',
    padding: 8,
    backgroundColor: '#F7D9D0',
    height: 50,
    fontSize: 22,
  },
  addContainer: {
    justifyContent: 'center',
    marginLeft: 12,
    backgroundColor: '#FBCEC0',
    borderRadius: 12,
    width: '15%',
    alignItems: 'center',
    borderWidth: 0.9,
  },
  addButton: {
    fontSize: 18,
    color: 'black',
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7D9D0',
    marginTop: 12,
    borderRadius: 7,
    padding: 12,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginTop: 120,
  },
  todo: {
    width: '75%',
    fontSize: 22,
    color: 'black',
  },
  iconContainer: {
    width: '23%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
