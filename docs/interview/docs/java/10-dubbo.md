# 10-dubbo

超时问题：https://www.cnblogs.com/ASPNET2008/p/7292472.html
支持协议：dubbo使用的协议
基于Dubbo的动态远程调用：https://blog.csdn.net/ganjing222/article/details/76033830

	https://www.jianshu.com/p/1ff25f65587c
dubbo 请求调用过程分析：https://blog.csdn.net/paul_wei2008/article/details/70076898

### 1.spi机制是什么？

​	SPI 全称为 Service Provider Interface，是一种服务发现机制。SPI 的本质是将接口实现类的全限定名配置在文件中，并由服务加载器读取配置文件，加载实现类。这样可以在运行时，动态为接口替换实现类。
​	

### 2.dubbo通信协议

​	https://www.cnblogs.com/jameszheng/p/10271341.html
​	dubbo协议：默认
​		连接个数：单连接
​		连接方式：长连接
​		传输协议：TCP
​		传输方式：NIO异步传输
​		序列化：Hessian二进制序列化
​		适用范围：小数据大并发，传入传出参数数据包较小（建议小于100K），消费者比提供者个数多，单一消费者无法压满提供者，尽量不要用dubbo协议传输大文件或超大字符串。
​		1、dubbo默认采用dubbo协议，dubbo协议采用单一长连接和NIO异步通讯，适合于小数据量大并发的服务调用，以及服务消费者机器数远大于服务提供者机器数的情况
​		2、他不适合传送大数据量的服务，比如传文件，传视频等，除非请求量很低。
​		3、Dubbo通过长连接减少握手，通过NIO及线程池在单连接上并发拼包处理消息，通过二进制流压缩数据，比常规HTTP等短连接协议更快。

### 3.服务序列化协议

​	hessian：（默认），效率高
​	json：效率低
​	java：效率低

### 4.说说 Dubbo 服务暴露的过程。	

​		Dubbo 会在 Spring 实例化完 bean 之后，在刷新容器最后一步发布 ContextRefreshEvent 事件的时候，通知实现了 ApplicationListener 的 ServiceBean 类进行回调 onApplicationEvent 事件方法，Dubbo 会在这个方法中调用 ServiceBean 父类 ServiceConfig 的 export 方法，而该方法真正实现了服务的（异步或者非异步）发布。

### 5.Dubbo配置文件加载的过程

​		https://www.jianshu.com/p/fe841df0b0a2
​		配置解析是通过DubboNamespaceHandler实现的，里面初始化时候会注册很多DubboBeanDefinitionParser，用于解析不同的标签，把它们转化为bean对象。

### 6.多版本

​	当一个接口实现，出现不兼容升级时，可以用版本号（version）过渡，多个不同版本的服务注册到同一个注册中心，版本号不同的服务相互间不引用。这个和服务分组的概念有一点类似。

### 7.注册中心的作用

​	服务动态加入；动态下线；动态发现服务；统一配置；统一管理。

### 8.doSubscribe: 服务动态发现的原理

​	资料：https://blog.csdn.net/u014634309/article/details/101626573
​	服务订阅通常有 pull 和 push 两种方式。pull 模式需要客户端定时向注册中心拉取配置，而 push 模式采用注册中心主动推送数据给客户端。
​	dubbo zk 注册中心采用是事件通知与客户端拉取方式。
​	服务第一次订阅的时候将会拉取对应目录下全量数据，然后在订阅的节点注册一个 watcher。一旦目录节点下发生任何数据变化，zk 将会通过 watcher 通知客户端。客户端接到通知，将会重新拉取该目录下全量数据，并重新注册 watcher。

### 9.服务治理中心的服务订阅模式

​	服务治理中心(dubbo-admin)，需要订阅 service 全量接口，用以感知每个服务的状态，所以订阅之前将会把 service 设置成 *，处理所有service。

### 10.ZK 模块订阅存在问题

​	资料：https://blog.csdn.net/u014634309/article/details/101626573
​	资料：https://mp.weixin.qq.com/s/9rVGHYfeE8yM2qkSVd2yEQ
​	ZK 第一次订阅将会获得目录节点下所有子节点，后续任意子节点变更，将会通过 watcher 进制回调通知。回调通知将会再次全量拉取节点目录下所有子节点。这样全量拉取将会有个局限，当服务节点较多时将会对网络造成很大的压力。

### 11.consumer是否会注册服务？

​	会，Consumer 写入的原因，是因为 OPS 服务治理的时候需要实时的消费者数据

### 12.半包、黏包问题

​	资料：https://www.jianshu.com/p/df928692c9ea
​		https://blog.csdn.net/zh_ka/article/details/84735879
​	dubbo是通过包头标注的方式实现的
​	方式：
​		分隔符、定长包、包头标注长度

### 13.Dubbo 同步、异步调用的几种方式

​	https://blog.csdn.net/qq_32523587/article/details/87826839
​	Dubbo 缺省dubbo协议采用单一长连接，底层实现是 Netty 的 NIO 异步通讯机制；基于这种机制，Dubbo 实现了以下几种调用方式：同步调用、异步调用、参数回调、事件通知。

### 14.Dubbo的服务请求失败怎么处理

​	超时重连机制，设置超时，重试次数。

### 15.dubbo超时重试原理

​	资料：https://www.cnblogs.com/ASPNET2008/p/7292472.html
​	原理：netty非阻塞，得到ResponseFuture 轮询问

### 16.重试机制会不会造成错误 

​	资料：http://love398146779.iteye.com/blog/2312115
​	会，正常情况下不会。
​		1）重复数据：如果超时重连时间设置不合理，可能导致连续重复调用，因为可能是被调用服务的业务处理慢，导致超时重连。（如发邮件）
​		2）服务雪崩：还有就是高并发情况下，系统请求变为正常值的retries倍，增加系统压力，容易引起服务雪崩

​	解决方式：
​		1）.对于核心的服务中心，去除dubbo超时重试机制，并重新评估设置超时时间。
​		2）.业务处理代码必须放在服务端，客户端只做参数验证和服务调用，不涉及业务流程处理。



​	