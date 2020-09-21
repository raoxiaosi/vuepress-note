## 安装 vuepress

~~~shell
npm install -g vuepress --registry=https://registry.npm.taobao.org
~~~



## 安装运行环境

~~~shell
# 进入 package.json 文件所在的文件夹
npm install --registry=https://registry.npm.taobao.org
~~~



## 运行

~~~shell
vuepress dev docs
~~~



## 构建 打包

```shell
vuepress build docs
```



## 使用WinSCP工具上传到服务器

> 1. 进入 script 文件夹
>
> 2. 新建一个文件，名为 sendFile.bat，内容如下
>
>    ~~~bash
>    option echo on
>    option batch on
>    option confirm off
>
>    # 连接服务器 例: root:mypwd@192.168.1.11
>    open 用户:密码@服务器ip地址
>    # 上传到服务器哪个位置
>    cd /usr/local/nginx/html
>    # 将本地的 vuepress 文件夹上传到服务器的 /usr/local/nginx/html 目录下
>    put vuepress
>
>    option transfer binary
>    option synchdelete off
>    remote
>    close
>
>    exit  
>    pause
>    ~~~
>
> 3. 先执行目录下的 打包.bat 程序 --- 双击执行
>
> 4. 生成静态文件【dist文件夹】，再执行 传送到服务器.bat 程序 --- 双击执行