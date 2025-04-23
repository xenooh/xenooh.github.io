# 🚀 GitHub Pages로 React 앱 자동 배포

이 문서는 React 앱을 **GitHub Pages**에 자동 배포하는 방법을 안내합니다. 푸시만 하면 자동으로 배포되는 멋진 시스템을 만들어 봅시다!

## 1. 목표 🎯

로컬에서 직접 빌드하지 않고, GitHub 레포지토리에 코드 푸시만으로 React 앱을 자동으로 배포합니다.

- **사용자 페이지**: `https://<username>.github.io`
- **프로젝트 페이지**: `https://<username>.github.io/<repository_name>`

## 2. React 앱 빌드 ⚙️

- React 앱은 브라우저에서 실행 가능한 정적 파일(HTML, CSS, JS)로 변환해야 합니다.

```bash
npm run build
# 또는
yarn build
```


## 3. GitHub Pages 설정 📚
레포지토리 이름:

사용자 페이지: <username>.github.io

프로젝트 페이지: 자유롭게 설정 가능

소스 브랜치: main 브랜치의 루트 또는 /docs 폴더, 또는 gh-pages 브랜치의 루트

.nojekyll 파일: Jekyll 처리를 비활성화하려면 빈 .nojekyll 파일을 루트에 추가해주세요.

package.json: homepage 속성 추가

사용자 페이지: "homepage": "https://<username>.github.io"

프로젝트 페이지: "homepage": "https://<username>.github.io/<repository_name>"

## 4. 자동 배포 설정 🚀
- GitHub Actions를 이용해 자동 배포를 설정합니다. .github/workflows 폴더에 워크플로우 파일을 생성하세요.

```
name: Deploy React App to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build React app
        run: npm run build

      - name: Upload build folder
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```
## 5. GitHub 설정 ⚙️
- Settings > Pages 탭에서 Source를 GitHub Actions로 설정하고 저장하세요!

## 6. API 키 관리 🔑 (선택 사항)
- 민감한 API 키는 GitHub Secrets로 등록하여 안전하게 관리할 수 있습니다.
```
env:
  REACT_APP_API_KEY: ${{ secrets.YOUR_API_KEY }}
```
## 7. 문제 해결 팁 ⚡
- .nojekyll 파일을 추가하여 Jekyll 문제를 방지!

- GitHub Actions 로그에서 에러를 확인하고, 콘솔을 체크하여 문제를 파악하세요!

## 출처 📚

HackerNoon

Eunchurn Blog

AWS CDK

