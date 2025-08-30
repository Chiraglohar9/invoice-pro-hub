import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/components/ui/theme-provider'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCountUp } from '@/hooks/useCountUp'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  TrendingUp,
  Users,
  FileText,
  BarChart3,
  Shield,
  Zap,

  ArrowRight,
  Sun,
  Moon,
  Star,
  Plug,
  Settings,
  PartyPopper,
  Github,
  Twitter,
  Linkedin,
  Mail,
  FileDown,
  Brain
} from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  const { theme, setTheme } = useTheme()

  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Streamline employee tracking, payroll, and performance with automated tools for seamless team oversight and cost control."
    },
    {
      icon: FileDown,
      title: "Downloadable Reports",
      description: "Generate customized, concise financial reports instantly downloadable in PDF or CSV for quick insights and decisions."
    },
    {
      icon: Brain,
      title: "AI Task Manager",
      description: "AI-driven manager prioritizes finance tasks predictively, assigns intelligently, and sends alerts to boost productivity and reduce delays."
    },
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

  const InvoiceSVG = ({ accent }: { accent: string }) => (
    <svg viewBox="0 0 300 400" className="w-full h-auto" role="img" aria-label="Invoice template preview">
      <rect x="1" y="1" width="298" height="398" rx="10" fill="#fff" stroke="#e5e7eb" />
      <rect x="20" y="20" width="60" height="20" rx="4" fill={accent} opacity="0.2" />
      <rect x="90" y="20" width="90" height="20" rx="4" fill={accent} opacity="0.15" />
      <rect x="20" y="60" width="110" height="8" rx="2" fill="#9ca3af" />
      <rect x="20" y="78" width="70" height="6" rx="2" fill="#d1d5db" />
      <rect x="210" y="20" width="70" height="20" rx="4" fill={accent} />
      <rect x="20" y="110" width="260" height="22" rx="4" fill={accent} opacity="0.1" />
      <rect x="20" y="140" width="260" height="22" rx="4" fill={accent} opacity="0.08" />
      <rect x="20" y="180" width="180" height="8" rx="2" fill="#9ca3af" />
      <rect x="20" y="196" width="120" height="6" rx="2" fill="#d1d5db" />
      <rect x="20" y="220" width="260" height="28" rx="4" fill="#f3f4f6" />
      <rect x="20" y="252" width="260" height="28" rx="4" fill="#f9fafb" />
      <rect x="20" y="284" width="260" height="28" rx="4" fill="#f3f4f6" />
      <rect x="160" y="330" width="120" height="12" rx="3" fill="#9ca3af" />
      <rect x="200" y="350" width="80" height="16" rx="4" fill={accent} />
    </svg>
  )

  const formatCompact = (n: number) => Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(n);

  const StatCounter = ({ end, decimals = 0, prefix = '', suffix = '', format = 'none' as 'none' | 'compact' | 'currency' }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [start, setStart] = useState(false)

    useEffect(() => {
      const el = ref.current
      if (!el) return
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setStart(true)
          io.disconnect()
        }
      }, { threshold: 0.3 })
      io.observe(el)
      return () => io.disconnect()
    }, [])

    const value = useCountUp({ end: start ? end : 0, duration: 1800, decimals })
    const formatted = format === 'compact'
      ? formatCompact(value)
      : format === 'currency'
        ? Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1, style: 'currency', currency: 'USD' }).format(value)
        : value.toFixed(decimals)

    return <div ref={ref}>{prefix}{formatted}{suffix}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container px-4 sm:px-6 lg:px-8">
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
              <Button onClick={() => navigate('/auth')} variant="default">
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

      {/* Core Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Plug className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-wide">CONNECT</h3>
            <p className="text-sm text-muted-foreground mt-2">Securely connect bank accounts, payment gateways, and import customers and invoices in minutes.</p>
          </div>
          <div>
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-wide">CONFIGURE</h3>
            <p className="text-sm text-muted-foreground mt-2">Configure taxes, templates, roles, approvals, reminders, and automation rules to match your workflows.</p>
          </div>
          <div>
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <PartyPopper className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-wide">ENJOY</h3>
            <p className="text-sm text-muted-foreground mt-2">Enjoy automated invoicing, reconciliations, and real‑time insights so your team focuses on growth.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
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




      {/* Demo Video */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">See BillSync in Action</h2>
            <p className="text-muted-foreground mt-2">Quick walkthrough of invoicing, tracking, and analytics.</p>
          </div>
          <div className="relative">
            <div className="animated-video-bg"></div>
            <div className="animated-gradient-border rounded-2xl hover:shadow-glow transition-smooth relative z-10">
              <div className="rounded-2xl overflow-hidden bg-card">
                <AspectRatio ratio={16/9}>
                  <video
                  controls
                  className="h-full w-full object-cover transition-smooth hover:brightness-110 hover:scale-[1.005]"
                  poster="/placeholder.svg"
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                  </video>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Trusted by businesses worldwide</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary"><StatCounter end={10000} format="compact" suffix="+" /></div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success"><StatCounter end={50000000} format="currency" suffix="+" /></div>
              <div className="text-muted-foreground">Invoices Processed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-profit"><StatCounter end={99.9} decimals={1} suffix="%" /></div>
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


      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground">Start free. Upgrade only when you need more power.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="dashboard-card">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Starter</h3>
                  <p className="text-sm text-muted-foreground">For individuals and freelancers</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Unlimited invoices</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Basic analytics</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Email support</li>
                </ul>
                <Button onClick={() => navigate('/auth')} className="mt-6">Start free</Button>
              </CardContent>
            </Card>

            <Card className="dashboard-card ring-2 ring-primary">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <Badge className="mb-2">Popular</Badge>
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <p className="text-sm text-muted-foreground">For growing teams</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Everything in Starter</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Team collaboration</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Automations & reminders</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Advanced analytics</li>
                </ul>
                <Button onClick={() => navigate('/auth')} className="mt-6" variant="default">Get Pro</Button>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">For organizations at scale</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>SSO and advanced roles</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Dedicated infrastructure</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5"/>Priority support</li>
                </ul>
                <Button onClick={() => navigate('/auth')} className="mt-6" variant="secondary">Request demo</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Invoice Templates */}
      <section id="invoice-templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Awesome Templates</h2>
            <p className="text-xl text-muted-foreground">Tailor made, professional, and hand‑crafted templates for your business to stand out.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Card className="dashboard-card hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="rounded-xl border bg-card p-3">
                    <InvoiceSVG accent="#b45309" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-3 text-center font-medium">Vintage</div>
            </div>
            <div>
              <Card className="dashboard-card hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="rounded-xl border bg-card p-3">
                    <InvoiceSVG accent="#2563eb" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-3 text-center font-medium">Modern</div>
            </div>
            <div>
              <Card className="dashboard-card hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="rounded-xl border bg-card p-3">
                    <InvoiceSVG accent="#06b6d4" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-3 text-center font-medium">Service</div>
            </div>
            <div>
              <Card className="dashboard-card hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="rounded-xl border bg-card p-3">
                    <InvoiceSVG accent="#16a34a" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-3 text-center font-medium">Evergreen</div>
            </div>
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
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  BillSync
                </h3>
                <Badge variant="secondary" className="ml-3">Beta</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                The all-in-one platform to invoice, track payments, and grow revenue.
              </p>
              <div className="flex gap-3 mt-4 text-muted-foreground">
                <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-5 w-5" /></a>
                <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="h-5 w-5" /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
                <a href="#" aria-label="Email" className="hover:text-foreground"><Mail className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#invoice-templates" className="hover:text-foreground">Invoice Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Docs</a></li>
                <li><a href="#" className="hover:text-foreground">Guides</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Stay up to date</h4>
              <form className="flex gap-2">
                <Input type="email" placeholder="Your email" className="w-full" />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} BillSync. All rights reserved.</p>
            <div className="text-sm text-muted-foreground flex gap-4">
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
