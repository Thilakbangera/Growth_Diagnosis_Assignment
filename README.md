
````markdown
# 🚀 Growth Diagnosis Dashboard

An AI-powered diagnostic tool to identify and address growth bottlenecks across **founder mindset, systemic processes, and market strategy**.  
Built with **React, Vite, Tailwind CSS, and Framer Motion**, and deployed on **Netlify**.

---

##  Live Demo

Check out the live version here:  
[Growth Diagnosis Dashboard](https://eloquent-hotteok-73fe62.netlify.app/)

---

##  Features

### Part 1: Bottleneck Diagnosis
- Structured AI dialogue prompts to uncover bottlenecks across three critical layers:
  - **Mindset** – Founder’s mental model
  - **Systemic** – Talent/process capability
  - **Strategic** – Pricing and market clarity
- Each prompt includes a tailored positive AI prompt and a "negative prompt" to avoid unwanted suggestions.
- Uses Cialdini Principles (Consistency, Authority, Social Proof) to frame insights.

### Part 2: Growth Readiness Scorecard
- Mini-assessment highlighting bottlenecks and corresponding experimental solutions.
- AI prompts simulate outcomes (e.g., delegation frameworks, CRM workflows, pricing tier experiments).
- Bottlenecks are mapped to **Growth OS stages** for clarity.

### Part 3: Strategic Summary
- Synthesizes insights into actionable learnings:
  - Distinguish symptoms from root causes.
  - Growth consulting spans mindset, process, and strategic clarity.
  - Roles: **Coach**, **Analyst**, **Operator** — with AI as co-pilot.

---

##  Tech Stack

- **Frontend**: React + Vite  
- **Styling**: Tailwind CSS  
- **Animations**: Framer Motion  
- **Hosting**: Netlify  

---

##  Setup & Deployment

### Development Setup
```bash
git clone https://github.com/your-username/growth-diagnosis-dashboard.git
cd growth-diagnosis-dashboard
npm install
npm run dev
````

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

This generates a `dist/` folder ready for deployment.

### Deploy to Netlify

* **Netlify Drop**: Drag and drop your `dist/` folder at [Netlify Drop](https://app.netlify.com/drop).
* **Via Netlify App**:

  * Connect your Git repository.
  * Set build command: `npm run build`
  * Set publish directory: `dist`
* **Via Netlify CLI**:

  ```bash
  npm install -g netlify-cli
  netlify deploy --prod --dir=dist
  ```
