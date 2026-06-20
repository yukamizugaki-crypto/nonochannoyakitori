/* =============================================
   ののちゃんのやきとり屋 - main.js
   ============================================= */

'use strict';

// ===== ヘッダー: スクロール時のスタイル変更 =====
const header = document.getElementById('header');

function onScroll() {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to Top ボタン
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

window.addEventListener('scroll', onScroll, { passive: true });


// ===== ハンバーガーメニュー =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMenu() {
    hamburger.classList.add('open');
    nav.classList.add('open');
    mobileOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    mobileOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

mobileOverlay.addEventListener('click', closeMenu);

// ナビリンクをクリックしたらメニューを閉じる
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});


// ===== スムーズスクロール =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 70;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
    });
});


// ===== Back to Top ボタン =====
const backToTopBtn = document.getElementById('back-to-top');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== Intersection Observer: フェードインアニメーション =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // 一度見えたら監視を解除
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});





// ===== ページ読み込み時: Heroセクションを即表示 =====
window.addEventListener('DOMContentLoaded', () => {
    // Hero の fade-in を少し遅らせて表示
    const heroFadeEls = document.querySelectorAll('.hero .fade-in');
    heroFadeEls.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 100 + i * 200);
    });

    // 初期スクロール位置チェック
    onScroll();
});


// ===== ヒーローセクションのスライドショー (5秒間隔) =====
const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;

if (slides.length > 0) {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}
