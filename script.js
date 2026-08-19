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

        // LinkedIn Share URL (открывает окно создания поста)
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.link)}`;

        // Готовый текст для публикации
        const postText = `📌 Новая возможность: ${item.title}\n\n` +
                         `🏢 Организация: ${item.source}\n` +
                         `🏷 Тип: ${item.type.toUpperCase()}\n` +
                         `📝 Описание: ${item.summary}\n\n` +
                         `🔗 Подробнее и подача заявки: ${item.link}\n\n` +
                         `#YouthOpportunities #Opportunity #Career #Youth #Grant #Jobs`;

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
                    <button class="btn btn-linkedin" onclick="shareToLinkedin('${encodeURIComponent(postText)}', '${linkedinUrl}')">
                        Пост в LinkedIn
                    </button>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn">Подробнее</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Функция копирования готового текста и перехода в LinkedIn
function shareToLinkedin(encodedText, shareUrl) {
    const text = decodeURIComponent(encodedText);
    
    // Копируем готовый пост в буфер обмена
    navigator.clipboard.writeText(text).then(() => {
        alert("📋 Готовый текст поста скопирован в буфер обмена!\n\nПросто нажмите Ctrl+V в окне LinkedIn, чтобы вставить текст.");
        window.open(shareUrl, '_blank');
    }).catch(err => {
        // Резервный вариант, если браузер заблокировал доступ к буферу
        window.open(shareUrl, '_blank');
    });
}
