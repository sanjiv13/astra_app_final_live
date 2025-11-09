'use client';

import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TEAM_DETAILS, USER_STATUS } from '@/lib/constants';
import Link from 'next/link';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  teamMembers: number;
  recentAnnouncements: number;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    teamMembers: 0,
    recentAnnouncements: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user?.status !== USER_STATUS.APPROVED) {
      router.push('/auth/login');
      return;
    }

    // Load dashboard stats
    loadDashboardData();
  }, [user, loading, router]);

  const loadDashboardData = async () => {
    // Simulate loading dashboard stats
    // In real implementation, this would fetch from APIs
    setStats({
      totalTasks: 12,
      completedTasks: 8,
      pendingTasks: 4,
      teamMembers: 6,
      recentAnnouncements: 3
    });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const userTeam = user.team && user.team in TEAM_DETAILS ? TEAM_DETAILS[user.team as keyof typeof TEAM_DETAILS] : null;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Ready to contribute to the future of solar vehicle technology?
        </p>
        
        {userTeam && (
          <div className="mt-4 flex items-center space-x-3">
            <Badge className={`${userTeam.color} text-white px-3 py-1`}>
              <span className="mr-2">{userTeam.icon}</span>
              {userTeam.name}
            </Badge>
            <span className="text-sm text-gray-500">{userTeam.description}</span>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              Assigned to you
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              Tasks finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              Tasks remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground">
              In your team
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Recent Tasks</CardTitle>
            <CardDescription>Latest assignments and progress updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock task items */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Solar Panel Efficiency Testing</p>
                    <p className="text-sm text-gray-500">Due tomorrow</p>
                  </div>
                </div>
                <Badge variant="secondary">In Progress</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Wiring Diagram Review</p>
                    <p className="text-sm text-gray-500">Completed yesterday</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">Completed</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Team Meeting Preparation</p>
                    <p className="text-sm text-gray-500">Due next week</p>
                  </div>
                </div>
                <Badge variant="outline">Todo</Badge>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/tasks">
                <Button variant="outline">View All Tasks</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Announcements & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Announcements</CardTitle>
              <CardDescription>{stats.recentAnnouncements} new updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-medium">Race Preparation Update</p>
                  <p className="text-xs text-gray-600 mt-1">All teams prepare for final testing phase</p>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <p className="text-sm font-medium">Safety Protocol Review</p>
                  <p className="text-xs text-gray-600 mt-1">Mandatory safety briefing this Friday</p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link href="/announcements">
                  <Button variant="ghost" size="sm">View All Announcements</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/tasks" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📝</span>
                  Update Task Progress
                </Button>
              </Link>
              
              <Link href="/teams" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">👥</span>
                  View Team Members
                </Button>
              </Link>
              
              <Link href="/upload" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📸</span>
                  Upload Progress Photos
                </Button>
              </Link>
              
              <Link href="/announcements" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📢</span>
                  Check Announcements
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Progress Section */}
      {userTeam && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Team Progress Overview</CardTitle>
            <CardDescription>Current status of {userTeam.name} projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="font-semibold">Active Projects</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⏱️</span>
                </div>
                <p className="font-semibold">Pending Reviews</p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="font-semibold">Milestones</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}