// app/chat/page.tsx
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ChatPage = () => {
    const { data: session } = useSession();
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [newChannelName, setNewChannelName] = useState('');

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await fetch('/api/channels');
            const data = await response.json();
            setChannels(data);
        };

        fetchChannels();
    }, []);

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel);
        // Fetch messages for the selected channel here if needed
    };

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            // Send message logic here (e.g., API call)
            setNewMessage('');
        }
    };

    const handleCreateChannel = async () => {
        if (newChannelName.trim()) {
            // Create channel logic here (e.g., API call)
            setNewChannelName('');
        }
    };

    const handleSignOut = () => {
        // Sign out logic here (e.g., using next-auth)
    };

    return (
        <div className="flex h-screen bg-[#1a1a2e] text-white">
            <aside className="w-1/4 p-4 border-r border-gray-700">
                <h2 className="text-xl mb-4">Channels</h2>
                <ul>
                    {channels.map((channel) => (
                        <li
                            key={channel.id}
                            className={`cursor-pointer p-2 hover:bg-[#0f3460] ${selectedChannel === channel ? 'bg-[#0f3460]' : ''}`}
                            onClick={() => handleChannelSelect(channel)}
                        >
                            {channel.name}
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <input
                        type="text"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                        placeholder="New channel name"
                        className="border border-gray-700 p-2 w-full"
                    />
                    <button onClick={handleCreateChannel} className="mt-2 w-full bg-blue-600 p-2">Create Channel</button>
                </div>
                <button onClick={handleSignOut} className="mt-4 w-full bg-red-600 p-2">Sign Out</button>
            </aside>
            <main className="flex-1 p-4">
                <h1 className="text-2xl mb-4">Chat</h1>
                <div className="bg-[#0f3460] h-[calc(100vh-150px)] p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">{msg}</div>
                    ))}
                </div>
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message"
                        className="border border-gray-700 p-2 flex-1"
                    />
                    <button onClick={handleSendMessage} className="ml-2 bg-blue-600 p-2">Send</button>
                </div>
            </main>
        </div>
    );
};

export default ChatPage;