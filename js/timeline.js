/**
 * 博客时间线 - 呓语梦轩
 * JavaScript 功能实现
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // 获取DOM元素
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const timelineContainer = document.getElementById('timeline-container');
    const yearNavigation = document.getElementById('year-navigation');
    
    // 模板元素
    const yearTemplate = document.getElementById('year-template');
    const monthTemplate = document.getElementById('month-template');
    const articleTemplate = document.getElementById('article-template');

    // API地址
    const apiUrl = 'https://link.m-c.top/blog/output/timeline.json';

    // 主题切换功能
    themeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // 检查用户之前的主题偏好
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // 返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('opacity-100');
            backToTop.classList.remove('opacity-0', 'invisible');
        } else {
            backToTop.classList.remove('opacity-100');
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 格式化日期函数
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    }

    // 获取月份名称
    function getMonthName(month) {
        const monthNames = [
            '一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'
        ];
        return monthNames[parseInt(month) - 1];
    }

    // 从API获取数据
    async function fetchTimelineData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('获取时间线数据失败:', error);
            timelineContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="inline-block p-3 rounded-full bg-red-100">
                        <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                    </div>
                    <p class="mt-4 text-gray-600">加载数据失败，请稍后再试</p>
                </div>
            `;
            return null;
        }
    }

    // 渲染时间线
    function renderTimeline(data) {
        // 清空容器
        timelineContainer.innerHTML = '';
        yearNavigation.innerHTML = '';
        
        if (!data) return;
        
        // 获取所有年份并排序（降序）
        const years = Object.keys(data).sort((a, b) => b - a);
        
        // 创建年份导航
        years.forEach(year => {
            const yearLink = document.createElement('a');
            yearLink.href = `#year-${year}`;
            yearLink.textContent = year;
            yearLink.classList.add('year-nav-link');
            yearNavigation.appendChild(yearLink);
        });
        
        // 为每个年份创建部分
        let articleCount = 0;
        years.forEach(year => {
            // 克隆年份模板
            const yearSection = yearTemplate.content.cloneNode(true);
            const yearElement = yearSection.querySelector('.year-section');
            yearElement.id = `year-${year}`;
            
            // 设置年份值
            yearSection.querySelector('.year-value').textContent = year + '年';
            
            const monthContainer = yearSection.querySelector('.month-container');
            
            // 获取该年份的所有月份并排序（降序）
            const months = Object.keys(data[year]).sort((a, b) => b - a);
            
            // 为每个月份创建部分
            months.forEach(month => {
                // 克隆月份模板
                const monthSection = monthTemplate.content.cloneNode(true);
                
                // 设置月份值
                monthSection.querySelector('.month-value').textContent = getMonthName(month);
                
                const articleContainer = monthSection.querySelector('.article-container');
                
                // 获取该月份的所有文章
                const articles = data[year][month];
                
                // 为每篇文章创建条目
                articles.forEach(article => {
                    // 使用单边模板
                    const articleItem = articleTemplate.content.cloneNode(true);
                    
                    // 设置文章日期
                    const dateObj = new Date(article.date);
                    articleItem.querySelector('.article-date').textContent = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日`;
                    
                    // 设置文章标题和链接
                    const titleLink = articleItem.querySelector('.article-title a');
                    titleLink.textContent = article.title;
                    titleLink.href = article.url;
                    
                    // 添加到文章容器
                    articleContainer.appendChild(articleItem);
                    articleCount++;
                });
                
                // 添加到月份容器
                monthContainer.appendChild(monthSection);
            });
            
            // 添加到时间线容器
            timelineContainer.appendChild(yearSection);
        });
        
        // 添加年份导航点击事件
        document.querySelectorAll('.year-nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // 更新活动状态
                    document.querySelectorAll('.year-nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        
        // 默认激活第一个年份
        if (document.querySelector('.year-nav-link')) {
            document.querySelector('.year-nav-link').classList.add('active');
        }
    }

    // 监听滚动更新年份导航活动状态
    function updateYearNavigation() {
        const yearSections = document.querySelectorAll('.year-section');
        const yearLinks = document.querySelectorAll('.year-nav-link');
        
        if (yearSections.length === 0 || yearLinks.length === 0) return;
        
        let currentYearId = null;
        
        // 找到当前可见的年份部分
        yearSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentYearId = section.id;
            }
        });
        
        if (currentYearId) {
            // 更新导航活动状态
            yearLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentYearId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateYearNavigation);

    // 初始化：获取数据并渲染时间线
    (async function init() {
        const data = await fetchTimelineData();
        renderTimeline(data);
    })();
});
