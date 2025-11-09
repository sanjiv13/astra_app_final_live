'use client';

import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { USER_ROLES } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User } from '@/lib/auth';

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== USER_ROLES.ADMIN)) {
      router.push('/auth/login');
      return;
    }

    if (user?.role === USER_ROLES.ADMIN) {
      loadPendingUsers();
    }
  }, [user, loading, router]);

  const loadPendingUsers = async () => {
    try {
      const response = await fetch('/api/users/pending');
      const data = await response.json();
      
      if (data.success) {
        setPendingUsers(data.users);
      }
    } catch (error) {
      console.error('Error loading pending users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'approve' | 'deny') => {
    setProcessing(userId);
    
    try {
      const response = await fetch('/api/users/pending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove user from pending list
        setPendingUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        console.error('Action failed:', data.message);
      }
    } catch (error) {
      console.error('Error processing user:', error);
    } finally {
      setProcessing(null);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (user.role !== USER_ROLES.ADMIN) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Alert variant="destructive">
          <AlertDescription>
            You don't have permission to access this page. Admin access required.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Admin Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ASTRA Admin Dashboard 🛡️
        </h1>
        <p className="mt-2 text-gray-600">
          Manage team members, approvals, and system administration
        </p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <span className="text-2xl">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Require approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-muted-foreground">
              Approved users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Heads</CardTitle>
            <span className="text-2xl">👑</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">14</div>
            <p className="text-xs text-muted-foreground">
              Leadership roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">156</div>
            <p className="text-xs text-muted-foreground">
              Across all teams
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending User Approvals */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pending User Approvals</CardTitle>
          <CardDescription>
            New team members waiting for approval to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingUsers ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading pending users...</p>
            </div>
          ) : pendingUsers.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-6xl">🎉</span>
              <p className="mt-4 text-lg font-medium">All caught up!</p>
              <p className="text-gray-500">No pending user approvals at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((pendingUser) => (
                <div key={pendingUser.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {pendingUser.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{pendingUser.name}</p>
                        <p className="text-sm text-gray-500">{pendingUser.email}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <Badge variant="outline">
                        {pendingUser.team ? `Team: ${pendingUser.team}` : 'No team assigned'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Registered: {new Date(pendingUser.joinedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleUserAction(pendingUser.id, 'approve')}
                      disabled={processing === pendingUser.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {processing === pendingUser.id ? '...' : 'Approve'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleUserAction(pendingUser.id, 'deny')}
                      disabled={processing === pendingUser.id}
                    >
                      {processing === pendingUser.id ? '...' : 'Deny'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Admin Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
            <CardDescription>Administrative tools and controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📊</span>
              View System Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">👥</span>
              Manage All Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">🔧</span>
              System Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📝</span>
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
            <CardDescription>Oversee team operations and assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">👑</span>
              Assign Team Heads
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📋</span>
              Monitor All Tasks
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📢</span>
              Send Announcements
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">📁</span>
              File Management
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}