// Измени const на let для возможности обновления массива
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

  // Новые карточки, которые добавятся при нажатии
  const newItems = [
    {
      id: 4,
      title: "Волонтерство в сфере экологии",
      type: "event",
      typeLabel: "Мероприятие",
      source: "EcoYouth Alliance",
      age: "16-28 лет",
      location: "Алматы / Полевой выезд",
      desc: "Проект по высадке деревьев и мониторингу экосистемы региона с международной сертификацией.",
      url: "https://www.un.org",
      hashtags: "#Экология #Волонтерство #GreenYouth"
    },
    {
      id: 5,
      title: "Грант на исследование Международных Отношений",
      type: "grant",
      typeLabel: "Грант",
      source: "Global Academic Hub",
      age: "18-30 лет",
      location: "Европа / Дистанционно",
      desc: "Стипендия для молодых исследователей в области публичной дипломатии и аналитики.",
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
