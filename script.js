function renderCards(items) {
    const container = document.getElementById("cards-container");
    if (!container) return;

    container.innerHTML = "";

    if (!items || items.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #777; grid-column: 1/-1; padding: 2rem;">Ничего не найдено</p>`;
        return;
    }

    items.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "card";

        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.link)}`;

        // Текст поста
        const postText = `📌 Новая возможность: ${item.title}\n\n` +
                         `🏢 Организация: ${item.source}\n` +
                         `🏷 Тип: ${item.type.toUpperCase()}\n` +
                         `📝 Описание: ${item.summary}\n\n` +
                         `🔗 Ссылка: ${item.link}\n\n` +
                         `#YouthOpportunities #Opportunities #Career #Youth`;

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

// Показ окна с готовым текстом поста
function openLinkedinModal(encodedText, shareUrl) {
    const text = decodeURIComponent(encodedText);

    // Удаляем старое модальное окно, если есть
    const oldModal = document.getElementById("linkedin-modal");
    if (oldModal) oldModal.remove();

    // Создаем новое модальное окно
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
