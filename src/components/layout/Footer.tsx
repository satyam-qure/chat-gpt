const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 md:py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="mt-2 md:mt-3 flex justify-center space-x-4 text-sm md:text-base">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 