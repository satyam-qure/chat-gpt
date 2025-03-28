import Link from 'next/link'
import { useState } from 'react'
import SignInModal from '../SignInModal'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Your Logo</div>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.email}</span>
              <button
                onClick={logout}
                className="hover:text-gray-300 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSignInModalOpen(true)}
              className="hover:text-gray-300 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </nav>
  )
}

export default Navbar 