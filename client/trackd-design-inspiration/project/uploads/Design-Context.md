
For Context Only (as per in building the landing page and your understanding)
DO NOT ATTEMPT TO BUILD ALL OF THIS AT A GO BUT LEAST LAYOUT WHAT CAN BE BUILT UPON
ASK USER QUESTION WHERE NECESSARY & REVIEW YOUR THOUGHTS AS A PRO SENIOR DESIGNER WOULD TO HIS JUNIOR BEFORE PRODUCING AN OUTPUT


For Pallete idea
Atmosphere palette, from the attached Bluu.jpg (Shades of Blue) sheet — each hue used for the
psychological role it names, interpolated in OKLCH (not raw hex/RGB) wherever it's a gradient,
so the dark-to-glow transition stays clean instead of muddy:
  --bg-ground       #000871   Navy    — deepest point of the background, strength/authority
  --bg-mid          #241571   Midnight — sidebar base surface, modal backdrops
  --brand-primary   #2438BD   Persian — primary buttons, active nav accent
  --brand-secondary #0F52BA   Sapphire — secondary buttons, focus borders
  --glow-mid        #007FFF   Azure   — mid-gradient stop, hover states
  --glow-top        #52E8FF   Electric — top-of-screen glow, focus rings, icon-chip highlight
  --accent-info     #007BA7   Cerulean — info banners, AI-insight highlights
  --accent-energy   #0AFFFF   Aqua    — "new"/"AI-suggested" badges only, never status
  --text-tint-1     #70B8FF   Argentina — secondary text on dark surfaces
  --text-tint-2     #99CCFF   Sky     — muted labels, placeholders
  --border-glass    rgba(173,255,255,0.10–0.16)




TRACKD is a two-sided job-market platform. On one side, candidates capture, track, and optimize job applications through an AI-assisted pipeline. On the other, recruiters get a noise-free, pre-vetted view of candidates without needing to rip out their existing ATS. Both sides ship together in v1 — this is not a phased candidate-only launch. The two sides share one data spine: a job/application record, structured on ingestion, that both a candidate and a recruiter can act on.

The candidate side is the acquisition engine — free, immediately useful, easy to fall in love with. The recruiter side is the monetization and defensibility engine — it's what turns a personal tracker into a platform with network effects. Building both from day one means the data model, the AI insight layer, and the "Simulated Integration" mechanic (below) are load-bearing from the first release, not bolted on later.

Candidates use it to eliminate the manual overhead of a job search — capturing opportunities with zero typing, tracking them in a real pipeline, and generating tailored application materials in minutes rather than hours. Recruiters use the same underlying data to triage applicants without drowning in generic, AI-inflated resumes. Both sides read and write the same structured record for a given opportunity — there is one data spine, not two disconnected products wearing the same logo.

TRACKD is the command centre that fixes the operational problem. It captures every job
opportunity from a URL or a paste, structures that raw text into clean data, and puts it into a live
pipeline you can see, sort, and act on. An AI layer sits on top: it scores your resume against each
role, flags what is missing, rewrites your bullet points for the specific job, and drafts a cover letter in
under thirty seconds. The analytics page tells you how your search is actually going — not how you
feel it is going.


# TRACKD User Features

CANDIDATE
Basic Features
--
Smart Ingestion Pipeline: Multiple frictionless methods to add jobs, including a browser extension crawler for active job pages, a "Smart Paste" console for raw text/links, and URL stream ingestion.

Interactive Kanban Dashboard: A visual taskboard to manage applications through lifecycle stages (e.g., Saved, Applied, Interviewing, Rejected).

Pipeline Tracking: Toggleable interface states between Kanban, Table, and Calendar views to track deadlines and response milestones.

Pro Features
---
AI Optimization Nexus: An advanced, split-screen workspace offering AI-driven resume parsing and editing directly on a canvas.

Explore Deck: Access to a unified marketplace board aggregating active job listings scraped from multiple platforms.

Tailored Application Building: AI-assisted generation of tailored cover letters and resume edits based on a match-score analysis against specific job descriptions.

Compatibility Scoring: Color-interpolating circular meter providing real-time feedback on how well a candidate's profile matches a specific job role.

ATS Optimization Tools: Checklist highlighting missing keywords and interactive text-replacement chips to improve resume compatibility with Applicant Tracking Systems.



RECRUITER
Basic Features
---
Recruiter Hub Mode: A switchable workspace layout that transforms the interface into an enterprise hiring desk framework.

Applicant Tracking Grids: View incoming applications from candidates in an organized, searchable format.

Candidate Search & Filtering: Specialized tools to filter and manage incoming applicants.

Pro Features
---
Job Posting & Update Management: Ability to upload job opportunities directly and manage them within the ecosystem. Tracking stuffs on other job boards and posting actual opportunities for tracking and applicant management.

Automated Applicant Status Updates: Action buttons that trigger mock status promotions, simulating ATS webhook updates while sending real-time transactional tracking emails directly back to the candidate's dashboard.

Applicant Nexus Sync: Two-way integration where recruiter updates on job postings directly inform and update the status of candidates applying via Trackd. A quick proctor interview can even be scheduled in the pro version.


## 3. End-to-End Flows

### 3.1 Candidate flow

| Step | Action | System response |
|---|---|---|
| 1 | Signs up / logs in (email or Google, via Supabase Auth) | Session created; first-time users route to onboarding |
| 2 | Onboarding: uploads resume, sets target roles and experience level | Claude extracts a structured UserProfile; user reviews and confirms before it's saved |
| 3 | Pastes a job URL or description into Ingestion | Backend cleans input, sends to Claude with a strict JSON schema (Gemini Flash as automatic fallback) |
| 4 | Reviews the side panel of parsed fields, each with a confidence indicator | Fields are editable; user corrects anything wrong |
| 5 | Clicks Commit | Record written to Supabase; Dashboard refreshes |
| 6 | Works the pipeline in Kanban / Calendar / Table | All three views read the same data; a status change in one reflects instantly in the others |
| 7 | Opens a job's Pro page | Resume canvas, AI insights, and cover letter tool load for that specific job |
| 8 | Accepts or dismisses AI resume suggestions, generates a cover letter, downloads both as PDF | Canvas updates live; PDFs render server-side for consistency across browsers |
| 9 | Checks Analytics | KPI cards and charts reflect live pipeline data |

### 3.2 Recruiter flow

| Step | Action | System response |
|---|---|---|
| 1 | Signs up as a recruiter/company account; creates a Company workspace | Company record created; recruiter becomes its first admin |
| 2 | Posts a role (manual entry or link to an external posting) | Role appears in that Company's job list; candidates applying through TRACKD are tied to it |
| 3 | Opens Applications grid for that role | Sees all TRACKD-side applicants, each with an AI match score and verified-badge status |
| 4 | Filters/searches candidates | Grid narrows by score, skills, seniority, source |
| 5 | Opens a candidate's Storyline in the Recruiter Hub | Sees skills, experience arc, and fit summary — not a flat resume dump |
| 6 | Clicks a Simulated Integration action ("Move to Interview," "Reject," "Shortlist") | Candidate's own Kanban status updates instantly; candidate receives a transactional email |

---

FUNCTIONALITY 
CANDIDATES
Paste a job description and have all fields auto-populated
Side panel opens within 8s of clicking Parse, all extractable fields populated
US-C02 Correct AI-extracted fields before committing
Every field is editable; changes persist to Supabase on commit
Drag a job card to update its status Status updates and history logs within 2s; all views reflect it
See a match score for each job (Pro) Match score, missing skills, ATS risk shown within 8s of Pro page load
Accept an AI resume suggestion Editor and canvas update within 200ms
Download a tailored resume PDF Correctly formatted PDF downloads within 5s
Generate a cover letter with a chosen tone Relevant letter appears in the output area within 8s
See charts of my application activity Given 5+ applications, all 5 charts and 4 KPI cards show correct values

RECRUITERS
Post a role and see it live in my Company workspace
Role appears in the role list immediately after extraction confirms
View all applicants to a role in one grid Grid loads within 3s for up to 200 applicants; sortable and filterable
See why a candidate fits without reading a full resume
Storyline and fit scorecard render within 5s of opening a candidate
Move a candidate to Interview with one click Candidate’s status updates within 2s; email sent within 1 minute
Search candidates by skill across all applicants
Results filter live while typing, no full page reload




