# docker 文档

## 下载及安装

##### 下载关于docker的依赖环境

~~~sh
yum -y install yum-utils device-mapper-persistent-data lvm2
~~~

##### 设置一下下载docker的镜像源

~~~sh
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
~~~

##### 安装docker

~~~sh
yum makecache fast
yum -y install docker-ce
~~~

##### 启动dicker服务

```sh
systemctl start docker
```

##### 设置开机自动启动

```sh
systemctl enable docker
```

## docker 使用公司内部的私服厂库

> 需要在/etc/docker/deamon.json

~~~sh
{
  "registry-mirrors":["https://registry.docker-cn.com"],
  "insecure-registries":["ip:port"]
}
~~~

> 重启两个服务

~~~sh
systemctl daemon-reload
systemctl restart docker
~~~

## 容器的操作

##### 运行容器

> 简单操作

~~~sh
docker run 镜像的标识|镜像民称[:tag]
~~~

> 常用的参数

~~~sh
docker run -d -p 宿主机的端口:容器端口 --name 容器名称 镜像的标识|镜像名称[:tag]
# -d：代表后台运行容器
~~~

##### 查看容器的日志

~~~sh
docker logs -f 容器ID 
~~~

##### 进入容器内部

~~~sh
docker exec -it 容器ID bash
~~~

##### 退出容器

~~~sh
exit
~~~

##### 拷贝宿主机的文件到容器中

~~~sh
docker cp 宿主机文件名称 容器ID:容器内部路径
~~~

## 数据卷

##### 创建数据卷

~~~sh
docker volume create 数据卷名称
# 创建数据卷之后，默认会存放在一个目录下 /var/lib/docker/volumes/数据卷名称/_data
~~~

##### 查看数据卷的详情信息

~~~sh
docker volume inspect 数据卷名称
~~~

##### 查看全部的数据卷

~~~sh
docker volume ls
~~~

##### 删除数据卷

~~~sh
docker volume rm 数据卷名称
~~~

##### 应用数据卷

~~~sh
# 当映射数据卷时，如果数据卷不存在，docker会自动创建数据卷
docker run -v 数据卷名称:容器内部的路径 镜像ID
# 直接指定一个路径作为数据卷的存放位置
docker run -v 路径:容器内部的路径 镜像ID
~~~

## docker 自定义镜像

##### 创建dockerfile文件，并且指定自定义镜像信息

~~~sh
dockerfile 文件中常用的内容
from: 指定当前自定义镜像依赖的环境
copy: 将相对路径下的内容复制到自定义镜像中
workdir: 声明镜像的默认工作目录
cmd: 需要执行的命令（在workdir下执行，cmd可以写多个，只以最后一个为准）
# 栗子，自定义一个Tomcat镜像，并且将ssm.war部署到Tomcat中
from daocloud.io/library/tomcat:7.0.62
copy ssm.war /usr/local/tomcat/webapps # copy 的文件需要和dockerfile在同一级目录下
~~~

##### 通过docker 命令制作镜像

~~~sh
docker build -t 镜像名称[:tag] .
~~~

## docker-compose

##### 下载docker-compose

> 前往GitHub的docker-compose，下载对应的版本，例：
>
> <https://github.com/docker/compose/releases/tag/1.24.1>
>
> 或
>
> <http://mirror.azure.cn/docker-toolbox/linux/compose/1.24.1/>

> 上传至linux中 /usr/local/bin，并修改文件的可执行权限

##### docker-compose.yml文件

~~~yaml
version: '3.1'
services: 
  mysql: 
    restart: always # 代码只要docker启动，那么这个容器就跟着一起启动
    image: # 指定镜像路径
    container_name: mysql # 指定容器名称
    ports: 
      - 3306:3306 # 指定端口映射
    environment: # 参数
      MYSQL_ROOT_PASSWORD: *** # 指定root密码
    volumes:
      - /usr/***:/var/lib.mysql # 映射数据卷    
~~~

##### 使用docker-compose 命令管理容器

> 在使用docker-compose 命令时，默认会在当前目录下找 docker-compose.yml文件

~~~sh
# 基于docker-compose.yml启动管理的容器
docker-compose up -d
# 关闭并删除容器
docker-compose down
# 开启|关闭|重启已经存在的由docker-compose维护的容器
docker-compose start|stop|restart
# 查看由docker-compose 管理的容器
docker-compose ps
# 查看日志
docker-compose logs -f
~~~

##### docker-compose 配合 dockerfile 使用

> 使用docker-compose.yml文件以及Dockerfile文件在生成自定义镜像的同时启动当前镜像，并且由docker-compose去管理容器

例:

~~~yaml
# yml
version: '3.1'
services: 
  ssm: 
    restart: always
    build: 
      context: ../      # 指定dockerfile文件的所在路径
      dockerfile: Dockerfile  # 指定Dockerfile 文件名称
    image: sss:1.0.1    # 指定dockerfile构建的镜像名称
    container_name: ssm # 指定容器名称
    ports: 
      - 8080:8080 # 指定端口映射
    environment: # 参数
      TZ: Asia/Shanghai # 指定时区
      
# dockerfile
from
copy
cmd
...
~~~

~~~sh
# 可以直接启动基于docker-compose.yml以及dockerfile文件构建的自定义镜像
# 如果自定义镜像不存在，会先构建出自定义镜像，如果自定义镜像存在，则直接运行这个自定义镜像
docker-compose up -d

# 重新构建自定义镜像
docker-compose build

# 运行前，重新构建
docker-compose up -d --build
~~~

## docker CI(持续集成)、CD(持续交付、持续部署)

~~~yaml
version: '3.1'
services:
  git1ab:
    image: 'twang2218/gitlab-ce-zh:11.1.4'
    container_name: "gitlab"
    restart: always
    privileged: true
    hostname: 'gitlab'
    environment:
      TZ: 'Asia/ Shanghai'
      GITLAB_OMNIBUS_CONFIG:
        external_url 'http://192.168.199.110'
        gitlab_rails['time_zone'] ='Asia/ Shanghai'
        gitlab_rails['smtp_enable'] = true
        gitlab_rails['git1ab_shell_ssh_port'] = 22
    ports:
      -'80:80'
      -'443:443'
      -'22:22'
    volumes:
      -/opt/docker_gitlab/config:/etc/gitlab
      -/opt/docker_git1ab/data:/var/opt/git1ab
      -/opt/docker_gitlab/1ogs:/var/1og/gitlab
~~~

将ssh的默认22端口，修改为其他端口

~~~sh
vi /etc/ssh/sshd_config
	PORT 22 -> ***

systemctl restart sshd
~~~





