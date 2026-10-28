import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import AuthProvider from "@/components/auth-provider";
import { Activity, Calendar, Stethoscope } from "lucide-react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col justify-between">
        <div>
          <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                      Caredo<span className="text-emerald-500">.</span>
                    </span>
                    <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-widest -mt-1">
                      Patient Portal
                    </span>
                  </div>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                  <Link
                    href="/doctors"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Stethoscope className="w-4 h-4" />
                    Find Doctors
                  </Link>
                  <Link
                    href="/protected"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                  >
                    <Calendar className="w-4 h-4" />
                    My Appointments
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <AuthButton />
                <div className="hidden sm:block">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>

        <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 Caredo Healthcare Platform. College Final Year Project.</p>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-emerald-600 transition-colors">About Project</Link>
              <Link href="/doctors" className="hover:text-emerald-600 transition-colors">Doctors</Link>
              <Link href="/contact" className="hover:text-emerald-600 transition-colors">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
