import React from "react";
import { User, Mail, MapPin, Code2 } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./BrandIcons";

export default function Founder() {
  return (
    <section id="founder" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span>Behind the Idea</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Meet the Founder
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Learn about the inspiration behind Project Tutor and the mission to build a fairer tutoring ecosystem.
          </p>
        </div>

        {/* Founder Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 sm:p-12 items-center">

            {/* Left: Avatar/Illustration */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                {/* Founder Photo */}
                <div className="relative w-32 h-32 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-md">
                  <img src="/founder.png" alt="Rishu Rana - Founder" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-secondary">Rishu Rana</h3>
                <p className="text-xs text-primary font-semibold flex items-center justify-center gap-1">
                  <Code2 className="w-3.5 h-3.5" />
                  Full Stack Developer
                </p>
                <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Kotdwar, Uttarakhand
                </p>
              </div>
            </div>

            {/* Right: Bio and Mission */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>Project Tutor</strong> started as a personal initiative to explore a fairer alternative to traditional tutoring platforms.
                </p>
                <p>
                  As a developer, I observed tutors spending hard-earned money to buy credits just to message students, who often had already found a tutor or posted a duplicate request. This pay-per-lead model shifts all risk to the educators while platforms profit unconditionally.
                </p>
                <p>
                  This landing page serves as a validation experiment. By collecting waitlist registrations, we aim to confirm whether tutors, students, and parents prefer a transparent, value-driven matching service over noisy, lead-selling boards.
                </p>
              </div>

              {/* Socials & Contact */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4 items-center">
                <a
                  href="https://www.linkedin.com/in/rishu-rana-a00110282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 text-xs font-semibold shadow-sm transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-600" />
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/rishu-ops/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 text-xs font-semibold shadow-sm transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-black" />
                  GitHub Profile
                </a>
                <a
                  href="mailto:rishurana639@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30 text-xs font-semibold shadow-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-red-500" />
                  rishurana639@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
