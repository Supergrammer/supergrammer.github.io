---
layout: post
title: "[Linux] Linux Crontab 사용법"
description: "Usage of Linux Crontab, 리눅스 크론탭 사용법에 대해 알아보자."
categories: [Linux]
tags: [Linux, Shell, Crontab]
redirect_from:
  - /2021/04/09/
---

* Kramdown table of contents
{:toc .toc}
# Crontab 이란?

 **cron** 은 소프트웨어 유틸리티로 유닉스 계열 컴퓨터 운영체제의 **시간 기반 잡 스케줄러(Job Scheduler)** 이다. **crontab(cron table)** 은 **cron 을 구동하기 위한 파일**로, 쉘 명령어들이 주어진 일정에 주기적으로 실행하도록 명시해 놓은 파일을 말한다.

 `crontab` 파일은 잡 목록 및 cron 데몬에 대한 다른 명령들이 보관된 위치에 저장되어 있으며, 하나의 OS 의 **사용자들은 각자 자신만의 `crontab` 파일을 가질 수 있으며**, 시스템 전체에 영향을 미치기 위해 `/etc` 하위 디렉터리에 `crontab` 파일을 정의하기도 한다.

<br>

# Crontab 기본 명령어

- `crontab` 파일 불러와 수정하기

```shell
$ crontab -e
```

- `crontab` 잡(job) 전부 표준 출력으로 출력하기

```shell
$ crontab -l
```

- `crontab` 잡(job) 전부 삭제하기

```shell
$ crontab -r
```

- root 사용자 명령어

```bash
$ crontab -u [Username] -option

# e.g.
$ crontab -u supergrammer -e
```

# Crontab 의 주기

 Crontab 파일의 **각 줄은 하나의 잡 스케줄(Job Schedule)을 의미**하며, 각 한 줄의 구조는 아래 그림과 같다. 요일은 0 ~ 6 으로 표시되었지만, OS 나 버전에 따라서 0, 7 모두 일요일인 경우도 있다.

<img src='http://drive.google.com/uc?export=view&id=1ycn4jxvIqGRQlPaQvSWUepQ4YKg6NIFX' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 예제를 통해서 Crontab 주기 설정에 대해 알아보자.

- 기본

```shell
# 매분마다 cron_script.sh 를 실행
* * * * * ~/script/cron_script.sh
```

- **특정 시간 Job** 등록하기

```shell
# 매주 월요일 오후 9시 10분에 cron_script.sh 를 실행
10 21 * * 1 ~/script/cron_script.sh
```

- **`,`** 구분자 활용해 **반복 Job** 등록하기

```shell
# 매시간 정각, 15분, 30분, 45분에 cron_script.sh 를 실행
0,15,30,45 * * * * ~/script/cron_script.sh
```

- **`-`** 구분자 활용해 **범위 Job** 등록하기

```shell
# 매일 오전 5시 0분부터 20분까지 매분마다 cron_script.sh 를 실행
0-20 5 * * * ~/script/cron_script.sh
```

- **`/`** 구분자 활용해 **일정 간격 Job** 등록하기

```shell
# 20분에 한 번씩 cron_script.sh 를 실행
*/20 * * * * ~/script/cron_script.sh

# 자정을 기준으로 3시간마다 cron_script.sh 를 실행
0 */3 * * * ~/script/cron_script.sh
```

- 구분자를 혼합해 복잡한 스케줄의 Job 등록하기

```shell
# 매달 1일 오후 5시부터 1분 단위로 cron_script.sh 를 실행
0-10 17 1 * * ~/script/cron_script.sh

# 매달 1일, 16일 자정과 정오에 cron_script.sh 를 실행
0 0,12 1,16 * * ~/script/cron_script.sh

# 1월부터 12월까지 2개월마다 1일 오전 4시 10분에 cron_script.sh 를 실행
10 4 1 1-12/2 * ~/script/cron_script.sh

# 10일에서 15일까지 오전 3시, 4시 매 5분마다 cron_script.sh 를 실행
*/5 3,4 10-15 * * ~/script/cron_script.sh

# 월요일, 금요일 오후 5시에 cron_script.sh 를 실행
# sun, mon, fri 처럼 쓸 수도 있음
0 17 * * sun,fri ~/script/cron_script.sh

# 매달 첫 번째 일요일 오후 1시에만 cron_script.sh 를 실행
# 아래와 같이 실행 구문에 조건문을 추가해 Job 을 등록할 수도 있음
0 13 * * sun [$(date+%d) -le 07] && ~/script/cron_script.sh

```

 더 많은 `crontab` 의 활용은 [**여기**](https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/)에서 확인할 수 있다.

<br>

# Crontab 사용 시의 주의점

- `crontab` **한 줄에는 하나의 Job 만 등록**한다.

```shell
# Wrong e.g.
* * * 5 5
~/script/cron_script.sh

# Right e.g.
* * * 5 5 ~/script/cron_script.sh
```

- `crontab` **실행 로그를 남긴다.**

```shell
# 다음과 같이 사용하면 해당 처리 내역의 로그를 기록할 수 있다.
0 0,12 1,16 * * ~/script/cron_script.sh >> ~/script/log/cron_script.sh.log 2>&1
```

 참고로 **`>, >>` 기호는 표준 출력을 의미**하며, **`>` 는 new**, **`>>` 는 append** 를 의미한다. 또, **`2>&1` 은 stderr** 를 출력하는 명령어라고 할 수 있다. 이러한 구문을 적절히 사용하면 예제와 같이 `~/script/log/cron_script.sh.log` 파일에 `stderr` 로그를 남길 수 있다.

<br>

# Source

- [cron, 위키백과](https://en.wikipedia.org/wiki/Cron)
- [리눅스 크론탭(Linux Crontab) 사용법](https://jdm.kr/blog/2)
- [리눅스 crontab 시간 설정 방법](https://ponyozzang.tistory.com/402)
- [Crontab in Linux with 20 Useful Examples to Schedule Jobs](https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/)