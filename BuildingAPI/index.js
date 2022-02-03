

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const res = require('express/lib/response')


const app = express()

app.use(express.json())

axios('https://www.theguardian.com/international')
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.u-faux-block-link__overlay',html).each(function(){
            const title =$(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })

        })
        console.log(articles)
        
        
    })

app.listen(4000)
