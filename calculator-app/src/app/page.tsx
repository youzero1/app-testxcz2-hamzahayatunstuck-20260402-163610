import Calculator from '@/components/Calculator'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">
        🧮 Calculator
      </h1>
      <Calculator />
      <p className="mt-8 text-slate-400 text-sm">
        Built with Next.js &amp; Tailwind CSS
      </p>
    </main>
  )
}
