### **Main tech Stack**

```
- node.js
- Typescript
- mysql
- prisma
- graphQL
- docker
```

### **ERD**

![ERD](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FY4vjy%2FbtsgDhK8wqd%2FqBMKKhfka8xTb95us1IP5K%2Fimg.png)

<br><br>

### **API**

![API](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdKRg43%2FbtsgJ1BIwwT%2FdvCXzzrrAydTPWtXJlC5Bk%2Fimg.png)

<br><br>

### **아키텍쳐**

![아키텍쳐](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcdL5cv%2FbtsgCjEkbx5%2FLTXIvKiM4oTeCqrz30hkCk%2Fimg.png)

<br><br>

### **env 내용**

```
DATABASE_URL=mysql://{id}:{password}@mysql:3306/mysqldb
```

<br><br>

### **서버 && DB 구동 방법**

```
<!-- docker bulid & up -->
docker-compose build
docker-compose up

<!-- DB schema 적용 & seed 데이터 삽입 -->
docker-compose run server yarn prisma migrate dev
docker-compose run server yarn prisma db seed
```

<br><br>

### **폴더 구조**

```
.
├── .vscode/
│   └── settings.json
├── prisma/
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── common/
│   │   ├── interfaces/
│   │   │   └── common.interfaces.ts
│   │   ├── util/
│   │   │   └── pagination.ts
│   │   └── prismaJest.ts
│   ├── resolvers/
│   │   ├── user.ts
│   │   ├── post.ts
│   │   ├── comment.ts
│   │   ├── services/
│   │   │   ├── user.ts
│   │   │   ├── post.ts
│   │   │   └── comment.ts
│   │   ├── interfaces/
│   │   │   ├── post-service.interface.ts
│   │   │   └── user-service.interface.ts
│   │   └── test/
│   │       └── user.spec.ts
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── user.ts
│   │   ├── post.ts
│   │   └── comment.ts
│   ├── config.ts
│   └── index.ts
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── jest.config.ts
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```
