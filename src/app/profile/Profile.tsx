'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MapPin, Briefcase, Mail, Phone } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    occupation: 'Software Engineer',
    bio: 'Passionate about creating amazing user experiences and solving complex problems through code.',
    avatarUrl: 'https://i.pravatar.cc/150?img=5'
  })

  return (
    <div className="min-h-screen bg-wing-blue text-white">
      <div className="container mx-auto py-8">
        <Card className="bg-wing-blue border-wing-orange">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24 border-4 border-wing-orange">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                <CardDescription className="text-wing-cyan">{user.occupation}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-wing-blue border border-wing-orange rounded-lg">
                <TabsTrigger value="about" className="text-white data-[state=active]:bg-wing-orange">About</TabsTrigger>
                <TabsTrigger value="posts" className="text-white data-[state=active]:bg-wing-orange">Posts</TabsTrigger>
                <TabsTrigger value="settings" className="text-white data-[state=active]:bg-wing-orange">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <Card className="bg-wing-blue border-wing-orange mt-4">
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{user.bio}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="text-wing-orange" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="text-wing-orange" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="text-wing-orange" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="text-wing-orange" />
                        <span>Joined January 2023</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="posts">
                <Card className="bg-wing-blue border-wing-orange mt-4">
                  <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-wing-cyan">No posts yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card className="bg-wing-blue border-wing-orange mt-4">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={user.name} className="bg-wing-blue border-wing-orange text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user.email} className="bg-wing-blue border-wing-orange text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" value={user.bio} className="bg-wing-blue border-wing-orange text-white" />
                      </div>
                      <Button className="bg-wing-orange hover:bg-wing-cyan text-wing-blue">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

