# [deal.siv.org](https://deal.siv.org)

A new kind of negotiation:

#### Strategyproof. Private. Fair. Chill.

Works for job offers, acquisitions, favors, and more.

### Key Properties:

- Dominant-strategy truthfulness
- No trusted third party
- Promote fairness & mutual surplus
- Minimize information leakage & post-negotiation regret

---

### Details

<details>
<summary><strong>🔑 Core Protocol</strong> — cutoffs, single run, overlap check, random fair price</summary>

&nbsp;  
Each party commits to:

- **A true cutoff**: Max Bid for the buyer, Min Ask for the seller
- Running the protocol **only once**, to prevent probing/gaming

The protocol does:

1. **Securely checks** whether buyer’s Bid ≥ seller’s Ask — without revealing either
2. If there’s **no overlap** (Max Bid < Min Ask), outputs: `❌ no overlap, sorry`
3. If there **is overlap** (Max Bid ≥ Min Ask), outputs: `✅ fair price` computed as:

```
fair_price = randomIntegerBetween(seller_min_ask, buyer_max_bid)
```

&nbsp;  
</details>

<details>
<summary>&nbsp;<strong>Why the Uniform Random Price</strong></summary>

&nbsp;  
On average, both sides gain. In any round, neither side can exploit the other.  

- **Privacy-preserving:** Reveals less about the individual inputs than midpoint
- **Truth-inducing:** There’s no advantage to lying
- **Surplus-sharing:** On average, splits the surplus evenly, but with variance
- **Prevents anchoring:** Neither party controls the framing
- **Repeatable fairness:** Over time, expected outcomes balance out

&nbsp;  
</details>

<details>
<summary>&nbsp;<strong>Economic Implications</strong></summary>

&nbsp;  
If adopted:

- Massive drop in **negotiation friction costs**
- Faster resolution of deals, from personal favors to billion-dollar M&A
- Strategically, **defangs aggressive negotiation tactics**, encouraging better long-term relationships

&nbsp;  
</details>

<details>
<summary>&nbsp;<strong>“One-Shot” Commitment</strong> — why honesty wins; when it breaks down</summary>

&nbsp;  
The “one-shot” rule isn’t just a formality—it’s what makes honesty the winning move.

If parties **only get one shot**, then:

- **Low-balling** risks missing a deal that would have cleared
- **Overreporting** (e.g., seller feigns less than they'd really accept) risks accepting a worse price than you’d be happy with

The **dominant strategy becomes truth-telling** — _if the surplus is shared fairly and you’re guaranteed no second chances_.

#### ✅&nbsp; If the one-shot commitment holds:

- **Truthful bidding is the dominant strategy**.
- **Bluffing** (e.g. underbidding) **risks losing a surplus-positive deal**.
- Overbidding (e.g. seller claims lower Min Ask than real) **risks accepting a bad deal**.
- Since no retries are allowed, you’re incentivized to **be honest** to avoid missing out or being exploited.

This is what makes it **strategyproof**.

#### ❌&nbsp; If the one-shot commitment does not hold:

- Parties can **probe**, e.g. by low-balling first to see if it clears.
- If it doesn’t, they try again with a higher/lower value.
- This reintroduces **brinkmanship, gaming, and delay**.
- We’re back to standard adversarial negotiation dynamics — what we’re trying to rise out of.

So: **one-shot-ness is critical** to preserving honesty incentives.

&nbsp;  

<details>
<summary>&nbsp;&nbsp;&nbsp;<strong>↳ Enforcing One-Shot Agreements</strong> — social vs legal</summary>

### Type 1 - Verbal/Social One-Shot Agreement

- **Defends against**: multi-round bluffing, overhead of adversarial games
- **Enforcement**: purely psychological / social
- **Upside**: simple, low-cost, ideal for trustful contexts
- **Downside**: requires mutual discipline; if one party breaks the agreement, there’s no consequence unless the other retaliates (reputation, future dealings, etc.)
- **Best fit**: friends, collaborators, small teams, those playing repeated games

This approach works best when both parties value honesty, speed, clarity, and long-term mutual gain over short-term extraction.

#### Example One-Shot Negotiation Agreement:

> We each have a **private cut-off point** — our true minimum (seller) or maximum (buyer) for doing this deal.
>
> We agree to run this protocol _**once**_, honestly inputting our true values.
>
> If there’s **no overlap**, we both walk away with no hard feelings.  
> If there **is an overlap**, the protocol will pick a fair price in that range, and we commit to accepting the outcome.
>
> No retries, no second rounds, no re-opening the negotiation afterward.

---

### Type 2 - For high-stakes deals, Legal One-Shot Contract

Violating it could void enforceability of the result, or trigger penalty clauses.

- **Defends against**: strategic probing in corporate deals, “walk then re-offer” behavior
- **Enforcement**: contract law
- **Upside**: externalized enforcement; clearly legible consequence (e.g. invalidating deal or triggering penalties)
- **Downside**: overhead, lawyer involvement, harder to use in fast-paced or informal settings
- **Best fit**: Large investment deals, acquisitions, licensing negotiations, real estate

</details>

&nbsp;  
</details>

<details>
<summary>&nbsp;<strong>Summary of Strategyproof Conditions</strong></summary>

&nbsp;  
These are the conditions under which **truth-telling becomes the optimal strategy**:

1. ✅ **Single-shot protocol** — no retries
2. 🎲 **Randomized fair price** — private and prevents anchoring
3. 🤝 **Surplus-sharing** — ensures mutual gain
4. 🚫 **No incentive to lie** — misreporting carries risk

&nbsp;  
</details>

&nbsp;

---

<h3 align="center">A new norm: quick, truth-aligned, built for infinite games.</h3>

&nbsp;

&nbsp;

&nbsp;

# Development

This is a [Next.js](https://nextjs.org/) project.

## Getting Started

### First time

1. Fork repo
2. Clone it down with `git clone`
3. Install dependencies with `npm install` or equivalent.

### Then to start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 🎉
