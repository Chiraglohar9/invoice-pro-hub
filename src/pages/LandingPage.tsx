import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useTheme } from '@/components/ui/theme-provider'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  TrendingUp,
  Users,
  FileText,
  BarChart3,
  Shield,
  Zap,
  Clock,
  ArrowRight,
  Sun,
  Moon,
  Star
} from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  const { theme, setTheme } = useTheme()

  const features = [
    {
      icon: FileText,
      title: "Smart Invoicing",
      description: "Create and send professional invoices in seconds with automated tracking and payments."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Get insights into your financial performance with comprehensive reports and dashboards."
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Organize and manage all your customer relationships in one centralized platform."
    },
    {
      icon: TrendingUp,
      title: "Revenue Tracking",
      description: "Monitor your cash flow, track payments, and forecast your business growth."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security with automated backups to keep your data safe and accessible."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures you can manage your finances without any delays."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "BillSync transformed how I manage my business finances. Invoice processing is now 10x faster!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Freelance Designer",
      content: "The most intuitive financial management tool I've ever used. Highly recommended!",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Agency Founder",
      content: "Our team productivity increased dramatically since switching to BillSync.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BillSync
              </h1>
              <Badge variant="secondary" className="ml-3">
                Beta
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-9 w-9"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')} className="gradient-primary text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6">
            <Zap className="h-3 w-3 mr-1" />
            New: Real-time collaboration features
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Streamline Your
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Business Finances
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            BillSync is the all-in-one financial management platform that helps businesses 
            create invoices, track payments, manage customers, and grow revenue with powerful analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="gradient-primary text-white text-lg px-8 py-6"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Clock className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-success mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video & Product Image */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1920px] grid grid-cols-1 gap-8 items-start justify-items-center">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold">Product Demo</h2>
            <p className="text-muted-foreground">See how BillSync streamlines invoicing, tracking, and analytics.</p>
            <div className="rounded-xl overflow-hidden border bg-card w-full max-w-[1400px]">
              <AspectRatio ratio={16/9}>
                <video
                  controls
                  className="h-full w-full object-cover"
                  poster="/placeholder.svg"
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to manage finances</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to simplify your financial operations and accelerate business growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="dashboard-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Trusted by businesses worldwide</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">$50M+</div>
              <div className="text-muted-foreground">Invoices Processed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-profit">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What our customers say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied users who trust BillSync with their finances.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your business finances?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands of businesses already using BillSync to streamline their financial operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BillSync
              </h3>
              <Badge variant="secondary" className="ml-3">
                Beta
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 BillSync. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
