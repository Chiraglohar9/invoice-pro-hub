import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Plus, 
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const customersData = [
  { 
    id: 1, 
    name: 'ABC Corporation', 
    email: 'admin@abc.com', 
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, City, ST 12345',
    status: 'active',
    totalInvoices: 15,
    totalPaid: 25000,
    lastInvoice: '2024-01-15'
  },
  { 
    id: 2, 
    name: 'XYZ Ltd', 
    email: 'billing@xyz.com', 
    phone: '+1 (555) 987-6543',
    address: '456 Commerce St, City, ST 67890',
    status: 'active',
    totalInvoices: 8,
    totalPaid: 12800,
    lastInvoice: '2024-01-14'
  },
  { 
    id: 3, 
    name: 'Tech Solutions', 
    email: 'accounts@techsol.com', 
    phone: '+1 (555) 456-7890',
    address: '789 Tech Blvd, City, ST 11111',
    status: 'active',
    totalInvoices: 22,
    totalPaid: 45600,
    lastInvoice: '2024-01-13'
  },
  { 
    id: 4, 
    name: 'StartupCo', 
    email: 'finance@startup.com', 
    phone: '+1 (555) 321-6547',
    address: '321 Innovation Way, City, ST 22222',
    status: 'inactive',
    totalInvoices: 3,
    totalPaid: 2850,
    lastInvoice: '2024-01-10'
  },
  { 
    id: 5, 
    name: 'Enterprise Inc', 
    email: 'pay@enterprise.com', 
    phone: '+1 (555) 789-1234',
    address: '654 Corporate Dr, City, ST 33333',
    status: 'active',
    totalInvoices: 35,
    totalPaid: 87500,
    lastInvoice: '2024-01-09'
  },
]

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-success/20 text-success border-success/30'
      : 'bg-muted/20 text-muted-foreground border-border'
  }

  const totalCustomers = customersData.length
  const activeCustomers = customersData.filter(c => c.status === 'active').length
  const totalRevenue = customersData.reduce((sum, c) => sum + c.totalPaid, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered customers</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">{Math.round((activeCustomers/totalCustomers)*100)}% of total</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Users className="h-4 w-4 text-profit" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-profit">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="gradient-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Customers Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoices</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total Paid</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {customer.address}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">{customer.totalInvoices}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-success">${customer.totalPaid.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {customer.lastInvoice}
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}