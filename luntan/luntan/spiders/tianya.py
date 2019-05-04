# -*- coding: utf-8 -*-

import scrapy

from luntan.items import LuntanItem


class TianyaSpider(scrapy.Spider):
    name = "tianya"
    allowed_domains = ["bbs.tianya.cn"]
    start_urls = ['http://bbs.tianya.cn/list-1179-1.shtml',
    'http://bbs.tianya.cn/list.jsp?item=1179&nextid=1556938543000']

    def parse(self, response):
        item = LuntanItem()
        ns = {"re": "http://exslt.org/regular-expressions"}
        for col in response.xpath('//*[@id="main"]/div[7]/table/tbody/tr'):
            #xpath抓取的值含有/r/n/t，用normalize-space()去掉
            item['title'] = col.xpath('normalize-space(td[1]/a/text())').extract()
            item['author'] = col.xpath('normalize-space(td[2]/a/text())').extract()
            item['click_num'] = col.xpath('td[3]/text()').extract()
            item['response_num'] = col.xpath('td[4]/text()').extract()
            item['response_date'] = col.xpath('td[5]/text()').extract()
            yield item
        next = response.xpath('//*[@id="main"]/div[8]/div/a[3]/@href').extract_first()
        if next is not None:
            url = response.urljoin(next)
            yield scrapy.Request(url,callback = self.parse)
