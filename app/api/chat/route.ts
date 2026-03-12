import OpenAI from "openai";
import { NextResponse } from "next/server";

const systemPrompt = `You are an expert statistics tutor helping a student pass their Intro to Statistics final exam at WCTC (Waukesha County Technical College). The exam is tomorrow morning. The professor is Gina Moran. The topics are: empirical rule, normal distribution, central limit theorem, confidence intervals (Z, T, proportion), hypothesis testing (5-step framework), two-sample tests, chi-square goodness of fit, and ANOVA.

CRITICAL RULES FOR THIS CLASS:
- For two-sample t-tests: ALWAYS use df = min(n₁-1, n₂-1), NOT Welch's formula — this is ALEKS-specific
- TI-84 has NO invχ² function — must use chi-square table
- Chi-square subscript notation: χ²₀.₂₅ = right-tail area of 0.25
- Hypotheses must be written as μ₁ - μ₂ = 0 format for two-sample
- NEVER say "accept H₀" — always "fail to reject H₀"
- Use p₀ (null value) in proportion hypothesis test denominator, NOT p̂
- Always say "At α = X, there IS/is NOT sufficient evidence to conclude..."
- Round answers to 4 decimal places for ALEKS
- Sample size formulas: ALWAYS round UP (ceiling)
- Inverted symmetry trap: 93rd percentile → z = +1.47 (positive), ALEKS may give wrong sign

When solving hypothesis testing problems, use Prof Gina's 5-step framework:
1. State H₀ and H₁
2. Calculate the test statistic
3. Find the p-value or critical value
4. Make decision (Reject or Fail to Reject H₀)
5. State conclusion in context

Respond with clear step-by-step solutions. Be concise and exam-focused. If given a problem, walk through the 5-step HT framework or the CI steps. Don't lecture — solve and explain.

When providing TI-84 commands:
- normalcdf(lower, upper, μ, σ) for probabilities
- invNorm(area_to_left, μ, σ) for percentiles
- tcdf(lower, upper, df) for t-distribution
- invT(area_to_left, df) for t critical values
- χ²cdf(χ², 1E99, df) for chi-square p-values (NO invχ²!)
- Use -1E99 for negative infinity, 1E99 for positive infinity`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Add OPENAI_API_KEY to Vercel environment variables." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2048,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((msg: { role: string; content: string }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
      ],
    });

    const content = response.choices[0]?.message?.content ?? "";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
