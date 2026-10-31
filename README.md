# AGES Marathon 2026 — single page site

React + Vite + Tailwind CSS v4. No backend, no database, no paid service.
Registration is handled by your existing **Google Form**, which is embedded in the
page and also linked as a button.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## 2. Where to edit things

Almost everything you will want to change lives in **one file**:

`src/data/event.js`

| What | Key |
| --- | --- |
| Event name, date, time, city, venue | `event` |
| Google Form link | `event.formUrl` |
| Contact email / phone / Facebook | `event.email`, `event.phone`, `event.facebook` |
| Race categories & perks | `categories` |
| Entry fee + bKash details | `payment` |
| Stat boxes (runners, prize pool…) | `stats` |
| Race-day timeline | `schedule` |
| FAQ questions | `faqs` |

The countdown reads `event.dateISO`, so changing that one line updates the timer.

Images live in `public/images/` — replace `run.jpg` (hero), `venue.jpg`,
`banner.jpg` (organising committee) and `logo.jpg` with your own files of the
same name and nothing else needs to change.

---

## 3. Google Form settings (all free)

The registration form is embedded in the Register section and also linked as a
button. Open the form → **Settings** (gear icon) and set these up:

**a) The participant sees that registration is complete**
- *Responses → **Send responders a copy of their response*** → **Always**.
  Every participant instantly gets an email listing everything they filled in.
  That email is their proof of registration.
- *Presentation → Confirmation message* → write something like:
  > Thank you! Your registration for AGES Marathon 2026 is received.
  > Our team will verify your bKash payment and contact you before race day.

  This is the screen shown right after they press Submit.

**b) The organisers get every entry by email**
- Responses tab → three-dot menu → **Get email notifications for new responses**.
  Each organiser turns this on from their own Google account (add them as a
  collaborator on the form first).
- Click the green **Sheets** icon to send every response into a Google Sheet.
  That becomes your participant list, exportable to Excel.

**c) About the Google sign-in**

The form has a **Picture** upload question, and Google requires every responder
to be signed in to a Google account for file uploads. There is no way around it
while that question exists. Two options:

- Keep it — note on the site that a free Gmail account is needed (already
  written into the Register section and the FAQ), or
- Delete the Picture question, and then set
  *Responses → Collect email addresses* → **Responder input** so that anyone can
  register without logging in at all.

Nothing here costs money and there is no submission limit.

## 4. Deploy to Vercel (free)

1. Put this folder on GitHub:
   ```bash
   git init
   git add .
   git commit -m "AGES Marathon site"
   git branch -M main
   git remote add origin https://github.com/<you>/ages-marathon.git
   git push -u origin main
   ```
2. Go to vercel.com → **Add New → Project** → import the repo.
3. Vercel auto-detects Vite. Framework preset: **Vite**, build command `npm run build`,
   output directory `dist`. Just press **Deploy**.
4. You get a free `*.vercel.app` URL. A custom domain can be added later
   (the domain itself is the only thing that costs money).

Nothing in this project needs environment variables or a server.

---

## 5. Project structure

```
src/
  data/event.js        ← all editable content
  lib/useReveal.js     ← scroll-in animation hook
  components/
    Navbar.jsx  Hero.jsx  Countdown.jsx  About.jsx  Categories.jsx
    Schedule.jsx  Venue.jsx  Register.jsx (Google Form + payment)
    Organizers.jsx  Faq.jsx  Footer.jsx  Section.jsx
public/images/         ← hero, venue, banner, logo
```
