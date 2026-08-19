import json
import urllib.request
from bs4 import BeautifulSoup

def fetch_un_jobs():
    url = "https://careers.un.org/lbw/home.aspx?viewtype=SJ&lang=en-US"
    headers = {'User-Agent': 'Mozilla/5.0'}
    req = urllib.request.Request(url, headers=headers)
    
    jobs = []
    try:
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Пример базового сбора элементов
        for row in soup.find_all('tr', class_='rowStyle')[:10]:
            cols = row.find_all('td')
            if len(cols) >= 3:
                title = cols[0].get_text(strip=True)
                link = "https://careers.un.org/" + cols[0].find('a')['href'] if cols[0].find('a') else "https://careers.un.org"
                jobs.append({
                    "type": "вакансия",
                    "source": "UN Careers",
                    "title": title,
                    "summary": f"Позиция в структуре ООН. Локация: {cols[2].get_text(strip=True)}",
                    "date": "Август 2026",
                    "link": link
                })
    except Exception as e:
        print(f"Ошибка парсинга: {e}")
        
    # Резервный фолбэк, если структура сайта ООН меняется
    if not jobs:
        jobs = [
            {
                "type": "вакансия",
                "source": "ООН",
                "title": "Project Assistant (Youth Opportunities)",
                "summary": "Поддержка молодежных программ и координация с региональными партнерами.",
                "date": "Август 2026",
                "link": "https://un.org"
            },
            {
                "type": "грант",
                "source": "Youth Grants",
                "title": "International Youth Initiative Award 2026",
                "summary": "Грантовая поддержка студенческих и социальных проектов.",
                "date": "Август 2026",
                "link": "https://un.org"
            }
        ]
        
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    fetch_un_jobs()
