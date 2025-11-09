'use client';

import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { USER_STATUS, ANNOUNCEMENT_TYPES } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  targetTeam?: string;
  createdBy: string;
  createdAt: string;
  priority: 'normal' | 'high';
}

export default function AnnouncementsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user?.status !== USER_STATUS.APPROVED) {
      router.push('/auth/login');
      return;
    }

    loadAnnouncements();
  }, [user, loading, router]);

  const loadAnnouncements = async () => {
    // Mock announcements data
    const mockAnnouncements: Announcement[] = [
      {
        id: 'ann-1',
        title: 'Race Preparation Update - Final Testing Phase',
        content: 'All teams, we are entering the final testing phase for the solar vehicle race. Please ensure all systems are thoroughly tested and documented. Safety protocols must be strictly followed during all testing activities. Submit your team\'s final reports by January 25th.',
        type: ANNOUNCEMENT_TYPES.GENERAL,
        createdBy: 'ASTRA Admin',
        createdAt: '2024-01-15T10:00:00Z',
        priority: 'high'
      },
      {
        id: 'ann-2',
        title: 'Safety Protocol Review - Mandatory Attendance',
        content: 'There will be a mandatory safety briefing this Friday at 2 PM in the main auditorium. All team members must attend. We will cover updated safety procedures, emergency protocols, and equipment usage guidelines.',
        type: ANNOUNCEMENT_TYPES.GENERAL,
        createdBy: 'Safety Committee',
        createdAt: '2024-01-14T14:30:00Z',
        priority: 'high'
      },
      {
        id: 'ann-3',
        title: 'Solar Panel Efficiency Testing Results',
        content: 'Great news! The latest solar panel configuration has achieved 23% efficiency in optimal conditions. This is a significant improvement from our previous tests. Detailed results are available in the shared documentation.',
        type: ANNOUNCEMENT_TYPES.TEAM_SPECIFIC,
        targetTeam: 'solar',
        createdBy: 'Sarah Johnson',
        createdAt: '2024-01-13T16:45:00Z',
        priority: 'normal'
      },
      {
        id: 'ann-4',
        title: 'Weekly Team Lead Meeting Reminder',
        content: 'Team leads, don\'t forget about our weekly coordination meeting tomorrow at 3 PM. We\'ll discuss project timelines, resource allocation, and inter-team dependencies. Please come prepared with your team\'s progress reports.',
        type: ANNOUNCEMENT_TYPES.GENERAL,
        createdBy: 'Project Manager',
        createdAt: '2024-01-12T09:15:00Z',
        priority: 'normal'
      },
      {
        id: 'ann-5',
        title: 'Electrical System Testing Schedule',
        content: 'Electrical team members: We have reserved the testing lab for this week. Please coordinate with Mike Chen to schedule your testing sessions. Priority will be given to critical systems testing.',
        type: ANNOUNCEMENT_TYPES.TEAM_SPECIFIC,
        targetTeam: 'electricals',
        createdBy: 'Mike Chen',
        createdAt: '2024-01-11T11:20:00Z',
        priority: 'normal'
      },
      {
        id: 'ann-6',
        title: 'Budget Update and Resource Allocation',
        content: 'Teams, please review your budget usage and submit any additional resource requests by end of this week. The business team is working on securing additional funding for the final development phase.',
        type: ANNOUNCEMENT_TYPES.GENERAL,
        createdBy: 'Business Team',
        createdAt: '2024-01-10T13:00:00Z',
        priority: 'normal'
      }
    ];
    
    // Filter announcements based on user's team
    const filteredAnnouncements = mockAnnouncements.filter(ann => 
      ann.type === ANNOUNCEMENT_TYPES.GENERAL || 
      (ann.type === ANNOUNCEMENT_TYPES.TEAM_SPECIFIC && ann.targetTeam === user?.team)
    );
    
    setAnnouncements(filteredAnnouncements);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Less than an hour ago';
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const getAnnouncementTypeColor = (type: string) => {
    switch (type) {
      case ANNOUNCEMENT_TYPES.URGENT:
        return 'bg-red-100 text-red-800';
      case ANNOUNCEMENT_TYPES.TEAM_SPECIFIC:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        <p className="mt-2 text-gray-600">
          Stay updated with the latest news and updates from the ASTRA team
        </p>
      </div>

      {/* Announcement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
            <span className="text-2xl">📢</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
            <p className="text-xs text-muted-foreground">Available for you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <span className="text-2xl">🚨</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {announcements.filter(a => a.priority === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent updates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Specific</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {announcements.filter(a => a.type === ANNOUNCEMENT_TYPES.TEAM_SPECIFIC).length}
            </div>
            <p className="text-xs text-muted-foreground">For your team</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <span className="text-6xl">📭</span>
              <p className="mt-4 text-lg font-medium">No announcements yet</p>
              <p className="text-gray-500">Check back later for updates and news</p>
            </CardContent>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`hover:shadow-md transition-shadow ${
                announcement.priority === 'high' ? 'border-l-4 border-l-red-500' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      {announcement.priority === 'high' && (
                        <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                      )}
                      <Badge className={getAnnouncementTypeColor(announcement.type)}>
                        {announcement.type === ANNOUNCEMENT_TYPES.TEAM_SPECIFIC 
                          ? `Team: ${announcement.targetTeam}` 
                          : 'General'}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center space-x-3">
                      <span>By {announcement.createdBy}</span>
                      <span>•</span>
                      <span>{formatDate(announcement.createdAt)}</span>
                    </CardDescription>
                  </div>
                  
                  {announcement.priority === 'high' && (
                    <span className="text-2xl">🚨</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {announcement.content}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {announcement.type === ANNOUNCEMENT_TYPES.TEAM_SPECIFIC ? (
                        <span className="font-medium text-blue-600">
                          📋 Team-specific announcement
                        </span>
                      ) : (
                        <span>📢 General announcement</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Mark as Read
                      </Button>
                      {announcement.type === ANNOUNCEMENT_TYPES.TEAM_SPECIFIC && (
                        <Button size="sm" variant="outline">
                          Reply to Team
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your announcement preferences and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">🔔</span>
            Notification Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">📨</span>
            Email Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">📜</span>
            View Archived Announcements
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">📤</span>
            Request Team Announcement
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}