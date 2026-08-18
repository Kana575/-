document.addEventListener('DOMContentLoaded', () => {
  let opportunities = [
    {
      id: 1,
      title: "Стажировка в ООН (UN Volunteers)",
      type: "vacancy",
      typeLabel: "Вакансия",
      source: "Официальный сайт ООН",
      age: "18-35 лет",
      location: "Гибрид / Международный",
      desc: "Программа профессиональных стажировок в международных отделах для молодых специалистов.",
      url: "https://www.un.org",
      hashtags: "#ООН #Стажировка #Молодежь #Карьера"
    },
    {
      id: 2,
      title: "Грант на социальные инициативы",
      type: "grant",
      typeLabel: "Грант",
      source: "Международный фонд",
      age: "16-30 лет",
      location: "Онлайн",
      desc: "Финансирование до $5,000 на реализацию образовательных и экологических проектов.",
      url: "https://www.linkedin.com",
      hashtags: "#Гранты #МолодежныеИнициативы #Финансирование"
    },
    {
      id: 3,
      title: "Международный Саммит Лидеров",
      type: "event",
      typeLabel: "Мероприятие",
      source: "LinkedIn / Соцсети",
      age: "16-35 лет",
      location: "Вена / Онлайн",
      desc: "Форум с участием экспертов международных организаций, нетворкинг и воркшопы.",
      url: "https://www.linkedin.com",
      hashtags: "#Саммит #Лидерство #Нетворкинг"
    }
  ];

  const newIncomingData = [
    {
      id: 4,
      title: "Волонтерская программа UN Migration Survey",
      type: "vacancy",
      typeLabel: "Вакансия",
      source: "UN Volunteers",
      age: "18-30 лет",
      location: "Алматы / Полевая работа",
      desc: "Сбор данных и проведение интервью для социологического исследования миграционных процессов.",
      url: "https://www.un.org",
      hashtags: "#ООН #Волонтерство #Алматы #Исследования"
    },
    {
      id: 5,
      title: "Исследовательский грант по Международным Отношениям",
      type: "grant",
      typeLabel: "Грант",
      source: "Global Academic Policy Hub",
      age: "18-35 лет",
      location: "Онлайн / Европа",
      desc: "Стипендиальная программа на публикацию аналитических материалов о глобальных институтах.",
      url: "https://www.linkedin.com",
      hashtags: "#Гранты #Аналитика #Дипломатия #МеждународныеОтношения"
    }
  ];

  const cardsGrid = document.getElementById('cardsGrid');
  const searchInput = document.getElementById('searchInput');
  const filterChips = document.querySelectorAll('.filter-chip');
  const postModal = document.getElementById('postModal');
  const linkedinPostText = document.getElementById('linkedinPostText');
  const closeModal = document.getElementById('closeModal');
  const copyPostBtn = document.getElementById('copyPostBtn');
  const fetchBtn = document.getElementById('fetchBtn');

  let currentFilter = 'all';

  function renderCards() {
    cardsGrid.innerHTML = '';
    const query = searchInput.value.toLowerCase();
    
    const filtered = opportunities.filter(item => {
      const matchesFilter = currentFilter === 'all' || item.type === currentFilter;
      const matchesSearch = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      cardsGrid.innerHTML = '<p style="text-align:center; color:#666; padding:20px;">Ничего не найдено</p>';
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'opp-card';
      card.innerHTML = `
        <div class="card-top">
          <span class="badge ${item.type}">${item.typeLabel}</span>
          <span class="source-tag">🌐 ${item.source}</span>
        </div>
        <h2 class="card-title">${item.title}</h2>
        <p class="card-desc">${item.desc}</p>
        <div class="card-meta">
          <span>👤 Возраст: ${item.age}</span>
          <span>📍 ${item.location}</span>
        </div>
        <div class="card-actions">
          <button class="action-btn secondary-btn" data-post-id="${item.id}">📲 Пост для LinkedIn</button>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="action-btn primary-btn">Источник</a>
        </div>
      `;
      cardsGrid.appendChild(card);
    });

    document.querySelectorAll('[data-post-id]').forEach(btn => {
      btn.onclick = (e) => {
        const id = parseInt(e.target.getAttribute('data-post-id'));
        openPostModal(id);
      };
    });
  }

  function openPostModal(id) {
    const item = opportunities.find(o => o.id === id);
    if (!item) return;

    linkedinPostText.value = `📢 ВОЗМОЖНОСТЬ ДЛЯ МОЛОДЕЖИ (16-35 ЛЕТ)\n\n📌 ${item.title}\n\n📍 Локация: ${item.location}\n👥 Возраст: ${item.age}\n🌐 Источник: ${item.source}\n\n📝 Описание:\n${item.desc}\n\n🔗 Ссылка на источник в комментариях или описании.\n\n${item.hashtags} #YouthOpportunities`;

    postModal.showModal();
  }

  filterChips.forEach(chip => {
    chip.onclick = function() {
      filterChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      renderCards();
    };
  });

  searchInput.oninput = renderCards;

  if (closeModal) {
    closeModal.onclick = () => postModal.close();
  }

  if (postModal) {
    postModal.onclick = (e) => {
      if (e.target === postModal) postModal.close();
    };
  }

  if (copyPostBtn) {
    copyPostBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(linkedinPostText.value);
        alert('Текст поста скопирован в буфер обмена!');
        postModal.close();
      } catch (err) {
        linkedinPostText.select();
        document.execCommand('copy');
        alert('Текст скопирован!');
        postModal.close();
      }
    };
  }

  // Реальная отрисовка новых данных при нажатии кнопки
  fetchBtn.onclick = () => {
    fetchBtn.disabled = true;
    fetchBtn.innerText = "⏳ Поиск новых возможностей...";

    setTimeout(() => {
      const existingIds = new Set(opportunities.map(o => o.id));
      const itemsToAdd = newIncomingData.filter(item => !existingIds.has(item.id));

      if (itemsToAdd.length > 0) {
        opportunities = [...itemsToAdd, ...opportunities];
        renderCards();
      } else {
        alert("Новых карточек пока нет, списки актуальны.");
      }

      fetchBtn.disabled = false;
      fetchBtn.innerText = "⚡ Поиск обновлений";
    }, 1200);
  };

  renderCards();
});      desc: "Стипендия для молодых исследователей в области публичной дипломатии и аналитики.",
      url: "https://www.linkedin.com",
      hashtags: "#Аналитика #Дипломатия #Гранты"
    }
  ];

  fetchBtn.onclick = () => {
    fetchBtn.disabled = true;
    fetchBtn.innerText = "⌛ Загрузка...";

    // Имитация задержки сети в 1.5 секунды
    setTimeout(() => {
      // Проверка, чтобы не добавлять дубли
      const existingIds = new Set(opportunities.map(o => o.id));
      const itemsToAdd = newItems.filter(item => !existingIds.has(item.id));

      if (itemsToAdd.length > 0) {
        opportunities = [...itemsToAdd, ...opportunities];
        renderCards();
        alert(`Найдено и добавлено новых возможностей: ${itemsToAdd.length}!`);
      } else {
        alert("Новых возможностей пока не найдено, база актуальна.");
      }

      fetchBtn.disabled = false;
      fetchBtn.innerText = "⚡ Поиск обновлений";
    }, 1500);
  };
