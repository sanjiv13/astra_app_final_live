// Team definitions for ASTRA Solar Vehicle
export const TEAMS = {
  TRANSMISSION: 'transmission',
  ELECTRICALS: 'electricals',
  DESIGN: 'design',
  SUSPENSION: 'suspension',
  DASHBOARD: 'dashboard',
  INNOVATION: 'innovation',
  BUSINESS: 'business',
  AUTONOMOUS: 'autonomous',
  WHEEL_ASSEMBLY: 'wheel_assembly',
  BRAKES: 'brakes',
  SOLAR: 'solar',
  STEERING: 'steering',
  MEDIA: 'media',
  REPORT: 'report'
} as const;

export const TEAM_DETAILS = {
  [TEAMS.TRANSMISSION]: {
    name: 'Transmission Team',
    description: 'Powertrain and transmission system development',
    color: 'bg-blue-500',
    icon: '⚙️'
  },
  [TEAMS.ELECTRICALS]: {
    name: 'Electricals Team',
    description: 'Electrical systems and wiring',
    color: 'bg-yellow-500',
    icon: '⚡'
  },
  [TEAMS.DESIGN]: {
    name: 'Design Team',
    description: 'Vehicle design and aesthetics',
    color: 'bg-purple-500',
    icon: '🎨'
  },
  [TEAMS.SUSPENSION]: {
    name: 'Suspension Team',
    description: 'Suspension and chassis systems',
    color: 'bg-green-500',
    icon: '🔧'
  },
  [TEAMS.DASHBOARD]: {
    name: 'Dashboard Team',
    description: 'Driver interface and instrumentation',
    color: 'bg-indigo-500',
    icon: '📊'
  },
  [TEAMS.INNOVATION]: {
    name: 'Innovation Team',
    description: 'Research and development initiatives',
    color: 'bg-pink-500',
    icon: '💡'
  },
  [TEAMS.BUSINESS]: {
    name: 'Business Team',
    description: 'Strategy, partnerships and funding',
    color: 'bg-teal-500',
    icon: '💼'
  },
  [TEAMS.AUTONOMOUS]: {
    name: 'Autonomous Team',
    description: 'Self-driving and AI systems',
    color: 'bg-red-500',
    icon: '🤖'
  },
  [TEAMS.WHEEL_ASSEMBLY]: {
    name: 'Wheel Assembly Team',
    description: 'Wheel design and assembly',
    color: 'bg-orange-500',
    icon: '⭕'
  },
  [TEAMS.BRAKES]: {
    name: 'Brakes Team',
    description: 'Braking systems and safety',
    color: 'bg-rose-500',
    icon: '🛑'
  },
  [TEAMS.SOLAR]: {
    name: 'Solar Team',
    description: 'Solar panel integration and efficiency',
    color: 'bg-amber-500',
    icon: '☀️'
  },
  [TEAMS.STEERING]: {
    name: 'Steering Team',
    description: 'Steering mechanism and control',
    color: 'bg-cyan-500',
    icon: '🎯'
  },
  [TEAMS.MEDIA]: {
    name: 'Media Team',
    description: 'Documentation and public relations',
    color: 'bg-violet-500',
    icon: '📸'
  },
  [TEAMS.REPORT]: {
    name: 'Report Team',
    description: 'Technical documentation and reporting',
    color: 'bg-slate-500',
    icon: '📝'
  }
} as const;

export const USER_ROLES = {
  MEMBER: 'member',
  TEAM_HEAD: 'team_head',
  ADMIN: 'admin'
} as const;

export const USER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DENIED: 'denied'
} as const;

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  COMPLETED: 'completed'
} as const;

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
} as const;

export const FILE_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  DOCUMENT: 'document'
} as const;

export const ANNOUNCEMENT_TYPES = {
  GENERAL: 'general',
  TEAM_SPECIFIC: 'team_specific',
  URGENT: 'urgent'
} as const;

// Default admin credentials
export const DEFAULT_ADMIN = {
  email: 'admin@astra.com',
  password: 'admin123',
  role: USER_ROLES.ADMIN
};