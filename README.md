# mobx-databinder

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# 简介

在react开发时, 调用远程api是非常频繁的操作. 而在异步调用时在UI实现调用指示, 以及调用出现错误时在UI实现错误弹窗或者其他方式的错误提示也是一个客户友好的app的基本设计方式. 日常的开发中这部分工作都是重复, 繁琐且易错的部分. 

mobx-databinder 包裹任意组件, 对被包裹组件提供异步调用时的UI部分的处理. 并且提供灵活的可替换功能. 本组件的依赖: mobx/mobx-react, ramda

# 安装

npm install mobx-databinder

# 使用

首先使用binderCreator初始化一个数据绑定组件(Databinder):

```
import binderCreator from 'mobx-databinder'

const Binder = binderCreator(
  { store: 'appStore', 
    loadComponent: LoadSpinner, 
    errorComponents: {
      'popup': ErrorPopup, 
      'inplace': ErrorInplace
    }
  }
)
```

## 参数说明

store: mobx的状态对象. 建议使用mobx Provider所指定的根store, 以让它包裹的子组件的后续操作中可以自由选择任意store. 比如下面的代码:

```
const allStore = {
  orderStore: OrderStore.create({orders: []}),
  auth: Auth.create()
}
```

mobx Provider: 
```
  <Provider appStore={allStore}>
      <App />
    </Provider>
```

这里Provider的属性变量是appStore, 与binderCreator的appStore相对应.

loadComponent: 一个指示当前正在执行远程调用的组件. 具体的例子请参考demo目录, 您可以通过这里的配置来实现调用自己的调用提示.

errorComponents: 不同的错误指示组件的配置, 具体的例子请参考demo目录, 您可以通过这里的配置来实现调用自己的错误提示. key表示一个错误提示的方式, 实际如何实现由组件使用者定义组件来完成. 

popup: 弹窗, 
inplace: 在当前组件位置显示. 

注意这里的popup/inplace会被后续的包裹组件属性errorPlacement所引用. 所以此处是动态的配置, 比如您可以再添加一个key, 'foo': ErrorFoo, 在后续的包裹组件处引用即可, 此时相当于你又添加了一种错误提示方式. (注意当前版本inplace这个key与在当前组件位置显示的逻辑有关. 凡是需要直接在组件位置显示错误信息的设计都要保持inplace这个键名. 如果您选择其他其他键名, 则显示逻辑和popup的方式一致. 可以参考demo了解不同的显示方式)


## 包裹任意组件以使得该组件'自动'获得调用指示和错误提示的功能

```
 <Binder component={LoginButton}
   api={auth.login}
   errorPlacement='popup'
   autoFetch={false}
      />
```


属性说明:

component: 被包裹的组件. 比如一个标准的react组件: 

```
const LoginButton = ({bindData}) => 
  <Button raised color='primary' onClick={bindData}>请登录</Button>
```

api: 被包裹组件要调用的远程api方法. 此处和store里的某个ajax api调用方法一致, 比如 auth.login, 这个方法同时以bindData的属性暴露给被包裹组件, 被包裹组件可以通过调用bindData来执行这个api方法.

errorPlacement: 错误组件的放置方式. 此处和binderCreator里的errorComponents里的某个key对应. 指示要使用哪种错误提示方式. 注意当前版本inplace这个key与在当前组件位置显示的逻辑有关. 凡是需要直接在组件位置显示错误信息的设计都要保持inplace这个键名. 如果您选择其他其他键名, 则显示逻辑和popup的方式一致. 可以参考demo了解不同的显示方式.

autoFetch (true/false): 是否自动执行远程api方法. 在设计异步调用的UI时, 可能有两种方式去调用异步api, 一种在componentWillMount时自动执行, 一种是以某种事件处理函数(handler)的方式来执行(比如用户点击某个按钮). autoFetch为true时表示被包裹组件在componentWillMount时自动调用api; 为false则表示会以事件处理函数的方式来执行api, 在这种情况下, 被包裹的组件可以通过调用bindData属性去执行api. bindData属性会在包裹时被自动注入到被包裹组件.


# 其他说明

建议把由binderCreator建立的组件作为全局组件来使用, 用它来包裹所有有数据绑定的组件. 包裹后的组件可以自动获得store状态对象, 以及bindData属性以备随时再次调用.

demo目录里提供了错误提示组件和数据调用组件的样板. 您可以根据自己的需要来自定义所需的界面组件.比如您建立了一个ErrorTopbar(假设要在顶部导航显示错误), 您可以以下面方式来初始化Databinder:

```
import binderCreator from 'mobx-databinder'

const Binder = binderCreator(
  { ...
    errorComponents: {
      'MyError': ErrorTopbar
    }
  }
)
```

未来版本可能会提供更好的方式来让组件使用者指定自己的错误提示.


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
