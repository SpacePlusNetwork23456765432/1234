'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Food {
  id: string;
  name: string;
  calories: number;
}

export default function CalorieCounter() {
  const [foods, setFoods] = useState<Food[]>([])
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')

  useEffect(() => {
    const savedFoods = localStorage.getItem('calorieCounterFoods')
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('calorieCounterFoods', JSON.stringify(foods))
  }, [foods])

  const addFood = () => {
    if (name && calories) {
      const newFood: Food = {
        id: Date.now().toString(),
        name,
        calories: parseInt(calories),
      }
      setFoods([...foods, newFood])
      setName('')
      setCalories('')
    }
  }

  const removeFood = (id: string) => {
    setFoods(foods.filter(food => food.id !== id))
  }

  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0)

  return (
    <div className="max-w-md mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Calorie Counter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add Food</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Food Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter food name"
              />
            </div>
            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter calories"
                min="0"
              />
            </div>
            <Button onClick={addFood}>Add Food</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Food List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {foods.map((food) => (
              <li key={food.id} className="flex justify-between items-center">
                <span>{food.name} - {food.calories} calories</span>
                <Button variant="destructive" onClick={() => removeFood(food.id)}>Remove</Button>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold">
            Total Calories: {totalCalories}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

