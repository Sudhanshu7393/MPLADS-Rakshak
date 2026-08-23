import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Database, 
  AlertTriangle, 
  FileText, 
  Camera, 
  ArrowRight, 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Search,
  ExternalLink,
  History,
  TrendingUp,
  Coins,
  AlertOctagon,
  Sparkles,
  Compass,
  FileCheck
} from "lucide-react";
import { api } from "../services/api";
import { formatINR } from "../utils/formatters";
import RiskScoreBadge from "../components/RiskScoreBadge";

export default function LandingHomePage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("HIGH_RISK");
  const navigate = useNavigate();

  useEffect(() => {
    api.getDashboardSummary()
      .then(data => setSummary(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/queue?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/queue");
    }
  };

  const totalWorks = summary?.totalWorks || 3013;
  const highRisk = summary?.highRiskCount || 294;
  const totalCost = summary?.totalSanctionedAmount || 5931310000;
  const recentWorks = summary?.recentHighRiskWorks || [];

  return (
    <div className="w-full bg-[#F4F6F9] min-h-screen text-slate-800 font-sans pb-16">
      
      {/* 1. NATIONAL HERO BANNER (Clean, Grand, Spacious Indian Gov Style) */}
      <section className="bg-gradient-to-r from-[#0B1E36] via-[#102A4C] to-[#0B1E36] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 shadow-md">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय • MoSPI (SIH26102)</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                सांसद स्थानीय क्षेत्र विकास योजना (MPLADS)
              </h1>
              <h2 className="text-lg sm:text-xl font-semibold text-blue-200">
                MPLADS Rakshak — Explainable AI Risk &amp; Anomaly Intelligence Layer
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                e-SAKSHI पोर्टल के ऊपर एक पारदर्शी निर्णय-समर्थन प्रणाली। यह असामान्य परियोजना लागत (+50% विचलन), कार्य में अत्यधिक देरी, डुप्लीकेट प्रस्तावों और ऑन-साइट भौतिक सत्यापन की जांच करती है।
              </p>
            </div>

            {/* Quick Primary Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <Link
                to="/queue"
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <AlertOctagon className="w-4 h-4 text-slate-950" />
                <span>जांच हेतु प्राथमिक सूची ({highRisk})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/dashboard"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/30 transition flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-blue-300" />
                <span>कार्यकारी डैशबोर्ड (Analytics)</span>
              </Link>
            </div>
          </div>

          {/* Search Box in Hero */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-4xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="संसदीय क्षेत्र, जिला या कार्य का नाम खोजें (उदा: Varanasi, CC Road, Water Tank, Patna)..."
                className="w-full bg-white text-slate-900 rounded-xl pl-12 pr-28 py-3.5 text-xs sm:text-sm placeholder-slate-400 shadow-lg border-2 border-slate-200 focus:outline-none focus:border-amber-500 font-medium"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition"
              >
                खोजें (Search)
              </button>
            </div>
          </form>

        </div>
      </section>


      {/* 2. 4 CORE METRIC CARDS (Clean, Indian Gov Style) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold text-slate-600 uppercase">कुल स्वीकृत राशि</span>
              <Coins className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">{formatINR(totalCost)}</div>
            <p className="text-[10px] text-slate-400">Total Sanctioned Amount</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-bold text-slate-600 uppercase">कुल ट्रैक किए गए कार्य</span>
              <Building2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">{totalWorks.toLocaleString('en-IN')}</div>
            <p className="text-[10px] text-slate-400">Tracked MPLADS Projects</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-l-red-600 border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-red-700">
              <span className="text-[11px] font-bold uppercase text-red-700">उच्च प्राथमिकता कार्य</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-red-700">{highRisk}</div>
            <p className="text-[10px] text-slate-500">High-Risk Sanctions (&ge;70)</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-l-emerald-600 border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-emerald-700">
              <span className="text-[11px] font-bold uppercase text-emerald-700">पारदर्शी AI मॉडल</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-800">100% Explainable</div>
            <p className="text-[10px] text-slate-500">Zero Black-Box Formula</p>
          </div>

        </div>
      </div>


      {/* 3. 4 BIG OPERATIONAL GATEWAY CARDS (User-Friendly 3D Buttons) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            मुख्य परिचालन सेवाएं (Core Operational Modules)
          </h3>
          <p className="text-xs text-slate-500">
            अधिकारियों और नागरिकों के लिए सीधा 1-क्लिक एक्सेस।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <Link
            to="/queue"
            className="group bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-red-500 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-red-700">
                1. प्राथमिकता स्क्रूटनी सूची
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                लागत विचलन और समय सीमा उल्लंघन वाले 294 हाई-रिस्क कार्यों की प्राथमिकता सूची देखें।
              </p>
            </div>
            <span className="text-xs font-bold text-red-700 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>स्क्रूटनी खोलें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 2 */}
          <Link
            to="/dashboard"
            className="group bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700">
                2. राष्ट्रीय डैशबोर्ड (Analytics)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                जिलेवार आंकड़े, रिस्क स्तरीकरण पाई-चार्ट, खर्च का ब्योरा और विश्लेषणात्मक ग्राफ्स।
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>डैशबोर्ड देखें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 3 */}
          <Link
            to="/works/MPL-2024-UP-004821/capture-evidence"
            className="group bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-500 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-purple-700">
                3. मोबाइल फील्ड कैमरा
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                प्रोजेक्ट स्थल पर जाकर मोबाइल कैमरा से GPS लॉक्ड फोटो खींचें और भौतिक पूर्णता सत्यापित करें।
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>कैमरा शुरू करें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Card 4 */}
          <Link
            to="/passport/MPL-2024-UP-004821"
            className="group bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700">
                4. 360° रिस्क पासपोर्ट
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                पीयर कॉस्ट तुलना, 420m पास के डुप्लीकेट कार्य और 6-टैब केस इन्वेस्टिगेशन डॉसियर।
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-2 border-t border-slate-100">
              <span>पासपोर्ट डॉसियर</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

        </div>
      </section>


      {/* 4. LIVE INTERACTIVE TRIAGE TABLE ON HOMEPAGE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                जांच हेतु प्राथमिक प्रस्ताव (Flagged Proposals Register)
              </h3>
              <p className="text-xs text-slate-500">
                AI द्वारा चिन्हित उच्च जोखिम वाले कार्य (0–100 स्कोर के आधार पर क्रमित)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/queue"
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-xs"
              >
                <span>पूरी सूची देखें ({totalWorks})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">रिस्क स्कोर</th>
                  <th className="py-3 px-4">कार्य ID</th>
                  <th className="py-3 px-4">परियोजना का नाम एवं स्थान</th>
                  <th className="py-3 px-4">स्वीकृत लागत</th>
                  <th className="py-3 px-4">चिन्हित कारण (Primary Signal)</th>
                  <th className="py-3 px-4 text-right">कार्रवाई (Action)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentWorks.slice(0, 5).map((work, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <RiskScoreBadge score={work.riskScore} level={work.riskLevel} size="sm" />
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {work.workId}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate" title={work.workName}>
                        {work.workName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {work.district}, {work.state || 'UP'} • {work.category}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatINR(work.cost)}
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-600 max-w-xs truncate" title={work.reason}>
                      {work.reason || 'Cost or timeline variance'}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/passport/${work.workId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition shadow-xs"
                      >
                        <span>डॉसियर जांचें</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>


      {/* 5. CASE SPOTLIGHT BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl border-2 border-slate-300 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-800 border border-red-200">
              केस स्टडी • #MPL-2024-UP-004821
            </span>
            <span className="text-xs font-bold text-slate-500">
              वाराणसी, उत्तर प्रदेश • ग्रामीण सड़कें एवं पुल
            </span>
          </div>

          <h3 className="text-base font-extrabold text-slate-900">
            Construction of CC Road and Paver Works from Main Chowk to Panchayat Bhawan, Village Rampur
          </h3>

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
            <strong>AI का निष्कर्ष:</strong> यह कार्य <strong>₹48.00 लाख</strong> में स्वीकृत हुआ है (जबकि जिले का औसत ₹31.20 लाख है, यानी <strong>+53.8% अधिक</strong>) • इसके 420 मीटर के दायरे में बिल्कुल समान कार्य पहले से मौजूद है • ऑन-साइट भौतिक पूर्णता प्रमाण पत्र अपलोड नहीं है।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/passport/MPL-2024-UP-004821"
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>360° रिस्क पासपोर्ट डॉसियर खोलें</span>
            </Link>

            <Link
              to="/works/MPL-2024-UP-004821/capture-evidence"
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>मौके पर फोटो खींचें (Geo-Camera)</span>
            </Link>
          </div>
        </div>
      </section>


      {/* 6. NATIONAL FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center text-xs text-slate-500 space-y-1.5">
        <p className="font-bold text-slate-700">
          सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय • Ministry of Statistics and Programme Implementation (MoSPI)
        </p>
        <p className="text-[11px] text-slate-400 max-w-2xl mx-auto">
          MPLADS Rakshak एक पारदर्शी एआई डिसीजन-सपोर्ट लेयर है जो अधिकारियों को त्वरित निर्णय लेने में सहायता करता है। अंतिम वित्तीय और कानूनी स्वीकृति संबंधित प्राधिकारियों के अधीन है।
        </p>
      </footer>

    </div>
  );
}
