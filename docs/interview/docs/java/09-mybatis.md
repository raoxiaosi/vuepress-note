# 09-mybatis

### 1.谈谈是Mybatis？

​	Mybatis是一个半ORM（对象关系映射）框架，它内部封装了JDBC，开发时只需要关注SQL语句本身，不需要花费精力去处理加载驱动、创建连接、创建statement等繁杂的过程。
​	mybatis通过xml或注解的方式将要执行的各种statement配置起来，并通过java对象和statement中sql的动态参数进行映射生成最终执行的sql语句，最后由mybatis框架执行sql并将结果映射为java对象并返回。

### 2、Mybaits的优缺点

​	优点：
​	（1）性能：基于SQL语句编程，直接编写原生态sql，可以严格控制sql执行性能，灵活度高。
​	（2）功能：提供映射标签，支持对象与数据库的ORM字段关系映射，自动结果封装；
​	（3）易用：与JDBC相比，消除了JDBC大量冗余的代码，不需要手动开关连接；
​	（4）拓展：很好的与各种数据库兼容，能够与Spring很好的集成；
​	
​	缺点：
​	（1）工作量：SQL语句的编写工作量较大，尤其当字段多、关联表多时，对开发人员编写SQL语句的功底有一定要求。
​	（2）移植性：SQL语句依赖于数据库，不同数据库语法上有差别，导致数据库移植性差，不能随意更换数据库。

### 3.Xml映射文件中，除了常见的select|insert|updae|delete标签之外，还有哪些标签？

（京东）还有很多其他的标签，<resultMap>、<parameterMap>、<sql>、<include>、<selectKey>，加上动态sql的9个标签，trim|where|set|foreach|if|choose|when|otherwise|bind等，其中<sql>为sql片段标签，通过<include>标签引入sql片段，<selectKey>为不支持自增的主键生成策略标签。

### 4.MyBatis的一级缓存和二级缓存

​	一级缓存：sqlSession级别的缓存
​	二级缓存：namespace级别的缓存，mapper文件级别的

### 5.工作原理

​	1）通过SqlSessionFactoryBuilder从mybatis-config.xml配置文件中构建出SqlSessionFactory。
​	2）通过SqlSessionFactory开启一个SqlSession，通过SqlSession实例获得Mapper对象并且运行Mapper映射的Sql语句。
​	3）完成数据库的CRUD操作和事务提交，关闭SqlSession。

### 6.通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

​	1）在Mybatis中，每一个<insert>、<delete>、<update>、<select>标签，都会被解析为一个MapperStatement对象。
​		Mapper 接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Mapper接口生成代理对象proxy，代理对象会拦截接口方法，转而执行MapperStatement所代表的sql，然后将sql执行结果返回。
​	2）Mapper接口里的方法，是不能重载的，因为是使用 全限名+方法名 的保存和寻找策略。
​	

### 7、Mybatis是如何进行分页的？分页插件的原理是什么？

​	Mybatis：使用RowBounds对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页。可以在sql内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。
​	分页插件：使用Mybatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql，根据dialect方言，添加对应的物理分页语句和物理分页参数。

### 8.懒加载原理

​	缓存关联查询的sql，当真正用到关联对象值的时候再去查出来。

### 9.简述一下Mybatis 的编程步骤

​	1）.创建 SqlSessionFactory
​	2）.通过 SqlSessionFactory 创建 SqlSession
​	3）.通过 sqlsession 调用executor执行数据库操作
​	4）.调用 session.commit()提交事务
​	5）.调用 session.close()关闭会话

### 11.Mybatis都有哪些Executor执行器？它们之间的区别是什么？

​	Mybatis有三种基本的Executor执行器，SimpleExecutor、ReuseExecutor、BatchExecutor。
​	SimpleExecutor：每执行一次update或select，就开启一个Statement对象，用完立刻关闭Statement对象。
​	ReuseExecutor：执行update或select，以sql作为key查找Statement对象，存在就使用，不存在就创建，用完后，不关闭Statement对象，而是放置于Map<String, Statement>内，供下一次使用。简言之，就是重复使用Statement对象。
​	BatchExecutor：执行update（没有select，JDBC批处理不支持select），将所有sql都添加到批处理中（addBatch()），等待统一执行（executeBatch()），它缓存了多个Statement对象，每个Statement对象都是addBatch()完毕后，等待逐一执行executeBatch()批处理。与JDBC批处理相同。

### 12.Mybatis是否可以映射Enum枚举类？

​	资料：https://www.cnblogs.com/qmillet/p/12523636.html
​		https://blog.csdn.net/a745233700/article/details/80977133
​	答：Mybatis可以映射枚举类，不单可以映射枚举类，Mybatis可以映射任何对象到表的一列上。映射方式为自定义一个TypeHandler，实现TypeHandler的setParameter()和getResult()接口方法。TypeHandler有两个作用，一是完成从javaType至jdbcType的转换，二是完成jdbcType至javaType的转换，体现为setParameter()和getResult()两个方法，分别代表设置sql问号占位符参数和获取列查询结果。