import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { Plus, Trash2, ArrowLeft } from 'lucide-react'

const customers = [
  { id: 'c1', name: 'ABC Corporation', email: 'admin@abc.com' },
  { id: 'c2', name: 'XYZ Ltd', email: 'billing@xyz.com' },
  { id: 'c3', name: 'Tech Solutions', email: 'accounts@techsol.com' },
]

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'INR', symbol: '₹' },
]

const itemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  quantity: z.coerce.number().min(1, 'Min 1'),
  price: z.coerce.number().min(0, 'Price >= 0'),
  taxRate: z.coerce.number().min(0).max(100),
})

const formSchema = z.object({
  customerId: z.string().min(1, 'Select a customer'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  currency: z.string().min(1),
  notes: z.string().optional(),
  terms: z.string().optional(),
  discountPercent: z.coerce.number().min(0).max(100).default(0),
  shipping: z.coerce.number().min(0).default(0),
  items: z.array(itemSchema).min(1, 'Add at least one item'),
})

export default function CreateInvoice() {
  const navigate = useNavigate()
  const [prefix] = useState('INV-')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: customers[0]?.id ?? '',
      invoiceNumber: `${prefix}${Math.floor(Math.random() * 9000 + 1000)}`,
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      currency: currencies[2].code,
      notes: '',
      terms: 'Payment due within 7 days.',
      discountPercent: 0,
      shipping: 0,
      items: [
        { name: 'Service Fee', quantity: 1, price: 1000, taxRate: 18 },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'items' })

  const currencySymbol = useMemo(() => {
    const code = form.watch('currency')
    return currencies.find(c => c.code === code)?.symbol ?? '$'
  }, [form])

  const totals = useMemo(() => {
    const values = form.getValues()
    const subtotal = values.items.reduce((sum, it) => sum + it.quantity * it.price, 0)
    const taxTotal = values.items.reduce((sum, it) => sum + (it.quantity * it.price) * (it.taxRate / 100), 0)
    const discount = subtotal * (values.discountPercent / 100)
    const shipping = values.shipping || 0
    const total = subtotal - discount + taxTotal + shipping
    return { subtotal, taxTotal, discount, shipping, total }
  }, [form.watch('items'), form.watch('discountPercent'), form.watch('shipping')])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      currencySymbol,
      totals,
    }
    // Simulate save
    toast({ title: 'Invoice created', description: `#${values.invoiceNumber} for ${customers.find(c => c.id === values.customerId)?.name}` })
    navigate('/invoices')
    // Here you could persist to Supabase or another API
    console.debug('Created invoice payload', payload)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/invoices')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Invoices
        </Button>
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/15 text-primary border-primary/30">Draft</Badge>
          <Button type="button" variant="outline" onClick={form.handleSubmit(onSubmit)}>Save Draft</Button>
          <Button className="gradient-primary text-white" onClick={form.handleSubmit(onSubmit)}>Save & Continue</Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Invoice details */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map(c => (
                            <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Items */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-3 items-end">
                      <FormField
                        control={form.control}
                        name={`items.${index}.name` as const}
                        render={({ field }) => (
                          <FormItem className="col-span-12 md:col-span-4">
                            <FormLabel>Item</FormLabel>
                            <FormControl>
                              <Input placeholder="Item name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity` as const}
                        render={({ field }) => (
                          <FormItem className="col-span-6 md:col-span-2">
                            <FormLabel>Qty</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} step={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.price` as const}
                        render={({ field }) => (
                          <FormItem className="col-span-6 md:col-span-2">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} step={0.01} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.taxRate` as const}
                        render={({ field }) => (
                          <FormItem className="col-span-6 md:col-span-2">
                            <FormLabel>Tax %</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} max={100} step={0.01} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-6 md:col-span-1">
                        <FormLabel className="opacity-0">Amount</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          {(form.watch(`items.${index}.quantity`) * form.watch(`items.${index}.price`) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-1 flex justify-end">
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: '', quantity: 1, price: 0, taxRate: 0 })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Notes & Terms</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Notes</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Notes visible on invoice" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Terms & Conditions</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Payment terms" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-muted-foreground">Subtotal</div>
                  <div className="text-right font-medium">{currencySymbol} {totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

                  <FormField
                    control={form.control}
                    name="discountPercent"
                    render={({ field }) => (
                      <>
                        <div className="text-muted-foreground">Discount %</div>
                        <div className="flex items-center justify-end gap-2">
                          <Input className="w-24 text-right" type="number" min={0} max={100} step={0.01} {...field} />
                        </div>
                      </>
                    )}
                  />

                  <div className="text-muted-foreground">Tax</div>
                  <div className="text-right font-medium">{currencySymbol} {totals.taxTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

                  <FormField
                    control={form.control}
                    name="shipping"
                    render={({ field }) => (
                      <>
                        <div className="text-muted-foreground">Shipping</div>
                        <div className="flex items-center justify-end gap-2">
                          <Input className="w-28 text-right" type="number" min={0} step={0.01} {...field} />
                        </div>
                      </>
                    )}
                  />

                  <div className="col-span-2 h-px bg-border my-1" />

                  <div className="text-muted-foreground">Discount</div>
                  <div className="text-right">{currencySymbol} {totals.discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

                  <div className="text-foreground font-semibold">Total</div>
                  <div className="text-right text-lg font-bold">{currencySymbol} {totals.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>

                <Button className="w-full gradient-primary text-white" onClick={form.handleSubmit(onSubmit)}>
                  Create Invoice
                </Button>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Bill To</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const selected = customers.find(c => c.id === form.watch('customerId'))
                  return (
                    <div className="space-y-1 text-sm">
                      <div className="font-medium">{selected?.name}</div>
                      <div className="text-muted-foreground">{selected?.email}</div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}
