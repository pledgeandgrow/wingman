'use client'

import { useEffect, useState, useCallback } from "react"
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSupabaseUser } from '@/app/hooks/getSession'
import supabase from '@/utils/supabase'
import { io, Socket } from 'socket.io-client'

interface Notification {
  id: number
  message: string
  created_at: string
  is_read: boolean
  sender: {
    name: string
  }
}

export function NotificationDropdown() {
  const { user: currentUser } = useSupabaseUser()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [hasNewNotifications, setHasNewNotifications] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  const fetchNotifications = useCallback(async () => {
    if (!currentUser) return

    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        sender:sender_id(name)
      `)
      .eq('receiver_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching notifications:', error)
    } else {
      setNotifications(data || [])
      setHasNewNotifications(data?.some(notification => !notification.is_read) || false)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      fetchNotifications()

      const newSocket = io('http://localhost:3000')
      setSocket(newSocket)

      newSocket.on('connect', () => {
        console.log('Connected to socket server')
      })

      newSocket.on('new_notification', async (newNotification) => {
        console.log('New notification received:', newNotification)
        if (newNotification.receiver_id === currentUser.id) {
          const { data, error } = await supabase
            .from('notifications')
            .select(`
              *,
              sender:sender_id(name)
            `)
            .eq('id', newNotification.id)
            .single()

          if (error) {
            console.error('Error fetching new notification details:', error)
          } else if (data) {
            setNotifications(prevNotifications => [data, ...prevNotifications.slice(0, 9)])
            setHasNewNotifications(true)
          }
        }
      })

      return () => {
        newSocket.disconnect()
      }
    }
  }, [currentUser, fetchNotifications])

  const markAsRead = async (notificationId: number) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)

    if (error) {
      console.error('Error marking notification as read:', error)
    } else {
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ))
      setHasNewNotifications(notifications.some(n => n.id !== notificationId && !n.is_read))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {hasNewNotifications && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} onSelect={() => markAsRead(notification.id)}>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.sender.name}</span>: {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">{new Date(notification.created_at).toLocaleString()}</p>
                {!notification.is_read && (
                  <span className="text-xs text-blue-500">New</span>
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

