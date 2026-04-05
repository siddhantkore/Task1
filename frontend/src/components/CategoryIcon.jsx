function CategoryIcon({ iconName, className = '' }) {
  const icons = {
    hotel: (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M8 24V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 24h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 13h4v4h-4Zm6 0h4v4h-4Z" fill="currentColor" />
      </svg>
    ),
    shopping_cart: (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M8 9h2l2.2 10h10.8l2-7H13.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="25" r="1.8" fill="currentColor" />
        <circle cx="23" cy="25" r="1.8" fill="currentColor" />
      </svg>
    ),
    health_and_safety: (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M16 6 8 10v6c0 6 3.8 9.4 8 11 4.2-1.6 8-5 8-11v-6Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 11v9M11.5 15.5h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    sports: (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path d="M6 24h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 24v-7m12 7v-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 18c3 0 4-4 7-4 2 0 3 1 5 1 1.5 0 2.5-1 4-1 1.2 0 2 .8 2 2 0 2.8-2.6 4.8-5 4.8-1.3 0-2.3-.6-3.8-.6-2.8 0-4.5 2-7 2-1.8 0-3.2-1.4-3.2-4.2Z" fill="currentColor" />
        <circle cx="23.5" cy="10" r="2" fill="currentColor" />
      </svg>
    ),
    pets: (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        <circle cx="22" cy="10" r="2.5" fill="currentColor" />
        <circle cx="8" cy="16" r="2.5" fill="currentColor" />
        <circle cx="24" cy="16" r="2.5" fill="currentColor" />
        <path d="M16 15c-4 0-7 2.8-7 6 0 2.4 2 4 4.4 4 1.4 0 2-.8 2.6-.8.6 0 1.2.8 2.6.8 2.4 0 4.4-1.6 4.4-4 0-3.2-3-6-7-6Z" fill="currentColor" />
      </svg>
    ),
  }

  return icons[iconName] || icons.pets
}

export default CategoryIcon
