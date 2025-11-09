'use client';

import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TASK_STATUS, TASK_PRIORITY, USER_STATUS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedBy: string;
  team: string;
  progress: number;
  files: number;
}

export default function TasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user?.status !== USER_STATUS.APPROVED) {
      router.push('/auth/login');
      return;
    }

    loadTasks();
  }, [user, loading, router]);

  useEffect(() => {
    filterTasks();
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  const loadTasks = async () => {
    // Mock tasks data
    const mockTasks: Task[] = [
      {
        id: 'task-1',
        title: 'Solar Panel Efficiency Testing',
        description: 'Test and analyze the efficiency of new solar panel configurations under various weather conditions',
        status: TASK_STATUS.IN_PROGRESS,
        priority: TASK_PRIORITY.HIGH,
        dueDate: '2024-01-20',
        assignedBy: 'Sarah Johnson',
        team: 'solar',
        progress: 65,
        files: 3
      },
      {
        id: 'task-2',
        title: 'Wiring Diagram Review',
        description: 'Complete review of electrical wiring diagrams for the main power distribution system',
        status: TASK_STATUS.COMPLETED,
        priority: TASK_PRIORITY.MEDIUM,
        dueDate: '2024-01-15',
        assignedBy: 'Mike Chen',
        team: 'electricals',
        progress: 100,
        files: 5
      },
      {
        id: 'task-3',
        title: 'Suspension Component Analysis',
        description: 'Analyze stress points and performance metrics of suspension components under racing conditions',
        status: TASK_STATUS.TODO,
        priority: TASK_PRIORITY.HIGH,
        dueDate: '2024-01-25',
        assignedBy: 'Alex Rodriguez',
        team: 'suspension',
        progress: 0,
        files: 0
      },
      {
        id: 'task-4',
        title: 'Team Meeting Preparation',
        description: 'Prepare presentation materials and progress reports for the upcoming team meeting',
        status: TASK_STATUS.IN_PROGRESS,
        priority: TASK_PRIORITY.LOW,
        dueDate: '2024-01-22',
        assignedBy: 'Emma Davis',
        team: 'design',
        progress: 30,
        files: 1
      },
      {
        id: 'task-5',
        title: 'Brake System Testing',
        description: 'Conduct comprehensive testing of brake system performance and safety protocols',
        status: TASK_STATUS.REVIEW,
        priority: TASK_PRIORITY.URGENT,
        dueDate: '2024-01-18',
        assignedBy: 'David Kim',
        team: 'brakes',
        progress: 90,
        files: 8
      }
    ];
    
    setTasks(mockTasks);
  };

  const filterTasks = () => {
    let filtered = tasks;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return 'bg-green-100 text-green-800';
      case TASK_STATUS.IN_PROGRESS:
        return 'bg-orange-100 text-orange-800';
      case TASK_STATUS.REVIEW:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case TASK_PRIORITY.URGENT:
        return 'bg-red-100 text-red-800';
      case TASK_PRIORITY.HIGH:
        return 'bg-orange-100 text-orange-800';
      case TASK_PRIORITY.MEDIUM:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
        <p className="mt-2 text-gray-600">
          Track your assignments, progress, and team collaborations
        </p>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {tasks.filter(t => t.status === TASK_STATUS.IN_PROGRESS).length}
            </div>
            <p className="text-xs text-muted-foreground">Active work</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === TASK_STATUS.COMPLETED).length}
            </div>
            <p className="text-xs text-muted-foreground">Finished tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <span className="text-2xl">🚨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter(t => t.priority === TASK_PRIORITY.URGENT).length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Tasks</label>
              <Input
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={TASK_STATUS.TODO}>To Do</SelectItem>
                  <SelectItem value={TASK_STATUS.IN_PROGRESS}>In Progress</SelectItem>
                  <SelectItem value={TASK_STATUS.REVIEW}>In Review</SelectItem>
                  <SelectItem value={TASK_STATUS.COMPLETED}>Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value={TASK_PRIORITY.URGENT}>Urgent</SelectItem>
                  <SelectItem value={TASK_PRIORITY.HIGH}>High</SelectItem>
                  <SelectItem value={TASK_PRIORITY.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={TASK_PRIORITY.LOW}>Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <span className="text-6xl">📝</span>
              <p className="mt-4 text-lg font-medium">No tasks found</p>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Assigned by: {task.assignedBy}</span>
                      <span>Team: {task.team}</span>
                      <span className={isOverdue(task.dueDate) ? 'text-red-600 font-medium' : ''}>
                        Due: {formatDate(task.dueDate)}
                      </span>
                      {task.files > 0 && <span>📎 {task.files} files</span>}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <Button size="sm">Update Progress</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Upload Files</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}