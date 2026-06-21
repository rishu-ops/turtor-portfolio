import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How is Project Tutor different?",
      a: "Unlike traditional platforms, we don't sell student contact details as pay-per-lead packets. Instead, students post detailed learning requirements, and verified tutors apply only to opportunities matching their exact expertise. There are no expensive lead purchase packages or credits required.",
    },
    {
      q: "Is Project Tutor free?",
      a: "Yes, during our validation and waitlist stage, joining Project Tutor is 100% free for both tutors and parents/students. In the future, we aim to maintain a free base matching service and explore value-based subscriptions rather than restricting lead access.",
    },
    {
      q: "When will the platform launch?",
      a: "We are currently in the validation phase to gauge demand from tutors and parents. Once we gather a strong base of interested participants, we will roll out the beta version in select cities, starting with Kotdwar and Dehradun, and notify you via email and phone.",
    },
    {
      q: "How can tutors join?",
      a: "Simply fill out our 'Join as a Tutor' form below. Provide details about your credentials, experience, subjects, and teaching modes. Once verified, you will be added to our early-bird waitlist.",
    },
    {
      q: "Can institutions use Project Tutor?",
      a: "Yes! While the immediate focus is 1-on-1 matches, our future vision includes 'Institution Hiring' and 'Teacher Recruitment' modules, allowing coaching academies and schools to source verified tutors directly.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to know about Project Tutor during our pre-launch validation stage.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-slate-300 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-secondary hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 border-t border-slate-100" : "max-h-0 pointer-events-none"
                  } overflow-hidden`}
                >
                  <p className="px-6 py-5 text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
