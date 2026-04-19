/* ============================================================
   KUNDAN KUMAR PORTFOLIO — main.js
   ============================================================ */

// ===== EMAILJS INIT =====
if (typeof emailjs !== 'undefined') {
    emailjs.init('yYooKuP18mp7paGUs');
}

// ===== AOS INIT =====
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 0
});

// ===== TYPED.JS (home page only — guarded) =====
if (document.querySelector('.typed-text')) {
    var typed = new Typed(".typed-text", {
        strings: ["Android Developer", "Java Developer", "Problem Solver"],
        typeSpeed: 80,
        backSpeed: 55,
        backDelay: 1800,
        loop: true,
        showCursor: false
    });
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', updateHeader, { passive: true });

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const navbar  = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('open');
});

// Close on nav link click (navigates to new page — menu closes automatically)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navbar.classList.remove('open');
    });
});

// Close on outside click
document.addEventListener('click', (e) => {
    if (navbar.classList.contains('open') &&
        !navbar.contains(e.target) &&
        !menuBtn.contains(e.target)) {
        menuBtn.classList.remove('active');
        navbar.classList.remove('open');
    }
});

// ===== ACTIVE NAV — URL BASED =====
(function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkFile = link.getAttribute('href').split('/').pop();
        if (linkFile === page) {
            link.classList.add('active');
        }
    });
})();

// ===== BACK TO TOP =====
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 50);
}, { passive: true });

// ===== CUSTOM CURSOR =====
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    (function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top  = followerY + 'px';
        requestAnimationFrame(animateFollower);
    })();

    document.querySelectorAll('a, button, .service-card, .project-card, .stat, .timeline-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform   = 'translate(-50%,-50%) scale(2.5)';
            cursor.style.opacity     = '0.6';
            follower.style.transform = 'translate(-50%,-50%) scale(1.6)';
            follower.style.opacity   = '0.8';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
            cursor.style.opacity     = '1';
            follower.style.transform = 'translate(-50%,-50%) scale(1)';
            follower.style.opacity   = '0.5';
        });
    });
}

// ===== PARTICLE GENERATOR =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 40;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left   = (Math.random() * 100) + '%';
        p.style.top    = (Math.random() * 100) + '%';
        const size     = (Math.random() * 3 + 1) + 'px';
        p.style.width  = size;
        p.style.height = size;
        p.style.setProperty('--dur', (Math.random() * 8 + 7) + 's');
        p.style.setProperty('--del', '-' + (Math.random() * 8) + 's');
        p.style.background = i % 3 === 0 ? '#22d3ee' : '#a78bfa';
        container.appendChild(p);
    }
}
createParticles();

// ===== SKILL BARS (IntersectionObserver) =====
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                setTimeout(() => { el.style.width = el.getAttribute('data-width') + '%'; }, 150);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.2 });

    fills.forEach(f => observer.observe(f));
}
initSkillBars();

// ===== CIRCLE PROGRESS (IntersectionObserver) =====
function initCircleProgress() {
    const circles = document.querySelectorAll('.circle-progress');
    if (!circles.length) return;
    const circumference = 2 * Math.PI * 40; // r = 40 → ≈ 251.3

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const percent = parseInt(el.getAttribute('data-percent'));
                const offset  = circumference - (percent / 100) * circumference;
                const prog    = el.querySelector('.prog-circle');
                if (prog) setTimeout(() => { prog.style.strokeDashoffset = offset; }, 150);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    circles.forEach(c => observer.observe(c));
}
initCircleProgress();

// ===== PAGE TRANSITION (fade-out on link click) =====
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only handle same-origin HTML page links (not anchors, not external)
    if (href && !href.startsWith('#') && !href.startsWith('http') &&
        !href.startsWith('mailto') && href.endsWith('.html')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.28s ease';
            document.body.style.opacity    = '0';
            setTimeout(() => { window.location.href = href; }, 290);
        });
    }
});

// ===== FORM SUBMIT — EmailJS =====
// Replace these IDs with your own from emailjs.com
const EMAILJS_SERVICE_ID       = 'service_9jgy5fc';
const EMAILJS_NOTIFY_TEMPLATE  = 'template_fm29v6o';  // email sent TO you
const EMAILJS_REPLY_TEMPLATE   = 'template_szfoqtk';     // auto-reply sent TO sender

const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const original = btn.innerHTML;

        btn.innerHTML = 'Sending… <i class="bx bx-loader-alt bx-spin"></i>';
        btn.disabled  = true;

        const params = {
            from_name:  form.querySelector('[name="from_name"]').value,
            from_email: form.querySelector('[name="from_email"]').value,
            subject:    form.querySelector('[name="subject"]').value    || '(No subject)',
            message:    form.querySelector('[name="message"]').value,
            to_email:   'kundan17832863@gmail.com'
        };

        // 1) Notify you → 2) Auto-reply to sender
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_NOTIFY_TEMPLATE, params)
            .then(() => emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_REPLY_TEMPLATE, params))
            .then(() => {
                btn.innerHTML        = 'Sent! <i class="bx bx-check"></i>';
                btn.style.background = 'linear-gradient(135deg,#22d3ee,#34d399)';
                setTimeout(() => {
                    btn.innerHTML        = original;
                    btn.style.background = '';
                    btn.disabled         = false;
                    form.reset();
                }, 3000);
            })
            .catch(() => {
                btn.innerHTML        = 'Failed! Try again <i class="bx bx-error"></i>';
                btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
                setTimeout(() => {
                    btn.innerHTML        = original;
                    btn.style.background = '';
                    btn.disabled         = false;
                }, 3000);
            });
    });
}
