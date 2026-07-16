import { Shield, Zap, Globe, Heart, Activity, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500 max-w-5xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-4xl mb-6 shadow-xl">
          C
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">CricNova</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate next-generation platform for cricket enthusiasts. We bring you lightning-fast live scores, immersive match centers, and unparalleled coverage of the gentleman's game.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Zap, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", title: "Lightning Fast", desc: "Real-time ball-by-ball updates delivered to your screen with zero latency." },
          { icon: Globe, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", title: "Global Coverage", desc: "From the ICC World Cup to local T20 leagues, we cover every match that matters." },
          { icon: Shield, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", title: "Reliable Data", desc: "Powered by enterprise-grade sports APIs ensuring 100% accurate statistics." },
          { icon: Activity, color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-900/30", title: "In-Depth Stats", desc: "Comprehensive player profiles, team rankings, and historical data analytics." },
          { icon: Heart, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", title: "Fan First", desc: "Designed with an intuitive, beautiful UI that puts the cricket fan's experience first." },
          { icon: Mail, color: "text-cyan-500", bg: "bg-cyan-100 dark:bg-cyan-900/30", title: "24/7 Support", desc: "Always here for our community. Have a feature request? Let us know!" },
        ].map((feature, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-0"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join the CricNova Community</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Stay updated with the latest features, breaking cricket news, and exclusive insights by subscribing to our newsletter.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 dark:bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
