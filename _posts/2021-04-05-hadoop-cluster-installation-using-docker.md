---
layout: post
title: "[BigData] 도커(Docker)를 이용한 하둡 클러스터 설치"
description: "Hadoop cluster installation using Docker, 도커를 이용해 하둡 테스트 클러스터 설치하기"
categories: [BigData]
tags: [Hadoop, BigData]
redirect_from:
  - /2021/04/05/
---

* Kramdown table of contents
{:toc .toc}
# 하둡 동작 모드

 하둡(Hadoop)은 세 가지의 동작 방식이 존재한다. 이는 다음과 같다.

1. Standalone mode

    데몬이 실행되지 않고 모든 것이 단독 JVM 내에서 실행되는 모드이다. Standalone mode 는 시험, 디버깅을 쉽게 할 수 있기 때문에 개발 단계에서 맵리듀스 프로그램을 실행할 때 적합하다. 하둡의 기본 환경이다.

2. Pseudo-distributed mode

    모든 하둡 데몬을 로컬 컴퓨터에서 실행하는 모드이다. 작은 규모의 클러스터에서 실행하는 것과 같은 효과가 있으며, 클러스터를 시뮬레이션하기에 적합하다.

3. Fully distributed mode

   하둡 데몬을 여러 대의 디바이스로 구성된 클러스터에서 실행한다.

 참고로 이 포스팅에서 설치할 모드는 Pseudo-distributed mode 이다.

<br>

# Docker Container 구동 및 Hadoop 설치하기

 먼저, CentOS Docker Image 로 도커 컨테이너를 구동한다.

```shell
docker run -it --name hadoop-base centos
```

 데비안 리눅스에서 apt 를 사용해 패키지를 관리하듯, 레드햇 리눅스 계열인 CentOS 에서는 yum 을 이용해 패키지를 관리한다.

 yum 패키지를 업데이트하고, 라이브러리들을 설치한다.

```shell
yum update
yum install vim wget
yum install openssh-server openssh-clients openssh-askpass
```

 하둡은 JVM 위에서 동작하므로 Java 설치가 필요하다. 설치하려는 하둡 버전에 맞는 자바 버전 선택은 [여기](https://cwiki.apache.org/confluence/display/HADOOP/Hadoop+Java+Versions)에서 확인이 가능하다. 이 포스팅에서는 Hadoop 2의 최신 버전인 2.10.1 버전을 설치하기로 했으므로 Java 7, 8 을 사용할 수 있다.

```shell
# 설치 가능한 Java 버전을 확인
yum list java*devel*
yum install java-1.8.0-openjdk-devel.x86_64
```

 하둡 홈 디렉토리를 생성한다.

```shell
mkdir /hadoop_home
cd /hadoop_home
```

 하둡 바이너리 파일을 다운로드하고, 압축을 풀어 준다.

```shell
# https://www.apache.org/
wget https://downloads.apache.org/hadoop/common/hadoop-2.10.1/hadoop-2.10.1.tar.gz

tar xvf hadoop-2.10.1.tar.gz
```

 그 다음은 `~/.bashrc` 에 환경 변수를 추가해 보자.

```shell
vim ~/.bashrc
```

```shell
# Environment Variables
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64
export HADOOP_HOME=/hadoop_home/hadoop-2.10.1
export HADOOP_CONFIG_HOME=$HADOOP_HOME/etc/hadoop
export PATH=$PATH:$HADOOP_HOME/bin
export PATH=$PATH:$HADOOP_HOME/sbin
```

 여기에 더해서 `sshd` 를 실행하는 스크립트도 추가해 주자.

```shell
# Run sshd
/usr/sbin/sshd
```

 `.bashrc` 를 다시 실행하기 전에, `ssh-keygen` 으로 필요한 키를 생성해 준다.

```shell
ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key
ssh-keygen -A
```

 로컬에서 클러스터를 동작하는 목적이기 때문에 따로 패스워드는 입력하지 않았다. 이후에는 `.bashrc` 를 다시 실행해 환경변수를 적용하고 `sshd` 를 실행한다.

```shell
vim ~/.bashrc
```

 여기까지 기본적인 설정이 끝났다고 할 수 있다.

<br>

# Hadoop Pseudo-Distributed 모드 설정

 각 데몬이 홈으로 사용할 디렉토리를 생성한다.

```shell
mkdir /hadoop_home/temp
mkdir /hadoop_home/namenode_home
mkdir /hadoop_home/datanode_home
```

 하둡 설정 파일들을 수정하기 전에, `mapred-site.xml` 파일을 `mapred-site.xml.template` 파일로부터 생성한다.

```shell
cd $HADOOP_CONFIG_HOME
cp mapred-site.xml.template mapred-site.xml
```

 이후, 각 설정 파일을 다음과 같이 수정해 준다.

### core-site.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<!--
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License. See accompanying LICENSE file.
-->

<!-- Put site-specific property overrides in this file. -->

<configuration>
        <property>
                <name>hadoop.tmp.dir</name>
                <value>/hadoop_home/temp</value>
        </property>

        <property>
                <name>fs.default.name</name>
                <value>hdfs://localhost:9000</value>
                <final>true</final>
        </property>
</configuration>
```

### hdfs-site.xml

```xml
# hdfs-site.xml

<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<!--
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License. See accompanying LICENSE file.
-->

<!-- Put site-specific property overrides in this file. -->

<configuration>
        <property>
                <name>dfs.replication</name>
                <value>1</value>
                <final>true</final>
        </property>

        <property>
                <name>dfs.namenode.name.dir</name>
                <value>/hadoop_home/namenode_home</value>
                <final>true</final>
        </property>

        <property>
                <name>dfs.datanode.data.dir</name>
                <value>/hadoop_home/datanode_home</value>
                <final>true</final>
        </property>
</configuration>
```

### mapred-site.xml

```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<!--
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License. See accompanying LICENSE file.
-->

<!-- Put site-specific property overrides in this file. -->

<configuration>
        <property>
                <name>mapred.job.tracker</name>
                <value>localhost:9001</value>
        </property>
</configuration>
```

 `hadoop-env.sh` 파일에 `JAVA_HOME` 환경 변수를 추가해 준다.

```shell
vim hadoop-env.sh
```

```shell
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-1.el8_3.x86_64
```

 이후 네임노드를 포맷한다.

```shell
hadoop namenode -format
```

 이제 하둡을 구동할 준비가 다 되었다.

<br>

# Hadoop 클러스터 구동하기

 Pseudo-Distributed 모드를 위한 도커 이미지가 만들어졌으므로, 이를 커밋하면 나중에 다시 재사용할 수 있다.

```shell
docker commit hadoop-base centos:hadoop
```

 하둡 클러스터를 구동하기 전에, `passwd` 명령어를 사용해 비밀번호를 초기화해 준다. 이후, 하둡 클러스터를 구동해 보자.

```shell
start-all.sh
```

 구동 스크립트가 실행되면 각 노드의 실행 전에 계속 뭔가를 물어 본다. 이 질문에 모두 `yes` 를 입력해 진행한다.

 참고로, 하둡 클러스터 실행을 중지하려면 다음을 실행하면 된다.

```shell
stop-all.sh
```

 하둡 클러스터가 제대로 작동 중인지 확인하기 위해 `jps` 명령어를 이용해 확인해 본다.

```shell
jps

2785 DataNode
3273 NodeManager
3147 ResourceManager
5356 Jps
2974 SecondaryNameNode
2639 NameNode
```

 이번엔 HDFS에 디렉토리를 만들어 보자.

```shell
hadoop fs -mkdir /user/supergramemr
```

 `hadoop fs` 명령어를 활용하면, 기존 리눅스 쉘의 명령어와 옵션을 거의 비슷하게 활용할 수 있다. 다음 명령어를 통해 생성된 디렉토리 정보를 확인할 수 있다.

```shell
hadoop fs -ls /user
```

 HDFS 클러스터가 Pseudo-Distributed 모드로 구동되었다.

# WordCount 테스트

 하둡 패키지에서 기본적으로 제공되는 jar 파일에는 wordcount 가 포함된다. 이 예제를 이용해서 테스트해보자.

 먼저, 테스트를 위한 디렉토리를 HDFS에 생성한다.

```shell
hadoop fs -mkdir /hadoop-test
```

 하둡이 설치된 디렉토리의 `LICENSE.txt` 파일을 분석해 보자. `hadoop fs -put` 명령을 이용해 클러스터로 파일을 올릴 수 있다.

```shell
cd $HADOOP_HOME
hadoop fs -put LICENSE.txt /hadoop-test
```

 jar 파일을 이용해 wordcount 예제를 실행해 보자.

```shell
hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.10.1.jar wordcount /hadoop-test /hadoop-test/test_out
```

 맵리듀스 작업이 실행되고, wordcount 결과가 `/hadoop-test/test_out 이라는 디렉토리에 저장된다. 이를 확인해 보자.

```shell
hadoop fs -cat /hadoop-test/test_out/*
```

```shell
...
wherever 1
whether 9
which 32
which, 2
which: 1
who 2
whole, 2
whom 8
will 7
with 99
withdraw 2
within 20
without 42
work 11
work, 3
work. 2
works 3
works, 1
world-wide, 4
worldwide, 4
would 1
writing 2
writing, 3
written 11
xmlenc 1
year 1
you 9
your 4
252.227-7014(a)(1)) 1
§ 1
“AS 1
“Contributor 1
“Contributor” 1
“Covered 1
“Executable” 1
“Initial 1
“Larger 1
“Licensable” 1
“License” 1
“Modifications” 1
“Original 1
“Participant”) 1
“Patent 1
“Source 1
“Your”) 1
“You” 2
“commercial 3
“control” 1
```

 다음과 같이 결과가 만들어졌고, 리듀서에서 만든 파일이 HDFS 클러스터에도 잘 만들어져 있는지를 확인해 보자.

```shell
hadoop fs -ls /hadoop-test/test_out

-rw-r--r--   1 root supergroup          0 2021-04-05 06:51 /hadoop-test/test_out/_SUCCESS
-rw-r--r--   1 root supergroup      27714 2021-04-05 06:51 /hadoop-test/test_out/part-r-00000
```

 정상적으로 만들어져 있는 걸 확인할 수 있다.

<br>

# Source

- [Hadoop, The Definitive Guide](https://www.amazon.com/Hadoop-Definitive-Storage-Analysis-Internet/dp/1491901632/ref=sr_1_1?crid=2KZJS9HA1GPUG&dchild=1&keywords=hadoop+the+definitive+guide&qid=1617331902&s=books&sprefix=hadoop%3A+the+def%2Cstripbooks-intl-ship%2C319&sr=1-1)
- [도커(Docker)에 하둡(Hadoop) 클러스터 띄우기](https://soft.plusblog.co.kr/136)

