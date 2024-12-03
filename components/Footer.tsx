import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img
              className="h-10"
              src="/placeholder.svg?height=40&width=120"
              alt="AetherTools"
            />
            <p className="text-gray-500 text-base"> 
              Empowering creativity and productivity in the Aetherverse.
            </p>
            <div className="flex space-x-6">
              {/* Add social media icons here */}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/cheat-sheet" className="text-base text-gray-500 hover:text-gray-900">
                      Cheat Sheets
                    </Link>
                  </li>
                  <li>
                    <Link href="/habit-tracker" className="text-base text-gray-500 hover:text-gray-900">
                      Habit Tracking
                    </Link>
                  </li>
                  <li>
                    <Link href="/math-practice" className="text-base text-gray-500 hover:text-gray-900">
                      Math Practice
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/documentation" className="text-base text-gray-500 hover:text-gray-900">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides" className="text-base text-gray-500 hover:text-gray-900">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                      API Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="https://aetherverse.us/about" className="text-base text-gray-500 hover:text-gray-900">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="https://aetherverse.us/blog" className="text-base text-gray-500 hover:text-gray-900">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="https://aetherverse.us/careers" className="text-base text-gray-500 hover:text-gray-900">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 AetherTools, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

