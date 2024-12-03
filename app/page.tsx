import { tools } from './tools'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Welcome to AetherTools</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Discover a universe of productivity tools designed to enhance your creativity and streamline your workflow. Explore our collection of utilities and unleash your potential in the Aetherverse.
          </p>
          <div className="mt-10">
            <Link
              href="https://aetherverse.us"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              Learn more about Aetherverse
            </Link>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Tools</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{tool.name}</h3>
              <p className="font-normal text-gray-700">Explore this tool</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

