# spring原理剖析

> BeanDefinitionReader接口，读取类声明的信息
>
> 在把类信息交给BeanFactory实体化前，可以对类信息进行修改，BeanFactoryPostProcessor接口
>
> BeanFactory实例化对象，可以在实例化前和实例化后进行处理，BeanPostProcessor
>
> 还有一个接口是FactoryBean，也是实例化对象使用，用于个性化实例
>
> 整个过程中有一个很重要的组件是监听器，用于在某个阶段进行具体操作
>
> Environment，

<img src="/vuepress/images/java/spring/流程图.png"/>