# Escaping - 방탈출 게임

우연히 자주 보던 개발 관련 유튜브를 시청하던 중, 게임 제작 과정에서 이스터 에그를 삽입하여 사용자들의 흥미를 끌어올리는 사례를 보게 되었습니다. 그때 문득, 제가 현재 공부하고 있는 React와 연관된 방탈출 게임을 만들어 보면 재미있겠다는 생각이 들어 이 프로젝트를 기획하게 되었습니다.

이 프로젝트의 목표는 주로 학습 목적에 있었습니다. 방탈출 게임을 만들면서 Feature-Sliced Design (FSD) 아키텍처를 처음으로 도입해보았으며, 이를 통해 구조적인 설계 방법에 대해 공부할 수 있었습니다. 또한 스타일링에서는 평소 사용하던 Styled Components나 SCSS 대신, CSS Modules의 개념을 차용하여 SCSS를 모듈화된 방식으로 활용했습니다. 이를 통해 컴포넌트 단위로 스타일을 명확히 분리하고, FSD 아키텍처에 맞게 모듈화된 구조를 구현하려고 노력했습니다.

서비스 링크: https://escaping-project-front.vercel.app/

## Room2문제

```js
01000011 01101100 01101001 01100101 01101110 01110100 00101101 01010011 01101001 01100100 01100101 00100000 01010010 01100101 01101110 01100100 01100101 01110010 01101001 01101110 01100111
```

## 개발도구 및 스텍

### 개발 환경

- **Node.js**: v22.5.1
- **yarn**: 4.5.0
- **vite**: 5.1.6

### Dependencies

- **Node.js**
  - TypeScript: 5.6.2
  - React: 18.3.1

### 설정 및 배포

- **설치**: yarn install
- **배포 환경**: Vercel

<br/>

## 트러블 슈팅

1.`/admission`페이지에서 입장비밀번호 입력시에 `alert`경고 후 페이지 이동이 일어나야하는데 함수의 실행타이밍이 컴포넌트라이프 사이클과 맞지 않아 새로고침해야 함수가 실행되는 문제발생.

<br/>

`수정 전`

<p align="center">
  <img src="https://github.com/user-attachments/assets/42bdae50-e224-4c30-9828-2a8aee35e88e" alt="수정 전" width="400" />
</p>

<br/>

`수정 후`

<p align="center">
  <img src="https://github.com/user-attachments/assets/7e59ca00-7c66-41bf-8e81-24bcda4920d8" alt="수정 전" width="400" />
</p>

> 이를 해결하기 위해 Promise를 사용해 alert가 완료된 후 페이지 이동이 이루어지도록 수정했습니다.

<br/>

2.번들러 사이즈를 확인한 결과, 이미지 파일들이 너무 많은 용량을 차지하고 있음을 발견.

<p align="center">
  <img src="https://github.com/user-attachments/assets/3743c196-da4e-488d-b345-c3b0e0e5cb28" alt="수정 전" width="400" />
</p>

<br/>

이를 해결하기 위해 파일 크기를 줄이고자 GitHub 이미지 서버를 활용했지만, 이미지 로딩 시간이 길다는 문제가 있었습니다.

<br/>

<p align="center">
  <img src="https://github.com/user-attachments/assets/20e88ced-a1be-41b6-8c1d-ccd36c28492a" alt="수정 전" width="400" />
</p>

<br/>

GitHub 이미지 서버는 사용자 위치와 서버 간의 물리적 거리에 따라 로딩 속도가 영향을 받을 수 있음을 확인하였고, 이에 따라 기존에 사용하던 AWS S3 버킷으로 이미지를 다시 호스팅하여 URL을 변경했습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/ce6154b7-adeb-4cbd-9050-916af9d4ae7f" alt="수정 전" width="400" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/2448e80f-04ee-46bd-8d41-8fc06018c014" alt="수정 전" width="400" />
</p>

<br/>

> 그 결과, 로컬에서 이미지를 임포트하여 사용하는 대신 URL을 통해 이미지를 사용함으로써 번들러 사이즈를 줄였으며, GitHub 이미지 서버 사용 시 로딩 시간이 1.93s/2.42s 정도 걸리던 것을, AWS S3 버킷으로 변경한 후 145ms/888ms로 단축시켰습니다.
