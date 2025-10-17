import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] px-4">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-blue-500">Entsie Chat</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Connect, collaborate, and communicate in real-time with your team
        </p>
        
        <div className="flex gap-4 justify-center mb-12">
          <Link 
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition duration-200 text-lg"
          >
            Get Started
          </Link>
          <Link 
            href="/login"
            className="bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 text-blue-500 font-semibold px-8 py-4 rounded-lg transition duration-200 text-lg"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-[#0f3460] p-6 rounded-lg">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Messaging</h3>
            <p className="text-gray-400">Send and receive messages instantly with Socket.io</p>
          </div>
          
          <div className="bg-[#0f3460] p-6 rounded-lg">
            <div className="text-4xl mb-4">📺</div>
            <h3 className="text-xl font-semibold text-white mb-2">Channels</h3>
            <p className="text-gray-400">Organize conversations with dedicated channels</p>
          </div>
          
          <div className="bg-[#0f3460] p-6 rounded-lg">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Direct Messages</h3>
            <p className="text-gray-400">Private one-on-one conversations with team members</p>
          </div>
        </div>
      </div>
    </div>
  );
}