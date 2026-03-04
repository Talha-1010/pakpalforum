import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation, Trans } from 'next-i18next'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'common'])),
    },
  }
}

const ROTATING_WORD_COUNT = 5
const OBJECTIVE_COUNT = 5
const FAQ_COUNT = 5
const TEAM_COUNT = 3
const JOIN_WAY_COUNT = 5
const PRESENCE_CITY_COUNT = 5

const PRESENCE_CITIES = [
  {
    accentColor: '#4E7258',
    landmark: 'Faisal Mosque',
    instagram: 'https://www.instagram.com/pakpalforumisb',
    facebook: 'https://www.facebook.com/pakpalforumisb',
  },
  {
    accentColor: '#9C6B22',
    landmark: 'Badshahi Mosque',
    instagram: 'https://www.instagram.com/pakpalforumlhr',
    facebook: 'https://www.facebook.com/pakpalforumlhr',
  },
  {
    accentColor: '#1B5E8A',
    landmark: 'Mazar-e-Quaid',
    instagram: 'https://www.instagram.com/pakpalforumkhi',
    facebook: 'https://www.facebook.com/pakpalforumkhi',
  },
  {
    accentColor: '#8B4513',
    landmark: 'Ghanta Ghar',
    instagram: 'https://www.instagram.com/pakpalforumfsd',
    facebook: 'https://www.facebook.com/pakpalforumfsd',
  },
  {
    accentColor: '#7B2D8B',
    landmark: 'Shrine of Rukn-e-Alam',
    instagram: 'https://www.instagram.com/pakpalforummultan',
    facebook: 'https://www.facebook.com/pakpalforummultan',
  },
]

const teamImages = [
  '/static/images/wahaj_ahmad_lead_pakpalforum.jpg',
  '/static/images/senator_mushtaq_patron_pakpalforum.jpg',
  '/static/images/humaira_tayyaba_central_team_member_of_pakpalforum.jpg',
]

const teamSocials = [
  // Wahaj Ahmad
  [
    { platform: 'twitter', url: 'https://x.com/wahaj_ahmadd', label: '@wahaj_ahmadd' },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/wahaj_ahmadd',
      label: '@wahaj_ahmadd',
    },
  ],
  // Senator Mushtaq Ahmad Khan
  [
    { platform: 'twitter', url: 'https://x.com/SenatorMushtaq', label: '@SenatorMushtaq' },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/SenatorMushtaq',
      label: 'SenatorMushtaq',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/senatormushtaq',
      label: '@senatormushtaq',
    },
    { platform: 'threads', url: 'https://threads.net/@senatormushtaq', label: '@senatormushtaq' },
  ],
  // Humaira Tayyaba
  [
    { platform: 'twitter', url: 'https://x.com/humairatayyaba', label: '@humairatayyaba' },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/humaira.tayyaba',
      label: 'humaira.tayyaba',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/humairatayyaba',
      label: '@humairatayyaba',
    },
    { platform: 'threads', url: 'https://threads.net/@humairatayyaba', label: '@humairatayyaba' },
  ],
]

// Inline SVG icons for each social platform
function SocialIcon({ platform }) {
  const cls = 'h-4 w-4 fill-current'
  if (platform === 'twitter')
    return (
      <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  if (platform === 'instagram')
    return (
      <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  if (platform === 'facebook')
    return (
      <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  if (platform === 'threads')
    return (
      <svg className={cls} viewBox="0 0 192 192" aria-hidden="true">
        <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.368c-14.534 0-26.316 5.971-33.683 16.867l13.765 9.101c5.541-7.838 14.145-9.512 20.511-9.512h.253c7.783.05 13.669 2.309 17.497 6.716 2.794 3.225 4.657 7.483 5.573 12.707-6.95-1.178-14.435-1.536-22.37-.958-22.135 1.467-36.384 15.43-35.432 34.994.484 9.946 5.544 18.514 14.22 24.128 7.331 4.789 16.773 7.139 26.589 6.599 12.951-.718 23.107-5.532 30.171-14.311 5.529-6.876 9.022-15.787 10.506-26.95 6.302 3.508 10.902 8.971 13.126 15.929 3.26 10.269 3.454 27.055-10.12 40.58-11.799 11.755-26.002 16.835-47.362 16.985-23.714-.172-41.638-8.65-53.053-24.811C33.518 140.012 29.177 120.51 29.034 96c.143-24.51 4.484-44.012 12.892-57.981C53.928 22.65 71.828 14.172 96 14c24.293.172 42.433 8.69 53.944 25.319 5.694 8.218 9.946 18.512 12.396 29.817l13.256-3.558c-2.91-13.544-8.01-25.98-15.101-36.302C146.316 10.283 124.535.187 96.23 0h-.46C67.755.187 46.219 10.317 32.348 30.059 20.061 47.562 13.797 71.589 13.61 96c.187 24.411 6.451 48.438 18.738 65.941 13.87 19.742 35.407 29.872 64.02 30.059h.46c25.562-.168 43.714-7.049 58.638-21.753 19.399-19.282 18.774-43.486 12.396-58.321-4.546-10.507-13.523-19.066-25.325-23.938Zm-44.112 43.51c-9.699.571-19.763-2.279-26.03-7.189-4.683-3.646-7.084-8.518-6.847-13.715.403-8.763 8.316-16.695 22.97-17.628 2.013-.133 3.992-.2 5.935-.2 6.581 0 12.718.657 18.194 1.94-.848 20.487-5.751 35.496-14.222 36.792Z" />
      </svg>
    )
  return null
}

function CityLandmarkIcon({ index }) {
  const cls = 'h-14 w-14'
  const icons = [
    // 0: Islamabad – Faisal Mosque (tent shape + 4 minarets)
    <svg key="isb" viewBox="0 0 48 48" className={cls} fill="currentColor" aria-hidden="true">
      {/* Outer minarets */}
      <rect x="3" y="10" width="4" height="34" />
      <polygon points="5,6 3,10 7,10" />
      <rect x="41" y="10" width="4" height="34" />
      <polygon points="43,6 41,10 45,10" />
      {/* Inner minarets */}
      <rect x="10" y="16" width="3" height="28" />
      <polygon points="11.5,13 10,16 13,16" />
      <rect x="35" y="16" width="3" height="28" />
      <polygon points="36.5,13 35,16 38,16" />
      {/* Tent / triangular main prayer hall */}
      <polygon points="24,8 11,38 37,38" />
      {/* Base platform steps */}
      <rect x="8" y="38" width="32" height="4" />
      <rect x="5" y="42" width="38" height="4" />
    </svg>,
    // 1: Lahore – Badshahi Mosque (dome + 4 tall minarets)
    <svg key="lhr" viewBox="0 0 48 48" className={cls} fill="currentColor" aria-hidden="true">
      {/* Outer corner minarets */}
      <rect x="1" y="10" width="5" height="36" />
      <polygon points="3.5,6 1,10 6,10" />
      <rect x="42" y="10" width="5" height="36" />
      <polygon points="44.5,6 42,10 47,10" />
      {/* Inner minarets */}
      <rect x="10" y="16" width="4" height="30" />
      <polygon points="12,13 10,16 14,16" />
      <rect x="34" y="16" width="4" height="30" />
      <polygon points="36,13 34,16 38,16" />
      {/* Central dome */}
      <path d="M17,28 Q17,14 24,14 Q31,14 31,28 Z" />
      <rect x="14" y="26" width="20" height="4" />
      {/* Prayer hall body */}
      <rect x="12" y="30" width="24" height="16" />
      {/* Mughal arch entrance */}
      <path d="M20,46 L20,36 Q24,30 28,36 L28,46" fill="white" fillOpacity="0.2" />
      <rect x="5" y="46" width="38" height="2" />
    </svg>,
    // 2: Karachi – Mazar-e-Quaid (large dome + marble octagonal body)
    <svg key="khi" viewBox="0 0 48 48" className={cls} fill="currentColor" aria-hidden="true">
      {/* Finial spire */}
      <line x1="24" y1="2" x2="24" y2="8" stroke="currentColor" strokeWidth="2" />
      {/* Main dome */}
      <path d="M10,26 Q10,8 24,8 Q38,8 38,26 Z" />
      <rect x="8" y="24" width="32" height="4" />
      {/* Marble base body */}
      <rect x="7" y="28" width="34" height="16" />
      {/* Three arched openings */}
      <path d="M10,44 L10,35 Q14.5,29 19,35 L19,44" fill="white" fillOpacity="0.18" />
      <path d="M21.5,44 L21.5,36 Q24,32 26.5,36 L26.5,44" fill="white" fillOpacity="0.18" />
      <path d="M29,44 L29,35 Q33.5,29 38,35 L38,44" fill="white" fillOpacity="0.18" />
      {/* Base steps */}
      <rect x="4" y="44" width="40" height="2" />
      <rect x="1" y="46" width="46" height="2" />
    </svg>,
    // 3: Faisalabad – Ghanta Ghar (Victorian octagonal clock tower)
    <svg key="fsd" viewBox="0 0 48 48" className={cls} fill="currentColor" aria-hidden="true">
      {/* Spire */}
      <polygon points="24,1 22,8 26,8" />
      {/* Battlement band */}
      <rect x="19" y="8" width="10" height="5" />
      {/* Upper narrow section */}
      <rect x="21" y="13" width="6" height="6" />
      {/* Clock face band */}
      <rect x="16" y="19" width="16" height="10" />
      {/* Clock circle */}
      <circle cx="24" cy="24" r="4" fill="white" fillOpacity="0.3" />
      {/* Main tower body */}
      <rect x="17" y="29" width="14" height="13" />
      {/* Arch entrance */}
      <path d="M19,42 L19,36 Q24,31 29,36 L29,42" fill="white" fillOpacity="0.2" />
      {/* Base steps */}
      <rect x="13" y="42" width="22" height="4" />
      <rect x="10" y="46" width="28" height="2" />
    </svg>,
    // 4: Multan – Shrine of Rukn-e-Alam (circular tapered tower with dome)
    <svg key="mtn" viewBox="0 0 48 48" className={cls} fill="currentColor" aria-hidden="true">
      {/* Top dome */}
      <path d="M19,16 Q19,8 24,8 Q29,8 29,16 Z" />
      <rect x="21" y="14" width="6" height="4" />
      {/* Upper tapered tower body */}
      <polygon points="15,18 13,34 35,34 33,18" />
      {/* Decorative tile band (upper) */}
      <rect x="13" y="27" width="22" height="2" fill="white" fillOpacity="0.35" />
      {/* Lower wider base */}
      <polygon points="12,34 9,46 39,46 36,34" />
      {/* Decorative tile band (lower) */}
      <rect x="10" y="40" width="28" height="2" fill="white" fillOpacity="0.35" />
      <rect x="7" y="46" width="34" height="2" />
    </svg>,
  ]
  return icons[index] ?? null
}

function JoinRoleIcon({ index }) {
  const cls = 'h-10 w-10'
  const icons = [
    // 0: Volunteer – two raised open hands (🙌)
    <svg key="volunteer" viewBox="0 0 40 40" className={cls} fill="currentColor" aria-hidden="true">
      {/* Left hand: 3 fingers */}
      <rect x="2" y="5" width="4" height="14" rx="2" />
      <rect x="8" y="3" width="4" height="16" rx="2" />
      <rect x="14" y="5" width="4" height="14" rx="2" />
      {/* Left palm (rounded U shape) */}
      <path d="M1,18 Q1,32 10,32 Q19,32 19,18 Z" />
      {/* Right hand: 3 fingers */}
      <rect x="22" y="5" width="4" height="14" rx="2" />
      <rect x="28" y="3" width="4" height="16" rx="2" />
      <rect x="34" y="5" width="4" height="14" rx="2" />
      {/* Right palm */}
      <path d="M21,18 Q21,32 30,32 Q39,32 39,18 Z" />
    </svg>,
    // 1: Awareness – megaphone (📣)
    <svg key="awareness" viewBox="0 0 40 40" className={cls} fill="currentColor" aria-hidden="true">
      {/* Speaker box */}
      <rect x="2" y="14" width="10" height="12" rx="1" />
      {/* Horn/cone */}
      <polygon points="12,11 38,2 38,38 12,29" />
      {/* Handle below speaker */}
      <rect x="3" y="26" width="6" height="9" rx="2" />
    </svg>,
    // 2: Advocacy – raised fist (✊)
    <svg key="advocacy" viewBox="0 0 40 40" className={cls} fill="currentColor" aria-hidden="true">
      {/* Three curled finger segments */}
      <rect x="8" y="4" width="7" height="15" rx="3.5" />
      <rect x="17" y="2" width="7" height="17" rx="3.5" />
      <rect x="26" y="5" width="7" height="14" rx="3.5" />
      {/* Fist body */}
      <rect x="7" y="17" width="26" height="16" rx="3" />
      {/* Thumb on left */}
      <rect x="1" y="19" width="8" height="10" rx="4" />
      {/* Wrist */}
      <rect x="11" y="31" width="18" height="7" rx="2" />
    </svg>,
    // 3: Professional – briefcase (💼)
    <svg
      key="professional"
      viewBox="0 0 40 40"
      className={cls}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Case body */}
      <rect x="2" y="14" width="36" height="24" rx="2" />
      {/* Handle arc */}
      <path
        d="M13,14 L13,10 Q13,5 20,5 Q27,5 27,10 L27,14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Center horizontal divider */}
      <rect x="2" y="25" width="36" height="3" />
      {/* Clasp */}
      <rect x="17" y="21" width="6" height="7" rx="1" />
    </svg>,
    // 4: Partner – two interlocking circles (collaboration / 🤝)
    <svg key="partner" viewBox="0 0 40 40" className={cls} fill="currentColor" aria-hidden="true">
      <circle cx="13" cy="20" r="11" opacity="0.75" />
      <circle cx="27" cy="20" r="11" opacity="0.75" />
    </svg>,
  ]
  return icons[index] ?? null
}

const IMPACT_ITEMS = [
  { accentColor: '#FF7043' }, // 0: Campaigns
  { accentColor: '#66BB6A' }, // 1: Volunteers
  { accentColor: '#FFCA28' }, // 2: Awareness
  { accentColor: '#42A5F5' }, // 3: Global
  { accentColor: '#26C6DA' }, // 4: Humanitarian
  { accentColor: '#EF5350' }, // 5: Mobilization
  { accentColor: '#AB47BC' }, // 6: Media
]

function ImpactIcon({ index }) {
  const cls = 'h-11 w-11'
  const icons = [
    // 0: Solidarity Campaigns — waving flag on pole + crowd wave
    <svg key="campaigns" viewBox="0 0 40 40" className={cls} fill="currentColor" aria-hidden="true">
      {/* Flagpole */}
      <rect x="6" y="1" width="3" height="34" rx="1.5" />
      {/* Waving flag (filled triangle) */}
      <path d="M9,3 L34,9 L9,21 Z" />
      {/* Crowd wave arcs */}
      <path
        d="M1,35 Q6,29 11,35 Q16,29 21,35 Q26,29 31,35 Q36,29 40,35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>,

    // 1: Mobilized Volunteers — 3 connected people / network
    <svg
      key="volunteers"
      viewBox="0 0 40 40"
      className={cls}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Center person (tallest) */}
      <circle cx="20" cy="8" r="4" />
      <path d="M13,26 Q13,15 20,15 Q27,15 27,26 Z" />
      {/* Left person */}
      <circle cx="6" cy="14" r="3" />
      <path d="M1,28 Q1,22 6,22 Q11,22 11,28 Z" />
      {/* Right person */}
      <circle cx="34" cy="14" r="3" />
      <path d="M29,28 Q29,22 34,22 Q39,22 39,28 Z" />
      {/* Connection lines */}
      <line
        x1="16"
        y1="11"
        x2="9"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="11"
        x2="31"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ground baseline */}
      <rect x="0" y="30" width="40" height="2.5" rx="1.25" />
    </svg>,

    // 2: Awareness Movements — torch with flame
    <svg key="awareness" viewBox="0 0 40 40" className={cls} fill="currentColor" aria-hidden="true">
      {/* Handle */}
      <rect x="17" y="28" width="6" height="11" rx="3" />
      {/* Bowl (trapezoid, wider at bottom) */}
      <path d="M12,28 L14,20 L26,20 L28,28 Z" />
      {/* Flame teardrop */}
      <path d="M20,2 Q27,9 27,17 Q27,24 20,24 Q13,24 13,17 Q13,9 20,2 Z" />
      {/* Inner flame highlight */}
      <path d="M20,9 Q24,14 24,18 Q24,22 20,22 Q16,22 16,18 Q16,14 20,9 Z" fillOpacity="0.35" />
    </svg>,

    // 3: Global Solidarity Platforms — globe with meridians + latitudes
    <svg
      key="global"
      viewBox="0 0 40 40"
      className={cls}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* Globe outline */}
      <circle cx="20" cy="20" r="17" strokeWidth="2.5" />
      {/* Left meridian (S-curve) */}
      <path d="M20,3 Q12,20 20,37" strokeWidth="1.8" />
      {/* Right meridian */}
      <path d="M20,3 Q28,20 20,37" strokeWidth="1.8" />
      {/* Equator */}
      <line x1="3" y1="20" x2="37" y2="20" strokeWidth="1.5" />
      {/* Upper latitude */}
      <path d="M6,12 Q20,8 34,12" strokeWidth="1.4" />
      {/* Lower latitude */}
      <path d="M6,28 Q20,32 34,28" strokeWidth="1.4" />
    </svg>,

    // 4: Humanitarian Initiatives — boat with sail + water waves
    <svg
      key="humanitarian"
      viewBox="0 0 40 40"
      className={cls}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Mast */}
      <rect x="19" y="4" width="2" height="16" />
      {/* Sail (right-facing triangle) */}
      <path d="M21,6 L33,13 L21,20 Z" />
      {/* Hull */}
      <path d="M3,26 L6,20 L34,20 L37,26 Q20,34 3,26 Z" />
      {/* Water waves */}
      <path
        d="M1,32 Q5.5,28 10,32 Q14.5,28 19,32 Q23.5,28 28,32 Q32.5,28 37,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>,

    // 5: Mass Mobilization — row of 5 raised fists, wave silhouette
    <svg
      key="mobilization"
      viewBox="0 0 40 40"
      className={cls}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Fist 1 (outer-left, shortest) */}
      <rect x="0" y="21" width="7" height="9" rx="2" />
      <rect x="1" y="15" width="5" height="8" rx="2" />
      {/* Fist 2 */}
      <rect x="8" y="17" width="7" height="13" rx="2" />
      <rect x="9" y="10" width="5" height="9" rx="2" />
      {/* Fist 3 (center, tallest) */}
      <rect x="16" y="12" width="8" height="18" rx="2" />
      <rect x="17" y="4" width="6" height="10" rx="2" />
      {/* Fist 4 */}
      <rect x="25" y="17" width="7" height="13" rx="2" />
      <rect x="26" y="10" width="5" height="9" rx="2" />
      {/* Fist 5 (outer-right, shortest) */}
      <rect x="33" y="21" width="7" height="9" rx="2" />
      <rect x="34" y="15" width="5" height="8" rx="2" />
      {/* Ground baseline */}
      <rect x="0" y="30" width="40" height="3" rx="1.5" />
    </svg>,

    // 6: Media Coverage — broadcast tower with signal arcs
    <svg key="media" viewBox="0 0 40 40" className={cls} fill="currentColor" aria-hidden="true">
      {/* Tower body (tapered) */}
      <polygon points="17,38 19,14 21,14 23,38" />
      {/* Cross braces */}
      <rect x="16" y="22" width="8" height="2" rx="1" />
      <rect x="15" y="30" width="10" height="2" rx="1" />
      <rect x="14" y="36" width="12" height="2" rx="1" />
      {/* Antenna */}
      <rect x="19" y="4" width="2" height="12" />
      <circle cx="20" cy="3" r="2" />
      {/* Inner signal arcs */}
      <path
        d="M14,12 Q10,8 14,4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26,12 Q30,8 26,4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Outer signal arcs */}
      <path
        d="M10,16 Q4,9 10,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30,16 Q36,9 30,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>,
  ]
  return icons[index] ?? null
}

const joinIcons = ['🙌', '📣', '✊', '💼', '🤝']

const JOIN_WAYS = [
  { accentColor: '#5DBB7A' },
  { accentColor: '#B8860B' },
  { accentColor: '#2980B9' },
  { accentColor: '#7B2D8B' },
  { accentColor: '#8B4513' },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Pak-Palestine Forum',
  alternateName: ['PPF', 'Save Gaza Campaign'],
  url: siteMetadata.siteUrl,
  logo: `${siteMetadata.siteUrl}/static/images/logo.png`,
  description:
    "Pak-Palestine Forum is Pakistan's leading civil society movement advocating for Palestine through awareness, solidarity, and humanitarian support campaigns.",
  foundingDate: '2023',
  areaServed: 'Pakistan',
  knowsAbout: [
    'Palestine Advocacy',
    'Humanitarian Support',
    'Civil Society',
    'Palestine Awareness',
  ],
}

export default function Home() {
  const { t, i18n } = useTranslation('home')
  const isRTL = i18n.language === 'ur'
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)

  // ── Scroll-effect refs & state ──
  const teamSectionRef = useRef(null)
  const [activeTeamCard, setActiveTeamCard] = useState(0)
  const presenceSectionRef = useRef(null)
  const presenceScrollRef = useRef(null)
  const impactRef = useRef(null)
  const [impactProgress, setImpactProgress] = useState(0)
  const [touchedCard, setTouchedCard] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORD_COUNT)
        setFade(true)
      }, 400)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  // Team section: map vertical scroll progress → active card index
  useEffect(() => {
    const handleScroll = () => {
      if (!teamSectionRef.current) return
      const rect = teamSectionRef.current.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / total))
      const idx = Math.min(TEAM_COUNT - 1, Math.floor(progress * TEAM_COUNT + 0.05))
      setActiveTeamCard(idx)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Presence section: map vertical scroll → horizontal scrollLeft
  useEffect(() => {
    const handleScroll = () => {
      if (!presenceSectionRef.current || !presenceScrollRef.current) return
      const rect = presenceSectionRef.current.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / total))
      const el = presenceScrollRef.current
      el.scrollLeft = progress * (el.scrollWidth - el.clientWidth)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Impact section: track scroll progress for single-item reveal
  useEffect(() => {
    const handleScroll = () => {
      if (!impactRef.current) return
      const rect = impactRef.current.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setImpactProgress(p)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Pak-Palestine Forum | Pakistan&apos;s Leading Palestine Advocacy Platform</title>
        <meta
          name="description"
          content="Pak-Palestine Forum (PPF) is a prominent civil society movement in Pakistan dedicated to advocacy, humanitarian support, and public mobilization for the rights of the Palestinian people. Originally founded as Save Gaza Campaign."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteMetadata.siteUrl} />
        <meta
          property="og:title"
          content="Pak-Palestine Forum | Pakistan's Leading Palestine Advocacy Platform"
        />
        <meta
          property="og:description"
          content="Pak-Palestine Forum is Pakistan's leading civil society movement for Palestine advocacy, solidarity, and humanitarian support. Unite with us for peace and justice."
        />
        <meta
          property="og:image"
          content={`${siteMetadata.siteUrl}/static/images/socialBanner.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pak-Palestine Forum | Pakistan's Leading Palestine Advocacy Platform"
        />
        <meta
          name="twitter:description"
          content="Pakistan's leading civil society movement for Palestine advocacy, solidarity, and humanitarian support."
        />
        <meta
          name="twitter:image"
          content={`${siteMetadata.siteUrl}/static/images/socialBanner.png`}
        />
        <link rel="canonical" href={siteMetadata.siteUrl} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Pak-Palestine Forum, Pakistan Palestine advocacy, Palestine solidarity Pakistan, Save Gaza Campaign, humanitarian support Pakistan, Palestine awareness"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
        />
      </Head>

      {/* ── Hero Section ── */}
      {/* ── Hero — Mobile (< sm) ── */}
      <section className="relative -mt-[72px] flex min-h-screen items-end overflow-hidden sm:hidden">
        <Image
          src="/static/images/hero_pakpalforum_protest_image.png"
          alt="Pak-Palestine Forum solidarity gathering in Pakistan"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          sizes="100vw"
        />
        {/* Deep cinematic gradient — crisp image at top, black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/5" />

        {/* Centered content pinned to bottom */}
        <div className="relative z-10 w-full px-6 pb-12 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#6FCF6F]">
            {t('hero-eyebrow')}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-white">
            <span className="block">{t('hero-line1')}</span>
            <span
              className="block"
              style={{
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                opacity: fade ? 1 : 0,
                transform: fade ? 'translateY(0)' : 'translateY(-8px)',
                color: '#6FCF6F',
              }}
            >
              {t(`rotating-word-${currentWordIndex}`)}
            </span>
          </h1>
          {/* Green rule */}
          <div className="mx-auto my-4 h-px w-10 bg-gradient-to-r from-[#2A4C23] to-[#5DBB5D]" />
          <a
            href="#vision-heading"
            className="inline-block rounded-md border border-white/30 bg-white/10 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-sm"
          >
            {t('hero-vision-cta')}
          </a>
        </div>
      </section>

      {/* ── Hero — Desktop (sm+) ── */}
      <section className="relative -mt-[72px] hidden min-h-screen items-center overflow-hidden sm:flex">
        <Image
          src="/static/images/hero_pakpalforum_protest_image.png"
          alt="Pak-Palestine Forum solidarity gathering in Pakistan"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
        {/* Side gradient */}
        <div
          className={`absolute inset-0 ${
            isRTL
              ? 'via-black/65 bg-gradient-to-l from-black/90 to-black/15'
              : 'via-black/65 bg-gradient-to-r from-black/90 to-black/15'
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

        {/* Green vertical accent bar */}
        <div
          className={`absolute top-0 bottom-0 w-1 bg-[#2A4C23] ${
            isRTL ? 'right-10 lg:right-16' : 'left-10 lg:left-16'
          }`}
        />

        {/* Content */}
        <div
          className={`relative z-10 w-full px-16 lg:px-28 ${isRTL ? 'text-right' : 'text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#6FCF6F]">
              {t('hero-eyebrow')}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-white lg:text-6xl">
              <span className="block">{t('hero-line1')}</span>
              <span
                className="block"
                style={{
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  opacity: fade ? 1 : 0,
                  transform: fade ? 'translateY(0)' : 'translateY(-10px)',
                  color: '#6FCF6F',
                }}
              >
                {t(`rotating-word-${currentWordIndex}`)}
              </span>
            </h1>
            <div className={`my-5 h-0.5 w-16 bg-gradient-to-r from-[#2A4C23] to-[#5DBB5D] ${isRTL ? 'ml-auto' : ''}`} />
            <p className="max-w-xl text-base leading-relaxed text-gray-200 lg:text-lg">
              {t('hero-tagline')}
            </p>
            <div className={`mt-8 flex flex-wrap gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfY3kItAZJkY583HqGOTXiqW9861fLZuJb-o39D6-3zRcObkw/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#2A4C23] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a3017] hover:shadow-xl"
              >
                {t('join-cta')}
              </a>
              <a
                href="#vision-heading"
                className="rounded-md border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                {t('hero-vision-cta')}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── SEO Intro ── */}
      <section
        aria-label="About Pak-Palestine Forum"
        className="bg-gray-50 py-24 dark:bg-[#060a06]"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Accent rule */}
          <div className="mx-auto mb-10 h-px w-16 bg-gradient-to-r from-transparent via-[#2A4C23] to-transparent dark:via-[#5DBB5D]" />
          <p className="text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <Trans
              i18nKey="intro-p1"
              ns="home"
              components={[<strong key="0" />, <strong key="1" />]}
            />
          </p>
          <p className="mt-5 text-center text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            {t('intro-p2')}
          </p>
        </div>
      </section>

      {/* ── Vision & Objectives ── */}
      <section
        aria-labelledby="vision-heading"
        className="relative overflow-hidden py-24"
        style={{
          background: 'linear-gradient(135deg, #1a3017 0%, #2A4C23 50%, #1a3017 100%)',
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(93,187,93,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              {/* Section label */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-[#5DBB5D]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5DBB5D]">
                  Our Mission
                </p>
              </div>
              <h2
                id="vision-heading"
                className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              >
                {t('vision-h2')}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-300">
                {t('vision-p')}
              </p>
              <h3 className="mt-10 text-xl font-semibold text-white">
                {t('vision-objectives-h3')}
              </h3>
              <ul className="mt-4 space-y-4">
                {Array.from({ length: OBJECTIVE_COUNT }, (_, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="mr-3 mt-1 flex-shrink-0 text-[#5DBB5D]" aria-hidden="true">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {t(`vision-obj-${i}`)}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-gray-400">{t('vision-footer')}</p>
            </div>

            <div className="relative h-80 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 sm:h-96 lg:min-h-[480px]">
              <Image
                src="/static/images/pakpalforum_protest_image_2.jpg"
                alt="Pak-Palestine Forum protest and awareness campaign in Pakistan"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Achievements — Left static, Right single item reveal ── */}
      {(() => {
        const activeItem = Math.min(
          IMPACT_ITEMS.length - 1,
          Math.floor(impactProgress * IMPACT_ITEMS.length)
        )
        return (
          <section
            ref={impactRef}
            aria-labelledby="impact-heading"
            style={{ height: `${IMPACT_ITEMS.length * 50}vh` }}
            className="relative"
          >
            <div
              className="sticky top-0 h-screen overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #000 0%, #0a0808 40%, #080808 100%)',
              }}
            >
              {/* Faint green glow — top left */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at top left, rgba(42,76,35,0.12) 0%, transparent 55%)',
                }}
              />

              <div className="relative z-10 flex h-full flex-col sm:flex-row">

                {/* ── LEFT: static panel ── */}
                <div className="flex shrink-0 flex-col justify-center border-b border-white/5 px-8 py-6 sm:w-[42%] sm:border-b-0 sm:border-r sm:px-12 sm:py-0 lg:px-20 lg:w-[40%]">
                  {/* Label */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-px w-8 bg-[#5DBB5D]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5DBB5D]">
                      Key Achievements
                    </p>
                  </div>

                  {/* Heading */}
                  <h2
                    id="impact-heading"
                    className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl"
                  >
                    {t('impact-h2')}
                  </h2>

                  {/* Divider */}
                  <div className="my-5 h-px w-12 bg-white/10" />

                  {/* Description — desktop only */}
                  <p className="hidden max-w-[260px] text-sm leading-relaxed text-gray-500 sm:block lg:text-base">
                    {t('impact-p')}
                  </p>

                  {/* Counter */}
                  <div className="mt-8 flex items-end gap-2">
                    <span
                      className="font-black tabular-nums leading-none text-white transition-all duration-500"
                      style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                    >
                      {String(activeItem + 1).padStart(2, '0')}
                    </span>
                    <span className="mb-2 text-sm font-bold tabular-nums text-white/20">
                      / {String(IMPACT_ITEMS.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Progress bar track */}
                  <div className="relative mt-3 h-px w-32 bg-white/10">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2A4C23] to-[#5DBB5D] transition-all duration-500"
                      style={{
                        width: `${((activeItem + 1) / IMPACT_ITEMS.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Scroll hint — desktop only */}
                  <p
                    className="mt-6 hidden text-[10px] font-semibold uppercase tracking-widest text-white/20 sm:block"
                    style={{
                      opacity:
                        activeItem === IMPACT_ITEMS.length - 1 ? 0 : 1,
                      transition: 'opacity 0.4s',
                    }}
                  >
                    {t('scroll-hint')}
                  </p>
                </div>

                {/* ── RIGHT: single item reveal ── */}
                <div className="relative flex flex-1 items-center overflow-hidden">
                  {/* Ghost number watermark */}
                  <div
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none text-white/[0.025] transition-all duration-700"
                    style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
                    aria-hidden="true"
                  >
                    {String(activeItem + 1).padStart(2, '0')}
                  </div>

                  {IMPACT_ITEMS.map((item, idx) => {
                    const isActive = idx === activeItem
                    const isPast = idx < activeItem
                    return (
                      <div
                        key={idx}
                        className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? 'translateY(0)'
                            : isPast
                            ? 'translateY(-48px)'
                            : 'translateY(48px)',
                          transition:
                            'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                          pointerEvents: isActive ? 'auto' : 'none',
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="mb-6"
                          style={{ color: item.accentColor }}
                        >
                          <ImpactIcon index={idx} />
                        </div>

                        {/* Title */}
                        <h3
                          className="font-extrabold leading-tight text-white"
                          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
                        >
                          {t(`impact-stat-${idx}`)}
                        </h3>

                        {/* Colored rule */}
                        <div
                          className="my-5 h-0.5 w-12 transition-all duration-700"
                          style={{ backgroundColor: item.accentColor }}
                        />

                        {/* Description */}
                        <p className="max-w-lg text-base leading-relaxed text-gray-400 lg:text-lg">
                          {t(`impact-desc-${idx}`)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mobile scroll hint — bottom */}
              <div
                className="absolute bottom-5 left-0 right-0 flex justify-center sm:hidden"
                style={{
                  opacity: activeItem === IMPACT_ITEMS.length - 1 ? 0 : 0.35,
                  transition: 'opacity 0.4s',
                }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white">
                  {t('scroll-hint')}
                </p>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── Presence Across Pakistan — horizontal scroll driven by vertical page scroll ── */}
      <section
        ref={presenceSectionRef}
        aria-labelledby="presence-heading"
        style={{ height: '220vh' }}
        className="relative bg-gray-50 dark:bg-black"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* Subtle green radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(42,76,35,0.15) 0%, transparent 70%)',
            }}
          />

          {/* Header */}
          <div className="relative px-6 text-center sm:px-10">
            {/* Section label */}
            <div className="mx-auto mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[#2A4C23] dark:bg-[#5DBB5D]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A4C23] dark:text-[#5DBB5D]">
                Our Chapters
              </p>
              <div className="h-px w-8 bg-[#2A4C23] dark:bg-[#5DBB5D]" />
            </div>
            <h2
              id="presence-heading"
              className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
            >
              {t('presence-h2')}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500 dark:text-gray-400 sm:text-lg">
              {t('presence-p')}
            </p>
          </div>

          {/* Horizontal scroll strip */}
          <div
            ref={presenceScrollRef}
            className="relative mt-10 flex gap-5 overflow-x-hidden px-12 py-5"
            style={{ scrollBehavior: 'auto' }}
          >
            {PRESENCE_CITIES.map((city, i) => (
              <div
                key={i}
                className="flex flex-none flex-col overflow-hidden bg-white dark:bg-[#0d0d0d]"
                style={{
                  minWidth: '230px',
                  border: `1px solid ${city.accentColor}30`,
                  borderTop: `3px solid ${city.accentColor}`,
                  boxShadow: `0 0 20px ${city.accentColor}15`,
                }}
              >
                {/* Landmark icon */}
                <div
                  className="flex items-center justify-center px-8 pt-7 pb-3"
                  style={{ color: city.accentColor }}
                >
                  <CityLandmarkIcon index={i} />
                </div>

                {/* City name + landmark subtitle */}
                <div className="flex-1 px-6 pb-4 text-center">
                  <p className="text-lg font-bold tracking-wide text-gray-900 dark:text-white">
                    {t(`presence-city-${i}`)}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {city.landmark}
                  </p>
                </div>

                {/* Social media row */}
                <div
                  className="flex items-center justify-center gap-5 border-t px-6 py-3"
                  style={{ borderColor: `${city.accentColor}20` }}
                >
                  <a
                    href={city.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-pink-400"
                    aria-label={`${t(`presence-city-${i}`)} on Instagram`}
                  >
                    <SocialIcon platform="instagram" />
                  </a>
                  <a
                    href={city.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-blue-400"
                    aria-label={`${t(`presence-city-${i}`)} on Facebook`}
                  >
                    <SocialIcon platform="facebook" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <p className="relative mt-6 text-center text-xs font-medium uppercase tracking-widest text-gray-700">
            {t('presence-scroll-hint')}
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        aria-labelledby="faq-heading"
        className="bg-white py-24 dark:bg-[#0a0a0a]"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#2A4C23] dark:bg-[#5DBB5D]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A4C23] dark:text-[#5DBB5D]">
              Common Questions
            </p>
            <div className="h-px w-8 bg-[#2A4C23] dark:bg-[#5DBB5D]" />
          </div>
          <h2
            id="faq-heading"
            className="text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            {t('faq-h2')}
          </h2>
          <div className="mt-10 space-y-2">
            {Array.from({ length: FAQ_COUNT }, (_, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-lg border transition-colors duration-200 ${
                  openFaq === i
                    ? 'border-[#2A4C23]/40 bg-[#f0f7f0] dark:border-[#2A4C23]/40 dark:bg-[#050f05]'
                    : 'border-black/10 bg-gray-50 dark:border-white/[0.05] dark:bg-[#0d0d0d]'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  aria-expanded={openFaq === i}
                >
                  <span className="pr-4 font-semibold text-gray-900 dark:text-white">
                    {t(`faq-${i}-q`)}
                  </span>
                  <span
                    className={`flex-shrink-0 text-[#2A4C23] transition-transform duration-200 dark:text-[#5DBB5D] ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400">
                    {t(`faq-${i}-a`)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section — sticky split: info left / card right ── */}
      <section
        ref={teamSectionRef}
        aria-labelledby="team-heading"
        style={{ height: `${TEAM_COUNT * 100}vh` }}
        className="relative bg-black"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Subtle green gradient glow top-left */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at top left, rgba(42,76,35,0.10) 0%, transparent 60%)',
            }}
          />

          {/* Vertical progress pills — absolutely centered between panels */}
          <div className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 sm:flex">
            {Array.from({ length: TEAM_COUNT }, (_, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-700"
                style={{
                  height: activeTeamCard === i ? '28px' : '8px',
                  backgroundColor: activeTeamCard === i ? '#5DBB5D' : '#333',
                }}
              />
            ))}
          </div>

          <div className="flex h-full flex-col sm:flex-row">
            {/* ── LEFT: info panel ── */}
            <div className="flex shrink-0 flex-col justify-center px-8 pb-2 pt-5 sm:w-[44%] sm:px-12 sm:py-8 lg:px-20">
              {/* Eyebrow — lg+ only */}
              <div className="hidden items-center gap-3 lg:flex">
                <div className="h-px w-8 bg-[#5DBB5D]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5DBB5D]">
                  {t('team-h2')}
                </p>
              </div>

              {/* Active member details — lg+ only */}
              <div className="relative mt-4 hidden min-h-[90px] sm:mt-8 lg:block lg:min-h-[180px]">
                {Array.from({ length: TEAM_COUNT }, (_, i) => (
                  <div
                    key={i}
                    className="absolute inset-x-0 top-0"
                    style={{
                      opacity: activeTeamCard === i ? 1 : 0,
                      transform:
                        activeTeamCard === i
                          ? 'translateY(0)'
                          : activeTeamCard > i
                          ? 'translateY(-14px)'
                          : 'translateY(14px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    <h2
                      id={i === 0 ? 'team-heading' : undefined}
                      className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl"
                    >
                      {t(`team-${i}-name`)}
                    </h2>
                    <p className="mt-1.5 text-sm font-semibold text-[#5DBB5D] sm:text-base">
                      {t(`team-${i}-role`)}
                    </p>
                    <p className="line-clamp-4 mt-3 hidden text-sm leading-relaxed text-gray-400 lg:block">
                      {t(`team-${i}-bio`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Scroll hint — mobile only */}
              <div
                className="mt-3 flex items-center gap-2 sm:hidden"
                style={{
                  opacity: activeTeamCard === TEAM_COUNT - 1 ? 0 : 1,
                  transition: 'opacity 0.4s',
                }}
              >
                <div className="animate-bounce text-lg text-[#5DBB5D]">↓</div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5DBB5D]">
                  {t('scroll-hint')}
                </p>
              </div>
            </div>

            {/* ── RIGHT: card stack ── */}
            <div className="relative flex flex-1 items-center justify-center">
              {Array.from({ length: TEAM_COUNT }, (_, i) => {
                const isActive = activeTeamCard === i
                const isPast = activeTeamCard > i
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-start justify-center pt-6 sm:items-center sm:pt-0"
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                  >
                    <article
                      className="group w-full overflow-hidden shadow-2xl sm:w-[min(78vw,380px)]"
                      style={{
                        aspectRatio: '3/4',
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? 'translateY(0) scale(1)'
                          : isPast
                          ? 'translateY(-5%) scale(0.93)'
                          : 'translateY(7%) scale(0.93)',
                        transition:
                          'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)',
                      }}
                      onTouchStart={() => setTouchedCard((prev) => (prev === i ? null : i))}
                    >
                      <Image
                        src={teamImages[i]}
                        alt={`${t(`team-${i}-name`)} — ${t(`team-${i}-role`)}`}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        sizes="(max-width: 640px) 100vw, 380px"
                      />

                      {/* Hover overlay — darkens image on hover so icons/bio are readable, non-lg only */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:hidden" />

                      {/* Name / role overlay — always visible on non-lg */}
                      <div className="from-black/85 absolute inset-x-0 top-0 z-20 bg-gradient-to-b via-black/70 to-black/20 px-3 pb-6 pt-3 lg:hidden">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5DBB5D]">
                          {t('team-h2')}
                        </p>
                        <h2 className="mt-0.5 text-lg font-extrabold leading-tight text-white sm:text-xl">
                          {t(`team-${i}-name`)}
                        </h2>
                        <p className="mt-0.5 text-xs font-semibold text-[#6FCF6F] sm:text-sm">
                          {t(`team-${i}-role`)}
                        </p>
                        {/* Icons — hover-only on all non-lg sizes */}
                        <div className="mt-2 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {teamSocials[i].map(({ platform, url, label }) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${label} on ${platform}`}
                              className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-[#2A4C23]/60 hover:bg-[#2A4C23]/20 hover:text-[#86EFAC] active:border-[#2A4C23]/60 active:text-[#86EFAC]"
                            >
                              <SocialIcon platform={platform} />
                            </a>
                          ))}
                        </div>
                        {/* Bio — hover-only on all non-lg sizes */}
                        <p className="line-clamp-4 mt-2 text-[12px] leading-relaxed text-gray-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {t(`team-${i}-bio`)}
                        </p>
                      </div>

                      {/* Social icons — top-left, lg+ only */}
                      <div className="absolute left-3 top-3 z-20 hidden gap-2 lg:flex">
                        {teamSocials[i].map(({ platform, url, label }) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${label} on ${platform}`}
                            className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-[#2A4C23]/60 hover:bg-[#2A4C23]/20 hover:text-[#86EFAC] active:border-[#2A4C23]/60 active:text-[#86EFAC]"
                          >
                            <SocialIcon platform={platform} />
                          </a>
                        ))}
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Scroll hint — desktop only (bottom center of sticky screen) */}
          <div
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex"
            style={{
              opacity: activeTeamCard === TEAM_COUNT - 1 ? 0 : 1,
              transition: 'opacity 0.4s',
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5DBB5D]">
              {t('scroll-hint')}
            </p>
            <div className="animate-bounce text-lg text-[#5DBB5D]">↓</div>
          </div>
        </div>
      </section>

      {/* ── Join / Contact CTA ── */}
      <section
        aria-labelledby="join-heading"
        className="bg-gray-50 dark:bg-black"
      >
        {/* ── Heading + CTA ── */}
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-20 text-center sm:px-10">
          {/* Section label */}
          <span className="inline-block border border-[#2A4C23]/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#2A4C23] dark:border-[#5DBB5D]/50 dark:text-[#5DBB5D]">
            {t('join-badge')}
          </span>
          <h2
            id="join-heading"
            className="mt-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            {t('join-h2')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-500 dark:text-gray-400 sm:text-lg">
            {t('join-p')}
          </p>
          <div className="mt-8">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfY3kItAZJkY583HqGOTXiqW9861fLZuJb-o39D6-3zRcObkw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#2A4C23] px-8 py-3 text-base font-semibold text-[#2A4C23] transition-all duration-150 hover:bg-[#2A4C23] hover:text-white dark:border-[#5DBB5D] dark:text-[#5DBB5D] dark:hover:bg-[#5DBB5D] dark:hover:text-black"
            >
              {t('join-cta')}
            </a>
          </div>
        </div>

        {/* ── Role cards grid ── */}
        <div className="mx-auto max-w-5xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {JOIN_WAYS.map((way, i) => (
              <div
                key={i}
                className="relative overflow-hidden bg-white dark:bg-[#0d0d0d]"
                style={{
                  borderLeft: `4px solid ${way.accentColor}`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.4), inset 0 0 0 1px ${way.accentColor}15`,
                }}
              >
                {/* Faded watermark step number */}
                <span
                  className="pointer-events-none absolute right-3 top-1 select-none text-8xl font-black leading-none"
                  style={{ color: `${way.accentColor}10` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Role icon */}
                <div className="p-6 pb-2" style={{ color: way.accentColor }}>
                  <JoinRoleIcon index={i} />
                </div>

                {/* Text */}
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-bold leading-snug text-gray-900 dark:text-white">
                    {t(`join-way-${i}`)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">
                    {t(`join-short-${i}`)}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-[2px] w-full"
                  style={{ backgroundColor: `${way.accentColor}40` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer note ── */}
        <p className="px-6 pb-16 pt-8 text-center text-sm text-gray-600">
          {t('join-footer')}
        </p>
      </section>
    </>
  )
}
