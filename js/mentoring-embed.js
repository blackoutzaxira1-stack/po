document.addEventListener('DOMContentLoaded', function () {
  /**
   * Mentoring bo'limini topish va YouTube videoni vertikal (Shorts) 
   * formatga moslab, mobil va desktopda chiroyli ko'rsatish.
   */
  function setupMentoringVideo() {
    // Try to find an existing "Sizning Mentoring" heading on the page
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, .heading-section'));
    let mentoringHeading = null;

    for (const h of headings) {
      const text = (h.textContent || '').trim();
      if (text.includes('Sizning') && text.includes('Mentoring')) {
        mentoringHeading = h;
        break;
      }
    }

    // Helper to build simple video-only markup
    function buildMentoringHTML() {
      return `
        <div class="mentoring-video-wrapper">
          <video class="mentoring-video" controls playsinline preload="metadata">
            <source src="/img/aziza.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;
    }

    if (!mentoringHeading) {
      // If no heading found, append a new mentoring card to the main root as a fallback
      const root = document.getElementById('root') || document.body;
      const wrapper = document.createElement('section');
      wrapper.className = 'mentoring-section';
      wrapper.innerHTML = `<div class="rounded-3xl mentoring-processed">${buildMentoringHTML()}</div>`;
      root.appendChild(wrapper);
      if (window.AOS && typeof window.AOS.refresh === 'function') window.AOS.refresh();
      return;
    }

    // Find the nearest card/container for the heading (if present)
    const card = mentoringHeading.closest('[class*="rounded-3xl"]') || mentoringHeading.closest('section')?.querySelector('[class*="rounded-3xl"]') || mentoringHeading.parentElement;

    if (!card || card.classList.contains('mentoring-processed')) return;
    card.classList.add('mentoring-processed');

    // Sanitize existing content: remove iframe/video nodes and keep textual content for the right column
    const originalContent = card.innerHTML;
    const tmp = document.createElement('div');
    tmp.innerHTML = originalContent;
    tmp.querySelectorAll('iframe, video').forEach(n => n.remove());
    const sanitizedContent = tmp.innerHTML.trim();

    // Replace the card content with only the video
    card.innerHTML = buildMentoringHTML();

    // Refresh AOS if present so animations work after DOM injection
    if (window.AOS && typeof window.AOS.refresh === 'function') window.AOS.refresh();
  }

  // Sahifa yuklanganda ishga tushirish
  setupMentoringVideo();
});
