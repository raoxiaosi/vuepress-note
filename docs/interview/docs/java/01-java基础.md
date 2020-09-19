# 01-java基础

# 基础语法

### 1.在JAVA中如何跳出当前的多重嵌套循环？

​	1）标记方式 
​	2）break方式跳出当前循环
​	3）正常执行
​	4）异常终止：抛异常终止循环

### 2.switch语句能否作用在byte上，能否作用在long上，能否作用在String上?

​	switch可作用于char byte short int
​	switch可作用于char byte short int对应的包装类
​	switch不可作用于long double float boolean，包括他们的包装类
​	switch中可以是字符串类型,String(jdk1.7之后才可以作用在string上)
​	switch中可以是枚举类型

### 3.short s1 = 1; s1 = s1 + 1;有什么错? short s1 = 1; s1 += 1;有什么错?

​	第一个：错，需要强制转换
​	第二个：正确，+=1在底层有自动转换

### 4.char型变量中能不能存贮一个中文汉字?为什么?

​	可以，因为Java中使用的编码是Unicode，unicode编码字符集中包含了汉字，char型变量是用来存储Unicode编码的字符的，所以，char型变量中当然可以存储汉字啦。
​	扩展：utf-8 一个汉字占2-4字节
​	补充说明：unicode编码占用两个字节，所以，一个char类型占2个字节（16比特）。

### 5.使用final关键字修饰一个变量时，是引用不能变，还是引用的对象不能变？

​	总得来说对于一个final变量，如果是基本数据类型的变量，则其数值一旦在初始化之后便不能更改；如果是引用类型的变量，则在对其初始化之后便不能再让其指向另一个对象。
​	StringBuffer 案例见：https://blog.csdn.net/i_am_tomato/article/details/46762081

### 6.静态变量和实例变量的区别？

​	实例变量属于对象，创建对象时才实例化
​	静态变量带static修饰，属于类，不属于对象，程序启动时加载。

### 7.Integer与int的区别

​	Ingeter是int的包装类，int的初值为0，Ingeter的初值为null。
​	内存存放地址不一样，Integer与new Integer不会相等。不会经历拆箱过程，new出来的对象存放在堆，而非new的Integer常量则在常量池（在方法区），他们的内存地址不一样，

### 8.StringBuffer与StringBuilder的区别？

​	1）首先说运行速度，或者说是执行速度，在这方面运行速度快慢为：StringBuilder > StringBuffer > String  原因：String操作时候是创建对象和销毁对象的过程，其他两个则是直接对引用对象进行修改
​	2）在线程安全上，StringBuilder是线程不安全的，而StringBuffer是线程安全的	原因StringBuffer里面方法带同步synchronize

> 适用：
> ​		String：少量的字符串操作
> ​	　StringBuilder：单线程下大量的字符操作
> ​	　StringBuffer：多线程下大量的字符操作

### 9.构造器Constructor是否可被override?

​	构造器不能被继承，所以不能不能被重写

### 10.接口是否可继承接口? 抽象类是否可实现(implements)接口? 抽象类是否可继承具体类(concrete class)? 抽象类中是否可以有静态的main方法？

​	都行，普通类中有的都行

### 11.是否可以继承String类?

​	不可以，他是final类

### 12.基础数据类型占用的字节位

​    一字节等于比特位节；1 byte = 8 bit ；
   占1 byte ：byte ,boolean;
   占2 char :short，char
   占4 char :int ,float;
   占8 char ：double ,long

### 13.jdk和jre区别

​	JDK(Java Development Kit)是Java开发包：JRE所有 + Java的开发工具(javac、java、JConsole、jmc)
​	JRE(Java Runtime Enviroment)是Java的运行环境: JVM + 运行时所需的Java的基础类库(如Security、Date、Input/Output)

### 14.你能用Java覆盖静态方法吗？如果我在子类中创建相同的方法是编译时错误？

​	不能，静态方法不能被覆盖。在IDE定义的时候就会报错：不符合语法规范。

### 15.为什么 char 数组比 Java 中的 String 更适合存储密码？

​	1）由于字符串在 Java 中是不可变的，如果你将密码存储为纯文本，它将在内存中可用，直到垃圾收集器清除它. 并且为了可重用性，会存在 String 字符串池中, 它很可能会保留在内存中持续很长时间，从而构成安全威胁。
​	2）Java 本身建议使用 JPasswordField 的 getPassword() 方法，该方法返回一个 char[] 和不推荐使用的getTex() 方法，该方法以明文形式返回密码，由于安全原因。应遵循 Java 团队的建议, 坚持标准而不是反对它。
​	3）使用 String 时，总是存在在日志文件或控制台中打印纯文本的风险，但如果使用 Array，则不会打印数组的内容而是打印其内存位置。
​	4）使用后一定要擦除密码，String无法擦除

### 16、静态变量和实例变量的区别？ 

​	1）静态变量前要加static关键字
​	2）实例变量属于某个对象的属性，必须创建了实例对象，其中的实例变量才会被分配空间，才能使用这个实例变量。

### 17.sleep() 和 wait() 有什么区别? 

​	1）sleep是线程类（Thread）的方法，wait是Object类的方法；
​	2）sleep线程暂停执行指定时间，监控状态依然保持，到时后会自动恢复。调用sleep不会释放对象锁。wait本线程放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象发出notify方法（或notifyAll）后本线程才进入对象锁定池准备获得对象锁进入运行状态。
​	3）sleep可以在任何地方使用，wait只能在同步代码块中使用
​	4）sleep异常必须捕获，wait不需要

### 18.static 和 final 的区别

​	都能修饰变量，方法，类
​	1） static还能修饰静态代码块；final能修饰形参；
​	2）修饰变量:static变量在类加载（准备）时候完成加载，只分配一次内存，不依赖于任何实例，所有类共享；final变量表示变量引用不可变，类加载时候完成分配到方法区。
​	3）修饰方法:static方法属于类，不属于实例，并且必须实现，不能被abstract修饰，可继承，不能被覆盖；final方法不能被继承，覆盖；
​	4）修饰类：static类能够被继承；final不能被继承。

> **类加载顺序：**
> 	父类静态代码块 -> 子类静态代码块 -> 父类非静态代码块 -> 父类构造方法 -> 子类非静态代码块 -> 子类构造方法
>
> **final好处：**
> 	1.提高性能，jvm会缓存，仅访问final变量的时候，不会触发类的初始化
> 	2.不能被更改，无线程安全问题
>
> **static方法为什么不可以被覆盖**
> 	因为static方法是编辑时静态绑定的，不属于实例。而覆盖是运行时动态绑定，基于实例。

### 19.接口和抽象类的区别

​	1）抽象类里可以有构造方法；而接口内不能；
​	2）抽象类中可以包含静态方法，接口内不能；
​	3）抽象类中可以有普通成员变量、方法；而接口中只能有静态变量和抽象方法；
​	4）接口中的抽象方法只能是public类型的，并且默认即为public abstract 类型；抽象类都可以；
​	5）一个类可以实现多个接口，但只能继承一个抽象类。
​	

### 20.Runtime类

​	运行时，是一个封装了JVM的类。构造方法private，只能由jvm实例化。我们可以获取实例化对象来查看jvm的状态和操作jvm。

### 21.锁中断interrupt()方法，可以中断哪些线程

​	阻塞的线程：sleep、wait（对应notify）、suspend（对应resume）、yield、join



### 22.内部类可以引用它的包含类的成员吗？有没有什么限制？

​	静态内部类：可以访问带static的变量				资料：https://blog.csdn.net/hz_lizx/article/details/55046324
​	匿名内部类：可以访问带final的变量和本方法的变量 资料：https://www.cnblogs.com/eniac12/p/5240100.html
​	内部类：同一个.java文件的，和其他类的都不能调用，因为他不是public class
​	

### 23.final, finally, finalize的区别

​	finalize()是垃圾回收机制中的方法，清理对象时会调用。

### 24.wait和sleep的区别 

​	（1）sleep是Thread类的方法，wait是Object类中定义的方法
​	（2）sleep到设定的时间后会自动唤醒执行，wait不会
​	（3）sleep不会释放当前线程是拥有的锁，wait会自动释放锁资源。



# 面向对象



# 集合

### 1.集合框架，map，list，set 区别

​	1）list、set继承自Collection类，list有序可重复集合，set无序不可重复集合。子类...
​	2）map是一个接口，是以键值对存储数据的集合。子类...

### 2.List 和 Set 的区别

​	List：有序、可重复
​	set：无序、不可重复
​	资料：https://blog.csdn.net/sd4015700/article/details/38819421
​		  https://blog.csdn.net/u013361010/article/details/46610259

### 3.Arraylist 和 LinkedList区别

​	1）底层数据结构不同：Arraylist 底层使用的是Object数组；LinkedList 底层使用的是双向链表数据结构
​	2）因1导致适用场景不同
​	 ArrayList 的查询效率比较高，增删动作的效率比较差，适用于查询比较频繁，增删动作较少的元素管理集合。
​	 LinkedList 的查询效率低，但是增删效率很高。适用于增删动作的比较频繁，查询次数较少的元素管理集合。
​	3）因1导致LinkedList内存空间占用较大，因为每一个元素都需要上一个和下一个元素信息

### 4.ArrayList 和 Vector 的区别

​	1）同步性：Vector 是线程安全的，也就是说是同步的，而 ArrayList 是线程序不安全的，不是同步的 
​	2）数据增长：当需要增长时,Vector 默认增长为原来一培，而 ArrayList 却是原来的一半

### 5.说说hashMap

​	资料：https://juejin.im/post/5a215783f265da431d3c7bba
​	概述：HashMap是一个用于存储Key-Value键值对的集合，每一个键值对也叫做Entry。底层是哈希表（HashTable,数组+链表，主干是数组，数组的每个位置上存放的是链表）。

> ​	**Put原理：**根据对象的hashCode确定Entry的插入位置下标，然后插入（使用的是头插法）。
> ​	**get原理：**根据对象的hashCode确定Entry的所在位置下标，然后取出（如果位置是一个链表，则逐个equire对比）。
> ​	**初始长度：**16
> ​	**负载因子：**0.75
> ​	**扩容长度：**2的幂次方运算，服务于下面的求index位运算。
> ​	**求index（存放下标）方法：**
> ​		位运算：index = HashCode（Key） & （Length - 1）
> ​		意义：Length=2的幂，（Length - 1）的二进制全部位置都为1，
> ​			  HashCode（Key） & （Length - 1）求出的值分布很均匀
> ​	**线程不安全：**扩容rehash阶段链表可能会形成环形链表，造成死循环。

### 6.HashMap 是线程安全的吗，为什么不是线程安全的（最好画图说明多线程环境下不安全）?

​	不安全，可能形成环链（原因：头插法）；
​	资料：https://juejin.im/post/5a224e1551882535c56cb940

### 7.HashMap 和 Hashtable 的区别

​	1）HashTable线程安全（因为方法同步）、HashMap非线程安全；因为线程安全、哈希效率的问题，HashMap效率比HashTable的要高。
​	2）HashTable key和value都不可以为null,HashMap都可以
​	3）初始化和扩容方式不同：Hashtable初始11，扩容2n+1,HashMap默认16，扩容2倍
​	4）继承类不同：HashTable是继承自Dictionary类，而HashMap是继承自AbstractMap类

### 8.HashTable、ConCurrentHashMap异同

​	ConCurrentHashMap采用锁分段机制，即吧map分割成多个HashTable,操作时锁住相应（根据hash(paramK.hashCode())来决定）的分段。

### 9.HashMap为什么可以存null

​	默认处理，null存在0下标位置。

### 10.jdk1.8和1.7在hashMap上面的改进

​	1）数据结构：1.8数组+链表+红黑树结构（链表的上的元素大于8个会改成红黑树结构）；
​	2）rehash求下标：不重新计算index，元素不是在 原来位置 就是 原位置 + 扩容前容量；
​	3）尾插法：1.8使用尾插法，1.7头插法（并发resize导致链表逆序，可能最后首尾相接，行成环链）；
​	4）扩容时间：1.8插入成功后扩容，1.7是成功之前。
​	

### 11.ConcurrentHashMap怎么实现的？1.7和1.8区别？

​	资料：https://blog.csdn.net/qq_22343483/article/details/98510619
​	jdk1.7
​		ConcurrentHashMap使用分段锁机制，通过局部加锁来保证并发性能和保证线程安全。对比HashMap就是把主链上的数组切成多个段，每个段由一个Segment管理，Segment继承了ReentrntLock，所以有了锁的功能，可以加锁。

> ​	结构：Segment数组 + HashEntry数组 + HashEntry链表，主链是Segment数组，每个Segment下有一个HashEntry数组，HashEntry上每个位置是一个HashEntry链表。
> ​	创建：可指定并发级别，就是分为几个Segment段，之后不能修改。
> ​	put()：第一次hash(key)求定位到Segment，取锁，第二次Hash定位到元素所在HashEntry[]下标，插入，最后解锁。
> ​	get()：第一次hash(key)求定位到Segment，第二次Hash定位到元素所在HashEntry[]下标，链表里取出元素。
> ​	

> 区别：
> 	1）数据结构：取消了Segment分段的数据结构，取而代之的是数组+链表+红黑树的结构。
> 	2）链表转化为红黑树:定位结点的hash算法简化会带来弊端,Hash冲突加剧,因此在链表节点数量大于8时，会将链表转化为红黑树进行存储。
> 	3）查询时间复杂度：从原来的遍历链表O(n)，变成遍历红黑树O(logN)。
> 	4）锁的粒度：原来是对需要进行数据操作的Segment加锁（分段锁），现调整为对每个数组Node加锁（节点锁）。
> 	5）线程安全机制：JDK1.7采用segment的分段锁机制实现线程安全，其中segment继承自ReentrantLock，能进行锁操作。JDK1.8采用CAS+Synchronized保证线程安全（先使用CAS,失败后时候使用Synchronized）。

### 12.Hashset 如何保证集合的没有重复元素？

​	可以看出 hashset 底层使用了 hashmap，hashset添加元素实际将该元素 e 作为 key 放入 hashmap,当 key 值(该元素 e)相同时，只是进行更新 value，并不会新增加，所以 set 中的元素不会进行改变。

# 反射

### 1.Java 反射

​	java反射机制是在运行状态中，动态获取类的信息和操作类的方法和属性。
​	Class.forName() 和ClassLoader.loadClass()的区别：
​		1）Class.forName()会对类进行初始化；loadClass()只会装载或链接；
​		2）forName 在类加载时候会执行静态代码块中的代码；loadClass只有在调用newInstance方法的时候才会执行静态代码块代码；
​		3）forName 使用的是当前类加载器来加载；loadClass调用时需要指定类加载器。
​		

# 序列化

### 1.什么事序列化，怎么序列化

​	Java序列化是指把Java对象转换为字节序列的过程；而Java反序列化是指把字节序列恢复为Java对象的过程。从而达到网络传输、本地存储的效果。
​	Java 类只需要实现 java.io.Serializable 接口, JVM 就会把 Object 对象按默认格式序列化. 也可以自定义序列化格式。然后反序列化时，再转化为对象。序列化过程中如果没指定SerialVersionUID则会根据类结构生成一个，反序列化过程中会进行对比校验，如果不是同一个则会报错无效类异常 InvalidClassException。

### 2.在 Java 序列化期间,哪些变量未序列化？

trasient 变量、static变量、定义的writeObject和readObject方法中未列入序列化的变量，由于瞬态变量、静态变量属于类, 而不是对象, 因此它们不是对象状态的一部分, 因此在 Java 序列化过程中不会保存它们。
序列化只保存对象状态（即类名，属性），不保存方法。

### 3.Serializable 和 Externalizable 有什么区别, 或者在引入注解之后, 为什么不用 @Serializable 注解或替换 Serializalbe 接口。

​    1）Serializable 是标识接口，没有方法需要实现；
​		Externalizable 接口的序列化，需要重写writeExternal和readExternal方法，并且在方法中编写相关的逻辑完成序列化和反序列化。
​	2）Serializable提供了两种方式进行对象的序列化，(1)采用默认序列化方式，将非transient和非static的属性进行序列化 (2)编写readObject和writeObject完成部分属性的序列化；

​		  Externalizable 接口的序列化，需要重写writeExternal和readExternal方法，并且在方法中编写相关的逻辑完成序列化和反序列化。
​	3）Serializable接口实现，其采用反射机制完成内容恢复，没有一定要有无参构造函数的限制~
​		Externalizable接口的实现方式一定要有默认的无参构造函数~,如果，没有无参构造函数，反序列化会报错~ 验证一下~ Book添加一个有参数的Book构造函数~
​	4）采用Externalizable无需产生序列化ID（serialVersionUID）~而Serializable接口则需要~
​	5）相比较Serializable, Externalizable序列化、反序列更加快速，占用相比较小的内存
​	
​	

### 4.如果只想将部分属性进行序列化，可以采用如下几种方法：

​	1）使用transient关键字	

​	2）添加writeObject和readObject方法

​	3）使用Externalizable实现
​		

### 5.深拷贝

​	实现Cloneable，重写clone()方法，方法里边将属性（引用类型属性非基本类型）克隆一份。

# 泛型

# 异常

### 1.java常见的异常

​	资料：https://blog.csdn.net/liu_jian140126/article/details/50517001

​	**运行时异常(RuntimeException)：**
​		NullPointerException	ClassNotFoundException	NumberFormatException	IndexOutOfBoundsException	IllegalArgumentException	IllegalAccessException	ArithmeticException
​		ClassCastException		ArrayStoreException		NoSuchMethodException	OutOfMemoryException 
​	**检查式异常(CheckedException):**
​		IOException				FileNotFoundExcetion	FileNotFoundException 	NoSuchFiledException		SQLException

### 2.throws,throw区别

​	throws是用来声明一个方法可能抛出的所有异常信息
​	throw则是指抛出的一个具体的异常类型。

# 网络编程、web

### 1.tcp三次握手，为什么不两次？

​	tcp握手原则有两点：1.建立可靠连接；2.效率最高
​	三次握手是建立可靠连接的最少次数，

> 如果两次连接：1.能保证服务端能收到，但无法保证客户端能收到（网络出错丢了）；2.可能因为网络延迟原因，第一次握手服务端收到的已经是失效的连接，这时候客户端早已离开，不会再响应，如果服务器继续在等待的话就是无效等待。

### 2.tcp/udp

​	资料：https://baike.baidu.com/item/TCP/UDP%E5%8D%8F%E8%AE%AE/7719820
​	tcp（传输控制协议）：定义了两台计算机之间进行可靠的传输、交换数据和确认信息的格式。面向连接、数据有序、数据可靠（有校验机制，可重发，不丢失）。
​	udp（用户数据报协议）：是一个简单的面向数据报的传输层协议。面向无连接、数据无无序、数据不可靠（无校验机制，不能重发，可能丢失）。

### 3.http协议，HTTP 的请求过程？

​	域名解析 --> 发起TCP的3次握手 --> 建立TCP连接后发起http请求 --> 服务器响应http请求，浏览器得到html代码 --> 浏览器解析html代码，并请求html代码中的资源（如js、css、图片等） --> 浏览器对页面进行渲染呈现给用户
​	资料：https://www.cnblogs.com/engeng/articles/5959335.html

### 4.HTTP请求的GET与POST方式的区别

​	GET请求能够被缓存
​	GET请求会保存在浏览器的浏览记录中
​	GET请求的URL能够保存为浏览器书签
​	GET请求有长度限制
​	GET请求主要用以获取数据
​	

### 5.cookie和session的区别？

​	1）session 在服务器端，cookie 在客户端（浏览器）
​	2）session 默认被存在在服务器的一个文件里（不是内存）
​	3）session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session_id）
​	4）session 可以放在 文件、数据库、或内存中都可以。
​	5）用户验证这种场合一般会用 session

### 6.request.getAttribute() 和 request.getParameter() 有何区别？

​	前面的那个必须先set，后面的科一通过url取值，不用set
​	getParameter 得到的都是 String 类型的。或者是 http://a.jsp?id=123 中的 123，或者是某个表单提交过去的数据。
​	getAttribute 则可以是对象。
​	getParameter()是获取 POST/GET 传递的参数值；
​	getAttribute()是获取对象容器中的数据值；
​	

### 7.jsp九大内置对象

​	request、response、out、pageContext、session、applicaton、config、page、exception

### 8、js内置对象有哪些

​	11大内置对象：
​	Array、String、Date、Math、Boolean、Number、
​	Function、Global、Error、RegExp、Object。
​	

### 9、js中的6种数据类型

​	包括五种基本数据类型（Number,String,Boolean,Null,Undefined）,和一种混合数据类型（Object）
​	资料：https://www.cnblogs.com/starof/p/6368048.html
​		  http://www.jb51.net/article/101341.htm

### 10.form和ajax的区别

​	1）form会刷新页面，再快也会闪屏，ajax后台操作，体验好
​	2）form灵活性没那么好，比如不同参数请求地址不同，请求时候动态传参数，请求时操作节点，同步异步

# io/nio

### 1.netty

​	Netty本身只是个网络通讯框架，对nio的做了一层封装,能帮助我们快速开发高性能、高可靠性的网络服务器和客户端程序
​	优点：简答易用，性能高
​	Dubbo 协议默认使用 Netty 作为基础通信组件
​	淘宝的消息中间件 RocketMQ 的消息生产者和消息消费者之间，也采用 Netty 进行高性能、异步通信。

### 2.字节流与字符流的区别

​	资料：https://blog.csdn.net/lwang_it/article/details/78886186

​	字节流：就是普通的二进制流，读出来的是bit
​	字符流：就是在字节流的基础按照字符编码处理，处理的是char

> 字节流在操作时本身不会用到缓冲区（内存），是文件本身直接操作的，而字符流在操作时使用了缓冲区，通过缓冲区再操作文件。字节流：不关闭会执行，字符流：不关闭不执行
> ​	