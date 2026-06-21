import React from "react";
import { CheckCircle2, DollarSign, Target, FileText, CheckCircle } from "lucide-react";

export default function Solution() {
  const benefits = [
    {
      title: "No pay-per-lead model",
      desc: "Tutors discover student requirements and connect directly without buying expensive credits or coins. Completely transparent.",
      icon: DollarSign,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Better tutor-student matching",
      desc: "Students define precise academic requirements, ensuring only qualified tutors matching those exact subjects and grades apply.",
      icon: Target,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "More transparency",
      desc: "Profiles include verified credentials, student testimonials, qualifications, and direct intro bios. No hidden criteria.",
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Higher quality applications",
      desc: "Since application frequency depends on real capability and interest, students only receive high-intent, targeted pitches.",
      icon: FileText,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  return (
    <section id="solution" className="py-24 bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none -ml-40 -mt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span>A Better Way To Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            How Project Tutor Empowers Learning
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Instead of selling contacts, we focus on genuine matches. Students post requirements for free, and tutors apply only to opportunities that fit their expertise.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-8 bg-slate-50 border border-slate-200/60 rounded-2xl flex flex-col sm:flex-row gap-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className={`p-4 rounded-xl border h-fit flex items-center justify-center shrink-0 ${benefit.color} group-hover:scale-105 transition-transform duration-200`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-secondary group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action banner */}
        <div
          className="mt-16 rounded-3xl p-8 sm:p-12 text-white shadow-md relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(to right, rgba(79, 70, 229, 0.90), rgba(79, 70, 229, 0.70)), url('/banner.png')" }}
        >
          <div className="relative max-w-2xl space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Ready to experience transparent matching?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base">
              Be among the first to join our early verification cohort. We are validating interest right now to build a platform that serves you, not advertisers.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#registration-forms"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary hover:bg-slate-50 font-bold text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Join Waitlist
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/30 hover:border-white/50 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Learn the Process
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
