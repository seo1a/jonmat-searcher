# 🍕JMT searcher
![jonmat_searcher](https://github.com/user-attachments/assets/3e64e763-ee8c-4057-a5d0-e64a718aaff7)
<img src="https://github.com/user-attachments/assets/3e64e763-ee8c-4057-a5d0-e64a718aaff7", width="400", height="390">

![jonmat_searcher_mobile](https://github.com/user-attachments/assets/13942e36-5607-42c4-82f2-134f813b104a)
<img src="https://github.com/user-attachments/assets/13942e36-5607-42c4-82f2-134f813b104a", width="200", height="500">

맛집을 검색하면 리뷰, 사진, 지도 상 위치 정보를 확인할 수 있는 반응형 웹 애플리케이션입니다.
네이버 블로그, 구글 플레이스, 카카오맵 총 3가지 플랫폼의 리뷰와 사진을 확인하고 비교할 수 있습니다.
<br>
## 배포
https://jonmat-searcher.vercel.app
<br>
<br>
<br>

## 📚주요 기능

- **식당 검색**: 검색창에 식당 이름을 입력하면 자동완성 검색어가 드롭다운으로 표시됩니다.

- **카카오맵 지도**: 검색한 식당의 위치가 카카오맵 위에 마커로 표시됩니다. 프랜차이저 등 검색어가 점포명에 포함된 식당이 여러 개라면 해당 식당의 위치도 마커로 표시됩니다.

- **리뷰 확인**: 검색한 식당의 네이버 블로그, 구글 플레이스, 카카오맵 리뷰와 사진을 확인할 수 있습니다.

- **반응형 UI**: 모바일, 데스크탑에 최적화 된 사용자 경험을 제공합니다. (태블릿 환경 제외)

- **서버리스 API 연동**: Vercel Serverless Functions를 통해 각 플랫폼의 리뷰, 사진 데이터를 처리합니다.
<br>
<br>
<br>

## 🧩기술 스택 <br>

### 1. 프론트엔드 <br>
- **React**: UI 구성 및 상태 관리
- **Vite**: 빠른 번들링을 위한 개발 환경
- **JavaScript (ES6+)**: 기본 프로그래밍 언어
- **Tailwind CSS**: 유틸리티 기반의 스타일링 프레임워크
- **Axios**: 비동기 API 요청 처리
<br>

### 2. Serverless API (백엔드 역할) <br>
- **Vercel Serverless Functions** (`/api`)  
  - 클라이언트에서 분리된 데이터 처리용 api
  - 네이버, 카카오맵, 구글 리뷰 데이터를 수집
<br>

### 3. 배포 <br>
- **Vercel**: 프론트엔드 및 서버리스 백엔드 통합 배포
<br>
<br>
<br>

## 📁프로젝트 구조 <br>
![project_directory](https://github.com/user-attachments/assets/42dde5d5-d64e-4a79-aadd-f9b53a5340ab)
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

## 트러블 슈팅 <br>
