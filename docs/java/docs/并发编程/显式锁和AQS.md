# 显式锁和AQS

## 显式锁


> 显式锁使用的范式
>
> ~~~java
> lock.lock();
> try{
>   // ****
> }finally{
>   lock.unlock();
> }
> ~~~

<img src="/images/java/thread/微信图片_20200920170353.png"/>



> synchronized 在性能消耗上比 Lock 好，synchronized 是语法， Lock是类
>
> 可重入锁，比如递归调用的线程可以持同一把锁，不至于自己锁死自己
>
> 公平锁和非公平锁，非公平锁的性能消耗较小，因为在线程唤醒上下文切换时，新来的线程可以不用排在活跃线程的最后去等待，可以去直接竞争锁
>
> 读锁和写锁是互斥的，读锁和读锁之间可并行的
>
> Condition 类似于 wait/notify

##### 可重入锁


> 在获取锁的时候，如果已经有其它线程拿到了锁，则判断这个线程是不是当前线程，如果是当前线程，则将 state + 1，释放锁的时候 state -1
>
> ~~~java
> // 参考 ReentrantLock 的实现
>
> // 获取锁
> protected final boolean tryAcquire(int acquires) {
>   final Thread current = Thread.currentThread();
>   int c = getState();
>   if (c == 0) {
>     if (!hasQueuedPredecessors() &&
>         compareAndSetState(0, acquires)) {
>       setExclusiveOwnerThread(current);
>       return true;
>     }
>   }
>   else if (current == getExclusiveOwnerThread()) {
>     int nextc = c + acquires;
>     if (nextc < 0)
>       throw new Error("Maximum lock count exceeded");
>     setState(nextc);
>     return true;
>   }
>   return false;
> }
>
> // 释放锁
> protected final boolean tryRelease(int releases) {
>   int c = getState() - releases;
>   if (Thread.currentThread() != getExclusiveOwnerThread())
>     throw new IllegalMonitorStateException();
>   boolean free = false;
>   if (c == 0) {
>     free = true;
>     setExclusiveOwnerThread(null);
>   }
>   setState(c);
>   return free;
> }
> ~~~

##### 共享锁，操作 state，保证原子性

> ~~~java
> // 获取锁
> public int tryAcquireShared(int reduceCount) {
>   for (;;) {
>     int current = getState();
>     int newCount = current - reduceCount;
>     if (newCount < 0 || compareAndSetState(current, newCount)) {
>       return newCount;
>     }
>   }
> }
>
> // 释放锁
> public boolean tryReleaseShared(int returnCount) {
>   for (;;) {
>     int current = getState();
>     int newCount = current + returnCount;
>     if (compareAndSetState(current, newCount)) {
>       return true;
>     }
>   }
> }
> ~~~

##### 共享锁和独占锁释放锁的区别

> ~~~java
> // 共享锁
> public void unlock() {
>   sync.releaseShared(1);
> }
>
> // AbstractQueuedSynchronizer 类的方法
> public final boolean releaseShared(int arg) {
>   if (tryReleaseShared(arg)) {
>     doReleaseShared();
>     return true;
>   }
>   return false;
> }
>
> // 需要自己实现
> protected boolean tryReleaseShared(int arg) {
>   throw new UnsupportedOperationException();
> }
>
> // 唤醒后继节点的线程并且同步状态传播
> private void doReleaseShared() {
>   /*
>   * Ensure that a release propagates, even if there are other
>   * in-progress acquires/releases.  This proceeds in the usual
>   * way of trying to unparkSuccessor of head if it needs
>   * signal. But if it does not, status is set to PROPAGATE to
>   * ensure that upon release, propagation continues.
>   * Additionally, we must loop in case a new node is added
>   * while we are doing this. Also, unlike other uses of
>   * unparkSuccessor, we need to know if CAS to reset status
>   * fails, if so rechecking.
>   */
>   for (;;) {
>     Node h = head;
>     if (h != null && h != tail) {
>       int ws = h.waitStatus;
>       if (ws == Node.SIGNAL) {
>         if (!compareAndSetWaitStatus(h, Node.SIGNAL, 0))
>           continue;            // loop to recheck cases
>         unparkSuccessor(h);
>       }
>       else if (ws == 0 &&
>                !compareAndSetWaitStatus(h, 0, Node.PROPAGATE))
>         continue;                // loop on failed CAS
>     }
>     if (h == head)                   // loop if head changed
>       break;
>   }
> }
> ~~~
>
> ~~~java
> // 独占锁
> public void unlock() {
>   sync.release(1);
> }
>
> // AbstractQueuedSynchronizer 类的方法
> public final boolean release(int arg) {
>   if (tryRelease(arg)) {
>     Node h = head;
>     if (h != null && h.waitStatus != 0)
>       unparkSuccessor(h);
>     return true;
>   }
>   return false;
> }
> ~~~

##### 读写锁

> 获取显示锁的操作都是对 state 进行操作及判断，state 是int类型 占32位，为实现读写互斥，16高位为读锁，16低位为写锁，读锁是共享锁，写锁是独占锁，因读锁是共享锁，state 标识已经不能实现锁的可重入，所以线程的重入次数存放在线程的 ThreadLocal 中
>
> ~~~java
> // 参看 ReentrantReadWriteLock
> ~~~

##### 公平锁和非公平锁

> ~~~java
> // 非公平锁
> static final class NonfairSync extends Sync {
>   private static final long serialVersionUID = 7316153563782823691L;
>
>   /**
>   * Performs lock.  Try immediate barge, backing up to normal
>   * acquire on failure.
>   */
>   final void lock() {
>     if (compareAndSetState(0, 1))
>       setExclusiveOwnerThread(Thread.currentThread());
>     else
>       acquire(1);
>   }
>
>   protected final boolean tryAcquire(int acquires) {
>     // 调用了 Sync 的nonfairTryAcquire方法
>     return nonfairTryAcquire(acquires);
>   }
> }
>
>
> class Sync{
>   // 说明可重入锁默认是非公平的
>   final boolean nonfairTryAcquire(int acquires) {
>     final Thread current = Thread.currentThread();
>     int c = getState();
>     if (c == 0) {
>       // 区别
>       if (compareAndSetState(0, acquires)) {
>         setExclusiveOwnerThread(current);
>         return true;
>       }
>     }
>     else if (current == getExclusiveOwnerThread()) {
>       int nextc = c + acquires;
>       if (nextc < 0) // overflow
>         throw new Error("Maximum lock count exceeded");
>       setState(nextc);
>       return true;
>     }
>     return false;
>   }
> }
>
> ~~~
>
> ~~~java
> // 公平锁
> static final class FairSync extends Sync {
>   private static final long serialVersionUID = -3000897897090466540L;
>
>   final void lock() {
>     acquire(1);
>   }
>
>   /**
>   * Fair version of tryAcquire.  Don't grant access unless
>   * recursive call or no waiters or is first.
>   */
>   protected final boolean tryAcquire(int acquires) {
>     final Thread current = Thread.currentThread();
>     int c = getState();
>     if (c == 0) {
> 	  // 区别	
>       if (!hasQueuedPredecessors() &&
>           compareAndSetState(0, acquires)) {
>         setExclusiveOwnerThread(current);
>         return true;
>       }
>     }
>     else if (current == getExclusiveOwnerThread()) {
>       int nextc = c + acquires;
>       if (nextc < 0)
>         throw new Error("Maximum lock count exceeded");
>       setState(nextc);
>       return true;
>     }
>     return false;
>   }
> }
> ~~~

## AQS

<img src="/images/java/thread/微信图片_20200921173429.png">

<img src="/images/java/thread/微信图片_20200921172931.png"/>

<img src="/images/java/thread/微信图片_20200922135557.png"/>