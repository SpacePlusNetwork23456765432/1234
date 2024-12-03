import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found</p>
        <p className="text-gray-500 mt-2 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-2">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <p className="text-sm text-gray-500">
            or try using the search bar to find what you're looking for.
          </p>
        </div>
        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Lost in the Aetherverse? Don't worry, even the most advanced AI sometimes gets confused.
          </p>
        </div>
      </div>
    </div>
  )
}

