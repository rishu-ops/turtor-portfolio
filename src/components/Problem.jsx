import React from "react";
import { AlertCircle, TrendingDown, ShieldAlert, Users, XOctagon } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      title: "Tutors lose money on low-quality leads",
      desc: "Tutors are forced to buy credit packages to unlock contact details, only to find the student is unresponsive or has already chosen someone else.",
      icon: TrendingDown,
    },
    {
      title: "New tutors struggle to compete",
      desc: "With high lead costs, talented new educators are priced out, leaving the market dominated by those who can afford expensive bidding wars.",
      icon: ShieldAlert,
    },
    {
      title: "Parents receive irrelevant applications",
      desc: "Because platforms encourage spamming, parents and students are overwhelmed by dozens of generic proposals that do not fit their criteria.",
      icon: Users,
    },
    {
      title: "Platforms profit even when matches fail",
      desc: "Traditional platforms collect lead fees from multiple tutors for the exact same inquiry. They win even when you lose.",
      icon: XOctagon,
    },
  ];

  return (
    <section id="problem" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-red-400">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>The Current System Is Broken</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Traditional Tutoring Platforms Fail You
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Traditional sites operate on a predatory pay-per-lead system. Tutors pay to apply before knowing if a student is genuinely interested, while students get spammed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((prob, index) => (
            <div
              key={index}
              className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex gap-4 hover:border-red-500/30 hover:bg-slate-800 transition-all duration-300 group"
            >
              <div className="p-3 bg-red-500/10 text-red-400 rounded-xl h-fit group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                <prob.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-slate-100 group-hover:text-white transition-colors">
                  {prob.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-red-500/5 border border-red-500/10 rounded-2xl text-center max-w-2xl mx-auto">
          <p className="text-sm text-red-300 italic font-medium">
            "We believe discovery should be free, matches should be transparent, and connections should be meaningful."
          </p>
        </div>
      </div>
    </section>
  );
}
