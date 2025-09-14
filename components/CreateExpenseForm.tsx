"use client "
import { addExpense } from '@/actions'
import React from 'react'
import { SubmitButton } from './SubmitButton'

const CreateExpenseForm = () => {
  return (
    <div>
        <form action={addExpense} className="flex flex-col gap-4 p-4 border rounded mb-8">
      <h2 className="text-2xl font-bold">Add New Expense</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name='title' required className='w-full p-2 border rounded ' />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input type="number" name="amount" step="0.01" required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input type="text" name="category" className="w-full p-2 border rounded" />
      </div>
      <SubmitButton />
    </form>
    </div>
  )
}

export default CreateExpenseForm