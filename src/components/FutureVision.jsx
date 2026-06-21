import React from "react";
import { Compass, Search, Users, Briefcase, Share2, Globe, MonitorPlay } from "lucide-react";

export default function FutureVision() {
  const visionItems = [
    {
      title: "Tutor Discovery",
      desc: "Connect students with matches in minutes using zero-noise parameters.",
      icon: Search,
      phase: "Phase 1 - Current",
    },
    {
      title: "Student Learning Community",
      desc: "Peer study circles, doubt resolution, and collaborative virtual workspaces.",
      icon: Users,
      phase: "Phase 2 - Planned",
    },
    {
      title: "Teacher Recruitment",
      desc: "Matching certified schools and academies with top-tier teaching talents.",
      icon: Briefcase,
      phase: "Phase 3 - Future",
    },
    {
      title: "Educational Content Sharing",
      desc: "An open marketplace/hub for curated class notes, guides, and lectures.",
      icon: Share2,
      phase: "Phase 2 - Planned",
    },
    {
      title: "Institution Hiring",
      desc: "Simplifying background checks and bulk hiring for coaching institutes.",
      icon: Globe,
      phase: "Phase 3 - Future",
    },
    {
      title: "Online Class Management",
      desc: "Integrated scheduling, whiteboards, notes distribution, and video sessions.",
      icon: MonitorPlay,
      phase: "Phase 3 - Future",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-40 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary-light">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span>Beyond Tutor Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Future Vision & Roadmap
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Project Tutor is starting as a discovery engine but plans to expand into a complete, end-to-end education ecosystem.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionItems.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-slate-900 border border-slate-800/80 rounded-2xl flex flex-col justify-between hover:border-primary/50 hover:bg-slate-900/85 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Icon & Phase */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-slate-800 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-800 px-2 py-1 rounded border border-slate-700/60">
                    {item.phase}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-100 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action/Progress bar mimic */}
              <div className="mt-6 pt-4 border-t border-slate-800/85 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Status</span>
                <span className={`text-[10px] font-bold ${item.phase.includes("Current")
                    ? "text-emerald-400"
                    : item.phase.includes("Planned")
                      ? "text-blue-400"
                      : "text-amber-500"
                  }`}>
                  {item.phase.includes("Current") ? "In Progress" : item.phase.includes("Planned") ? "In Queue" : "In Concept"}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
