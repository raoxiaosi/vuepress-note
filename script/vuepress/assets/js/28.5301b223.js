(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{273:function(t,a,s){"use strict";s.r(a);var n=s(28),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"并发编程基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#并发编程基础"}},[t._v("#")]),t._v(" 并发编程基础")]),t._v(" "),s("h2",{attrs:{id:"基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),s("h4",{attrs:{id:"thread-和-runnable-的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#thread-和-runnable-的区别"}},[t._v("#")]),t._v(" Thread 和 Runnable 的区别")]),t._v(" "),s("blockquote",[s("p",[t._v("Thread 类是线程的抽象")]),t._v(" "),s("p",[t._v("Runnable 是业务的抽象")])]),t._v(" "),s("h4",{attrs:{id:"interrupt"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#interrupt"}},[t._v("#")]),t._v(" interrupt")]),t._v(" "),s("blockquote",[s("p",[t._v("设置线程的中断标志位，不会中断线程，线程可以实时监控标识位状态，进而对线程进行控制")]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 该方法不会清除中断标志位")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isInterrupted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isInterrupted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 该方法对清除中断标志位")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("interrupted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("currentThread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isInterrupted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("native")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isInterrupted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ClearInterrupted")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br")])]),s("p",[t._v("如果线程抛出 InterruptedException 的异常，线程的中断标志位会被重置为 false，需要捕获异常进行再次中断线程操作")])]),t._v(" "),s("h4",{attrs:{id:"yield"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yield"}},[t._v("#")]),t._v(" yield")]),t._v(" "),s("blockquote",[s("p",[t._v("将线程从运行转到可运行状态，让出CPU执行权，但不会释放锁、sleep方法也是")])]),t._v(" "),s("h4",{attrs:{id:"守护线程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#守护线程"}},[t._v("#")]),t._v(" 守护线程")]),t._v(" "),s("blockquote",[s("p",[t._v("用户线程结束后，守护线程也会结束，所以守护线程的finally方法不一定会执行")])]),t._v(" "),s("h4",{attrs:{id:"synchronized"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#synchronized"}},[t._v("#")]),t._v(" synchronized")]),t._v(" "),s("blockquote",[s("p",[t._v("锁的是对象，static 修饰的方法上的synchronized锁的是类的class对象")])]),t._v(" "),s("h4",{attrs:{id:"volatile"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#volatile"}},[t._v("#")]),t._v(" volatile")]),t._v(" "),s("blockquote",[s("p",[t._v("适用于一写多读的场景，只能保证可见性不能保证原子性")])]),t._v(" "),s("h4",{attrs:{id:"wait-notify-notifyall"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#wait-notify-notifyall"}},[t._v("#")]),t._v(" wait , notify/notifyAll")]),t._v(" "),s("blockquote",[s("p",[t._v("wait , notify/notifyAll 只能包含在 synchronized 同步代码块内")]),t._v(" "),s("p",[t._v("其中 wait 后就释放锁，notify/notifyAll 会执行完代码块内的逻辑再释放锁")])])])}),[],!1,null,null,null);a.default=e.exports}}]);