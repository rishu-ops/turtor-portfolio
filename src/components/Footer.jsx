import React from "react";
import { Globe, Mail, Phone, Heart } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./BrandIcons";

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Note */}
          <div className="md:col-span-5 space-y-4">
            <img src="/logo.png" alt="Project Tutor Logo" className="h-9 w-auto object-contain brightness-0 invert opacity-90" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An open, transparent matching marketplace connecting students with local and online tutors without pay-per-lead spam.
            </p>
            <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300 block mb-1">Validation Notice:</span>
              Currently in the pre-launch validation stage. Feedback, ideas, and developer collaborations are highly welcome.
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/rishu-rana-a00110282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-500" />
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rishu-ops/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href="https://rishu-portfolio-six.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-emerald-500" />
                  Developer Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:rishurana639@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  rishurana639@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+916398301762"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  +91 6398301762
                </a>
              </li>
              <li className="text-slate-500 text-xs">
                Availability: Mon - Sat (9:00 AM - 7:00 PM IST)
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Project Tutor. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Rishu Rana
            </span>
            {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("admin") === "true" && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-xs text-slate-600 hover:text-primary transition-colors cursor-pointer focus:outline-none"
                >
                  Admin Waitlist Export
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
