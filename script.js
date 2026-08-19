// Переменные для хранения данных
let allOpportunities = [];

document.addEventListener("DOMContentLoaded", () => {
    loadOpportunities();
    setupSearchAndFilters();
    setupUpdateTrigger();
});

// 1. Загрузка данных из data.json
async function loadOpportunities() {
    const container = document.getElementById("cards-container");
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("Файл data.json не найден");
        
        allOpportunities = await response.json();
        renderCards(allOpportunities);
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        if (container) {
            container.innerHTML = `<p style="color: #666; text-align: center; padding: 2rem;">
                Данные загружаются или парсер еще не сгенерировал data.json.
            </p>`;
        }
    }
}

// 2. Отрисовка карточек на странице
function renderCards(items) {
    const container = document.getElementById("cards-container");
    if (!container) return;

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #777; padding: 2rem;">Ничего не найдено</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <div class="card-header">
                <span class="badge">${item.type || 'ВАКАНСИЯ'}</span>
                <span class="source">🌐 ${item.source || 'Международная организация'}</span>
            </div>
            <h2>${item.title}</h2>
            <p>${item.summary}...</p>
            <div class="card-footer">
                <span class="date">${item.date || 'Недавно'}</span>
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn">Подробнее</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Быстрый поиск и фильтрация по категориям (без перезагрузки страницы)
function setupSearchAndFilters() {
    const searchInput = document.querySelector('input[type="text"]') || document.querySelector('.search-input');
    const filterButtons = document.querySelectorAll('.category-btn, .filter-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = allOpportunities.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.summary.toLowerCase().includes(query)
            );
            renderCards(filtered);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.textContent.trim().toLowerCase();
            if (category.includes('все')) {
                renderCards(allOpportunities);
            } else {
                const filtered = allOpportunities.filter(item => 
                    (item.type && item.type.toLowerCase().includes(category)) ||
                    item.title.toLowerCase().includes(category)
                );
                renderCards(filtered);
            }
        });
    });
}

// 4. Логика кнопки "Поиск обновлений"
function setupUpdateTrigger() {
    const updateBtn = document.querySelector('.search-btn') || document.querySelector('#update-btn');
    if (!updateBtn) return;

    updateBtn.addEventListener('click', async () => {
        // Замените на сгенерированный токен
        const token = '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';
        const owner = 'Kana575';
        const repo = '-'; // Название вашего репозитория на GitHub

        updateBtn.disabled = true;
        const originalText = updateBtn.innerText;
        updateBtn.innerText = 'Запуск парсера...';

        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/main.yml/dispatches`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ref: 'main' })
            });

            if (response.ok) {
                alert(' Поиск запущен на сервере GitHub! Новые вакансии и гранты появятся на сайте через 1–2 минуты.');
            } else {
                alert(' Не удалось запустить обновление. Проверьте настройки репозитория.');
            }
        } catch (err) {
            console.error(err);
            alert('Ошибка сети при отправке запроса.');
        } finally {
            updateBtn.disabled = false;
            updateBtn.innerText = originalText;
        }
    });
}
