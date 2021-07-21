from bs4 import BeautifulSoup
import requests
from transformers import PegasusTokenizer, PegasusForConditionalGeneration
import re
import pprint
import pandas as pd

model_name = "google/pegasus-multi_news"
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name)


# types of category of news
category = ["today","trending","india","tamil+nadu","international","finance","business","sports"]

# scrape the link from yahoo news
def scrapeNews(cat):
    search_url = 'https://www.google.com/search?q=yahoo+news+{}&tbm=nws'.format(cat)
    r = requests.get(search_url)
    soup = BeautifulSoup(r.text,'html.parser')
    atags = soup.find_all('a')
    hrefs = [link['href'] for link in atags]
    return hrefs

urls = []
for i in category:
    scrape_link = scrapeNews(i)
    urls.append(scrape_link)


# cleaning the url
exclude_list = ['maps', 'policies', 'preferences', 'accounts', 'support']
def strip_url(urls,exclude_list):
    val = []
    for url in urls:
        if 'https://' in url and not any(exc in url for exc in exclude_list):
            res = re.findall(r'(https?://\S+)', url)[0].split('&')[0]
            val.append(res)
    return list(set(val))

cleaned_urls = []
for i in urls:
    c_url = strip_url(i,exclude_list)
    cleaned_urls.append(c_url)

for i,val in enumerate(cleaned_urls):
    df = pd.DataFrame(val,columns=['url'])
    df.to_csv('{cat}.csv'.format(cat=category[i]),index=False)


