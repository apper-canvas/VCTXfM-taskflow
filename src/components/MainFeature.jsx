import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, Circle, Trash2, Edit, Calendar, 
  AlertCircle, Clock, Plus, X, Save, Filter
} from "lucide-react";
import { format } from "date-fns";

const MainFeature = ({ onTasksChange }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    priority: "medium"
  });
  
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (onTasksChange) onTasksChange(tasks);
  }, [tasks, onTasksChange]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask(prev => ({ ...prev, [name]: value }));
  };
  
  const addTask = (e) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) return;
    
    const task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: "",
      description: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      priority: "medium"
    });
    setIsFormOpen(false);
  };
  
  const toggleComplete = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  const startEditing = (task) => {
    setEditingTask(task);
  };
  
  const saveEdit = () => {
    setTasks(prev => 
      prev.map(task => 
        task.id === editingTask.id ? { ...editingTask } : task
      )
    );
    setEditingTask(null);
  };
  
  const cancelEdit = () => {
    setEditingTask(null);
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    if (filter === "high") return task.priority === "high";
    if (filter === "medium") return task.priority === "medium";
    if (filter === "low") return task.priority === "low";
    return true;
  });
  
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle size={16} className="text-red-500" />;
      case "medium":
        return <Clock size={16} className="text-amber-500" />;
      case "low":
        return <Calendar size={16} className="text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="card">
      <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-semibold">My Tasks</h3>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-surface-200 dark:border-surface-700"
          >
            <form onSubmit={addTask} className="p-6 bg-surface-50 dark:bg-surface-800">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">New Task</h4>
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                >
                  <X size={18} className="text-surface-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="What needs to be done?"
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Add details about this task..."
                    className="input min-h-[80px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={newTask.priority}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={18} />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="divide-y divide-surface-200 dark:divide-surface-700 max-h-[500px] overflow-y-auto scrollbar-hide">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center">
              <ListTodo size={24} className="text-surface-400" />
            </div>
            <h4 className="text-lg font-medium mb-2">No tasks found</h4>
            <p className="text-surface-500 dark:text-surface-400 text-sm">
              {filter === "all" 
                ? "Add a new task to get started" 
                : "Try changing your filter to see more tasks"}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <AnimatePresence key={task.id} mode="wait">
              {editingTask && editingTask.id === task.id ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-surface-50 dark:bg-surface-800"
                >
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="title"
                      value={editingTask.title}
                      onChange={handleEditChange}
                      className="input"
                    />
                    
                    <textarea
                      name="description"
                      value={editingTask.description}
                      onChange={handleEditChange}
                      className="input min-h-[60px]"
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="date"
                        name="dueDate"
                        value={editingTask.dueDate}
                        onChange={handleEditChange}
                        className="input"
                      />
                      
                      <select
                        name="priority"
                        value={editingTask.priority}
                        onChange={handleEditChange}
                        className="input"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={cancelEdit}
                        className="btn btn-outline inline-flex items-center gap-1"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </button>
                      
                      <button
                        onClick={saveEdit}
                        className="btn btn-primary inline-flex items-center gap-1"
                      >
                        <Save size={16} />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`task-item ${task.completed ? 'bg-surface-50/50 dark:bg-surface-800/50' : `priority-${task.priority}`}`}
                >
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-surface-400" />
                    )}
                  </button>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className={`font-medium truncate ${task.completed ? 'line-through text-surface-400' : ''}`}>
                      {task.title}
                    </h4>
                    
                    {task.description && (
                      <p className={`text-sm mt-1 text-surface-600 dark:text-surface-400 line-clamp-2 ${task.completed ? 'line-through text-surface-400' : ''}`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-surface-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{task.dueDate}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(task.priority)}
                        <span className="capitalize">{task.priority}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEditing(task)}
                      className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-primary transition-colors"
                      aria-label="Edit task"
                    >
                      <Edit size={16} />
                    </button>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-accent transition-colors"
                      aria-label="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))
        )}
      </div>
    </div>
  );
};

export default MainFeature;