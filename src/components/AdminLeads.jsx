import React, { useState, useEffect } from "react";
import { X, Download, Trash2, Calendar, Mail, Phone, MapPin, Award, ArrowRight } from "lucide-react";

export default function AdminLeads({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("tutors");
  const [leads, setLeads] = useState({ tutors: [], students: [] });
  const [feedback, setFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      const data = JSON.parse(localStorage.getItem("project_tutor_leads") || '{"tutors": [], "students": []}');
      setLeads(data);
      const fbData = JSON.parse(localStorage.getItem("project_tutor_feedback") || "[]");
      setFeedback(fbData);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const downloadJSON = () => {
    const exportData = {
      leads,
      feedback
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `project_tutor_waitlist_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const clearData = () => {
    if (window.confirm("Are you sure you want to permanently clear all waitlist data and survey feedback from this browser?")) {
      const reset = { tutors: [], students: [] };
      localStorage.setItem("project_tutor_leads", JSON.stringify(reset));
      localStorage.setItem("project_tutor_feedback", JSON.stringify([]));
      setLeads(reset);
      setFeedback([]);
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [local, domain] = email.split("@");
    if (!domain) return email;
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    const clean = phone.replace(/[^0-9]/g, "");
    if (clean.length < 4) return "****";
    return `${clean.substring(0, 2)}******${clean.substring(clean.length - 2)}`;
  };

  const activeLeads = leads[activeTab] || [];

  const filteredLeads = activeLeads.filter((lead) => {
    const term = searchTerm.toLowerCase();
    if (activeTab === "tutors") {
      return (
        lead.fullName.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.city.toLowerCase().includes(term) ||
        lead.subjects.toLowerCase().includes(term)
      );
    } else {
      return (
        lead.studentName.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.city.toLowerCase().includes(term) ||
        lead.subjectRequired.toLowerCase().includes(term)
      );
    }
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-extrabold text-secondary">Waitlist Leads Admin Panel</h2>
            <p className="text-xs text-slate-400">View and download validation leads captured in this browser.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("tutors")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "tutors" ? "bg-white text-primary shadow-sm" : "text-slate-500"
                }`}
            >
              Tutors ({leads.tutors.length})
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "students" ? "bg-white text-primary shadow-sm" : "text-slate-500"
                }`}
            >
              Students / Requirements ({leads.students.length})
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 flex-1 sm:justify-end">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3.5 py-3 text-xs rounded-lg border border-slate-200 outline-none focus:border-primary max-w-xs w-full"
            />
            <button
              onClick={downloadJSON}
              className="inline-flex items-center gap-1.5 w-60 px-3.5 py-3.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>
            <button
              onClick={clearData}
              className="inline-flex items-center gap-1.5 w-60 px-3.5 py-3.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-all"
              title="Clear all leads"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          </div>
        </div>

        {/* Leads List / Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm font-semibold text-slate-400">No leads match your criteria.</p>
              <p className="text-xs text-slate-400">Submit registrations through the main landing forms to test.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-300 transition-all"
                >
                  {/* Title Bar */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {activeTab === "tutors" ? lead.fullName : lead.studentName}
                      </h4>
                      {activeTab === "students" && lead.parentName && (
                        <p className="text-[10px] text-slate-400">Parent: {lead.parentName}</p>
                      )}
                      <p className="text-[10px] text-primary font-semibold uppercase tracking-wider mt-0.5">
                        ID: {lead.id}
                      </p>
                    </div>
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Core Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-100 py-3">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{maskEmail(lead.email)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{maskPhone(lead.phone)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lead.city}</span>
                    </div>
                  </div>

                  {/* Class / Subject */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      {activeTab === "tutors" ? "Qualifications & Subjects" : "Needs & Grade"}
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-700 flex items-start gap-1">
                        <Award className="w-3.5 h-3.5 text-primary mt-0.5" />
                        <span>
                          {activeTab === "tutors"
                            ? `${lead.qualification} | Exp: ${lead.experience} yrs`
                            : `Class: ${lead.classGrade} | Budget: ${lead.budgetRange}`}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600">
                        {activeTab === "tutors" ? (
                          <>
                            <strong>Subjects:</strong> {lead.subjects}
                          </>
                        ) : (
                          <>
                            <strong>Subject needed:</strong> {lead.subjectRequired}
                          </>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        <strong>Mode:</strong> {lead.teachingMode}
                      </div>
                    </div>
                  </div>

                  {/* Intro/Requirements text */}
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 italic leading-relaxed border border-slate-100">
                    {activeTab === "tutors" ? lead.introduction : lead.additionalReqs || "No additional requirements provided."}
                  </div>

                  {/* Feedback survey answers */}
                  {(() => {
                    const fb = feedback.find((f) => f.leadId === lead.id);
                    if (!fb) return null;
                    return (
                      <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2 text-[11px] text-slate-600">
                        <p className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-indigo-100/50 pb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                          Waitlist Survey Responses
                        </p>
                        <div className="space-y-1.5">
                          {activeTab === "tutors" ? (
                            <>
                              <div>
                                <span className="font-semibold text-slate-500">Currently find students: </span>
                                <span className="text-slate-800 font-medium">{fb.q1 || "N/A"}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-slate-500">Paid for leads before? </span>
                                <span className="text-slate-800 font-medium">{fb.q2 || "N/A"}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-slate-500">Would use lead-free platform? </span>
                                <span className="text-slate-800 font-medium">{fb.q3 || "N/A"}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <span className="font-semibold text-slate-500">Currently find tutors: </span>
                                <span className="text-slate-800 font-medium">{fb.q1 || "N/A"}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-slate-500">Would use Project Tutor? </span>
                                <span className="text-slate-800 font-medium">{fb.q2 || "N/A"}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* LinkedIn if Tutor */}
                  {activeTab === "tutors" && lead.linkedin && (
                    <a
                      href={lead.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-blue-600 hover:underline font-semibold"
                    >
                      View LinkedIn Profile <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
