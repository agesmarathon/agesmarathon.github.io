// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING ABOUT THE EVENT HERE.
//  You never need to touch the components to change text/dates.
// ─────────────────────────────────────────────────────────────

export const event = {
  name: 'AGES Marathon',
  year: '2026',
  tagline: 'Run for Health  ·  Run for Unity  ·  Run for AGES',
  motto: 'Stronger Together',
  // Date/time of the flag-off, in the browser's local time.
  dateISO: '2026-12-16T05:30:00',
  dateLabel: '16 December 2026',
  timeLabel: 'Flag-off 5:30 AM',
  city: 'Chattogram, Bangladesh',
  venue: 'Garib-E-Newaz High School',
  venueAddress: 'Halishahar Housing Estate, Chattogram, Bangladesh',
  mapsUrl: 'https://maps.google.com/?q=Garib-E-Newaz+High+School+Halishahar+Housing+Estate+Chattogram',
  organizer: 'Team SAF',
  organizerFor: 'Association of GNHS Ex-Students (AGES)',
  organizerForLong:
    'the official alumni organization of Garib-E-Newaz High School, Halishahar Housing Estate, Chattogram',
  email: 'ages.teamsaf@gmail.com',
  phone: '+880 1711-160396',
  facebook: 'https://facebook.com/',
  registrationCloses: '10 December 2026',
  founded: '30 September 2023',

  // Google Form used for registration. Paste the "viewform" link here;
  // the site builds the embed version from it automatically.
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeVARt22RCEAmKQqvSffZCrHjq3Pupa3w-s8iIp70sIWpERvA/viewform',
}

// Registration fee and how it is paid — matches the Google Form.
export const payment = {
  fee: '৳ 699',
  method: 'bKash',
  merchantLabel: 'bKash Merchant No.',
  merchantNumber: '+880-1820344139',
  note: 'Send the fee first, then write the last 4 digits of your bKash transaction ID in the form.',
}

export const categories = [
  {
    id: 'men',
    name: "Men's Run",
    distance: '7.5 KM',
    who: 'Male participants',
    fee: payment.fee,
    age: 'No age limit',
    perks: ['Finisher medal', 'Official jersey', 'Race BIB', 'Refreshments'],
  },
  {
    id: 'women',
    name: "Women's Run",
    distance: '5 KM',
    who: 'Female participants',
    fee: payment.fee,
    age: 'No age limit',
    perks: ['Finisher medal', 'Official jersey', 'Race BIB', 'Refreshments'],
  },
]

export const stats = [
  { value: '2', label: 'Race categories' },
  { value: '৳ 699', label: 'Entry fee' },
  { value: '5:30 AM', label: 'Flag-off' },
  { value: 'Sep 2023', label: 'AGES founded' },
]

export const schedule = [
  { time: '04:45 AM', title: 'Reporting & BIB collection', note: 'Gates open at the school ground' },
  { time: '05:15 AM', title: 'Warm-up session', note: 'Group stretching before the start' },
  { time: '05:30 AM', title: "Men's 7.5 KM flag-off", note: 'Chief guest flags off the main race' },
  { time: '05:40 AM', title: "Women's 5 KM flag-off", note: 'Second start from the same line' },
  { time: '07:30 AM', title: 'Medals & breakfast', note: 'Finisher medals and alumni adda' },
]

export const faqs = [
  {
    q: 'How do I register?',
    a: 'Fill in the registration form on this page and press Submit. Google shows a confirmation screen straight away and emails you a copy of your answers — that email is your proof of registration.',
  },
  {
    q: 'Why does the form ask me to sign in to Google?',
    a: 'The form asks you to upload your photo, and Google requires a signed-in account for file uploads. Any free Gmail account works. If you do not have one, call the hotline and the organisers will register you manually.',
  },
  {
    q: 'What is the registration fee and how do I pay it?',
    a: 'The fee is ৳699 for every participant. Send it to the bKash Merchant number +880-1820344139, then write the last 4 digits of your bKash transaction ID in the form before submitting.',
  },
  {
    q: 'Which distance will I run?',
    a: 'It follows the gender you select in the form — male participants run 7.5 KM and female participants run 5 KM. There is no separate category to choose.',
  },
  {
    q: 'Is there an age limit?',
    a: 'No. The run is open to every age — school juniors, alumni of every batch, teachers and family members are all welcome.',
  },
  {
    q: 'What do I get on race day?',
    a: 'An official jersey in the size you picked, a race BIB with safety pins, a finisher medal and refreshments. Note that certificates are not issued for this event.',
  },
  {
    q: 'Is the route safe and marshalled?',
    a: 'Yes. The full route is marshalled by volunteers, with water points along the way, an ambulance on standby and a medical team at the finish line.',
  },
]
