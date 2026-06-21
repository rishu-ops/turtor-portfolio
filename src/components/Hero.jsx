import React from "react";
import { ArrowRight, Star, ShieldCheck, GraduationCap, Users, Wifi, Home } from "lucide-react";

export default function Hero({ onSelectForm }) {
  const stats = [
    {
      label: "Home Tuition",
      desc: "Personalized 1-on-1 offline attention",
      icon: Home,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      label: "Online Classes",
      desc: "Interactive learning from anywhere",
      icon: Wifi,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      label: "Coaching Classes",
      desc: "Structured batch guidance",
      icon: GraduationCap,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      label: "Group Learning",
      desc: "Collaborative study circles",
      icon: Users,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-60 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -ml-40 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span>Validating Project Tutor • Join the Waitlist</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl  font-extrabold text-secondary tracking-tight leading-tight">
              Find the Right Tutor. <br />
              <span className="text-primary bg-clip-text ">Without the Noise.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              A tutor-student marketplace designed to create fair, transparent, and meaningful educational connections. Say goodbye to spam and unfair pay-per-lead charges.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onSelectForm("tutor")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Join as Tutor
                <ArrowRight className="ml-2 w-5 h-5 transition-transform" />
              </button>
              <button
                onClick={() => onSelectForm("student")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-secondary hover:bg-slate-50/50 hover:shadow-sm font-bold text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Post a Requirement
              </button>
            </div>

            {/* Stats Placeholders */}
            <div className="pt-8 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center lg:text-left mb-4">
                Supported Learning Formats
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 bg-white border border-slate-200/80 rounded-xl flex flex-col items-center lg:items-start text-center lg:text-left hover:shadow-md hover:border-slate-300 transition-all duration-200"
                  >
                    <div className={`p-2 rounded-lg border mb-2.5 ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm text-secondary">{item.label}</span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-normal hidden sm:block">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-blue-400 opacity-20 blur-xl"></div>

              {/* Glassmorphic Mockup Card */}
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 space-y-6">

                {/* Simulated App Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Match Preview
                  </span>
                </div>

                {/* Simulated Match Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-primary/20 flex items-center justify-center font-bold text-primary">
                        PT
                      </div>
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white"></span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Rishu Rana</h3>
                      <p className="text-xs text-slate-400">Full Stack Tutor • Dehradun/Kotdwar</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      React & Node.js
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      B.Tech CSE
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md font-medium">
                      Verified Credentials
                    </span>
                  </div>

                  {/* Requirements match box */}
                  <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Student Requirement</span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        High Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      "Looking for a 1-on-1 home tutor for Class 12 Computer Science (Python/SQL). Prefer interactive learning exercises."
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
                      <span>Budget: ₹800/hr</span>
                      <span>Mode: Home Tuition</span>
                    </div>
                  </div>

                  {/* Value Add Highlight */}
                  <div className="pt-2 flex items-start gap-2.5">
                    <div className="p-1 rounded bg-blue-50 text-primary">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Fair Matching Model</p>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        No pay-per-lead. Tutors apply only to matching requirements. Students select best matches without intermediate fees.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Preview */}
                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <div className="flex-1 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-semibold text-slate-400">
                    Ignore
                  </div>
                  <div className="flex-1 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-xs font-bold text-primary">
                    Accept Match
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
