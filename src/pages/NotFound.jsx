import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
            transition={{ 
              duration: 0.5,
              rotate: { delay: 0.5, duration: 0.5 }
            }}
            className="w-24 h-24 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center"
          >
            <AlertTriangle size={48} className="text-accent" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn btn-primary inline-flex items-center gap-2">
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;