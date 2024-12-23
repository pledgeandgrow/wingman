'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id: number;
  name: string;
}

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
];

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: messages.length + 1,
        senderId: 0, 
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-5xl h-[600px] flex">
        {/* User list */}
        <div className="w-1/4 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4 bg-[#002366] text-white">
            <h2 className="text-xl font-bold">Contacts</h2>
          </div>
          <ScrollArea className="h-[calc(600px-4rem)] p-2">
            {users.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                className={`w-full justify-start px-4 py-2 ${selectedUser?.id === user.id ? 'bg-[#00AFF5] text-white' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                {user.name}
              </Button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat area */}
        <div className="w-3/4 flex flex-col">
          <div className="p-4 bg-[#002366] text-white">
            <h2 className="text-xl font-bold">
              {selectedUser ? `Chat with ${selectedUser.name}` : 'Select a contact'}
            </h2>
          </div>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-[calc(600px-8rem)]">
              <div className="p-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex mb-4 ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start max-w-[70%] ${message.senderId === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Avatar className="w-8 h-8 mx-2">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderId === 0 ? 'kk' : selectedUser?.name}`} />
                        <AvatarFallback>{message.senderId === 0 ? 'Y' : selectedUser?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-3 ${message.senderId === 0 ? 'bg-[#00AFF5]' : 'bg-[#D4AC2C]'} text-white`}>
                        <p>{message.content}</p>
                        <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 bg-gray-50 dark:bg-gray-800">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow"
                disabled={!selectedUser}
              />
              <Button 
                onClick={handleSendMessage} 
                className="bg-[#002366] hover:bg-[#001A4D] text-white"
                disabled={!selectedUser}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

