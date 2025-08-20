import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  ArrowUpDown, 
  Users, 
  Package, 
  CreditCard, 
  BarChart3, 
  UserCheck, 
  Calendar,
  HelpCircle,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Transactions', href: '/transactions', icon: ArrowUpDown },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Accounts', href: '/accounts', icon: CreditCard },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Employees', href: '/employees', icon: UserCheck },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Help Center', href: '/help', icon: HelpCircle },
]

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const currentPath = window.location.pathname

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                InvoicePro
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-sidebar-accent"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.href
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", sidebarOpen ? "mr-3" : "mx-auto")} />
                    {sidebarOpen && <span>{item.name}</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {sidebarOpen && (
            <div className="text-xs text-sidebar-foreground/60">
              © 2024 InvoicePro Hub
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              {navigationItems.find(item => item.href === currentPath)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}