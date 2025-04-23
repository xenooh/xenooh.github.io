🚀 React 포트폴리오 - GitHub Pages 자동 배포

이 프로젝트는 React로 만든 프론트엔드 포트폴리오 사이트를 GitHub Pages에 자동으로 배포하는 설정을 포함하고 있습니다.

🌐 배포 주소

👉 https://your-username.github.io/your-repo-name

📦 사용 기술

React (CRA 기반)

GitHub Actions (자동 배포)

GitHub Pages (정적 웹사이트 호스팅)

⚙️ 설치 및 실행 방법

npm install     # 의존성 설치
npm start       # 로컬 개발 서버 실행
npm run build   # 빌드

🚢 GitHub Pages 자동 배포 설정

1. package.json 설정

"homepage": "https://your-username.github.io/your-repo-name"

2. GitHub Actions 워크플로우

.github/workflows/deploy.yml 파일을 생성하고 아래 내용을 추가합니다:

name: Deploy React App to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build app
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

3. GitHub Repository 설정

Settings > Pages > Build and Deployment > GitHub Actions 선택

✅ 기타 팁

.nojekyll 파일은 자동 생성됨 (CRA에서는 걱정 X)

build 폴더는 .gitignore에 있어도 문제 없음 (GitHub Actions에서 빌드하므로)

🧑‍💻 만든 사람

당신의 GitHub 이름

💡 포트폴리오, 소개 페이지, 기술 블로그 등을 만들 때 이 구조를 기반으로 자유롭게 확장할 수 있습니다!

