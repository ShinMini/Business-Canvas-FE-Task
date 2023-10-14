# Typed Frontend Engineer 기술 과제

Typed의 ResourceList를 간단하게 구현해봅니다.

## 디자인

[피그마 링크](https://www.figma.com/file/qerxdUmXtYnvZ81T3gA4YA/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B3%BC%EC%A0%9C?node-id=2%3A1515)

- 디자인에서 사용된 Icon들은 [Typed Design System](https://www.npmjs.com/package/typed-design-system) 를 install 하여 사용합니다.

### 구현 목록

- 리소스 리스트가 보여야한다.
- 리소스 추가가 가능하여야 한다.
    1. url 리소스
        1. “https://” 또는 “http://” scheme 이 포함되어야 한다.
        2. youtube url은 embed url로 변경해야 한다.
            - example) <https://www.youtube.com/watch?v=0OSUw7hJfVs>  →
            <https://www.youtube.com/embed/0OSUw7hJfVs>
        3. 반드시 보여야 하는 url
            1. <https://www.robinwieruch.de/react-libraries/>
            2. <https://typed.do/blog-kr/how-to-make-good-usability-product/>
    2. image 리소스
        1. .png, .jpg만 업로드 되면 된다.
        2. 동시에 여러개의 이미지를 올릴 수 있어야 한다.
            1. *각 이미지 별로 validation이 일어나야 한다.
    3. 리소스 등록 validation
        1. 300ms ~ 1000ms 랜덤 딜레이가 일어나야 한다.
        2. 등록시 성공할 확률이 80%이어야 한다.
        3. 성공시 성공 토스트가 떠야 한다. (디자인 시안 없습니다.)
        4. 실패시 실패 토스트가 떠야 한다. (디자인 시안 없습니다.)
- 리소스 삭제가 가능해야 한다.
- url 리소스와 image 리소스를 클릭하면 뷰어에 리소스가 보여야한다.
    1. 뷰어는 닫을 수 있어야 한다.
    2. url 리소스 뷰어는 <iframe> 태그를 활용한다.
- 리소스 이름 변경이 가능해야 한다.
  - url 리소스의 경우 이름 변경 후에도 등록시의 url이 뷰어에 나타나야 합니다.

### 기술 스택

- Required
  - React, TypeScript
- Optional
  - Global 상태관리
  - 추가로 어떤 라이브러리를 사용해도 좋습니다.

### 제출 방식

개인 Github Repository에 업로드 후 이메일로 Repository 링크를 공유 합니다.

Source Code에 아래 문서도 함께 추가해주세요.

- `[README.md](http://README.md)` : How to run
- `[SOLUTION.md](http://SOLUTION.md)` : Describes the solution

### 기타

- 명시된 기능 외에 추가할 수 있는 기능이 있다면 편하게 추가해주세요!
- UI가 깨지는 등의 엣지케이스는 없도록 해주세요!