import { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';

const ListTodo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Meet with team', completed: true },
    { id: 3, text: 'Research new technologies', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Todo List</h3>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white rounded-r-md px-3 py-2 flex items-center justify-center hover:bg-blue-600 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
      
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            className="flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleToggleComplete(todo.id)}
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  todo.completed ? 'bg-green-500' : 'border border-gray-300'
                }`}
              >
                {todo.completed && <Check size={14} className="text-white" />}
              </button>
              <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <div className="text-center py-4 text-gray-400 text-sm">
          No tasks yet. Add a new task to get started!
        </div>
      )}
    </div>
  );
};

export default ListTodo;