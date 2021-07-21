
from bs4 import BeautifulSoup
import requests
from transformers import PegasusTokenizer, PegasusForConditionalGeneration
import re
import pprint
import pandas as pd

model_name = "google/pegasus-multi_news"
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name)
category = ["today","trending","india","tamil+nadu","international","finance","business","sports"]



# summarize the articles using transformers
def summarize(articles):
    summaries = []
    for article in articles:
        input_ids = tokenizer.encode(article[0], return_tensors="pt")
        output = model.generate(input_ids, max_length=50, num_beams=5, early_stopping=True)
        summary = tokenizer.decode(output[0], skip_special_tokens=True)
        summaries.append(summary)
    return summaries


for i in category:
    art_df = pd.read_csv("data/scrape_data_2/{}.csv".format(i))
    sum_df = summarize(art_df.values.tolist())
    art_df['summary'] = sum_df
    art_df.to_csv('{}.csv'.format(i),index=False)


