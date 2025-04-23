import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainFeature from "../components/MainFeature";
import { CheckCircle2, ListTodo, BarChart3 } from "lucide-react";

const Home = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });

  // Update stats when tasks change
  const updateStats = (tasks) => {
    const completed = tasks.filter(task => task.completed).length;
    setStats({
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    });
  };

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      updateStats(parsedTasks);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Welcome to TaskFlow</h2>
        <p className="text-surface-600 dark:text-surface-400">
          Organize your tasks, boost your productivity
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="neu-card flex items-center"
        >
          <div className="mr-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
            <ListTodo size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Total Tasks</p>
            <h3 className="text-2xl font-bold">{stats.total}</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="neu-card flex items-center"
        >
          <div className="mr-4 p-3 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
            <CheckCircle2 size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Completed</p>
            <h3 className="text-2xl font-bold">{stats.completed}</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="neu-card flex items-center"
        >
          <div className="mr-4 p-3 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg">
            <BarChart3 size={24} className="text-amber-500" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Pending</p>
            <h3 className="text-2xl font-bold">{stats.pending}</h3>
          </div>
        </motion.div>
      </div>

      <MainFeature onTasksChange={updateStats} />
    </div>
  );
};

export default Home;