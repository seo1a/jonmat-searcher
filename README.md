# 🍕JMT searcher
<img src="https://github.com/user-attachments/assets/3e64e763-ee8c-4057-a5d0-e64a718aaff7" alt="jonmat_searcher" width="700"/>
<br><br>

<details>
  <summary>📱모바일 UI 확인하기</summary> 
  
  <img src="https://github.com/user-attachments/assets/13942e36-5607-42c4-82f2-134f813b104a" alt="jonmat_searcher_mobile" width="300"/>
  
</details>
<br>

## 💭기획 의도
맛집을 검색하면 리뷰, 사진, 지도 상 위치 정보를 확인할 수 있는 반응형 웹 애플리케이션입니다.
네이버 블로그, 구글 플레이스, 카카오맵 총 3가지 플랫폼의 리뷰와 사진을 확인하고 비교할 수 있습니다.<br><br>

맛집 검색기를 만들게 된 이유는 내가 직접 쓰고 싶은 웹서비스를 만들어보고 싶다는 생각에서였습니다.<br>

맛집 검색을 위해 여러 플랫폼을 일일이 방문하는 번거로움을 없애고, 3가지 플랫폼의 리뷰를 빠르게 비교할 수 있게 하기 위함을 첫번째 목표로 설정했습니다. <br>
검색창에 맛집 이름을 검색하면 후기와 장소가 표시될 것임을 별도의 설명 없이도 알 수 있도록 구현하고 싶었습니다. 따라서 누구나 쉽게 쓸 수 있도록 직관적인 싱글 페이지 UI를 설계했으며, 모바일 최적화도 함께 고려했습니다.<br>
맛집의 위치를 표시할 지도 api로는 네이버 지도 api의 search place 기능이 운영 종료된 관계로, 장소 검색 라이브러리가 제공되는 카카오맵 api를 선택했습니다.<br>
사용자가 직접 맛집을 검색하고, 여러 플랫폼의 사진과 리뷰를 빠르게 비교하며 결정할 수 있는 경험을 만드는 것이 본 프로젝트의 핵심 목표입니다.<br>


<br>

## 🌐배포
https://jonmat-searcher.vercel.app
<br>
<br>
<br>
<br>



## 📚주요 기능

- **식당 검색**: 검색창에 식당 이름을 입력하면 자동완성 검색어가 드롭다운으로 표시됩니다. 이를 통해 프랜차이저가 많은 경우 검색 결과가 다르게 나타날 수 있는 점을 최소화 하고자 하였습니다.

- **카카오맵 지도**: 검색한 식당의 위치가 카카오맵 위에 마커로 표시됩니다. 프랜차이저 등 검색어가 점포명에 포함된 식당이 여러 개라면 해당 식당의 위치도 마커로 표시됩니다. 마커 클릭 시 점포명의 풀네임이 표시됩니다.

- **리뷰 확인**: 검색한 식당의 네이버 블로그, 구글 플레이스, 카카오맵 리뷰와 사진을 확인할 수 있습니다.

- **반응형 UI**: 모바일, 데스크탑에 최적화 된 사용자 경험을 제공합니다. (태블릿 환경 제외)

- **서버리스 API 연동**: Vercel Serverless Functions를 통해 각 플랫폼의 리뷰, 사진 데이터를 처리합니다.
<br>
<br>
<br>

## 🧩기술 스택 <br>

### 1. 프론트엔드 <br>
- <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> : UI 구성 및 상태 관리
- <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/> : 빠른 번들링을 위한 개발 환경
- <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/> : 기본 프로그래밍 언어
- <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white"/> : 유틸리티 기반의 스타일링 프레임워크
- <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/> : 비동기 API 요청 처리
<br>

### 2. Serverless API (백엔드 역할) <br>
- <img src="https://img.shields.io/badge/Vercel_Serverless-000000?style=for-the-badge&logo=vercel&logoColor=white"/> (`/api`)  
  - 클라이언트에서 분리된 데이터 처리용 api
  - 네이버, 카카오맵, 구글 리뷰 데이터를 수집
  - 초기 기획 단계에서는 puppeteer를 이용한 크롤링을 고려했지만, 검색 시간을 줄여주는 것이 목표인 프로젝트에서 속도가 현저히 떨어지는 puppeteer를 사용하는 것이 기획 의도에서 벗어났다고 판단했습니다. 따라서 서버리스 함수 기반 api를 사용하여 가벼운 로딩시간으로 쾌적한 성능을 제공하고자 했습니다.
<br>

### 3. 배포 <br>
- <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>: 프론트엔드 및 서버리스 백엔드 통합 배포
<br>
<br>
<br>

## 📁프로젝트 구조 <br>
![project_directory](https://github.com/user-attachments/assets/42dde5d5-d64e-4a79-aadd-f9b53a5340ab)
<br>
<br>
<br>
<br>

## 🛠설치 및 실행 방법 <br>
```bash
# 1. 리포지토리 클론
git clone https://github.com/seo1a/jonmat-searcher.git
cd jonmat-searcher

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
vercel dev
```
<br>
<br>
<br>

## ✏환경 변수 설정 (.env) <br>

다음과 같이 `.env` 파일을 루트 디렉토리에 생성하고 API 키를 입력해주세요: <br>

```
NAVER_CLIENT_ID=YOUR_NAVER_API_ID
NAVER_CLIENT_SECRET=YOUR_NAVER_API_SECRET
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_API_KEY
VITE_KAKAO_MAP_API_KEY=YOUR_KAKAO_API_KEY

`YOUR_NAVER_API_ID` 부분에 본인의 실제 키를 입력해주세요!
```
<br>
<br>
<br>

## 📌한계 및 아쉬운 점  <br>

가장 아쉬운 점이라 함은 서비스에서 제공하는 리뷰의 개수와 형태를 꼽을 수 있겠습니다.<br> 
### 1. 네이버의 리뷰의 제공 형태 <br>
네이버 플레이스의 리뷰는 공식적인 api로 제공되지 않습니다. 많은 시도 끝에 puppeteer을 사용해 네이버 플레이스의 리뷰를 가져오는 것이 가능함을 확인했지만, 속도 측면에서 사용자를 도저히 만족시킬 수 없을 것 같다는 판단 하에 공식적으로 제공되는 네이버 블로그 리뷰 api를 사용했습니다. 타 플랫폼과 동일한 형태의 리뷰를 제공하지 못해 아쉽습니다. 하지만 주변의 피드백을 들어보면 맛집을 찾아볼 때, 네이버 플레이스 리뷰보다 블로그 리뷰를 위주로 찾아보는 경우가 많아 오히려 사용자에게 더 유용한 정보가 될 수 있겠다고 생각했습니다.<br>
### 2. 구글 플레이스와 카카오맵 리뷰의 개수<br> 
구글 플레이스 api가 공식적으로 제공하는 리뷰의 개수는 5개입니다. 또한 카카오맵 스크래핑을 통해 가져올 수 있는 리뷰의 개수도 5개로, 사용자가 충분히 리뷰를 비교하고 선택하기에는 다소 적은 개수라고 생각됩니다.<br><br>

또한 검색창에서 키워드를 검색하면 카카오맵에 등록된 상호명을 기준으로 query를 각 플랫폼에 넘겨주도록 설계했습니다. 이 과정에서 플랫폼마다 상호명이 다르게 등록된 경우 간혹 구글-카카오 간 동일한 가게를 특정하지 못하는 경우가 발생했습니다. 추후에 도로명 주소나 우편번호를 통해 이를 구분하는 방식을 고려해보고자 합니다.
