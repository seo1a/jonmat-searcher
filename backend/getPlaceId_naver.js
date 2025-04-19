// getPlaceId_naver.js
import puppeteer from "puppeteer";
import fs from 'fs';

export default async function getPlaceId_naver(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: false, // 디버깅 시 false
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      userDataDir: './tmp-user-data'
    });

    const page = await browser.newPage();

    // 네트워크 요청 중 지도에 불필요한 리소스 차단
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        request.resourceType() === 'image' ||
        request.resourceType() === 'stylesheet' ||
        request.resourceType() === 'font'
      ) {
        request.abort(); 
      } else {
        request.continue();
      }
    });

    const searchUrl = `https://map.naver.com/p/search/${encodeURIComponent(query)}`;

    await page.goto(searchUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // ✅ 현재 URL에서 placeId 추출
    await new Promise(resolve => setTimeout(resolve, 3000)); // 잠깐 대기 (리디렉션 완료 대기용)
    const currentUrl = page.url();

    const match = currentUrl.match(/\/place\/(\d+)/);
    const placeId = match ? match[1] : null;

    await browser.close();
    fs.rmSync('./tmp-user-data', { recursive: true, force: true });

    if (!placeId) {
      return res.status(404).json({ error: 'Place ID not found in URL' });
    }

    res.status(200).json({ placeId });

  } catch (error) {
    console.error('getPlaceId error:', error);
    res.status(500).json({ error: 'Failed to get place ID' });
  }
}
