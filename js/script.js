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
                hitokotoElement.textContent = '于梦中呓语千里，吾见本心，看见世界！';
            }
        });
}

// 初始化AOS动画
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // 获取一言
    fetchHitokoto();

    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 运行时间计算
    const runningTimeElement = document.getElementById('running-time');
    
    if (runningTimeElement) {
        const startDate = new Date('2023-05-25');
        setInterval(() => {
            const now = new Date();
            const diff = now - startDate;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            runningTimeElement.textContent = `${days}天${hours}小时${minutes}分`;
        }, 1000);
    }
});
