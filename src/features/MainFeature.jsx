import { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Layers, 
  List, 
  PieChart, 
  Users 
} from 'lucide-react';
import { format } from 'date-fns';
import ListTodo from '../components/ListTodo';

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data for the dashboard
  const stats = [
    { id: 1, name: 'Total Tasks', value: '145', icon: <Layers size={20} className="text-blue-500" /> },
    { id: 2, name: 'Completed Tasks', value: '89', icon: <CheckCircle size={20} className="text-green-500" /> },
    { id: 3, name: 'Pending Tasks', value: '56', icon: <Clock size={20} className="text-yellow-500" /> },
    { id: 4, name: 'Team Members', value: '12', icon: <Users size={20} className="text-purple-500" /> },
  ];

  // Sample tasks data
  const tasks = [
    { id: 1, title: 'Complete project proposal', priority: 'High', dueDate: '2023-08-20', status: 'In Progress' },
    { id: 2, title: 'Review marketing materials', priority: 'Medium', dueDate: '2023-08-18', status: 'Pending' },
    { id: 3, title: 'Update client documentation', priority: 'Low', dueDate: '2023-08-25', status: 'Completed' },
    { id: 4, title: 'Prepare for team meeting', priority: 'High', dueDate: '2023-08-17', status: 'In Progress' },
    { id: 5, title: 'Research new technologies', priority: 'Medium', dueDate: '2023-08-30', status: 'Pending' },
  ];

  // Sample recent activities
  const activities = [
    { id: 1, user: 'Alex Johnson', action: 'completed', task: 'User Interview Sessions', time: '2 hours ago' },
    { id: 2, user: 'Sarah Williams', action: 'created', task: 'New Marketing Campaign', time: '4 hours ago' },
    { id: 3, user: 'Michael Brown', action: 'updated', task: 'Project Timeline', time: 'Yesterday' },
    { id: 4, user: 'Emily Davis', action: 'commented on', task: 'Product Requirements', time: 'Yesterday' },
    { id: 5, user: 'David Wilson', action: 'assigned', task: 'Bug Fixing Task to Robert', time: '3 days ago' },
  ];

  // Sample team members
  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Project Manager', tasks: 12, avatar: 'https://source.unsplash.com/100x100/?portrait?1' },
    { id: 2, name: 'Sarah Williams', role: 'UI/UX Designer', tasks: 8, avatar: 'https://source.unsplash.com/100x100/?portrait?2' },
    { id: 3, name: 'Michael Brown', role: 'Frontend Developer', tasks: 15, avatar: 'https://source.unsplash.com/100x100/?portrait?3' },
    { id: 4, name: 'Emily Davis', role: 'Backend Developer', tasks: 10, avatar: 'https://source.unsplash.com/100x100/?portrait?4' },
    { id: 5, name: 'David Wilson', role: 'QA Engineer', tasks: 9, avatar: 'https://source.unsplash.com/100x100/?portrait?5' },
  ];

  // Upcoming deadlines
  const deadlines = [
    { id: 1, title: 'Project Proposal Submission', date: '2023-08-20' },
    { id: 2, title: 'Client Presentation', date: '2023-08-25' },
    { id: 3, title: 'Sprint Review Meeting', date: '2023-08-18' },
    { id: 4, title: 'Team Building Event', date: '2023-09-05' },
  ];

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white rounded-lg shadow p-6 flex items-center">
                  <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Tasks Overview</h3>
                  <div className="p-2 rounded-full bg-gray-100">
                    <PieChart size={20} className="text-gray-500" />
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChart3 size={48} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Task Progress Chart</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Productivity Analytics</h3>
                  <div className="p-2 rounded-full bg-gray-100">
                    <BarChart3 size={20} className="text-gray-500" />
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <PieChart size={48} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Team Productivity Chart</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity and Upcoming Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-1">
                        <Clock size={16} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-gray-500">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.task}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {deadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-sm">{deadline.title}</p>
                        <div className="flex items-center mt-1">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-500 ml-1">{formatDate(deadline.date)}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        new Date(deadline.date) < new Date() ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {new Date(deadline.date) < new Date() ? 'Overdue' : 'Upcoming'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Todo List Section */}
            <div className="grid grid-cols-1 gap-6">
              <ListTodo />
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">All Tasks</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm text-gray-900">{task.title}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{formatDate(task.dueDate)}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-right">
                        <button className="text-blue-500 hover:text-blue-700 mr-2">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Team Members</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-4 flex items-center">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <p className="text-xs mt-1 text-blue-500">{member.tasks} active tasks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Calendar View</h3>
            <div className="h-96 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <Calendar size={48} className="mx-auto text-gray-400" />
                <p className="mt-4 text-gray-500">Calendar integration coming soon</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar / Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow mb-6 md:mb-0 md:mr-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">TaskFlow</h2>
              <p className="text-sm text-gray-500 mt-1">Task Management System</p>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-sm ${
                      activeTab === 'dashboard' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <BarChart3 size={18} className="mr-3" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-sm ${
                      activeTab === 'tasks' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List size={18} className="mr-3" />
                    Tasks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('team')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-sm ${
                      activeTab === 'team' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Users size={18} className="mr-3" />
                    Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className={`w-full flex items-center px-4 py-2 rounded-md text-sm ${
                      activeTab === 'calendar' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Calendar size={18} className="mr-3" />
                    Calendar
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'tasks' && 'Task Management'}
                {activeTab === 'team' && 'Team Overview'}
                {activeTab === 'calendar' && 'Calendar'}
              </h1>
              <p className="text-gray-500 mt-1">
                {activeTab === 'dashboard' && 'Overview of your tasks and team activity'}
                {activeTab === 'tasks' && 'Manage and organize your tasks'}
                {activeTab === 'team' && 'View and manage your team members'}
                {activeTab === 'calendar' && 'Schedule and track deadlines'}
              </p>
            </div>
            
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;