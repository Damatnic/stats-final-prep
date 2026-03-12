"use client";

import { useState } from "react";

interface TreeNode {
  id: string;
  question: string;
  options: {
    label: string;
    next?: string;
    result?: {
      test: string;
      formula: string;
      df?: string;
      ti84?: string;
      notes?: string;
    };
  }[];
}

const decisionTree: Record<string, TreeNode> = {
  start: {
    id: "start",
    question: "What type of problem are you solving?",
    options: [
      { label: "Finding a probability (area under curve)", next: "probability" },
      { label: "Estimating a parameter (Confidence Interval)", next: "ci" },
      { label: "Testing a claim (Hypothesis Test)", next: "ht" },
      { label: "Testing if data fits a distribution (Chi-Square GoF)", next: "chisquare_result" },
      { label: "Comparing 3+ group means (ANOVA)", next: "anova_result" },
    ],
  },
  probability: {
    id: "probability",
    question: "Are you finding the probability for one individual or a sample mean?",
    options: [
      {
        label: "One individual (e.g., 'randomly selected person')",
        result: {
          test: "Z-score (Individual)",
          formula: "z = (x - μ) / σ",
          ti84: "normalcdf(lower, upper, μ, σ)",
          notes: "Use σ directly (no √n)",
        },
      },
      {
        label: "A sample of n (e.g., 'random sample of 50')",
        result: {
          test: "Central Limit Theorem",
          formula: "z = (x̄ - μ) / (σ/√n)",
          ti84: "normalcdf(lower, upper, μ, σ/√n)",
          notes: "Use standard error σ/√n",
        },
      },
    ],
  },
  ci: {
    id: "ci",
    question: "What are you estimating?",
    options: [
      { label: "A population mean (μ)", next: "ci_mean" },
      { label: "A population proportion (p)", next: "ci_prop_result" },
    ],
  },
  ci_mean: {
    id: "ci_mean",
    question: "Is the population standard deviation (σ) known?",
    options: [
      {
        label: "Yes, σ is given as a known value",
        result: {
          test: "Z-Interval",
          formula: "x̄ ± z* · (σ/√n)",
          ti84: "STAT → TESTS → 7:ZInterval",
          notes: "Critical z*: 90%→1.645, 95%→1.960, 99%→2.576",
        },
      },
      {
        label: "No, using sample standard deviation (s)",
        result: {
          test: "T-Interval",
          formula: "x̄ ± t* · (s/√n)",
          df: "df = n - 1",
          ti84: "STAT → TESTS → 8:TInterval",
          notes: "Use t* from t-table with df = n-1",
        },
      },
    ],
  },
  ci_prop_result: {
    id: "ci_prop_result",
    question: "",
    options: [
      {
        label: "Proportion (x successes out of n trials)",
        result: {
          test: "Proportion Z-Interval",
          formula: "p̂ ± z* · √(p̂q̂/n)",
          ti84: "STAT → TESTS → A:1-PropZInt",
          notes: "p̂ = x/n, q̂ = 1 - p̂",
        },
      },
    ],
  },
  ht: {
    id: "ht",
    question: "What parameter are you testing a claim about?",
    options: [
      { label: "A population mean (μ)", next: "ht_mean" },
      { label: "A population proportion (p)", next: "ht_prop_result" },
      { label: "Comparing two means", next: "ht_twomean" },
      { label: "Comparing two proportions", next: "ht_twoprop_result" },
    ],
  },
  ht_mean: {
    id: "ht_mean",
    question: "Is the population standard deviation (σ) known?",
    options: [
      {
        label: "Yes, σ is given",
        result: {
          test: "Z-Test for Mean",
          formula: "z = (x̄ - μ₀) / (σ/√n)",
          ti84: "STAT → TESTS → 1:Z-Test",
          notes: "Compare z to critical value or find p-value with normalcdf",
        },
      },
      {
        label: "No, using sample standard deviation (s)",
        result: {
          test: "T-Test for Mean",
          formula: "t = (x̄ - μ₀) / (s/√n)",
          df: "df = n - 1",
          ti84: "STAT → TESTS → 2:T-Test",
          notes: "Compare t to t-critical or find p-value with tcdf",
        },
      },
    ],
  },
  ht_prop_result: {
    id: "ht_prop_result",
    question: "",
    options: [
      {
        label: "Testing claim about a proportion",
        result: {
          test: "Z-Test for Proportion",
          formula: "z = (p̂ - p₀) / √(p₀q₀/n)",
          ti84: "STAT → TESTS → 5:1-PropZTest",
          notes: "IMPORTANT: Use p₀ (null value) in denominator, NOT p̂!",
        },
      },
    ],
  },
  ht_twomean: {
    id: "ht_twomean",
    question: "Are the samples independent or paired (related)?",
    options: [
      {
        label: "Independent (two separate groups)",
        result: {
          test: "Two-Sample T-Test",
          formula: "t = (x̄₁ - x̄₂) / √(s₁²/n₁ + s₂²/n₂)",
          df: "df = min(n₁ - 1, n₂ - 1) ← ALEKS uses this!",
          ti84: "STAT → TESTS → 4:2-SampTTest",
          notes: "H₀: μ₁ - μ₂ = 0 (or μ₁ = μ₂)",
        },
      },
      {
        label: "Paired (same subjects measured twice)",
        result: {
          test: "Paired T-Test",
          formula: "t = (d̄ - 0) / (sᵈ/√n)",
          df: "df = n - 1 (n = number of pairs)",
          ti84: "Calculate differences d, then use T-Test on d values",
          notes: "d = difference for each pair",
        },
      },
    ],
  },
  ht_twoprop_result: {
    id: "ht_twoprop_result",
    question: "",
    options: [
      {
        label: "Comparing two proportions",
        result: {
          test: "Two-Proportion Z-Test",
          formula: "z = (p̂₁ - p̂₂) / √[p̄(1-p̄)(1/n₁ + 1/n₂)]",
          ti84: "STAT → TESTS → 6:2-PropZTest",
          notes: "Pooled proportion: p̄ = (x₁ + x₂) / (n₁ + n₂)",
        },
      },
    ],
  },
  chisquare_result: {
    id: "chisquare_result",
    question: "",
    options: [
      {
        label: "Chi-Square Goodness of Fit",
        result: {
          test: "Chi-Square Goodness of Fit",
          formula: "χ² = Σ (O - E)² / E",
          df: "df = k - 1 (k = number of categories)",
          ti84: "STAT → TESTS → D:χ²GOF-Test",
          notes: "ALWAYS right-tailed. TI-84 has NO invχ² - use table for critical values!",
        },
      },
    ],
  },
  anova_result: {
    id: "anova_result",
    question: "",
    options: [
      {
        label: "One-Way ANOVA",
        result: {
          test: "ANOVA (Analysis of Variance)",
          formula: "F = MSB / MSW",
          df: "df₁ = k - 1 (between), df₂ = N - k (within)",
          ti84: "STAT → TESTS → H:ANOVA",
          notes: "ALWAYS right-tailed. Tests if at least one mean differs.",
        },
      },
    ],
  },
};

export default function DecisionTreePage() {
  const [currentNode, setCurrentNode] = useState<string>("start");
  const [history, setHistory] = useState<string[]>([]);
  const [selectedResult, setSelectedResult] = useState<{
    test: string;
    formula: string;
    df?: string;
    ti84?: string;
    notes?: string;
  } | null>(null);

  const node = decisionTree[currentNode];

  const handleSelect = (option: (typeof node.options)[0]) => {
    if (option.result) {
      setSelectedResult(option.result);
    } else if (option.next) {
      setHistory([...history, currentNode]);
      setCurrentNode(option.next);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentNode(prev);
      setSelectedResult(null);
    }
  };

  const handleReset = () => {
    setCurrentNode("start");
    setHistory([]);
    setSelectedResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">What Test Should I Use?</h1>
      <p className="text-gray-400 mb-8">
        Answer the questions to find the right statistical test for your problem.
      </p>

      {/* Navigation */}
      <div className="flex gap-2 mb-6">
        {history.length > 0 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] rounded-lg text-sm transition-colors"
          >
            Back
          </button>
        )}
        {(history.length > 0 || selectedResult) && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] rounded-lg text-sm transition-colors"
          >
            Start Over
          </button>
        )}
      </div>

      {/* Result */}
      {selectedResult ? (
        <div className="card border-[#22c55e]">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-[#22c55e]">{selectedResult.test}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Formula</h3>
              <div className="formula-box text-lg">
                {selectedResult.formula}
              </div>
            </div>

            {selectedResult.df && (
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Degrees of Freedom</h3>
                <div className="formula-box">
                  {selectedResult.df}
                </div>
              </div>
            )}

            {selectedResult.ti84 && (
              <div>
                <h3 className="text-sm text-gray-400 mb-1">TI-84 Command</h3>
                <div className="bg-[#0f172a] p-3 rounded-lg font-mono text-[#3B82F6]">
                  {selectedResult.ti84}
                </div>
              </div>
            )}

            {selectedResult.notes && (
              <div className="tip-box">
                <p className="text-sm">{selectedResult.notes}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Question */
        <div className="card">
          <h2 className="text-xl font-bold mb-6">{node.question}</h2>
          <div className="space-y-3">
            {node.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="w-full text-left p-4 bg-[#0f172a] hover:bg-[#1a2744] border border-[#334155] hover:border-[#3B82F6] rounded-lg transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-200 group-hover:text-white">
                    {option.label}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 group-hover:text-[#3B82F6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <div className="mt-8 card">
        <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Quick Reference</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-bold text-white mb-2">Use Z when:</h3>
            <ul className="text-gray-300 space-y-1">
              <li>• Population σ is KNOWN</li>
              <li>• Testing or estimating a proportion</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Use T when:</h3>
            <ul className="text-gray-300 space-y-1">
              <li>• Using sample std dev (s)</li>
              <li>• σ is UNKNOWN</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Key df formulas:</h3>
            <ul className="text-gray-300 space-y-1">
              <li>• One sample: df = n - 1</li>
              <li>• Two sample: df = min(n₁-1, n₂-1)</li>
              <li>• Chi-square: df = k - 1</li>
              <li>• ANOVA: df₁ = k-1, df₂ = N-k</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Always right-tailed:</h3>
            <ul className="text-gray-300 space-y-1">
              <li>• Chi-Square tests</li>
              <li>• ANOVA F-tests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
