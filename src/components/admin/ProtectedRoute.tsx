import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Optional: Check if user is admin (you can add a list of admin emails)
  // const adminEmails = ['fuadadebara1947@gmail.com'];
  // if (!adminEmails.includes(user.email || '')) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}
