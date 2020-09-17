# nexus

## 安装

> 百度一下. . .



## 简述

> releases 发行版【生产，一般发布不作更改】
>
> snapshots 快照版【开发】
>
> ~~~properties
> maven-central: maven中央厂库的代理，nexus 下载中央仓库jar
> maven-releases: 发行版仓库
> maven-snapshots: 快照版仓库
> ~~~
>
> <img src="/vuepress/images/middleware/微信图片_20200917112618.png">
>
> ##### maven-public，含有以上三个仓库，一般使用这个仓库地址拉取项目依赖
>
>  <img src="/vuepress/images/middleware/微信图片_20200917113403.png"/>



## 配置

##### 推送本地jar到 nexus 仓库

> 1. maven -> setting.xml
>
>    ~~~xml
>    <!-- 配置两个版本仓库的账号密码 -->
>    <servers>
>      <server> 
>        <id>releases</id> 
>        <username>admin</username> 
>        <password>xxx</password> 
>      </server>
>      <server> 
>        <id>snapshots</id> 
>        <username>admin</username> 
>        <password>xxx</password> 
>      </server> 
>    </servers>
>    ~~~
>
>    ​
>
> 2. 项目pom.xml
>
>    ~~~xml
>    <!-- id 应和 setting.xml 中的id 一致 -->
>    <distributionManagement>
>      <repository>
>        <id>releases</id>
>        <url>http://192.168.1.12:9999/repository/maven-releases/</url>
>      </repository>
>      <snapshotRepository>
>        <id>snapshots</id>
>        <url>http://192.168.1.12:9999/repository/maven-snapshots/</url>
>      </snapshotRepository>
>    </distributionManagement>
>    ~~~
>
>    ​
>
> 3. mvn deploy 推送部署

##### 从 nexus 拉取jar

> 让maven项目使用nexus作为远程仓库有两种方式
>
> 第一种：在项目的pom.xml中进行更改，让单个项目使用nexus仓库
>
> ~~~xml
> <repositories>
>   <repository>
>     <id>nexus</id>
>     <name>nexus repository</name>
> 	<!-- http://192.168.1.12:9999/repository/maven-public/ -->
>     <url>从控制面板中的 maven-public 找到对应的url，或者自定义镜像组</url>
>     <snapshots>
>       <enabled>true</enabled>
>     </snapshots>
>     <releases>
>       <enabled>true</enabled>
>     </releases>
>   </repository>
> </repositories>
> <pluginRepositories>
>   <pluginRepository>
>     <id>nexus</id>
>     <name>nexus repository</name>
> 	<!-- http://192.168.1.12:9999/repository/maven-public/ -->
>     <url>从控制面板中的 maven-public 找到对应的url，或者自定义镜像组</url>
>     <snapshots>
>       <enabled>true</enabled>
>     </snapshots>
>     <releases>
>       <enabled>true</enabled>
>     </releases>
>   </pluginRepository>
> </pluginRepositories>
> ~~~
>
> 第二种：通过修改maven的配置文件settings.xml进行更改，让所有项目都使用nexus仓库
> maven -> setting.xml
>
> ~~~xml
> <!-- 如果拉取也需要身份校验 -->
> <server>
>   <id>id***</id>
>   <username>***</username>
>   <password>***</password>
> </server>
>
> <!-- 镜像 -->
> <mirrors>
>   <mirror>
> 	<!-- 对应 server id -->
>     <id>id***</id>
>     <name>internal nexus repository</name>
>     <!-- http://192.168.1.12:9999/repository/maven-public/ -->
>     <url>从控制面板中的 maven-public 找到对应的url，或者自定义镜像组</url>
>     <mirrorOf>!internal.repo,*</mirrorOf>
>   </mirror>
> </mirrors>
>
> <!-- profile -->
> <profiles>
>   <profile>
>     <id>nexus-pr</id>
>     <!-- 远程仓库列表 -->
>     <repositories>
>       <repository>
>         <id>nexus-xu</id>
>         <name>Nexus Central</name>
>         <!-- http://192.168.1.12:9999/repository/maven-public/ -->
>     	<url>从控制面板中的 maven-public 找到对应的url，或者自定义镜像组</url>
>         <layout>default</layout>
>         <!-- 表示可以从这个仓库下载releases版本的构件-->
>         <releases>
>           <enabled>true</enabled>
>         </releases>
>         <!-- 表示可以从这个仓库下载snapshot版本的构件 -->
>         <snapshots>
>           <enabled>true</enabled>
>         </snapshots>
>       </repository>
>     </repositories>
>     <!-- 插件仓库列表 -->
>     <pluginRepositories>
>       <pluginRepository>
>         <id>nexus-xu</id>
>         <name>Nexus Central</name>
>         <!-- http://192.168.1.12:9999/repository/maven-public/ -->
>     	<url>从控制面板中的 maven-public 找到对应的url，或者自定义镜像组</url>
>         <layout>default</layout>
>         <snapshots>
>           <enabled>true</enabled>
>         </snapshots>
>         <releases>
>           <enabled>true</enabled>
>         </releases>
>       </pluginRepository>
>     </pluginRepositories>
>   </profile>
> </profiles>
>
> <activeProfiles>
>   <!--需要激活 <profile>中的ID才生效-->  
>   <activeProfile>nexus-pr</activeProfile>
>   <activeProfile>其他...</activeProfile>
> </activeProfiles>
> ~~~
>
> 