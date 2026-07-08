// Header shadow on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form (Web3Forms)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formStatus = document.getElementById('formStatus');
  const submitBtn = contactForm.querySelector('.form-submit');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    formStatus.textContent = '送信中です…';
    formStatus.className = 'form-status';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });
      const result = await res.json();

      if (result.success) {
        formStatus.textContent = 'お問い合わせありがとうございます。内容を確認の上、メールにてご連絡いたします。';
        formStatus.classList.add('is-success');
        contactForm.reset();
      } else {
        throw new Error(result.message || '送信に失敗しました');
      }
    } catch (err) {
      formStatus.textContent = '送信に失敗しました。お手数ですが時間をおいて再度お試しください。';
      formStatus.classList.add('is-error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => io.observe(el));
