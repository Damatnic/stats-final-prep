import Link from "next/link";
import CountdownTimer from "./components/CountdownTimer";

const navCards = [
  {
    href: "/study",
    title: "Study Guide",
    description: "Complete interactive guide covering all topics",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    href: "/practice",
    title: "Practice Problems",
    description: "20 problems with step-by-step solutions",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    href: "/decision-tree",
    title: "Decision Tree",
    description: "What test should I use? Interactive guide",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    href: "/formulas",
    title: "Formula Reference",
    description: "Quick reference cheat sheet",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    href: "/ai-tutor",
    title: "AI Tutor",
    description: "Ask any stats question",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
];

const focusTopics = [
  { topic: "Empirical Rule & Normal Distribution", priority: "HIGH" },
  { topic: "Central Limit Theorem (CLT)", priority: "HIGH" },
  { topic: "Confidence Intervals (Z, T, Proportion)", priority: "HIGH" },
  { topic: "Hypothesis Testing (5-Step Framework)", priority: "HIGH" },
  { topic: "Chi-Square Goodness of Fit", priority: "MEDIUM", note: "1 question" },
  { topic: "ANOVA", priority: "MEDIUM", note: "1 question" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stats Final Prep
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Everything you need to ace your Intro to Statistics final
        </p>
        <CountdownTimer />
      </div>

      {/* Important Notes */}
      <div className="card border-[#3B82F6]">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Exam Notes</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#22c55e]">*</span>
            <span><strong>Notes ARE allowed</strong> on the exam. Bring your formula sheet!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#f59e0b]">!</span>
            <span><strong>Symmetry/93rd percentile trap WILL be on the exam</strong>. Remember: 93rd percentile = z = +1.47 (POSITIVE, not negative)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3B82F6]">i</span>
            <span>TI-84 calculators are allowed. Know your normalcdf, invNorm, tcdf commands.</span>
          </li>
        </ul>
      </div>

      {/* Focus Topics */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Priority Topics</h2>
        <div className="grid gap-3">
          {focusTopics.map((item) => (
            <div
              key={item.topic}
              className="card flex items-center justify-between"
            >
              <span className="text-gray-200">{item.topic}</span>
              <div className="flex items-center gap-2">
                {item.note && (
                  <span className="text-sm text-gray-400">({item.note})</span>
                )}
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    item.priority === "HIGH"
                      ? "bg-[#ef4444]/20 text-[#ef4444]"
                      : "bg-[#f59e0b]/20 text-[#f59e0b]"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Study Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="card hover:border-[#3B82F6] transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#3B82F6]/10 rounded-lg group-hover:bg-[#3B82F6]/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-[#3B82F6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={card.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-[#3B82F6] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="tip-box">
        <h3 className="font-bold text-[#3B82F6] mb-2">Study Strategy</h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
          <li>Review the Decision Tree first to understand which test to use when</li>
          <li>Go through the Study Guide for each topic</li>
          <li>Practice problems until you can do them without looking at notes</li>
          <li>Use the AI Tutor if you get stuck on any concept</li>
          <li>Keep the Formula Reference open during practice</li>
        </ol>
      </div>
    </div>
  );
}
