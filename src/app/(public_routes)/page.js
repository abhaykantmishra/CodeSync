'use client'
import { Button } from "@/components/ui/button"
import { BarChartIcon, MapIcon, HelpCircleIcon } from "lucide-react"
import Link from "next/link";

export default function Home() {

  return (
    <>
    <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Coding Journey, Unified
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track your progress across platforms, follow personalized roadmaps, and get the help you need to
                  succeed in your coding career.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-400 dark:text-gray-900 dark:hover:bg-purple-300">
                  <Link href="/signup" >Get Started</Link>
                </Button>
                <Button variant="outline">
                <Link href="#feature" >Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="feature" className="w-full py-12 md:py-24 lg:py-28 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-purple-600 text-white rounded-full dark:bg-purple-400 dark:text-gray-900">
                  <BarChartIcon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold">Unified Progress Tracking</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  See all your coding achievements from various platforms in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-purple-600 text-white rounded-full dark:bg-purple-400 dark:text-gray-900">
                  <MapIcon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold">Customized Roadmaps</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Get personalized learning paths tailored to your goals and skill level.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-purple-600 text-white rounded-full dark:bg-purple-400 dark:text-gray-900">
                  <HelpCircleIcon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold">Community Help</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Get help from Community developers when you&apos;re stuck.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 CodeSync. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
    </>
  );
}
