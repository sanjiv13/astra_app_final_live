'use client';

import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEAMS, TEAM_DETAILS, USER_STATUS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TeamStats {
  memberCount: number;
  activeTasks: number;
  completedTasks: number;
  teamHead: string;
}

export default function TeamsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [teamStats, setTeamStats] = useState<Record<string, TeamStats>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user?.status !== USER_STATUS.APPROVED) {
      router.push('/auth/login');
      return;
    }

    loadTeamStats();
  }, [user, loading, router]);

  const loadTeamStats = async () => {
    // Simulate loading team statistics
    // In real implementation, this would fetch from APIs
    const mockStats: Record<string, TeamStats> = {};
    
    Object.values(TEAMS).forEach((teamKey: string) => {
      mockStats[teamKey] = {
        memberCount: Math.floor(Math.random() * 8) + 2,
        activeTasks: Math.floor(Math.random() * 15) + 3,
        completedTasks: Math.floor(Math.random() * 20) + 5,
        teamHead: 'John Doe'
      };
    });
    
    setTeamStats(mockStats);
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
        <h1 className="text-3xl font-bold text-gray-900">ASTRA Teams</h1>
        <p className="mt-2 text-gray-600">
          Explore our specialized teams working on different aspects of the solar vehicle project
        </p>
      </div>

      {/* User's Team Highlight */}
      {user.team && (
        <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{user.team && user.team in TEAM_DETAILS ? TEAM_DETAILS[user.team as keyof typeof TEAM_DETAILS]?.icon : ''}</span>
                <div>
                  <CardTitle className="text-blue-800">Your Team</CardTitle>
                  <CardDescription className="text-blue-600">
                    {user.team && user.team in TEAM_DETAILS ? TEAM_DETAILS[user.team as keyof typeof TEAM_DETAILS]?.name : ''}
                  </CardDescription>
                </div>
              </div>
              <Link href={`/teams/${user.team}`}>
                <Button>View Team Details</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">{user.team && user.team in TEAM_DETAILS ? TEAM_DETAILS[user.team as keyof typeof TEAM_DETAILS]?.description : ''}</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">
                  {teamStats[user.team]?.memberCount || 0}
                </div>
                <div className="text-sm text-blue-600">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">
                  {teamStats[user.team]?.activeTasks || 0}
                </div>
                <div className="text-sm text-blue-600">Active Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">
                  {teamStats[user.team]?.completedTasks || 0}
                </div>
                <div className="text-sm text-blue-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(TEAMS).map((teamKey) => {
          const team = TEAM_DETAILS[teamKey];
          const stats = teamStats[teamKey];
          const isUserTeam = user.team === teamKey;

          return (
            <Card 
              key={teamKey} 
              className={`transition-all duration-300 hover:shadow-lg ${
                isUserTeam ? 'ring-2 ring-blue-300' : 'hover:border-gray-300'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${team.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-xl">{team.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      {isUserTeam && (
                        <Badge className="mt-1 bg-blue-100 text-blue-800">Your Team</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 mb-4">
                  {team.description}
                </CardDescription>

                {stats && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{stats.memberCount}</div>
                      <div className="text-xs text-gray-500">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">{stats.activeTasks}</div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{stats.completedTasks}</div>
                      <div className="text-xs text-gray-500">Done</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Head: {stats?.teamHead || 'TBD'}
                  </div>
                  <Link href={`/teams/${teamKey}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Team Collaboration Section */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Cross-Team Collaboration</CardTitle>
          <CardDescription>
            Working together across teams to achieve our solar vehicle goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Shared Projects</h3>
              <p className="text-sm text-gray-600">
                Collaborate on multi-team initiatives and cross-functional projects
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold mb-2">Team Communication</h3>
              <p className="text-sm text-gray-600">
                Stay connected with regular inter-team updates and discussions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Unified Goals</h3>
              <p className="text-sm text-gray-600">
                All teams working towards the common goal of solar vehicle excellence
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Overview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Overall Team Performance</CardTitle>
          <CardDescription>Progress across all ASTRA teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {Object.values(teamStats).reduce((acc, stat) => acc + stat.memberCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {Object.values(teamStats).reduce((acc, stat) => acc + stat.activeTasks, 0)}
              </div>
              <div className="text-sm text-gray-600">Active Tasks</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {Object.values(teamStats).reduce((acc, stat) => acc + stat.completedTasks, 0)}
              </div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">14</div>
              <div className="text-sm text-gray-600">Specialized Teams</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}