import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Github, Mail, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/ui/theme-provider';
import { useAuth } from '@/hooks/useAuth';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, signIn, signUp, signInWithGoogle, signInWithGitHub } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const BusinessIllustration = () => (
    <svg viewBox="0 0 600 450" className="w-full h-auto drop-shadow-md" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="580" height="430" rx="18" fill="url(#grad1)" />
      <rect x="26" y="26" width="548" height="398" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
      <rect x="26" y="26" width="548" height="56" rx="12" fill="hsl(var(--primary) / 0.08)" />
      <circle cx="54" cy="54" r="6" fill="hsl(var(--primary))" />
      <circle cx="74" cy="54" r="6" fill="hsl(var(--success))" />
      <circle cx="94" cy="54" r="6" fill="hsl(var(--warning))" />
      <rect x="56" y="108" width="220" height="140" rx="10" fill="hsl(var(--muted-foreground) / 0.12)" stroke="hsl(var(--border))" strokeWidth="1" />
      <rect x="90" y="216" width="20" height="24" rx="3" fill="hsl(var(--primary))" />
      <rect x="118" y="196" width="20" height="44" rx="3" fill="hsl(var(--success))" />
      <rect x="146" y="176" width="20" height="64" rx="3" fill="hsl(var(--warning))" />
      <rect x="174" y="156" width="20" height="84" rx="3" fill="hsl(var(--profit))" />
      <rect x="56" y="270" width="220" height="40" rx="8" fill="hsl(var(--muted-foreground) / 0.12)" stroke="hsl(var(--border))" strokeWidth="1" />
      <rect x="56" y="320" width="220" height="40" rx="8" fill="hsl(var(--muted-foreground) / 0.12)" stroke="hsl(var(--border))" strokeWidth="1" />
      <rect x="300" y="108" width="258" height="110" rx="10" fill="hsl(var(--muted-foreground) / 0.12)" stroke="hsl(var(--border))" strokeWidth="1" />
      <polyline points="312,198 340,170 376,187 410,150 454,176 540,132" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
      <circle cx="340" cy="170" r="4" fill="hsl(var(--primary))" />
      <circle cx="410" cy="150" r="4" fill="hsl(var(--primary))" />
      <circle cx="454" cy="176" r="4" fill="hsl(var(--primary))" />
      <rect x="300" y="230" width="258" height="130" rx="10" fill="hsl(var(--muted-foreground) / 0.12)" stroke="hsl(var(--border))" strokeWidth="1" />
      <circle cx="360" cy="295" r="32" fill="hsl(var(--primary) / 0.28)" />
      <path d="M360 295 L360 263 A32 32 0 0 1 392 295 Z" fill="hsl(var(--success))" />
      <rect x="412" y="276" width="126" height="18" rx="4" fill="hsl(var(--primary) / 0.35)" />
      <rect x="412" y="304" width="96" height="14" rx="4" fill="hsl(var(--primary) / 0.35)" />
    </svg>
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    
    if (!error) {
      navigate('/');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    await signUp(email, password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">BillSync</h1>
              <Badge variant="secondary" className="ml-3">Beta</Badge>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="/#features" className="text-muted-foreground hover:text-foreground">Features</a>
              <a href="/#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
              <a href="/#invoice-templates" className="text-muted-foreground hover:text-foreground">Templates</a>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="h-9 w-9"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')}>Home</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-5xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-6">
            <CardHeader className="text-center md:text-left px-0">
              <CardTitle className="text-2xl font-bold">Welcome to InvoicePro Hub</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={signInWithGoogle}
                    disabled={loading}
                    className="w-full"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={signInWithGitHub}
                    disabled={loading}
                    className="w-full"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>

          <div className="hidden md:flex items-center justify-center bg-muted/20 p-6">
            <div className="w-full max-w-md">
              <AspectRatio ratio={4/3}>
                <BusinessIllustration />
              </AspectRatio>
            </div>
          </div>
        </div>
      </Card>
      </main>
    </div>
  );
};

export default AuthPage;
