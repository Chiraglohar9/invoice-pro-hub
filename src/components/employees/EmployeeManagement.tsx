import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
  UserCheck,
  Calendar,
  DollarSign
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

const employeesData = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@company.com', 
    phone: '+1 (555) 123-4567',
    department: 'Sales',
    position: 'Sales Manager',
    salary: 85000,
    status: 'active',
    joinDate: '2022-03-15',
    leaveBalance: 15
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah.johnson@company.com', 
    phone: '+1 (555) 987-6543',
    department: 'Marketing',
    position: 'Marketing Specialist',
    salary: 65000,
    status: 'active',
    joinDate: '2023-01-20',
    leaveBalance: 12
  },
  { 
    id: 3, 
    name: 'Mike Davis', 
    email: 'mike.davis@company.com', 
    phone: '+1 (555) 456-7890',
    department: 'IT',
    position: 'Software Developer',
    salary: 95000,
    status: 'active',
    joinDate: '2021-08-10',
    leaveBalance: 8
  },
  { 
    id: 4, 
    name: 'Emily Brown', 
    email: 'emily.brown@company.com', 
    phone: '+1 (555) 321-6547',
    department: 'HR',
    position: 'HR Coordinator',
    salary: 55000,
    status: 'on_leave',
    joinDate: '2022-11-05',
    leaveBalance: 20
  },
  { 
    id: 5, 
    name: 'David Wilson', 
    email: 'david.wilson@company.com', 
    phone: '+1 (555) 789-1234',
    department: 'Finance',
    position: 'Accountant',
    salary: 70000,
    status: 'active',
    joinDate: '2023-05-18',
    leaveBalance: 18
  },
]

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredEmployees = employeesData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border-success/30'
      case 'on_leave': return 'bg-warning/20 text-warning border-warning/30'
      case 'inactive': return 'bg-muted/20 text-muted-foreground border-border'
      default: return 'bg-muted/20 text-muted-foreground border-border'
    }
  }

  const totalEmployees = employeesData.length
  const activeEmployees = employeesData.filter(e => e.status === 'active').length
  const totalPayroll = employeesData.reduce((sum, e) => sum + e.salary, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Registered employees</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeEmployees}</div>
            <p className="text-xs text-muted-foreground">{Math.round((activeEmployees/totalEmployees)*100)}% of total</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-profit" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-profit">${Math.round(totalPayroll/12).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Annual: ${totalPayroll.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="gradient-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Employees Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employee</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Salary</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Leave</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">{employee.department}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {employee.email}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {employee.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status === 'on_leave' ? 'On Leave' : 
                         employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold">${employee.salary.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{employee.leaveBalance} days</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                          <DropdownMenuItem>Manage Leave</DropdownMenuItem>
                          <DropdownMenuItem>Payroll Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
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