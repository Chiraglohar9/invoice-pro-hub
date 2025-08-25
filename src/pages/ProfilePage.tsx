import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Mail, Calendar, Edit3, Save, X, Phone, MapPin, Building, Globe, Linkedin, Briefcase, CalendarIcon, Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Import avatar images
import avatar1 from '@/assets/avatars/avatar-1.jpg';
import avatar2 from '@/assets/avatars/avatar-2.jpg';
import avatar3 from '@/assets/avatars/avatar-3.jpg';
import avatar4 from '@/assets/avatars/avatar-4.jpg';
import avatar5 from '@/assets/avatars/avatar-5.jpg';
import avatar6 from '@/assets/avatars/avatar-6.jpg';
import avatar7 from '@/assets/avatars/avatar-7.jpg';
import avatar8 from '@/assets/avatars/avatar-8.jpg';
import avatar9 from '@/assets/avatars/avatar-9.jpg';
import avatar10 from '@/assets/avatars/avatar-10.jpg';

const AVATAR_OPTIONS = [
  avatar1, avatar2, avatar3, avatar4, avatar5,
  avatar6, avatar7, avatar8, avatar9, avatar10
];

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    avatar_url: '',
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    company_name: '',
    job_title: '',
    department: '',
    business_phone: '',
    business_email: '',
    business_address_line1: '',
    business_address_line2: '',
    business_city: '',
    business_state: '',
    business_postal_code: '',
    business_country: '',
    website: '',
    linkedin_url: '',
    bio: '',
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
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          date_of_birth: data.date_of_birth || '',
          gender: data.gender || '',
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          city: data.city || '',
          state: data.state || '',
          postal_code: data.postal_code || '',
          country: data.country || '',
          company_name: data.company_name || '',
          job_title: data.job_title || '',
          department: data.department || '',
          business_phone: data.business_phone || '',
          business_email: data.business_email || '',
          business_address_line1: data.business_address_line1 || '',
          business_address_line2: data.business_address_line2 || '',
          business_city: data.business_city || '',
          business_state: data.business_state || '',
          business_postal_code: data.business_postal_code || '',
          business_country: data.business_country || '',
          website: data.website || '',
          linkedin_url: data.linkedin_url || '',
          bio: data.bio || '',
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
            first_name: createdProfile.first_name || '',
            last_name: createdProfile.last_name || '',
            phone: createdProfile.phone || '',
            date_of_birth: createdProfile.date_of_birth || '',
            gender: createdProfile.gender || '',
            address_line1: createdProfile.address_line1 || '',
            address_line2: createdProfile.address_line2 || '',
            city: createdProfile.city || '',
            state: createdProfile.state || '',
            postal_code: createdProfile.postal_code || '',
            country: createdProfile.country || '',
            company_name: createdProfile.company_name || '',
            job_title: createdProfile.job_title || '',
            department: createdProfile.department || '',
            business_phone: createdProfile.business_phone || '',
            business_email: createdProfile.business_email || '',
            business_address_line1: createdProfile.business_address_line1 || '',
            business_address_line2: createdProfile.business_address_line2 || '',
            business_city: createdProfile.business_city || '',
            business_state: createdProfile.business_state || '',
            business_postal_code: createdProfile.business_postal_code || '',
            business_country: createdProfile.business_country || '',
            website: createdProfile.website || '',
            linkedin_url: createdProfile.linkedin_url || '',
            bio: createdProfile.bio || '',
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
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          date_of_birth: formData.date_of_birth || null,
          gender: formData.gender,
          address_line1: formData.address_line1,
          address_line2: formData.address_line2,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postal_code,
          country: formData.country,
          company_name: formData.company_name,
          job_title: formData.job_title,
          department: formData.department,
          business_phone: formData.business_phone,
          business_email: formData.business_email,
          business_address_line1: formData.business_address_line1,
          business_address_line2: formData.business_address_line2,
          business_city: formData.business_city,
          business_state: formData.business_state,
          business_postal_code: formData.business_postal_code,
          business_country: formData.business_country,
          website: formData.website,
          linkedin_url: formData.linkedin_url,
          bio: formData.bio,
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
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      phone: profile?.phone || '',
      date_of_birth: profile?.date_of_birth || '',
      gender: profile?.gender || '',
      address_line1: profile?.address_line1 || '',
      address_line2: profile?.address_line2 || '',
      city: profile?.city || '',
      state: profile?.state || '',
      postal_code: profile?.postal_code || '',
      country: profile?.country || '',
      company_name: profile?.company_name || '',
      job_title: profile?.job_title || '',
      department: profile?.department || '',
      business_phone: profile?.business_phone || '',
      business_email: profile?.business_email || '',
      business_address_line1: profile?.business_address_line1 || '',
      business_address_line2: profile?.business_address_line2 || '',
      business_city: profile?.business_city || '',
      business_state: profile?.business_state || '',
      business_postal_code: profile?.business_postal_code || '',
      business_country: profile?.business_country || '',
      website: profile?.website || '',
      linkedin_url: profile?.linkedin_url || '',
      bio: profile?.bio || '',
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="w-full">
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="w-full">
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
          {/* Basic Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Your profile picture and display preferences
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
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label htmlFor="avatar_url">Avatar URL</Label>
                      <Input
                        id="avatar_url"
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        value={formData.avatar_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">or</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Camera className="mr-2 h-4 w-4" />
                            Choose Avatar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Choose an Avatar</DialogTitle>
                            <DialogDescription>
                              Select one of our pre-designed avatars for your profile
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-5 gap-4 p-4">
                            {AVATAR_OPTIONS.map((avatar, index) => (
                              <button
                                key={index}
                                onClick={() => setFormData(prev => ({ ...prev, avatar_url: avatar }))}
                                className={cn(
                                  "relative rounded-full overflow-hidden border-2 transition-all hover:scale-105",
                                  formData.avatar_url === avatar 
                                    ? "border-primary ring-2 ring-primary/20" 
                                    : "border-border hover:border-primary/50"
                                )}
                              >
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                                  <AvatarFallback>{index + 1}</AvatarFallback>
                                </Avatar>
                              </button>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {editing ? (
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    {profile?.bio || 'No bio provided'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Details
              </CardTitle>
              <CardDescription>
                Your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  {editing ? (
                    <Input
                      id="first_name"
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.first_name || 'Not set'}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  {editing ? (
                    <Input
                      id="last_name"
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.last_name || 'Not set'}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {editing ? (
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.phone || 'Not set'}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  {editing ? (
                   <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date_of_birth && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date_of_birth ? format(new Date(formData.date_of_birth), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.date_of_birth ? new Date(formData.date_of_birth) : undefined}
                          onSelect={(date) => setFormData(prev => ({ ...prev, date_of_birth: date ? format(date, 'yyyy-MM-dd') : null }))}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {profile?.date_of_birth 
                          ? format(new Date(profile.date_of_birth), "PPP")
                          : 'Not set'
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                {editing ? (
                  <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm">
                    {profile?.gender || 'Not set'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
              <CardDescription>
                Your residential address details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address Lines */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address_line1">Address Line 1</Label>
                  {editing ? (
                    <Input
                      id="address_line1"
                      placeholder="Street address"
                      value={formData.address_line1}
                      onChange={(e) => setFormData(prev => ({ ...prev, address_line1: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.address_line1 || 'Not set'}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address_line2">Address Line 2</Label>
                  {editing ? (
                    <Input
                      id="address_line2"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.address_line2}
                      onChange={(e) => setFormData(prev => ({ ...prev, address_line2: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.address_line2 || 'Not set'}
                    </div>
                  )}
                </div>
              </div>

              {/* City, State, Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  {editing ? (
                    <Input
                      id="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.city || 'Not set'}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  {editing ? (
                    <Input
                      id="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.state || 'Not set'}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  {editing ? (
                    <Input
                      id="postal_code"
                      placeholder="12345"
                      value={formData.postal_code}
                      onChange={(e) => setFormData(prev => ({ ...prev, postal_code: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.postal_code || 'Not set'}
                    </div>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                {editing ? (
                  <Input
                    id="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  />
                ) : (
                  <div className="text-sm">
                    {profile?.country || 'Not set'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Your professional and business details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company and Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  {editing ? (
                    <Input
                      id="company_name"
                      placeholder="Company name"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.company_name || 'Not set'}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job_title">Job Title</Label>
                  {editing ? (
                    <Input
                      id="job_title"
                      placeholder="Job title"
                      value={formData.job_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.job_title || 'Not set'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                {editing ? (
                  <Input
                    id="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  />
                ) : (
                  <div className="text-sm">
                    {profile?.department || 'Not set'}
                  </div>
                )}
              </div>

              {/* Business Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business_phone">Business Phone</Label>
                  {editing ? (
                    <Input
                      id="business_phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.business_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, business_phone: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.business_phone || 'Not set'}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_email">Business Email</Label>
                  {editing ? (
                    <Input
                      id="business_email"
                      type="email"
                      placeholder="work@company.com"
                      value={formData.business_email}
                      onChange={(e) => setFormData(prev => ({ ...prev, business_email: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile?.business_email || 'Not set'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Address */}
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Business Address</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business_address_line1">Address Line 1</Label>
                    {editing ? (
                      <Input
                        id="business_address_line1"
                        placeholder="Business street address"
                        value={formData.business_address_line1}
                        onChange={(e) => setFormData(prev => ({ ...prev, business_address_line1: e.target.value }))}
                      />
                    ) : (
                      <div className="text-sm">
                        {profile?.business_address_line1 || 'Not set'}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business_address_line2">Address Line 2</Label>
                    {editing ? (
                      <Input
                        id="business_address_line2"
                        placeholder="Suite, floor, etc. (optional)"
                        value={formData.business_address_line2}
                        onChange={(e) => setFormData(prev => ({ ...prev, business_address_line2: e.target.value }))}
                      />
                    ) : (
                      <div className="text-sm">
                        {profile?.business_address_line2 || 'Not set'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business_city">City</Label>
                    {editing ? (
                      <Input
                        id="business_city"
                        placeholder="City"
                        value={formData.business_city}
                        onChange={(e) => setFormData(prev => ({ ...prev, business_city: e.target.value }))}
                      />
                    ) : (
                      <div className="text-sm">
                        {profile?.business_city || 'Not set'}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business_state">State/Province</Label>
                    {editing ? (
                      <Input
                        id="business_state"
                        placeholder="State"
                        value={formData.business_state}
                        onChange={(e) => setFormData(prev => ({ ...prev, business_state: e.target.value }))}
                      />
                    ) : (
                      <div className="text-sm">
                        {profile?.business_state || 'Not set'}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business_postal_code">Postal Code</Label>
                    {editing ? (
                      <Input
                        id="business_postal_code"
                        placeholder="12345"
                        value={formData.business_postal_code}
                        onChange={(e) => setFormData(prev => ({ ...prev, business_postal_code: e.target.value }))}
                      />
                    ) : (
                      <div className="text-sm">
                        {profile?.business_postal_code || 'Not set'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_country">Country</Label>
                  {editing ? (
                    <Input
                      id="business_country"
                      placeholder="Country"
                      value={formData.business_country}
                      onChange={(e) => setFormData(prev => ({ ...prev, business_country: e.target.value }))}
                    />
                  ) : (
                    <div className="text-sm">
                      {profile?.business_country || 'Not set'}
                    </div>
                  )}
                </div>
              </div>

              {/* Online Presence */}
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Online Presence</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    {editing ? (
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile?.website || 'Not set'}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                    {editing ? (
                      <Input
                        id="linkedin_url"
                        type="url"
                        placeholder="https://linkedin.com/in/yourname"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile?.linkedin_url || 'Not set'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Actions - Fixed position at bottom when editing */}
          {editing && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex space-x-2">
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save All Changes'}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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