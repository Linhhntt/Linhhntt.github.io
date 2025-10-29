// Lightweight typed effect (no external libs)
// Simple typewriter that loops over provided strings.
(function(){
  const el = document.getElementById('typed');
  const phrases = [
    'Backend Developer · Cloud Security Researcher',
    'Microservice Security · eBPF · Seccomp',
    'Building secure and scalable distributed systems'
  ];
  let pIndex = 0, cIndex = 0, forward = true, pause = false;

  function type() {
    if (!el) return;
    const current = phrases[pIndex];
    if (forward) {
      cIndex++;
      el.textContent = current.slice(0, cIndex);
      if (cIndex === current.length) {
        forward = false;
        pause = true;
        setTimeout(()=> pause = false, 1200);
      }
    } else {
      cIndex--;
      el.textContent = current.slice(0, cIndex);
      if (cIndex === 0) {
        forward = true;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    const speed = pause ? 300 : (forward ? 40 : 20);
    setTimeout(type, speed);
  }

  // Start after small delay
  setTimeout(type, 400);
})();

// Smooth-scrolling for internal links
(function(){
  document.addEventListener('click', function(e){
    const t = e.target.closest('a[href^="#"]');
    if(!t) return;
    e.preventDefault();
    const id = t.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
})();

// Optional: subtle entrance effect for cards when scrolled into view
(function(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.card, .job, .pubs li').forEach(n => observer.observe(n));
})();
