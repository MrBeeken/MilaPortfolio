    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const reveals = document.querySelectorAll('.reveal');
    const tiltCard = document.getElementById('tiltCard');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const contactEmail = 'milahenning7@gmail.com';

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navAnchors.forEach(anchor => {
      anchor.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });

    function handleScrollEffects() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(item => revealObserver.observe(item));

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-fill');
          fills.forEach(fill => {
            fill.style.width = fill.dataset.width;
          });
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`Kontak vanaf Mila CV: ${name || 'Nuwe navraag'}`);
      const body = encodeURIComponent(
        `Naam: ${name}\nE-pos: ${email}\n\nBoodskap:\n${message}`
      );

      formMessage.textContent = 'Jou e-posprogram word oopgemaak...';
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    });

    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects();
