import { User } from '@/lib/auth';
import { USER_STATUS, USER_ROLES } from '@/lib/constants';

// Simulated database using localStorage
export class Database {
  private static getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('astra-users');
    return users ? JSON.parse(users) : [];
  }

  private static saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('astra-users', JSON.stringify(users));
  }

  static async createUser(userData: Omit<User, 'id' | 'joinedAt'>): Promise<User> {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      joinedAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(user => user.email === email) || null;
  }

  static async getUserById(id: string): Promise<User | null> {
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  static async getPendingUsers(): Promise<User[]> {
    const users = this.getUsers();
    return users.filter(user => user.status === USER_STATUS.PENDING);
  }

  static async approveUser(userId: string): Promise<boolean> {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].status = USER_STATUS.APPROVED;
      this.saveUsers(users);
      return true;
    }
    return false;
  }

  static async denyUser(userId: string): Promise<boolean> {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].status = USER_STATUS.DENIED;
      this.saveUsers(users);
      return true;
    }
    return false;
  }

  static async getTeamMembers(team: string): Promise<User[]> {
    const users = this.getUsers();
    return users.filter(user => 
      user.team === team && 
      user.status === USER_STATUS.APPROVED
    );
  }

  static async getAllApprovedUsers(): Promise<User[]> {
    const users = this.getUsers();
    return users.filter(user => user.status === USER_STATUS.APPROVED);
  }

  static async updateUserRole(userId: string, newRole: typeof USER_ROLES[keyof typeof USER_ROLES]): Promise<boolean> {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].role = newRole;
      this.saveUsers(users);
      return true;
    }
    return false;
  }
}

// Task Management
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  team: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  files: string[];
  comments: TaskComment[];
}

export interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export class TaskDatabase {
  private static getTasks(): Task[] {
    if (typeof window === 'undefined') return [];
    const tasks = localStorage.getItem('astra-tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private static saveTasks(tasks: Task[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('astra-tasks', JSON.stringify(tasks));
  }

  static async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  static async getTasksByTeam(team: string): Promise<Task[]> {
    const tasks = this.getTasks();
    return tasks.filter(task => task.team === team);
  }

  static async getTasksByUser(userId: string): Promise<Task[]> {
    const tasks = this.getTasks();
    return tasks.filter(task => task.assignedTo === userId);
  }

  static async updateTaskStatus(taskId: string, status: string): Promise<boolean> {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      tasks[taskIndex].status = status;
      tasks[taskIndex].updatedAt = new Date().toISOString();
      this.saveTasks(tasks);
      return true;
    }
    return false;
  }

  static async addTaskComment(taskId: string, comment: Omit<TaskComment, 'id' | 'createdAt'>): Promise<boolean> {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      const newComment: TaskComment = {
        ...comment,
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      
      tasks[taskIndex].comments.push(newComment);
      tasks[taskIndex].updatedAt = new Date().toISOString();
      this.saveTasks(tasks);
      return true;
    }
    return false;
  }
}

// Announcements
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  targetTeam?: string;
  createdBy: string;
  createdAt: string;
  priority: 'normal' | 'high';
}

export class AnnouncementDatabase {
  private static getAnnouncements(): Announcement[] {
    if (typeof window === 'undefined') return [];
    const announcements = localStorage.getItem('astra-announcements');
    return announcements ? JSON.parse(announcements) : [];
  }

  private static saveAnnouncements(announcements: Announcement[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('astra-announcements', JSON.stringify(announcements));
  }

  static async createAnnouncement(announcementData: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> {
    const announcements = this.getAnnouncements();
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    
    announcements.unshift(newAnnouncement); // Add to beginning for recent first
    this.saveAnnouncements(announcements);
    return newAnnouncement;
  }

  static async getAnnouncementsForUser(userTeam?: string): Promise<Announcement[]> {
    const announcements = this.getAnnouncements();
    return announcements.filter(announcement => 
      announcement.type === 'general' || 
      (announcement.type === 'team_specific' && announcement.targetTeam === userTeam)
    );
  }

  static async getAllAnnouncements(): Promise<Announcement[]> {
    return this.getAnnouncements();
  }
}