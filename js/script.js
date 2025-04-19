// 一言API配置
const hitokotoAPI = 'https://v1.hitokoto.cn/';
const hitokotoElement = document.getElementById('hitokoto-text');

// 获取一言
function fetchHitokoto() {
    fetch(hitokotoAPI)
        .then(response => response.json())
        .then(data => {
            if (hitokotoElement) {
                hitokotoElement.textContent = data.hitokoto;
                if (data.from) {
                    hitokotoElement.dataset.from = `—— ${data.from}`;
                }
            }
        })
        .catch(error => {
            console.error('获取一言失败:', error);
            if (hitokotoElement) {
                hitokotoElement.style.display = 'none';
            }
        });
}



document.addEventListener('DOMContentLoaded', function () {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // 获取一言
    fetchHitokoto();

    // 获取DOM元素
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTop = document.getElementById('back-to-top');
    const runningTime = document.getElementById('running-time');

    // 移动端菜单切换
    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // 如果移动菜单是打开的，点击后关闭它
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 返回顶部按钮
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('opacity-100');
            backToTop.classList.remove('opacity-0', 'invisible');
        } else {
            backToTop.classList.remove('opacity-100');
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 网站运行时间计算
    function updateRunningTime() {
        const startDate = new Date('2023-05-25'); // 网站开始运行的日期
        const currentDate = new Date();
        const timeDiff = currentDate - startDate;

        // 计算天数、小时、分钟和秒数
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // 更新显示
        runningTime.textContent = `${days} 日 ${hours} 小时 ${minutes} 分 ${seconds} 秒 (共：${Math.floor(days / 365)} 年)`;
    }

    // 初始更新一次，然后每秒更新一次
    updateRunningTime();
    setInterval(updateRunningTime, 1000);

    // 技能进度条动画
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // 图片延迟加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function () {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // 为导航栏添加滚动效果
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('bg-white', 'bg-opacity-90', 'shadow-md');
            nav.classList.remove('bg-opacity-20');
        } else {
            nav.classList.remove('bg-white', 'bg-opacity-90', 'shadow-md');
            nav.classList.add('bg-opacity-20');
        }
    });

    // 为网站卡片添加鼠标悬停效果
    const siteCards = document.querySelectorAll('#sites a');
    siteCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('transform', 'scale-105');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('transform', 'scale-105');
        });
    });
});
