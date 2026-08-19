let allOpportunities = [];

document.addEventListener("DOMContentLoaded", () => {
    loadOpportunities();
    setupSearchAndFilters();
    setupUpdateTrigger();
});

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

function renderCards(items) {
    const container = document.getElementById("cards-container");
    if (!container) return;

    container.innerHTML = "";

    if (!items || items.length === 0) {
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
            <h2>${item.title || ''}</h2>
            <p>${item.summary || ''}</p>
            <div class="card-footer">
                <span class="date">${item.date || 'Недавно'}</span>
                <a href="${item.link || '#'}" target="_blank" rel="noopener noreferrer" class="btn">Подробнее</a>
            </div>
        `;
        container.appendChild(card);
    });
}

function setupSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-chip');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = allOpportunities.filter(item => 
                (item.title && item.title.toLowerCase().includes(query)) || 
                (item.summary && item.summary.toLowerCase().includes(query))
            );
            renderCards(filtered);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category').toLowerCase();
            if (category === 'all') {
                renderCards(allOpportunities);
            } else {
                const filtered = allOpportunities.filter(item => 
                    item.type && item.type.toLowerCase().includes(category)
                );
                renderCards(filtered);
            }
        });
    });
}

function setupUpdateTrigger() {
    const updateBtn = document.getElementById('update-btn');
    if (!updateBtn) return;

    updateBtn.addEventListener('click', async () => {
        const token = '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';
        const owner = 'Kana575';
        const repo = 'Kana.news company'; 

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
                alert('Поиск запущен на сервере GitHub! Новые вакансии и гранты появятся на сайте через 1–2 минуты.');
            } else {
                alert('Не удалось запустить обновление. Проверьте название репозитория в скрипте.');
            }
        } catch (err) {
            console.error(err);
            alert('Ошибка сети при отправке запроса.');
        } finally {
            updateBtn.disabled = false;
            updateBtn.innerText = originalText;
        }
    });
}            const query = e.target.value.toLowerCase().trim();
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

            const category = btn.dataset.category.toLowerCase();
            if (category === 'all') {
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

function setupUpdateTrigger() {
    const updateBtn = document.getElementById('update-btn');
    if (!updateBtn) return;

    updateBtn.addEventListener('click', async () => {
        const token = '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';
        const owner = 'Kana575';
        const repo = '-'; 

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
                alert('Поиск запущен на сервере GitHub! Новые вакансии и гранты появятся на сайте через 1–2 минуты.');
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
