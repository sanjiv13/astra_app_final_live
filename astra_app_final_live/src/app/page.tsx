'use client';

import { useAuth } from '@/lib/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://placehold.co/800x400?text=ASTRA+Solar+Electric+Vehicle+Team+Management+Dashboard" 
              alt="ASTRA Solar Electric Vehicle Team Management Dashboard showcasing modern interface design"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              ASTRA
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Solar Electric Vehicle Team Management System
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Collaborate, innovate, and build the future of sustainable transportation. 
            Join our team of engineers, designers, and innovators working on cutting-edge solar vehicle technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-3">
                Join the Team
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-3">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/admin-login">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-3">
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering Solar Vehicle Innovation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive team management platform streamlines collaboration across all aspects of solar vehicle development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-transparent hover:border-blue-200 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <CardTitle className="text-xl font-semibold">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Connect with 14 specialized sub-teams including Electricals, Solar, Design, Autonomous, and more. 
                  Seamless communication across all departments.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-orange-200 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <CardTitle className="text-xl font-semibold">Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Assign tasks, track progress, and monitor daily work updates. 
                  Team heads can efficiently manage their members and deliverables.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-green-200 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📸</span>
                </div>
                <CardTitle className="text-xl font-semibold">Progress Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Upload photos and videos of work progress, document faults, and maintain 
                  a comprehensive visual record of your team's achievements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-purple-200 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <CardTitle className="text-xl font-semibold">Admin Approval System</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Secure registration process with admin approval for new members. 
                  Ensures only authorized team members have access to sensitive project information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-teal-200 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📢</span>
                </div>
                <CardTitle className="text-xl font-semibold">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Stay informed with overall project announcements and team-specific updates. 
                  Never miss important project milestones or deadlines.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-red-200 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle className="text-xl font-semibold">Solar Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Specialized tools and workflows designed specifically for solar vehicle development, 
                  from power systems to aerodynamics and everything in between.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the ASTRA team and be part of the solar vehicle revolution. 
            Your expertise can help build sustainable transportation solutions.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}