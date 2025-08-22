import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setProfile(data);
        setFormData({
          display_name: data.display_name || '',
          avatar_url: data.avatar_url || '',
        });
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          user_id: user?.id,
          display_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
          avatar_url: user?.user_metadata?.avatar_url || '',
        };
        
        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
        } else {
          setProfile(createdProfile);
          setFormData({
            display_name: createdProfile.display_name || '',
            avatar_url: createdProfile.avatar_url || '',
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          avatar_url: formData.avatar_url,
        })
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setProfile(data);
      setEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      display_name: profile?.display_name || '',
      avatar_url: profile?.avatar_url || '',
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and profile information</p>
          </div>
          {!editing && (
            <Button onClick={() => setEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your personal information and display preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage 
                    src={editing ? formData.avatar_url : profile?.avatar_url} 
                    alt={editing ? formData.display_name : profile?.display_name} 
                  />
                  <AvatarFallback className="text-lg">
                    {(editing ? formData.display_name : profile?.display_name)?.charAt(0)?.toUpperCase() || 
                     user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                {editing && (
                  <div className="flex-1">
                    <Label htmlFor="avatar_url">Avatar URL</Label>
                    <Input
                      id="avatar_url"
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={formData.avatar_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                {editing ? (
                  <Input
                    id="display_name"
                    placeholder="Enter your display name"
                    value={formData.display_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{profile?.display_name || 'Not set'}</span>
                  </div>
                )}
              </div>

              {/* Edit Actions */}
              {editing && (
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your account details and authentication information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Account Created</Label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {user?.created_at 
                      ? new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Unknown'
                    }
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>User ID</Label>
                <div className="font-mono text-sm text-muted-foreground bg-muted p-2 rounded">
                  {user?.id}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;