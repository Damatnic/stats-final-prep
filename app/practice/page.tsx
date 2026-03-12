"use client";

import { useState, useRef, useEffect } from "react";

interface IdentifyField {
  id: string;
  label: string;
  answer: number | string;
  tolerance?: number;
  hint: string;
}

interface Field {
  id: string;
  label: string;
  answer: number | string;
  tolerance?: number;
  hint: string;
}

interface Step {
  instruction: string;
  fields: Field[];
  explanation: string;
}

interface Problem {
  id: number;
  topic: string;
  color: string;
  question: string;
  identifyFields: IdentifyField[];
  steps: Step[];
  ti83?: string;
}

const problems: Problem[] = [
  {
    id: 1, topic: "Empirical Rule", color: "#3B82F6",
    question: "IQ scores in a population follow a normal distribution. The average IQ is 100 and the standard deviation is 15 points. According to the empirical rule, what percentage of people have IQ scores between 85 and 115?",
    identifyFields: [
      { id: "i1f1", label: "Population mean: μ = ", answer: 100, hint: "'average IQ is 100' → μ = 100" },
      { id: "i1f2", label: "Population std dev: σ = ", answer: 15, hint: "'standard deviation is 15 points' → σ = 15" },
      { id: "i1f3", label: "Lower bound in the question: ", answer: 85, hint: "'between 85 and 115' → lower = 85" },
      { id: "i1f4", label: "Upper bound in the question: ", answer: 115, hint: "'between 85 and 115' → upper = 115" },
    ],
    steps: [
      { instruction: "How far is 85 from the mean? (mean − lower bound)", fields: [{ id: "s1f1", label: "100 − 85 = ", answer: 15, hint: "100 - 85 = 15" }], explanation: "85 is exactly 15 points (1σ) below the mean." },
      { instruction: "So 85 is how many standard deviations below the mean? (result ÷ σ)", fields: [{ id: "s2f1", label: "15 ÷ 15 = ", answer: 1, hint: "15 ÷ 15 = 1 standard deviation" }], explanation: "85 is 1 SD below, 115 is 1 SD above → μ ± 1σ range." },
      { instruction: "By the Empirical Rule, what % falls within 1 SD of the mean?", fields: [{ id: "s3f1", label: "% = ", answer: 68, hint: "Empirical rule: 1σ = 68%, 2σ = 95%, 3σ = 99.7%" }], explanation: "68% of all data falls within μ ± 1σ. Memorize: 68-95-99.7." },
    ],
  },
  {
    id: 2, topic: "Symmetry Trap ⚠️", color: "#EF4444",
    question: "SAT scores are normally distributed with an average of 1060 and a standard deviation of 195. A college wants to admit students who score at the 93rd percentile or higher. What is the minimum SAT score needed?",
    identifyFields: [
      { id: "i2f1", label: "Population mean: μ = ", answer: 1060, hint: "'average of 1060' → μ = 1060" },
      { id: "i2f2", label: "Population std dev: σ = ", answer: 195, hint: "'standard deviation of 195' → σ = 195" },
      { id: "i2f3", label: "Percentile as area to the LEFT (decimal): ", answer: 0.93, tolerance: 0.005, hint: "'93rd percentile' → 93% of scores below → area left = 0.93" },
    ],
    steps: [
      { instruction: "93rd percentile = what fraction of scores are BELOW the target? (as decimal)", fields: [{ id: "s1f1", label: "area to left = ", answer: 0.93, tolerance: 0.001, hint: "93rd percentile = 93% below = 0.93 to the left" }], explanation: "Area to left = 0.93. Use invNorm(0.93, 0, 1) to find z." },
      { instruction: "Find z-score: invNorm(0.93, 0, 1). ⚠️ TRAP: this z is POSITIVE!", fields: [{ id: "s2f1", label: "z = ", answer: 1.4758, tolerance: 0.02, hint: "⚠️ 93rd percentile is RIGHT of center → z is POSITIVE (+1.48). If you got -1.48, FLIP the sign!" }], explanation: "z = +1.4758 (POSITIVE). 93rd percentile → right side → positive z. This WILL be on the exam." },
      { instruction: "Calculate x = μ + z·σ = 1060 + (1.4758 × 195). Round to nearest whole number.", fields: [{ id: "s3f1", label: "x = ", answer: 1348, tolerance: 5, hint: "1060 + (1.4758 × 195) = 1060 + 287.78 ≈ 1348" }], explanation: "Minimum score = 1348. Formula: x = μ + z·σ" },
    ],
    ti83: "invNorm(0.93, 1060, 195) → 2nd DISTR → 3:invNorm",
  },
  {
    id: 3, topic: "CLT — Sample Mean", color: "#8B5CF6",
    question: "The time customers spend in a coffee shop averages 45 minutes with a standard deviation of 10 minutes. A random sample of 25 customers is observed. What is the probability that the sample mean is less than 43 minutes?",
    identifyFields: [
      { id: "i3f1", label: "Population mean: μ = ", answer: 45, hint: "'averages 45 minutes' → μ = 45" },
      { id: "i3f2", label: "Population std dev (σ given → use CLT): σ = ", answer: 10, hint: "'standard deviation of 10 minutes' → σ = 10 (population SD)" },
      { id: "i3f3", label: "Sample size: n = ", answer: 25, hint: "'sample of 25 customers' → n = 25 → this is a SAMPLE MEAN problem → use σ/√n" },
      { id: "i3f4", label: "Target sample mean we're finding P for: x̄ = ", answer: 43, hint: "Asking about P(x̄ < 43) → target = 43" },
    ],
    steps: [
      { instruction: "Calculate the standard error: SE = σ/√n = 10/√25", fields: [{ id: "s1f1", label: "SE = 10 ÷ √25 = ", answer: 2, tolerance: 0.01, hint: "√25 = 5, so 10/5 = 2" }], explanation: "SE = 2. Standard error is how much the sample mean varies — always smaller than σ." },
      { instruction: "Find the z-score: z = (x̄ − μ) / SE = (43 − 45) / 2", fields: [{ id: "s2f1", label: "z = ", answer: -1, tolerance: 0.01, hint: "z = -2/2 = -1.00" }], explanation: "z = -1. Negative because 43 < 45." },
      { instruction: "Find P(Z < −1) using normalcdf(-1E99, -1, 0, 1). Round to 4 decimal places.", fields: [{ id: "s3f1", label: "P = ", answer: 0.1587, tolerance: 0.003, hint: "normalcdf(-1E99, -1, 0, 1) ≈ 0.1587" }], explanation: "P ≈ 0.1587. About 15.87% of samples of 25 would have mean < 43 min." },
    ],
    ti83: "normalcdf(-1E99, 43, 45, 10/√(25)) → 2nd DISTR → 2:normalcdf",
  },
  {
    id: 4, topic: "Z-Interval (σ known)", color: "#10B981",
    question: "A researcher is studying adult sleep. From prior research, the population standard deviation is 1.5 hours. A random sample of 64 adults produces an average of 6.8 hours of sleep. Construct a 95% confidence interval for the true mean.",
    identifyFields: [
      { id: "i4f1", label: "Population std dev (σ KNOWN → Z-interval): σ = ", answer: 1.5, hint: "'population standard deviation is 1.5' → σ known → Z-interval (not T!)" },
      { id: "i4f2", label: "Sample size: n = ", answer: 64, hint: "'sample of 64 adults' → n = 64" },
      { id: "i4f3", label: "Sample mean: x̄ = ", answer: 6.8, hint: "'average of 6.8 hours' → x̄ = 6.8" },
      { id: "i4f4", label: "Confidence level as decimal: C = ", answer: 0.95, tolerance: 0.005, hint: "'95% confidence' → C = 0.95 → z* = 1.96" },
    ],
    steps: [
      { instruction: "σ is known → Z-interval. What is z* for 95% confidence?", fields: [{ id: "s1f1", label: "z* = ", answer: 1.96, tolerance: 0.01, hint: "95% CI → z* = 1.96 (memorize: 90%=1.645, 95%=1.96, 99%=2.576)" }], explanation: "z* = 1.96 for 95% CI. σ known → Z, not T." },
      { instruction: "SE = σ/√n = 1.5/√64", fields: [{ id: "s2f1", label: "SE = ", answer: 0.1875, tolerance: 0.005, hint: "√64 = 8, so 1.5/8 = 0.1875" }], explanation: "SE = 0.1875" },
      { instruction: "Margin of error E = z* × SE = 1.96 × 0.1875", fields: [{ id: "s3f1", label: "E = ", answer: 0.3675, tolerance: 0.005, hint: "1.96 × 0.1875 = 0.3675" }], explanation: "E = 0.3675" },
      { instruction: "Lower bound = x̄ − E = 6.8 − 0.3675", fields: [{ id: "s4f1", label: "Lower = ", answer: 6.4325, tolerance: 0.01, hint: "6.8 - 0.3675 = 6.4325" }], explanation: "Lower = 6.4325" },
      { instruction: "Upper bound = x̄ + E = 6.8 + 0.3675", fields: [{ id: "s5f1", label: "Upper = ", answer: 7.1675, tolerance: 0.01, hint: "6.8 + 0.3675 = 7.1675" }], explanation: "95% CI: (6.43, 7.17). 'We are 95% CONFIDENT the true mean sleep time is between 6.43 and 7.17 hours.'" },
    ],
    ti83: "STAT → TESTS → 7:ZInterval",
  },
  {
    id: 5, topic: "T-Interval (s from sample)", color: "#10B981",
    question: "A professor samples 20 students and finds they scored an average of 74 points on a standardized test, with a standard deviation of 8 points. Find a 90% confidence interval for the true mean score.",
    identifyFields: [
      { id: "i5f1", label: "Sample mean: x̄ = ", answer: 74, hint: "'scored an average of 74 points' → x̄ = 74" },
      { id: "i5f2", label: "Sample std dev (s given, not σ → T-interval): s = ", answer: 8, hint: "'standard deviation of 8 points' → this is s (sample SD) → T-interval, not Z!" },
      { id: "i5f3", label: "Sample size: n = ", answer: 20, hint: "'samples 20 students' → n = 20" },
      { id: "i5f4", label: "Degrees of freedom: df = n − 1 = ", answer: 19, hint: "df = 20 − 1 = 19" },
    ],
    steps: [
      { instruction: "s is given (not σ) → T-interval. df = n − 1 = ?", fields: [{ id: "s1f1", label: "df = ", answer: 19, hint: "df = 20 - 1 = 19" }], explanation: "df = 19. We use T because only the sample SD (s) is known." },
      { instruction: "Look up t* for 90% CI, df = 19. Use t-table (TI-83 Plus has NO invT!).", fields: [{ id: "s2f1", label: "t* = ", answer: 1.729, tolerance: 0.005, hint: "t-table: df=19, 90% CI → t* ≈ 1.729. ⚠️ TI-83 Plus has NO invT — use t-table!" }], explanation: "t* ≈ 1.729. TI-83 Plus has no invT — always use the t-table for critical values." },
      { instruction: "SE = s/√n = 8/√20. Round to 4 decimal places.", fields: [{ id: "s3f1", label: "SE = ", answer: 1.7889, tolerance: 0.01, hint: "√20 ≈ 4.4721, so 8/4.4721 ≈ 1.7889" }], explanation: "SE ≈ 1.7889" },
      { instruction: "E = t* × SE = 1.729 × 1.7889", fields: [{ id: "s4f1", label: "E = ", answer: 3.09, tolerance: 0.06, hint: "1.729 × 1.7889 ≈ 3.09" }], explanation: "E ≈ 3.09" },
      { instruction: "Lower = x̄ − E. Enter the lower bound.", fields: [{ id: "s5f1", label: "Lower = ", answer: 70.91, tolerance: 0.1, hint: "74 - 3.09 = 70.91" }], explanation: "90% CI: (70.91, 77.09). We are 90% confident the true mean is between 70.91 and 77.09." },
    ],
    ti83: "STAT → TESTS → 8:TInterval",
  },
  {
    id: 6, topic: "Proportion CI", color: "#10B981",
    question: "A researcher surveys 300 college students and finds 234 own a laptop. Find a 95% confidence interval for the true proportion of college students who own a laptop.",
    identifyFields: [
      { id: "i6f1", label: "Sample size: n = ", answer: 300, hint: "'surveys 300 college students' → n = 300" },
      { id: "i6f2", label: "Count with the trait (successes): x = ", answer: 234, hint: "'234 own a laptop' → x = 234 (this is a count → proportion problem)" },
      { id: "i6f3", label: "Sample proportion: p̂ = x/n = ", answer: 0.78, tolerance: 0.005, hint: "234 ÷ 300 = 0.78" },
    ],
    steps: [
      { instruction: "Calculate p̂ = x/n = 234/300", fields: [{ id: "s1f1", label: "p̂ = ", answer: 0.78, tolerance: 0.005, hint: "234 ÷ 300 = 0.78" }], explanation: "p̂ = 0.78" },
      { instruction: "q̂ = 1 − p̂", fields: [{ id: "s2f1", label: "q̂ = ", answer: 0.22, tolerance: 0.005, hint: "1 - 0.78 = 0.22" }], explanation: "q̂ = 0.22" },
      { instruction: "SE = √(p̂ × q̂ / n) = √(0.78 × 0.22 / 300)", fields: [{ id: "s3f1", label: "SE = ", answer: 0.0239, tolerance: 0.002, hint: "√(0.1716/300) = √0.000572 ≈ 0.0239" }], explanation: "SE ≈ 0.0239" },
      { instruction: "E = z* × SE = 1.96 × 0.0239", fields: [{ id: "s4f1", label: "E = ", answer: 0.0468, tolerance: 0.005, hint: "1.96 × 0.0239 ≈ 0.0468" }], explanation: "E ≈ 0.0468" },
      { instruction: "Upper bound = p̂ + E", fields: [{ id: "s5f1", label: "Upper = ", answer: 0.8268, tolerance: 0.01, hint: "0.78 + 0.0468 = 0.8268" }], explanation: "95% CI: (0.7332, 0.8268) → between 73.3% and 82.7% of students own a laptop." },
    ],
    ti83: "STAT → TESTS → A:1-PropZInt",
  },
  {
    id: 7, topic: "Z-Test — Left Tailed", color: "#F59E0B",
    question: "A company states that their light bulbs have a mean lifetime of 1000 hours. A consumer group tests a random sample of 49 bulbs and records an average lifetime of 980 hours. Records show the population standard deviation is 70 hours. Using a significance level of 0.05, is there sufficient evidence the mean lifetime is less than the stated value?",
    identifyFields: [
      { id: "i7f1", label: "Claimed mean (goes in H₀): μ₀ = ", answer: 1000, hint: "'mean lifetime of 1000 hours' → this is the company's claim → μ₀ = 1000" },
      { id: "i7f2", label: "Population std dev (σ KNOWN → Z-test): σ = ", answer: 70, hint: "'population standard deviation is 70' → σ known → Z-test (not T!)" },
      { id: "i7f3", label: "Sample size: n = ", answer: 49, hint: "'sample of 49 bulbs' → n = 49" },
      { id: "i7f4", label: "Sample mean: x̄ = ", answer: 980, hint: "'average lifetime of 980 hours' → x̄ = 980" },
      { id: "i7f5", label: "Significance level: α = ", answer: 0.05, tolerance: 0.001, hint: "'significance level of 0.05' → α = 0.05" },
      { id: "i7f6", label: "Alternative hypothesis direction (type < > or ≠): H₁: μ ", answer: "<", hint: "'less than' → H₁: μ < 1000 → left-tailed. Type the symbol: <" },
    ],
    steps: [
      { instruction: "H₁: μ < 1000 (left-tailed). σ known → Z-test. Calculate: z = (x̄ − μ₀) / (σ/√n)", fields: [{ id: "s1f1", label: "z = ", answer: -2, tolerance: 0.01, hint: "70/√49 = 70/7 = 10. z = (980-1000)/10 = -2.00" }], explanation: "z = -2.00. Negative because x̄ < μ₀." },
      { instruction: "Left-tailed p-value = P(Z < −2.00). Use normalcdf(-1E99, -2, 0, 1).", fields: [{ id: "s2f1", label: "p-value = ", answer: 0.0228, tolerance: 0.002, hint: "normalcdf(-1E99, -2, 0, 1) ≈ 0.0228" }], explanation: "p-value = 0.0228. Only 2.28% chance of seeing this result if claim were true." },
      { instruction: "Is p-value < α? Enter 1 to Reject H₀, or 0 to Fail to Reject.", fields: [{ id: "s3f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.0228 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. At α = 0.05, sufficient evidence the mean lifetime is less than 1000 hours." },
    ],
    ti83: "STAT → TESTS → 1:Z-Test",
  },
  {
    id: 8, topic: "Z-Test — Right Tailed", color: "#F59E0B",
    question: "A tire company claims their tires last an average of 50,000 miles. A consumer group believes the true mean is higher. They test a sample of 64 tires and find a mean of 51,200 miles. The population standard deviation is 4,800 miles. At a significance level of 0.05, is there evidence the true mean exceeds the claim?",
    identifyFields: [
      { id: "i8f1", label: "Claimed mean (H₀): μ₀ = ", answer: 50000, hint: "'average of 50,000 miles' → the claim → μ₀ = 50000" },
      { id: "i8f2", label: "Population std dev (σ → Z-test): σ = ", answer: 4800, hint: "'population standard deviation is 4,800' → σ known → Z-test" },
      { id: "i8f3", label: "Sample size: n = ", answer: 64, hint: "'sample of 64 tires' → n = 64" },
      { id: "i8f4", label: "Sample mean: x̄ = ", answer: 51200, hint: "'mean of 51,200 miles' → x̄ = 51200" },
      { id: "i8f5", label: "Significance level: α = ", answer: 0.05, tolerance: 0.001, hint: "'significance level of 0.05' → α = 0.05" },
      { id: "i8f6", label: "Alternative hypothesis direction (type < > or ≠): H₁: μ ", answer: ">", hint: "'exceeds' → H₁: μ > 50000 → right-tailed. Type the symbol: >" },
    ],
    steps: [
      { instruction: "'Exceeds' → RIGHT-tailed. H₁: μ > 50000. Calculate z = (51200 − 50000) / (4800/√64)", fields: [{ id: "s1f1", label: "z = ", answer: 2, tolerance: 0.01, hint: "4800/√64 = 4800/8 = 600. z = 1200/600 = 2.00" }], explanation: "z = +2.00. Positive because x̄ > μ₀." },
      { instruction: "Right-tailed p-value = P(Z > 2.00). Use normalcdf(2, 1E99, 0, 1).", fields: [{ id: "s2f1", label: "p-value = ", answer: 0.0228, tolerance: 0.002, hint: "normalcdf(2, 1E99, 0, 1) ≈ 0.0228" }], explanation: "p-value = 0.0228" },
      { instruction: "Is 0.0228 < α (0.05)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s3f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.0228 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. Evidence that mean tire life exceeds 50,000 miles." },
    ],
    ti83: "STAT → TESTS → 1:Z-Test",
  },
  {
    id: 9, topic: "Z-Test — Two Tailed", color: "#F59E0B",
    question: "A packaging machine fills bags with 16 oz of chips. The population standard deviation is 0.4 oz. A quality inspector samples 36 bags and finds a mean of 15.85 oz. At a significance level of 0.01, is there evidence the machine is filling bags incorrectly (in either direction)?",
    identifyFields: [
      { id: "i9f1", label: "Claimed fill amount (H₀): μ₀ = ", answer: 16, hint: "'fills bags with 16 oz' → the target → μ₀ = 16" },
      { id: "i9f2", label: "Population std dev (σ → Z-test): σ = ", answer: 0.4, hint: "'population standard deviation is 0.4 oz' → σ known → Z-test" },
      { id: "i9f3", label: "Sample size: n = ", answer: 36, hint: "'samples 36 bags' → n = 36" },
      { id: "i9f4", label: "Sample mean: x̄ = ", answer: 15.85, tolerance: 0.005, hint: "'mean of 15.85 oz' → x̄ = 15.85" },
      { id: "i9f5", label: "Significance level: α = ", answer: 0.01, tolerance: 0.001, hint: "'significance level of 0.01' → α = 0.01" },
      { id: "i9f6", label: "Alternative hypothesis direction (type < > or ≠): H₁: μ ", answer: "≠", hint: "'either direction' / 'incorrectly' → H₁: μ ≠ 16 → two-tailed. Type ≠ or !=" },
    ],
    steps: [
      { instruction: "'Either direction' → TWO-TAILED. H₁: μ ≠ 16. Calculate z = (15.85 − 16) / (0.4/√36)", fields: [{ id: "s1f1", label: "z = ", answer: -2.25, tolerance: 0.05, hint: "0.4/6 = 0.0667. z = -0.15/0.0667 = -2.25" }], explanation: "z = -2.25" },
      { instruction: "Two-tailed p-value = 2 × P(Z < −2.25) = 2 × normalcdf(-1E99, -2.25, 0, 1)", fields: [{ id: "s2f1", label: "p-value = ", answer: 0.0244, tolerance: 0.003, hint: "normalcdf(-1E99, -2.25) ≈ 0.0122. Two-tailed: × 2 = 0.0244" }], explanation: "p-value = 0.0244. REMEMBER: two-tailed means you double the one-tail area." },
      { instruction: "Is 0.0244 < α (0.01)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s3f1", label: "Reject? (1=yes, 0=no) = ", answer: 0, hint: "0.0244 > 0.01 → Fail to Reject H₀" }], explanation: "FAIL TO REJECT H₀. At α = 0.01, not enough evidence. (At α = 0.05 it would be rejected — α matters!)" },
    ],
    ti83: "STAT → TESTS → 1:Z-Test",
  },
  {
    id: 10, topic: "T-Test — Two Tailed", color: "#F59E0B",
    question: "A gym advertises that new members lose an average of 10 pounds in their first month. A researcher randomly selects 16 members and finds they lost an average of 8.5 pounds, with a standard deviation of 3 pounds. At a significance level of 0.05, is there evidence the actual mean differs from 10 pounds?",
    identifyFields: [
      { id: "i10f1", label: "Claimed mean (H₀): μ₀ = ", answer: 10, hint: "'lose an average of 10 pounds' → the advertised claim → μ₀ = 10" },
      { id: "i10f2", label: "Sample mean: x̄ = ", answer: 8.5, hint: "'found they lost an average of 8.5 pounds' → x̄ = 8.5" },
      { id: "i10f3", label: "Sample std dev (s given → T-test): s = ", answer: 3, hint: "'standard deviation of 3 pounds' → s from sample → T-test" },
      { id: "i10f4", label: "Sample size: n = ", answer: 16, hint: "'randomly selects 16 members' → n = 16" },
      { id: "i10f5", label: "Significance level: α = ", answer: 0.05, tolerance: 0.001, hint: "'significance level of 0.05' → α = 0.05" },
      { id: "i10f6", label: "Alternative hypothesis direction (type < > or ≠): H₁: μ ", answer: "≠", hint: "'different from advertised' → H₁: μ ≠ 10 → two-tailed. Type ≠ or !=" },
    ],
    steps: [
      { instruction: "s given → T-test. df = n − 1 = ?", fields: [{ id: "s1f1", label: "df = ", answer: 15, hint: "16 - 1 = 15" }], explanation: "df = 15. T-test because only s is known." },
      { instruction: "t = (x̄ − μ₀) / (s/√n) = (8.5 − 10) / (3/√16)", fields: [{ id: "s2f1", label: "t = ", answer: -2, tolerance: 0.01, hint: "3/√16 = 3/4 = 0.75. t = -1.5/0.75 = -2.00" }], explanation: "t = -2.00, df = 15" },
      { instruction: "Two-tailed p-value = 2 × tcdf(|t|, 1E99, df) = 2 × tcdf(2, 1E99, 15)", fields: [{ id: "s3f1", label: "p-value = ", answer: 0.0644, tolerance: 0.005, hint: "tcdf(2, 1E99, 15) ≈ 0.0322 × 2 = 0.0644" }], explanation: "p-value ≈ 0.0644" },
      { instruction: "Is 0.0644 < α (0.05)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 0, hint: "0.0644 > 0.05 → Fail to Reject" }], explanation: "FAIL TO REJECT H₀. Not enough evidence. (NEVER say 'accept H₀')" },
    ],
    ti83: "STAT → TESTS → 2:T-Test",
  },
  {
    id: 11, topic: "Proportion HT — Left Tailed", color: "#F59E0B",
    question: "A politician claims 60 percent of voters support her. An independent poll of 200 randomly selected voters finds 108 support her. At a significance level of 0.05, is there sufficient evidence the true proportion is less than the claimed value?",
    identifyFields: [
      { id: "i11f1", label: "Claimed proportion (H₀ — use in DENOMINATOR formula): p₀ = ", answer: 0.60, tolerance: 0.005, hint: "'claims 60 percent' → p₀ = 0.60. This goes in H₀ AND in the denominator of the z-formula!" },
      { id: "i11f2", label: "Sample size: n = ", answer: 200, hint: "'poll of 200 voters' → n = 200" },
      { id: "i11f3", label: "Count with trait: x = ", answer: 108, hint: "'108 support her' → x = 108" },
      { id: "i11f4", label: "Sample proportion: p̂ = x/n = ", answer: 0.54, tolerance: 0.005, hint: "108 ÷ 200 = 0.54" },
      { id: "i11f5", label: "Significance level: α = ", answer: 0.05, tolerance: 0.001, hint: "'significance level of 0.05' → α = 0.05" },
      { id: "i11f6", label: "Alternative hypothesis direction (type < > or ≠): H₁: p ", answer: "<", hint: "'less than the claimed value' → H₁: p < 0.60 → left-tailed. Type: <" },
    ],
    steps: [
      { instruction: "p̂ = 108/200 = 0.54. H₁: p < 0.60 (left-tailed). Calculate z = (p̂ − p₀) / √(p₀ × q₀ / n). Use p₀ = 0.60 in denominator!", fields: [{ id: "s1f1", label: "z = ", answer: -1.732, tolerance: 0.03, hint: "√(0.60×0.40/200) = √0.0012 = 0.03464. z = (0.54-0.60)/0.03464 = -1.732" }], explanation: "z ≈ -1.73. CRITICAL: always use p₀ (the null value) in the denominator!" },
      { instruction: "Left-tailed p-value = normalcdf(-1E99, -1.732, 0, 1)", fields: [{ id: "s2f1", label: "p-value = ", answer: 0.0416, tolerance: 0.006, hint: "normalcdf(-1E99, -1.732, 0, 1) ≈ 0.0416" }], explanation: "p-value ≈ 0.042" },
      { instruction: "Is 0.042 < 0.05? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s3f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.042 < 0.05 → Reject" }], explanation: "REJECT H₀. Evidence the true proportion is less than 60%." },
    ],
    ti83: "STAT → TESTS → 5:1-PropZTest",
  },
  {
    id: 12, topic: "2-Sample T-Test ⚠️ ALEKS df", color: "#EC4899",
    question: "Two groups of students take a math exam. Group 1 used a tutoring app: 13 students, average score 82, standard deviation 6. Group 2 used traditional studying: 15 students, average score 77, standard deviation 8. At a significance level of 0.05, is there evidence the tutoring app group scored higher?",
    identifyFields: [
      { id: "i12f1", label: "Group 1 sample size: n₁ = ", answer: 13, hint: "'13 students' in the tutoring app group → n₁ = 13" },
      { id: "i12f2", label: "Group 1 sample mean: x̄₁ = ", answer: 82, hint: "'average score 82' for Group 1 → x̄₁ = 82" },
      { id: "i12f3", label: "Group 1 sample std dev: s₁ = ", answer: 6, hint: "'standard deviation 6' for Group 1 → s₁ = 6" },
      { id: "i12f4", label: "Group 2 sample size: n₂ = ", answer: 15, hint: "'15 students' in traditional group → n₂ = 15" },
      { id: "i12f5", label: "Group 2 sample mean: x̄₂ = ", answer: 77, hint: "'average score 77' for Group 2 → x̄₂ = 77" },
      { id: "i12f6", label: "Group 2 sample std dev: s₂ = ", answer: 8, hint: "'standard deviation 8' for Group 2 → s₂ = 8" },
      { id: "i12f7", label: "ALEKS df = min(n₁−1, n₂−1) = ", answer: 12, hint: "min(13−1, 15−1) = min(12, 14) = 12. ALEKS RULE: always use the SMALLER df!" },
      { id: "i12f8", label: "Significance level: α = ", answer: 0.05, tolerance: 0.001, hint: "'significance level of 0.05' → α = 0.05" },
      { id: "i12f9", label: "Alternative hypothesis direction (type < > or ≠): H₁: μ₁ − μ₂ ", answer: ">", hint: "'scored higher' → Group 1 > Group 2 → H₁: μ₁ − μ₂ > 0 → right-tailed. Type: >" },
    ],
    steps: [
      { instruction: "⚠️ ALEKS RULE: df = min(n₁−1, n₂−1) = min(12, 14) = ?", fields: [{ id: "s1f1", label: "df = ", answer: 12, hint: "min(13-1, 15-1) = min(12, 14) = 12. Always the SMALLER df on ALEKS!" }], explanation: "df = 12. ALEKS conservative rule — not Welch's formula." },
      { instruction: "t = (x̄₁ − x̄₂) / √(s₁²/n₁ + s₂²/n₂) = (82−77) / √(36/13 + 64/15)", fields: [{ id: "s2f1", label: "t = ", answer: 1.89, tolerance: 0.1, hint: "= 5 / √(2.769 + 4.267) = 5 / √7.036 = 5/2.652 ≈ 1.89" }], explanation: "t ≈ 1.89, df = 12" },
      { instruction: "Right-tailed p-value = tcdf(1.89, 1E99, 12)", fields: [{ id: "s3f1", label: "p-value = ", answer: 0.042, tolerance: 0.01, hint: "tcdf(1.89, 1E99, 12) ≈ 0.042" }], explanation: "p-value ≈ 0.042" },
      { instruction: "Is 0.042 < 0.05? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.042 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. Evidence the tutoring app group scored higher." },
    ],
    ti83: "STAT → TESTS → 4:2-SampTTest",
  },
  {
    id: 13, topic: "Chi-Square GoF", color: "#06B6D4",
    question: "A quality control manager claims defects occur equally on each day of the work week. Over 5 weeks, defects recorded: Monday 22, Tuesday 18, Wednesday 26, Thursday 15, Friday 19. Total = 100. At a significance level of 0.05, is there evidence defects are not equally distributed?",
    identifyFields: [
      { id: "i13f1", label: "Number of categories: k = ", answer: 5, hint: "Monday, Tuesday, Wednesday, Thursday, Friday → 5 days → k = 5" },
      { id: "i13f2", label: "Total observations: n = ", answer: 100, hint: "'Total = 100' → n = 100" },
      { id: "i13f3", label: "Degrees of freedom: df = k − 1 = ", answer: 4, hint: "5 − 1 = 4" },
      { id: "i13f4", label: "Expected per category if equal: E = n/k = ", answer: 20, hint: "100 ÷ 5 days = 20 per day" },
    ],
    steps: [
      { instruction: "Expected count per day if equally distributed: E = n/k = 100/5", fields: [{ id: "s1f1", label: "E = ", answer: 20, hint: "100 ÷ 5 days = 20 per day" }], explanation: "E = 20 for each day." },
      { instruction: "df = k − 1 = 5 − 1", fields: [{ id: "s2f1", label: "df = ", answer: 4, hint: "5 categories - 1 = 4" }], explanation: "df = 4" },
      { instruction: "χ² = Σ(O-E)²/E = (22-20)²/20 + (18-20)²/20 + (26-20)²/20 + (15-20)²/20 + (19-20)²/20", fields: [{ id: "s3f1", label: "χ² = ", answer: 3.5, tolerance: 0.1, hint: "= 4/20 + 4/20 + 36/20 + 25/20 + 1/20 = 70/20 = 3.5" }], explanation: "χ² = 3.5" },
      { instruction: "Critical value from chi-square TABLE, α=0.05, df=4. ⚠️ TI-83 Plus has NO χ²GOF-Test — use table!", fields: [{ id: "s4f1", label: "critical value = ", answer: 9.488, tolerance: 0.05, hint: "χ² table: df=4, right-tail α=0.05 → 9.488. No χ²GOF-Test on TI-83 Plus — table only!" }], explanation: "Critical value = 9.488. TI-83 Plus has no χ²GOF-Test — use the table." },
      { instruction: "Is χ² (3.5) > critical value (9.488)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s5f1", label: "Reject? (1=yes, 0=no) = ", answer: 0, hint: "3.5 < 9.488 → Fail to Reject" }], explanation: "FAIL TO REJECT H₀. Not enough evidence defects are unequal across days." },
    ],
    ti83: "⚠️ NO χ²GOF-Test on TI-83 Plus! Manual: L1=observed, L2=expected, L3=(L1-L2)²/L2, χ²=sum(L3), p=χ²cdf(χ²,1E99,df)",
  },
  {
    id: 14, topic: "ANOVA", color: "#06B6D4",
    question: "A researcher tests three fertilizers on plant height (cm) after 4 weeks. Fertilizer A: 22, 25, 24, 23. Fertilizer B: 28, 30, 27, 29. Fertilizer C: 19, 21, 20, 18. At a significance level of 0.05, is there evidence at least one fertilizer produces a different mean height?",
    identifyFields: [
      { id: "i14f1", label: "Number of groups: k = ", answer: 3, hint: "Fertilizer A, B, C → 3 groups → k = 3" },
      { id: "i14f2", label: "Observations per group: ", answer: 4, hint: "Each fertilizer has 4 plants → 4 per group" },
      { id: "i14f3", label: "Total observations: N = ", answer: 12, hint: "3 groups × 4 each = 12 total → N = 12" },
      { id: "i14f4", label: "Between-groups df: df₁ = k − 1 = ", answer: 2, hint: "3 − 1 = 2" },
      { id: "i14f5", label: "Within-groups df: df₂ = N − k = ", answer: 9, hint: "12 − 3 = 9" },
    ],
    steps: [
      { instruction: "3 groups → ANOVA (not t-test). k = ?", fields: [{ id: "s1f1", label: "k = ", answer: 3, hint: "Fertilizer A, B, C = 3 groups" }], explanation: "k = 3 → ANOVA (3+ groups means F-test, not t-test)" },
      { instruction: "df₁ = k − 1 (between groups)", fields: [{ id: "s2f1", label: "df₁ = ", answer: 2, hint: "3 - 1 = 2" }], explanation: "df₁ = 2" },
      { instruction: "df₂ = N − k (within groups). N = 3 × 4 = 12", fields: [{ id: "s3f1", label: "df₂ = ", answer: 9, hint: "12 - 3 = 9" }], explanation: "df₂ = 9" },
      { instruction: "Run ANOVA(L1,L2,L3) on TI-83 Plus: F ≈ 28.88, p ≈ 0.0001. Is p < α? Enter 1 to Reject, 0 to Fail.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.0001 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. At least one fertilizer differs. ANOVA only tells you THAT — not WHICH ones differ." },
    ],
    ti83: "Enter groups in L1, L2, L3 → STAT → TESTS → F:ANOVA(L1,L2,L3) ⚠️ TI-83 Plus uses F:, not H:!",
  },
  {
    id: 15, topic: "Sample Size — Mean", color: "#64748B",
    question: "A researcher wants to estimate the mean weight of adult male cats to within 0.3 pounds. From prior studies, the population standard deviation is 1.2 pounds. How large a sample is needed for 99% confidence?",
    identifyFields: [
      { id: "i15f1", label: "Desired margin of error: E = ", answer: 0.3, hint: "'within 0.3 pounds' → E = 0.3 (maximum error allowed)" },
      { id: "i15f2", label: "Population std dev: σ = ", answer: 1.2, hint: "'population standard deviation is 1.2 pounds' → σ = 1.2" },
      { id: "i15f3", label: "Confidence level (decimal): C = ", answer: 0.99, tolerance: 0.005, hint: "'99% confidence' → C = 0.99 → z* = 2.576" },
    ],
    steps: [
      { instruction: "99% confidence → z* = ?", fields: [{ id: "s1f1", label: "z* = ", answer: 2.576, tolerance: 0.005, hint: "99% CI → z* = 2.576" }], explanation: "z* = 2.576 for 99% confidence." },
      { instruction: "n = (z* × σ / E)² — compute inside first: 2.576 × 1.2 / 0.3", fields: [{ id: "s2f1", label: "z*σ/E = 2.576×1.2÷0.3 = ", answer: 10.304, tolerance: 0.05, hint: "2.576 × 1.2 = 3.0912, ÷ 0.3 = 10.304" }], explanation: "Inside = 10.304" },
      { instruction: "Now square it: n = (10.304)²", fields: [{ id: "s3f1", label: "n (before rounding) = ", answer: 106.17, tolerance: 0.5, hint: "10.304² = 106.17" }], explanation: "106.17 → must ROUND UP" },
      { instruction: "Round UP to get minimum sample size. ALWAYS ceiling — never floor!", fields: [{ id: "s4f1", label: "n = ", answer: 107, hint: "106.17 → round UP → 107. Even 106.01 rounds up to 107!" }], explanation: "n = 107. Even 106.01 rounds up to 107." },
    ],
  },
  {
    id: 16, topic: "Sample Size — Proportion", color: "#64748B",
    question: "A researcher wants to estimate the proportion of adults who exercise daily. No prior estimate is available. How large a sample is needed to be within 4 percentage points with 95% confidence?",
    identifyFields: [
      { id: "i16f1", label: "Desired margin of error: E = ", answer: 0.04, tolerance: 0.001, hint: "'within 4 percentage points' → E = 0.04" },
      { id: "i16f2", label: "Prior p̂ (no prior estimate → use worst-case): p̂ = ", answer: 0.5, tolerance: 0.01, hint: "'no prior estimate' → use p̂ = 0.50 (gives maximum/most conservative n)" },
      { id: "i16f3", label: "z* for 95% confidence: z* = ", answer: 1.96, tolerance: 0.01, hint: "'95% confidence' → z* = 1.96" },
    ],
    steps: [
      { instruction: "No prior p̂ → use p̂ = 0.50. q̂ = 1 − 0.50 = ?", fields: [{ id: "s1f1", label: "q̂ = ", answer: 0.5, tolerance: 0.01, hint: "1 - 0.50 = 0.50" }], explanation: "p̂ = q̂ = 0.5 gives max sample size. Use when no prior estimate exists." },
      { instruction: "Numerator: z*² × p̂q̂ = (1.96)² × (0.5×0.5)", fields: [{ id: "s2f1", label: "1.96² × 0.25 = ", answer: 0.9604, tolerance: 0.005, hint: "1.96² = 3.8416, × 0.25 = 0.9604" }], explanation: "Numerator = 0.9604" },
      { instruction: "Denominator: E² = (0.04)²", fields: [{ id: "s3f1", label: "0.04² = ", answer: 0.0016, tolerance: 0.0001, hint: "0.04 × 0.04 = 0.0016" }], explanation: "Denominator = 0.0016" },
      { instruction: "n = 0.9604 / 0.0016 → round UP", fields: [{ id: "s4f1", label: "n = ", answer: 601, hint: "0.9604/0.0016 = 600.25 → round UP → 601" }], explanation: "n = 601. Always ceiling for sample size." },
    ],
  },
  {
    id: 17, topic: "CI Interpretation", color: "#64748B",
    question: "A 95% confidence interval for the mean daily steps is (8200, 9800). A fitness company claims the true mean is 10,000 steps. Based only on this interval, what is your conclusion about the claim?",
    identifyFields: [
      { id: "i17f1", label: "CI lower bound: ", answer: 8200, hint: "The interval is (8200, 9800) → lower = 8200" },
      { id: "i17f2", label: "CI upper bound: ", answer: 9800, hint: "The interval is (8200, 9800) → upper = 9800" },
      { id: "i17f3", label: "Company's claimed value: ", answer: 10000, hint: "'fitness company claims 10,000 steps' → claimed = 10000" },
    ],
    steps: [
      { instruction: "Is 10,000 inside the interval (8200, 9800)? Enter 1 for yes, 0 for no.", fields: [{ id: "s1f1", label: "Inside? (1=yes, 0=no) = ", answer: 0, hint: "Is 8200 < 10000 < 9800? No — 10,000 is above 9,800" }], explanation: "10,000 is OUTSIDE the interval. It's above the upper bound of 9,800." },
      { instruction: "When claimed value is OUTSIDE the CI, we have (1=evidence to reject claim, 0=support for claim).", fields: [{ id: "s2f1", label: "Reject claim? (1=yes, 0=no) = ", answer: 1, hint: "Value outside CI → evidence against the claim" }], explanation: "REJECT the claim. At 95% confidence, the data suggests true mean is between 8,200 and 9,800 — not 10,000." },
    ],
  },
  {
    id: 18, topic: "Normal Distribution", color: "#3B82F6",
    question: "Heights of adult women are normally distributed with an average of 64 inches and a standard deviation of 2.5 inches. What is the probability that a randomly selected woman is taller than 67 inches?",
    identifyFields: [
      { id: "i18f1", label: "Population mean: μ = ", answer: 64, hint: "'average of 64 inches' → μ = 64" },
      { id: "i18f2", label: "Population std dev: σ = ", answer: 2.5, hint: "'standard deviation of 2.5 inches' → σ = 2.5" },
      { id: "i18f3", label: "Target value (individual, not sample mean): x = ", answer: 67, hint: "'taller than 67 inches' → x = 67 (individual → use σ directly, not SE)" },
    ],
    steps: [
      { instruction: "Calculate z = (x − μ) / σ = (67 − 64) / 2.5", fields: [{ id: "s1f1", label: "z = ", answer: 1.2, tolerance: 0.01, hint: "z = 3/2.5 = 1.20" }], explanation: "z = 1.20. Positive because 67 > 64." },
      { instruction: "P(Z > 1.20) = normalcdf(1.2, 1E99, 0, 1). Round to 4 decimal places.", fields: [{ id: "s2f1", label: "P(X > 67) = ", answer: 0.1151, tolerance: 0.003, hint: "normalcdf(1.2, 1E99, 0, 1) ≈ 0.1151" }], explanation: "P ≈ 0.1151. About 11.51% of women are taller than 67 inches." },
    ],
    ti83: "normalcdf(67, 1E99, 64, 2.5) → 2nd DISTR → 2:normalcdf",
  },
  {
    id: 19, topic: "Chi-Square — Notation Trap", color: "#06B6D4",
    question: "A chi-square table shows a value of 11.07 for df equals 5 at a certain area. A student labels this as chi-square sub 0.05. What does the subscript 0.05 represent — the right-tail area or the left-tail area?",
    identifyFields: [
      { id: "i19f1", label: "The subscript value shown: ", answer: 0.05, tolerance: 0.001, hint: "χ²₀.₀₅ → subscript is 0.05" },
      { id: "i19f2", label: "Degrees of freedom given: df = ", answer: 5, hint: "'df equals 5'" },
      { id: "i19f3", label: "Critical value from table: ", answer: 11.07, tolerance: 0.05, hint: "'a value of 11.07'" },
    ],
    steps: [
      { instruction: "χ²₀.₀₅ subscript represents which tail? Enter 1 for right-tail, 0 for left-tail.", fields: [{ id: "s1f1", label: "Right-tail? (1=yes, 0=no) = ", answer: 1, hint: "χ²₀.₀₅ = chi-square where RIGHT-tail area = 0.05. The subscript IS the right-tail probability." }], explanation: "RIGHT-tail. χ²₀.₀₅ = the value where 5% is to the RIGHT." },
      { instruction: "Verify: χ²cdf(11.07, 1E99, 5) ≈ ?", fields: [{ id: "s2f1", label: "≈ ", answer: 0.05, tolerance: 0.005, hint: "χ²cdf(11.07, 1E99, 5) ≈ 0.05 — confirms right-tail area = 0.05" }], explanation: "✓ Confirmed. The subscript = right-tail area." },
    ],
  },
  {
    id: 20, topic: "ANOVA Table Calculation", color: "#06B6D4",
    question: "An ANOVA comparing mean salaries across 4 departments produces: Sum of Squares Between equals 840, Sum of Squares Within equals 1260, with 4 groups and 28 total observations. Calculate the F statistic.",
    identifyFields: [
      { id: "i20f1", label: "Sum of Squares Between: SSB = ", answer: 840, hint: "'Sum of Squares Between equals 840'" },
      { id: "i20f2", label: "Sum of Squares Within: SSW = ", answer: 1260, hint: "'Sum of Squares Within equals 1260'" },
      { id: "i20f3", label: "Number of groups: k = ", answer: 4, hint: "'4 groups' → k = 4" },
      { id: "i20f4", label: "Total observations: N = ", answer: 28, hint: "'28 total observations' → N = 28" },
    ],
    steps: [
      { instruction: "df₁ = k − 1 = 4 − 1", fields: [{ id: "s1f1", label: "df₁ = ", answer: 3, hint: "4 - 1 = 3" }], explanation: "df₁ = 3" },
      { instruction: "df₂ = N − k = 28 − 4", fields: [{ id: "s2f1", label: "df₂ = ", answer: 24, hint: "28 - 4 = 24" }], explanation: "df₂ = 24" },
      { instruction: "MSB = SSB / df₁ = 840 / 3", fields: [{ id: "s3f1", label: "MSB = ", answer: 280, hint: "840 / 3 = 280" }], explanation: "MSB = 280" },
      { instruction: "MSW = SSW / df₂ = 1260 / 24", fields: [{ id: "s4f1", label: "MSW = ", answer: 52.5, tolerance: 0.1, hint: "1260 / 24 = 52.5" }], explanation: "MSW = 52.5" },
      { instruction: "F = MSB / MSW = 280 / 52.5", fields: [{ id: "s5f1", label: "F = ", answer: 5.333, tolerance: 0.05, hint: "280 / 52.5 = 5.333" }], explanation: "F ≈ 5.33. Compare to F-critical (df₁=3, df₂=24, α=0.05) ≈ 3.01 → Reject H₀." },
    ],
  },
];

type FieldStatus = "idle" | "correct" | "wrong";

interface FieldState {
  value: string;
  status: FieldStatus;
  attempts: number;
}

interface ProblemState {
  identifyStates: Record<string, FieldState>;
  identifyDone: boolean;
  currentStep: number;
  fieldStates: Record<string, FieldState>;
  completed: boolean;
}

function checkAnswer(input: string, answer: number | string, tolerance = 0.015): boolean {
  const clean = input.trim().toLowerCase().replace(/[,%]/g, "");
  // normalize != to ≠ so students can type either
  clean = clean.replace("!=", "≠");
  if (typeof answer === "number") {
    const num = parseFloat(clean);
    if (isNaN(num)) return false;
    return Math.abs(num - answer) <= (tolerance ?? 0.015);
  }
  return clean === String(answer).toLowerCase();
}

// Formula Reference Panel component
function FormulaPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed bottom-16 right-4 w-96 max-h-[75vh] overflow-y-auto bg-slate-800 border border-slate-600 rounded-xl shadow-2xl z-50">
      <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-3 flex justify-between items-center">
        <span className="text-sm font-bold text-white">📐 Formula Reference</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-lg leading-none">✕</button>
      </div>
      <div className="p-3 space-y-2 text-xs">

        <details open>
          <summary className="cursor-pointer font-bold text-yellow-400 py-1">🧭 Which Test?</summary>
          <div className="mt-2 space-y-1 text-slate-300 font-mono pl-2">
            <p>Proportion (% or count/total)? → Prop Z-test / Prop CI</p>
            <p>σ (pop SD) given? → Z-test / Z-Interval</p>
            <p>Only s (sample SD)? → T-test / T-Interval</p>
            <p>3+ groups? → ANOVA (F-test)</p>
            <p>Categories vs expected? → Chi-Square GoF</p>
          </div>
        </details>

        <details>
          <summary className="cursor-pointer font-bold text-blue-400 py-1">📐 Key Formulas</summary>
          <div className="mt-2 space-y-2 text-slate-300 font-mono pl-2">
            <p className="text-white font-semibold">Z (σ known):</p>
            <p>z = (x̄ − μ₀) / (σ/√n)</p>
            <p className="text-white font-semibold mt-2">T (s from sample):</p>
            <p>t = (x̄ − μ₀) / (s/√n)   df = n−1</p>
            <p className="text-white font-semibold mt-2">Standard Error:</p>
            <p>SE_mean = σ/√n  or  s/√n</p>
            <p>SE_prop = √(p̂·q̂ / n)</p>
            <p className="text-white font-semibold mt-2">Intervals:</p>
            <p>Z-Interval: x̄ ± z*·(σ/√n)</p>
            <p>T-Interval: x̄ ± t*·(s/√n)</p>
            <p>Prop CI:    p̂ ± z*·√(p̂·q̂/n)</p>
            <p className="text-white font-semibold mt-2">Prop Z-test:</p>
            <p>z = (p̂ − p₀) / √(p₀·q₀/n)</p>
            <p className="text-amber-400">⚠️ Use p₀ in denominator, NOT p̂!</p>
            <p className="text-white font-semibold mt-2">2-Sample T (ALEKS):</p>
            <p>t = (x̄₁−x̄₂) / √(s₁²/n₁ + s₂²/n₂)</p>
            <p className="text-amber-400">⚠️ df = min(n₁−1, n₂−1) ← ALEKS!</p>
            <p className="text-white font-semibold mt-2">Chi-Square GoF:</p>
            <p>χ² = Σ(O−E)²/E    df = k−1</p>
            <p>Always RIGHT-tailed. Use TABLE!</p>
            <p className="text-white font-semibold mt-2">ANOVA:</p>
            <p>F = MSB/MSW</p>
            <p>MSB = SSB/df₁   df₁ = k−1</p>
            <p>MSW = SSW/df₂   df₂ = N−k</p>
            <p className="text-white font-semibold mt-2">Sample Size:</p>
            <p>n_mean = (z*·σ/E)²  → ROUND UP ↑</p>
            <p>n_prop = z*²·p̂·q̂/E²  → ROUND UP ↑</p>
            <p className="text-slate-400">No prior p̂? Use p̂ = 0.50</p>
          </div>
        </details>

        <details>
          <summary className="cursor-pointer font-bold text-green-400 py-1">🔢 Critical Values</summary>
          <div className="mt-2 space-y-1 text-slate-300 font-mono pl-2">
            <p className="text-white font-semibold">z* values:</p>
            <p>90% CI → z* = 1.645</p>
            <p>95% CI → z* = 1.960</p>
            <p>99% CI → z* = 2.576</p>
            <p className="text-white font-semibold mt-2">Empirical Rule:</p>
            <p>μ ± 1σ = 68%</p>
            <p>μ ± 2σ = 95%</p>
            <p>μ ± 3σ = 99.7%</p>
            <p className="text-white font-semibold mt-2">χ² Table (α=0.05 right-tail):</p>
            <p>df=1 → 3.841   df=2 → 5.991</p>
            <p>df=3 → 7.815   df=4 → 9.488</p>
            <p>df=5 → 11.070  df=6 → 12.592</p>
            <p className="text-amber-400 mt-1">χ²₀.₀₅ → subscript = RIGHT-tail area!</p>
          </div>
        </details>

        <details>
          <summary className="cursor-pointer font-bold text-purple-400 py-1">🧮 TI-83 Plus Commands</summary>
          <div className="mt-2 space-y-1 text-slate-300 font-mono pl-2">
            <p>Z-Interval:    STAT→TESTS→7</p>
            <p>T-Interval:    STAT→TESTS→8</p>
            <p>1-Prop ZInt:   STAT→TESTS→A</p>
            <p>Z-Test:        STAT→TESTS→1</p>
            <p>T-Test:        STAT→TESTS→2</p>
            <p>2-SampTTest:   STAT→TESTS→4</p>
            <p>1-PropZTest:   STAT→TESTS→5</p>
            <p className="text-amber-400">ANOVA:  STAT→TESTS→F (not H!)</p>
            <p className="mt-2 text-white font-semibold">2nd DISTR:</p>
            <p>2: normalcdf(low,high,μ,σ)</p>
            <p>3: invNorm(area_left,μ,σ)</p>
            <p>5: tcdf(low,high,df)</p>
            <p>7: χ²cdf(χ²,1E99,df)</p>
            <p className="text-red-400 mt-2">✗ NO invT on TI-83 Plus → use t-table</p>
            <p className="text-red-400">✗ NO χ²GOF-Test → manual list method:</p>
            <p className="text-slate-400 pl-2">L1=observed, L2=expected</p>
            <p className="text-slate-400 pl-2">L3=(L1-L2)²/L2</p>
            <p className="text-slate-400 pl-2">χ²=sum(L3), p=χ²cdf(χ²,1E99,df)</p>
          </div>
        </details>

        <details>
          <summary className="cursor-pointer font-bold text-red-400 py-1">⚠️ ALEKS Traps</summary>
          <div className="mt-2 space-y-2 text-slate-300 pl-2">
            <p><span className="text-amber-400 font-bold">SYMMETRY TRAP:</span> 93rd pct → z = +1.4758 (POSITIVE!)</p>
            <p><span className="text-amber-400 font-bold">TWO-TAILED:</span> p-value = one-tail area × 2</p>
            <p><span className="text-amber-400 font-bold">PROP DENOMINATOR:</span> Use p₀ not p̂ in z-formula</p>
            <p><span className="text-amber-400 font-bold">ALEKS df:</span> 2-sample T → min(n₁−1, n₂−1)</p>
            <p><span className="text-amber-400 font-bold">SAMPLE SIZE:</span> ALWAYS round UP (106.01 → 107)</p>
            <p><span className="text-amber-400 font-bold">T vs Z:</span> σ known → Z | s from sample → T</p>
            <p><span className="text-amber-400 font-bold">CI WORDING:</span> "95% CONFIDENT" not "95% probability"</p>
            <p><span className="text-amber-400 font-bold">H₀ LANGUAGE:</span> "Fail to reject" — NEVER "accept H₀"</p>
          </div>
        </details>
      </div>
    </div>
  );
}

export default function PracticePage() {
  const [selected, setSelected] = useState(0);
  const [states, setStates] = useState<Record<number, ProblemState>>(() =>
    Object.fromEntries(problems.map(p => [p.id, {
      identifyStates: {},
      identifyDone: false,
      currentStep: 0,
      fieldStates: {},
      completed: false
    }]))
  );
  const [shake, setShake] = useState<Record<string, boolean>>({});
  const [showFormulas, setShowFormulas] = useState(false);
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});
  const [aiResponses, setAiResponses] = useState<Record<string, string>>({});
  const [chatInputs, setChatInputs] = useState<Record<number, string>>({});
  const [chatHistories, setChatHistories] = useState<Record<number, { role: string; content: string }[]>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const prob = problems[selected];
  const pState = states[prob.id];
  const completed = Object.values(states).filter(s => s.completed).length;

  useEffect(() => { inputRef.current?.focus(); }, [selected, pState.currentStep, pState.identifyDone]);

  function getField(fieldId: string): FieldState {
    return pState.fieldStates[fieldId] ?? { value: "", status: "idle", attempts: 0 };
  }
  function getIdentifyField(fieldId: string): FieldState {
    return pState.identifyStates[fieldId] ?? { value: "", status: "idle", attempts: 0 };
  }

  function updateField(fieldId: string, value: string) {
    setStates(prev => ({
      ...prev,
      [prob.id]: { ...prev[prob.id], fieldStates: { ...prev[prob.id].fieldStates, [fieldId]: { ...getField(fieldId), value, status: "idle" } } }
    }));
  }

  function updateIdentifyField(fieldId: string, value: string) {
    setStates(prev => ({
      ...prev,
      [prob.id]: { ...prev[prob.id], identifyStates: { ...prev[prob.id].identifyStates, [fieldId]: { ...getIdentifyField(fieldId), value, status: "idle" } } }
    }));
  }

  function checkIdentify() {
    const allCorrect = prob.identifyFields.every(f => {
      const fs = getIdentifyField(f.id);
      return checkAnswer(fs.value, f.answer, f.tolerance);
    });

    const newIdentifyStates = { ...pState.identifyStates };
    prob.identifyFields.forEach(f => {
      const fs = getIdentifyField(f.id);
      const correct = checkAnswer(fs.value, f.answer, f.tolerance);
      const newAttempts = (fs.attempts ?? 0) + (correct ? 0 : 1);
      newIdentifyStates[f.id] = { value: fs.value, status: correct ? "correct" : "wrong", attempts: newAttempts };
    });

    setStates(prev => ({
      ...prev,
      [prob.id]: { ...prev[prob.id], identifyStates: newIdentifyStates, identifyDone: allCorrect }
    }));

    if (!allCorrect) {
      const wrongFields = prob.identifyFields.filter(f => !checkAnswer(getIdentifyField(f.id).value, f.answer, f.tolerance));
      wrongFields.forEach(f => {
        setShake(prev => ({ ...prev, [f.id]: true }));
        setTimeout(() => setShake(prev => ({ ...prev, [f.id]: false })), 500);
      });
    }
  }

  function checkStep(stepIdx: number) {
    const step = prob.steps[stepIdx];
    const allCorrect = step.fields.every(f => checkAnswer(getField(f.id).value, f.answer, f.tolerance));

    if (allCorrect) {
      const newFieldStates = { ...pState.fieldStates };
      step.fields.forEach(f => { newFieldStates[f.id] = { ...getField(f.id), status: "correct" }; });
      const isLast = stepIdx === prob.steps.length - 1;
      setStates(prev => ({
        ...prev,
        [prob.id]: { ...prev[prob.id], fieldStates: newFieldStates, currentStep: isLast ? stepIdx : stepIdx + 1, completed: isLast }
      }));
    } else {
      step.fields.forEach(f => {
        const fs = getField(f.id);
        if (!checkAnswer(fs.value, f.answer, f.tolerance)) {
          const newAttempts = fs.attempts + 1;
          setStates(prev => ({
            ...prev,
            [prob.id]: { ...prev[prob.id], fieldStates: { ...prev[prob.id].fieldStates, [f.id]: { ...fs, status: "wrong", attempts: newAttempts } } }
          }));
          setShake(prev => ({ ...prev, [f.id]: true }));
          setTimeout(() => setShake(prev => ({ ...prev, [f.id]: false })), 500);
        } else {
          setStates(prev => ({
            ...prev,
            [prob.id]: { ...prev[prob.id], fieldStates: { ...prev[prob.id].fieldStates, [f.id]: { ...fs, status: "correct" } } }
          }));
        }
      });
    }
  }

  function resetProblem() {
    setStates(prev => ({ ...prev, [prob.id]: { identifyStates: {}, identifyDone: false, currentStep: 0, fieldStates: {}, completed: false } }));
    setAiResponses(prev => {
      const next = { ...prev };
      Object.keys(next).filter(k => k.startsWith(`p${prob.id}`)).forEach(k => delete next[k]);
      return next;
    });
  }

  async function fetchAI(key: string, messages: { role: string; content: string }[]) {
    setAiLoading(prev => ({ ...prev, [key]: true }));
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      setAiResponses(prev => ({ ...prev, [key]: data.content || "Sorry, couldn't get a response." }));
    } catch {
      setAiResponses(prev => ({ ...prev, [key]: "Error reaching AI. Check your connection." }));
    } finally {
      setAiLoading(prev => ({ ...prev, [key]: false }));
    }
  }

  async function askStepAI(stepIdx: number) {
    const step = prob.steps[stepIdx];
    const currentValues = step.fields.map(f => `${f.label}${getField(f.id).value}`).join(", ");
    const key = `p${prob.id}-step${stepIdx}`;
    if (aiResponses[key]) return;
    await fetchAI(key, [{
      role: "user",
      content: `I'm working on a statistics problem.\n\nProblem: ${prob.question}\n\nCurrent step: ${step.instruction}\n\nWhat I typed: ${currentValues || "(nothing yet)"}\n\nCan you help me understand how to approach this step? Guide me through the reasoning — don't give the final number directly.`
    }]);
  }

  async function askTopicAI() {
    const key = `p${prob.id}-topic`;
    if (aiResponses[key]) { setAiResponses(prev => ({ ...prev, [`${key}-show`]: "1" })); return; }
    setAiResponses(prev => ({ ...prev, [`${key}-show`]: "1" }));
    await fetchAI(key, [{
      role: "user",
      content: `Explain "${prob.topic}" in plain English for a stats student with a final exam tomorrow. Cover: what it tests/estimates, when to use it, the formula, key traps to avoid. Keep it concise. The student uses a TI-83 Plus calculator.`
    }]);
  }

  async function askStuckAI(stepIdx: number, fieldId: string) {
    const step = prob.steps[stepIdx];
    const field = step.fields.find(f => f.id === fieldId)!;
    const fs = getField(fieldId);
    const key = `p${prob.id}-stuck${fieldId}`;
    if (aiResponses[key]) return;
    await fetchAI(key, [{
      role: "user",
      content: `I'm stuck on a step.\n\nProblem: ${prob.question}\n\nStep: ${step.instruction}\n\nI've tried: "${fs.value}"\nHint says: ${field.hint}\n\nExplain the reasoning step by step without giving the final answer directly.`
    }]);
  }

  async function sendChat(probId: number) {
    const msg = chatInputs[probId]?.trim();
    if (!msg) return;
    const history = chatHistories[probId] ?? [];
    const newHistory = [...history, { role: "user", content: `Context: Problem ${prob.id} - ${prob.topic}. Question: ${prob.question}\n\nStudent asks: ${msg}` }];
    setChatHistories(prev => ({ ...prev, [probId]: [...(prev[probId] ?? []), { role: "user", content: msg }] }));
    setChatInputs(prev => ({ ...prev, [probId]: "" }));
    const key = `p${probId}-chat-${Date.now()}`;
    setAiLoading(prev => ({ ...prev, [`chat-${probId}`]: true }));
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: newHistory }) });
      const data = await res.json();
      setChatHistories(prev => ({ ...prev, [probId]: [...(prev[probId] ?? []), { role: "assistant", content: data.content }] }));
      void key;
    } catch {
      setChatHistories(prev => ({ ...prev, [probId]: [...(prev[probId] ?? []), { role: "assistant", content: "Error reaching AI." }] }));
    } finally {
      setAiLoading(prev => ({ ...prev, [`chat-${probId}`]: false }));
    }
  }

  const topicKey = `p${prob.id}-topic`;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-700">
          <div className="text-sm font-bold text-white mb-1">Practice Problems</div>
          <div className="text-xs text-slate-400">{completed} / {problems.length} complete</div>
          <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(completed / problems.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {problems.map((p, i) => {
            const ps = states[p.id];
            return (
              <button key={p.id} onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 border-b border-slate-700 transition-colors flex items-center gap-2 ${selected === i ? "bg-slate-700" : "hover:bg-slate-750"}`}>
                <span className="text-lg flex-shrink-0">{ps.completed ? "✅" : ps.identifyDone ? "▶" : selected === i ? "→" : "○"}</span>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400">#{p.id}</div>
                  <div className="text-sm font-medium truncate" style={{ color: ps.completed ? "#10B981" : selected === i ? "#fff" : "#cbd5e1" }}>{p.topic}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">

          {/* Topic badge + Explain button */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: prob.color }}>{prob.topic}</span>
            <div className="flex gap-2 items-center">
              <button onClick={askTopicAI} className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-blue-300 transition-colors">
                {aiLoading[topicKey] ? "..." : "💡 Explain Topic"}
              </button>
              <span className="text-sm text-slate-400">Problem {prob.id} of {problems.length}</span>
            </div>
          </div>

          {/* Topic explanation modal */}
          {aiResponses[`${topicKey}-show`] && (
            <div className="mb-4 p-4 bg-teal-900/40 border border-teal-700 rounded-xl relative">
              <button onClick={() => setAiResponses(prev => { const n = { ...prev }; delete n[`${topicKey}-show`]; return n; })} className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs">✕ close</button>
              <div className="text-xs font-bold text-teal-400 mb-2">🤖 Topic Explanation</div>
              {aiLoading[topicKey] ? <p className="text-sm text-slate-400 animate-pulse">Thinking...</p> : <p className="text-sm text-teal-100 whitespace-pre-wrap">{aiResponses[topicKey]}</p>}
            </div>
          )}

          {/* Question */}
          <div className="bg-slate-800 rounded-xl p-5 mb-4 border border-slate-700">
            <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Problem</div>
            <p className="text-white leading-relaxed">{prob.question}</p>
          </div>

          {/* Step 0 — Identify the Pieces */}
          {!pState.identifyDone ? (
            <div className="mb-4 bg-slate-800 rounded-xl border-2 border-amber-600 overflow-hidden">
              <div className="bg-amber-900/30 px-4 py-3 border-b border-amber-700">
                <div className="text-sm font-bold text-amber-400">🔍 Step 0 — Identify the Pieces</div>
                <div className="text-xs text-slate-400 mt-0.5">Pull the numbers from the problem and label them. Steps unlock when all are correct.</div>
              </div>
              <div className="p-4 space-y-3">
                {prob.identifyFields.map((field) => {
                  const fs = getIdentifyField(field.id);
                  const showHint = fs.attempts >= 2 && fs.status === "wrong";
                  return (
                    <div key={field.id}>
                      <div className={`flex items-center gap-2 ${shake[field.id] ? "animate-bounce" : ""}`}>
                        <span className="text-sm text-amber-300 font-mono whitespace-nowrap">{field.label}</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={fs.value}
                          onChange={e => updateIdentifyField(field.id, e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") checkIdentify(); }}
                          placeholder="?"
                          className={`w-32 px-3 py-1.5 rounded-lg text-sm font-mono border bg-slate-900 text-white outline-none transition-all
                            ${fs.status === "correct" ? "border-green-500 bg-green-900/30" : fs.status === "wrong" ? "border-red-500 bg-red-900/20" : "border-amber-700 focus:border-amber-400"}`}
                        />
                        {fs.status === "correct" && <span className="text-green-400 text-lg">✓</span>}
                        {fs.status === "wrong" && <span className="text-red-400 text-sm">✗</span>}
                      </div>
                      {showHint && (
                        <div className="mt-1 ml-0 p-2 bg-amber-900/30 border border-amber-700 rounded-lg text-xs text-amber-300">
                          💡 {field.hint}
                        </div>
                      )}
                    </div>
                  );
                })}
                <button onClick={checkIdentify} className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded-lg transition-colors">
                  Check Pieces →
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4 bg-green-900/20 border border-green-700 rounded-xl px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-green-400">✅ Pieces Identified — Steps Unlocked</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {prob.identifyFields.map(f => (
                      <span key={f.id} className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                        {f.label}<span className="text-green-400">{getIdentifyField(f.id).value}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStates(prev => ({ ...prev, [prob.id]: { ...prev[prob.id], identifyDone: false } }))} className="text-xs text-slate-500 hover:text-slate-300 ml-3">re-do</button>
              </div>
            </div>
          )}

          {/* Steps */}
          {pState.identifyDone && (
            <div className="space-y-3">
              {prob.steps.map((step, si) => {
                const isActive = si === pState.currentStep && !pState.completed;
                const isPast = si < pState.currentStep || pState.completed;
                const isLocked = si > pState.currentStep && !pState.completed;
                const stepAIKey = `p${prob.id}-step${si}`;
                const stuckKeys = step.fields.filter(f => getField(f.id).attempts >= 3 && getField(f.id).status === "wrong");

                return (
                  <div key={si} className={`rounded-xl border transition-all ${isPast ? "border-green-700 bg-green-900/20" : isActive ? "border-blue-600 bg-slate-800" : "border-slate-700 bg-slate-800/50 opacity-50"}`}>
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <span className={`text-lg flex-shrink-0 ${isPast ? "text-green-400" : isActive ? "text-blue-400" : "text-slate-600"}`}>
                          {isPast ? "✓" : `${si + 1}.`}
                        </span>
                        <p className={`text-sm leading-relaxed ${isPast ? "text-slate-300" : isActive ? "text-white" : "text-slate-500"}`}>{step.instruction}</p>
                      </div>

                      {(isActive || isPast) && step.fields.map((field, fi) => {
                        const fs = getField(field.id);
                        const showHint = fs.attempts >= 2 && fs.status === "wrong";
                        return (
                          <div key={field.id} className="ml-8 mb-2">
                            <div className={`flex items-center gap-2 ${shake[field.id] ? "animate-bounce" : ""}`}>
                              <span className="text-sm text-slate-400 font-mono whitespace-nowrap">{field.label}</span>
                              <input
                                ref={fi === 0 && isActive ? inputRef : undefined}
                                type="text"
                                inputMode="decimal"
                                value={fs.value}
                                disabled={!isActive}
                                onChange={e => updateField(field.id, e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && isActive) checkStep(si); }}
                                placeholder="your answer"
                                className={`w-36 px-3 py-1.5 rounded-lg text-sm font-mono border bg-slate-900 text-white outline-none transition-all
                                  ${fs.status === "correct" ? "border-green-500 bg-green-900/30" : fs.status === "wrong" ? "border-red-500 bg-red-900/20" : isActive ? "border-blue-500 focus:border-blue-400" : "border-slate-600 opacity-60"}`}
                              />
                              {fs.status === "correct" && <span className="text-green-400 text-lg">✓</span>}
                              {fs.status === "wrong" && <span className="text-red-400 text-sm">✗ try again</span>}
                            </div>
                            {showHint && <div className="ml-0 mt-1 p-2 bg-amber-900/30 border border-amber-700 rounded-lg text-xs text-amber-300">💡 {field.hint}</div>}
                          </div>
                        );
                      })}

                      {/* Stuck AI help (after 3 wrong) */}
                      {isActive && stuckKeys.map(f => (
                        <div key={f.id} className="ml-8 mt-2">
                          {!aiResponses[`p${prob.id}-stuck${f.id}`] ? (
                            <button onClick={() => askStuckAI(si, f.id)} className="text-xs px-3 py-1 bg-amber-900/40 border border-amber-700 text-amber-300 rounded-lg hover:bg-amber-900/60">
                              {aiLoading[`p${prob.id}-stuck${f.id}`] ? "..." : "😕 Still stuck? Ask AI"}
                            </button>
                          ) : (
                            <div className="p-2 bg-teal-900/30 border border-teal-700 rounded-lg text-xs text-teal-100">{aiResponses[`p${prob.id}-stuck${f.id}`]}</div>
                          )}
                        </div>
                      ))}

                      {/* Check + Ask AI buttons */}
                      {isActive && (
                        <div className="ml-8 mt-3 flex gap-2">
                          <button onClick={() => checkStep(si)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors">Check →</button>
                          <button onClick={() => askStepAI(si)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs text-blue-300 rounded-lg transition-colors">
                            {aiLoading[stepAIKey] ? "..." : "🤖 Ask AI"}
                          </button>
                        </div>
                      )}

                      {/* AI step response */}
                      {aiResponses[stepAIKey] && (
                        <div className="ml-8 mt-2 p-3 bg-teal-900/30 border border-teal-700 rounded-lg text-xs text-teal-100 whitespace-pre-wrap">{aiResponses[stepAIKey]}</div>
                      )}

                      {/* Explanation on correct */}
                      {isPast && <div className="ml-8 mt-2 p-2 bg-green-900/30 border border-green-700 rounded-lg text-xs text-green-300">{step.explanation}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Completion card */}
          {pState.completed && (
            <div className="mt-6 p-6 bg-green-900/30 border-2 border-green-500 rounded-xl text-center">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-xl font-bold text-green-400 mb-1">Problem Complete!</div>
              <div className="text-sm text-slate-300 mb-4">{completed} / {problems.length} problems done</div>
              {prob.ti83 && (
                <div className="mb-4 p-3 bg-slate-900 rounded-lg text-left">
                  <span className="text-xs text-slate-400 font-bold">TI-83 PLUS: </span>
                  <span className="text-purple-300 font-mono text-xs">{prob.ti83}</span>
                </div>
              )}
              <div className="flex gap-3 justify-center">
                <button onClick={resetProblem} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-sm rounded-lg">↺ Retry</button>
                {selected < problems.length - 1 && (
                  <button onClick={() => setSelected(selected + 1)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-bold rounded-lg">Next Problem →</button>
                )}
              </div>
            </div>
          )}

          {/* Per-problem AI chat */}
          {pState.identifyDone && (
            <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-700 text-xs font-bold text-slate-400">💬 Ask Nyx about this problem</div>
              {(chatHistories[prob.id] ?? []).length > 0 && (
                <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
                  {(chatHistories[prob.id] ?? []).map((msg, i) => (
                    <div key={i} className={`text-xs rounded-lg p-2 max-w-xs ${msg.role === "user" ? "ml-auto bg-blue-800 text-blue-100" : "bg-teal-900/50 border border-teal-700 text-teal-100"}`}>
                      {msg.content}
                    </div>
                  ))}
                  {aiLoading[`chat-${prob.id}`] && <div className="text-xs text-slate-500 animate-pulse">Nyx is thinking...</div>}
                </div>
              )}
              <div className="p-3 flex gap-2">
                <input
                  type="text"
                  value={chatInputs[prob.id] ?? ""}
                  onChange={e => setChatInputs(prev => ({ ...prev, [prob.id]: e.target.value }))}
                  onKeyDown={e => { if (e.key === "Enter") sendChat(prob.id); }}
                  placeholder="Ask anything about this problem..."
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-600 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                />
                <button onClick={() => sendChat(prob.id)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-lg">Send</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating formula button */}
      <div className="fixed bottom-4 right-4 z-50">
        {showFormulas && <FormulaPanel onClose={() => setShowFormulas(false)} />}
        <button
          onClick={() => setShowFormulas(prev => !prev)}
          className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all ${showFormulas ? "bg-blue-500 text-white" : "bg-slate-700 hover:bg-slate-600 text-blue-300 border border-slate-600"}`}
        >
          📐 Formulas
        </button>
      </div>
    </div>
  );
}
