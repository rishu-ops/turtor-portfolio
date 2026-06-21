import React, { useState } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "../supabase";

export default function FeedbackModal({ isOpen, onClose, userType, leadId }) {
  const [step, setStep] = useState(0); // 0 to 4 for questions
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  if (!isOpen) return null;

  const tutorQuestions = [
    {
      key: "q1",
      question: "How do you currently find students?",
      options: ["UrbanPro", "Superprof", "Justdial", "Social Media", "Word of Mouth", "Other"],
      type: "radio",
    },
    {
      key: "q2",
      question: "What is your biggest challenge when finding students?",
      options: ["Expensive leads", "Low-quality leads", "Too much competition", "Not enough opportunities", "Other"],
      type: "radio",
    },
    {
      key: "q3",
      question: "Have you ever paid for student leads?",
      options: ["Yes", "No"],
      type: "radio",
    },
    {
      key: "q4",
      question: "Would you use a platform where students post requirements and tutors can apply directly without purchasing leads?",
      options: ["Definitely", "Maybe", "No"],
      type: "radio",
    },
    {
      key: "q5",
      question: "What is one thing you would want from a tutoring platform that existing platforms don't provide?",
      type: "textarea",
      placeholder: "Write your answer here...",
    },
  ];

  const studentQuestions = [
    {
      key: "q1",
      question: "How do you currently find tutors?",
      options: ["UrbanPro", "Google", "Coaching Centers", "Friends & Family", "Social Media", "Other"],
      type: "radio",
    },
    {
      key: "q2",
      question: "What is your biggest difficulty when finding a tutor?",
      options: ["Too many choices", "Hard to verify quality", "Budget concerns", "Slow responses", "Other"],
      type: "radio",
    },
    {
      key: "q3",
      question: "What matters most when selecting a tutor?",
      options: ["Experience", "Qualification", "Reviews", "Budget", "Demo Class"],
      type: "radio",
    },
    {
      key: "q4",
      question: "Would you prefer posting your requirement and receiving tutor applications instead of searching manually?",
      options: ["Yes", "Maybe", "No"],
      type: "radio",
    },
    {
      key: "q5",
      question: "If Project Tutor were available today, how likely would you be to use it?",
      options: ["Very Likely", "Likely", "Unsure", "Unlikely"],
      type: "radio",
    },
  ];

  const currentQuestions = userType === "tutor" ? tutorQuestions : studentQuestions;
  const currentQ = currentQuestions[step];

  const handleSelectOption = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQ.key]: option }));
    // Auto-advance for radio choices
    if (step < 4) {
      setTimeout(() => setStep((s) => s + 1), 200);
    }
  };

  const handleTextChange = (e) => {
    setAnswers((prev) => ({ ...prev, [currentQ.key]: e.target.value }));
  };

  const handleNext = () => {
    if (step < 4) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let supabaseError = null;

    try {
      const { error } = await supabase.from("feedback").insert([
        {
          lead_id: leadId || null,
          user_type: userType,
          q1: answers.q1,
          q2: answers.q2,
          q3: answers.q3,
          q4: answers.q4,
          q5: answers.q5,
        },
      ]);
      if (error) supabaseError = error;
    } catch (err) {
      supabaseError = err;
      console.error("Supabase feedback insert error:", err);
    }

    // Always cache/save to local storage as fallback
    const existingFeedback = JSON.parse(localStorage.getItem("project_tutor_feedback") || "[]");
    existingFeedback.push({
      leadId,
      userType,
      ...answers,
      timestamp: new Date().toISOString(),
      synced: !supabaseError,
    });
    localStorage.setItem("project_tutor_feedback", JSON.stringify(existingFeedback));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    // Reset state
    setStep(0);
    setAnswers({ q1: "", q2: "", q3: "", q4: "", q5: "" });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative p-6 sm:p-8 flex flex-col justify-between min-h-[420px]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-secondary text-base">Quick Feedback</h3>
            <p className="text-[11px] text-slate-400">Help us design the best alternative tutoring system.</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 py-6 flex flex-col justify-center">
          {!isSubmitted ? (
            <div className="space-y-6">
              
              {/* Stepper Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>Question {step + 1} of 5</span>
                  <span>{Math.round(((step + 1) / 5) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((step + 1) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Title */}
              <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              {currentQ.type === "radio" ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQ.options.map((opt) => {
                    const isSelected = answers[currentQ.key] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? "bg-primary/5 border-primary text-primary shadow-sm"
                            : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Textarea */
                <div className="space-y-3">
                  <textarea
                    rows="4"
                    value={answers[currentQ.key]}
                    onChange={handleTextChange}
                    placeholder={currentQ.placeholder}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  ></textarea>
                </div>
              )}

            </div>
          ) : (
            /* Success screen */
            <div className="text-center py-8 space-y-4">
              <div className="flex justify-center text-emerald-500">
                <CheckCircle2 className="w-16 h-16" />
              </div>
              <h4 className="font-extrabold text-secondary text-lg">Thank You So Much!</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                Your direct insights will guide our matching engine schema. We are building this platform specifically to address these challenges.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Nav Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              {/* Back btn */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 0}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 disabled:opacity-0 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {/* Skip / Next / Submit */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Skip Feedback
                </button>
                {step < 4 ? (
                  currentQ.type === "textarea" ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!answers[currentQ.key].trim()}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all disabled:opacity-50"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : null
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || (currentQ.type === "textarea" && !answers[currentQ.key].trim())}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all disabled:bg-slate-400"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Submit Survey"
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg bg-secondary hover:bg-secondary-dark text-white text-xs font-bold transition-all"
              >
                Close Survey
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
