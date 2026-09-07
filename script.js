const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
function updateActiveSection() {
  // Match the anchor offset, including the sticky header on smaller screens.
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  let active = 0;
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= offset + 2) active = index;
  });
  // The last section may be too short to reach the header at maximum scroll.
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    active = sections.length - 1;
  }
  sectionLinks.forEach((link, index) => {
    if (index === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let scrollUpdatePending = false;
window.addEventListener('scroll', () => {
  if (scrollUpdatePending) return;
  scrollUpdatePending = true;
  requestAnimationFrame(() => {
    updateActiveSection();
    scrollUpdatePending = false;
  });
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
window.addEventListener('pageshow', updateActiveSection);
updateActiveSection();
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
document.querySelectorAll('audio').forEach(player => {
  player.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => { if (other !== player) other.pause(); });
  });
});
