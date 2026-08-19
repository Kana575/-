// Базовый набор возможностей (гранты и мероприятия)
const staticData = [
    {
        type: "грант",
        source: "Youth Grants Fund",
        title: "International Youth Initiative Award 2026",
        summary: "Грантовая поддержка студенческих и социальных проектов по всему миру до $10,000.",
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

let allOpportunities = [...staticData];

document.addEventListener("DOMContentLoaded", () => {
    fetchLiveJobs(); // Загрузка свежих вакансий при старте
    setupSearchAndFilters();
    setupUpdateTrigger();
});

// Загрузка реальных вакансий через открытый API
async function fetchLiveJobs() {
    try {
        const response = await fetch("https://remotive.com/api/remote-jobs?limit=5");
        if (!response.ok) throw new Error("Ошибка API");
        const data = await response.json();
        
        const apiJobs = data.jobs.map(job => ({
            type: "вакансия",
            source: job.company_name || "Remote Job",
            title: job.title,
            summary: job.candidate_required_location ? `Локация: ${job.candidate_required_location}. Нажмите «Подробнее» для просмотра полного описания.` : "Удаленная работа для специалистов.",
            date: "Свежая",
            link: job.url
        }));

        // Объединяем свежие вакансии с грантами и мероприятиями
        allOpportunities = [...apiJobs, ...staticData];
    } catch (error) {
        console.warn("API недоступен, загружены локальные данные:", error);
    } finally {
        renderCards(allOpportunities);
    }
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

        // Формирование ссылки для публикации в LinkedIn
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.link)}`;

        card.innerHTML = `
            <div class="card-header">
                <span class="badge">${item.type.toUpperCase()}</span>
                <span class="source">🌐 ${item.source}</span>
            </div>
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            <div class="card-footer">
                <span class="date">${item.date}</span>
                <div style="display: flex; gap: 8px;">
                    <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-linkedin">
                        Пост в LinkedIn
                    </a>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn">Подробнее</a>
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
        updateBtn.innerText = '⏳ Поиск вакансий...';

        await fetchLiveJobs();

        updateBtn.innerText = '✅ Данные обновлены!';
        setTimeout(() => {
            updateBtn.disabled = false;
            updateBtn.innerText = originalText;
        }, 2000);
    });
}
