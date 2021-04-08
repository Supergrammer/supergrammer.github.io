---
layout: post
title: "[BigData] What is Apache Spark? - (2) Apache Spark 의 특징, Architecture"
description: "What is Apache Spark? Apache Spark 란 무엇일까? Apache Spark 의 특징, Architecture."
categories: [BigData]
tags: [Spark, BigData]
redirect_from:
  - /2021/04/08/
---

* Kramdown table of contents
{:toc .toc}
 지난 포스팅에서 Apache Spark 에 대한 개요와 Apache Spark 의 등장 배경에 대해서 알아보았다. 오늘 다룰 포스팅에서는 Apache Spark 의 특징과 장단점, Apache Spark Architecture 에 대해 정리해 보도록 하자.

# Apache Spark 의 특징, 장점

 Apache Spark 는 이전의 방식보다 훨씬 개선된 퍼포먼스와 다양한 환경, 추가 라이브러리들을 지원한다. 이 세부 내용은 다음과 같다.

<br>

### 1. 속도 (Speed)

 Apache Spark 를 사용하면 인메모리(In-Memory) 데이터 처리를 통해 이전의 Hadoop 맵리듀스(Map-Reduce) 작업처리 속도보다 100배 이상 빠른 속도로 작업을 수행할 수 있다. 이 뿐 아니라, DAG(Directed Acyclic Graph) 스케줄러와 쿼리 최적화 도구, 실행 엔진을 사용해 일괄 처리 데이터와 스트리밍 데이터 모두에 대해 높은 성능을 보장한다는 장점이 있다.

<br>

### 2. 사용 편의성 (Easy of use)

 Apache Spark 는 병렬로 앱을 쉽게 빌드할 수 있게 해 주는 80개 이상의 고수준 연산자를 제공한다. 이와 더불어 Scala, Python, R, SQL 쉘 등의 인터페이스를 제공해 대화형으로 Spark 를 사용할 수 있고, 이를 통해 애플리케이션을 빠르게 작성할 수 있도록 도와 준다.

<br>

### 3. 보편성 (Generality)

 Apache Spark 는 SQL, DataFrame, Machine Learning 에 활용하는 MLlib, GraphX, Spark Streaming 을 비롯해 다양한 라이브러리를 지원한다. 또, 이러한 라이브러리들을 하나의 애플리케이션에서 쉽게 결합할 수 있다는 장점이 있다.

<br>

### 4. 오픈 소스 프레임워크 (Open Source Framework)

 Apache Spark 는 오픈소스 프레임워크이다. 이런 이유로 다른 솔루션을 사용해 작업하는 것에 비해 방대한 글로벌 사용자의 커뮤니티에서 문제 발생 시 문제 해결이 원활하고, 쉽게 Spark 를 사용하는 방법을 습득할 수 있다는 장점이 있다.

<br>

### 5. 기타

- Standalone 은 물론, YARN, Mesos 등의 클러스터 리소스 관리 패키지를 통해 다양한 환경에서 구동이 가능하다.
- 8000개 이상의 노드 추가가 가능한 확장성을 보장한다.
- HDFS, Cassandra, Hbase, S3 등의 다양한 데이터의 활용이 가능하다.

<br>

# Apache Spark Architecture

 Apache Spark 아키텍처는 아래 그림과 같이 구성된다.

<img src='http://drive.google.com/uc?export=view&id=1rXmn1_vtYpNmI3-8s4so7HSonlBr6Tf6' style='display:block;margin:auto;width:100%;max-width:1000px'/>

<br>

 Apache Spark 는 분산 클러스터 컴퓨팅 환경의 구축을 위해 여러 환경을 지원한다. 여기에는 자체적인 Standalone Scheduler 환경(싱글 노드)을 구축하는 방법과, YARN, Mesos 와 같은 클러스터 관리 패키지의 연동을 통한 클러스터 리소스 관리 환경을 구축하는 방법이 있다.

 Spark Core 는 범용 분산 데이터 처리 엔진이며, 메인 컴포넌트로 배치 단위의 RDD(Resilient Distributed Dataset)에 연산을 가해 데이터를 처리하는 작업을 수행한다.

 공식 지원 추가 라이브러리로는 Spark Core 를 기반으로 SQL 분석, Streaming 처리, Machine Learning 을 위한 MLlib, Graph Processing 을 위한 GraphX 등을 모두 지원한다.

 위와 같이, Apache Spark 는 다양한 특장점과 기능, 라이브러리를 통해 원활한 범용 분산 데이터 처리 기능을 지원한다. 이런 이유로 많은 기업, 단체에서 Spark 를 사용해 정형 혹은 비정형 데이터를 처리, 분석하는 작업을 간단히 하고 있으며, 사용자는 Spark 를 활용해 머신러닝 및 그래프 알고리즘 등의 복잡한 관련 기능을 원활하게 사용할 수 있다.

 이후에 이어질 포스팅에서는 Spark 공식 추가 라이브러리에 대한 세부 정보와 Spark 사용에 대해 알아보도록 하자.

<br>

# Source

- [Apache Spark란?](https://cloud.google.com/learn/what-is-apache-spark?hl=ko)
- [Apache Spark 소개 및 실습](https://www.slideshare.net/KangDognhyun/apache-spark-70360736)