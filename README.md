🚀 GitHub Pages로 React 앱 자동 배포
이 문서는 React 앱을 GitHub Pages에 자동으로 배포하는 방법을 안내합니다. 푸시만 하면 자동으로 배포되는 멋진 시스템을 만들어 봅시다!

1. 목표 🎯
로컬에서 직접 빌드하지 않고, GitHub 레포지토리에 코드 푸시만으로 React 앱을 자동으로 배포합니다.

사용자 페이지: https://<username>.github.io

프로젝트 페이지: https://<username>.github.io/<repository_name>

2. React 앱 빌드 ⚙️
React 앱은 브라우저에서 실행 가능한 정적 파일(HTML, CSS, JS)로 변환해야 합니다.

bash
복사
편집
npm run build
# 또는
yarn build
3. GitHub Pages 설정 📚
레포지토리 이름
사용자 페이지: <username>.github.io

프로젝트 페이지: 자유롭게 설정 가능

소스 브랜치
main 브랜치의 루트 또는 /docs 폴더, 또는 gh-pages 브랜치의 루트

.nojekyll 파일
Jekyll 처리를 비활성화하려면 루트에 빈 .nojekyll 파일을 추가해주세요.

package.json 설정
homepage 속성을 추가해야 GitHub Pages에서 올바르게 배포됩니다.

json
복사
편집
"homepage": "https://<username>.github.io"   // 사용자 페이지
또는

json
복사
편집
"homepage": "https://<username>.github.io/<repository_name>"   // 프로젝트 페이지
4. 자동 배포 설정 🚀
GitHub Actions를 이용해 자동 배포를 설정합니다. .github/workflows 폴더에 워크플로우 파일을 생성하세요.

GitHub Actions 워크플로우 파일 예시
yaml
복사
편집
name: Deploy React App to GitHub Pages

on:
  push:
    branches: [ main ]  # main 브랜치에 푸시될 때 자동 실행

permissions:
  contents: read  # 리포지토리 내용 읽기 권한
  pages: write  # GitHub Pages에 배포 권한
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest  # 빌드 작업은 최신 Ubuntu에서 실행

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4  # 레포지토리 코드 체크아웃

      - name: Set up Node.js
        uses: actions/setup-node@v3  # Node.js 환경 설정
        with:
          node-version: '18'  # Node.js 버전 설정

      - name: Install dependencies
        run: npm install  # 의존성 설치

      - name: Build React app
        run: npm run build  # React 앱 빌드 명령어 실행

      - name: Upload build folder
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build  # 빌드된 결과물 경로 설정

  deploy:
    needs: build
    runs-on: ubuntu-latest  # 배포 작업은 최신 Ubuntu에서 실행
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4  # GitHub Pages에 배포
5. GitHub 설정 ⚙️
GitHub 레포지토리에서 Settings > Pages 탭으로 이동합니다.

Source를 GitHub Actions로 설정하고 저장하세요.

6. API 키 관리 🔑 (선택 사항)
민감한 API 키는 GitHub Secrets로 안전하게 관리할 수 있습니다. 환경변수로 설정하여 React 앱에서 사용할 수 있습니다.

yaml
복사
편집
env:
  REACT_APP_API_KEY: ${{ secrets.YOUR_API_KEY }}  # GitHub Secrets에 등록된 API 키 사용
7. 문제 해결 팁 ⚡
.nojekyll 파일을 추가하여 Jekyll 문제를 방지할 수 있습니다. 이 파일이 없으면 GitHub Pages가 Jekyll을 처리하려 시도할 수 있습니다.

GitHub Actions의 로그에서 에러를 확인하고, 콘솔을 체크하여 문제를 파악하세요.

출처 📚
HackerNoon

Eunchurn Blog

AWS CDK
