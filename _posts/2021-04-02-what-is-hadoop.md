---
layout: post
title: "[BigData] What is Hadoop?"
description: "What is Hadoop? Hadoop이란 무엇일까?"
categories: [BigData]
image: http://drive.google.com/uc?export=view&id=1Nj3qchdZHSsxjO1kCuuKieTymUEjdHwm
tags: [Hadoop, BigData]
redirect_from:
  - /2021/04/02/
---

# Hadoop 이란?

<img src='http://drive.google.com/uc?export=view&id=1Nj3qchdZHSsxjO1kCuuKieTymUEjdHwm' />

 **하둡(Hadoop)**이란 무엇일까? Hadoop은 **High-Availability Distributed Object-Oriented Platform** 의 약자이며, 일반 서버로 구성된 클러스터 환경에서 분산 파일시스템과 대량의 자료 처리를 위한 분산 처리 시스템을 제공하는 아파치 소프트웨어 재단(Apache Software Foundation, ASF)의 프레임워크로, 빅데이터 처리 및 분석을 위한 플랫폼 중 표준으로 자리잡고 있다.

 하둡은 **하둡 공통 패키지(Hadoop Common Package)**로 구성되며, 분산된 장비에 대용량 파일을 저장할 수 있는 기능을 제공하는 **하둡 분산 파일 시스템(HDFS)**과, 분산된 서버의 CPU 및 메모리 자원을 이용해 빠르게 분석할 수 있도록 제공하는 **맵리듀스(MapReduce) 엔진** 등을 포함하고 있다.

<br>

# 하둡의 등장 배경

 디스크의 용량은 엄청나게 큰 폭으로 증가했지만, 데이터를 읽는 속도는 그 증가폭을 따라가지 못했다. 예를 들어, 하드디스크의 데이터를 읽는 속도는 약 200MB/s 정도가 걸리고 2TB 스토리지의 전체 데이터를 읽는 데에는 거의 3시간이 걸린다. 이러한 단일 디스크 환경에서의 데이터 입출력 속도의 단점을 보완하기 위해 분산 파일 시스템이라는 개념이 등장했다.  여러 개의 디스크에서 병렬 데이터 입출력을 수행하면 그만큼 시간을 줄일 수 있다는 데에서 착안된 아이디어였다.

 구글의 분산 파일 시스템(Google File System, GFS)에 대한 논문이 공개된 후에 그에 대응하기 위해 아파치 루씬 창업자 더그 커팅과 마이크 캐퍼렐라가 2006년, 하둡을 개발했다.

  분산 파일 시스템에는 크게 두 가지의 문제가 있다. 첫 번째는 **하드웨어 장애에 관한 문제**로 많은 하드웨어를 사용할수록 장애가 발생할 확률이 높아진다는 점이었고, 두 번째는 분할된 데이터를 분석 작업에서 결합해야 한다는 문제로, **데이터의 정합성을 지키는 문제**를 어떻게 해결하는가에 관한 문제였다. 이러한 문제를 하둡을 활용하면 안정적이고 확장성이 높은 저장 및 분석을 제공받을 수 있고, 고가용성을 내포하고 있다는 점이 하둡의 강점이라 할 수 있다.

<br>

# 하둡 에코 시스템(Hadoop Eco System)

 하둡의 코어 프로젝트를 포함하는 **하둡 에코시스템(Hadoop EcoSystem)**은 하둡 프레임워크를 이루고 있는 다양한 서브 프로젝트들의 모임이라고 할 수 있다. 하둡 에코시스템은 분산 코디네이터, 리소스 관리, 데이터 저장, 수집, 처리 등과 같은 데이터 처리와 관련된 모든 부분을 포함하고 있다.

<img src='http://drive.google.com/uc?export=view&id=1OtxFxaWUNXkjJHVmKHNV1m64_IyCA1AG' />

출처 : [1004jonghee, 하둡에코시스템(Hadoop Eco System) Ver 1.0](https://1004jonghee.tistory.com/m/entry/1004jonghee-%ED%95%98%EB%91%A1%EC%97%90%EC%BD%94%EC%8B%9C%EC%8A%A4%ED%85%9CHadoop-Eco-System-Ver-10?category=419383)

<br>

**분산 코디네이터**

- **Zookeeper**
  - 분산 환경에서 서버 간의 상호 조정이 필요한 다양한 서비스를 제공하는 시스템
  - 분산 동기화를 제공하고, 그룹 서비스를 제공하는 중앙 집중식 서비스로 알맞은 분산처리 및 분산 환경을 구성하는 서버 설정을 통합적으로 관리

<br>

**분산 리소스 관리**

- **YARN**
  - 작업 스케줄링 및 클러스터 리소스 관리를 위한 프레임워크. 맵리듀스, 하이브, 임팔라, 스파크 등의 다양한 애플리케이션을 YARN에서 실행

<br>

- **Mesos (클라우드 환경에 대한 리소스 관리)**
  - Linux 커널과 동일한 원칙을 사용하고, 컴퓨터에 API(e.g. Hadoop, Spark, Kafka, Elasticsearch)를 제공

<br>

**데이터 저장**

- **HBase (분산 데이터베이스)**
  - 구글 Bigtable을 기반으로 개발된 비관계형 데이터베이스이며, Hadoop HDFS 위에서 Bigtable과 같은 기능을 제공

<br>

- **HDFS(분산 파일 데이터 저장)**
  - 애플리케이션 데이터에 대한 높은 처리량의 엑세스를 제공하는 분산 파일 시스템

<br>

- **Kudu(컬럼 기반 스토리지)**
  - 컬럼 기반 스토리지로 하둡 에코시스템에 새로 추가되어 급변하는 데이터에 대해 빠른 분석을 하기 위해 설계

<br>

**데이터 수집**

- **Chukwa**
  - 분산 환경에서 생성되는 데이터를 안정적으로 HDFS에 저장하는 플랫폼
  - 대규모 분산 시스템을 모니터링하기 위한 시스템으로, HDFS 및 MapReduce에 구축되어 수집된 데이터를 최대한 활용하기 위한 모니터링 및 유연한 툴킷을 포함

<br>

- **Flume**
  - 많은 양의 데이터를 수집, 집계 및 이동하기 위한 분산형 서비스

<br>

- **Scribe**
  - 페이스북에서 개발한 데이터 수집 플랫폼이며, Chukwa와 다르게 데이터를 중앙 서버로 전송하는 방식
  - 최종 데이터는 다양한 저장소로 활용할 수 있음

<br>

- **Kafka**
  - 데이터 스트림을 실시간으로 관리하기 위한 분산 시스템, 대용량 이벤트 처리를 위해 개발

<br>

**데이터 처리**

- **Pig**
  - 하둡에 저장된 데이터를 맵리듀스 프로그램을 만들지 않고 SQL과 유사한 스크립트를 이용해 데이터를 처리하는 시스템
  - 맵리듀스 API를 매우 단순화한 형태로 설계

<br>

- **Mahout**
  - 분석 기계학습에 필요한 알고리즘을 구축하기 위한 오픈소스 프레임워크
  - 클러스터링, 필터링, 마이닝, 회귀분석 등의 중요한 알고리즘을 지원

<br>

- **Spark**
  - 대규모 데이터 처리를 빠른 속도로 실행하는 엔진
  - 병렬 애플리케이션을 쉽게 만들 수 있는 80개 이상의 고급 연산자를 제공하며, Python, R 등을 사용할 수 있음

<br>

- **Impale**
  - 하둡 기반의 분산 엔진으로, 맵리듀스를 사용하지 않고 C++ 로 개발한 인메모리 엔진을 사용해 빠른 성능을 보임

<br>

- **Hive**
  - 하둡 기반 데이터 솔루션, 페이스북에서 개발한 오픈소스로 자바를 몰라도 데이터 분석을 할 수 있도록 함
  - SQL과 유사한 HiveQL이라는 언어를 제공해 쉽게 데이터 분석을 할 수 있게 도와줌

<br>

- **MapReduce**
  - 대용량 데이터를 분산처리하기 위한 프로그램으로 정렬된 데이터를 분산처리 Map으로 만들고 이를 다시 합치는 Reduce 과정을 거침

<br>

### 출처

- [아파치 하둡, 위키백과](https://ko.wikipedia.org/wiki/%EC%95%84%ED%8C%8C%EC%B9%98_%ED%95%98%EB%91%A1)
- [Hadoop, The Definitive Guide](https://www.amazon.com/Hadoop-Definitive-Storage-Analysis-Internet/dp/1491901632/ref=sr_1_1?crid=2KZJS9HA1GPUG&dchild=1&keywords=hadoop+the+definitive+guide&qid=1617331902&s=books&sprefix=hadoop%3A+the+def%2Cstripbooks-intl-ship%2C319&sr=1-1)
- [[빅데이터] 하둡(Hadoop)이란?](https://m.blog.naver.com/PostView.nhn?blogId=acornedu&logNo=220957220179&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [Hadoop Eco System(하둡 에코 시스템)](https://velog.io/@kimdukbae/Hadoop-Eco-System-%ED%95%98%EB%91%A1-%EC%97%90%EC%BD%94-%EC%8B%9C%EC%8A%A4%ED%85%9C)