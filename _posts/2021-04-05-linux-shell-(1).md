---
layout: post
title: "[Linux] Linux Shell - (1) Shell 이란?"
description: "What is Shell? 쉘이란 무엇인가?"
categories: [Linux]
tags: [Linux, Shell]
redirect_from:
  - /2021/04/05/
---

* Kramdown table of contents
{:toc .toc}
# Shell 이란?

 **쉘(Shell)**은 사용자가 운영 체제의 기능과 서비스를 이용할 수 있도록 인터페이스를 제공하는 프로그램이다. 사용자와 커널 사이의 인터페이스를 감싸고 있기 때문에 껍데기를 의미하는 영단어 Shell 에서 그 이름이 유래했다.

<img src='https://drive.google.com/uc?export=view&id=1WcTB570V7dEv5JDnuER8v2zmevw_WKC6' style='display:block;margin:auto;width:100%;max-width:1000px'/>

 쉘은 그림과 같이 사용자 혹은 **유저 어플리케이션과 커널 사이에서 명령을 해석하고 전달하는 역할을 하는 인터페이스**다. 쉘의 기능에는 크게 세 가지가 있는데, 이는 다음과 같다.

<br>

# Shell 의 기능

1. **명령어 해석기로서의 기능**

   - 쉘의 가장 기본적인 기능으로, 쉘은 사용자와 커널 사이에서 명령을 해석하여 전달하는 **해석, 번역 기능**을 제공한다.
   - 사용자가 로그인하면 쉘이 자동으로 실행되어 사용자 명령을 기다리는데, 이를 **로그인 쉘**이라고 하고 `/etc/passwd` 파일에 사용자 별로 등록되어 있다.
   - 사용자 요청을 기다려 요청 즉시 결과 값을 출력해 주는 **대화형 구조**를 가진다.

   <br>

2. **프로그래밍 기능**

   - 쉘 자체로 프로그래밍하여 여러 명령을 사용하는 프로그램을 만들 수 있다.
   - 쉘로 작성된 쉘 프로그램을 **쉘 스크립트(Shell Script)**라고 부른다.

   <br>

3. **사용자 환경 설정 기능**

   - 리눅스 세션(Session)에 대한 변수들을 정의하여 사용자가 리눅스 환경을 자신이 원하는 상태로 설정할 수 있게 한다.
   - 쉘을 통해 다양한 사용자 환경 설정을 할 수 있다.
   - 파일, 디렉토리 등에 권한을 부여할 수 있고, 로그인 시 실행되는 환경을 설정하는 등의 작업이 가능하다.

   <br>

# Shell 의 종류

 쉘은 커맨드 라인을 제공하는 **CLI(Command Line Interface)** 와 그래픽 인터페이스를 제공하는 **GUI(Graphical User Interface)** 의 두 종류가 있다. 쉘은 커널과는 분리된 별도 프로그램이기 때문에 다음과 같이 여러 종류의 쉘이 존재한다.

<br>

#### 그래픽 쉘

- 마이크로소프트 윈도우 환경의 **파일 탐색기(File Explorer)**
- 매킨토시(Macintosh)의 **파인더(Finder)**
- X Window 시스템 기반 환경(e.g. Unix) 의 **노틸러스(Nautilus)**

<br>

#### 명령 줄 쉘

- 유닉스 쉘
  - **본 쉘(Bourne shell, sh)** (파생으로 Almquist shell(ash), Bash 등이 있다.)
  - **C 쉘(C shell, csh)**
  - **콘 쉘(Korn shell, ksh)**
  - **Z 쉘(Z shell, zsh)**
- **COMMAND.COM** (DOS 용 쉘)
- **CMD.exe** (윈도우 NT용 쉘)

<br>

 리눅스 환경에서 어떤 쉘을 사용할 수 있는지 알고 싶다면 `cat /etc/shells` 라는 명령어를 통해서 알아볼 수 있다. 쉘을 변경하고 싶다면 `chsh -s [사용할 쉘(e.g. /bin/zsh)] [사용자 이름]` 로 쉘을 변경할 수 있다.

 위에 소개한 것 외에도, 많은 종류의 쉘이 존재한다. 이 중에서도 이어질 포스팅에서는 리눅스 기본 쉘인 **GNU 배시 쉘(Bourne-again shell, Bash)**에 대해 다뤄 볼 예정이다.

<br>

# Source

- [쉘, 위키백과](https://ko.wikipedia.org/wiki/%EC%85%B8)
- [쉘의 기능](https://pliss.tistory.com/91)
- [[Shell Script] 리눅스 쉘 파헤치기](https://gukii.tistory.com/49?category=996961)