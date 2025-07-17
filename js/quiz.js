// *****考試*****
// 考試-先取得必要 DOM 元素
const pageLinks = document.querySelectorAll('.page-link');
const questionSections = document.querySelectorAll('.testcard_questions');
const nextBtn = document.querySelector('.test.btn_blue');     // 下一題
const prevBtn = document.querySelector('.test.btn_gray');     // 回上一題（你指定的樣式）
const submitBtn = document.querySelector('.test.btn_green');  // 確認送出按鈕

const questionsArray = Array.from(questionSections);
const totalPages = questionsArray.length;
let currentPage = 0; // 預設從第一題（index 0）開始

// 考試-初始化題目顯示狀態與按鈕狀態
function initializeQuestions() {
    questionsArray.forEach((section, i) => {
        section.style.display = i === 0 ? 'block' : 'none';
    });

    pageLinks.forEach((link, i) => {
        link.classList.toggle('active', i === 0);
    });
    updateButtons();
}
initializeQuestions();

// 考試-根據當前題號更新按鈕顯示狀態
function updateButtons() {
    prevBtn.style.display = currentPage > 0 ? 'inline-block' : 'none';
    nextBtn.style.display = currentPage < totalPages - 1 ? 'inline-block' : 'none';
    submitBtn.style.display = currentPage === totalPages - 1 ? 'inline-block' : 'none';
}
// 考試-切換到指定題號
function goToPage(index) {
    if (index < 0 || index >= totalPages) return;

    questionsArray.forEach((section, i) => {
        section.style.display = i === index ? 'block' : 'none';
    });

    pageLinks.forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });

    currentPage = index;
    updateButtons();
}
// 考試-點選頁碼，切換題目
pageLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(index);
    });
});
// 考試-下一題
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
    }
});
// 考試-回上一題
prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        goToPage(currentPage - 1);
    }
});