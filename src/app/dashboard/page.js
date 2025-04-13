"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">NoviceAuth</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut({ callbackUrl: "/auth" })}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to your Dashboard</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile Information</h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">{session.user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {session.user.name || "Not provided"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Authentication Method</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {session.user.isGoogleAuth ? "Google" : "Email & Password"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Status</p>
                  <p className="mt-1 text-sm text-gray-900">Active</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">What's Next?</h3>
              <p className="text-gray-600">
                This is a simple dashboard to demonstrate the authentication flow. You can extend this
                application by adding more features like profile management, user settings, or any other
                functionality you need.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 