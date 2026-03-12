"use client";

import { useState, useRef, useEffect } from "react";

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
  identify: string[];
  steps: Step[];
  ti84?: string;
}

const problems: Problem[] = [
  {
    id: 1, topic: "Empirical Rule", color: "#3B82F6",
    question: "IQ scores in a population follow a normal distribution. The average IQ is 100 and the standard deviation is 15 points. According to the empirical rule, what percentage of people have IQ scores between 85 and 115?",
    identify: ["\"average IQ is 100\" → μ = 100", "\"standard deviation is 15\" → σ = 15", "Asking about 85 to 115 — how many SDs from the mean?"],
    steps: [
      { instruction: "How far is 85 from the mean? (mean − lower bound)", fields: [{ id: "s1f1", label: "100 − 85 = ", answer: 15, hint: "100 - 85 = 15" }], explanation: "85 is exactly 15 points (1σ) below the mean." },
      { instruction: "So 85 is how many standard deviations below the mean? (your result ÷ σ)", fields: [{ id: "s2f1", label: "15 ÷ 15 = ", answer: 1, hint: "15 ÷ 15 = 1 standard deviation" }], explanation: "85 is 1 SD below, 115 is 1 SD above. This is a μ ± 1σ range." },
      { instruction: "By the Empirical Rule, what % of data falls within 1 standard deviation of the mean? (number only)", fields: [{ id: "s3f1", label: "% = ", answer: 68, hint: "Empirical rule: 1σ = 68%, 2σ = 95%, 3σ = 99.7%" }], explanation: "68% of all data falls within μ ± 1σ. Memorize: 68-95-99.7." },
    ],
  },
  {
    id: 2, topic: "Symmetry Trap ⚠️", color: "#EF4444",
    question: "SAT scores are normally distributed with an average of 1060 and a standard deviation of 195. A college wants to admit students who score at the 93rd percentile or higher. What is the minimum SAT score needed?",
    identify: ["\"average of 1060\" → μ = 1060", "\"standard deviation of 195\" → σ = 195", "\"93rd percentile\" → 93% of scores are BELOW this value → area left = 0.93"],
    steps: [
      { instruction: "93rd percentile means what fraction of scores are BELOW the target? (enter as decimal)", fields: [{ id: "s1f1", label: "area to left = ", answer: 0.93, tolerance: 0.001, hint: "93rd percentile = 93% below = 0.93 to the left" }], explanation: "Area to left = 0.93. Use invNorm(0.93, 0, 1) to find z." },
      { instruction: "Find the z-score: invNorm(0.93, 0, 1). Round to 4 decimal places. ⚠️ TRAP: this z is POSITIVE!", fields: [{ id: "s2f1", label: "z = ", answer: 1.4758, tolerance: 0.02, hint: "⚠️ SYMMETRY TRAP: 93rd percentile is RIGHT of center → z is POSITIVE (+1.48). If you got -1.48, FLIP the sign!" }], explanation: "z = +1.4758 (POSITIVE). Prof Gina says this WILL be on the exam. 93rd percentile → right side → positive z." },
      { instruction: "Calculate x = μ + z·σ = 1060 + (1.4758 × 195). Round to nearest whole number.", fields: [{ id: "s3f1", label: "x = ", answer: 1348, tolerance: 5, hint: "1060 + (1.4758 × 195) = 1060 + 287.78 ≈ 1348" }], explanation: "Minimum score = 1348. x = μ + z·σ always gives you back the original units." },
    ],
    ti84: "invNorm(0.93, 1060, 195)",
  },
  {
    id: 3, topic: "CLT — Sample Mean", color: "#8B5CF6",
    question: "The time customers spend in a coffee shop averages 45 minutes with a standard deviation of 10 minutes. A random sample of 25 customers is observed. What is the probability that the sample mean is less than 43 minutes?",
    identify: ["\"averages 45 minutes\" → μ = 45", "\"standard deviation of 10 minutes\" → σ = 10 (population SD → Z)", "\"sample of 25\" → n = 25 → this is a SAMPLE MEAN problem → use σ/√n"],
    steps: [
      { instruction: "Calculate the standard error: SE = σ/√n = 10/√25", fields: [{ id: "s1f1", label: "SE = 10 ÷ √25 = ", answer: 2, tolerance: 0.01, hint: "√25 = 5, so 10/5 = 2" }], explanation: "SE = 2. Standard error is how much the SAMPLE MEAN varies — it's always smaller than σ." },
      { instruction: "Find the z-score: z = (x̄ − μ) / SE = (43 − 45) / 2", fields: [{ id: "s2f1", label: "z = ", answer: -1, tolerance: 0.01, hint: "z = -2/2 = -1.00" }], explanation: "z = -1. Negative because 43 is below the mean of 45." },
      { instruction: "Find P(Z < −1) using normalcdf(-1E99, -1, 0, 1). Round to 4 decimal places.", fields: [{ id: "s3f1", label: "P = ", answer: 0.1587, tolerance: 0.003, hint: "normalcdf(-1E99, -1, 0, 1) ≈ 0.1587" }], explanation: "P ≈ 0.1587. About 15.87% of samples of 25 would have a mean below 43 min." },
    ],
    ti84: "normalcdf(-1E99, 43, 45, 10/√(25))",
  },
  {
    id: 4, topic: "Z-Interval (σ known)", color: "#10B981",
    question: "A researcher is studying adult sleep. From prior research, the population standard deviation is 1.5 hours. A random sample of 64 adults produces an average of 6.8 hours of sleep. Construct a 95% confidence interval for the true mean.",
    identify: ["\"population standard deviation is 1.5\" → σ = 1.5 → use Z-interval!", "\"sample of 64\" → n = 64", "\"average of 6.8 hours\" → x̄ = 6.8", "\"95% confidence\" → z* = 1.96"],
    steps: [
      { instruction: "Population σ is given → Z-interval. What is z* for 95% confidence?", fields: [{ id: "s1f1", label: "z* = ", answer: 1.96, tolerance: 0.01, hint: "95% CI → z* = 1.96 (memorize: 90%=1.645, 95%=1.96, 99%=2.576)" }], explanation: "z* = 1.96 for 95% CI. σ known → Z, not T." },
      { instruction: "SE = σ/√n = 1.5/√64", fields: [{ id: "s2f1", label: "SE = ", answer: 0.1875, tolerance: 0.005, hint: "√64 = 8, so 1.5/8 = 0.1875" }], explanation: "SE = 0.1875" },
      { instruction: "Margin of error E = z* × SE = 1.96 × 0.1875", fields: [{ id: "s3f1", label: "E = ", answer: 0.3675, tolerance: 0.005, hint: "1.96 × 0.1875 = 0.3675" }], explanation: "E = 0.3675" },
      { instruction: "Lower bound = x̄ − E = 6.8 − 0.3675", fields: [{ id: "s4f1", label: "Lower = ", answer: 6.4325, tolerance: 0.01, hint: "6.8 - 0.3675 = 6.4325" }], explanation: "Lower = 6.4325" },
      { instruction: "Upper bound = x̄ + E = 6.8 + 0.3675", fields: [{ id: "s5f1", label: "Upper = ", answer: 7.1675, tolerance: 0.01, hint: "6.8 + 0.3675 = 7.1675" }], explanation: "95% CI: (6.43, 7.17). 'We are 95% CONFIDENT the true mean sleep time is between 6.43 and 7.17 hours.'" },
    ],
    ti84: "STAT → TESTS → 7:ZInterval",
  },
  {
    id: 5, topic: "T-Interval (s known)", color: "#10B981",
    question: "A professor samples 20 students and finds they scored an average of 74 points on a standardized test, with a standard deviation of 8 points. Find a 90% confidence interval for the true mean score.",
    identify: ["\"average of 74 points\" → x̄ = 74", "\"standard deviation of 8 points\" — from the sample → s = 8 (no σ given → T-interval!)", "\"samples 20 students\" → n = 20 → df = 19", "\"90% confidence\" → find t*"],
    steps: [
      { instruction: "s is given (not σ) → T-interval. What is df = n − 1?", fields: [{ id: "s1f1", label: "df = ", answer: 19, hint: "df = 20 - 1 = 19" }], explanation: "df = 19. We use T because only the sample SD (s) is known." },
      { instruction: "Look up t* for 90% CI, df = 19. Use invT(0.95, 19) on TI-84.", fields: [{ id: "s2f1", label: "t* = ", answer: 1.729, tolerance: 0.005, hint: "invT(0.95, 19) ≈ 1.729. For 90% CI: area to left of upper critical = 0.95" }], explanation: "t* ≈ 1.729" },
      { instruction: "SE = s/√n = 8/√20. Round to 4 decimal places.", fields: [{ id: "s3f1", label: "SE = ", answer: 1.7889, tolerance: 0.01, hint: "√20 ≈ 4.4721, so 8/4.4721 ≈ 1.7889" }], explanation: "SE ≈ 1.7889" },
      { instruction: "E = t* × SE = 1.729 × 1.7889", fields: [{ id: "s4f1", label: "E = ", answer: 3.09, tolerance: 0.06, hint: "1.729 × 1.7889 ≈ 3.09" }], explanation: "E ≈ 3.09" },
      { instruction: "Lower = x̄ − E, Upper = x̄ + E. Enter the lower bound.", fields: [{ id: "s5f1", label: "Lower = ", answer: 70.91, tolerance: 0.1, hint: "74 - 3.09 = 70.91" }], explanation: "90% CI: (70.91, 77.09). We are 90% confident the true mean is between 70.91 and 77.09." },
    ],
    ti84: "STAT → TESTS → 8:TInterval",
  },
  {
    id: 6, topic: "Proportion CI", color: "#10B981",
    question: "A researcher surveys 300 college students and finds 234 own a laptop. Find a 95% confidence interval for the true proportion of college students who own a laptop.",
    identify: ["\"surveys 300 students\" → n = 300", "\"234 own a laptop\" → x = 234 → this is a count out of a total → proportion!", "p̂ = 234/300", "\"95% confidence\" → z* = 1.96"],
    steps: [
      { instruction: "Calculate p̂ = x/n = 234/300", fields: [{ id: "s1f1", label: "p̂ = ", answer: 0.78, tolerance: 0.005, hint: "234 ÷ 300 = 0.78" }], explanation: "p̂ = 0.78" },
      { instruction: "q̂ = 1 − p̂", fields: [{ id: "s2f1", label: "q̂ = ", answer: 0.22, tolerance: 0.005, hint: "1 - 0.78 = 0.22" }], explanation: "q̂ = 0.22" },
      { instruction: "SE = √(p̂ × q̂ / n) = √(0.78 × 0.22 / 300)", fields: [{ id: "s3f1", label: "SE = ", answer: 0.0239, tolerance: 0.002, hint: "√(0.1716/300) = √0.000572 ≈ 0.0239" }], explanation: "SE ≈ 0.0239" },
      { instruction: "E = z* × SE = 1.96 × 0.0239", fields: [{ id: "s4f1", label: "E = ", answer: 0.0468, tolerance: 0.005, hint: "1.96 × 0.0239 ≈ 0.0468" }], explanation: "E ≈ 0.0468 (about ±4.68 percentage points)" },
      { instruction: "Upper bound = p̂ + E", fields: [{ id: "s5f1", label: "Upper = ", answer: 0.8268, tolerance: 0.01, hint: "0.78 + 0.0468 = 0.8268" }], explanation: "95% CI: (0.7332, 0.8268) → between 73.3% and 82.7% of students own a laptop." },
    ],
    ti84: "STAT → TESTS → A:1-PropZInt",
  },
  {
    id: 7, topic: "Z-Test — Left Tailed", color: "#F59E0B",
    question: "A company states that their light bulbs have a mean lifetime of 1000 hours. A consumer group tests a random sample of 49 bulbs and records an average lifetime of 980 hours. Records show the population standard deviation is 70 hours. Using a significance level of 0.05, is there sufficient evidence the mean lifetime is less than the stated value?",
    identify: ["\"mean lifetime of 1000 hours\" → claimed mean → μ₀ = 1000", "\"sample of 49 bulbs\" → n = 49", "\"average of 980 hours\" → x̄ = 980", "\"population standard deviation is 70\" → σ = 70 → Z-test (not T!)", "\"significance level of 0.05\" → α = 0.05", "\"less than\" → LEFT-TAILED"],
    steps: [
      { instruction: "What is the claimed population mean μ₀?", fields: [{ id: "s1f1", label: "μ₀ = ", answer: 1000, hint: "'mean lifetime of 1000 hours' → μ₀ = 1000. This goes in H₀." }], explanation: "H₀: μ = 1000 | H₁: μ < 1000 (left-tailed, because 'less than')" },
      { instruction: "Population σ is given → use Z-test. Calculate: z = (x̄ − μ₀) / (σ/√n) = (980 − 1000) / (70/√49)", fields: [{ id: "s2f1", label: "z = ", answer: -2, tolerance: 0.01, hint: "70/√49 = 70/7 = 10, so z = -20/10 = -2.00" }], explanation: "z = -2.00. Negative because 980 < 1000." },
      { instruction: "Left-tailed p-value = P(Z < −2.00). Use normalcdf(-1E99, -2, 0, 1).", fields: [{ id: "s3f1", label: "p-value = ", answer: 0.0228, tolerance: 0.002, hint: "normalcdf(-1E99, -2, 0, 1) ≈ 0.0228" }], explanation: "p-value = 0.0228. There's only a 2.28% chance of getting this low a mean if the claim were true." },
      { instruction: "Is p-value < α? Enter 1 to Reject H₀, or 0 to Fail to Reject.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.0228 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. At α = 0.05, there IS sufficient evidence the mean lifetime is less than 1000 hours." },
    ],
    ti84: "STAT → TESTS → 1:Z-Test",
  },
  {
    id: 8, topic: "Z-Test — Right Tailed", color: "#F59E0B",
    question: "A tire company claims their tires last an average of 50,000 miles. A consumer group believes the true mean is higher. They test a sample of 64 tires and find a mean of 51,200 miles. The population standard deviation is 4,800 miles. At a significance level of 0.05, is there evidence the true mean exceeds the claim?",
    identify: ["\"average of 50,000 miles\" → μ₀ = 50000", "\"sample of 64\" → n = 64", "\"mean of 51,200\" → x̄ = 51200", "\"population standard deviation is 4,800\" → σ = 4800 → Z-test", "\"exceeds\" → RIGHT-TAILED"],
    steps: [
      { instruction: "'Exceeds' → right-tailed. H₁: μ > 50000. Calculate z = (51200 − 50000) / (4800/√64)", fields: [{ id: "s1f1", label: "z = ", answer: 2, tolerance: 0.01, hint: "4800/√64 = 4800/8 = 600. z = 1200/600 = 2.00" }], explanation: "z = +2.00. Positive because 51200 > 50000." },
      { instruction: "Right-tailed p-value = P(Z > 2.00). Use normalcdf(2, 1E99, 0, 1).", fields: [{ id: "s2f1", label: "p-value = ", answer: 0.0228, tolerance: 0.002, hint: "normalcdf(2, 1E99, 0, 1) ≈ 0.0228" }], explanation: "p-value = 0.0228" },
      { instruction: "Is 0.0228 < α (0.05)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s3f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.0228 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. Evidence that mean tire life exceeds 50,000 miles." },
    ],
  },
  {
    id: 9, topic: "Z-Test — Two Tailed", color: "#F59E0B",
    question: "A packaging machine fills bags with 16 oz of chips. The population standard deviation is 0.4 oz. A quality inspector samples 36 bags and finds a mean of 15.85 oz. At a significance level of 0.01, is there evidence the machine is filling bags incorrectly (in either direction)?",
    identify: ["μ₀ = 16 | n = 36 | x̄ = 15.85 | σ = 0.4 → Z-test", "\"either direction\" → TWO-TAILED → H₁: μ ≠ 16", "α = 0.01 → for two-tailed, critical value is ±2.576"],
    steps: [
      { instruction: "Calculate z = (x̄ − μ₀) / (σ/√n) = (15.85 − 16) / (0.4/√36)", fields: [{ id: "s1f1", label: "z = ", answer: -2.25, tolerance: 0.05, hint: "0.4/6 = 0.0667. z = -0.15/0.0667 = -2.25" }], explanation: "z = -2.25" },
      { instruction: "Two-tailed p-value = 2 × P(Z < −2.25) = 2 × normalcdf(-1E99, -2.25, 0, 1)", fields: [{ id: "s2f1", label: "p-value = ", answer: 0.0244, tolerance: 0.003, hint: "normalcdf(-1E99, -2.25, 0, 1) ≈ 0.0122. Two-tailed: × 2 = 0.0244" }], explanation: "p-value = 0.0244. REMEMBER: two-tailed means you double the one-tail area." },
      { instruction: "Is 0.0244 < α (0.01)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s3f1", label: "Reject? (1=yes, 0=no) = ", answer: 0, hint: "0.0244 > 0.01 → Fail to Reject H₀" }], explanation: "FAIL TO REJECT H₀. At α = 0.01, not enough evidence. (Note: at α = 0.05 it would be rejected — α matters!)" },
    ],
  },
  {
    id: 10, topic: "T-Test — Two Tailed", color: "#F59E0B",
    question: "A gym advertises that new members lose an average of 10 pounds in their first month. A researcher randomly selects 16 members and finds they lost an average of 8.5 pounds, with a standard deviation of 3 pounds. At a significance level of 0.05, is there evidence the actual mean differs from 10 pounds?",
    identify: ["μ₀ = 10 | x̄ = 8.5 | s = 3 (sample SD → T-test!) | n = 16 | α = 0.05", "\"differs from\" → TWO-TAILED → H₁: μ ≠ 10"],
    steps: [
      { instruction: "s is given (not σ) → T-test. df = n − 1 = ?", fields: [{ id: "s1f1", label: "df = ", answer: 15, hint: "16 - 1 = 15" }], explanation: "df = 15. T-test because only s is known." },
      { instruction: "t = (x̄ − μ₀) / (s/√n) = (8.5 − 10) / (3/√16)", fields: [{ id: "s2f1", label: "t = ", answer: -2, tolerance: 0.01, hint: "3/√16 = 3/4 = 0.75. t = -1.5/0.75 = -2.00" }], explanation: "t = -2.00, df = 15" },
      { instruction: "Two-tailed p-value = 2 × tcdf(|t|, 1E99, df) = 2 × tcdf(2, 1E99, 15)", fields: [{ id: "s3f1", label: "p-value = ", answer: 0.0644, tolerance: 0.005, hint: "tcdf(2, 1E99, 15) ≈ 0.0322 × 2 = 0.0644" }], explanation: "p-value ≈ 0.0644" },
      { instruction: "Is 0.0644 < α (0.05)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 0, hint: "0.0644 > 0.05 → Fail to Reject" }], explanation: "FAIL TO REJECT H₀. Not enough evidence. (NEVER say 'accept H₀' — say 'fail to reject'.)" },
    ],
    ti84: "STAT → TESTS → 2:T-Test",
  },
  {
    id: 11, topic: "Proportion HT — Left Tailed", color: "#F59E0B",
    question: "A politician claims 60 percent of voters support her. An independent poll of 200 randomly selected voters finds 108 support her. At a significance level of 0.05, is there sufficient evidence the true proportion is less than the claimed value?",
    identify: ["\"claims 60 percent\" → p₀ = 0.60 (use this in the DENOMINATOR, not p̂!)", "\"poll of 200\" → n = 200", "\"108 support\" → x = 108 → proportion!", "\"less than\" → LEFT-TAILED"],
    steps: [
      { instruction: "Calculate p̂ = x/n = 108/200", fields: [{ id: "s1f1", label: "p̂ = ", answer: 0.54, tolerance: 0.005, hint: "108/200 = 0.54" }], explanation: "p̂ = 0.54. H₀: p = 0.60 | H₁: p < 0.60 (left-tailed)" },
      { instruction: "z = (p̂ − p₀) / √(p₀ × (1−p₀) / n) — use p₀ = 0.60 in denominator, NOT p̂!", fields: [{ id: "s2f1", label: "z = ", answer: -1.732, tolerance: 0.03, hint: "√(0.60×0.40/200) = √0.0012 = 0.03464. z = (0.54-0.60)/0.03464 = -1.732" }], explanation: "z ≈ -1.73. CRITICAL: always use p₀ (the null value) in the denominator formula." },
      { instruction: "Left-tailed p-value = normalcdf(-1E99, -1.732, 0, 1)", fields: [{ id: "s3f1", label: "p-value = ", answer: 0.0416, tolerance: 0.006, hint: "normalcdf(-1E99, -1.732, 0, 1) ≈ 0.0416" }], explanation: "p-value ≈ 0.042" },
      { instruction: "Is 0.042 < 0.05? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.042 < 0.05 → Reject" }], explanation: "REJECT H₀. Evidence the true proportion is less than 60%." },
    ],
    ti84: "STAT → TESTS → 5:1-PropZTest",
  },
  {
    id: 12, topic: "2-Sample T-Test ⚠️ ALEKS df", color: "#EC4899",
    question: "Two groups of students take a math exam. Group 1 used a tutoring app: 13 students, average score 82, standard deviation 6. Group 2 used traditional studying: 15 students, average score 77, standard deviation 8. At a significance level of 0.05, is there evidence the tutoring app group scored higher?",
    identify: ["Two independent groups → 2-Sample T-test", "n₁=13, x̄₁=82, s₁=6 | n₂=15, x̄₂=77, s₂=8", "\"scored higher\" → RIGHT-TAILED", "ALEKS df = min(n₁−1, n₂−1) — NOT Welch's formula!"],
    steps: [
      { instruction: "⚠️ ALEKS RULE: df = min(n₁−1, n₂−1) = min(12, 14) = ?", fields: [{ id: "s1f1", label: "df = ", answer: 12, hint: "min(13-1, 15-1) = min(12, 14) = 12. ALWAYS use the SMALLER df on ALEKS!" }], explanation: "df = 12. This is the ALEKS conservative rule — not Welch's formula (which gives ~24)." },
      { instruction: "t = (x̄₁ − x̄₂) / √(s₁²/n₁ + s₂²/n₂) = (82−77) / √(36/13 + 64/15)", fields: [{ id: "s2f1", label: "t = ", answer: 1.89, tolerance: 0.1, hint: "= 5 / √(2.769 + 4.267) = 5 / √7.036 = 5/2.652 ≈ 1.89" }], explanation: "t ≈ 1.89, df = 12" },
      { instruction: "Right-tailed p-value = tcdf(1.89, 1E99, 12)", fields: [{ id: "s3f1", label: "p-value = ", answer: 0.042, tolerance: 0.01, hint: "tcdf(1.89, 1E99, 12) ≈ 0.042" }], explanation: "p-value ≈ 0.042" },
      { instruction: "Is 0.042 < 0.05? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.042 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. Evidence the tutoring app group scored higher." },
    ],
    ti84: "STAT → TESTS → 4:2-SampTTest",
  },
  {
    id: 13, topic: "Chi-Square GoF", color: "#06B6D4",
    question: "A quality control manager claims defects occur equally on each day of the work week. Over 5 weeks, defects recorded: Monday 22, Tuesday 18, Wednesday 26, Thursday 15, Friday 19. Total = 100. At a significance level of 0.05, is there evidence defects are not equally distributed?",
    identify: ["5 categories (days), n = 100 total", "If equal: E = 100/5 = 20 per day", "Chi-Square GoF → ALWAYS right-tailed", "df = k − 1 = 5 − 1 = 4"],
    steps: [
      { instruction: "What is the expected frequency per day if equally distributed? E = n/k = 100/5", fields: [{ id: "s1f1", label: "E = ", answer: 20, hint: "100 ÷ 5 days = 20 per day" }], explanation: "E = 20 for each day." },
      { instruction: "df = k − 1 = 5 − 1", fields: [{ id: "s2f1", label: "df = ", answer: 4, hint: "5 categories - 1 = 4" }], explanation: "df = 4" },
      { instruction: "χ² = Σ(O-E)²/E = (22-20)²/20 + (18-20)²/20 + (26-20)²/20 + (15-20)²/20 + (19-20)²/20", fields: [{ id: "s3f1", label: "χ² = ", answer: 3.5, tolerance: 0.1, hint: "= 4/20 + 4/20 + 36/20 + 25/20 + 1/20 = (4+4+36+25+1)/20 = 70/20 = 3.5" }], explanation: "χ² = 3.5" },
      { instruction: "Find critical value from the chi-square TABLE (no invχ² on TI-84!). α = 0.05, df = 4.", fields: [{ id: "s4f1", label: "critical value = ", answer: 9.488, tolerance: 0.05, hint: "Chi-square table: df=4, right-tail area 0.05 → 9.488" }], explanation: "Critical value = 9.488. TI-84 has no invχ² — you MUST use the table." },
      { instruction: "Is χ² (3.5) > critical value (9.488)? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s5f1", label: "Reject? (1=yes, 0=no) = ", answer: 0, hint: "3.5 < 9.488 → Fail to Reject" }], explanation: "FAIL TO REJECT H₀. Not enough evidence defects are unequal across days." },
    ],
    ti84: "STAT → TESTS → D:χ²GOF-Test (observed in L1, expected in L2)",
  },
  {
    id: 14, topic: "ANOVA", color: "#06B6D4",
    question: "A researcher tests three fertilizers on plant height (cm) after 4 weeks. Fertilizer A: 22, 25, 24, 23. Fertilizer B: 28, 30, 27, 29. Fertilizer C: 19, 21, 20, 18. At a significance level of 0.05, is there evidence at least one fertilizer produces a different mean height?",
    identify: ["3 groups → k = 3 → ANOVA (F-test)", "4 plants per group → N = 12 total", "df₁ = k−1 = 2 (between) | df₂ = N−k = 9 (within)", "ANOVA is ALWAYS right-tailed"],
    steps: [
      { instruction: "How many groups? k = ?", fields: [{ id: "s1f1", label: "k = ", answer: 3, hint: "Fertilizer A, B, C = 3 groups" }], explanation: "k = 3 → ANOVA (not t-test, because there are 3+ groups)" },
      { instruction: "df₁ = k − 1 (between groups)", fields: [{ id: "s2f1", label: "df₁ = ", answer: 2, hint: "3 - 1 = 2" }], explanation: "df₁ = 2" },
      { instruction: "df₂ = N − k (within groups). N = 3 groups × 4 each = 12", fields: [{ id: "s3f1", label: "df₂ = N − k = ", answer: 9, hint: "12 - 3 = 9" }], explanation: "df₂ = 9" },
      { instruction: "After running ANOVA(L1,L2,L3) on TI-84: F ≈ 28.88, p ≈ 0.0001. Is p < α? Enter 1 to Reject, 0 to Fail to Reject.", fields: [{ id: "s4f1", label: "Reject? (1=yes, 0=no) = ", answer: 1, hint: "0.0001 < 0.05 → Reject H₀" }], explanation: "REJECT H₀. At least one fertilizer produces a different mean height. ANOVA only tells you THAT — not WHICH ones differ." },
    ],
    ti84: "Enter groups in L1, L2, L3 → STAT → TESTS → H:ANOVA(L1,L2,L3)",
  },
  {
    id: 15, topic: "Sample Size — Mean", color: "#64748B",
    question: "A researcher wants to estimate the mean weight of adult male cats to within 0.3 pounds. From prior studies, the population standard deviation is 1.2 pounds. How large a sample is needed for 99% confidence?",
    identify: ["\"within 0.3 pounds\" → E = 0.3 (margin of error)", "\"population standard deviation is 1.2\" → σ = 1.2", "\"99% confidence\" → z* = 2.576"],
    steps: [
      { instruction: "99% confidence → z* = ?", fields: [{ id: "s1f1", label: "z* = ", answer: 2.576, tolerance: 0.005, hint: "99% CI → z* = 2.576" }], explanation: "z* = 2.576 for 99% confidence." },
      { instruction: "n = (z* × σ / E)² = (2.576 × 1.2 / 0.3)²  — compute the inside first", fields: [{ id: "s2f1", label: "z*σ/E = 2.576×1.2÷0.3 = ", answer: 10.304, tolerance: 0.05, hint: "2.576 × 1.2 = 3.0912, ÷ 0.3 = 10.304" }], explanation: "Inside = 10.304" },
      { instruction: "Now square it: n = (10.304)²", fields: [{ id: "s3f1", label: "n (before rounding) = ", answer: 106.17, tolerance: 0.5, hint: "10.304² = 106.17" }], explanation: "106.17 → must ROUND UP" },
      { instruction: "Round UP to get minimum sample size. (Always ceiling, never floor!)", fields: [{ id: "s4f1", label: "n = ", answer: 107, hint: "106.17 → round UP → 107. NEVER round down for sample size!" }], explanation: "n = 107. Even 106.01 rounds up to 107." },
    ],
  },
  {
    id: 16, topic: "Sample Size — Proportion", color: "#64748B",
    question: "A researcher wants to estimate the proportion of adults who exercise daily. No prior estimate is available. How large a sample is needed to be within 4 percentage points with 95% confidence?",
    identify: ["\"within 4 percentage points\" → E = 0.04", "\"no prior estimate\" → use p̂ = 0.50 (gives maximum/conservative n)", "\"95% confidence\" → z* = 1.96"],
    steps: [
      { instruction: "No prior p̂ → use p̂ = 0.50 (worst case, gives largest n). What is q̂?", fields: [{ id: "s1f1", label: "q̂ = 1 − 0.50 = ", answer: 0.5, tolerance: 0.01, hint: "1 - 0.50 = 0.50" }], explanation: "p̂ = q̂ = 0.5 gives max sample size. Use this when no prior estimate exists." },
      { instruction: "n = z*² × p̂q̂ / E² = (1.96)² × (0.5×0.5) / (0.04)². Compute numerator: 1.96² × 0.25", fields: [{ id: "s2f1", label: "1.96² × 0.25 = ", answer: 0.9604, tolerance: 0.005, hint: "1.96² = 3.8416, × 0.25 = 0.9604" }], explanation: "Numerator = 0.9604" },
      { instruction: "Denominator: E² = (0.04)²", fields: [{ id: "s3f1", label: "0.04² = ", answer: 0.0016, tolerance: 0.0001, hint: "0.04 × 0.04 = 0.0016" }], explanation: "Denominator = 0.0016" },
      { instruction: "n = 0.9604 / 0.0016 → round UP", fields: [{ id: "s4f1", label: "n = ", answer: 601, hint: "0.9604/0.0016 = 600.25 → round UP → 601" }], explanation: "n = 601. Always ceiling for sample size." },
    ],
  },
  {
    id: 17, topic: "CI Interpretation", color: "#64748B",
    question: "A 95% confidence interval for the mean daily steps is (8200, 9800). A fitness company claims the true mean is 10,000 steps. Based only on this interval, what is your conclusion about the claim?",
    identify: ["CI: (8200, 9800)", "Claimed value: 10,000", "Is 10,000 inside or outside the interval?"],
    steps: [
      { instruction: "Is 10,000 inside the interval (8200, 9800)? Enter 1 for yes, 0 for no.", fields: [{ id: "s1f1", label: "Inside? (1=yes, 0=no) = ", answer: 0, hint: "8200 < 10000 < 9800? No — 10,000 is above 9,800" }], explanation: "10,000 is OUTSIDE the interval. It's above the upper bound of 9,800." },
      { instruction: "When the claimed value is OUTSIDE the CI, we have evidence to (1=reject the claim, 0=support the claim).", fields: [{ id: "s2f1", label: "Reject claim? (1=yes, 0=no) = ", answer: 1, hint: "Value outside CI → evidence against the claim" }], explanation: "REJECT the claim. At 95% confidence, the data suggests the true mean is between 8,200 and 9,800 — not 10,000." },
    ],
  },
  {
    id: 18, topic: "Normal Distribution", color: "#3B82F6",
    question: "Heights of adult women are normally distributed with an average of 64 inches and a standard deviation of 2.5 inches. What is the probability that a randomly selected woman is taller than 67 inches?",
    identify: ["\"average of 64\" → μ = 64", "\"standard deviation of 2.5\" → σ = 2.5", "\"randomly selected woman\" → individual (NOT a sample) → use σ directly", "\"taller than 67\" → P(X > 67)"],
    steps: [
      { instruction: "Calculate z = (x − μ) / σ = (67 − 64) / 2.5", fields: [{ id: "s1f1", label: "z = ", answer: 1.2, tolerance: 0.01, hint: "z = 3/2.5 = 1.20" }], explanation: "z = 1.20. Positive because 67 > 64." },
      { instruction: "P(Z > 1.20) = 1 − P(Z < 1.20) = 1 − normalcdf(-1E99, 1.2, 0, 1). Round to 4 decimal places.", fields: [{ id: "s2f1", label: "P(X > 67) = ", answer: 0.1151, tolerance: 0.003, hint: "normalcdf(1.2, 1E99, 0, 1) ≈ 0.1151" }], explanation: "P ≈ 0.1151. About 11.51% of women are taller than 67 inches." },
    ],
    ti84: "normalcdf(67, 1E99, 64, 2.5)",
  },
  {
    id: 19, topic: "Chi-Square — Notation Trap", color: "#06B6D4",
    question: "A chi-square table shows a value of 11.07 for df equals 5 at a certain area. A student labels this as chi-square sub 0.05. What does the subscript 0.05 represent — the right-tail area or the left-tail area?",
    identify: ["Chi-square subscript notation: χ²₀.₀₅", "The subscript = the RIGHT-TAIL area", "This is the OPPOSITE of what most students assume"],
    steps: [
      { instruction: "The subscript on a chi-square critical value represents what tail? Enter 1 for right-tail, 0 for left-tail.", fields: [{ id: "s1f1", label: "Right-tail? (1=yes, 0=no) = ", answer: 1, hint: "χ²₀.₀₅ = chi-square where RIGHT-tail area = 0.05. The subscript IS the right-tail probability." }], explanation: "RIGHT-tail. χ²₀.₀₅ = the value where 5% of the distribution is to the RIGHT." },
      { instruction: "Verify: χ²cdf(11.07, 1E99, 5) should equal approximately what value?", fields: [{ id: "s2f1", label: "≈ ", answer: 0.05, tolerance: 0.005, hint: "χ²cdf(11.07, 1E99, 5) ≈ 0.05 — confirms right-tail area = 0.05" }], explanation: "✓ Confirmed. χ²cdf(11.07, 1E99, 5) ≈ 0.05. The subscript = right-tail area." },
    ],
  },
  {
    id: 20, topic: "ANOVA Table Calculation", color: "#06B6D4",
    question: "An ANOVA comparing mean salaries across 4 departments produces: Sum of Squares Between equals 840, Sum of Squares Within equals 1260, with 4 groups and 28 total observations. Calculate the F statistic.",
    identify: ["SSB = 840, SSW = 1260", "k = 4 groups, N = 28 total", "df₁ = k−1 = 3 | df₂ = N−k = 24", "F = MSB/MSW where MSB = SSB/df₁ and MSW = SSW/df₂"],
    steps: [
      { instruction: "df₁ = k − 1 = 4 − 1", fields: [{ id: "s1f1", label: "df₁ = ", answer: 3, hint: "4 - 1 = 3" }], explanation: "df₁ = 3" },
      { instruction: "df₂ = N − k = 28 − 4", fields: [{ id: "s2f1", label: "df₂ = ", answer: 24, hint: "28 - 4 = 24" }], explanation: "df₂ = 24" },
      { instruction: "MSB = SSB / df₁ = 840 / 3", fields: [{ id: "s3f1", label: "MSB = ", answer: 280, hint: "840 / 3 = 280" }], explanation: "MSB = 280" },
      { instruction: "MSW = SSW / df₂ = 1260 / 24", fields: [{ id: "s4f1", label: "MSW = ", answer: 52.5, tolerance: 0.1, hint: "1260 / 24 = 52.5" }], explanation: "MSW = 52.5" },
      { instruction: "F = MSB / MSW = 280 / 52.5", fields: [{ id: "s5f1", label: "F = ", answer: 5.333, tolerance: 0.05, hint: "280 / 52.5 = 5.333" }], explanation: "F ≈ 5.33. Compare to F-critical (df₁=3, df₂=24, α=0.05) ≈ 3.01 → Reject H₀ → at least one department differs." },
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
  currentStep: number;
  fieldStates: Record<string, FieldState>;
  completed: boolean;
}

function checkAnswer(input: string, answer: number | string, tolerance = 0.015): boolean {
  const clean = input.trim().toLowerCase().replace(/[,%]/g, "");
  if (typeof answer === "number") {
    const num = parseFloat(clean);
    if (isNaN(num)) return false;
    return Math.abs(num - answer) <= tolerance;
  }
  return clean === String(answer).toLowerCase();
}

export default function PracticePage() {
  const [selected, setSelected] = useState(0);
  const [states, setStates] = useState<Record<number, ProblemState>>(() =>
    Object.fromEntries(problems.map(p => [p.id, { currentStep: 0, fieldStates: {}, completed: false }]))
  );
  const [shake, setShake] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const prob = problems[selected];
  const pState = states[prob.id];
  const completed = Object.values(states).filter(s => s.completed).length;

  useEffect(() => { inputRef.current?.focus(); }, [selected, pState.currentStep]);

  function getField(fieldId: string): FieldState {
    return pState.fieldStates[fieldId] ?? { value: "", status: "idle", attempts: 0 };
  }

  function updateField(fieldId: string, value: string) {
    setStates(prev => ({
      ...prev,
      [prob.id]: {
        ...prev[prob.id],
        fieldStates: { ...prev[prob.id].fieldStates, [fieldId]: { ...getField(fieldId), value, status: "idle" } }
      }
    }));
  }

  function checkStep(stepIdx: number) {
    const step = prob.steps[stepIdx];
    const allCorrect = step.fields.every(f => {
      const fs = getField(f.id);
      return checkAnswer(fs.value, f.answer, f.tolerance);
    });

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
        }
      });
    }
  }

  function resetProblem() {
    setStates(prev => ({ ...prev, [prob.id]: { currentStep: 0, fieldStates: {}, completed: false } }));
  }

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
                <span className="text-lg flex-shrink-0">{ps.completed ? "✅" : selected === i ? "▶" : "○"}</span>
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
          {/* Topic badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: prob.color }}>{prob.topic}</span>
            <span className="text-sm text-slate-400">Problem {prob.id} of {problems.length}</span>
          </div>

          {/* Question */}
          <div className="bg-slate-800 rounded-xl p-5 mb-4 border border-slate-700">
            <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Problem</div>
            <p className="text-white leading-relaxed">{prob.question}</p>
          </div>

          {/* Identify */}
          <details className="mb-4 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <summary className="p-4 cursor-pointer text-sm font-bold text-blue-400 hover:text-blue-300">🔍 Identify the pieces (expand to check your work)</summary>
            <div className="px-4 pb-4">
              <ul className="space-y-1">
                {prob.identify.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300 font-mono">{item}</li>
                ))}
              </ul>
            </div>
          </details>

          {/* Steps */}
          <div className="space-y-3">
            {prob.steps.map((step, si) => {
              const isActive = si === pState.currentStep && !pState.completed;
              const isPast = si < pState.currentStep || pState.completed;
              const isLocked = si > pState.currentStep && !pState.completed;

              return (
                <div key={si} className={`rounded-xl border transition-all ${isPast ? "border-green-700 bg-green-900/20" : isActive ? "border-blue-600 bg-slate-800" : "border-slate-700 bg-slate-800/50 opacity-50"}`}>
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`text-lg flex-shrink-0 ${isPast ? "text-green-400" : isActive ? "text-blue-400" : "text-slate-600"}`}>
                        {isPast ? "✓" : `${si + 1}.`}
                      </span>
                      <p className={`text-sm leading-relaxed ${isPast ? "text-slate-300" : isActive ? "text-white" : "text-slate-500"}`}>{step.instruction}</p>
                    </div>

                    {/* Input fields */}
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
                          {showHint && (
                            <div className="ml-0 mt-2 p-2 bg-amber-900/30 border border-amber-700 rounded-lg text-xs text-amber-300">
                              💡 Hint: {field.hint}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Check button */}
                    {isActive && (
                      <div className="ml-8 mt-3">
                        <button onClick={() => checkStep(si)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors">
                          Check →
                        </button>
                      </div>
                    )}

                    {/* Explanation */}
                    {isPast && (
                      <div className="ml-8 mt-2 p-2 bg-green-900/30 border border-green-700 rounded-lg text-xs text-green-300">
                        {step.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completed */}
          {pState.completed && (
            <div className="mt-6 p-6 bg-green-900/30 border-2 border-green-500 rounded-xl text-center">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-xl font-bold text-green-400 mb-1">Problem Complete!</div>
              <div className="text-sm text-slate-300 mb-4">{completed} / {problems.length} problems done</div>
              {prob.ti84 && (
                <div className="mb-4 p-3 bg-slate-900 rounded-lg text-left">
                  <span className="text-xs text-slate-400 font-bold">TI-84 SHORTCUT: </span>
                  <span className="text-blue-300 font-mono text-sm">{prob.ti84}</span>
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
        </div>
      </div>
    </div>
  );
}
