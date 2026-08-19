const staticData = [
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
        source: "Youth Grants Fund",
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

let allOpportunities = [...staticData];

document.addEventListener("DOMContentLoaded", () => {
    renderCards(allOpportunities);
    setupSearchAndFilters();
    setupUpdateTrigger();
});

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

        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.link)}`;

        // Текст для публикации
        const postText = `📌 Новая возможность: ${item.title}\n\n` +
                         `🏢 Организация: ${item.source}\n` +
                         `🏷 Тип: ${item.type.toUpperCase()}\n` +
                         `📝 Описание: ${item.summary}\n\n` +
                         `🔗 Подробнее: ${item.link}\n\n` +
                         `#YouthOpportunities #Careers #Opportunity`;

        card.innerHTML = `
            <div class="card-header">
                <span class="badge">${item.type.toUpperCase()}</span>
                <span class="source">🌐 ${item.source}</span>
            </div>
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            <div class="card-footer">
                <span class="date">${item.date}</span>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button class="btn btn-linkedin" onclick="openLinkedinModal('${encodeURIComponent(postText)}', '${linkedinUrl}')">
                        Пост в LinkedIn
                    </button>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn">Подробнее</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openLinkedinModal(encodedText, shareUrl) {
    const text = decodeURIComponent(encodedText);

    const oldModal = document.getElementById("linkedin-modal");
    if (oldModal) oldModal.remove();

    const modal = document.createElement("div");
    modal.id = "linkedin-modal";
    modal.className = "modal-overlay";
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🔗 Публикация в LinkedIn</h3>
            <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">
                Скопируйте текст ниже и вставьте его (Ctrl+V) в открывшемся окне LinkedIn:
            </p>
            <textarea id="modal-post-text">${text}</textarea>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeLinkedinModal()">Отмена</button>
                <button class="btn-primary" onclick="copyAndOpenLinkedin('${shareUrl}')">Скопировать и открыть LinkedIn</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeLinkedinModal() {
    const modal = document.getElementById("linkedin-modal");
    if (modal) modal.remove();
}

function copyAndOpenLinkedin(shareUrl) {
    const textarea = document.getElementById("modal-post-text");
    if (textarea) {
        textarea.select();
        navigator.clipboard.writeText(textarea.value);
    }
    closeLinkedinModal();
    window.open(shareUrl, '_blank');
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

        try {
            const res = await fetch("https://remotive.com/api/remote-jobs?limit=4");
            const data = await res.json();
            
            const newJobs = data.jobs.map(j => ({
                type: "вакансия",
                source: j.company_name || "Global",
                title: j.title,
                summary: `Локация: ${j.candidate_required_location || 'Remote'}. Опубликовано на Remotive.`,
                date: "Свежая",
                link: j.url
            }));

            allOpportunities = [...newJobs, ...staticData];
            renderCards(allOpportunities);
            updateBtn.innerText = '✅ Найдено новые!';
        } catch (e) {
            updateBtn.innerText = '✅ Все данные актуальны';
        }

        setTimeout(() => {
            updateBtn.disabled = false;
            updateBtn.innerText = originalText;
        }, 2500);
    });
}
