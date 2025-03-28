import Link from 'next/link'
import { useState } from 'react'
import SignInModal from '../SignInModal'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-3 md:p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg md:text-xl font-bold">Your Logo</div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.email}</span>
              <button
                onClick={logout}
                className="hover:text-gray-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSignInModalOpen(true)}
              className="hover:text-gray-300 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col space-y-3 pt-4 pb-2 px-4 border-t border-gray-700 mt-3`}>
        <Link href="/" className="hover:text-gray-300 transition-colors py-2">Home</Link>
        <Link href="/dashboard" className="hover:text-gray-300 transition-colors py-2">Dashboard</Link>
        {isAuthenticated ? (
          <>
            <div className="text-gray-300 py-2">{user?.email}</div>
            <button
              onClick={logout}
              className="hover:text-gray-300 transition-colors text-left py-2"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsSignInModalOpen(true)}
            className="hover:text-gray-300 transition-colors text-left py-2"
          >
            Sign In
          </button>
        )}
      </div>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </nav>
  )
}

export default Navbar 