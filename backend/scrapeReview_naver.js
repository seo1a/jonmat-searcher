// scrapeReview_naver.js
import puppeteer from 'puppeteer';
import fs from 'fs';

export default async function scrapeReview_naver(req, res) {
  const { placeId } = req.body;

  console.log("placeID: ", placeId);

  if (!placeId) {
    return res.status(400).json({ error: 'placeId is required' });
  }

  const url = `https://map.naver.com/p/entry/place/${placeId}?c=15.00,0,0,0,dh&placePath=/review`;
  
  try {
    const browser = await puppeteer.launch({
      headless: false, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      userDataDir: './tmp-user-data'
    });

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 40000, // ✅ 40초로 증가
    });

    const iframeUrl = await page.evaluate(() => {
      const iframe = document.querySelector('#entryIframe');
      return iframe ? iframe.src : null;
    });

    if (!iframeUrl) {
      throw new Error('Failed to find iframe');
    }

    await page.goto(iframeUrl, {
      waitUntil: 'networkidle2',
      timeout: 40000, // ✅ 마찬가지로 늘리기
    });

    await page.waitForSelector('.pui__vn15t2', { timeout: 10000 });
    await page.waitForSelector('.lazyload-wrapper', { timeout: 10000 });


    // 스크롤 반복 (리뷰 더 로딩되게)
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await new Promise(resolve => setTimeout(resolve, 3000)); // ⬅️ 1.5초로 늘림
    }

    // "더보기" 클릭
    await page.evaluate(() => {
      document.querySelectorAll('a[data-pui-click-code="rvshowmore"]').forEach(btn => {
        if (btn.innerText.includes('더보기')) btn.click();
      });
    });
    await new Promise(resolve => setTimeout(resolve, 1000));


    // 리뷰 + 이미지 추출
    const reviews = await page.evaluate(() => {
      const items = [];
      const reviewElements = document.querySelectorAll('li.place_apply_pui.EjjAW');
      
      reviewElements.forEach(el => {
        const textElement = el.querySelector('.pui__vn15t2');
        const imgElement = el.querySelector('.lazyload-wrapper img');

        const text = textElement?.innerText.trim() || '';
        const image = imgElement?.getAttribute('src') || '';

        if (text) {
          items.push({ text, image });
        }
      });

      return items;
    });
    
    await browser.close();
    fs.rmSync('./tmp-user-data', { recursive: true, force: true });

    res.status(200).json({ reviews });

  } catch (error) {
    console.error('❌ Failed to fetch review:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
} 