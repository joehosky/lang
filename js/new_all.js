// 取得 DOM 元素
const Sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleBtn = document.getElementById('toggleBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const overlay = document.getElementById('overlay');

// *****根據主題更新 logo 圖片*****
function updateLogo() {
    const logo = document.getElementById('sidebarLogo');
    const isDark = document.body.classList.contains('dark-theme');
    logo.src = isDark
        ? 'images/index/logo_black.png'
        : 'images/index/logo_white.png';
}


// *****根據視窗寬度與側邊欄狀態，設定主畫面與側邊欄位置與寬度*****
function setLayout() {
    const w = window.innerWidth;
    // 桌機寬度以上
    if (w >= 1024) {
        overlay.classList.remove('show');  // 電腦版不顯示黑幕
        if (!Sidebar.classList.contains('collapsed')) {
            Sidebar.style.left = '0';
            Sidebar.style.width = '250px';
            mainContent.classList.remove('collapsed', 'fullwidth');
            mainContent.style.marginLeft = '250px';
        } else {
            Sidebar.style.left = '0';
            Sidebar.style.width = '0';  // 若想讓側邊欄出來一點，可把0改為想要的寬度，如80px
            mainContent.classList.add('collapsed');
            mainContent.classList.remove('fullwidth');
            mainContent.style.marginLeft = '0';  // 須和上方改變的寬度一致
        }
    } else {
        // 行動裝置模式
        if (Sidebar.classList.contains('show')) {
            Sidebar.style.left = '0';
            mainContent.classList.add('fullwidth');
            mainContent.style.marginLeft = '0';
            overlay.classList.add('show');  // 手機展開時顯示黑幕
        } else {
            Sidebar.style.left = '-250px';
            mainContent.classList.add('fullwidth');
            mainContent.style.marginLeft = '0';
            overlay.classList.remove('show');  // 手機關閉時隱藏黑幕
        }
    }
}


// *****點擊漢堡按鈕，展開或收合側邊欄*****
toggleBtn.addEventListener('click', () => {
    const w = window.innerWidth;
    if (w >= 1024) {
        Sidebar.classList.toggle('collapsed');
    } else {
        Sidebar.classList.toggle('show');
    }
    setLayout();
});


// *****手機板-點擊黑幕，隱藏側邊欄與黑幕*****
overlay.addEventListener('click', () => {
    Sidebar.classList.remove('show');
    overlay.classList.remove('show');
    setLayout(); // 重設畫面
});


// *****視窗縮放時，自動調整版面*****
window.addEventListener('resize', setLayout);
setLayout();


// *****切換主題模式：點擊後在 body 加上或移除 dark-theme class*****
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    // 儲存使用者偏好主題
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // 替換 icon 類別（太陽與月亮圖示互換）
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
    // 加入動畫效果，0.5 秒後自動移除
    themeToggle.classList.add('animate');
    setTimeout(() => themeToggle.classList.remove('animate'), 500);
    updateLogo(); // 更新logo圖
});


// *****手機版-導覽列的資訊列下滑顯示控制*****
const navBtnToggle = document.getElementById('navBtnToggle');
const navMobile = document.querySelector('.nav_mobile');

navBtnToggle.addEventListener('click', () => {
    if (navMobile.style.display === 'none' || navMobile.style.display === '') {
        navMobile.style.display = 'flex';
        navMobile.classList.add('slide-down');
    } else {
        navMobile.style.display = 'none';
        navMobile.classList.remove('slide-down');
    }
});


// *****載入頁面時，自動套用使用者偏好或系統預設主題*****
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    updateLogo(); // 更新logo圖
});


// *****導覽列-同步語言選單選擇*****
const languageSelects = document.querySelectorAll('.language-select');
    languageSelects.forEach(select => {
    select.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        languageSelects.forEach(otherSelect => {
            if (otherSelect !== e.target) {
                otherSelect.value = selectedValue;
            }
        });
        // 可加載語系切換程式邏輯
        console.log("切換語言：", selectedValue);
    });
});


// *****左側欄內選單 - 點擊母選單展開/收合子選單（使用 display 控制）*****
document.addEventListener('DOMContentLoaded', function () {
    const allLinks = document.querySelectorAll('.sidebar_list .link');
    // 初始全部關閉
    const allSubmenus = document.querySelectorAll('.submenu');
    allSubmenus.forEach(menu => {
        menu.classList.remove('open');
        menu.style.display = 'none';  // 關閉時確保不顯示
        menu.style.maxHeight = null;
    });
    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const submenu = this.nextElementSibling;
            if (!submenu || !submenu.classList.contains('submenu')) return;
            e.preventDefault();
            // 移除其他箭頭的旋轉狀態
            document.querySelectorAll('.arrow-icon.rotate').forEach(icon => {
                icon.classList.remove('rotate');
            });
            // 抓取當前點擊項目內的箭頭 icon
            const arrowIcon = this.querySelector('.arrow-icon');
            // 收合其他展開中的 submenu
            document.querySelectorAll('.submenu.open').forEach(openSubmenu => {
                openSubmenu.classList.remove('open');
                openSubmenu.style.display = 'none';
                openSubmenu.style.maxHeight = null;
            });
            // 切換 submenu 展開/收合
            if (!submenu.classList.contains('open')) {
                submenu.classList.add('open');
                submenu.style.display = 'block';
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
                if (arrowIcon) arrowIcon.classList.add('rotate');
            } else {
                submenu.classList.remove('open');
                submenu.style.display = 'none';
                submenu.style.maxHeight = null;
                if (arrowIcon) arrowIcon.classList.remove('rotate');
            }
        });
    });
    // 點擊頁面其他地方時，自動關閉所有選單
    document.addEventListener('click', function(event) {
        // 判斷點擊目標是否在 sidebar 內
        const isClickInsideSidebar = Sidebar.contains(event.target);
        if (!isClickInsideSidebar) {
            // 點擊外部，收合所有 submenu
            document.querySelectorAll('.submenu.open').forEach(openSubmenu => {
                openSubmenu.classList.remove('open');
                openSubmenu.style.display = 'none';
                openSubmenu.style.maxHeight = null;
            });
        }
    });
});


// *****回到頂端按鈕*****
document.addEventListener('DOMContentLoaded', function () {
    const goTopBtn = document.querySelector('.go_top');

    // 初始化按鈕狀態
    goTopBtn.style.opacity = '0';
    goTopBtn.style.transition = 'opacity 0.3s ease';
    goTopBtn.style.pointerEvents = 'none'; // 預設不能點

    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 250) {
            goTopBtn.style.opacity = '1';
            goTopBtn.style.pointerEvents = 'auto';
        } else {
            goTopBtn.style.opacity = '0';
            goTopBtn.style.pointerEvents = 'none';
        }
    });

    // 點擊回到頂部
    goTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// *****密碼-眼睛開關 JS(可無限增加)*****
function togglePasswordVisibility(eyeId, inputId) {
    const eye = document.getElementById(eyeId);
    const input = document.getElementById(inputId);

    if (!eye || !input) return;

    eye.addEventListener('click', function (e) {
        const isEye = e.target.classList.contains('fa-eye');
        e.target.classList.toggle('fa-eye', !isEye);
        e.target.classList.toggle('fa-eye-slash', isEye);
        input.setAttribute('type', isEye ? 'text' : 'password');
    });
}
// 密碼-眼睛開關，使用ID
togglePasswordVisibility('checkEye', 'inputPW');
togglePasswordVisibility('checkEye2', 'inputPW2');
togglePasswordVisibility('checkEye3', 'inputPW3');


//加入/取消我的最愛
document.addEventListener("DOMContentLoaded", function () {
    const heartIcons = document.querySelectorAll(".btn_icon.btn_heart");

    heartIcons.forEach(function (icon) {
        icon.addEventListener("click", function (e) {
            e.stopPropagation(); // 防止事件冒泡
            icon.classList.toggle("selected");
        });
    });
});