window.openPostModal = function(id) {
      const item = opportunities.find(o => o.id === id);
      if (!item) return;

      linkedinPostText.value = `📢 ВОЗМОЖНОСТЬ ДЛЯ МОЛОДЕЖИ (16-35 ЛЕТ)\n\n📌 ${item.title}\n\n📍 Локация: ${item.location}\n👥 Возраст: ${item.age}\n🌐 Источник: ${item.source}\n\n📝 Описание:\n${item.desc}\n\n🔗 Ссылка на источник в комментариях или описании.\n\n${item.hashtags} #YouthOpportunities`;

      modalOverlay.classList.add('active');
    };

    closeModal.onclick = function() {
      modalOverlay.classList.remove('active');
    };

    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    };