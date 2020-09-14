# ThreadLocal

> ThreadLocal 保证线程之间属性的隔离，每个线程都有一份属性副本，ThreadLocalMap 是以线程为单位，线程的属性存放在 ThreadLocalMap 的 Entry 数组中
>
> ~~~java
> public void set(T value) {
>     Thread t = Thread.currentThread();
>     ThreadLocalMap map = getMap(t);
>     if (map != null)
>       map.set(this, value);
>     else
>       createMap(t, value);
> }
>
> // 每个线程都持有 ThreadLocalMap
> ThreadLocalMap getMap(Thread t) {
>  	return t.threadLocals;
> }
> // ThreadLocalMap 存放一个 Entry 数组
> static class ThreadLocalMap {
>   	// Entry 数组大小为 2 的n次幂，默认为 16，并以此规则进行扩容
>     private static final int INITIAL_CAPACITY = 16;
>     private Entry[] table = new Entry[INITIAL_CAPACITY];
> }
>
> // 每个线程的副本属性存在 Entry 数组中，这就涉及到数组下标的定位
> // 获取属性散列下标位置
> int len = table.length;
> // (len-1) 为 2ⁿ - 1 才能得到均匀的散列值
> int i = key.threadLocalHashCode & (len-1);
>
> // threadLocalHashCode
> private final int threadLocalHashCode = nextHashCode();
> // 这个值是根据 斐波那契散列法以及黄金分割算法确定的标准值，很神奇（数学很重要）
> private static final int HASH_INCREMENT = 0x61c88647;
> private static int nextHashCode() {
>   	return nextHashCode.getAndAdd(HASH_INCREMENT);
> }
> private static AtomicInteger nextHashCode = new AtomicInteger();
> ~~~

## 使用注意

> ThreadLocal 可能会导致内存泄漏问题
>
> ~~~java
> // ThreadLocal 本身有做内存方面的处理 WeakReference 弱引用
> static class ThreadLocalMap {
>   	static class Entry extends WeakReference<ThreadLocal<?>> {
>         /** The value associated with this ThreadLocal. */
>         Object value;
>
>         Entry(ThreadLocal<?> k, Object v) {
>           super(k);
>           value = v;
>         }
>     }
> }
> // 每次操作 entry数组（get, set）都会检查 entry 存放对象的引用 
> private int expungeStaleEntry(int staleSlot) {
>   
> }
>
> // 手动触发
> ThreadLocalMap->remove()
> ~~~
>
> <img src="/vuepress/images/java/thread/ThreadLocal-entry.png"/>
>
> ThreadLocal 不能保证线程安全问题
>
> ~~~properties
> 存放的数据应是每个对象私有的
> ~~~

