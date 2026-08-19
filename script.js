const initialData = [
    {
        type: "вакансия",
        source: "ООН",
        title: "Project Assistant (Youth Opportunities)",
        summary: "Поддержка молодежных программ, организация семинаров и координация с региональными партнерами.",
        date: "Август 2026",
        link: "https://careers.un.org"
    },
    {
        type: "грант",
        source: "Youth Grants",
        title: "International Youth Initiative Award 2026",
        summary: "Грантовая поддержка студенческих и социальных проектов по всему миру.",
        date: "Август 2026",
        link: "https://un.org"
    },
    {
        type: "мероприятие",
        source: "UN Volunteers",
        title: "Молодежный онлайн-форум по устойчивому развитию",
        summary: "Серия воркшопов, лекций и нетворкинг-сессий с экспертами международной дипломатии.",
        date: "Сентябрь 2026",
        link: "https://unv.org"
    }
];

let allOpportunities = [];

document.addEventListener("DOMContentLoaded", () => {
    loadOpportunities();
    setupSearchAndFilters();
    setupUpdateTrigger();
});

async function loadOpportunities() {
    try {
        const response = await fetch("data.json?cache=" + Math.random());
        if (!response.ok) throw new Error("Файл data.json недоступен");
        allOpportunities = await response.json();
    } catch (error) {
        console.warn("Использован базовый список:", error);
        allOpportunities = initialData;
    }
    renderCards(allOpportunities);
}

function renderCards(items) {
    const container = document.getElementById("cards-container");
    if (!container) return;

    container.innerHTML = "";

    if (!items || items.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #777; grid-column: 1/-1; padding: 2rem;">Ничего не найдено</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("article");
        card.className = "card";
        
        // Генерация ссылки для репоста в LinkedIn
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.link || window.location.href)}`;

        card.innerHTML = `
            <div class="card-header">
                <span class="badge">${item.type || 'ВАКАНСИЯ'}</span>
                <span class="source">🌐 ${item.source || 'Источник'}</span>
            </div>
            <h2>${item.title || ''}</h2>
            <p>${item.summary || ''}</p>
            <div class="card-footer">
                <span class="date">${item.date || 'Недавно'}</span>
                <div style="display: flex; gap: 8px;">
                    <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="background-color: #0a66c2; border-color: #0a66c2;">
                        🔗 LinkedIn
                    </a>
                    <a href="${item.link || '#'}" target="_blank" rel="noopener noreferrer" class="btn">Подробнее</a>
                </div>
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
        updateBtn.disabled = true;
        const originalText = updateBtn.innerText;
        updateBtn.innerText = '⏳ Поиск...';

        // Имитация/вызов обновления данных
        setTimeout(async () => {
            await loadOpportunities();
            updateBtn.innerText = '✅ Обновлено';
            setTimeout(() => {
                updateBtn.disabled = false;
                updateBtn.innerText = originalText;
            }, 2000);
        }, 1200);
    });
}
