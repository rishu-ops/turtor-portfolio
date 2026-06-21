import React, { useState, useRef } from "react";
import { UserCheck, GraduationCap, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "../supabase";

export default function RegistrationForms({ activeTab, setActiveTab }) {
  const formRef = useRef(null);

  // Success state
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form errors state
  const [errors, setErrors] = useState({});

  // Tutor Form State
  const [tutorForm, setTutorForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    subjects: "",
    classes: "",
    teachingMode: "Online",
    experience: "",
    qualification: "",
    findStudents: "",
    paidLeads: "",
    useFreePlatform: "",
    linkedin: "",
    introduction: "",
  });

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    city: "",
    subjectRequired: "",
    classGrade: "",
    teachingMode: "Online",
    budgetRange: "",
    findTutors: "",
    useLaunchToday: "",
    additionalReqs: "",
  });

  // Handle Tab changes
  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setSuccessMsg("");
  };

  // Helper validation regex
  const validateName = (name) => {
    return /^[a-zA-Z\s]{3,50}$/.test(name.trim());
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    let clean = phone.replace(/[^0-9]/g, "");
    if (clean.length === 12 && clean.startsWith("91")) {
      clean = clean.substring(2);
    }
    return /^[6-9]\d{9}$/.test(clean);
  };

  const validateExperience = (exp) => {
    if (exp === null || exp === undefined || exp.toString().trim() === "") return false;
    const num = Number(exp);
    return Number.isInteger(num) && num >= 0 && num <= 50;
  };

  const validateLinkedinUrl = (url) => {
    if (!url) return true;
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes("linkedin.com");
    } catch (_) {
      return false;
    }
  };

  // Live validator for single fields
  const validateField = (name, value, formType) => {
    let errMsg = "";
    if (formType === "tutor") {
      if (name === "fullName") {
        if (!value.trim()) errMsg = "Full Name is required.";
        else if (!validateName(value)) errMsg = "Name must contain only letters and spaces (min 3 chars).";
      } else if (name === "email") {
        if (!value.trim()) errMsg = "Email Address is required.";
        else if (!validateEmail(value)) errMsg = "Please enter a valid email address.";
      } else if (name === "phone") {
        if (!value.trim()) errMsg = "Phone Number is required.";
        else if (!validatePhone(value)) errMsg = "Please enter a valid 10-digit mobile number.";
      } else if (name === "city") {
        if (!value.trim()) errMsg = "City is required.";
      } else if (name === "subjects") {
        if (!value.trim()) errMsg = "Please list the subjects you teach.";
      } else if (name === "classes") {
        if (!value.trim()) errMsg = "Please list the classes or grades you teach.";
      } else if (name === "experience") {
        if (value.toString().trim() === "") errMsg = "Years of experience is required.";
        else if (!validateExperience(value)) errMsg = "Experience must be a whole number between 0 and 50.";
      } else if (name === "qualification") {
        if (!value.trim()) errMsg = "Highest Qualification is required.";
      } else if (name === "linkedin") {
        if (value && !validateLinkedinUrl(value)) errMsg = "Please enter a valid LinkedIn profile URL (containing linkedin.com).";
      }
    } else {
      // student form type
      if (name === "studentName") {
        if (!value.trim()) errMsg = "Student Name is required.";
        else if (!validateName(value)) errMsg = "Name must contain only letters and spaces (min 3 chars).";
      } else if (name === "email") {
        if (!value.trim()) errMsg = "Email Address is required.";
        else if (!validateEmail(value)) errMsg = "Please enter a valid email address.";
      } else if (name === "phone") {
        if (!value.trim()) errMsg = "Phone Number is required.";
        else if (!validatePhone(value)) errMsg = "Please enter a valid 10-digit mobile number.";
      } else if (name === "city") {
        if (!value.trim()) errMsg = "City is required.";
      } else if (name === "subjectRequired") {
        if (!value.trim()) errMsg = "Please enter the subject required.";
      } else if (name === "classGrade") {
        if (!value.trim()) errMsg = "Class or Grade is required.";
      } else if (name === "budgetRange") {
        if (!value.trim()) errMsg = "Please specify a budget range.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errMsg }));
    return errMsg;
  };

  // Input change handlers
  const handleTutorChange = (e) => {
    const { name, value } = e.target;
    setTutorForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value, "tutor");
    }
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value, "student");
    }
  };

  // Tutor Submit
  const handleTutorSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate textual/input fields
    const fieldsToValidate = [
      "fullName", "email", "phone", "city", "subjects", "classes", "experience", "qualification", "linkedin"
    ];
    fieldsToValidate.forEach((field) => {
      const err = validateField(field, tutorForm[field], "tutor");
      if (err) newErrors[field] = err;
    });

    // Validate select button validation questions
    if (!tutorForm.findStudents) {
      newErrors.findStudents = "Please tell us how you currently find students.";
    }
    if (!tutorForm.paidLeads) {
      newErrors.paidLeads = "Please answer this question.";
    }
    if (!tutorForm.useFreePlatform) {
      newErrors.useFreePlatform = "Please answer this question.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        const errElement = document.getElementById(`err-${firstErrorKey}`);
        if (errElement) errElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    const leadId = "TUT-" + Date.now();

    (async () => {
      let supabaseError = null;
      try {
        const { error } = await supabase.from("tutors").insert([
          {
            full_name: tutorForm.fullName,
            phone: tutorForm.phone,
            email: tutorForm.email,
            city: tutorForm.city,
            subjects: tutorForm.subjects,
            classes: tutorForm.classes,
            teaching_mode: tutorForm.teachingMode,
            experience: Number(tutorForm.experience),
            qualification: tutorForm.qualification,
            linkedin: tutorForm.linkedin || null,
            introduction: tutorForm.introduction || null,
          }
        ]);
        if (error) supabaseError = error;
      } catch (err) {
        supabaseError = err;
        console.error("Supabase tutor insertion failed:", err);
      }

      // Save validation feedback to Supabase
      try {
        await supabase.from("feedback").insert([
          {
            lead_id: leadId,
            user_type: "tutor",
            q1: tutorForm.findStudents,
            q2: tutorForm.paidLeads,
            q3: tutorForm.useFreePlatform,
          }
        ]);
      } catch (err) {
        console.error("Supabase feedback insertion failed:", err);
      }

      // Save details to Local Storage
      const existingLeads = JSON.parse(localStorage.getItem("project_tutor_leads") || '{"tutors": [], "students": []}');
      const newLead = {
        id: leadId,
        fullName: tutorForm.fullName,
        phone: tutorForm.phone,
        email: tutorForm.email,
        city: tutorForm.city,
        subjects: tutorForm.subjects,
        classes: tutorForm.classes,
        teachingMode: tutorForm.teachingMode,
        experience: Number(tutorForm.experience),
        qualification: tutorForm.qualification,
        linkedin: tutorForm.linkedin,
        introduction: tutorForm.introduction,
        timestamp: new Date().toISOString(),
        synced: !supabaseError,
      };
      existingLeads.tutors.push(newLead);
      localStorage.setItem("project_tutor_leads", JSON.stringify(existingLeads));

      // Save feedback to Local Storage
      const existingFeedback = JSON.parse(localStorage.getItem("project_tutor_feedback") || "[]");
      existingFeedback.push({
        leadId: leadId,
        userType: "tutor",
        q1: tutorForm.findStudents,
        q2: tutorForm.paidLeads,
        q3: tutorForm.useFreePlatform,
        q4: "",
        q5: "",
        timestamp: new Date().toISOString(),
        synced: !supabaseError,
      });
      localStorage.setItem("project_tutor_feedback", JSON.stringify(existingFeedback));

      setIsSubmitting(false);
      setSuccessMsg("Congratulations! You have joined the Tutor Waitlist. We will reach out to you once verification starts.");
      
      // Reset Form
      setTutorForm({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        subjects: "",
        classes: "",
        teachingMode: "Online",
        experience: "",
        qualification: "",
        findStudents: "",
        paidLeads: "",
        useFreePlatform: "",
        linkedin: "",
        introduction: "",
      });
    })();
  };

  // Student/Parent Submit
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate textual/input fields
    const fieldsToValidate = [
      "studentName", "email", "phone", "city", "subjectRequired", "classGrade", "budgetRange"
    ];
    fieldsToValidate.forEach((field) => {
      const err = validateField(field, studentForm[field], "student");
      if (err) newErrors[field] = err;
    });

    // Validate survey validation questions
    if (!studentForm.findTutors) {
      newErrors.findTutors = "Please tell us how you currently find tutors.";
    }
    if (!studentForm.useLaunchToday) {
      newErrors.useLaunchToday = "Please answer this question.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        const errElement = document.getElementById(`err-${firstErrorKey}`);
        if (errElement) errElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    const leadId = "STU-" + Date.now();

    (async () => {
      let supabaseError = null;
      try {
        const { error } = await supabase.from("students").insert([
          {
            student_name: studentForm.studentName,
            parent_name: studentForm.parentName || null,
            phone: studentForm.phone,
            email: studentForm.email,
            city: studentForm.city,
            subject_required: studentForm.subjectRequired,
            class_grade: studentForm.classGrade,
            teaching_mode: studentForm.teachingMode,
            budget_range: studentForm.budgetRange,
            additional_reqs: studentForm.additionalReqs || null,
          }
        ]);
        if (error) supabaseError = error;
      } catch (err) {
        supabaseError = err;
        console.error("Supabase student insertion failed:", err);
      }

      // Save validation feedback to Supabase
      try {
        await supabase.from("feedback").insert([
          {
            lead_id: leadId,
            user_type: "student",
            q1: studentForm.findTutors,
            q2: studentForm.useLaunchToday,
          }
        ]);
      } catch (err) {
        console.error("Supabase feedback insertion failed:", err);
      }

      // Save details to Local Storage
      const existingLeads = JSON.parse(localStorage.getItem("project_tutor_leads") || '{"tutors": [], "students": []}');
      const newLead = {
        id: leadId,
        studentName: studentForm.studentName,
        parentName: studentForm.parentName,
        phone: studentForm.phone,
        email: studentForm.email,
        city: studentForm.city,
        subjectRequired: studentForm.subjectRequired,
        classGrade: studentForm.classGrade,
        teachingMode: studentForm.teachingMode,
        budgetRange: studentForm.budgetRange,
        additionalReqs: studentForm.additionalReqs,
        timestamp: new Date().toISOString(),
        synced: !supabaseError,
      };
      existingLeads.students.push(newLead);
      localStorage.setItem("project_tutor_leads", JSON.stringify(existingLeads));

      // Save feedback to Local Storage
      const existingFeedback = JSON.parse(localStorage.getItem("project_tutor_feedback") || "[]");
      existingFeedback.push({
        leadId: leadId,
        userType: "student",
        q1: studentForm.findTutors,
        q2: studentForm.useLaunchToday,
        q3: "",
        q4: "",
        q5: "",
        timestamp: new Date().toISOString(),
        synced: !supabaseError,
      });
      localStorage.setItem("project_tutor_feedback", JSON.stringify(existingFeedback));

      setIsSubmitting(false);
      setSuccessMsg("Your requirement has been posted successfully! Tutors matching your needs will be notified once matching goes live.");
      
      // Reset Form
      setStudentForm({
        studentName: "",
        parentName: "",
        phone: "",
        email: "",
        city: "",
        subjectRequired: "",
        classGrade: "",
        teachingMode: "Online",
        budgetRange: "",
        findTutors: "",
        useLaunchToday: "",
        additionalReqs: "",
      });
    })();
  };

  return (
    <section id="registration-forms" ref={formRef} className="py-24 bg-slate-50 relative scroll-mt-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Toggle Nav */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-200/60 backdrop-blur rounded-2xl border border-slate-300/30">
            <button
              type="button"
              onClick={() => switchTab("tutor")}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 ${
                activeTab === "tutor"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-secondary"
              }`}
            >
              <GraduationCap className="w-4.5 h-4.5" />
              Join as a Tutor
            </button>
            <button
              type="button"
              onClick={() => switchTab("student")}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 ${
                activeTab === "student"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-secondary"
              }`}
            >
              <UserCheck className="w-4.5 h-4.5" />
              Looking For a Tutor?
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          
          {/* Header Message */}
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-extrabold text-secondary tracking-tight">
              {activeTab === "tutor" ? "Join the Tutor Waitlist" : "Post a Learning Requirement"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {activeTab === "tutor"
                ? "Help us build a fairer alternative. Fill in your professional details to get verified early."
                : "Looking for an expert local or online tutor? Let us know what you need. Zero matching commissions."}
            </p>
          </div>

          {/* Toast Alert Success */}
          {successMsg && (
            <div className="mb-6 p-4.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start gap-3">
              <CheckCircle className="w-5.5 h-5.5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm font-medium">
                {successMsg}
              </div>
            </div>
          )}

          {/* Form */}
          {activeTab === "tutor" ? (
            /* ============ TUTOR FORM ============ */
            <form onSubmit={handleTutorSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={tutorForm.fullName}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("fullName", e.target.value, "tutor")}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.fullName
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={tutorForm.email}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("email", e.target.value, "tutor")}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={tutorForm.phone}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("phone", e.target.value, "tutor")}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.phone
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={tutorForm.city}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("city", e.target.value, "tutor")}
                    placeholder="e.g. Kotdwar, Dehradun"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.city
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Subjects You Teach */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Subjects You Teach *</label>
                  <input
                    type="text"
                    name="subjects"
                    value={tutorForm.subjects}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("subjects", e.target.value, "tutor")}
                    placeholder="e.g. Mathematics, Python, Physics"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.subjects
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.subjects && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.subjects}
                    </p>
                  )}
                </div>

                {/* Classes You Teach */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Classes/Grades You Teach *</label>
                  <input
                    type="text"
                    name="classes"
                    value={tutorForm.classes}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("classes", e.target.value, "tutor")}
                    placeholder="e.g. Class 9-10, B.Tech, Class 11-12"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.classes
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.classes && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.classes}
                    </p>
                  )}
                </div>

                {/* Teaching Mode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Teaching Mode *</label>
                  <select
                    name="teachingMode"
                    value={tutorForm.teachingMode}
                    onChange={handleTutorChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Online">Online</option>
                    <option value="Home Tuition">Home Tuition</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                {/* Years of Experience */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Years of Experience *</label>
                  <input
                    type="number"
                    name="experience"
                    value={tutorForm.experience}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("experience", e.target.value, "tutor")}
                    placeholder="e.g. 3"
                    min="0"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.experience
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.experience && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Highest Qualification */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Highest Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    value={tutorForm.qualification}
                    onChange={handleTutorChange}
                    onBlur={(e) => validateField("qualification", e.target.value, "tutor")}
                    placeholder="e.g. M.Sc Mathematics, B.Tech CSE"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.qualification
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.qualification && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.qualification}
                    </p>
                  )}
                </div>

                {/* Validation Questions Section */}
                <div id="err-findStudents" className="col-span-1 sm:col-span-2 mt-4 pt-6 border-t border-slate-200 space-y-6">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
                    <span>Demand Validation Survey</span>
                  </div>

                  {/* Q1: How do you currently find students? */}
                  <div className={`space-y-2.5 p-4.5 rounded-2xl border transition-all ${
                    errors.findStudents ? "border-red-300 bg-red-50/15" : "border-transparent"
                  }`}>
                    <label className="text-xs font-bold text-slate-800 block">How do you currently find students? *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["UrbanPro", "Superprof", "Justdial", "Social Media", "Word of Mouth", "Other"].map((opt) => {
                        const isSelected = tutorForm.findStudents === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setTutorForm((prev) => ({ ...prev, findStudents: opt }));
                              setErrors((prev) => ({ ...prev, findStudents: "" }));
                            }}
                            className={`px-4 py-3 rounded-xl border text-xs font-semibold text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-primary/5 border-primary text-primary shadow-sm"
                                : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100/80 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {errors.findStudents && (
                      <p className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.findStudents}
                      </p>
                    )}
                  </div>

                  {/* Q2: Have you ever paid for student leads? */}
                  <div id="err-paidLeads" className={`space-y-2.5 p-4.5 rounded-2xl border transition-all ${
                    errors.paidLeads ? "border-red-300 bg-red-50/15" : "border-transparent"
                  }`}>
                    <label className="text-xs font-bold text-slate-800 block">Have you ever paid for student leads? *</label>
                    <div className="flex gap-2">
                      {["Yes", "No"].map((opt) => {
                        const isSelected = tutorForm.paidLeads === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setTutorForm((prev) => ({ ...prev, paidLeads: opt }));
                              setErrors((prev) => ({ ...prev, paidLeads: "" }));
                            }}
                            className={`px-6 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                              isSelected
                                ? "bg-primary/5 border-primary text-primary shadow-sm"
                                : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100/80 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {errors.paidLeads && (
                      <p className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.paidLeads}
                      </p>
                    )}
                  </div>

                  {/* Q3: Would you use a platform where students post requirements and tutors apply directly? */}
                  <div id="err-useFreePlatform" className={`space-y-2.5 p-4.5 rounded-2xl border transition-all ${
                    errors.useFreePlatform ? "border-red-300 bg-red-50/15" : "border-transparent"
                  }`}>
                    <label className="text-xs font-bold text-slate-800 block">Would you use a platform where students post requirements and tutors apply directly without purchasing leads? *</label>
                    <div className="flex gap-2 flex-wrap">
                      {["Yes", "Maybe", "No"].map((opt) => {
                        const isSelected = tutorForm.useFreePlatform === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setTutorForm((prev) => ({ ...prev, useFreePlatform: opt }));
                              setErrors((prev) => ({ ...prev, useFreePlatform: "" }));
                            }}
                            className={`px-6 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                              isSelected
                                ? "bg-primary/5 border-primary text-primary shadow-sm"
                                : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100/80 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {errors.useFreePlatform && (
                      <p className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.useFreePlatform}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* LinkedIn URL (Optional) */}
              <div className="space-y-1.5 mt-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700">LinkedIn Profile (Optional)</label>
                <input
                  type="url"
                  name="linkedin"
                  value={tutorForm.linkedin}
                  onChange={handleTutorChange}
                  onBlur={(e) => validateField("linkedin", e.target.value, "tutor")}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                />
              </div>

              {/* Introduction (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Short Introduction (Optional)</label>
                <textarea
                  name="introduction"
                  rows="3"
                  value={tutorForm.introduction}
                  onChange={handleTutorChange}
                  placeholder="Introduce yourself, your teaching methodology, and your background..."
                  className="w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 active:scale-[0.98] disabled:bg-slate-400 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting waitlist request...
                  </>
                ) : (
                  "Join Tutor Waitlist"
                )}
              </button>
            </form>
          ) : (
            /* ============ STUDENT/PARENT FORM ============ */
            <form onSubmit={handleStudentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Student Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={studentForm.studentName}
                    onChange={handleStudentChange}
                    onBlur={(e) => validateField("studentName", e.target.value, "student")}
                    placeholder="Enter student's name"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.studentName
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.studentName && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.studentName}
                    </p>
                  )}
                </div>

                {/* Parent Name (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Parent Name (Optional)</label>
                  <input
                    type="text"
                    name="parentName"
                    value={studentForm.parentName}
                    onChange={handleStudentChange}
                    placeholder="Enter parent's name"
                    className="w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={studentForm.email}
                    onChange={handleStudentChange}
                    onBlur={(e) => validateField("email", e.target.value, "student")}
                    placeholder="email@domain.com"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={studentForm.phone}
                    onChange={handleStudentChange}
                    onBlur={(e) => validateField("phone", e.target.value, "student")}
                    placeholder="10-digit phone number"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.phone
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={studentForm.city}
                    onChange={handleStudentChange}
                    onBlur={(e) => validateField("city", e.target.value, "student")}
                    placeholder="e.g. Kotdwar, Dehradun"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.city
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Subject Required */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Subject Required *</label>
                  <input
                    type="text"
                    name="subjectRequired"
                    value={studentForm.subjectRequired}
                    onChange={handleStudentChange}
                    onBlur={(e) => validateField("subjectRequired", e.target.value, "student")}
                    placeholder="e.g. Mathematics, Chemistry"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.subjectRequired
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.subjectRequired && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.subjectRequired}
                    </p>
                  )}
                </div>

                {/* Class / Grade */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Class / Grade *</label>
                  <input
                    type="text"
                    name="classGrade"
                    value={studentForm.classGrade}
                    onChange={handleStudentChange}
                    onBlur={(e) => validateField("classGrade", e.target.value, "student")}
                    placeholder="e.g. Class 10, Class 12, JEE Preparation"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.classGrade
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.classGrade && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.classGrade}
                    </p>
                  )}
                </div>

                {/* Preferred Teaching Mode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Preferred Teaching Mode *</label>
                  <select
                    name="teachingMode"
                    value={studentForm.teachingMode}
                    onChange={handleStudentChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Online">Online</option>
                    <option value="Home Tuition">Home Tuition</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Budget Range *</label>
                  <input
                    type="text"
                    name="budgetRange"
                    value={studentForm.budgetRange}
                    onChange={handleStudentChange}
                    onBlur={(e) => validateField("budgetRange", e.target.value, "student")}
                    placeholder="e.g. ₹500 - ₹800 / hour, or ₹10,000 / month"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                      errors.budgetRange
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
                        : "border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.budgetRange && (
                    <p className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.budgetRange}
                    </p>
                  )}
                </div>

                {/* Validation Questions Section */}
                <div id="err-findTutors" className="col-span-1 sm:col-span-2 mt-4 pt-6 border-t border-slate-200 space-y-6">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
                    <span>Demand Validation Survey</span>
                  </div>

                  {/* Q1: How do you currently find tutors? */}
                  <div className={`space-y-2.5 p-4.5 rounded-2xl border transition-all ${
                    errors.findTutors ? "border-red-300 bg-red-50/15" : "border-transparent"
                  }`}>
                    <label className="text-xs font-bold text-slate-800 block">How do you currently find tutors? *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Google", "UrbanPro", "Friends & Family", "Coaching Center", "Social Media", "Other"].map((opt) => {
                        const isSelected = studentForm.findTutors === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setStudentForm((prev) => ({ ...prev, findTutors: opt }));
                              setErrors((prev) => ({ ...prev, findTutors: "" }));
                            }}
                            className={`px-4 py-3 rounded-xl border text-xs font-semibold text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-primary/5 border-primary text-primary shadow-sm"
                                : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100/80 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {errors.findTutors && (
                      <p className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.findTutors}
                      </p>
                    )}
                  </div>

                  {/* Q2: Would you use Project Tutor if it launched today? */}
                  <div id="err-useLaunchToday" className={`space-y-2.5 p-4.5 rounded-2xl border transition-all ${
                    errors.useLaunchToday ? "border-red-300 bg-red-50/15" : "border-transparent"
                  }`}>
                    <label className="text-xs font-bold text-slate-800 block">Would you use Project Tutor if it launched today? *</label>
                    <div className="flex gap-2">
                      {["Yes", "Maybe", "No"].map((opt) => {
                        const isSelected = studentForm.useLaunchToday === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setStudentForm((prev) => ({ ...prev, useLaunchToday: opt }));
                              setErrors((prev) => ({ ...prev, useLaunchToday: "" }));
                            }}
                            className={`px-6 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                              isSelected
                                ? "bg-primary/5 border-primary text-primary shadow-sm"
                                : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100/80 hover:border-slate-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {errors.useLaunchToday && (
                      <p className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.useLaunchToday}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Requirements (Optional) */}
              <div className="space-y-1.5 mt-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700">Additional Requirements (Optional)</label>
                <textarea
                  name="additionalReqs"
                  rows="3"
                  value={studentForm.additionalReqs}
                  onChange={handleStudentChange}
                  placeholder="Specify teaching timing preferences, particular topics, gender preferences, or specific goals..."
                  className="w-full px-4 py-3 text-sm rounded-xl border bg-slate-50 border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 active:scale-[0.98] disabled:bg-slate-400 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Posting Requirement...
                  </>
                ) : (
                  "Post Requirement"
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
