# Struts

### 1.谈谈struts

​		是一个按MVC模式设计的Web层框架

### 2.请求流程

​	请求过来-->struts解析struts-config.xml配置文件-->请求转发到对应action处理-->action可能会调用validate对参数进行验证-->验证通过调用execute方法-->根据配置文件配置返回指定结果页面
​	

### 3.vs spring

​	请求级别：spring请求处理是方法级别的，一个方法可以处理一个请求，struts是类级别的，一个类处理一个请求
​	复杂度：struts配置文件繁琐，spring基于注解
​	性能：struts性能低（每次都创建一个新的action），倾入性高（耦合，前后端分离），有线程安全性问题

​		

# Hibernate

### 1.谈谈Hibernate

​		是一个开源的orm框架，通过操作对象来操作数据，进行数据持久化
​	

### 2.vs mybatis

​		自动化：Hibernate是一个全自动的orm映射工具，通过操作对象来操作数据，完全面向对象的；mybatis半自动化，需要写sql语句
​		常规操作：hibernate不用写sql，完全通过操作对象操作数据，简单方便，mybatis需要手写sql，易错
​		复杂操作：hibernate对复杂操作比较难适应，因为完全封装起来了，sql自动生成，难以优化；mybatis易优化
​		性能低：hibernate性能低，mybatis性能高
​		侵入性：hibernate侵入性高
​			在耦合性，性能方面打都选mybatis