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

        // Формируем красивый готовый пост
        const postText = `📌 ${item.title}\n\n` +
                         `🏢 Организация: ${item.source}\n` +
                         `🏷 Тип: ${item.type.toUpperCase()}\n` +
                         `📝 ${item.summary}\n\n` +
                         `🔗 Подробнее: ${item.link}\n\n` +
                         `#YouthOpportunities #Career #Grants #Jobs`;

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
                    <button class="btn btn-linkedin" onclick="copyAndOpenLinkedin(\`${encodeURIComponent(postText)}\`, \`${linkedinUrl}\`)">
                        Пост в LinkedIn
                    </button>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn">Подробнее</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Функция копирования в буфер обмена и открытия окна LinkedIn
function copyAndOpenLinkedin(encodedText, shareUrl) {
    const text = decodeURIComponent(encodedText);

    // Копируем текст поста в буфер обмена
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }

    // Показываем аккуратное уведомление пользователю
    showNotification("Текст поста скопирован! Нажмите Ctrl+V в окне LinkedIn.");

    // Открываем LinkedIn в новом окне через 0.5 сек
    setTimeout(() => {
        window.open(shareUrl, '_blank');
    }, 500);
}

// Всплывающее уведомление на экране
function showNotification(message) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0a66c2;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 4000);
}
