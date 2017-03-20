import re


str1 = '![](http://upload-images.jianshu.io/upload_images/2222847-3c1d6404943c877e.pn' \
       'g?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)'
L = re.compile('!\[]\((.*?)\)')
f = re.search('!\[]\((.*?)\)', str1)
print(f.group(1))