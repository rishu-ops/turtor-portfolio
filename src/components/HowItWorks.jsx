import { ClipboardList, Search, Send, UserCheck, Sparkles, HelpCircle, ArrowDown } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Student Posts Requirement",
      desc: "Describe subjects, grade level, home/online mode, and budget constraints.",
      icon: ClipboardList,
      color: "bg-blue-500 text-white shadow-blue-500/20",
    },
    {
      num: "02",
      title: "Tutors Discover Opportunity",
      desc: "Verified tutors receive alerts matching their specific skills and location.",
      icon: Search,
      color: "bg-indigo-500 text-white shadow-indigo-500/20",
    },
    {
      num: "03",
      title: "Tutors Apply Directly",
      desc: "Interested tutors submit direct, tailored proposals explaining their approach.",
      icon: Send,
      color: "bg-purple-500 text-white shadow-purple-500/20",
    },
    {
      num: "04",
      title: "Student Selects Match",
      desc: "Review proposals, qualifications, and choose the best-suited educator.",
      icon: UserCheck,
      color: "bg-pink-500 text-white shadow-pink-500/20",
    },
    {
      num: "05",
      title: "Learning Begins",
      desc: "Connect, finalize schedules, and start achieving academic milestones.",
      icon: Sparkles,
      color: "bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-emerald-500/10",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span>Simple Process Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            How Project Tutor Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Our streamlined flow makes finding the perfect tutor quick, straightforward, and completely free of spam.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-0.5 border-t-2 border-dashed border-slate-200 z-0"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 relative group"
              >
                {/* Step badge */}
                <div className="absolute top-3 left-4 text-xs font-extrabold text-slate-300 group-hover:text-primary transition-colors">
                  STEP {step.num}
                </div>

                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-110 ${step.color}`}>
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Details */}
                <h3 className="font-bold text-sm sm:text-base text-secondary mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

                {/* Connecting Dotted Chevron (Mobile/Tablet between cards) */}
                {index < 4 && (
                  <div className="lg:hidden mt-4 flex justify-center text-slate-300">
                    <ArrowDown className="w-5 h-5 text-slate-300 animate-bounce" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
