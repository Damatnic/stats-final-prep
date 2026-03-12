"use client";

import { useState } from "react";

interface Problem {
  id: number;
  topic: string;
  topicColor: string;
  question: string;
  answer: string;
  steps: string[];
  ti84?: string;
}

const problems: Problem[] = [
  // Normal Distribution / Empirical Rule
  {
    id: 1,
    topic: "Normal Distribution",
    topicColor: "#3B82F6",
    question: "IQ scores are normally distributed with μ = 100 and σ = 15. What percentage of people have IQ scores between 85 and 115?",
    answer: "68%",
    steps: [
      "Identify: μ = 100, σ = 15",
      "85 is one standard deviation below mean: 100 - 15 = 85",
      "115 is one standard deviation above mean: 100 + 15 = 115",
      "By the Empirical Rule (68-95-99.7): 68% of data falls within 1 standard deviation",
      "Answer: 68%"
    ],
  },
  {
    id: 2,
    topic: "Normal Distribution",
    topicColor: "#3B82F6",
    question: "SAT scores are normally distributed with μ = 1060 and σ = 195. What score is at the 93rd percentile?",
    answer: "1348 (approximately)",
    steps: [
      "This asks for the value where 93% of scores are below",
      "Use invNorm(0.93, 1060, 195)",
      "z-score for 93rd percentile: z = +1.4758 (POSITIVE, not negative!)",
      "x = μ + z·σ = 1060 + (1.4758)(195) = 1060 + 287.78",
      "Answer: x ≈ 1348"
    ],
    ti84: "invNorm(0.93, 1060, 195)"
  },
  {
    id: 3,
    topic: "Empirical Rule",
    topicColor: "#3B82F6",
    question: "Heights are normally distributed with μ = 68 inches and σ = 3 inches. What percentage of people are taller than 74 inches?",
    answer: "2.5%",
    steps: [
      "74 inches is 2 standard deviations above mean: 68 + 2(3) = 74",
      "By the Empirical Rule: 95% falls within ±2σ",
      "5% falls outside ±2σ (in both tails combined)",
      "Since we want ABOVE 74, that's just the right tail: 5%/2 = 2.5%",
      "Answer: 2.5%"
    ],
  },
  // CLT
  {
    id: 4,
    topic: "CLT",
    topicColor: "#22c55e",
    question: "The mean weight of adults is μ = 170 lbs with σ = 25 lbs. What is the probability that a random sample of 64 adults has a mean weight greater than 175 lbs?",
    answer: "0.0548",
    steps: [
      "This is a SAMPLE (n = 64), so use CLT",
      "Standard error = σ/√n = 25/√64 = 25/8 = 3.125",
      "z = (175 - 170) / 3.125 = 5 / 3.125 = 1.60",
      "P(X̄ > 175) = P(Z > 1.60) = normalcdf(1.60, 1E99, 0, 1)",
      "Answer: 0.0548"
    ],
    ti84: "normalcdf(175, 1E99, 170, 25/√64) or normalcdf(1.60, 1E99, 0, 1)"
  },
  {
    id: 5,
    topic: "CLT",
    topicColor: "#22c55e",
    question: "Delivery times are normally distributed with μ = 30 minutes and σ = 8 minutes. What is the probability that ONE randomly selected delivery takes more than 35 minutes?",
    answer: "0.2660",
    steps: [
      "This is ONE individual, NOT a sample - no √n needed",
      "z = (35 - 30) / 8 = 5 / 8 = 0.625",
      "P(X > 35) = normalcdf(0.625, 1E99, 0, 1)",
      "Answer: 0.2660"
    ],
    ti84: "normalcdf(35, 1E99, 30, 8)"
  },
  // Confidence Intervals
  {
    id: 6,
    topic: "Z-Interval",
    topicColor: "#f59e0b",
    question: "A population has σ = 12. A sample of 49 has mean 82. Find a 95% confidence interval for μ.",
    answer: "(78.64, 85.36)",
    steps: [
      "σ is KNOWN (12), so use Z-interval",
      "Standard error = σ/√n = 12/√49 = 12/7 = 1.714",
      "For 95% CI, z* = 1.960",
      "Margin of error = 1.960 × 1.714 = 3.36",
      "CI: 82 ± 3.36 = (78.64, 85.36)"
    ],
    ti84: "STAT → TESTS → 7:ZInterval"
  },
  {
    id: 7,
    topic: "T-Interval",
    topicColor: "#f59e0b",
    question: "A sample of 25 has mean 45 and s = 8. Find a 90% confidence interval for μ.",
    answer: "(42.25, 47.75)",
    steps: [
      "Using sample s (σ unknown), so use T-interval",
      "df = n - 1 = 24",
      "Standard error = s/√n = 8/√25 = 8/5 = 1.6",
      "For 90% CI with df=24, t* ≈ 1.711",
      "Margin of error = 1.711 × 1.6 = 2.74",
      "CI: 45 ± 2.74 = (42.26, 47.74)"
    ],
    ti84: "STAT → TESTS → 8:TInterval"
  },
  {
    id: 8,
    topic: "Proportion CI",
    topicColor: "#f59e0b",
    question: "In a survey of 200 people, 120 support a new policy. Find a 95% confidence interval for the population proportion.",
    answer: "(0.532, 0.668)",
    steps: [
      "p̂ = 120/200 = 0.60, q̂ = 0.40",
      "Standard error = √(p̂q̂/n) = √(0.60×0.40/200) = √0.0012 = 0.0346",
      "For 95% CI, z* = 1.960",
      "Margin of error = 1.960 × 0.0346 = 0.068",
      "CI: 0.60 ± 0.068 = (0.532, 0.668)"
    ],
    ti84: "STAT → TESTS → A:1-PropZInt"
  },
  // Hypothesis Testing
  {
    id: 9,
    topic: "Z-Test",
    topicColor: "#ef4444",
    question: "A company claims their batteries last μ = 500 hours. A sample of 36 batteries has mean 490 hours. The population σ = 30. Test at α = 0.05 if batteries last less than claimed.",
    answer: "Reject H₀; p-value = 0.0228",
    steps: [
      "Step 1: H₀: μ = 500, H₁: μ < 500 (left-tailed, 'less than')",
      "Step 2: z = (490 - 500) / (30/√36) = -10 / 5 = -2.0",
      "Step 3: p-value = normalcdf(-1E99, -2, 0, 1) = 0.0228",
      "Step 4: p-value (0.0228) < α (0.05) → Reject H₀",
      "Step 5: At α = 0.05, there IS sufficient evidence to conclude that batteries last less than 500 hours."
    ],
    ti84: "STAT → TESTS → 1:Z-Test"
  },
  {
    id: 10,
    topic: "T-Test",
    topicColor: "#ef4444",
    question: "A teacher claims students average μ = 75 on a test. A sample of 16 students has mean 72 and s = 8. Test at α = 0.10 if the average is different from 75.",
    answer: "Fail to reject H₀; p-value = 0.136",
    steps: [
      "Step 1: H₀: μ = 75, H₁: μ ≠ 75 (two-tailed, 'different')",
      "Step 2: t = (72 - 75) / (8/√16) = -3 / 2 = -1.5, df = 15",
      "Step 3: p-value = 2 × tcdf(-1E99, -1.5, 15) = 2 × 0.0772 = 0.1544",
      "Step 4: p-value (0.1544) > α (0.10) → Fail to Reject H₀",
      "Step 5: At α = 0.10, there is NOT sufficient evidence to conclude that the average differs from 75."
    ],
    ti84: "STAT → TESTS → 2:T-Test"
  },
  {
    id: 11,
    topic: "Proportion Test",
    topicColor: "#ef4444",
    question: "A company claims 80% of customers are satisfied. A survey of 100 finds 72 satisfied. Test at α = 0.05 if the proportion is less than claimed.",
    answer: "Reject H₀; p-value = 0.0228",
    steps: [
      "Step 1: H₀: p = 0.80, H₁: p < 0.80 (left-tailed)",
      "Step 2: p̂ = 72/100 = 0.72",
      "Step 3: z = (0.72 - 0.80) / √(0.80×0.20/100) = -0.08 / 0.04 = -2.0",
      "Note: Use p₀ = 0.80 in denominator, NOT p̂ = 0.72!",
      "Step 4: p-value = normalcdf(-1E99, -2, 0, 1) = 0.0228",
      "Step 5: p-value (0.0228) < α (0.05) → Reject H₀",
      "Conclusion: At α = 0.05, there IS sufficient evidence that satisfaction is less than 80%."
    ],
    ti84: "STAT → TESTS → 5:1-PropZTest"
  },
  {
    id: 12,
    topic: "Two-tailed Test",
    topicColor: "#ef4444",
    question: "Test whether μ = 50 using: n = 25, x̄ = 53, σ = 10, α = 0.05. Is there evidence μ ≠ 50?",
    answer: "Fail to reject H₀; p-value = 0.1336",
    steps: [
      "Step 1: H₀: μ = 50, H₁: μ ≠ 50 (two-tailed)",
      "Step 2: z = (53 - 50) / (10/√25) = 3 / 2 = 1.5",
      "Step 3: p-value = 2 × P(Z > 1.5) = 2 × 0.0668 = 0.1336",
      "Step 4: p-value (0.1336) > α (0.05) → Fail to Reject H₀",
      "Step 5: At α = 0.05, there is NOT sufficient evidence that μ differs from 50."
    ],
  },
  // Two-Sample
  {
    id: 13,
    topic: "Two-Sample T",
    topicColor: "#8b5cf6",
    question: "Group A: n₁=12, x̄₁=85, s₁=6. Group B: n₂=15, x̄₂=80, s₂=8. Test at α = 0.05 if Group A has a higher mean.",
    answer: "Reject H₀; t = 1.86",
    steps: [
      "Step 1: H₀: μ₁ - μ₂ = 0, H₁: μ₁ - μ₂ > 0 (right-tailed)",
      "Step 2: t = (85 - 80) / √(36/12 + 64/15) = 5 / √(3 + 4.267) = 5 / 2.696 = 1.855",
      "Step 3: df = min(12-1, 15-1) = min(11, 14) = 11 ← ALEKS formula!",
      "Step 4: Critical t for df=11, α=0.05, right-tailed: t* = 1.796",
      "Step 5: t (1.855) > t* (1.796) → Reject H₀",
      "Conclusion: At α = 0.05, there IS sufficient evidence that Group A has a higher mean."
    ],
    ti84: "STAT → TESTS → 4:2-SampTTest"
  },
  {
    id: 14,
    topic: "Paired T-Test",
    topicColor: "#8b5cf6",
    question: "Before/After measurements for 10 subjects show d̄ = 5.2, sᵈ = 3.1. Test at α = 0.01 if there's an improvement (increase).",
    answer: "Reject H₀; t = 5.30",
    steps: [
      "Step 1: H₀: μd = 0, H₁: μd > 0 (right-tailed, 'improvement')",
      "Step 2: t = (5.2 - 0) / (3.1/√10) = 5.2 / 0.980 = 5.306",
      "Step 3: df = n - 1 = 10 - 1 = 9",
      "Step 4: Critical t for df=9, α=0.01, right-tailed: t* ≈ 2.821",
      "Step 5: t (5.306) > t* (2.821) → Reject H₀",
      "Conclusion: At α = 0.01, there IS sufficient evidence of improvement."
    ],
  },
  // Chi-Square
  {
    id: 15,
    topic: "Chi-Square GoF",
    topicColor: "#ec4899",
    question: "A die is rolled 60 times with results: 1→8, 2→12, 3→7, 4→15, 5→10, 6→8. Test at α = 0.05 if the die is fair.",
    answer: "Fail to reject H₀; χ² = 4.4",
    steps: [
      "Step 1: H₀: Die is fair (all faces equally likely). H₁: Die is not fair.",
      "Step 2: Expected for each face: E = 60/6 = 10",
      "Step 3: χ² = (8-10)²/10 + (12-10)²/10 + (7-10)²/10 + (15-10)²/10 + (10-10)²/10 + (8-10)²/10",
      "χ² = 0.4 + 0.4 + 0.9 + 2.5 + 0 + 0.4 = 4.6",
      "Step 4: df = k - 1 = 6 - 1 = 5",
      "Step 5: Critical χ² for df=5, α=0.05: χ²₀.₀₅ = 11.070",
      "Step 6: χ² (4.6) < χ²* (11.070) → Fail to Reject H₀",
      "Conclusion: At α = 0.05, there is NOT sufficient evidence that the die is unfair."
    ],
    ti84: "STAT → TESTS → D:χ²GOF-Test"
  },
  {
    id: 16,
    topic: "Chi-Square GoF",
    topicColor: "#ec4899",
    question: "Expected proportions are 50%, 30%, 20% for categories A, B, C. Observed in n=100: A=60, B=25, C=15. Test at α = 0.01.",
    answer: "Fail to reject H₀; χ² = 4.17",
    steps: [
      "Step 1: H₀: Proportions match expected. H₁: Proportions don't match.",
      "Step 2: Expected: A = 100×0.5 = 50, B = 100×0.3 = 30, C = 100×0.2 = 20",
      "Step 3: χ² = (60-50)²/50 + (25-30)²/30 + (15-20)²/20",
      "χ² = 100/50 + 25/30 + 25/20 = 2 + 0.833 + 1.25 = 4.083",
      "Step 4: df = 3 - 1 = 2",
      "Step 5: Critical χ² for df=2, α=0.01: χ²₀.₀₁ = 9.210",
      "Step 6: χ² (4.083) < χ²* (9.210) → Fail to Reject H₀",
      "Conclusion: At α = 0.01, there is NOT sufficient evidence that proportions differ."
    ],
  },
  // ANOVA
  {
    id: 17,
    topic: "ANOVA",
    topicColor: "#06b6d4",
    question: "An ANOVA table shows: SSB = 120, SSW = 180, k = 4 groups, N = 40 total. Find F and test at α = 0.05.",
    answer: "Reject H₀; F = 8.0",
    steps: [
      "Step 1: H₀: μ₁ = μ₂ = μ₃ = μ₄. H₁: At least one mean differs.",
      "Step 2: df₁ = k - 1 = 4 - 1 = 3 (between)",
      "Step 3: df₂ = N - k = 40 - 4 = 36 (within)",
      "Step 4: MSB = SSB/df₁ = 120/3 = 40",
      "Step 5: MSW = SSW/df₂ = 180/36 = 5",
      "Step 6: F = MSB/MSW = 40/5 = 8.0",
      "Step 7: For α=0.05, F* with df=(3,36) ≈ 2.87 (from table)",
      "Step 8: F (8.0) > F* (2.87) → Reject H₀",
      "Conclusion: At least one group mean is different."
    ],
    ti84: "STAT → TESTS → H:ANOVA"
  },
  {
    id: 18,
    topic: "ANOVA",
    topicColor: "#06b6d4",
    question: "Given ANOVA results: MSB = 25, MSW = 10, df₁ = 2, df₂ = 27. Calculate F and p-value.",
    answer: "F = 2.5",
    steps: [
      "Step 1: F = MSB / MSW = 25 / 10 = 2.5",
      "Step 2: df₁ = 2, df₂ = 27",
      "Step 3: Use Fcdf(2.5, 1E99, 2, 27) to find p-value",
      "Step 4: p-value ≈ 0.100",
      "Note: ANOVA only tells us IF a difference exists, not which groups differ."
    ],
    ti84: "Fcdf(2.5, 1E99, 2, 27)"
  },
  // Test Identification
  {
    id: 19,
    topic: "What Test?",
    topicColor: "#64748b",
    question: "A researcher wants to know if there's a difference between men and women in average test scores. Men: n=30, x̄=78, s=8. Women: n=35, x̄=82, s=7. What test?",
    answer: "Two-Sample T-Test",
    steps: [
      "Two independent groups (men vs women)",
      "Comparing two means",
      "Using sample standard deviations (s, not σ)",
      "Answer: Two-Sample T-Test",
      "df = min(30-1, 35-1) = min(29, 34) = 29"
    ],
  },
  {
    id: 20,
    topic: "What Test?",
    topicColor: "#64748b",
    question: "A poll of 500 people finds 280 support a candidate. You want to test if more than half the population supports them. What test?",
    answer: "One-Proportion Z-Test (right-tailed)",
    steps: [
      "Testing a claim about a proportion",
      "One sample, testing against a value (0.50)",
      "'More than' indicates right-tailed",
      "Answer: One-Proportion Z-Test",
      "H₀: p = 0.50, H₁: p > 0.50",
      "Remember: Use p₀ = 0.50 in denominator!"
    ],
  },
];

export default function PracticePage() {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [showAnswers, setShowAnswers] = useState<Set<number>>(new Set());

  const topics = ["all", ...new Set(problems.map(p => p.topic))];
  const filteredProblems = selectedTopic === "all"
    ? problems
    : problems.filter(p => p.topic === selectedTopic);

  const toggleSteps = (id: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSteps(newExpanded);
  };

  const toggleAnswer = (id: number) => {
    const newAnswers = new Set(showAnswers);
    if (newAnswers.has(id)) {
      newAnswers.delete(id);
    } else {
      newAnswers.add(id);
    }
    setShowAnswers(newAnswers);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
        <p className="text-gray-400">Work through these problems, then check your work with the step-by-step solutions.</p>
      </div>

      {/* Topic Filter */}
      <div className="flex flex-wrap gap-2">
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTopic === topic
                ? "bg-[#3B82F6] text-white"
                : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
            }`}
          >
            {topic === "all" ? "All Topics" : topic}
          </button>
        ))}
      </div>

      {/* Problems */}
      <div className="space-y-6">
        {filteredProblems.map(problem => (
          <div key={problem.id} className="card">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span
                className="px-2 py-1 rounded text-xs font-bold"
                style={{ backgroundColor: `${problem.topicColor}20`, color: problem.topicColor }}
              >
                {problem.topic}
              </span>
              <span className="text-gray-500 text-sm">#{problem.id}</span>
            </div>

            <p className="text-lg text-gray-200 mb-4">{problem.question}</p>

            <div className="flex gap-3">
              <button
                onClick={() => toggleAnswer(problem.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showAnswers.has(problem.id)
                    ? "bg-[#22c55e] text-white"
                    : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
                }`}
              >
                {showAnswers.has(problem.id) ? "Hide Answer" : "Show Answer"}
              </button>
              <button
                onClick={() => toggleSteps(problem.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  expandedSteps.has(problem.id)
                    ? "bg-[#3B82F6] text-white"
                    : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
                }`}
              >
                {expandedSteps.has(problem.id) ? "Hide Steps" : "Show Steps"}
              </button>
            </div>

            {showAnswers.has(problem.id) && (
              <div className="mt-4 p-4 bg-[#22c55e]/10 border border-[#22c55e] rounded-lg">
                <span className="font-bold text-[#22c55e]">Answer: </span>
                <span className="text-white">{problem.answer}</span>
              </div>
            )}

            {expandedSteps.has(problem.id) && (
              <div className="mt-4 space-y-3">
                <h3 className="font-bold text-[#3B82F6]">Solution Steps:</h3>
                <ol className="space-y-2">
                  {problem.steps.map((step, index) => (
                    <li key={index} className="flex gap-3 text-gray-300">
                      <span className="text-[#3B82F6] font-mono text-sm">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                {problem.ti84 && (
                  <div className="mt-3 p-3 bg-[#0f172a] rounded-lg">
                    <span className="text-gray-400 text-sm">TI-84: </span>
                    <span className="font-mono text-[#3B82F6]">{problem.ti84}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="tip-box">
        <h3 className="font-bold text-[#3B82F6] mb-2">Practice Tips</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Try solving each problem BEFORE looking at the steps</li>
          <li>• Pay attention to the keywords that tell you which test to use</li>
          <li>• Practice the 5-step hypothesis testing framework</li>
          <li>• Make sure you understand WHY each step is done</li>
        </ul>
      </div>
    </div>
  );
}
