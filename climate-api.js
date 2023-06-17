const PORT = process.env.PORT || 3001
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors');
const app = express();
const puppeteer = require('puppeteer');

app.use(cors());

const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'wired',
        address: 'https://www.wired.com/tag/blogs/',
        base: '',
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        })
})

app.get('/', (req, res) => {
    
})

app.get('/news', (req, res) => {
    const promises = newspapers.map(newspaper => {
    return axios.get(newspaper.address).then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr('href');
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name
        });
      });
    });
  });
  Promise.all(promises).then(() => {
    res.send(articles);
  });
})

app.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  if (!searchTerm) {
    return res.status(400).send({ error: 'Missing search term' });
  }
  const articles = []
  const promises = newspapers.map(newspaper => {
    return axios.get(newspaper.address).then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('a:contains(' + searchTerm + ')', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr('href');
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name
        });
      });
    });
  });
  Promise.all(promises).then(() => {
    res.send(articles);
  });
});

app.get('/youtube', async (req, res) => {
    let youtubeVideos = [];
    console.log("startin youtube")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com');
    await page.waitForSelector('a#video-title-link');

    const videoData = await page.evaluate(() => {
        const videos = document.querySelectorAll('a#video-title-link');
        const videoArray = [];
        videos.forEach(video => {
            videoArray.push({
                title: video.getAttribute('aria-label'),
                link: video.getAttribute('href')
            });
        });
        return videoArray;
    });

    youtubeVideos = videoData;
    await browser.close();
    res.json(youtubeVideos);
});


app.get('/youtube/:searchTerm', async (req, res) => {
    const searchTerm = req.params.searchTerm;
    if (!searchTerm) {
      return res.status(400).send({ error: 'Missing search term' });
    }
    let youtubeVideos = [];
    console.log("startin youtube")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query='+ searchTerm);
    await page.waitForSelector('a#video-title');
    const videoData = await page.evaluate(() => {
        console.log('evaluating');
        const videos = document.querySelectorAll('a#video-title');
        const videoArray = [];
        videos.forEach(video => {
            videoArray.push({
                title: video.getAttribute('aria-label'),
                link: video.getAttribute('href')
            });
        });
        return videoArray;
    }, (result) => {
        console.log(`Evaluated successfully: ${JSON.stringify(result)}`);
    });
    youtubeVideos = videoData;
    await browser.close();
    res.json(youtubeVideos);
});


app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base


    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))