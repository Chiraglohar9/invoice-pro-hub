import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
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

const invoicesData = [
  { id: 'INV001', client: 'ABC Corporation', email: 'admin@abc.com', amount: 2500, status: 'paid', date: '2024-01-15', dueDate: '2024-02-15' },
  { id: 'INV002', client: 'XYZ Ltd', email: 'billing@xyz.com', amount: 1800, status: 'pending', date: '2024-01-14', dueDate: '2024-02-14' },
  { id: 'INV003', client: 'Tech Solutions', email: 'accounts@techsol.com', amount: 3200, status: 'paid', date: '2024-01-13', dueDate: '2024-02-13' },
  { id: 'INV004', client: 'StartupCo', email: 'finance@startup.com', amount: 950, status: 'overdue', date: '2024-01-10', dueDate: '2024-02-10' },
  { id: 'INV005', client: 'Enterprise Inc', email: 'pay@enterprise.com', amount: 4500, status: 'paid', date: '2024-01-09', dueDate: '2024-02-09' },
  { id: 'INV006', client: 'Small Business', email: 'owner@small.com', amount: 750, status: 'draft', date: '2024-01-08', dueDate: '2024-02-08' },
  { id: 'INV007', client: 'Global Corp', email: 'ap@global.com', amount: 5200, status: 'pending', date: '2024-01-07', dueDate: '2024-02-07' },
  { id: 'INV008', client: 'Local Services', email: 'admin@local.com', amount: 1200, status: 'paid', date: '2024-01-06', dueDate: '2024-02-06' },
]

export default function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredInvoices = invoicesData.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success/20 text-success border-success/30'
      case 'pending': return 'bg-warning/20 text-warning border-warning/30'
      case 'overdue': return 'bg-destructive/20 text-destructive border-destructive/30'
      case 'draft': return 'bg-muted/20 text-muted-foreground border-border'
      default: return 'bg-muted/20 text-muted-foreground border-border'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
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
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="gradient-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Generate Invoice
        </Button>
      </div>

      {/* Invoices Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Issue Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-medium text-primary">{invoice.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{invoice.client}</p>
                        <p className="text-sm text-muted-foreground">{invoice.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold">${invoice.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {invoice.date}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {invoice.dueDate}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Send Reminder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
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