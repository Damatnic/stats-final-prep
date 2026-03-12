"use client";

import { useState } from "react";

const topics = [
  { id: "empirical", title: "1. Empirical Rule & Normal Distribution" },
  { id: "clt", title: "2. Central Limit Theorem (CLT)" },
  { id: "ci", title: "3. Confidence Intervals" },
  { id: "ht", title: "4. Hypothesis Testing" },
  { id: "twosample", title: "5. Two-Sample Tests" },
  { id: "chisquare", title: "6. Chi-Square Goodness of Fit" },
  { id: "anova", title: "7. ANOVA" },
  { id: "ti84", title: "8. TI-84 Reference" },
  { id: "traps", title: "9. ALEKS Traps" },
];

export default function StudyPage() {
  const [activeTopic, setActiveTopic] = useState("empirical");

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-lg font-bold mb-4 text-gray-400">Topics</h2>
          <nav className="space-y-1">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTopic === topic.id
                    ? "bg-[#3B82F6] text-white"
                    : "text-gray-300 hover:bg-[#1e293b]"
                }`}
              >
                {topic.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {activeTopic === "empirical" && <EmpiricalRuleSection />}
        {activeTopic === "clt" && <CLTSection />}
        {activeTopic === "ci" && <CISection />}
        {activeTopic === "ht" && <HTSection />}
        {activeTopic === "twosample" && <TwoSampleSection />}
        {activeTopic === "chisquare" && <ChiSquareSection />}
        {activeTopic === "anova" && <ANOVASection />}
        {activeTopic === "ti84" && <TI84Section />}
        {activeTopic === "traps" && <ALEKSTrapsSection />}
      </div>
    </div>
  );
}

function EmpiricalRuleSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Empirical Rule & Normal Distribution</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">The 68-95-99.7 Rule</h2>
        <p className="text-gray-300 mb-4">
          For any normal distribution, the percentage of data within standard deviations of the mean:
        </p>
        <div className="formula-box space-y-2">
          <p><strong>68%</strong> of data falls within 1 standard deviation (μ ± 1σ)</p>
          <p><strong>95%</strong> of data falls within 2 standard deviations (μ ± 2σ)</p>
          <p><strong>99.7%</strong> of data falls within 3 standard deviations (μ ± 3σ)</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Z-Score Formula</h2>
        <div className="formula-box text-center text-xl mb-4">
          z = (x - μ) / σ
        </div>
        <p className="text-gray-300">
          The z-score tells you how many standard deviations a value is from the mean.
        </p>
        <ul className="mt-4 space-y-2 text-gray-300">
          <li><strong>z {">"} 0:</strong> Value is above the mean</li>
          <li><strong>z {"<"} 0:</strong> Value is below the mean</li>
          <li><strong>z = 0:</strong> Value equals the mean</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">TI-84 Commands</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">Finding Probability (Area)</h3>
            <div className="formula-box">
              normalcdf(lower, upper, μ, σ)
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Use -1E99 for negative infinity, 1E99 for positive infinity
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Finding Value from Percentile</h3>
            <div className="formula-box">
              invNorm(area_to_left, μ, σ)
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Worked Example</h2>
        <div className="bg-[#0f172a] p-4 rounded-lg mb-4">
          <p className="text-gray-300">
            <strong>Problem:</strong> SAT scores are normally distributed with μ = 1060 and σ = 195.
            What score is at the 93rd percentile?
          </p>
        </div>
        <div className="space-y-3 text-gray-300">
          <p><strong>Step 1:</strong> Identify what we need: Find x where 93% of scores are below</p>
          <p><strong>Step 2:</strong> Use invNorm(0.93, 1060, 195)</p>
          <p><strong>Step 3:</strong> Calculate: x = 1060 + (1.4758)(195) = <strong>1348</strong></p>
        </div>
      </div>

      <div className="warning-box">
        <h3 className="font-bold text-[#ef4444] mb-2">CRITICAL: The Symmetry Trap</h3>
        <p className="text-gray-300">
          <strong>93rd percentile means z = +1.47 (POSITIVE)</strong>, not negative!
        </p>
        <p className="text-gray-300 mt-2">
          The 93rd percentile is ABOVE the mean, so z must be positive.
          Only the 7th percentile (the mirror image) would have z = -1.47.
        </p>
        <p className="text-[#f59e0b] mt-2 font-bold">
          Prof Gina confirmed this WILL be on the exam!
        </p>
      </div>
    </div>
  );
}

function CLTSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Central Limit Theorem (CLT)</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">The Key Concept</h2>
        <p className="text-gray-300 mb-4">
          When taking samples of size n from ANY population, the distribution of sample means:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>1. Is approximately normal (if n ≥ 30 or population is normal)</li>
          <li>2. Has mean = μ (same as population)</li>
          <li>3. Has standard error = σ/√n (smaller than population σ)</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Individual vs. Sample Mean</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">Individual (X)</h3>
            <div className="formula-box mb-2">
              z = (x - μ) / σ
            </div>
            <p className="text-sm text-gray-400">
              Keyword: "randomly selected person/item"
            </p>
          </div>
          <div className="bg-[#0f172a] p-4 rounded-lg border-2 border-[#3B82F6]">
            <h3 className="font-bold text-white mb-2">Sample Mean (X̄)</h3>
            <div className="formula-box mb-2">
              z = (x̄ - μ) / (σ/√n)
            </div>
            <p className="text-sm text-gray-400">
              Keyword: "random sample of n"
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Worked Example</h2>
        <div className="bg-[#0f172a] p-4 rounded-lg mb-4">
          <p className="text-gray-300">
            <strong>Problem:</strong> Heights of adults are normally distributed with μ = 68 inches, σ = 3 inches.
            What is the probability that a random sample of 36 adults has a mean height greater than 69 inches?
          </p>
        </div>
        <div className="space-y-3 text-gray-300">
          <p><strong>Step 1:</strong> This is a SAMPLE (n=36), so use CLT</p>
          <p><strong>Step 2:</strong> Standard error = σ/√n = 3/√36 = 3/6 = 0.5</p>
          <p><strong>Step 3:</strong> z = (69 - 68) / 0.5 = 2.0</p>
          <p><strong>Step 4:</strong> P(X̄ {">"} 69) = normalcdf(69, 1E99, 68, 0.5) = <strong>0.0228</strong></p>
        </div>
      </div>

      <div className="tip-box">
        <h3 className="font-bold text-[#3B82F6] mb-2">Quick Check</h3>
        <p className="text-gray-300">
          See "sample of n" or "n people/items selected"? → Use σ/√n (standard error)
        </p>
        <p className="text-gray-300 mt-1">
          See "one person" or "randomly selected individual"? → Use σ (no √n)
        </p>
      </div>
    </div>
  );
}

function CISection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Confidence Intervals</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">When to Use Z vs T</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">Z-Interval (σ known)</h3>
            <div className="formula-box mb-2">
              x̄ ± z* · (σ/√n)
            </div>
            <p className="text-sm text-gray-400">
              Population standard deviation (σ) is GIVEN
            </p>
          </div>
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">T-Interval (σ unknown)</h3>
            <div className="formula-box mb-2">
              x̄ ± t* · (s/√n)
            </div>
            <p className="text-sm text-gray-400">
              Using sample std dev (s), df = n - 1
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Z Critical Values</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 text-left">Confidence Level</th>
                <th className="py-2 text-center">z*</th>
                <th className="py-2 text-center">α</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-[#334155]"><td className="py-2">90%</td><td className="text-center font-mono">1.645</td><td className="text-center">0.10</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">95%</td><td className="text-center font-mono">1.960</td><td className="text-center">0.05</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">98%</td><td className="text-center font-mono">2.326</td><td className="text-center">0.02</td></tr>
              <tr><td className="py-2">99%</td><td className="text-center font-mono">2.576</td><td className="text-center">0.01</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Proportion Confidence Interval</h2>
        <div className="formula-box text-center text-xl mb-4">
          p̂ ± z* · √(p̂q̂/n)
        </div>
        <p className="text-gray-300">
          Where p̂ = x/n (sample proportion), q̂ = 1 - p̂
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Sample Size Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">For Mean</h3>
            <div className="formula-box">
              n = (z*σ/E)²
            </div>
          </div>
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">For Proportion</h3>
            <div className="formula-box">
              n = z*² · p̂q̂ / E²
            </div>
          </div>
        </div>
        <div className="warning-box mt-4">
          <p className="text-[#ef4444] font-bold">ALWAYS round UP to the next whole number!</p>
          <p className="text-gray-300 text-sm mt-1">If you get n = 96.01, use n = 97</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">How to Tell σ vs s</h2>
        <div className="tip-box">
          <p className="text-gray-300">
            <strong>Key clue:</strong> If "standard deviation" is mentioned IN THE SAME SENTENCE as the sample data (like "A sample of 50 had mean 120 with standard deviation 15"), it&apos;s <strong>s</strong> → use T.
          </p>
          <p className="text-gray-300 mt-2">
            If the standard deviation is given as a known fact BEFORE discussing the sample (like "The population has σ = 15. A sample of 50 was taken..."), it&apos;s <strong>σ</strong> → use Z.
          </p>
        </div>
      </div>

      <div className="warning-box">
        <h3 className="font-bold text-[#ef4444] mb-2">CI Interpretation</h3>
        <p className="text-gray-300">
          <strong>CORRECT:</strong> "I am 95% CONFIDENT that the true population mean is between [lower] and [upper]"
        </p>
        <p className="text-gray-300 mt-2">
          <strong>WRONG:</strong> "There is a 95% probability that..." (The parameter is fixed, not random!)
        </p>
      </div>
    </div>
  );
}

function HTSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hypothesis Testing (5-Step Framework)</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">The 5 Steps</h2>
        <ol className="space-y-4 text-gray-300">
          <li>
            <strong className="text-white">Step 1: State the Hypotheses</strong>
            <div className="ml-4 mt-2 space-y-1">
              <p>H₀: μ = [claimed value] (null hypothesis - always contains =)</p>
              <p>H₁: μ {"<"} or {">"} or ≠ [claimed value] (alternative hypothesis)</p>
            </div>
          </li>
          <li>
            <strong className="text-white">Step 2: Calculate the Test Statistic</strong>
            <div className="ml-4 mt-2 formula-box">
              Z or T statistic (see formulas below)
            </div>
          </li>
          <li>
            <strong className="text-white">Step 3: Find the p-value or Critical Value</strong>
          </li>
          <li>
            <strong className="text-white">Step 4: Make a Decision</strong>
            <div className="ml-4 mt-2">
              <p>If p-value {"<"} α → <span className="text-[#22c55e]">Reject H₀</span></p>
              <p>If p-value ≥ α → <span className="text-[#ef4444]">Fail to Reject H₀</span></p>
            </div>
          </li>
          <li>
            <strong className="text-white">Step 5: State the Conclusion</strong>
            <div className="ml-4 mt-2 text-sm">
              "At α = [value], there IS/is NOT sufficient evidence to conclude that [H₁ in words]"
            </div>
          </li>
        </ol>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Test Statistics</h2>
        <div className="grid gap-4">
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">Z-test for Mean (σ known)</h3>
            <div className="formula-box">
              z = (x̄ - μ₀) / (σ/√n)
            </div>
          </div>
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">T-test for Mean (s known)</h3>
            <div className="formula-box">
              t = (x̄ - μ₀) / (s/√n) , df = n - 1
            </div>
          </div>
          <div className="bg-[#0f172a] p-4 rounded-lg border-2 border-[#f59e0b]">
            <h3 className="font-bold text-white mb-2">Z-test for Proportion</h3>
            <div className="formula-box">
              z = (p̂ - p₀) / √(p₀q₀/n)
            </div>
            <p className="text-[#f59e0b] text-sm mt-2">
              <strong>Use p₀ (null value) in the denominator, NOT p̂!</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Tail Directions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 text-left">Keywords in Problem</th>
                <th className="py-2 text-center">H₁</th>
                <th className="py-2 text-center">Tail</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-[#334155]">
                <td className="py-2">less than, fewer, below, decreased, reduced</td>
                <td className="text-center font-mono">μ {"<"} μ₀</td>
                <td className="text-center">Left</td>
              </tr>
              <tr className="border-b border-[#334155]">
                <td className="py-2">greater than, more, above, increased, improved</td>
                <td className="text-center font-mono">μ {">"} μ₀</td>
                <td className="text-center">Right</td>
              </tr>
              <tr>
                <td className="py-2">different, changed, not equal to</td>
                <td className="text-center font-mono">μ ≠ μ₀</td>
                <td className="text-center">Two-tailed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Critical Values Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 text-left">α</th>
                <th className="py-2 text-center">Two-tailed</th>
                <th className="py-2 text-center">Left-tailed</th>
                <th className="py-2 text-center">Right-tailed</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-mono">
              <tr className="border-b border-[#334155]">
                <td className="py-2">0.10</td>
                <td className="text-center">±1.645</td>
                <td className="text-center">-1.282</td>
                <td className="text-center">+1.282</td>
              </tr>
              <tr className="border-b border-[#334155]">
                <td className="py-2">0.05</td>
                <td className="text-center">±1.960</td>
                <td className="text-center">-1.645</td>
                <td className="text-center">+1.645</td>
              </tr>
              <tr>
                <td className="py-2">0.01</td>
                <td className="text-center">±2.576</td>
                <td className="text-center">-2.326</td>
                <td className="text-center">+2.326</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Type I and Type II Errors</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-[#ef4444] mb-2">Type I Error (α)</h3>
            <p className="text-gray-300">Rejecting H₀ when it&apos;s actually TRUE</p>
            <p className="text-sm text-gray-400 mt-2">"False positive" - convicting an innocent person</p>
          </div>
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-[#f59e0b] mb-2">Type II Error (β)</h3>
            <p className="text-gray-300">Failing to reject H₀ when it&apos;s actually FALSE</p>
            <p className="text-sm text-gray-400 mt-2">"False negative" - letting a guilty person go free</p>
          </div>
        </div>
      </div>

      <div className="tip-box">
        <h3 className="font-bold text-[#3B82F6] mb-2">Memory Trick</h3>
        <p className="text-gray-300 text-lg font-bold">
          "If p is low, H₀ must go!" (Reject when p-value {"<"} α)
        </p>
      </div>

      <div className="warning-box">
        <h3 className="font-bold text-[#ef4444] mb-2">NEVER Say "Accept H₀"</h3>
        <p className="text-gray-300">
          Always say <strong>"Fail to reject H₀"</strong> - we can never prove H₀ is true, only that we don&apos;t have enough evidence against it.
        </p>
      </div>
    </div>
  );
}

function TwoSampleSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Two-Sample Tests</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Two-Sample T-Test (Independent)</h2>
        <div className="formula-box text-center text-xl mb-4">
          t = (x̄₁ - x̄₂) / √(s₁²/n₁ + s₂²/n₂)
        </div>
        <div className="warning-box mt-4">
          <h3 className="font-bold text-[#ef4444] mb-2">ALEKS CRITICAL: Degrees of Freedom</h3>
          <div className="formula-box text-center text-xl">
            df = min(n₁ - 1, n₂ - 1)
          </div>
          <p className="text-gray-300 mt-2">
            <strong>DO NOT use Welch&apos;s formula!</strong> ALEKS specifically uses the simpler minimum formula.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Hypotheses Format</h2>
        <div className="formula-box space-y-2">
          <p>H₀: μ₁ - μ₂ = 0 (no difference)</p>
          <p>H₁: μ₁ - μ₂ {"<"} 0 or {">"} 0 or ≠ 0</p>
        </div>
        <p className="text-gray-300 mt-4">
          Equivalently written as H₀: μ₁ = μ₂
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Two-Proportion Z-Test</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">Pooled Proportion</h3>
            <div className="formula-box">
              p̄ = (x₁ + x₂) / (n₁ + n₂)
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Test Statistic</h3>
            <div className="formula-box">
              z = (p̂₁ - p̂₂) / √[p̄(1-p̄)(1/n₁ + 1/n₂)]
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Paired T-Test</h2>
        <p className="text-gray-300 mb-4">
          Used when data points are naturally paired (before/after, matched subjects)
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">Step 1: Calculate Differences</h3>
            <div className="formula-box">
              d = x₁ - x₂ for each pair
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Step 2: Test Statistic</h3>
            <div className="formula-box">
              t = (d̄ - 0) / (sᵈ/√n) , df = n - 1
            </div>
          </div>
        </div>
        <p className="text-gray-300 mt-4">
          Where d̄ is the mean of differences and sᵈ is the standard deviation of differences
        </p>
      </div>

      <div className="tip-box">
        <h3 className="font-bold text-[#3B82F6] mb-2">Independent vs Paired</h3>
        <ul className="text-gray-300 space-y-1">
          <li><strong>Independent:</strong> Two separate groups (men vs women, treatment vs control)</li>
          <li><strong>Paired:</strong> Same subjects measured twice (before/after, matched pairs)</li>
        </ul>
      </div>
    </div>
  );
}

function ChiSquareSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chi-Square Goodness of Fit</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">What It Tests</h2>
        <p className="text-gray-300">
          Does the observed data match an expected distribution? Tests whether categorical data follows a claimed pattern.
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Hypotheses</h2>
        <div className="formula-box space-y-2">
          <p><strong>H₀:</strong> The data fits the expected distribution</p>
          <p><strong>H₁:</strong> The data does NOT fit the expected distribution</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Test Statistic</h2>
        <div className="formula-box text-center text-xl mb-4">
          χ² = Σ (O - E)² / E
        </div>
        <div className="space-y-2 text-gray-300">
          <p><strong>O</strong> = Observed frequency (from data)</p>
          <p><strong>E</strong> = Expected frequency = n × p</p>
          <p><strong>df</strong> = k - 1 (k = number of categories)</p>
        </div>
      </div>

      <div className="warning-box">
        <h3 className="font-bold text-[#ef4444] mb-2">ALWAYS Right-Tailed</h3>
        <p className="text-gray-300">
          Chi-square tests are ALWAYS right-tailed. Large χ² values indicate the data doesn&apos;t fit.
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Requirement</h2>
        <div className="formula-box">
          Every expected frequency E ≥ 5
        </div>
        <p className="text-gray-300 mt-2">
          If any E {"<"} 5, the chi-square test may not be valid.
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Chi-Square Notation</h2>
        <div className="tip-box">
          <p className="text-gray-300">
            <strong>χ²₀.₀₅</strong> means the chi-square value with <strong>right-tail area = 0.05</strong>
          </p>
          <p className="text-gray-300 mt-2">
            The subscript is the area to the RIGHT of the critical value.
          </p>
        </div>
      </div>

      <div className="warning-box">
        <h3 className="font-bold text-[#ef4444] mb-2">TI-84 Has NO invχ²!</h3>
        <p className="text-gray-300">
          You must use the chi-square TABLE to find critical values. Your TI-84 cannot do invχ².
        </p>
        <p className="text-gray-300 mt-2">
          <strong>To find p-value:</strong> χ²cdf(χ², 1E99, df)
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Chi-Square Critical Values Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 px-2 text-left">df</th>
                <th className="py-2 px-2 text-center">χ²₀.₁₀₀</th>
                <th className="py-2 px-2 text-center">χ²₀.₀₅₀</th>
                <th className="py-2 px-2 text-center">χ²₀.₀₂₅</th>
                <th className="py-2 px-2 text-center">χ²₀.₀₁₀</th>
                <th className="py-2 px-2 text-center">χ²₀.₀₀₅</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-mono text-xs">
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">1</td><td className="text-center">2.706</td><td className="text-center">3.841</td><td className="text-center">5.024</td><td className="text-center">6.635</td><td className="text-center">7.879</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">2</td><td className="text-center">4.605</td><td className="text-center">5.991</td><td className="text-center">7.378</td><td className="text-center">9.210</td><td className="text-center">10.597</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">3</td><td className="text-center">6.251</td><td className="text-center">7.815</td><td className="text-center">9.348</td><td className="text-center">11.345</td><td className="text-center">12.838</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">4</td><td className="text-center">7.779</td><td className="text-center">9.488</td><td className="text-center">11.143</td><td className="text-center">13.277</td><td className="text-center">14.860</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">5</td><td className="text-center">9.236</td><td className="text-center">11.070</td><td className="text-center">12.833</td><td className="text-center">15.086</td><td className="text-center">16.750</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">6</td><td className="text-center">10.645</td><td className="text-center">12.592</td><td className="text-center">14.449</td><td className="text-center">16.812</td><td className="text-center">18.548</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">7</td><td className="text-center">12.017</td><td className="text-center">14.067</td><td className="text-center">16.013</td><td className="text-center">18.475</td><td className="text-center">20.278</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">8</td><td className="text-center">13.362</td><td className="text-center">15.507</td><td className="text-center">17.535</td><td className="text-center">20.090</td><td className="text-center">21.955</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-2">9</td><td className="text-center">14.684</td><td className="text-center">16.919</td><td className="text-center">19.023</td><td className="text-center">21.666</td><td className="text-center">23.589</td></tr>
              <tr><td className="py-1 px-2">10</td><td className="text-center">15.987</td><td className="text-center">18.307</td><td className="text-center">20.483</td><td className="text-center">23.209</td><td className="text-center">25.188</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ANOVASection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ANOVA (Analysis of Variance)</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">What It Tests</h2>
        <p className="text-gray-300">
          Tests whether 3 or more group means are all equal, or if at least one differs.
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Hypotheses</h2>
        <div className="formula-box space-y-2">
          <p><strong>H₀:</strong> μ₁ = μ₂ = μ₃ = ... (all means equal)</p>
          <p><strong>H₁:</strong> At least one mean is different</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">ANOVA Table Structure</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 text-left">Source</th>
                <th className="py-2 text-center">SS</th>
                <th className="py-2 text-center">df</th>
                <th className="py-2 text-center">MS</th>
                <th className="py-2 text-center">F</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-[#334155]">
                <td className="py-2">Between (Groups)</td>
                <td className="text-center">SSB</td>
                <td className="text-center">k - 1</td>
                <td className="text-center">SSB/(k-1)</td>
                <td className="text-center">MSB/MSW</td>
              </tr>
              <tr className="border-b border-[#334155]">
                <td className="py-2">Within (Error)</td>
                <td className="text-center">SSW</td>
                <td className="text-center">N - k</td>
                <td className="text-center">SSW/(N-k)</td>
                <td className="text-center">-</td>
              </tr>
              <tr>
                <td className="py-2">Total</td>
                <td className="text-center">SST</td>
                <td className="text-center">N - 1</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-gray-300 text-sm">
          <p><strong>k</strong> = number of groups</p>
          <p><strong>N</strong> = total sample size (all groups combined)</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Key Formulas</h2>
        <div className="space-y-4">
          <div className="formula-box">
            <p>F = MSB / MSW</p>
          </div>
          <div className="formula-box">
            <p>MSB = SSB / (k - 1)</p>
            <p>MSW = SSW / (N - k)</p>
          </div>
          <div className="formula-box">
            <p>df₁ = k - 1 (numerator, between groups)</p>
            <p>df₂ = N - k (denominator, within groups)</p>
          </div>
        </div>
      </div>

      <div className="warning-box">
        <h3 className="font-bold text-[#ef4444] mb-2">ALWAYS Right-Tailed</h3>
        <p className="text-gray-300">
          ANOVA F-tests are ALWAYS right-tailed. We reject H₀ for large F values.
        </p>
      </div>

      <div className="tip-box">
        <h3 className="font-bold text-[#3B82F6] mb-2">Important Limitation</h3>
        <p className="text-gray-300">
          ANOVA only tells you THAT at least one mean differs, NOT WHICH ones differ.
          Post-hoc tests (like Tukey) are needed to identify which specific pairs differ.
        </p>
      </div>
    </div>
  );
}

function TI84Section() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">TI-84 Calculator Reference</h1>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Normal Distribution</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">Find Probability (Area)</h3>
            <div className="formula-box">
              normalcdf(lower, upper, μ, σ)
            </div>
            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p>• P(X {"<"} a): normalcdf(-1E99, a, μ, σ)</p>
              <p>• P(X {">"} a): normalcdf(a, 1E99, μ, σ)</p>
              <p>• P(a {"<"} X {"<"} b): normalcdf(a, b, μ, σ)</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Find Value from Percentile</h3>
            <div className="formula-box">
              invNorm(area_to_left, μ, σ)
            </div>
            <p className="text-sm text-gray-400 mt-2">
              For percentiles: area_to_left = percentile/100 (e.g., 93rd percentile → 0.93)
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">T Distribution</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">Find Probability</h3>
            <div className="formula-box">
              tcdf(lower, upper, df)
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Find T Critical Value</h3>
            <div className="formula-box">
              invT(area_to_left, df)
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Chi-Square Distribution</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">Find P-value</h3>
            <div className="formula-box">
              χ²cdf(χ², 1E99, df)
            </div>
          </div>
          <div className="warning-box">
            <p className="text-[#ef4444] font-bold">There is NO invχ² on the TI-84!</p>
            <p className="text-gray-300 mt-1">You must use the chi-square table for critical values.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">STAT → TESTS Menu</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 text-left">Test</th>
                <th className="py-2 text-left">Menu Option</th>
                <th className="py-2 text-left">Use For</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-[#334155]"><td className="py-2">1: Z-Test</td><td>1</td><td>HT for mean (σ known)</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">2: T-Test</td><td>2</td><td>HT for mean (σ unknown)</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">3: 2-SampZTest</td><td>3</td><td>Two means (σ known)</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">4: 2-SampTTest</td><td>4</td><td>Two means (σ unknown)</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">5: 1-PropZTest</td><td>5</td><td>HT for proportion</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">6: 2-PropZTest</td><td>6</td><td>Two proportions</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">7: ZInterval</td><td>7</td><td>CI for mean (σ known)</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">8: TInterval</td><td>8</td><td>CI for mean (σ unknown)</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">A: 1-PropZInt</td><td>A</td><td>CI for proportion</td></tr>
              <tr><td className="py-2">D: χ²GOF-Test</td><td>D</td><td>Chi-square GoF</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="tip-box">
        <h3 className="font-bold text-[#3B82F6] mb-2">Important Tips</h3>
        <ul className="text-gray-300 space-y-1 text-sm">
          <li>• Use (-) for negative numbers, not the minus sign</li>
          <li>• 1E99 means 10^99 (effectively infinity)</li>
          <li>• -1E99 means negative infinity</li>
          <li>• Always check you entered μ and σ in the correct order</li>
        </ul>
      </div>
    </div>
  );
}

function ALEKSTrapsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ALEKS Traps & Common Mistakes</h1>

      <div className="warning-box">
        <h2 className="text-xl font-bold text-[#ef4444] mb-4">Critical ALEKS-Specific Rules</h2>
        <div className="space-y-4">
          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">1. Two-Sample df Formula</h3>
            <div className="formula-box">
              df = min(n₁ - 1, n₂ - 1)
            </div>
            <p className="text-gray-300 mt-2">
              ALEKS uses the SIMPLER minimum formula, NOT Welch&apos;s approximation!
            </p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">2. Rounding</h3>
            <p className="text-gray-300">
              Round answers to <strong>4 decimal places</strong> unless otherwise specified.
            </p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">3. No invχ² on TI-84</h3>
            <p className="text-gray-300">
              You MUST use the chi-square TABLE for critical values. The calculator can only give you p-values.
            </p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">4. Symmetry Trap (invNorm)</h3>
            <p className="text-gray-300">
              93rd percentile → z = <strong>+1.47 (POSITIVE)</strong>
            </p>
            <p className="text-gray-300 mt-1">
              7th percentile → z = -1.47 (negative)
            </p>
            <p className="text-[#f59e0b] mt-2">
              ALEKS may show the wrong sign as a trap answer!
            </p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">5. Proportion HT Denominator</h3>
            <div className="formula-box">
              z = (p̂ - p₀) / √(p₀q₀/n)
            </div>
            <p className="text-gray-300 mt-2">
              Use <strong>p₀ (the null hypothesis value)</strong> in the denominator, NOT p̂!
            </p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">6. Sample Size Rounding</h3>
            <p className="text-gray-300">
              ALWAYS round UP (ceiling function). If n = 96.01, use n = 97.
            </p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">7. Never "Accept H₀"</h3>
            <p className="text-gray-300">
              Always say "Fail to reject H₀" - we never prove the null is true.
            </p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-2">8. Chi-Square Subscript</h3>
            <p className="text-gray-300">
              χ²₀.₂₅ = critical value with <strong>right-tail area of 0.25</strong>
            </p>
            <p className="text-gray-300 mt-1">
              The subscript shows the area to the RIGHT.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Common Calculation Mistakes</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#ef4444]">X</span>
            <span>Using σ instead of σ/√n for sample means (CLT)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ef4444]">X</span>
            <span>Forgetting to square in sample size formula: n = (z*σ/E)²</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ef4444]">X</span>
            <span>Using wrong tail direction (check keywords!)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ef4444]">X</span>
            <span>Mixing up z and t critical values</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ef4444]">X</span>
            <span>Using s when σ is given (or vice versa)</span>
          </li>
        </ul>
      </div>

      <div className="success-box">
        <h2 className="text-xl font-bold text-[#22c55e] mb-4">Quick Checklist Before Submitting</h2>
        <ul className="space-y-2 text-gray-300">
          <li>[ ] Did I use the right test (Z vs T)?</li>
          <li>[ ] Did I use σ/√n for sample means?</li>
          <li>[ ] Is my df correct? (min formula for two-sample)</li>
          <li>[ ] Is my tail direction correct?</li>
          <li>[ ] Did I round to 4 decimal places?</li>
          <li>[ ] Did I round UP for sample size?</li>
          <li>[ ] Did I use p₀ (not p̂) in proportion test denominator?</li>
        </ul>
      </div>
    </div>
  );
}
