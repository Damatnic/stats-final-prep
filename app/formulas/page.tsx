export default function FormulasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Formula Quick Reference</h1>
        <p className="text-gray-400">All formulas you need for the exam in one place.</p>
      </div>

      {/* Z-Score & Normal Distribution */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">Z-Score & Normal Distribution</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaCard
            title="Z-Score (Individual)"
            formula="z = (x - μ) / σ"
            when="Finding how many std devs from mean"
          />
          <FormulaCard
            title="Z-Score (Sample Mean)"
            formula="z = (x̄ - μ) / (σ/√n)"
            when="Central Limit Theorem - sample of n"
            warning="Use σ/√n for samples!"
          />
        </div>
      </section>

      {/* Confidence Intervals */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">Confidence Intervals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormulaCard
            title="Z-Interval (σ known)"
            formula="x̄ ± z* · (σ/√n)"
            when="CI for mean when σ is given"
          />
          <FormulaCard
            title="T-Interval (σ unknown)"
            formula="x̄ ± t* · (s/√n)"
            when="CI for mean using sample s"
            df="df = n - 1"
          />
          <FormulaCard
            title="Proportion Z-Interval"
            formula="p̂ ± z* · √(p̂q̂/n)"
            when="CI for proportion"
            note="p̂ = x/n, q̂ = 1 - p̂"
          />
          <FormulaCard
            title="Sample Size (Mean)"
            formula="n = (z*σ/E)²"
            when="Finding required n"
            warning="Always round UP!"
          />
          <FormulaCard
            title="Sample Size (Proportion)"
            formula="n = z*² · p̂q̂ / E²"
            when="Finding required n for proportion"
            warning="Always round UP!"
          />
        </div>
      </section>

      {/* Critical Values Table */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">Z Critical Values</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 text-left">Confidence Level</th>
                <th className="py-2 text-center">z*</th>
                <th className="py-2 text-center">α (two-tailed)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-mono">
              <tr className="border-b border-[#334155]"><td className="py-2">90%</td><td className="text-center">1.645</td><td className="text-center">0.10</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">95%</td><td className="text-center">1.960</td><td className="text-center">0.05</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">98%</td><td className="text-center">2.326</td><td className="text-center">0.02</td></tr>
              <tr><td className="py-2">99%</td><td className="text-center">2.576</td><td className="text-center">0.01</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Hypothesis Testing */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">Hypothesis Testing</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormulaCard
            title="Z-Test (Mean, σ known)"
            formula="z = (x̄ - μ₀) / (σ/√n)"
            when="HT for mean when σ is given"
          />
          <FormulaCard
            title="T-Test (Mean, s known)"
            formula="t = (x̄ - μ₀) / (s/√n)"
            when="HT for mean using sample s"
            df="df = n - 1"
          />
          <FormulaCard
            title="Z-Test (Proportion)"
            formula="z = (p̂ - p₀) / √(p₀q₀/n)"
            when="HT for proportion"
            warning="Use p₀ (null value) in denominator!"
          />
        </div>
      </section>

      {/* HT Critical Values */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">HT Z Critical Values</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 text-left">α</th>
                <th className="py-2 text-center">Two-tailed (≠)</th>
                <th className="py-2 text-center">Left-tailed (&lt;)</th>
                <th className="py-2 text-center">Right-tailed (&gt;)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-mono">
              <tr className="border-b border-[#334155]"><td className="py-2">0.10</td><td className="text-center">±1.645</td><td className="text-center">-1.282</td><td className="text-center">+1.282</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-2">0.05</td><td className="text-center">±1.960</td><td className="text-center">-1.645</td><td className="text-center">+1.645</td></tr>
              <tr><td className="py-2">0.01</td><td className="text-center">±2.576</td><td className="text-center">-2.326</td><td className="text-center">+2.326</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Two-Sample Tests */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">Two-Sample Tests</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaCard
            title="Two-Sample T-Test"
            formula="t = (x̄₁ - x̄₂) / √(s₁²/n₁ + s₂²/n₂)"
            when="Comparing two independent means"
            df="df = min(n₁ - 1, n₂ - 1)"
            warning="ALEKS uses min formula!"
          />
          <FormulaCard
            title="Paired T-Test"
            formula="t = (d̄ - 0) / (sᵈ/√n)"
            when="Same subjects, before/after"
            df="df = n - 1 (n = pairs)"
          />
          <FormulaCard
            title="Pooled Proportion"
            formula="p̄ = (x₁ + x₂) / (n₁ + n₂)"
            when="For two-proportion Z-test"
          />
          <FormulaCard
            title="Two-Proportion Z-Test"
            formula="z = (p̂₁ - p̂₂) / √[p̄(1-p̄)(1/n₁ + 1/n₂)]"
            when="Comparing two proportions"
          />
        </div>
      </section>

      {/* Chi-Square */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">Chi-Square Goodness of Fit</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaCard
            title="Chi-Square Statistic"
            formula="χ² = Σ (O - E)² / E"
            when="Testing if data fits distribution"
            df="df = k - 1"
            note="O = Observed, E = Expected"
          />
          <FormulaCard
            title="Expected Frequency"
            formula="E = n × p"
            when="Calculating expected counts"
            warning="All E must be ≥ 5"
          />
        </div>
      </section>

      {/* Chi-Square Table */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">Chi-Square Critical Values</h2>
        <div className="warning-box mb-4">
          <p className="text-[#ef4444] font-bold">TI-84 has NO invχ²! Use this table.</p>
          <p className="text-gray-300 text-sm mt-1">Subscript = right-tail area (e.g., χ²₀.₀₅ = 5% in right tail)</p>
        </div>
        <div className="card overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="py-2 px-1 text-left">df</th>
                <th className="py-2 px-1 text-center">χ²₀.₁₀₀</th>
                <th className="py-2 px-1 text-center">χ²₀.₀₅₀</th>
                <th className="py-2 px-1 text-center">χ²₀.₀₂₅</th>
                <th className="py-2 px-1 text-center">χ²₀.₀₁₀</th>
                <th className="py-2 px-1 text-center">χ²₀.₀₀₅</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-mono">
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">1</td><td className="text-center">2.706</td><td className="text-center">3.841</td><td className="text-center">5.024</td><td className="text-center">6.635</td><td className="text-center">7.879</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">2</td><td className="text-center">4.605</td><td className="text-center">5.991</td><td className="text-center">7.378</td><td className="text-center">9.210</td><td className="text-center">10.597</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">3</td><td className="text-center">6.251</td><td className="text-center">7.815</td><td className="text-center">9.348</td><td className="text-center">11.345</td><td className="text-center">12.838</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">4</td><td className="text-center">7.779</td><td className="text-center">9.488</td><td className="text-center">11.143</td><td className="text-center">13.277</td><td className="text-center">14.860</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">5</td><td className="text-center">9.236</td><td className="text-center">11.070</td><td className="text-center">12.833</td><td className="text-center">15.086</td><td className="text-center">16.750</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">6</td><td className="text-center">10.645</td><td className="text-center">12.592</td><td className="text-center">14.449</td><td className="text-center">16.812</td><td className="text-center">18.548</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">7</td><td className="text-center">12.017</td><td className="text-center">14.067</td><td className="text-center">16.013</td><td className="text-center">18.475</td><td className="text-center">20.278</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">8</td><td className="text-center">13.362</td><td className="text-center">15.507</td><td className="text-center">17.535</td><td className="text-center">20.090</td><td className="text-center">21.955</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">9</td><td className="text-center">14.684</td><td className="text-center">16.919</td><td className="text-center">19.023</td><td className="text-center">21.666</td><td className="text-center">23.589</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">10</td><td className="text-center">15.987</td><td className="text-center">18.307</td><td className="text-center">20.483</td><td className="text-center">23.209</td><td className="text-center">25.188</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">11</td><td className="text-center">17.275</td><td className="text-center">19.675</td><td className="text-center">21.920</td><td className="text-center">24.725</td><td className="text-center">26.757</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">12</td><td className="text-center">18.549</td><td className="text-center">21.026</td><td className="text-center">23.337</td><td className="text-center">26.217</td><td className="text-center">28.300</td></tr>
              <tr className="border-b border-[#334155]"><td className="py-1 px-1">15</td><td className="text-center">22.307</td><td className="text-center">24.996</td><td className="text-center">27.488</td><td className="text-center">30.578</td><td className="text-center">32.801</td></tr>
              <tr><td className="py-1 px-1">20</td><td className="text-center">28.412</td><td className="text-center">31.410</td><td className="text-center">34.170</td><td className="text-center">37.566</td><td className="text-center">39.997</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ANOVA */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">ANOVA</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaCard
            title="F Statistic"
            formula="F = MSB / MSW"
            when="Testing equality of 3+ means"
            df="df₁ = k-1, df₂ = N-k"
            note="Always right-tailed"
          />
          <FormulaCard
            title="Mean Squares"
            formula="MSB = SSB/(k-1), MSW = SSW/(N-k)"
            when="Calculating components"
            note="k = groups, N = total n"
          />
        </div>
      </section>

      {/* Common Mistakes */}
      <section>
        <h2 className="text-2xl font-bold text-[#ef4444] mb-4">Common Mistakes</h2>
        <div className="warning-box">
          <ul className="space-y-2 text-gray-300">
            <li><strong>CLT:</strong> Forgetting to use σ/√n for sample means</li>
            <li><strong>Two-sample df:</strong> Using wrong formula (ALEKS uses min(n₁-1, n₂-1))</li>
            <li><strong>Proportion HT:</strong> Using p̂ instead of p₀ in denominator</li>
            <li><strong>Sample size:</strong> Forgetting to round UP</li>
            <li><strong>Percentile:</strong> 93rd percentile → z = +1.47 (positive!)</li>
            <li><strong>CI interpretation:</strong> Say &quot;confident&quot;, NOT &quot;probability&quot;</li>
            <li><strong>HT conclusion:</strong> Never say &quot;accept H₀&quot;</li>
          </ul>
        </div>
      </section>

      {/* TI-84 Commands */}
      <section>
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-4">TI-84 Quick Commands</h2>
        <div className="card">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold text-white mb-2">Normal Distribution</h3>
              <div className="space-y-1 text-gray-300 font-mono text-xs">
                <p>normalcdf(lower, upper, μ, σ)</p>
                <p>invNorm(area_left, μ, σ)</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">T Distribution</h3>
              <div className="space-y-1 text-gray-300 font-mono text-xs">
                <p>tcdf(lower, upper, df)</p>
                <p>invT(area_left, df)</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Chi-Square</h3>
              <div className="space-y-1 text-gray-300 font-mono text-xs">
                <p>χ²cdf(χ², 1E99, df)</p>
                <p className="text-[#ef4444]">No invχ² - use table!</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Infinity</h3>
              <div className="space-y-1 text-gray-300 font-mono text-xs">
                <p>1E99 = positive infinity</p>
                <p>-1E99 = negative infinity</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormulaCard({
  title,
  formula,
  when,
  df,
  note,
  warning,
}: {
  title: string;
  formula: string;
  when: string;
  df?: string;
  note?: string;
  warning?: string;
}) {
  return (
    <div className="card">
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <div className="formula-box text-center mb-3">
        {formula}
      </div>
      <p className="text-gray-400 text-sm mb-2">{when}</p>
      {df && (
        <p className="text-[#3B82F6] text-sm font-mono">{df}</p>
      )}
      {note && (
        <p className="text-gray-400 text-xs mt-1">{note}</p>
      )}
      {warning && (
        <p className="text-[#f59e0b] text-xs mt-2 font-bold">{warning}</p>
      )}
    </div>
  );
}
