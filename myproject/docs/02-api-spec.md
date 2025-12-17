# 방명록(GuestBook) API 명세서

## 기본 정보

- **Base URL**: `http://localhost:8080/api/guestbook`
- **Content-Type**: `application/json`
- **CORS**: `http://localhost:3000` 허용

---

## API 목록

1. [전체 방명록 조회](#1-전체-방명록-조회)
2. [특정 방명록 조회](#2-특정-방명록-조회)
3. [방명록 작성](#3-방명록-작성)

---

## 1. 전체 방명록 조회

전체 방명록 목록을 조회합니다.

### 요청

- **Method**: `GET`
- **Endpoint**: `/api/guestbook`
- **Headers**: 없음

### 응답

- **Status Code**: `200 OK`
- **Body**: 방명록 배열

```json
[
  {
    "id": 1,
    "nickname": "사용자1",
    "content": "방명록 내용입니다.",
    "createdAt": "2025-12-17T10:47:03.234191"
  },
  {
    "id": 2,
    "nickname": "사용자2",
    "content": "두 번째 방명록입니다.",
    "createdAt": "2025-12-17T11:14:31.906635"
  }
]
```

### 응답 필드

| 필드명 | 타입 | 설명 |
|--------|------|------|
| id | Long | 방명록 고유 ID |
| nickname | String | 작성자 닉네임 |
| content | String | 방명록 내용 |
| createdAt | LocalDateTime | 작성 시간 (ISO 8601 형식) |

### 예시

```bash
curl -X GET http://localhost:8080/api/guestbook
```

---

## 2. 특정 방명록 조회

ID로 특정 방명록을 조회합니다.

### 요청

- **Method**: `GET`
- **Endpoint**: `/api/guestbook/{id}`
- **Path Parameters**:
  - `id` (Long, required): 조회할 방명록의 ID

### 응답

#### 성공 응답

- **Status Code**: `200 OK`
- **Body**: 방명록 객체

```json
{
  "id": 1,
  "nickname": "사용자1",
  "content": "방명록 내용입니다.",
  "createdAt": "2025-12-17T10:47:03.234191"
}
```

#### 에러 응답

- **Status Code**: `404 Not Found`
- **Body**: 에러 메시지 (String)

```json
"해당 GuestBook 이 존재하지 않습니다."
```

### 예시

```bash
# 성공
curl -X GET http://localhost:8080/api/guestbook/1

# 존재하지 않는 ID
curl -X GET http://localhost:8080/api/guestbook/999
```

---

## 3. 방명록 작성

새로운 방명록을 작성합니다.

### 요청

- **Method**: `POST`
- **Endpoint**: `/api/guestbook`
- **Headers**:
  - `Content-Type: application/json`
- **Body**: JSON 객체

```json
{
  "nickname": "사용자1",
  "content": "방명록 내용입니다."
}
```

### 요청 필드

| 필드명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| nickname | String | ✅ | 작성자 닉네임 (공백 불가) |
| content | String | ✅ | 방명록 내용 (공백 불가) |

### 응답

#### 성공 응답

- **Status Code**: `201 Created`
- **Body**: 생성된 방명록 객체

```json
{
  "id": 5,
  "nickname": "사용자1",
  "content": "방명록 내용입니다.",
  "createdAt": "2025-12-17T11:14:31.906635"
}
```

#### 에러 응답

- **Status Code**: `400 Bad Request`
- **Body**: 유효성 검사 에러 메시지 (String)

```json
"닉네임을 입력해주세요"
```

또는

```json
"내용을 입력해주세요"
```

**중복 닉네임 에러** (서버 내부 처리):
- **Status Code**: `500 Internal Server Error`
- **Body**: 에러 메시지

```json
"존재하는 nickname 입니다."
```

### 유효성 검사 규칙

- `nickname`: 비어있을 수 없음 (`@NotEmpty`)
- `content`: 비어있을 수 없음 (`@NotEmpty`)

### 예시

```bash
# 성공
curl -X POST http://localhost:8080/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "테스트유저",
    "content": "curl로 작성한 테스트 방명록입니다!"
  }'

# 에러 - 닉네임 누락
curl -X POST http://localhost:8080/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "",
    "content": "내용만 있는 경우"
  }'

# 에러 - 내용 누락
curl -X POST http://localhost:8080/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "사용자",
    "content": ""
  }'
```

---

## 에러 코드 정리

| 상태 코드 | 설명 | 발생 상황 |
|-----------|------|-----------|
| 200 OK | 성공 | 조회 성공 |
| 201 Created | 생성 성공 | 방명록 작성 성공 |
| 400 Bad Request | 잘못된 요청 | 유효성 검사 실패 |
| 404 Not Found | 리소스를 찾을 수 없음 | 존재하지 않는 ID 조회 |
| 500 Internal Server Error | 서버 오류 | 중복 닉네임 등의 서버 내부 오류 |

---

## 데이터 모델

### GuestBookDto

```json
{
  "id": 1,
  "nickname": "string",
  "content": "string",
  "createdAt": "2025-12-17T10:47:03.234191"
}
```

### 필드 설명

- **id** (Long): 방명록의 고유 식별자, 생성 시 자동 할당
- **nickname** (String): 작성자의 닉네임, 필수 입력
- **content** (String): 방명록의 내용, 필수 입력
- **createdAt** (LocalDateTime): 방명록이 작성된 시간, 자동 설정 (ISO 8601 형식)

---

## CORS 설정

프론트엔드 애플리케이션이 백엔드 API를 호출할 수 있도록 CORS가 설정되어 있습니다.

- **허용된 Origin**: `http://localhost:3000`
- **허용된 Method**: 모든 HTTP 메서드
- **허용된 Header**: 모든 헤더
- **Credentials**: 허용됨

---

## 참고사항

- 모든 날짜/시간은 ISO 8601 형식을 따릅니다.
- 닉네임은 중복될 수 없습니다.
- 요청 본문은 JSON 형식이어야 합니다.
- 유효성 검사는 Spring Validation을 통해 수행됩니다.

