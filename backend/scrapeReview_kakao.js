// scrapeReview_kakao.js
import puppeteer from "puppeteer";
import fs from 'fs';

export default async function scrapeReview_kakao(req, res) {
    const url = 'https://place.map.kakao.com/1513470800#comment';

    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            userDataDir: './tmp-user-data'
        });

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 30000,
        });

        // 스크롤 반복
        for (let i = 0; i < 5; i++) {
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // "더보기" 클릭
        await page.evaluate(() => {
            document.querySelectorAll('span.btn_more').forEach(btn => {
                if (btn.innerText.includes('더보기')) btn.click();
            });
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        // 정확한 선택자 기다리기
        await page.waitForSelector('.desc_review', { timeout: 10000 });


        // 리뷰 추출
        const reviews = await page.evaluate(() => {
            const items = [];
            const reviewElements = document.querySelectorAll('.inner_review'); // .inner_review로 모든 리뷰 요소 선택
            
            reviewElements.forEach(el => {
                const text = el.querySelector('.desc_review') ? el.querySelector('.desc_review').innerText.trim() : '';
                
                const imageElements = el.querySelectorAll('.review_thumb .list_photo .thumb_img img');
                const images = Array.from(imageElements).map(img => img.src);

                if (text) {
                    items.push({ text, images });  // 리뷰 텍스트와 이미지 URL을 객체로 저장
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