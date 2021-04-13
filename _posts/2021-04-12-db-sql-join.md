---
layout: post
title: "[SQL] DB Join 이란??"
description: "Usage of DB Join, DB Join (Inner, Outer, Cross, ...)에 대해 알아보자."
categories: [SQL]
tags: [SQL, Join]
redirect_from:
  - /2021/04/12/
---

* Kramdown table of contents
{:toc .toc}
# SQL Join

 **SQL Join (결합 구문)**은 한 데이터베이스 내의 여러 테이블 레코드를 조합해 하나의 열로 표현한 것을 의미한다. Join 결과값은 테이블로서 저장될 수도 있고, 그 자체로도 연산에 활용할 수 있다. Join 작업을 위해 두 테이블 간 각각의 **공통값이 존재해야 하며, 이 값은 두 필드를 조합하는 수단**이 된다. 또 공유하고 있는 이 컬럼이 **PK 혹은 FK 값으로 사용**된다. ANSI 표준 SQL 은 다음과 같은 네 가지 유형의 JOIN 연산을 제공한다.

<br>

- **INNER JOIN**
- **OUTER JOIN**
- **LEFT JOIN**
- **RIGHT JOIN**

<br>

 아래의 두 테이블은 각각 사람의 국적, 나이를 나타내는 테이블이다. 이 두 테이블의 JOIN 예시를 통해서 각각에 대한 결과값을 직접 확인해 보자.

<img src='http://drive.google.com/uc?export=view&id=1s8FGxkjJYKj2E9PEp5dK_7RMKa6GOg6d' style='display:block;margin:auto;width:100%;max-width:1000px'/>

<br>

## INNER JOIN (내부 조인)

 **내부 조인 (Inner Join)** 은 가장 흔한 결합 방식이며 기본 조인 형식이다. 내부 조인 방식은 조인 조건 구문을 기반으로 두 개의 테이블 컬럼 값을 결합해 새로운 결과 테이블을 생성한다.

 위의 `table_country` , `table_age` 의 INNER JOIN 과정을 알아보자.

```mysql
-- 명시적(explicit) 조인 표현
SELECT *
FROM table_country as TC
INNER JOIN table_age as TA
ON TC.name = TA.name;

-- 암시적(implicit) 조인 표현
SELECT *
FROM table_country as TC, table_age as TA
WHERE TC.name = TA.name;
```

 SQL 은 **명시적(explicit) 조인 표현**과 **암시적(implicit) 조인 표현** 으로 조인식 구문을 지정할 수 있다. 명시적 조인 표현은 테이블에 조인 구문을 명시하는 데에 **`JOIN`** 키워드를 사용하며, **`ON`** 키워드로 조인식 구문을 지정한다. 이와 반대로 암시적 조인 표현은 **`SELECT`** 구문의 **`FROM`** 절에서 **`,`** (콤마)를 사용해 단순히 조인을 위한 테이블을 나열하고 **`WHERE`** 절로 조인식 구문을 지정한다는 차이점이 있다.

 위의 구문에서, 질의어는 `table_country` , `table_age` 두 테이블의 **`name`** 컬럼을 이용해 조인을 실행하며, 조인 구문이 충족된다면 두 테이블의 열이 하나가 된다. 만약 일치하지 않는다면, 결과 테이블에 열이 포함되지 않는다. 결과는 아래와 같다.

<img src='http://drive.google.com/uc?export=view&id=1NDrI_7HeS-e1RI2ayzXwhnQToHcGSExq' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 결과 테이블에서는 `table_country` 와 `table_age` 테이블에 동시에 포함되어 있는 Kim, Yuki, Steven 의 정보를 볼 수 있다.

 여기서 주의할 점은, 조인 조건 구문이 명시적으로 **`IS NULL`** 혹은 **`NOT NULL`** 구문을 추가로 사용하지 않는다면 어떤 값도 일치하지 않으므로 NULL 값을 포함하는 테이블이 조인 결과 테이블에 포함될 수 있다는 점이다.

<br>

## OUTER JOIN (외부 조인)

 **외부 조인 (Outer Join)** 은 조인하는 여러 테이블에서 한 테이블에는 존재하지만 다른 테이블에 데이터가 없는 경우 **데이터가 있는 쪽 테이블의 내용을 전부 출력하는 조인 방법**을 말한다. 조인 조건에 만족하지 않아도 해당 행을 출력하고 싶을 때 사용할 수 있다.

 외부 조인에는 **LEFT OUTER JOIN**, **RIGHT OUTER JOIN**, **FULL OUTER JOIN** 이 있다. 여기서, LEFT OUTER JOIN, RIGHT OUTER JOIN 은 각각 **LEFT JOIN**, **RIGHT JOIN** 과 같은 표현이다.

<br>

### LEFT OUTER JOIN (왼쪽 외부 조인)

 예제 테이블의 왼쪽 외부 조인 SQL 구문은 다음과 같다.

```mysql
-- 명시적(explicit) 조인 표현
SELECT *
FROM table_country as TC
LEFT (OUTER) JOIN table_age as TA
ON TC.name = TA.name;

-- 암시적(implicit) 조인 표현 (Oracle)
SELECT *
FROM table_country as TC, table_age as TA
WHERE TC.name = TA.name(+);
```

 암시적 조인 표현을 보면, **`(+)`** 기호를 활용해 외부 조인을 표현함을 볼 수 있다. 그 결과는 다음 그림과 같다.

<img src='http://drive.google.com/uc?export=view&id=1sYymx1ldW57h0byexBChC5mLBReL_D1U' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 결과 테이블에서, Annie 와 Eldora 에 대한 정보가 `table_age` 테이블에 존재하지 않는다. 하지만 LEFT OUTER JOIN 에서는 **JOIN 구문을 만족하지 않더라도 왼쪽 테이블에 존재하는 모든 row 를 포함**하기 때문에 위와 같은 결과 테이블이 출력되었다고 할 수 있다.

<br>

### RIGHT OUTER JOIN (오른쪽 외부 조인)

 예제 테이블의 오른쪽 외부 조인 SQL 구문은 다음과 같다.

```mysql
-- 명시적(explicit) 조인 표현
SELECT *
FROM table_country as TC
RIGHT (OUTER) JOIN table_age as TA
ON TC.name = TA.name;

-- 암시적(implicit) 조인 표현 (Oracle)
SELECT *
FROM table_country as TC, table_age as TA
WHERE TC.name(+) = TA.name;
```

 그 결과는 다음 그림과 같다.

<img src='http://drive.google.com/uc?export=view&id=1g5MFV9RUAE2ogXZ62w7VMHnXvdRkF09V' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 이 또한 LEFT OUTER JOIN 과 같이 설명할 수 있다. `table_age` 의 Dennis, Tom, Olga 의 정보는 `table_country` 에 존재하지 않는다. 하지만 RIGHT OUTER JOIN 은 **조인식 구문을 만족하지 않더라도 오른쪽 테이블에 해당하는 모든 row 를 포함**하기 때문에 위와 같은 결과 테이블을 얻을 수 있다.

<br>

### FULL OUTER JOIN (완전 외부 조인)

 예제 테이블의 완전 외부 조인 SQL 구문은 다음과 같다.

```mysql
-- 명시적(explicit) 조인 표현
SELECT *
FROM table_country as TC
FULL OUTER JOIN table_age as TA
ON TC.name = TA.name;

-- 암시적(implicit) 조인 표현 (Oracle)
SELECT *
FROM table_country as TC, table_age as TA
WHERE TC.name = TA.name(+)

UNION ALL

SELECT *
FROM table_country as TC, table_age as TA
WHERE TC.name(+) = TA.name;
```

 일부 DBMS (e.g. MySQL) 에서는 완전 외부 조인 기능을 직접적으로 지원하지 않는다. 이런 경우에는 **LEFT JOIN, RIGHT JOIN 의 UNION ALL 결과 테이블을 FULL OUTER JOIN 처럼 사용**할 수 있다.

<img src='http://drive.google.com/uc?export=view&id=1uck6ZOBbpacAe-wlOlks9DDUV1ZVqRWh' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 그림에서 볼 수 있듯이, 완전 외부 조인은 두 테이블의 합집합이라 할 수 있다. 이 때문에 **LEFT JOIN 과 RIGHT JOIN 의 UNION 값**이기도 하다.

<br>

## CROSS JOIN (교차 조인)

 **교차 조인 (Cross Join)** 은 **카테시안 곱(Cartesian Product)**이라고도 하며, 조인되는 **두 테이블의 곱집합이 결과 테이블**이 되는 조인 방식이다. SQL 구문과 그 결과값은 다음과 같이 나타낼 수 있다.

```mysql
SELECT *
FROM table_country as TC
CROSS JOIN table_age as TA
```

 이 결과는 다음 그림과 같은데, `table_country` 와 `table_age` 의 튜플 개수가 각각 5, 6 이므로 교차 조인 **튜플의 갯수는 5 * 6 = 30 개**가 된다.

<img src='http://drive.google.com/uc?export=view&id=1bDw2sDUgZ2Ijij5t6CgfFSZQ6MLcEbeo' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 카테시안 곱 형태의 크로스 조인은 **쿼리문이 잘못 입력되어 있는 경우에도 그 결과가 나온다**. 다음과 같은 SQL 실행 구문을 예로 들어 보자.

```mysql
SELECT *
FROM table_country as TC
LEFT OUTER JOIN table_age as TA
ON 1 = 1
```

 위 쿼리의 경우 JOIN 조건 구문이 잘못되어 있음을 알 수 있다. 이 결과는 크로스 조인의 결과값과 같다.

<br>

## SELF JOIN (자가 조인)

 **자가 조인 (Self Join)** 은 한 테이블 내에서 **자기 자신에 대해 조인을 수행**하는 것으로, 그 쿼리는 다음과 같다.

```mysql
SELECT (컬럼명)
FROM (테이블명) as alias_name1, (테이블명) as alias_name2
WHERE (조건문)
```

<br>

# Source

- [Join (SQL), 위키백과](https://ko.wikipedia.org/wiki/Join_(SQL)#%EC%98%88%EC%A0%9C_%ED%85%8C%EC%9D%B4%EB%B8%94)
- [[SQL] Join (조인)](https://clairdelunes.tistory.com/22)
- [카테시안 곱(Cartesian Product)이란?](https://devlogofchris.tistory.com/29)