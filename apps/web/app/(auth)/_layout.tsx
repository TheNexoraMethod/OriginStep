export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1008] px-4">
      {children}
    </div>
  )
}
