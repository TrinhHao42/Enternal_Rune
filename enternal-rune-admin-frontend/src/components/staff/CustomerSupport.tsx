"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { 
  SearchIcon, 
  PhoneIcon, 
  VideoCallIcon, 
  HorizontaLDots,
  EmojiIcon,
  PaperClipIcon,
  MicrophoneIcon,
  PaperPlaneIcon
} from '@/icons';

// Mock data cho danh sách chat
const chatList = [
  {
    id: 1,
    name: "Lindsey Curtis",
    role: "Project Manager",
    lastMessage: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    time: "15 mins",
    avatar: "/images/user/user-01.jpg",
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "Designer",
    lastMessage: "Can you review the latest design mockups?",
    time: "30 mins",
    avatar: "/images/user/user-02.jpg",
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Content Writer",
    lastMessage: "The blog post is ready for review",
    time: "45 mins",
    avatar: "/images/user/user-03.jpg",
    isOnline: false,
    unreadCount: 1
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Front-end Developer",
    lastMessage: "I've completed the responsive design",
    time: "2 days",
    avatar: "/images/user/user-04.jpg",
    isOnline: true,
    unreadCount: 0
  },
  {
    id: 5,
    name: "David Brown",
    role: "Digital Marketer",
    lastMessage: "The campaign results look promising",
    time: "1 hour",
    avatar: "/images/user/user-05.jpg",
    isOnline: false,
    unreadCount: 3
  } ,
  {
    id: 6,
    name: "David Brown",
    role: "Digital Marketer",
    lastMessage: "The campaign results look promising",
    time: "1 hour",
    avatar: "/images/user/user-05.jpg",
    isOnline: false,
    unreadCount: 3
  },
  {
    id: 7,
    name: "David Brown",
    role: "Digital Marketer",
    lastMessage: "The campaign results look promising",
    time: "1 hour",
    avatar: "/images/user/user-05.jpg",
    isOnline: false,
    unreadCount: 3
  },
];

// Mock data cho tin nhắn
const messages = [
  {
    id: 1,
    sender: "Lindsey Curtis",
    content: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    time: "2 hours ago",
    isOwn: false,
    avatar: "/images/user/user-01.jpg"
  },
  {
    id: 2,
    sender: "You",
    content: "If don't like something, I'll stay away from it.",
    time: "2 hours ago",
    isOwn: true
  },
  {
    id: 3,
    sender: "Lindsey Curtis",
    content: "I want more detailed information.",
    time: "2 hours ago",
    isOwn: false,
    avatar: "/images/user/user-01.jpg"
  },
  {
    id: 4,
    sender: "You",
    content: "If don't like something, I'll stay away from it.",
    time: "2 hours ago",
    isOwn: true
  },
  {
    id: 5,
    sender: "You",
    content: "They got there early and got really good seats",
    time: "2 hours ago",
    isOwn: true
  },
  {
    id: 6,
    sender: "You",
    content: "They got there early and got really good seats",
    time: "2 hours ago",
    isOwn: true
  },
  {
    id: 7,
    sender: "You",
    content: "They got there early and got really good seats",
    time: "2 hours ago",
    isOwn: true
  },
  
  {
    id: 8,
    sender: "You",
    content: "They got there early and got really good seats",
    time: "2 hours ago",
    isOwn: true
  } ,
  {
    id: 9,
    sender: "You",
    content: "They got there early and got really good seats",
    time: "2 hours ago",
    isOwn: true
  },
  {
    id: 10,
    sender: "You",
    content: "They got there early and got really good seats",
    time: "2 hours ago",
    isOwn: true
  }
];

export default function CustomerSupport() {
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tắt scroll body toàn trang
    const body = document.body;
    body.classList.add('overflow-hidden');
    
    // Cleanup khi unmount
    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, []);

  // Auto scroll xuống cuối tin nhắn
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredChats = chatList.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="flex gap-4 h-full p-4 w-full">
      {/* Sidebar - Danh sách chat */}
      <div className="w-80 border border-gray-200 rounded-lg flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
              <div className="w-5 h-5 text-gray-500">
                <HorizontaLDots />
              </div>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 flex-shrink-0">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedChat.id === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.role}</p>
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Main Chat Area */}
       <div className="flex-1 border border-gray-200 rounded-lg flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {selectedChat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedChat.name}
                </h3>
                <p className="text-sm text-gray-500">{selectedChat.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-5 h-5 text-gray-500">
                  <PhoneIcon />
                </div>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-5 h-5 text-gray-500">
                  <VideoCallIcon />
                </div>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-5 h-5 text-gray-500">
                  <HorizontaLDots />
                </div>
              </button>
            </div>
          </div>
        </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!message.isOwn && message.avatar && (
                  <Image
                    src={message.avatar}
                    alt={message.sender}
                    width={40}  
                    height={40}  
                    className="rounded-full flex-shrink-0"  
                  />
                )}
                <div className="min-w-0 flex-1">  
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm break-words">{message.content}</p>  
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                    {message.isOwn ? message.time : `${message.sender}, ${message.time}`}
                  </div>
                </div>
               </div>
             </div>
           ))}
           {/* Invisible div để auto scroll */}
           <div ref={messagesEndRef} />
         </div>

         {/* Message Input */}
         <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-5 h-5 text-gray-500">
                <EmojiIcon />
              </div>
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-5 h-5 text-gray-500">
                <PaperClipIcon />
              </div>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-5 h-5 text-gray-500">
                <MicrophoneIcon />
              </div>
            </button>
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              <div className="w-5 h-5">
                <PaperPlaneIcon />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}