# TIL (Today I learn)

This repository is for what I learned today in programming.
프론트엔드 부터 백엔드, 그리고 DevOps 관련한 테크닉, 툴까지 다양한 분야에서 기본 개념 공부와 실습을 진행한 내용을 담았습니다.
부족한 점이 많은데 프로젝트 내 버그나 개선 사항 또는 여타 피드백이 있으면 `Issue` 로 남겨주시면 감사드리겠습니다.

## FE

### JS and TS

- 함수형 프로그래밍 학습 -> fastcampus 강의 수강 완료
  [노션 정리 내용](https://lavender-noodle-3fc.notion.site/TS-a2bfed3567d3476b910b2f95883b10d4)
  - map, reduce, filter 등을 직접 구현해보기
  - Option을 사용해서 더욱 확장하기
  - Try를 구현하면서 Error Handling도 함수형 프로그래밍으로
  - Promise 사용 (callback 지옥 -> async-await, Promise ,then/catch 등)
  - Observable을 통한 반응형 고려 (Observer, Observable, lift 함수 구현)
    - RxJS 라이브러리 사용도 병행


### React

[노션 정리](https://lavender-noodle-3fc.notion.site/React-2087f291f2bb4542a112eb8bd858d424) 내용 참고

- Create React App
- Webpack React App(TS 기반)
- React Hooks 이용
- storybook 실습
- Udemy React 실습 강좌(예정)

#### CSR

Client Side Rendering

#### SSG

Static Site Generation

#### SSR

Server Side Rendering

### Next.js(SSG 기능도)

## BE

### Express

- Udemy 강좌를 통한 Jest(Javascript Testing) Library
  - Nodejs Express - unit testing/integration tests with Jest

### NestJS

- nestJS [노션 정리 내용](https://lavender-noodle-3fc.notion.site/NestJS-0b1dd7f7c3db4e21ba5daffd5c43e8cc)
- Udemy, NomadCoder 강의 및 실습 내용 정리

### Go / Gorilla

- Gorilla/mux를 활용한 RESTful API 웹 어플리케이션 구축
- Must Have Tucker의 Go 프로그래밍 책 내용 기반 학습
- Go 기초 문법 및 실습 내용 [노션 정리](https://jeromecheon.notion.site/Go-lang-1fec58e324ec4e2d9aadf7ae60d94d05)

### Design Pattern

#### DDD(Domain Driven Design)
- DDD 개념 [노션 정리 내용](https://lavender-noodle-3fc.notion.site/Domain-Driven-Design-DDD-a978a1e4bfe24e768466db4eebdccb35)
- Layered Architecture

## DevOps

### AWS 관련
- AWS Resource 종류 및 특징
  [노션 정리 내용](https://lavender-noodle-3fc.notion.site/AWS-9cbc0a02a3d84acf87f826ff930d9e24)
- 소규모 아키텍처 실습 -> backend application(Django) 진행
  - (추후 보완 예정)

### Docker

- docker
  [노션 정리 내용](https://lavender-noodle-3fc.notion.site/DevOps-Part5-755f952e4f9e4738888685538aa28195)

### Kubernetes

- kubernetes
  [노션 정리 내용](https://lavender-noodle-3fc.notion.site/DevOps-Part5-755f952e4f9e4738888685538aa28195)
- k9s, lens 관련 추가 학습
- subicura 가이드, 초격차 강의 내용 기반 실습

### Terraform

- Terraform
  [노션 정리 내용](https://lavender-noodle-3fc.notion.site/DevOps-part4-ef371c7465f44c258026f9584e97d2c1)
  

### Monitoring & logging
- AWS CloudWatch
- Prometheus
- Grafana
  [노션 정리 내용](https://lavender-noodle-3fc.notion.site/DevOps-Part7-6dd6059f5f174f3fb735e7abb86426cc)
- 그 외 istio와 kiali 등 service mesh platform
  - 여기에 대한 [노션 정리 내용](https://lavender-noodle-3fc.notion.site/istio-Kiali-a7db6901b2d04903b700da55ee973fb1)

### CI/CD
#### AWS 기반 IaaS 방식
- Jenkins
  [노션 정리 내용](https://lavender-noodle-3fc.notion.site/DevOps-Part6-CI-CD-1836a29f346a49df9b5ab16a044da190)
  - 실습은 추후 진행 예정, 현재 사내 시스템을 통한 체화 진행중
