
from bs4 import BeautifulSoup
import requests
import re
import pprint
import pandas as pd

category = ["today","trending","india","tamil+nadu","international","finance","business","sports"]


# scrape cleaned urls
def scrape_cleaned_urls(URLs):
    Heading = []
    Articles = []
    for url in URLs:
        r = requests.get(url[0])
        soup = BeautifulSoup(r.text, 'html.parser')
        heading = soup.find_all('h1')
        head = [head.text for head in heading]
        Heading.append(head[0])
        results = soup.find_all('p')
        text = [res.text for res in results]
        words = ' '.join(text).split(' ')[:250]
        ARTICLE = ' '.join(words)
        Articles.append(ARTICLE)
    return Heading,Articles



for i in category:
    url_df = pd.read_csv("data/{}.csv".format(i))
    head,art = scrape_cleaned_urls(url_df.values.tolist())
    url_df['heading'] = head
    url_df['articles'] = art
    url_df.to_csv('{}.csv'.format(i),index=False)



