# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
from scrapy.conf import settings

"""
将数据保存到json文件中，在settings.py中设置ITEM_PIPELINES ={"luntan.pipelines.JsonPipeline": 200}
"""
# import codecs
# import json
# import os
#
# class LuntanPipeline(object):
#     def process_item(self, item, spider):
#         return item
#
# #以下两种写法保存json格式，需要在settings里面设置'coolscrapy.pipelines.JsonPipeline': 200
#
# class JsonPipeline(object):
#     def __init__(self):
#         self.file = codecs.open('logs.json', 'w', encoding='utf-8')
#     def process_item(self, item, spider):
#         line = json.dumps(dict(item), ensure_ascii=False) + "\n"
#         self.file.write(line)
#         return item
#     def spider_closed(self, spider):
#         self.file.close()
#
#
# class JsonPipeline(object):
#     def process_item(self, item, spider):
#         base_dir = os.getcwd()
#         filename = base_dir + '/tianya.json'
#         # 打开json文件，向里面以dumps的方式吸入数据
#         # 注意需要有一个参数ensure_ascii=False ，不然数据会直接为utf编码的方式存入比如
#         # :“/xe15”
#         with codecs.open(filename, 'a') as f:
#             line = json.dumps(dict(item), ensure_ascii=False) + '\n'
#             f.write(line)
#         return item

"""
将数据保存到mongodb中
"""
class tianyaPipeline(object):
    def __init__(self):
        host = settings["MONGODB_HOST"]
        port = settings["MONGODB_PORT"]
        dbname = settings["MONGODB_DBNAME"]
        sheetname = settings["MONGODB_SHEETNAME"]
        # 创建MONGODB数据库链接
        client = pymongo.MongoClient(host=host, port=port)
        # 指定数据库
        mydb = client[dbname]
        # 存放数据的数据库表名
        self.post = mydb[sheetname]

    def process_item(self, item, spider):
        data = dict(item)
        self.post.insert(data)
        return item