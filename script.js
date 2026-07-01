document.addEventListener('DOMContentLoaded', () => {
  
  // --------------------------------------------------------
  // 0. Environment Setup & Shared Elements
  // --------------------------------------------------------
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // --------------------------------------------------------
  // 1. Unified Form Engine & Security Logic (All Devices)
  // --------------------------------------------------------
  
  // Toast Notification System
  function showToast(message, duration = 2000) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.classList.add('toast-notification');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, duration);
  }

  // Secure Form Submissions & Feedback (Combined to prevent soft-locks)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const formLoading = contactForm.querySelector('.form-loading');
    const formSuccess = contactForm.querySelector('.form-success');

    contactForm.addEventListener('submit', (e) => {
      // FIX: Linked directly to your correct HTML form IDs
      const name = document.getElementById('form-name')?.value.trim() || "";
      const email = document.getElementById('form-email')?.value.trim() || "";
      const message = document.getElementById('form-message')?.value.trim() || "";
      
      // Validation check must run first before modifying UI states
      if (!name || !email || !message) {
        e.preventDefault();
        showToast('Please fill out all fields with valid content.');
        return;
      }

      // Apply UI treatment only on verified validation pass
      if (submitBtn) submitBtn.disabled = true;
      if (formLoading) formLoading.classList.add('active');
      if (formSuccess) formSuccess.classList.remove('active');
    });
  }

  // Safe Decryption & Clipboard Copy for Email (FIX: Fixed dual competing handlers)
  const emailCopyBtn = document.getElementById('email-copy-link') || document.querySelector('.copy-email');
  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Safely decodes 'm.hamza.2007.2022@gmail.com' at runtime
      const secureEmail = atob('bS5oYW16YS4yMDA3LjIwMjJAZ21haWwuY29t'); 
      
      try {
        await navigator.clipboard.writeText(secureEmail);
        showToast('✓ Email copied to clipboard');
        
        const originalText = emailCopyBtn.textContent;
        emailCopyBtn.textContent = '✓ Email Copied';
        emailCopyBtn.style.color = 'var(--editorial-highlight)';
        
        setTimeout(() => {
          emailCopyBtn.textContent = originalText;
          emailCopyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Copy failed: ', err);
        showToast('✗ Failed to copy email');
      }
    });
  }
  
  // Keyboard access engines for bookshelves and academic timelines
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = card.querySelector('a');
        if (link) link.click();
      }
    });
  });
  
  const timelineRows = document.querySelectorAll('.timeline-row');
  timelineRows.forEach(row => {
    row.setAttribute('tabindex', '0');
  });

  // --------------------------------------------------------
  // 2. High-Fidelity Animation Engine (Waits for Web Fonts)
  // --------------------------------------------------------
  document.fonts.ready.then(() => {
    
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Cinematic Page Transitions
    const curtain = document.querySelector('.page-transition-curtain');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('.editorial-header');
    const footer = document.querySelector('.editorial-footer');
    let isTransitioning = false; 

    if (curtain) {
      gsap.to(curtain, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.1,
        ease: 'power4.inOut',
        onComplete: () => {
          document.body.style.pointerEvents = 'auto';
        }
      });
    }

    gsap.set([header, mainContent, footer], { opacity: 0, y: 15 });
    gsap.to([header, mainContent, footer], {
      opacity: 1, 
      y: 0, 
      duration: 1.2, 
      delay: 0.3, 
      stagger: 0.15, 
      ease: 'power3.out', 
      clearProps: 'opacity, y'
    });

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        const target = link.getAttribute('href');
        
        if (
          target && 
          link.hostname === window.location.hostname &&
          link.target !== '_blank' &&
          !link.hasAttribute('download') &&
          !target.startsWith('#') &&
          !target.startsWith('mailto:')
        ) {
          e.preventDefault();
          if (isTransitioning) return;
          isTransitioning = true;
          
          document.body.style.pointerEvents = 'none';
          if (typeof lenis !== 'undefined') lenis.stop();

          gsap.fromTo(curtain, 
            { scaleY: 0, transformOrigin: 'bottom center' },
            {
              scaleY: 1, 
              duration: 0.8, 
              ease: 'power3.inOut', 
              onComplete: () => { window.location.href = target; }
            }
          );
        }
      });
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        if (curtain) gsap.set(curtain, { scaleY: 0 });
        gsap.set([header, mainContent, footer], { opacity: 1, y: 0, clearProps: 'opacity, y' });
        isTransitioning = false;
        document.body.style.pointerEvents = 'auto';
        if (typeof lenis !== 'undefined') lenis.start(); 
      }
    });

    // High-Tension Smart Reveal Sticky Header
    const stickyHeader = document.querySelector('.editorial-header');
    if (stickyHeader) {
      let isHeaderVisible = true;

      ScrollTrigger.create({
        start: 'top top',
        end: 'max', 
        onUpdate: (self) => {
          const currentScroll = self.scroll();

          if (currentScroll <= 100) {
            if (!isHeaderVisible) {
              gsap.to(stickyHeader, { yPercent: 0, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
              isHeaderVisible = true;
            }
            return;
          }
          
          if (self.direction === 1 && isHeaderVisible) { 
            gsap.to(stickyHeader, { yPercent: -100, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
            isHeaderVisible = false;
          } 
          else if (self.direction === -1 && !isHeaderVisible) { 
            gsap.to(stickyHeader, { yPercent: 0, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
            isHeaderVisible = true;
          }
        }
      });
    }

    // Navigation Engine: Horizontal Dynamic Ledger Rule
    const navContainer = document.querySelector('.editorial-nav');
    if (navContainer) {
      const marker = document.createElement('div');
      marker.classList.add('nav-ledger-marker');
      navContainer.appendChild(marker);

      const navLinks = navContainer.querySelectorAll('a');
      const activeLink = navContainer.querySelector('.active-page');

      const moveMarkerTo = (element, duration = 0.5, ease = 'power3.out') => {
        if (!element) {
          gsap.to(marker, { width: 0, duration: duration, ease: ease });
          return;
        }
        gsap.to(marker, { x: element.offsetLeft, width: element.offsetWidth, duration: duration, ease: ease });
      };

      if (activeLink) moveMarkerTo(activeLink, 0);

      navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
          moveMarkerTo(link, 0.4, 'power2.out');
          gsap.to(Array.from(navLinks).filter(item => item !== link), { opacity: 0.5, duration: 0.4, ease: 'power2.out' });
          gsap.to(link, { color: 'var(--text)', opacity: 1, duration: 0.3 });
        });

        link.addEventListener('touchstart', () => {
          moveMarkerTo(link, 0.25, 'power1.out');
          gsap.to(Array.from(navLinks).filter(item => item !== link), { opacity: 0.5, duration: 0.2, ease: 'power1.out' });
          gsap.to(link, { color: 'var(--accent)', opacity: 1, duration: 0.2 });
        }, { passive: true });
      });

      navContainer.addEventListener('mouseleave', () => {
        if (activeLink) {
          moveMarkerTo(activeLink, 0.5, 'power3.out');
          gsap.to(activeLink, { color: 'var(--text)', opacity: 1, duration: 0.4 });
          gsap.to(Array.from(navLinks).filter(item => item !== activeLink), { color: 'var(--muted)', opacity: 1, duration: 0.4, clearProps: 'opacity,color' });
        } else {
          moveMarkerTo(null, 0.5, 'power3.out');
          gsap.to(navLinks, { color: 'var(--muted)', opacity: 1, duration: 0.4, clearProps: 'opacity,color' });
        }
      });
      
      window.addEventListener('resize', () => { if (activeLink) moveMarkerTo(activeLink, 0); });
    }

    // Global Adaptive Viewport Scroll Rail
    const scrollFill = document.querySelector('.viewport-scroll-fill');
    if (scrollFill) {
      gsap.to(scrollFill, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
      });
    }

    // Hero & Content Section Reveals
    const heroGrid = document.querySelector('.editorial-hero-grid');
    if (heroGrid) {
      const heroTl = gsap.timeline({ delay: 0.6 }); 
      heroTl.from('.portrait-img-raw', { opacity: 0, scale: 1.04, duration: 1.4, ease: 'power3.out' }, 0)
            .from('.hero-statement', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, 0.4)
            .from('.body-essay:not(.ink-reveal)', { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, 0.7)
            .from('.metadata-row', { opacity: 0, duration: 1 }, 1.1)
            .from('.narrative-actions', { opacity: 0, duration: 1 }, 1.3);
    }

    gsap.utils.toArray('.editorial-section').forEach(section => {
      if (section.classList.contains('hero-narrative')) return; 
      const label = section.querySelector('.section-label');
      const title = section.querySelector('.section-title');
      const content = section.querySelector('.section-content');
      const sectionTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 82%', once: true } });
      if (label) sectionTl.from(label, { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0);
      if (title) sectionTl.from(title, { y: 15, opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.2);
      if (content) sectionTl.from(content, { y: 20, opacity: 0, duration: 1.2, ease: 'power3.out' }, 0.3);
    });

    // SVG Timeline Wander Dot Alignment
    const trackWrapper = document.querySelector('.timeline-scroll-wrapper');
    if (trackWrapper) {
      const dot = trackWrapper.querySelector('.scroll-dot');
      const lineFill = trackWrapper.querySelector('.scroll-line-fill');

      gsap.timeline({
        scrollTrigger: {
          trigger: trackWrapper,
          start: 'top center',    
          end: 'bottom center',   
          scrub: true             
        }
      })
      .to(lineFill, { scaleY: 1, ease: 'none' }, 0)
      .to(dot, { top: '100%', ease: 'none' }, 0);
    }

    // Library Shelf Dynamic Tracks
    const bookShelf = document.querySelector('.books-shelf-track');
    if (bookShelf) {
      gsap.from('.book-card', {
        scrollTrigger: { trigger: '.books-shelf-viewport', start: 'top 85%', once: true },
        y: 35, opacity: 0, scale: 0.96, rotation: 3, transformOrigin: 'bottom center',
        stagger: { amount: 0.5, ease: 'sine.inOut' }, duration: 1.4, ease: 'power3.out'              
      });
      
      bookShelf.querySelectorAll('.book-title').forEach(title => {
        gsap.to(title, {
          x: 18, ease: 'none',
          scrollTrigger: { trigger: title.parentElement, scroller: bookShelf, horizontal: true, start: 'left right', end: 'right left', scrub: true }
        });
      });
    }

    const heroImages = document.querySelectorAll('.editorial-hero-grid img');
    if (heroImages.length > 0) {
      gsap.fromTo(heroImages, 
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.03, filter: 'sepia(30%) contrast(90%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, filter: 'sepia(12%) contrast(96%)', duration: 1.6, ease: 'power2.out', delay: 0.8 }
      );
    }

    const timeline = document.querySelector('.narrative-timeline');
    if (timeline) {
      gsap.utils.toArray('.timeline-row').forEach(row => {
        const meta = row.querySelector('.timeline-meta');
        const bodies = row.querySelectorAll('.timeline-body');
        const tlTl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 88%', once: true } });
        tlTl.fromTo(row, { borderBottomColor: 'rgba(255, 255, 255, 0)' }, { borderBottomColor: 'rgba(255, 255, 255, 0.06)', duration: 0.8, ease: 'sine.inOut' }, 0)
            .from(meta, { opacity: 0, y: 10, duration: 1, ease: 'power3.out' }, 0.2)
            .from(bodies, { y: 20, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }, 0.3);
      });
    }

    // Monotype Ink-Settling (Desktop Exclusive Engine Wrapper)
    const inkReveals = document.querySelectorAll('.ink-reveal');
    if (inkReveals.length > 0 && window.innerWidth > 768) {
      const inkTimeline = gsap.timeline({ paused: true });

      inkReveals.forEach((element) => {
        const originalText = element.textContent.trim();
        element.setAttribute('aria-label', originalText);
        element.innerHTML = ''; 

        const words = originalText.split(' ');

        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.classList.add('ink-word');
          wordSpan.setAttribute('aria-hidden', 'true');

          [...word].forEach((char) => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.classList.add('ink-char');
            wordSpan.appendChild(charSpan);
          });

          element.appendChild(wordSpan);

          if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.innerHTML = '&nbsp;';
            element.appendChild(spaceSpan);
          }
        });

        const chars = element.querySelectorAll('.ink-char');

        inkTimeline.fromTo(chars,
          { opacity: 0.08, color: 'var(--muted)', filter: 'blur(4px)', scale: 1.05 },
          { opacity: 1, color: 'var(--text)', filter: 'blur(0px)', scale: 1, stagger: 0.1, duration: 0.5, ease: 'none' },
          ">" 
        );
      });

      let maxProgress = 0;

      ScrollTrigger.create({
        trigger: inkReveals[0],
        endTrigger: inkReveals[inkReveals.length - 1],
        start: 'top 85%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          if (self.progress > maxProgress) {
            maxProgress = self.progress;
            
            gsap.to(inkTimeline, { 
              progress: maxProgress, 
              duration: 0.6, 
              ease: 'power3.out', 
              overwrite: 'auto' 
            });
          }
        }
      });
    }
  });
});