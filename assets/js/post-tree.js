// Marks the current section in the left-hand contents, opens its subsections and
// tracks reading progress.
(function () {
  const tree = document.querySelector('.post-tree');
  const content = document.querySelector('.post-content');
  if (!tree || !content) return;

  const sections = [...tree.querySelectorAll('nav a')]
    .map((link) => ({
      link,
      heading: document.getElementById(decodeURIComponent(link.hash.slice(1))),
    }))
    .filter((section) => section.heading);

  let current = null;
  let scheduled = false;

  function setCurrent(section) {
    if (section === current) return;
    current = section;
    tree.querySelector('[aria-current]')?.removeAttribute('aria-current');
    tree.querySelectorAll('.is-open').forEach((li) => li.classList.remove('is-open'));
    if (!section) return;
    section.link.setAttribute('aria-current', 'location');
    for (let li = section.link.closest('li'); li; li = li.parentElement.closest('li')) {
      li.classList.add('is-open');
    }
  }

  function update() {
    scheduled = false;

    const box = content.getBoundingClientRect();
    const progress = -box.top / Math.max(1, box.height - window.innerHeight);
    tree.style.setProperty('--tree-progress', Math.min(1, Math.max(0, progress)));

    // A section is current once its heading nears the top. The line sweeps down over
    // the last screenful so short final sections, which can't scroll that far, still count.
    const root = document.documentElement;
    const remaining = root.scrollHeight - window.innerHeight - window.scrollY;
    const line = Math.max(72, window.innerHeight - remaining);
    setCurrent(sections.findLast((s) => s.heading.getBoundingClientRect().top <= line) ?? null);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
})();
