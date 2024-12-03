'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  const calculateLoan = () => {
    const principal = loanAmount
    const interest = interestRate / 100 / 12
    const payments = loanTerm * 12

    const x = Math.pow(1 + interest, payments)
    const monthly = (principal * x * interest) / (x - 1)

    setMonthlyPayment(monthly)
    setTotalPayment(monthly * payments)
  }

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Loan Calculator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Loan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                min="1"
              />
            </div>
            <Button onClick={calculateLoan}>Calculate</Button>
            {monthlyPayment > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
                <p className="font-semibold">Total Payment: ${totalPayment.toFixed(2)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

