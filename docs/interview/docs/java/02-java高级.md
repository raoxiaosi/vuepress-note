# 02-java高级

# 底层设计

### 1.为什么等待和通知是在 Object 类而不是 Thread 中声明的？

​	资料：https://yq.aliyun.com/articles/713464
​	1） wait 和 notify 不仅仅是普通方法或同步工具，更重要的是它们是 Java 中两个线程之间的通信机制。对语言设计者而言, 如果不能通过 Java 关键字(例如 synchronized)实现通信此机制，同时又要确保这个机制对每个对象可用, 那么 Object 类则是的正确声明位置。记住同步和等待通知是两个不同的领域，不要把它们看成是相同的或相关的。同步是提供互斥并确保 Java 类的线程安全，而 wait 和 notify 是两个线程之间的通信机制。
​	2）面向对象设计，每个对象都可上锁，这是在 Object 类而不是 Thread 类中声明 wait 和 notify 的另一个原因。
​	3）从资源获取方面来说，线程执行时候不需要关注其他线程是否持有锁，只需要知道自己线程内对象资源是否有锁。（如：你在去买东西，肯定只会去问上商家这件东西有没有被买走，而不是逐个去问顾客）

### 2.为什么Java中不支持多重继承？

​	1）会产生钻石形继承问题，即假如一个类 A 有 foo() 方法, 然后 B 和 C 派生自 A, 并且有自己的 foo() 实现，现在 D 类使用多个继承派生自 B 和C，如果我们只引用 foo(), 编译器将无法决定它应该调用哪个 foo()。
​	2）设计思路转换：多重继承确实使设计复杂化并在转换、构造函数链接等过程中产生问题。假设你需要多重继承的情况并不多，简单起见，明智的决定是省略它。Java 可以通过使用接口支持单继承来避免这种歧义。

### 3.为什么Java不支持运算符重载？

​	1）没必要重载这些基础的东西。简单性和清晰性。清晰性是Java设计者的目标之一。
​	2）避免编程错误。让开发工具处理更容易。降低JVM复杂性。不要为设计而设计。

### 4.为什么 String 在 Java 中是不可变的？为什么 String 在 Java 中是 final 的。

​	主要出于安全和效率考虑
​	1）效率：为提高效率，多个String变量可同时引用字符串池中同一个String值，如果可String可变，修改会导致其他引用此变量值改变。
​	2）安全：字符串已被广泛用作许多 Java 类的参数，例如，为了打开网络连接，你可以将主机名和端口号作为字符串传递，如果 String 不是不可变的，这将导致严重的安全威胁，我的意思是有人可以访问他有权授权的任何文件，然后可以故意或意外地更改文件名并获得对该文件的访问权限。
​	3）效率：Java 中的不可变 String 缓存其哈希码，并且不会在每次调用 String 的 hashcode 方法时重新计算，这使得它在 Java 中的 HashMap 中使用的 HashMap 键非常快。

### 5.为什么Java中 wait 方法需要在 synchronized 的方法中调用？

​	资料：https://blog.csdn.net/qq_42145871/article/details/81950949
​	首先wait(),notify(),notifyAll()都是java中多线程之间的同步机制，调用wait()就是释放锁让给其他线程，调用notify(),notifyAll()是将锁交给含有wait()方法的线程，让其继续执行下去。
​	但这些释放锁前提是他们拥有锁。（出去了就已经解锁了）（线程进入同步代码块的时候拥有了对象独占锁，其他调用该同步方法的线程就会处于阻塞状态，此线程进入入口队列。）

# 并发编程

### 1.ThreadLocal

​	资料:https://www.jianshu.com/p/3c5d7f09dfbd
​		https://www.jianshu.com/p/1a5d288bdaee

​	每个线程都拥有一个ThreadLocalMap, 而threadlocal负责访问和维护线程的ThreadLocalMap.
​	ThreadLocalMap内部是一个Entry[]，每个Entry的key为当前操作的threadlocal对象，属于弱引用，value为设置的值，属于强引用。每次get(),set(),resize()的时候都会清理线程ThreadLocalMap中key为null的entry.

> #### 作用：
>
> ​		1）保存线程上下文信息，在任意需要的地方可以获取！！！
> ​		2）避免某些情况需要考虑线程安全必须同步带来的性能损失！！！
>
> #### 可能发生问题：
>
> ##### 发生内存泄露，条件如下：
>
> ​		1）ThreadLocal实例没有被外部强引用，比如：我们假设在提交到线程池的task中实例化的ThreadLocal对象，当task结束时，对ThreadLocal的强引用也就结束了（ThreadLocalMap的key对它是弱引用）
> ​		2）ThreadLocal实例被回收，但是在ThreadLocalMap中的V没有被任何清理机制有效清理
> ​		3）当前Thread实例一直存在，则会一直强引用着ThreadLocalMap，也就是说ThreadLocalMap也不会被GC
> ​		
>
> ##### 共享对象问题：
>
> ​		1）如果在每个线程中ThreadLocal.set()进去的东西本来就是多个线程共享的同一对象，比如static对象，那么多个线程调用ThreadLocal.get()获取的内容还是同一个对象，还是会发生线程安全问题。
> ​		2）线程池同一个Thread的同一个ThreadLocal操作，设置的对象是线程内共享的，如果执行完成后不清除，则可能被下次其他任务给获取到。
> ​		
>
> ##### 安全问题解决：
>
> ​		1）使用服务对象无状态化
> ​		2）变量私有化
> ​		3）竞争加锁

### 2.自旋锁

自旋锁上锁后让等待线程进行忙等待而不是睡眠阻塞，而信号量是让等待线程睡眠阻塞。 自旋锁的忙等待浪费了处理器的时间，但时间通常很短，在 1 毫秒以下。

### 3.锁优化

​	尽量不用，要用则：锁选择、锁粗化、锁时间（自旋）、避免死锁。

### 4.著名的C10K并发连接问题

​	即单机1万个并发连接，如何处理的问题，如果采用传统bio处理io请求，每一个连接创建一个线程处理，那大概率因为系统开销大被压垮，即使资源宽裕不压垮也会是一种效率低的方法，因为其中有一部分并非有效连接。
​	核心解决方式就是通过nio+线程池方式处理。

### 5.线程池的种类，区别和使用场景？

​	资料：https://www.cnblogs.com/sachen/p/7401959.html
​		  https://blog.csdn.net/paul342/article/details/52442932
​		  https://blog.csdn.net/lovesimly/article/details/52680287
​		  https://zhuanlan.zhihu.com/p/161628226
​		  https://www.yuque.com/yinjianwei/vyrvkf/ch9gn1	

为什么要用线程池：
		创建线程开销：分配内存、列入调度、内存换页、清空缓存和重新读取
		1）线程复用：避免频繁创建线程，因为线程创建需要开销。（每个线程创建分配栈内存，堆内存等）
		2）保护系统：防止大并发下批量创建线程，线程数量不可控，这样会导致系统崩溃。（文件句柄、数据库连接等有限）
		3）集中管理：统一分配、队列、拒绝策略管理

```
newCachedThreadPool：一个缓冲型线程池，用于执行很多短期异步的任务或者负载较轻的服务，线程按需创建。
	corePoolSize：0，
	maximumPoolSize：Integer.MAX_VALUE，
	keepAliveTime：60L；
	unit：TimeUnit.SECONDS；
	当有新任务提交过来，阻塞的检查当前若没有空闲可用线程则创建一个线程来执行该任务；若池中线程空闲时间超过指定大小，则该线程会被销毁。
	
newFixedThreadPool:一个固定线程数的线程池，用于执行长期的任务，线程可重用，性能好很多
	corePoolSize、maximumPoolSize：nThread，
	keepAliveTime：0L(不限时)；
	unit：TimeUnit.MILLISECONDS；
	WorkQueue为：new LinkedBlockingQueue<Runnable>() 无解阻塞队列
	特点：固定线程，不限时，无界队列
	
newSingleThreadExecutor:一个单线程线程池，一个任务一个任务执行的场景(FIFO,LIFO)
	corePoolSize、maximumPoolSize：1，
	keepAliveTime：0L(不限时)；
	unit：TimeUnit.MILLISECONDS；
	WorkQueue为：new LinkedBlockingQueue<Runnable>() 无解阻塞队列
	特点：单线程，无限时，无界队列

NewScheduledThreadPool:一个周期调度执行线程池，周期性执行任务的场景
	特点：多线程，无限时，无界队列，周期调度
```
### 6.分析线程池的实现原理和线程的调度过程？

​	实现原理：预先创建一些线程，供调用，可重用

##### 	参数：

> 1. **corePoolSize**（线程池的核心线程数）：当提交一个任务到线程池时，线程池会创建一个线程来执行任务，即使其他空闲的基本线程能够执行新任务也会创建线程，等到需要执行的任务数大于线程池的核心线程数时就不再创建。如果调用了线程池的 prestartAllCoreThreads() 方法，线程池会提前创建并启动所有核心线程。
> 2. **maximumPoolSize**（线程池最大数量）：线程池允许创建的最大线程数。如果队列满了，并且已创建的线程数小于最大线程数，则线程池会再创建新的线程执行任务。值得注意的是，如果使用了无界的任务队列这个参数就没什么效果。
> 3. **keepAliveTime**（线程活动保持时间）：线程池的工作线程空闲后，保持存活的时间。当线程数量超过核心线程数，或者设置核心线程允许过期 allowCoreThreadTimeOut(true)，线程会有一个过期时间。
> 4. **TimeUnit****（线程活动保持时间的单位）**：可选的单位有天（DAYS）、小时（HOURS）、分钟（MINUTES）、毫秒（MILLISECONDS）、微秒（MICROSECONDS，千分之一毫秒）和纳秒（NANOSECONDS，千分之一微秒）。
> 5. **workQueue**（任务队列）：用于保存等待执行的任务的阻塞队列。可以选择以下阻塞队列。
>
> 6. - **ArrayBlockingQueue**：一个基于数组结构的有界阻塞队列，此队列按 FIFO（先进先出）原则对元素进行排序。
>    - **LinkedBlockingQueue**：一个基于链表结构的阻塞队列，此队列按 FIFO 排序元素，吞吐量通常要高于 ArrayBlockingQueue。静态工厂方法 Executors.newFixedThreadPool() 使用了这个队列。
>    - **SynchronousQueue**：一个不存储元素的阻塞队列。每个插入操作必须等待另一个线程调用移除操作，否则插入操作一直处于阻塞状态，吞吐量通常要高于 LinkedBlockingQueue，静态工厂方法Executors.newCachedThreadPool 使用了这个队列。
>    - **PriorityBlockingQueue**：一个具有优先级的无限阻塞队列。
>
> 7. **ThreadFactory**：用于设置创建线程的工厂，可以通过线程工厂给每个创建出来的线程设置更有意义的名字。
>
> 8. **RejectedExecutionHandler（饱和策略）**：当队列和线程池都满了，说明线程池处于饱和状态，那么必须采取一种策略处理提交的新任务。这个策略默认情况下是 AbortPolicy，表示无法处理新任务时抛出异常。在 JDK 1.5 中 Java 线程池框架提供了以下4种策略。
>
> 9. - **AbortPolicy**：直接抛出异常。
>    - **CallerRunsPolicy**：只用调用者所在线程来运行任务。
>    - **DiscardOldestPolicy**：丢弃队列里最近的一个任务，并执行当前任务。
>    - **DiscardPolicy**：不处理，丢弃掉。

##### 	调度过程：

> ​		资料：https://www.cnblogs.com/sachen/p/7401959.html
> ​			  https://blog.csdn.net/wangxw725/article/details/65456484
> ​		当线程池小于corePoolSize时，新提交任务将创建一个新线程执行任务，即使此时线程池中存在空闲线程。
> ​		当线程池达到corePoolSize时，新提交任务将被放入workQueue中，等待线程池中任务调度执行
> ​		当workQueue已满，如果maximumPoolSize>corePoolSize时，新提交任务会创建新线程执行任务
> ​		当线程数达到maximumPoolSize时，新提交任务由RejectedExecutionHandler处理
> ​		当线程池中超过corePoolSize线程，空闲时间达到keepAliveTime时，关闭空闲线程
> ​		当设置allowCoreThreadTimeOut(true)时，线程池中corePoolSize线程空闲时间达到keepAliveTime也将关闭
> ​		

### 7.线程池如何调优，最大数目如何确认？

​	资料：https://www.cnblogs.com/jianzh5/p/6437315.html
​		  http://www.importnew.com/17384.html
​		  https://blog.csdn.net/zyzzxycj/article/details/90290176

​	设置最大线程数、最小线程、线程池任务大小考虑因素：
​	 	系统资源：根据系统tps以及服务器硬件资源决定，比如应用CPU、内存资源（堆和栈）、TCP连接数、远程数据库连接数，这些资源能扛住多大线程数分配。
​		 任务类型：再结合任务类型 CPU密集型应用 或 io密集型应用 进行预估。

​	最大线程数：首先，我们要确保达到线程上限时，不会引起资源耗尽。	 

​	最小线程数：
​		综合任务的频率特征，可以的简单评估一下，没有统一的标准。
​		
​	 最佳值：需要大量性能测试后才能得出。
​	
​	 粗略分配（如果资源充裕）：
​		 N为CPU核心数
​		 CPU密集型：N + 1
​		 IO密集型：2N + 1

### 8.Condition接口及其实现原理

### 9.Fork/Join框架的理解

​	工作窃取模式,分拆任务执行,合并统计

### 10.悲观锁、乐观锁

​	1）乐观锁：表里加个version，修改前和提交前两次获取版本号，如果两次版本号一致（则说明期间没被修改过），则提交修改，版本号加一。
​			需要自己实现。
​			类似：CAS机制，redis
​	2）悲观锁：
​		共享锁：
​		排它锁：数据修改时候锁定数据，不让其他线程操作，数据库自身提供了实现
​			行锁：
​			间隙锁：
​			next-lock：

### 11.线程的基本状态以及状态之间的关系

​	新建-->等待-->就绪-->运行状态-->阻塞状态-->死亡状态
​	网址：https://blog.csdn.net/bornlili/article/details/55805732

### 12.如何检测死锁？怎么预防死锁？

​	资料：https://blog.csdn.net/ls5718/article/details/51896159
​	死锁条件：互斥条件、不剥夺条件、请求和保持条件、循环等待条件。
​	避免死锁：加锁顺序、记得释放、加锁时限、死锁检测

### 13.JMM 中的 happens-before 原则

​	程序顺序原则，即在一个线程内必须保证语义串行性，jvm编译优化需要不改变原有语义
​	1）加锁规则：加锁先于解锁
​	2）赋值原则：定义先于赋值
​	3）传递原则：A 先于 B ，B 先于 C（如赋值操作）
​	4）线程启动规则：启动先于其他操作执行
​	5）volatile 规则 volatile 变量的写，先发生于读

### 14.指令重排原因

​	资料：https://blog.csdn.net/lindanpeng/article/details/72459493
​	指令在排序的时候是并行的。

### 15.volatile的作用

​	原理：变量在写的时候加了一个store屏障，会实时的将本地内存的值回写到主存；其他线程在读的时候加了load屏障，强制的把主存中的值读到本地内存，而不是直接读本地线程的。
​	1）保证内存的可见性:一个线程修改了变量状态后，其他线程能够看到发生变化
​	2）防止指令重排：jvm在编译器和执行器方面加入了内存屏障，防止指令重排优化

### 16.保证内存可见性的方法

​	可见性：一个线程修改了变量，对其他线程立即可见
​	保证可见性的方法：
​		volatile
​		synchronized （unlock之前，写变量值回主存）
​		final(一旦初始化完成，其他线程就可见)

### 17.volatile 和 synchronize的区别

​	1）volatile对于多线程，不是一种互斥关系，不会加锁，不会阻塞；
​	2）不能保证变量状态的“原子性操作”，即count ++ 这种操作
​	3）volatile算是轻量锁，没有synchronize安全
​	4）volatile仅能使用在变量级别，synchronize能使用在变量，方法，类级别
​	

### 18.synchronize原理

​	synchronize是由jvm实现的一种实现线程同步互斥的方式。
​	Jvm 对象都有对象头，对象头是实现 synchronized 的基础。对象头包含Mark Word,Mark Word 包括重量级锁，重量级锁的指针指向 monitor 对象（监视器锁，由三部分组成（一个独占锁，一个入口队列，一个等待队列））
​	所以每一个对象都与一个 monitor 关联，当一个 monitor 被某个线程持有后， 它便处于锁定状态。
​	被synchronize修饰的代码块，在编译后，前后被编译器生成了monitorenter和monitorexit两个字节码指令（其实有两个monitorexit指令，一个处理正常释放，另一个处理异常释放）。
​	同步代码块:线程执行monitorenter指令时尝试获取对象monitor的所有权(过程：monitor进入数0则进入，同时+1，否则重新获取)。
​	同步方法：判断执行的方法如果是同步方法则，则获取monitor，获取成功执行方法体，执行完释放monitor。

### 19.CAS乐观锁缺点

​	1）只能保证一个共享变量的原子操作。
​	2）长时间自旋可能导致内存开销大
​	3）BAB问题

### 20.ReentrantLock原理

​	内部通过volatile变量state维持锁状态，通过CAS机制来获取锁。
​	当state=0的时候说明没有锁，CAS尝试去获取锁操作，获取成功则state=1，并且设置线程锁拥有者为当前线程；
​	如果state!=0,但锁拥有者已经是当前线程，则重入，state+1；
​	如果state!=0,并且锁拥有者不是当前线程，则addWaiter加入到等待队列。

### 21.CountDownLatch、CyclicBarrier、Semaphore

​	CountDownLatch：闭锁，一个线程计数器。可设置线程数量count，每执行完一个线程调用countDown()让count-1，调用await()方法一直阻塞等待，直到所有线程执行完即count=0的时候继续往下执行。
​	CyclicBarrier：循环屏障，多个线程执行时候，可以协调控制所有线程到达屏障点的时候再往下执行。形象比喻：集齐七龙珠，召唤神龙。
​	Semaphore：信号量，用于限制并发资源总数。用完归还，循环重用。一个萝卜坑，坑位就这么多。
​	Exchanger：这个类用于交换数据，只能用于两个线程。当一个线程运行到 exchange()方法时会阻塞，另一 个线程运行到 exchange()时，二者交换数据，然后执行后面的程序。
​	CountDownLatch、CyclicBarrier区别：CountDownLatch不可重置，也就是不可重用的。

### 22.Semaphore可以维护访问自身线程个数，并提供了同步机制

​	资料：https://blog.csdn.net/zzp_403184692/article/details/8017173
​		  https://blog.csdn.net/u011613354/article/details/51150248
​	Semaphore可以维护访问自身线程个数，并提供了同步机制
​	Java实现互斥线程同步有三种方式synchronized、lock 、单Semaphore	

### 23.ArrayBlockingQueue、LinkedBlockingQueue并发安全

​	ArrayBlockingQueue：保证并发的安全性是基于，ReetrantLock 和 Condition 实现，其中有两个重要的成员变量 putindex 和 takeindex。
​	LinkedBlockingQueue：进行锁分离，分读锁写锁（putLock，takeLock），提高并发性能。

### 24.synchronized 和 lock 有什么区别？

​	资料：https://blog.csdn.net/u012403290/article/details/64910926?locationNum=11&fps=1
​		  https://www.cnblogs.com/baizhanshi/p/6419268.html
​		  中断测试：https://blog.csdn.net/dongyuxu342719/article/details/94395877
​	**区别：**

| 类别   | synchronized                          | Lock                                     |
| ---- | ------------------------------------- | ---------------------------------------- |
| 存在层次 | Java的关键字，在jvm层面上                      | 是一个类                                     |
| 实现方式 | 通过jvm对象的对象头标记实现                       | 通过volatile变量的内存可见性原理和CAS机制实现             |
| 锁状态  | 无法判断                                  | 可以判断                                     |
| 锁的获取 | 假设A线程获得锁，B线程等待。如果A线程阻塞，<br />B线程会一直等待 | 分情况而定，Lock有多个锁获取的方式，大致就是可以尝试获得锁，<br />线程可以不用一直等待 |
| 锁的释放 | 自动释放锁                                 | 手动在finally中必须释放，发生异常自动释放                 |
| 锁类型  | 可重入 不可中断 非公平                          | 可重入 可中断 可公平（两者皆可）                        |
| 性能   | 少量同步                                  | 大量同步                                     |

> 为什么要有Lock
> 	1.特性：可重入 可中断 可公平
> 	2.锁特性：读写锁，读共享，写独占。

### 25.锁的分类

​	可重入锁：同一线程在执行对象中所有同步方法不用再次获得锁。可重入锁是锁的一个基本要求，是为了解决自己锁死自己的情况。同时可重入也提高效率。
​	可中断锁：在等待获取锁过程中可中断
​	公平锁： 按等待获取锁的线程的等待时间进行获取，等待时间长的具有优先获取锁权利
​	非公平锁：不按等待时间顺序还获取锁，如synchronized，在锁释放后所有线程都可以竞争获取锁。
​	读写锁（读共享，写互斥）：对资源读取和写入的时候拆分为2部分处理，读的时候可以多线程一起读，写的时候必须同步地写

​	偏向锁：ReentrantLock，当对象没有竞争时，默认使用偏向锁。即设置当前对象的锁拥有者为当前线程，表示锁偏向于当前线程，后续的可重入就是一种偏向行为。
​	轻量级锁：ReentrantLock，当对象已经加锁（即有偏向锁的对象），则会取消偏向锁（先看是否重入），切换到轻量级锁（即通过CAS机制来获取锁）。
​	重量级锁：轻量级锁获取失败，则会升级到重量级锁，即阻塞等待。
​	场景：偏向锁则是在只有一个线程执行同步块时进一步提高性能，轻量级锁是为了在线程交替执行同步块时提高性能，重量级锁在多线程锁竞争激烈的情况下性能高。

​	乐观锁：
​	悲观锁：
​	自旋锁：
​	阻塞锁：	

# jvm

### 1.描述一下JVM加载class文件的原理机制?

​	类加载器把class文件加载到jvm过程，加载-验证-准备-解析-初始化

### 2.Java内存结构、内存模型、对象模型

​	资料：https://www.jianshu.com/p/dff4bd49d25a
​	**JVM内存结构：**线程共享：堆内存、方法区；线程独有：栈内存、本地方法栈、程序计数器。
​	**Java内存模型：**Java堆和方法区是多个线程共享的数据区域。多个线程可以操作堆和方法区中的同一个数据。Java的线程间通过共享内存进行通信
​	**Java对象模型：**
​		对象头：
​			Mark Word：存储对象hashCode、锁信息、分代年龄、gc标记
​			元数据指针(Class Metadata Address)：指向方法区里的类地址；
​		实体：实例数据。

### 3.方法区、永久代、元空间的关系

​	资料：https://www.jianshu.com/p/66e4e64ff278
​		https://blog.csdn.net/shennyuan/article/details/105186083?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.channel_param
​	**方法区：**HotSpot jvm规范中的一个区域（其他四个：栈、堆、本地方法栈、程序计数器），用于存放类结构（字段数据、方法数据、构造器字节码）、常量池、静态变量
​	**永久代、元空间：**是方法区规范的实现。像Java中接口和实现类的关系，方法区定义内存管理接口，永久代、元数据实现方法区内存管理接口。
​		在JDK1.7之前：永久代是方法区的实现，存放的字符串常量池、静态变量等移出至堆内存（相当于方法区存的是地址，实体在堆里）。运行时常量池等剩下的东西还在永久代（方法区）。
​		在JDK1.8及以后：永久代被元空间替代，改动的是：元空间使用的是直接内存。

> 为什么要将永久代(PermGen)替换为元空间(MetaSpace)呢?
> 	调优困难、GC效率低：永久代的调优是很困难的，虽然可以设置永久代的大小，但是很难确定一个合适的大小，因为其中的影响因素很多，比如类数量的多少、常量数量的多少等。永久代中的元数据的位置也会随着一次full GC发生移动，比较消耗虚拟机性能。所以元数据区放在堆外。

### 4.GC是什么？为什么需要GC

​	GC(GabageCollection)是垃圾收集的意思。当程序运行一段时间后，会有许多废弃的对象，这些对象不回收会占用内存造成资源浪费，对程序性能造成影响甚至崩溃。java提供的GC功能就是
​	一种自动垃圾回收机制，自动的去检测清除废弃的对象。

### 5.如何判断一个对象是否存活？

​	1）引用计数法：被引用了，count +1,count最终为零的为废弃对象。有缺陷，循环引用问题
​	2）可达性算法：从GC Roots的对象开始向下搜索，没有任何引用链相连的为废弃对象。

### 6.jvm对锁做了哪些优化

​	自旋锁： Java 6 之前，monitor的实现完全依赖于操作系统的mutex lock互斥锁实现，而因为线程的阻塞或唤醒操作都要操作系统协助，所以锁的获取和释放会引起线程的用户态和内核态切换，对处理器性能消耗
​		很大。所以jdk进行了优化，自旋锁，避免这种切换。
​	锁消除：判断是否有必要加锁，没必要就消除掉。（如对StringBuffer操作加锁，会消除）
​	锁粗化：多次连续加锁进行合并，减少取锁的次数。
​	

### 7.jvm编译做了哪些优化

​	锁消除：判断是否有必要加锁，没必要就消除掉。（如对StringBuffer操作加锁，会消除）
​	锁粗化：多次连续加锁进行合并，减少取锁的次数。
​	指令重排：字节码指令重排。
​	String常量池复用：定义String时候会去常量池中先找一下有没有，有的话不会再创建，直接使用现有的。
​	String hashCode缓存。

### 8.谈jvm的优化策略

​	释义：jvm优化就是根据应用的具体情况来合理调整内存分配
​	目的：能用较小的内存开销达到相等或更高的性能
​	策略：策略其实没有一个统一的标准，需要根据系统情况评估，如：垃圾收集对象主要有哪些和占用空间，这些对象的会话频率和会话持续时间，以及服务的负载与并发，是响应时间优先还是吞吐优先。
​		然后进行一个评估，尝试分配内存。初始分配可能会不合理，后续可以根据线上监测的gc数据和应用现象再进行调整。

### 9.如何减少 GC 的次数

​	1.对象不用时最好显示置为 NULL，去除引用，gc不可达会直接清除
​	2.尽量少使用 System,gc()，尽量少用 finaliza 函数
​	3.尽量少使用静态变量
​	4.尽量使用 StringBuffer,而不使用 String 来累加字符串，因为会产生很多小对象
​	5.能用基本类型入 INT 就不用对象 Integer
​	6.增大-Xmx 的值	

### 10.GC收集器，回收算法。

​	GC收集器：串行收集器（serial），并行收集器（parallel）、并发收集器（CMS，并发标记收集器）、G1收集器
​	回收算法：复制算法，标记清除算法，标记压缩算法。

> 优缺点：
> 	串行收集器：
> 		最古老，最稳定
> 		效率高（stop-the-word全局停顿，只做垃圾清理。就像扫地，如果有活动进行的话会有不断的垃圾产生，永远扫不完）
> 		可能会产生较长的停顿
> 		
> 	并行收集器
> 		最古老，最稳定
> 		效率高
> 		多线程不一定比单线程快（在GC对象小的时候），因为多线程协调需要消耗性能
> 		
> 	并发收集器：
> 		尽可能降低停顿
> 		会影响系统整体吞吐量和性能，因为GC线程在并发执行
> 		清理不彻底，GC线程在清理时，程序线程在产生新垃圾
> 		
> 	G1收集器
> 		使用标记整理算法，空间整合，不会产生空间碎片，
> 		可预测停顿时间，有预测模型
> 		兼顾吞吐和响应时间，适合于大堆服务GC（大于4G）

### 11.你们设置的jvm参数有哪些？

​	栈内存：512k
​	非堆内存：最大256M
​	堆内存：
​		最小堆：256
​		最大堆：1024
​		年轻代比例：1:1，年轻代，老年代各50%
​		年轻代各个区的比例：3:2，伊甸区：from：to = 3:1:1（生产是自动调节：-XX:UseAdaptiveSizePolicy）

​	收集器：
​		cms收集器：UseConcMarkSweepGC
​		触发GC：CMSInitiatingOccupancyFraction=70%，内存使用比例达到70%时候触发GC
​		内存碎片压缩：UseCMSCompactAtFullCollection
​		内存碎片压缩频率：
​	
​	GC日志打印相关：
​		gc格式：时间
​		文件路径：
​		内存溢出堆dump触发：HeapDumpOnOutOfMemoryError=/root/xxxx/dump.sh
​		堆dump路径：HeapDumpPath

### 12.你们用的是哪种种收集器，为什么这么用

​	**老年代：**用的是CMS收集器，老年代用的是标记清除算法，因为老年代存活的对象会比例比较高（经过伊甸区，from，to区后存活下来的），标记清除算法效率比较高；同时并行并发收集，能够尽可能的降低停顿。
​	**年轻代：**用的是Parllel收集器，使用的是复制算法，因为年轻代频繁创建对象，存活率会比较小，复制算法效率比较高；并且多线程并行收集、Parllel可以自己调节各区大小，保证系统吞吐优先。

> 前置系统、客户系统（响应时间优先）：ParNew（cms默认）+ CMS
> ncc系统、对账系统（吞吐量优先）：Parllel + ParllelOld（-XX:UseAdaptiveSizePolicy开启自适应调节策略，会自动态调节新生代中Edam和survivor区的大小，以达到最大吞吐性能）

### 13.jvm默认那个GC收集器

​	parallel收集器

### 14.GC问题排查步骤，OOM问题排查

​	OOM算是我们排查的结果，重要首先在于我们是怎么发现OOM异常的，是程序慢服务，报错；或者通过监控系统发现了指标异常；还是说服务直接就挂了。
​		1）如果是慢服务，报错：我们可以先查下业务日志，看下能不能快速定位到问题；不能的话在走排查流程，如下：
​		2）监控系统发现了指标异常：首先就是看下各项指标了，有异常最好保留案发现场，如下：
​		3）服务直接挂了：我们一般会设置jvm参数，当发生OOM时候自动触发dump脚本，把案发现场保存，进一步分析如下：
​	一般进行以下步骤（线上实际有触发）（这些也比较原始，成熟的一般都会有监控系统，我们以前用的就是zabix,可以清晰的看到cpu、内存、io、网络、数据库连接负载情况、使用率情况，应用GC等情况）
​	top查看cpu、内存负载，是否有异常，内存占用是不是特别高
​	GC情况查看各个区容量，使用率，GC频率，时间等等。
​	jmap -histo 应用程序的堆快照和对象的统计信息
​	jmap -dump:format=b,file=	堆dump
​	jstack 		栈dump
​	MAT：报告生成，哪个地方抛的异常，大对象饼图；
​		每个类对象数量、占用空间；
​		对象支配树，入、出引用情况；
​		线程信息，深堆、浅堆大小。

### 15.OOM问题有几种

​	1）永久代溢出（OOM：PermGen space）：非堆内存设置的太小了，类太多存不下那么多数据（引入jar太多、动态代理创建class太多）。
​			解决方法：设置大一点，jvm参数加【】class回收。
​			

​	2）堆溢出：堆内存不够，如：数组分配，缓冲区分配时候。
​		解决方法，注意及时释放。
​		
​	3）线程池使用：无界队列；线程池没关闭导致TreadLocal泄漏问题；

​	4）死循环：导致程序一直异常执行内存一直分配；递归计算

​	5）堆外内存溢出：OutOfMemoryError: Direct buffer memory，发生在NIO下的堆外内存分配。
​		解决方法：去掉-XX:+DisableExplicitGC
​	
​	6）栈内存扩容：栈、本地方法栈内存不足，设置的jvm参数允许动态扩容，扩容时却无法申请到内存。程序计数器是唯一一个不会发生oom的区域。

​	7）fullGC：YGC存活对象转移到老年代，担保机制失败、担保机制成功后实际内存不够

​	8）CMS：收集器并发收集时内存不够

### 16.System.gc常识

​	system.gc其实是做一次full gc
​	system.gc会暂停整个进程
​	system.gc一般情况下我们要禁掉，使用-XX:+DisableExplicitGC
​	system.gc在cms gc下我们通过-XX:+ExplicitGCInvokesConcurrent来做一次稍微高效点的GC(效果比Full GC要好些)
​	system.gc最常见的场景是RMI/NIO下的堆外内存分配等，如果使用-XX:+DisableExplicitGC，则会导致堆外内存溢出。

### 17.死锁检测

​	资料：https://www.cnblogs.com/flyingeagle/articles/6853167.html
​	1）Jconsole在线检测
​	2）jstack pid 栈dump出来分析

# 操作系统

### 1.线程、进程

​	进程：是系统进行资源分配和调度的一个独立单位，最小的资源管理单位。
​	线程：是进程的一个实体，最小的 CPU 执行单元。， 是 CPU 调度和分派的基本单位，它是比进程更小的能独立运行的基本单位。

### 2.操作系统 CPU 调度算法

​	1）先来先服务调度算法（FCFS）:
​	2）短作业优先调度算法 (SPF):
​	3）最高响应比优先算法(HRN)：
​	4）基于优先数调度算法(HPF)：
​	5）时间片轮转调度算法
​	

### 3.select epoll

​	select 缺点: 

​		1）最大并发数限制：使用 32 个整数的 32 位，即 32*32=1024 来标识 fd，虽然可修改， 但是有以下第二点的瓶颈； 

​		2）效率低：每次都会线性扫描整个 fd_set，集合越大速度越慢； 

​		3）内核/用户空间内存拷贝问题。 

​	epoll 的提升： 

​		1）本身没有最大并发连接的限制，仅受系统中进程能打开的最大文件数目限制； 

​		2）效率提升：只有活跃的 socket 才会主动的去调用 callback 函数；

​		3）省去不必要的内存拷贝：epoll 通过内核与用户空间 mmap 同一块内存实现。

### 4.不同编码占用字节

​	ASCII码：一个英文字母（不分大小写）占一个字节的空间，一个中文汉字占两个字节的空间。
​	UTF-8编码：一个英文字符等于一个字节，一个中文（含繁体）等于二~四个字节。
​	Unicode编码：一个英文等于两个字节，一个中文（含繁体）等于两个字节。
​	