(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{254:function(t,n,a){"use strict";a.r(n);var s=a(28),_=Object(s.a)({},(function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_04-数据库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_04-数据库"}},[t._v("#")]),t._v(" 04-数据库")]),t._v(" "),a("h3",{attrs:{id:"_1-事务的特性和隔离级别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-事务的特性和隔离级别"}},[t._v("#")]),t._v(" 1.事务的特性和隔离级别")]),t._v(" "),a("p",[t._v("​\t事务特性：acid\n​\t隔离级别：读已提交，读未提交、可重复度、序列化")]),t._v(" "),a("h3",{attrs:{id:"_2-索引的优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-索引的优缺点"}},[t._v("#")]),t._v(" 2.索引的优缺点")]),t._v(" "),a("p",[t._v("​\t优点：\n​\t\t1）加快检索速度\n​\t\t2）加速表连接，加速分组和排序\n​\t\t3）主键索引、唯一索引保证数据的唯一性")]),t._v(" "),a("p",[t._v("​\t缺点：\n​\t\t1）时间：表写操作减慢，因为创建和维护需要时间，并且耗费时间会随着数据量增加而增加\n​\t\t2）空间：索引需要额外占用物理空间，因为索引也是数据")]),t._v(" "),a("h3",{attrs:{id:"_3-分库分表垂直拆分缺点："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-分库分表垂直拆分缺点："}},[t._v("#")]),t._v(" 3.分库分表垂直拆分缺点：")]),t._v(" "),a("p",[t._v("​\t1）单机的acid被打破，有分布式事务问题\n​\t2）join操作变得比较困难，需要逻辑上操作解决\n​\t3）拆分列定义比较困难，哪些字段应该放哪张表。\n​")]),t._v(" "),a("h3",{attrs:{id:"_4-分库分表水平拆分缺点："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-分库分表水平拆分缺点："}},[t._v("#")]),t._v(" 4.分库分表水平拆分缺点：")]),t._v(" "),a("p",[t._v("​\t1）分表索引键的选取困难，查找条件未带分表索引键还是需要逐个表的扫描\n​\t2）主键和唯一索引的问题，如果主键生成规则设定不好，可能会重复。")]),t._v(" "),a("h3",{attrs:{id:"_5-binlog延迟问题解决方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-binlog延迟问题解决方案"}},[t._v("#")]),t._v(" 5.binlog延迟问题解决方案")]),t._v(" "),a("p",[t._v("​\t资料：https://www.cnblogs.com/phpper/p/8904169.html\n​\t\thttps://blog.csdn.net/hao_yunfeng/article/details/82392261\n​\t过程：从库同步binlog，对操作进行重放\n​\t\t1）主库对所有DDL和DML操作产生的日志写进binlog；\n​\t\t2） 从库会有一个I/O 线程去请求主库的binlog，\n​\t\t3）主库生成一个 log dump 线程，用来处理从库I/O线程的binlog读取请求；\n​\t\t4）从库读取成功后，将得到的binlog日志写到relay log文件中；\n​\t\t5）从库的SQL Thread会读取relay log文件中的日志解析成具体操作，将主库的DDL和DML操作事件重放。")]),t._v(" "),a("p",[t._v("​\t"),a("strong",[t._v("问题：")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("1. 主库宕机后，数据可能丢失；\n\t默认是异步复制\n\t开启半同步复制，确保主库事务提交后binlog至少传输到一个从库，不保证从库应用完成这个事务的binlog。\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("主从同步延迟。（Master负载过高、Slave负载过高、网络延迟、机器性能太低、MySQL配置不合理。）\n1)、架构方面（架构调整）\n1.分库：业务的持久化层的实现采用分库架构，把大库拆成小库，mysql服务可平行扩展，分散压力。\n2.读写分离：单个库读写分离，一主多从，主写从读，分散压力。这样从库压力比主库高，保护主库。比较重要的业务，实时性高的去读主库，像补偿型的去读从库。\n3.缓存：服务的基础架构在业务和mysql之间加入memcache或者redis的cache层。卸掉mysql的大部分读压力。\n4.分开部署：不同业务的mysql物理上放在不同机器，分散压力。\n5.硬件配置：使用比主库更好的硬件设备作为slave总结，mysql压力小，延迟自然会变小。\n2)、硬件方面（选配性能更好的配置）\n1.cpu：采用好服务器，比如4u比2u性能明显好，2u比1u性能明显好。\n2.磁盘：存储用ssd或者盘阵或者san，提升随机写的性能。\n3.网络：主从间保证处在同一个交换机下面，并且是万兆环境。\n总结，硬件强劲，延迟自然会变小。一句话，缩小延迟的解决方案就是花钱和花时间。\n3)、mysql主从同步加速\n1、sync_binlog在slave端设置为0\n2、–logs-slave-updates 从服务器从主服务器接收到的更新不记入它的二进制日志。\n3、直接禁用slave端的binlog\n4、slave端，如果使用的存储引擎是innodb，innodb_flush_log_at_trx_commit =2\n4)、从文件系统本身属性角度优化\n5)、网络优化，走专线")])]),t._v(" "),a("h3",{attrs:{id:"_6-为什么不用存储过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-为什么不用存储过程"}},[t._v("#")]),t._v(" 6.为什么不用存储过程")]),t._v(" "),a("p",[t._v("​\t1.移植性差：不同数据库存储过程语法相差很大\n​\t2.功能有限：数据库脚本语言功能有限，无法定义数组，集合等数据类型\n​\t3.编程模式：面向业务编程，而不要面向数据编程\n​\t4.调试：调试功能不强\n​")]),t._v(" "),a("p",[t._v("​")])])}),[],!1,null,null,null);n.default=_.exports}}]);