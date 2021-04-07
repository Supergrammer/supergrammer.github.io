---
layout: post
title: "[BigData] What is Apache Spark? (1)"
description: "What is Apache Spark? Apache Spark란 무엇일까?"
categories: [BigData]
tags: [Spark, BigData]
redirect_from:
  - /2021/04/07/
---

* Kramdown table of contents
{:toc .toc}
# Apache Spark 란?

<img src='http://drive.google.com/uc?export=view&id=1ltCuxulAn_D59LoWYoaxOl2Zhaau5fYW' style='display:block;margin:auto;width:100%;max-width:750px'/>

 아파치 스파크(Apache Spark)는 SQL, 스트리밍, 머신 러닝과 그래프 처리를 위한 기본 제공 모듈이 있는 대규모 데이터 처리용 통합 분석 엔진이다. 스파크는 저번에 소개했던 하둡 에코시스템에 포함된 프로젝트의 하나로, 하둡의 데이터 처리 과정에서 Disk 기반 데이터 처리의 문제점을 보완하고자 등장했다.

 아파치 스파크는 인메모리(In-Memory) 기반의 대용량 데이터 고속 처리와 범용 분산 클러스터에서 컴퓨팅이 가능하고, JAVA, Python, Scala, R 등의 언어 기반으로 구동할 수 있다는 특징이 있다.

<br>

# Apache Spark 의 등장 배경

 [도커(Docker)를 이용한 하둡 클러스터 설치](https://supergrammer.github.io/blog/2021/04/05/hadoop-cluster-installation-using-docker/)에서 하둡을 Pseudo-Distributed Mode 로 설치한 후에 WordCount 예제를 실행했다. 하지만 이 WordCount 예제에서 Hadoop 이 어떻게 동작하는지에 대해서는 설명하지 않았다. 그 동작 과정을 그림으로 표현한다면 다음과 같다.

<img src='http://drive.google.com/uc?export=view&id=1M7xX4VCX3bMurC2ZMClRBqtdjvzT1rmr' style='display:block;margin:auto'/>

 위와 같이 Input Data 는 클러스터에 분산 저장되고, Map-Reduce 과정을 거쳐 Output Data 를 출력한다. 이 과정에서 Disk 기반 데이터 처리의 문제점이 나타난다. 이는 다음과 같다.

<br>

1. 데이터 처리 시간 외에도 HDFS read/write 연산에 추가로 시간이 소요된다.
2. 반복 쿼리 작업을 수행하는 도중의 중간 결과물 또한 Disk 에 read/write 연산을 계속 실행시킨다. Hadoop 이 Iteration 작업에 적합하지 않다는 것도 이런 이유가 크다.
3. 동일 데이터에 대해 작업할 때에도 매번 Read 연산이 필요하다는 단점이 있다.

<br>

# In-Memory 기반 데이터 프로세싱

 위와 같은 Disk 기반 데이터 프로세싱의 단점을 해결하기 위해 In-Memory 기반의 분산처리 프로세스를 적용해 보면 어떨까?

 첫째로, RAM 은 Disk 와는 다르게 read/write 작업이 사라져 반복 작업의 효율이 증가하는 이점을 가질 수 있다.

<img src='http://drive.google.com/uc?export=view&id=1cNMTPhXzGmPu0U97CGfyiU_1XhkT8l11' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 둘째로, 쿼리 작업으로 발생하는 중간 결과물에 대해 Disk 에 저장할 필요가 없어진다. 이로 인해 read/write 연산에 드는 비용을 절약할 수 있다.

<img src='http://drive.google.com/uc?export=view&id=1A9vioIhgKmZxSS8J-2M0u09mZoBMi4DK' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 마지막으로, 동일 데이터 연산 작업으로 인한 반복적인 read 연산에 드는 비용을 절약할 수 있다.

 위와 같은 이유로 Disk 기반의 데이터 프로세싱을 In-Memory 기반 분산처리 프로세스로 바꾸려는 시도가 있었는데, 처음 등장한 것이 Piccolo 였다. 이는 기존 Hadoop 의 Disk 기반 처리에 비해 프로세싱 속도가 빨랐지만, Fault-tolerance(장애 처리) 과정이 상대적으로 복잡했기 때문에 성능이 많이 떨어진다는 단점이 있었다.

 이러한 단점을 보완하고 Hadoop 환경에서의 대규모 데이터 처리 및 분석을 위해 등장한 프레임워크가 Spark이다. Spark 의 특징에 대해서는 다음 포스팅에서 다뤄 보도록 하자.

<br>

# Source

- [Apache Spark란?](https://cloud.google.com/learn/what-is-apache-spark?hl=ko)
- [Apache Spark, 위키백과](https://en.wikipedia.org/wiki/Apache_Spark#cite_note-32)
- [Apache Spark 소개 및 실습](https://www.slideshare.net/KangDognhyun/apache-spark-70360736)