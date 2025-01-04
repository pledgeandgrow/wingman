"use client"
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUserInvoices } from '@/hooks/use-user-invoices'

interface UserInvoicesProps {
  customerId: string
}

export function UserInvoices({ customerId }: UserInvoicesProps) {
  const [paymentIntents, setPaymentIntents] = useState<any[]>([])
  const { fetchUserInvoices, loading, error } = useUserInvoices()

  useEffect(() => {
    const loadPaymentIntents = async () => {
      const userPayments = await fetchUserInvoices(customerId) 
      setPaymentIntents(userPayments)
    }

    loadPaymentIntents()
  }, [customerId, fetchUserInvoices])

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorMessage message={error} />

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        {paymentIntents.length === 0 ? (
          <p className="text-center text-gray-500">No payments found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentIntents.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{formatCurrency(payment.amount_received)}</TableCell>
                  <TableCell>{formatStatus(payment.status)}</TableCell>
                  <TableCell>{formatDate(payment.created)}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100)
}

function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
