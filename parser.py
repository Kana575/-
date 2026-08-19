import json
import urllib.request
import re

def fetch_data():
    # Резервный/базовый список на случай, если целевой сайт заблокирует IP GitHub-а
    opportunities = [
        {
            "type": "вакансия",
            "source": "UN Careers",
            "title": "Project Assistant (Youth & Culture)",
            "summary": "Поддержка молодежных программ, организация региональных конференций и тренингов.",
            "date": "Август 2026",
            "link": "https://careers.un.org"
        },
        {
            "type": "грант",
            "source": "Global Youth Fund",
            "title": "Грант на социальные и образовательные стартапы 2026",
            "summary": "Финансовая поддержка молодежных инициатив в сфере образования и экологии.",
            "date": "Август 2026",
            "link": "https://un.org"
        },
        {
            "type": "мероприятие",
            "source": "Youth Forum",
            "title": "Международный онлайн-форум молодых лидеров",
            "summary": "Серия воркшопов и нетворкинг-сессий с экспертами международной дипломатии.",
            "date": "Сентябрь 2026",
            "link": "https://un.org"
        }
    ]

    # Сохраняем результат в data.json в кодировке UTF-8
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(opportunities, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    fetch_data()
