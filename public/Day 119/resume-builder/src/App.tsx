import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import './index.css';
import html2canvas from "html2canvas";
import { 
  Brain, Sparkles, Target, FileText, Download, Plus, 
  Trash2, Edit3, CheckCircle, AlertCircle, Zap, 
  Star, Search, LayoutTemplate, BarChart3, Shield,
  Mail, Phone, MapPin, Linkedin, Github, Globe,
  Award, Briefcase, GraduationCap, Code, Users,
  Clock, Eye, Copy, Upload, RefreshCw
} from "lucide-react";

// AI Job Role Library with ATS Keywords
const JOB_LIBRARY = {
  "AI_ENGINEER": {
    title: "AI/ML Engineer",
    keywords: ["Python", "TensorFlow", "PyTorch", "NLP", "LLM", "CNN", "Federated Learning", "OpenCV", "Scikit-Learn", "Deep Learning", "Neural Networks"],
    description: "Machine Learning, Computer Vision, Natural Language Processing"
  },
  "FULL_STACK": {
    title: "Full Stack Developer",
    keywords: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Docker", "AWS", "REST API", "Next.js", "GraphQL", "Redux"],
    description: "Web Development, Backend Systems, Cloud Infrastructure"
  },
  "DATA_SCIENCE": {
    title: "Data Scientist",
    keywords: ["Python", "R", "SQL", "Pandas", "NumPy", "Statistics", "Machine Learning", "Data Visualization", "Big Data", "Hadoop", "Spark"],
    description: "Data Analysis, Statistical Modeling, Business Intelligence"
  },
  "CLOUD_ENGINEER": {
    title: "Cloud Engineer",
    keywords: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "Networking", "Security", "DevOps"],
    description: "Cloud Infrastructure, DevOps, System Architecture"
  }
};

// Resume Templates
const RESUME_TEMPLATES = [
  { id: "modern", name: "Modern Professional", color: "#3b82f6" },
  { id: "minimal", name: "Clean Minimal", color: "#10b981" },
  { id: "creative", name: "Creative Design", color: "#8b5cf6" },
  { id: "executive", name: "Executive", color: "#f59e0b" }
];

interface ResumeItem {
  id: string;
  title: string;
  subtitle: string;
  fromYear: string;
  toYear: string;
  description: string;
  bulletPoints?: string[];
}

interface AIAnalysis {
  atsScore: number;
  missingKeywords: string[];
  suggestions: string[];
  grammarIssues: string[];
  jobMatch: number;
  estimatedReadTime: number;
}

const ResumeBuilder = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"build" | "analyze" | "templates" | "export">("build");
  const [selectedJob, setSelectedJob] = useState<keyof typeof JOB_LIBRARY>("AI_ENGINEER");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis>({
    atsScore: 0,
    missingKeywords: [],
    suggestions: [],
    grammarIssues: [],
    jobMatch: 0,
    estimatedReadTime: 0
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    title: "",
    summary: "",
  });

  const [internships, setInternships] = useState<ResumeItem[]>([]);
  const [education, setEducation] = useState<ResumeItem[]>([]);
  const [projects, setProjects] = useState<ResumeItem[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<ResumeItem[]>([]);

  // AI Analysis Effect
  useEffect(() => {
    const analyzeResume = () => {
      const content = `
        ${formData.summary} 
        ${formData.title}
        ${skills.join(" ")}
        ${internships.map(i => i.description).join(" ")}
        ${projects.map(p => p.description).join(" ")}
      `.toLowerCase();

      const jobKeywords = JOB_LIBRARY[selectedJob].keywords;
      const matches = jobKeywords.filter(keyword => 
        content.includes(keyword.toLowerCase())
      );

      const atsScore = (matches.length / jobKeywords.length) * 60;
      const missingKeywords = jobKeywords.filter(k => !content.includes(k.toLowerCase()));
      
      const sectionScore = 
        (education.length > 0 ? 10 : 0) +
        (internships.length > 0 ? 10 : 0) +
        (projects.length > 0 ? 15 : 0) +
        (certifications.length > 0 ? 5 : 0);

      const totalScore = Math.min(100, Math.round(atsScore + sectionScore));
      
      setAiAnalysis(prev => ({
        ...prev,
        atsScore: totalScore,
        missingKeywords: missingKeywords.slice(0, 5),
        jobMatch: Math.min(100, totalScore + 10),
        estimatedReadTime: Math.max(30, Math.round(content.length / 1500))
      }));
    };

    analyzeResume();
  }, [formData, skills, internships, education, projects, certifications, selectedJob]);

  const addSection = (setter: React.Dispatch<React.SetStateAction<ResumeItem[]>>) => {
    setter(prev => [...prev, { 
      id: Date.now().toString(), 
      title: "", 
      subtitle: "", 
      fromYear: "", 
      toYear: "", 
      description: "",
      bulletPoints: []
    }]);
  };

  const removeSection = (id: string, setter: React.Dispatch<React.SetStateAction<ResumeItem[]>>) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  const updateSection = (
    id: string, 
    field: string, 
    value: string | string[], 
    setter: React.Dispatch<React.SetStateAction<ResumeItem[]>>
  ) => {
    setter(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addBulletPoint = (id: string, setter: React.Dispatch<React.SetStateAction<ResumeItem[]>>) => {
    setter(prev => prev.map(item => 
      item.id === id ? { 
        ...item, 
        bulletPoints: [...(item.bulletPoints || []), ""] 
      } : item
    ));
  };

  const updateBulletPoint = (
    itemId: string, 
    bulletIndex: number, 
    value: string,
    setter: React.Dispatch<React.SetStateAction<ResumeItem[]>>
  ) => {
    setter(prev => prev.map(item => 
      item.id === itemId ? {
        ...item,
        bulletPoints: (item.bulletPoints || []).map((bp, idx) => 
          idx === bulletIndex ? value : bp
        )
      } : item
    ));
  };

  const downloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;
    
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save(`${formData.name.replace(/\s+/g, "_") || "Resume"}_Resume.pdf`);
  };

  const exportToDocx = () => {
    alert("DOCX export feature would be implemented with a library like docx.js");
  };

  const copyToClipboard = async () => {
    const resumeText = `
      ${formData.name}
      ${formData.title}
      ${formData.summary}
      
      SKILLS: ${skills.join(", ")}
      
      EXPERIENCE:
      ${internships.map(i => `${i.subtitle} at ${i.title} (${i.fromYear}-${i.toYear})\n${i.description}`).join("\n\n")}
      
      EDUCATION:
      ${education.map(e => `${e.subtitle} at ${e.title} (${e.fromYear}-${e.toYear})\n${e.description}`).join("\n\n")}
      
      PROJECTS:
      ${projects.map(p => `${p.title} (${p.fromYear})\n${p.description}`).join("\n\n")}
      
      CERTIFICATIONS:
      ${certifications.map(c => `${c.title} - ${c.subtitle} (${c.fromYear}-${c.toYear})`).join("\n")}
    `;
    
    await navigator.clipboard.writeText(resumeText);
    alert("Resume copied to clipboard!");
  };

  const generateAIRecommendations = () => {
    const newSuggestions = [
      "Add more quantifiable achievements",
      "Include specific project metrics",
      "Optimize keyword placement in summary",
      "Add industry-specific certifications",
      "Use action verbs in descriptions",
      "Keep bullet points concise and impactful"
    ];
    
    const randomSuggestions = newSuggestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setAiAnalysis(prev => ({
      ...prev,
      suggestions: [...prev.suggestions, ...randomSuggestions].slice(0, 5)
    }));
    
    alert("AI recommendations generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-gray-900 text-gray-200 p-4 lg:p-8 font-sans">
      <div className="max-w-[2000px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT SIDEBAR - Controls & Analysis */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Header */}
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Brain className="text-cyan-400" size={24} />
                <h1 className="text-2xl font-bold text-white">AI Resume Builder</h1>
              </div>
              <Sparkles className="text-yellow-400" size={20} />
            </div>
            
            {/* Job Role Selector */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-cyan-300">
                <Target className="inline mr-2" size={16} />
                Target Job Role
              </label>
              <select 
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value as keyof typeof JOB_LIBRARY)}
              >
                {Object.entries(JOB_LIBRARY).map(([key, job]) => (
                  <option key={key} value={key}>{job.title}</option>
                ))}
              </select>
              <p className="text-sm text-gray-400 mt-1">{JOB_LIBRARY[selectedJob].description}</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-2 mb-4">
              {[
                { id: "build", icon: <Edit3 size={16} />, label: "Build" },
                { id: "analyze", icon: <BarChart3 size={16} />, label: "AI Analyze" },
                { id: "templates", icon: <LayoutTemplate size={16} />, label: "Templates" },
                { id: "export", icon: <Download size={16} />, label: "Export" }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? "bg-cyan-600 text-white" 
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Analysis Panel */}
          {activeTab === "analyze" && (
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Brain className="text-green-400" size={20} />
                  AI Analysis
                </h2>
                <button 
                  onClick={generateAIRecommendations}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <RefreshCw size={14} />
                  Get AI Tips
                </button>
              </div>

              {/* Score Overview */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-900/50 p-3 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">ATS Score</span>
                    <Shield className="text-blue-400" size={16} />
                  </div>
                  <div className="text-2xl font-bold text-white">{aiAnalysis.atsScore}%</div>
                  <div className="h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                      style={{ width: `${aiAnalysis.atsScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gray-900/50 p-3 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Job Match</span>
                    <Target className="text-green-400" size={16} />
                  </div>
                  <div className="text-2xl font-bold text-white">{aiAnalysis.jobMatch}%</div>
                  <div className="h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                      style={{ width: `${aiAnalysis.jobMatch}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Missing Keywords */}
              {aiAnalysis.missingKeywords.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-300">Missing Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {aiAnalysis.missingKeywords.map((keyword, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Suggestions */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-300 flex items-center gap-2">
                  <Sparkles className="text-yellow-400" size={16} />
                  AI Suggestions
                </h3>
                {aiAnalysis.suggestions.length > 0 ? (
                  <div className="space-y-2">
                    {aiAnalysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-gray-900/30 rounded-lg">
                        <CheckCircle className="text-green-400 mt-0.5" size={14} />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic p-3 bg-gray-900/30 rounded-lg">
                    No suggestions yet. Click "Get AI Tips" for recommendations.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Template Selector */}
          {activeTab === "templates" && (
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <LayoutTemplate className="text-purple-400" size={20} />
                Choose Template
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {RESUME_TEMPLATES.map(template => (
                  <button
                    key={template.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTemplate === template.id 
                        ? "border-purple-500 bg-purple-500/10" 
                        : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: template.color }}
                      />
                      <span className="text-xs font-semibold">{template.name}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-700 rounded"></div>
                      <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Export Options */}
          {activeTab === "export" && (
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-orange-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Download className="text-orange-400" size={20} />
                Export Resume
              </h2>
              <div className="space-y-3">
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                >
                  <FileText size={18} />
                  Download PDF (High Quality)
                </button>
                <button
                  onClick={exportToDocx}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
                >
                  <FileText size={18} />
                  Export as DOCX (Editable)
                </button>
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                >
                  <Copy size={18} />
                  Copy as Plain Text
                </button>
                <button
                  className="w-full flex items-center justify-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 font-medium transition-colors"
                >
                  <Upload size={18} />
                  Save to Cloud
                </button>
              </div>
            </div>
          )}

          {/* Build Form Sections */}
          {activeTab === "build" && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Personal Information */}
              <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/50">
                <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Users size={16} />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <input
                    placeholder="Full Name *"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="Email"
                      type="email"
                      className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                      placeholder="Phone"
                      className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <input
                    placeholder="Job Title *"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                  <textarea
                    placeholder="Professional Summary"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-24 resize-none"
                    value={formData.summary}
                    onChange={e => setFormData({...formData, summary: e.target.value})}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/50">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code size={16} />
                    Skills
                  </h2>
                  <button
                    onClick={() => setSkills([...skills, ""])}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={skill}
                        onChange={e => {
                          const newSkills = [...skills];
                          newSkills[index] = e.target.value;
                          setSkills(newSkills);
                        }}
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Add skill"
                      />
                      <button
                        onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                        className="p-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-gray-400 text-sm italic">
                      Click the + button to add your first skill
                    </p>
                  )}
                </div>
              </div>

              {/* Dynamic Sections Generator */}
              {[
                {
                  label: "Work Experience",
                  icon: <Briefcase size={16} />,
                  data: internships,
                  setter: setInternships,
                  placeholder1: "Company",
                  placeholder2: "Position"
                },
                {
                  label: "Education",
                  icon: <GraduationCap size={16} />,
                  data: education,
                  setter: setEducation,
                  placeholder1: "Institution",
                  placeholder2: "Degree"
                },
                {
                  label: "Projects",
                  icon: <Code size={16} />,
                  data: projects,
                  setter: setProjects,
                  placeholder1: "Project Name",
                  placeholder2: "Technologies"
                },
                {
                  label: "Certifications",
                  icon: <Award size={16} />,
                  data: certifications,
                  setter: setCertifications,
                  placeholder1: "Certification",
                  placeholder2: "Issuing Organization"
                }
              ].map(section => (
                <div key={section.label} className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/50">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      {section.icon}
                      {section.label}
                    </h2>
                    <button
                      onClick={() => addSection(section.setter)}
                      className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                  
                  {section.data.length > 0 ? (
                    section.data.map(item => (
                      <div key={item.id} className="p-4 bg-gray-900/50 rounded-xl mb-3 border border-gray-700/30">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-semibold text-white">Entry</h3>
                          <button
                            onClick={() => removeSection(item.id, section.setter)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <input
                            placeholder={section.placeholder1}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                            value={item.title}
                            onChange={e => updateSection(item.id, "title", e.target.value, section.setter)}
                          />
                          <input
                            placeholder={section.placeholder2}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                            value={item.subtitle}
                            onChange={e => updateSection(item.id, "subtitle", e.target.value, section.setter)}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              placeholder="From"
                              className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                              value={item.fromYear}
                              onChange={e => updateSection(item.id, "fromYear", e.target.value, section.setter)}
                            />
                            <input
                              placeholder="To"
                              className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                              value={item.toYear}
                              onChange={e => updateSection(item.id, "toYear", e.target.value, section.setter)}
                            />
                          </div>
                          <textarea
                            placeholder="Description"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-cyan-500 focus:border-transparent resize-none h-20"
                            value={item.description}
                            onChange={e => updateSection(item.id, "description", e.target.value, section.setter)}
                          />
                          
                          {/* Bullet Points */}
                          {(section.label === "Work Experience" || section.label === "Projects") && (
                            <div className="mt-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-medium text-gray-400">Achievements</span>
                                <button
                                  onClick={() => addBulletPoint(item.id, section.setter)}
                                  className="text-xs text-cyan-400 hover:text-cyan-300"
                                >
                                  Add Bullet
                                </button>
                              </div>
                              {(item.bulletPoints || []).map((bullet, bIndex) => (
                                <div key={bIndex} className="flex items-start gap-2 mb-1">
                                  <span className="text-cyan-400 mt-1">•</span>
                                  <input
                                    value={bullet}
                                    onChange={e => updateBulletPoint(item.id, bIndex, e.target.value, section.setter)}
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="Add achievement"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm italic p-3 bg-gray-900/30 rounded-lg">
                      Click "Add" to add your first {section.label.toLowerCase()} entry
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL - Resume Preview */}
        <div className="xl:col-span-8">
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 h-full">
            {/* Preview Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Live Resume Preview</h2>
                <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <Eye size={14} />
                  ATS-friendly design
                  {aiAnalysis.estimatedReadTime > 0 && (
                    <span className="ml-2 flex items-center gap-1">
                      <Clock size={12} />
                      {aiAnalysis.estimatedReadTime}s read time
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-lg">
                  <Star className="text-yellow-400" size={14} />
                  <span className="text-sm font-medium">{aiAnalysis.atsScore}% ATS</span>
                </div>
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-medium transition-colors"
                  disabled={!formData.name || !formData.title}
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>

            {/* Resume Preview Container */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <div 
                ref={resumeRef}
                className="bg-white text-gray-800 p-8 md:p-12"
                style={{
                  fontFamily: selectedTemplate === "minimal" ? "'Inter', sans-serif" : "'Calibri', sans-serif",
                  minHeight: '297mm'
                }}
              >
                {/* Resume Header */}
                <div className={`pb-6 mb-6 ${
                  selectedTemplate === "modern" ? "border-b-4 border-cyan-600" :
                  selectedTemplate === "executive" ? "border-b-2 border-gray-300" : ""
                }`}>
                  <h1 className={`font-bold text-gray-900 ${
                    selectedTemplate === "modern" ? "text-4xl" :
                    selectedTemplate === "executive" ? "text-3xl uppercase" : "text-3xl"
                  }`}>
                    {formData.name || "Your Name"}
                  </h1>
                  <h2 className={`font-semibold mt-2 ${
                    selectedTemplate === "modern" ? "text-cyan-600 text-lg" :
                    selectedTemplate === "executive" ? "text-gray-600 text-base" : "text-gray-700 text-base"
                  }`}>
                    {formData.title || "Your Job Title"}
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    {formData.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {formData.email}
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {formData.phone}
                      </div>
                    )}
                    {formData.linkedin && (
                      <div className="flex items-center gap-2">
                        <Linkedin size={14} />
                        {formData.linkedin}
                      </div>
                    )}
                    {(!formData.email && !formData.phone && !formData.linkedin) && (
                      <p className="text-gray-400 italic">Add contact information</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Skills */}
                    {skills.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold uppercase text-gray-900 mb-3 border-l-4 border-cyan-600 pl-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.filter(s => s.trim()).map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold uppercase text-gray-900 mb-3 border-l-4 border-cyan-600 pl-2">
                          Education
                        </h3>
                        {education.map(edu => (
                          <div key={edu.id} className="mb-4">
                            <h4 className="font-semibold text-gray-900">{edu.subtitle}</h4>
                            <p className="text-sm text-gray-600">{edu.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{edu.fromYear} - {edu.toYear}</p>
                            {edu.description && (
                              <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                            )}
                          </div>
                        ))}
                      </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold uppercase text-gray-900 mb-3 border-l-4 border-cyan-600 pl-2">
                          Certifications
                        </h3>
                        {certifications.map(cert => (
                          <div key={cert.id} className="mb-3">
                            <h4 className="font-semibold text-sm text-gray-900">{cert.title}</h4>
                            <p className="text-xs text-gray-600">{cert.subtitle}</p>
                            <p className="text-xs text-gray-500">{cert.fromYear} - {cert.toYear}</p>
                          </div>
                        ))}
                      </section>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Summary */}
                    {formData.summary && (
                      <section>
                        <h3 className="text-sm font-bold uppercase text-gray-900 mb-3 border-l-4 border-cyan-600 pl-2">
                          Professional Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
                      </section>
                    )}

                    {/* Work Experience */}
                    {internships.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold uppercase text-gray-900 mb-3 border-l-4 border-cyan-600 pl-2">
                          Work Experience
                        </h3>
                        {internships.map(exp => (
                          <div key={exp.id} className="mb-5">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-900">{exp.subtitle}</h4>
                                <p className="text-cyan-600 font-medium">{exp.title}</p>
                              </div>
                              <span className="text-sm text-gray-500 font-medium">
                                {exp.fromYear} - {exp.toYear}
                              </span>
                            </div>
                            <p className="text-gray-700 mt-2">{exp.description}</p>
                            {(exp.bulletPoints || []).length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {(exp.bulletPoints || []).map((bullet, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-cyan-600 mr-2">•</span>
                                    <span className="text-gray-700">{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold uppercase text-gray-900 mb-3 border-l-4 border-cyan-600 pl-2">
                          Projects
                        </h3>
                        {projects.map(proj => (
                          <div key={proj.id} className="mb-5">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-gray-900">{proj.title}</h4>
                              <span className="text-sm text-gray-500">{proj.fromYear}</span>
                            </div>
                            <p className="text-cyan-600 text-sm font-medium mt-1">{proj.subtitle}</p>
                            <p className="text-gray-700 mt-2">{proj.description}</p>
                            {(proj.bulletPoints || []).length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {(proj.bulletPoints || []).map((bullet, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-cyan-600 mr-2">•</span>
                                    <span className="text-gray-700">{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </section>
                    )}

                    {/* Empty State Message */}
                    {!formData.summary && internships.length === 0 && projects.length === 0 && education.length === 0 && skills.length === 0 && certifications.length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        <FileText size={48} className="mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-semibold mb-2">Empty Resume</h3>
                        <p>Start building your resume by filling in the form on the left</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Footer Stats */}
            <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap size={14} />
                  <span>Keyword Density: {Math.round(aiAnalysis.atsScore/2)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} />
                  <span>{skills.length} Skills</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} />
                <span>ATS Optimized: {aiAnalysis.atsScore >= 70 ? "✓" : "Needs improvement"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            height: 297mm;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;