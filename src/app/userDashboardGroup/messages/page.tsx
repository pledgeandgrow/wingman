'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSupabaseUser } from '@/app/hooks/getSession'
import { io, Socket } from 'socket.io-client'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import supabase from '@/utils/supabase'
import { useToast } from "@/hooks/use-toast";


interface User {
  id: string;
  name: string;
  role: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function ChatComponent() {
  const { user: currentUser, loading: userLoading } = useSupabaseUser()
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const notificationSound = useRef(new Audio('/sounds/notification.wav'));
  const {toast} = useToast();


  const setupSocket = useCallback(() => {
    if (!socket && currentUser) {
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to socket server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });
      const sound = notificationSound.current;

      newSocket.on('chat message', (msg: Message) => {
        setMessages(prevMessages => {
          if (!prevMessages.some(m => m.id === msg.id)) {
            // Play sound only if the message is from another user
            if (msg.receiver_id === currentUser.id && msg.sender_id !== currentUser.id) {
              notificationSound.current.play().catch(error => console.error('Error playing sound:', error));
              toast({
                title: "New Message",
                description: `New message `,
                variant: "default",
              })
            }
            return [...prevMessages, msg];
          }
          return prevMessages;
        });
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    setupSocket();
  }, [setupSocket]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;
      const { data, error } = await supabase
        .from('users')
        .select()
        .neq('id', currentUser?.id)
        .neq('role', '')
      
      if (error) {
        console.error('Error fetching users:', error)
      } else {
        setUsers(data || [])
      }
    }

    if (currentUser) {
      fetchUsers()
    }
  }, [currentUser])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const fetchChatHistory = useCallback(async (userId: string) => {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .or(`sender_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching chat history:', error)
    } else {
      setMessages(data || [])
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedUser) {
      fetchChatHistory(selectedUser.id);
    }
  }, [selectedUser, fetchChatHistory]);

  useEffect(() => {
    if (selectedUser && currentUser) {
      setFilteredMessages(messages.filter(msg => 
        (msg.sender_id === currentUser.id && msg.receiver_id === selectedUser.id) ||
        (msg.sender_id === selectedUser.id && msg.receiver_id === currentUser.id)
      ));
    } else {
      setFilteredMessages([]);
    }
  }, [selectedUser, currentUser, messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser && currentUser && socket && !isSending) {
      setIsSending(true);
      const message = {
        sender_id: currentUser.id,
        receiver_id: selectedUser.id,
        message: newMessage.trim(),
        created_at: new Date().toISOString(),
        is_read: false,
      };
  
      try {
  
        const { data: messageData, error: messageError } = await supabase
          .from('notifications')
          .insert([message])
          .select()
          .single();
  
        if (messageError) throw messageError;
  
        socket.emit('chat message', messageData);
  
        setNewMessage('');
      } catch (error) {
        console.error("Error saving message:", error);
        setError("Failed to send message. Please try again.");
      } finally {
        setIsSending(false);
      }
    }
  };

  if (userLoading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <div>Please log in to access the chat.</div>
  }

  return (
    <Card className="w-full max-w-5xl h-[600px] mx-auto flex">
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 bg-[#002366] text-white">
          <h2 className="text-xl font-bold">Contacts</h2>
        </div>
        <ScrollArea className="h-[calc(600px-4rem)] p-2 space-y-4">
          {users.map((user) => (
            <Button
              key={user.id}
              variant="ghost"
              className={`w-full justify-start px-4 py-2 ${selectedUser?.id === user.id ? 'bg-[#00AFF5] text-white' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center w-full">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-wrap gap-1 ">
                  <span className="font-medium">{user.name.slice(0,4)}</span>
                  {user.role && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800 border-red-300' : 
                        'bg-green-100 text-green-800 border-green-300'
                      }`}
                    >
                      {user.role}
                    </Badge>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </ScrollArea>
      </div>

      <div className="w-3/4 flex flex-col">
        <div className="p-4 bg-[#002366] text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {selectedUser ? `Chat with ${selectedUser.name}` : 'Select a contact'}
          </h2>
          {selectedUser && (
            <Badge 
              variant="outline" 
              className={`text-xs ${
                selectedUser.role === 'admin' ? 'bg-red-100 text-red-800 border-red-300' :
                selectedUser.role === 'moderator' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                'bg-green-100 text-green-800 border-green-300'
              }`}
            >
              {selectedUser.role}
            </Badge>
          )}
        </div>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-[calc(600px-8rem)]" ref={scrollRef}>
            <div className="p-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className={`flex mb-4 ${message.sender_id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[70%] ${message.sender_id === currentUser.id ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="w-8 h-8 mx-2">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender_id === currentUser.id ? currentUser.email : selectedUser?.name}`} />
                      <AvatarFallback>{message.sender_id === currentUser.id ? currentUser.email?.[0] : selectedUser?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-3 ${message.sender_id === currentUser.id ? 'bg-[#00AFF5]' : 'bg-[#D4AC2C]'} text-white`}>
                      <p>{message.message}</p>
                      <p className="text-xs text-right mt-1 opacity-70">
                        {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                setError(null);
              }}
              onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSendMessage()}
              className="flex-grow"
              disabled={!selectedUser || isSending}
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-[#002366] hover:bg-[#001A4D] text-white"
              disabled={!selectedUser || isSending}
            >
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

