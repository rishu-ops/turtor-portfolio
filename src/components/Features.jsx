import React from "react";
import { ShieldCheck, BookOpen, Layers, Users, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Verified Tutor Profiles",
      desc: "Every waitlisted tutor goes through credential and identity checks. View verified qualifications, reviews, and subjects.",
      icon: ShieldCheck,
      badge: "Security First",
      color: "from-blue-500 to-indigo-500 text-blue-500 bg-blue-50/50 border-blue-100",
    },
    {
      title: "Multiple Learning Modes",
      desc: "Support for all environments: offline home tuition, online meetings, local coaching institutes, or student study groups.",
      icon: BookOpen,
      badge: "Flexible",
      color: "from-emerald-500 to-teal-500 text-emerald-500 bg-emerald-50/50 border-emerald-100",
    },
    {
      title: "Smart Matching",
      desc: "Our matching engine filters requirements by location, subject, classes, and budget to connect you with the most relevant tutor.",
      icon: Zap,
      badge: "AI Powered",
      color: "from-amber-500 to-orange-500 text-amber-500 bg-amber-50/50 border-amber-100",
    },
    {
      title: "Educational Community",
      desc: "Tutors can share syllabus notes, practice test sheets, and study materials, creating a rich content sharing environment.",
      icon: Users,
      badge: "Knowledge Hub",
      color: "from-purple-500 to-pink-500 text-purple-500 bg-purple-50/50 border-purple-100",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -mr-40 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span>Designed For Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Key Features of Project Tutor
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            A carefully crafted suite of features focusing on quality, ease of use, and eliminating marketplace friction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className="p-8 bg-slate-50 border border-slate-200/50 rounded-3xl hover:bg-white hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Corner Color Accents */}
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${feat.color.split(" ")[0]} ${feat.color.split(" ")[1]}`}></div>

              <div className="flex justify-between items-start mb-6">
                {/* Icon */}
                <div className={`p-3.5 rounded-2xl border ${feat.color.split(" ").slice(2).join(" ")} group-hover:scale-105 transition-transform duration-200`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                {/* Badge */}
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-sm">
                  {feat.badge}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
