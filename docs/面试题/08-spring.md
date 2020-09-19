

### 1.说说spring

​	资料：https://www.jianshu.com/p/ce105ead1838

​	Spring是一个开源的,轻量级的javaee web框架，核心包括AOP、IOC、spring事务控制、容器等，基本上也是项目必用的，
​	它是个潜在的一站式解决方法，无侵入性，同时也很容易整合其他框架
​	问题：配置繁琐复杂，springboot解决

### 2.使用Spring框架的好处是什么？

​	轻量：Spring 是轻量的，基本的版本大约2MB。
​	容器：Spring 包含并管理应用中对象的生命周期和配置。
​	控制反转：Spring通过控制反转实现了松散耦合，对象们给出它们的依赖，而不是创建或查找依赖的对象们。
​	面向切面的编程(AOP)：Spring支持面向切面的编程，并且把应用业务逻辑和系统服务分开。
​	MVC框架：Spring的WEB框架是个精心设计的框架，是Web框架的一个很好的替代品。
​	事务管理：Spring 提供一个持续的事务管理接口，可以扩展到上至本地事务下至全局事务（JTA）。
​	异常处理：Spring 提供方便的API把具体技术相关的异常（比如由JDBC，Hibernate or JDO抛出的）转化为一致的unchecked 异常。

### 3.BeanFactory – BeanFactory 实现举例。

Bean 工厂是工厂模式的一个实现，提供了控制反转功能，用来把应用的配置和依赖从正真的应用代码中分离。最常用的BeanFactory 实现是XmlBeanFactory 类。

### 4.XMLBeanFactory 

最常用的就是org.springframework.beans.factory.xml.XmlBeanFactory ，它根据XML文件中的定义加载beans。该容器从XML 文件读取配置元数据并用它去创建一个完全配置的系统或应用。

### 5.解释JDBC抽象和DAO模块。

​	数据库连接：通过使用JDBC抽象和DAO模块，保证数据库代码的简洁，并能避免数据库资源错误关闭导致的问题，
​	错误处理：它在各种不同的数据库的错误信息之上，提供了一个统一的异常访问层。
​	事务：它还利用Spring的AOP 模块给Spring应用中的对象提供事务管理服务。

### 6.有哪些不同类型的IOC（依赖注入）方式？

​	构造器注入；get、set、p标签，
​	注入：byname、bytype、default
​	

### 7.解释Spring支持的几种bean的作用域。

singleton 、prototype、request、session、global-session

### 8.Spring框架中的单例bean是线程安全的吗?解决方式？

资料:https://blog.csdn.net/weixin_43727372/article/details/100324678
不，严格来讲Spring框架中的单例bean不是线程安全的。多个线程共享，存在资源竞争问题，但是否安全取决于bean是否是有状态的。
解决方式是：一般提供了通过ThreadLocal去解决线程安全的方法，因为ThreadLocal为每个线程保存线程私有的数据，比如RequestContextHolder、TransactionSynchronizationManager、LocaleContextHolder等。
bean作用域
	1）singleton:单例，默认作用域。
	2）prototype:原型，每次创建一个新对象。
	3）request:请求，每次Http请求创建一个新对象，适用于WebApplicationContext环境下。
	4）session:会话，同一个会话共享一个实例，不同会话使用不用的实例。
	5）global-session:全局会话，所有会话共享一个实例。

### 9.解释AOP

AOP， 是一种编程技术，允许程序模块化横切关注点，提取切面植入操作，如日志和事务管理。
业务逻辑与非功能代码解耦，使得开发人员能够专注于业务逻辑的实现而非繁杂的非功能代码，简化了编程与单元测试。

### 10.DispatcherServlet

​	Spring的MVC框架是围绕DispatcherServlet来设计的，它用来处理所有的HTTP请求和响应。

### 11.controller是什么

​	处理请求，解析用户输入并将其转换为视图呈现给用户的模型。

### 12.请求流程

​	请求到DispatcherServlet中，DispatcherServlet交由HandlerMapping处理，HandlerMapping 把请求map到相应的Controller处理，Controller执行完成后，DsipatcherServlet将返回 
​	的ModelAndView传给ViewReslover 视图解析器,ViewReslover解析完成后由最后DispatcherServlet 完成渲染响应。

### 13.Spring框架中的单例Beans是线程安全的么？

​	一般没什么问题，大部分的Spring bean并没有可变的状态(比如Service类和DAO类)，所以在某种程度上说Spring的单例bean是线程安全的。
​	如果你的bean有多种状态的话（比如 View Model 对象），就需要自行保证线程安全。

## 14.用到的设计模式

​	单例模式：在spring配置文件中定义的bean默认为单例模式。
​	工厂模式：BeanFactory用来创建对象的实例
​	代理模式：在AOP和remoting中被用的比较多，aop实现底层就是动态代理。
​	模板方法：用来解决代码重复的问题。比如. TransactionRestTemplate,JDBCTemplate JmsTemplate, JpaTemplate。
​	观察者模式： listener 的实现。如 ApplicationListener。
​	适配器模式：springmvc里DispatcherServlet的HandlerAdapter，advice通知使用到的AdvisorAdapter 
​	装饰器模式：BeanDefinitionDecorator，BeanWrapper

## 15.Spring AOP 和 AspectJ AOP 有什么区别?

​	Spring AOP 属于运行时增强（运行时生成代理类，创建代理对象），而 AspectJ 是编译时增强（代码编译的时候生成代理类，运行后直接用代理类）。

## 16.JDK动态代理与CGlib代理的区别

​	JDK动态代理只能对实现了接口的类生成代理，而不能针对类
​	CGLIB是针对类实现代理，主要是对指定的类生成一个子类，覆盖其中的方法（继承），需要类有无参数构造函数 ，不能代理final类，和类的final方法。
​	JDK的核心是实现InvocationHandler接口，使用invoke()方法进行面向切面的处理，调用相应的通知。
​	CGLIB的核心是实现MethodInterceptor接口，使用intercept()方法进行面向切面的处理，调用相应的通知。

### 17.jaassit和cglib动态代理创建过程

​	**javassit：**  
​		1.获取需要代理类上的所有接口列表；
​	    2.确定要生成的代理类的类名，默认为：com.sun.proxy.$ProxyXXXX ；
​	    3.根据需要实现的接口信息，在代码【】中动态创建 该Proxy类的字节码；
​	    4.将对应的字节码转换为对应的class 对象；
​	    5.创建InvocationHandler 实例handler，用来处理Proxy所有方法调用；
​	    6.Proxy 的class对象 以创建的handler对象为参数，实例化一个proxy对象

​	**cglib：**
​		1.查找类上的所有非final 的public类型的方法定义；
​		2.将这些方法的定义转换成字节码；
​		3.将组成的字节码转换成相应的代理的class对象；	
​		4.实现 MethodInterceptor接口，用来处理 对代理类上所有方法的请求（这个接口和JDK动态代理InvocationHandler的功能和角色是一样的）

### 18.BeanFactory和FactoryBean的区别

​	1）**BeanFactory**实际上是一个Factory，是一个接口，是管理spring bean的bean工厂，也就是IOC容器；
​		用文档中的原话说：
​			它是用于访问Spring bean容器的根接口。是bean容器的基本客户端视图。
​			BeanFactory实现应尽可能支持标准的bean生命周期接口。

​	2）**FactoryBean**是一个Bean，但他不是一个普通的bean，他是一个能修饰对象或创建对象的工厂bean，比如，我们再配置bean的时候，我们可以使用我们自己定义的工厂bean（通过fatory-bean属性指定）。
​		用文档中的原话说：
​			这是一个由BeanFactory中使用的对象 实现的接口，这些对象本身是单个对象的工厂。
​			如果bean类实现此接口，它将作为一个工厂对象去暴露，而不是直接当做普通bean实例暴露。
​			BeanFactory中获取FactoryBean实例的时候加一个&前缀。

### 19.spring ioc初始化过程：

​	是根据Xml配置创建容器，实例化bean的过程。
​	容器的初始化是通过AbstractApplicationContext的refresh()方法来完成的,大致分为3个步骤：
​		1.BeanDefinition的Resource定位
​		2.BeanDefinition的载入，向IoC容器注册BeanDefinition
​		3.实例化、初始化bean 

​	**具体流程：**
​		1.prepareRefresh()：容器初始化的一些准备工作，启动时间、启动标识设置，环境信息验证。
​		2.obtainFreshBeanFactory()：创建新的beanfactory，loadBeanDefinitions加载BeanDefinitions到beanFactory。
​		3.prepareBeanFactory()：准备beanFactory,设置类加载器、BeanPostProcessor、ignoreDependencyInterface忽略依赖接口设置
​		4.postProcessBeanFactory():设置beanFactory的后置处理
​		5.invokeBeanFactoryPostProcessors():调用beanFactory的后置处理器。
​		6.registerBeanPostProcessors():注册bean后置处理器，
​		7.initMessageSource()、initApplicationEventMulticaster()：初始化和国际化相关的MessageSource，初始化上下文的事件，
​		8.onRefresh()、registerListeners()：检查一些监听的bean并注册到容器中、注册一些特殊的bean后置处理器
​		9.finishBeanFactoryInitialization()：完成beanFactory初始化，实例化、初始化所有非延迟加载的单例bean。

### 	20.BeanFactory和ApplicationContext的区别

​		**BeanFactory**：
​			Spring里面最低层的接口，提供了最简单的容器的功能，只提供了实例化对象和拿对象的功能；
​			在启动的时候不会去实例化Bean，中有从容器中拿Bean的时候才会去实例化；

​		**ApplicationContext**：
​			继承BeanFactory接口，同时继承了多个其他接口，是一个更高级的的容器；
​			在启动的时候就把所有的Bean全部实例化了。它还可以根据Bean配置lazy-init=true来让Bean延迟实例化； 
​		

### 21.Spring Bean 的生命周期，如何被管理的

​	Bean的生命周期分为创建、使用、销毁三个状态。bean的创建是在容器初始化过程发生的
​	1）实例化：根据BeanDefinition创建Bean对象；
​	2）通过get、set方法设置对象属性、依赖注入
​	3）bean初始化：
​		执行xxxAutoWare接口的方法
​		执行beanPostProcessor的初始化前方法
​		执行InitializingBean#afterPropertiesSet方法；执行初始化方法init-method
​		执行beanPostProcessor的初始化后方法
​	4）Bean的使用、销毁

### 22.spring的循环依赖问题

​	资料：https://www.jianshu.com/p/9ea61d204559
​	A 依赖 B，B 依赖 C，C 又依赖 A
​	重点：获取对象的引用时，对象的属性是可以延后设置的。（但是构造器必须是在获取引用之前，毕竟你的引用是靠构造器给你生成的）。
​	构造器循环依赖：无论单例bean和原型bean都不支持，因为其底层加载出来的bean是放在一个set中，循环依赖加载完C再去加载A的时候判断A在set中存在，抛出异常。
​	设值循环依赖：单例bean支持。因为其提前缓存暴露创建中的单例。（使用三级缓存）

### 	23.spring三级缓存，三个map

​		资料:https://blog.csdn.net/f641385712/article/details/92801300
​		作用：用于解决循环依赖问题
​		1）.singletonObjects：用于存放完全初始化好的 bean，从该缓存中取出的 bean 可以直接使用
​		2）.earlySingletonObjects：提前曝露的创建中单例对象的cache，存放原始的 bean 对象（尚未填充属性），用于解决循环依赖
​		3）.singletonFactories：单例对象工厂的cache，存放 bean 工厂对象，用于解决循环依赖	

### 	24.spring AOP的原理，生成代理对象的时间

​		资料：https://www.jianshu.com/p/a8c7eda2a49c
​			https://blog.csdn.net/weixin_41446894/article/details/88351743
​			https://blog.csdn.net/MoreeVan/article/details/11977115?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.channel_param
​		AOP的原理是动态代理，在spring运行时，bean初始化过程创建代理对象。
​		过程：容器启动时加载解析aop的配置 - 同时注册Bean后置处理器AspectJAwareAdvisorAutoProxyCreator - 在bean初始化的时候会调用这个后置处理器 - 后置处理器根据加载的aop切点配置判断是否为目标对象 - 
​			  如果是则创建代理对象，不是则直接返回原bean

### 25.如果要你实现Spring IOC，你会注意哪些问题？

​	1）拓展设计：首先定义好容器初始化的主要规范，初始化步骤和bean的生命周期是怎么样子。为拓展性设计，这样开发者就可以优雅的介入容器初始化过程。比如：bean创建可以指定自定义工厂，用户可以自定义bean后置处理器来优雅的介入bean的初始化。
​	2）生命周期：要创建一个容器，这个容器要可以提供bean的生命周期管理，因为bean一直在容器中，不断的获取bean可以造成内存溢出，还有bean的作用域，不同作用域创建的时间点，以及销毁时间点。
​	3）循环依赖：要解决bean的循环依赖问题，对于prototype或构造器注入时要抛出异常，否则会造成死循环。

### 26.Spring 是如何管理事务的，事务管理机制？ 

​	事务的用的是aop实现的，那底层是动态代理，就是配置了事务的方法，统一把事务管理权交给TransactionManager。
​	事务分类、区别：
​		编程式事务：使用TransactionTemplate；代码块级别，灵活
​		声明式事务：注解；方法级别，不灵活；
​		

### 27.事务传播行为：

​	资料：https://www.cnblogs.com/eunice-sun/p/11024584.html
​	**传播行为:**
​	REQUIRED：如果当前存在事务，则加入该事务，如果当前不存在事务，则创建一个新的事务。
​	REQUIRES_NEW：重新创建一个新的事务，如果当前存在事务，延缓当前的事务。
​	SUPPORTS：如果当前存在事务，则加入该事务；如果当前不存在事务，则以不用事务继续运行。
​	NOT_SUPPORTED：以非事务的方式运行，如果当前存在事务，暂停当前的事务。
​	MANDATORY：如果当前存在事务，则加入该事务；如果当前不存在事务，则抛出异常。
​	NEVER：以非事务的方式运行，如果当前存在事务，则抛出异常。
​	NESTED：如果没有，就新建一个事务；如果有，就在当前事务中嵌套其他事务。（和REQUIRES_NEW很像，但是不太一样，嵌套事务时设置savePoint，回滚阶段不会全量回滚）
​	
​	**事务隔离级别：**
​	DEFAULT ：这是一个PlatfromTransactionManager默认的隔离级别，使用数据库默认的事务隔离级别。另外四个与JDBC的隔离级别相对应。
​	READ_UNCOMMITTED（读未提交）：这是事务最低的隔离级别，它允许另外一个事务可以看到这个事务未提交的数据。这种隔离级别会产生脏读，不可重复读和幻像读。 
​	READ_COMMITTED （读已提交）	：保证一个事务修改的数据提交后才能被另外一个事务读取，另外一个事务不能读取该事务未提交的数据。这种事务隔离级别可以避免脏读出现，但是可能会出现不可重复读和幻像读。 
​	REPEATABLE_READ （可重复读）：这种事务隔离级别可以防止脏读、不可重复读，但是可能出现幻像读。它除了保证一个事务不能读取另一个事务未提交的数据外，还保证了不可重复读。
​	SERIALIZABLE（序列化） 		：这是花费最高代价但是最可靠的事务隔离级别，事务被处理为顺序执行。除了防止脏读、不可重复读外，还避免了幻像读。 

​		

### 	28.aop术语

​		https://www.cnblogs.com/lhuser/p/8947584.html
​		https://segmentfault.com/a/1190000018120725
​		1）连接点（Joinpoint）：类中可以被增强的方法，以及方位（执行前、后，异常后等）
​		2）切点（Pointcut）  ：也叫切入点，类中有四个方法可以被增强，这四个是连接点，实际操作中实际增强的方法就是切入点
​		3）增强（Advice）：增强的逻辑，比如日志功能，日志功能即为增强
​		4）目标对象（Target）：需要被增强的对象（即符合切点规则的类的实例）
​		5）引介（Introduction）：引介是一种特殊的增强，它为类添加一些属性和方法。这样，即使一个业务类原本没有实现某个接口，通过AOP的引介功能，我们可以动态地为该业务类添加接口的实现逻辑，让业务类成为这个接口的实现类。   
​		6）织入（Weaving）：织入是将增强添加到目标类具体连接点上的过程。
​		7）代理（Proxy）：一个类被AOP织入增强后，就产出了一个结果类，它是融合了原类和增强逻辑的代理类。
​		8）切面（Aspect）：增强和切入点的组合。