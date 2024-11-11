### Wanted Pre Onboarding Challenge(2024-11) 사전 과제

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 폴더 구조
- FSD 패턴 적용
- app / pages / widgets / features / entities / shared 로 구분
- 공부를 하는 것을 목적으로, 다소 과하게 구분
  - app: router, tanstack query provider 등 최상위 계층
  - pages: pages
  - widgets: layout, SignUpForm, SignInForm
    - 공식문서 상으로는 widgets에는 비즈니스 로직이 없는 것이 일반적이라고 명시되어 있으나 회원가입/로그인 은 비즈니스 로직이라기 보다는 비즈니스와 상관없는 보편적인 로직으로 판단되어 widgets에 위치
      - 사실 공식문서에 적혀있는 비즈니스 로직은 다른 의미일 수 있음(그냥 어떠한 상호작용을 하는 로직으로 명시한 걸수도..)
  - features: entities보다는 조금 더 구체적인 개념인 TodoList 등 UI 및 api
  - entities: 전역적으로 사용되는? 추상적인 개념인 auth 관련 api 등
  - shared: 비즈니스 로직과 관련이 없는 다양한 곳에서 재사용되는 것들

## 난해했던 점
1. feature와 entities의 개념에 대한 기준을 세우는 과정이 굉장히 오래 걸림
2. 마찬가지로 feature와 widgets를 구분하는 것도 오래 걸림

