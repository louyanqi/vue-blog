import requests
from bs4 import BeautifulSoup
import re

url_list = ['https://www.pexels.com/?page={}'.format(i) for i in range(0, 10)]
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
}

img_list = []


def get_img_url(url):
    wb_data = requests.get(url, headers=headers)
    soup = BeautifulSoup(wb_data.text, 'lxml')
    for link in soup.select('article a img'):
        url = link.get('data-pin-media')
        re_url = re.findall('(.*?)\?w=800&h=1200&fit=crop&auto=compress&cs=tinysrgb', url)
        img_list.append(re_url)
        print(re_url[0])


for url in url_list:
    get_img_url(url)
print('#'*65)
print('#'*65)
print('#'*65)
print(img_list)
with open('img_url.txt', 'w') as f:
    for i in img_list:
        f.write(i[0] + '\n')
