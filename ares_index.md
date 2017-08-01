```
ares
|- app
    |- index
         |- ares_api.js
         |- ares_component.js
         |- ares_constant.js
         |- ares_page.js
         |- ares_route_map.js
```

建立了五个索引文件

1. `ares/app/index/ares_api.js` 索引了API请求相关的所有文件
2. `ares/app/index/ares_component.js` 索引了根据项目需要自定义的可以复用的组件（UI组件和工具方法）
3. `ares/app/index/ares_constant.js` 索引了项目中用到了常量
4. `ares/app/index/ares_page.js` 索引了项目的所有页面
5. `ares/app/index/route_map.js` 这个文件里的代码的作用是：根据 `ares/app/index/ares_page.js` 中的内容构建 `ROUTE_MAP` 常量



## 增加新页面

1. 在 `ares/app/pages` 目录下创建页面代码文件，比如 `page_name.js`

   这里需要注意：

   1. 文件命名用火车式，字母全小写
   2. 页面类名用驼峰式命名，首字母大写

2. 在 `ares/app/index/ares_page.js` 文件中增加引用

   这里需要注意：

   1. 引用名称，采用驼峰式，首字母大写

   补充说明：

   `ROUTE_MAP` 变量会根据 `ares/app/index/ares_page.js` 中的内容动态生成，不需要再手动增加，所以相比于以前省去了手动声明 `ROUTE_MAP` 的步骤，生成的内容格式如下，

   ```javascript
     const ROUTE_MAP = {
       "Login"      :   {component: Login},
       "SignUpStep1":   {component: SignUpStep1},
       "PhoneChange2":  {component: PhoneChange2}
     }
   ```

   ​


## 自定义组件的增加和使用

1. 在 `ares/app/components `目录下创建自定义组件代码文件，比如 `component_name.js`

   这里需要注意：

   1. 文件命名用火车式，字母全小写
   2. 组件类名用驼峰式命名，首字母大写

2. 在 `ares/app/index/ares_component.js` 文件中增加引用

   这里需要注意：

   1. 引用名称，采用驼峰式，首字母大写

3. 在页面中按照如下的形式使用该组件

   ```javascript
   import {
     BasePage,
     BackNavBar,
   } from 'AresComponent'

   class Page{
     render(){
       <BackNavBar />
     }
   }
   ```

   ​

## AresApi 的增加和使用

1. 在` ares/app/api `目录下创建代码文件，比如 `bind_card.js`

   这里需要注意：

   1. 文件命名用火车式，字母全小写

2. 在 `ares/app/index/ares_api.js` 索引文件中增加引用

   这里需要注意：

   1. 引用的名称，采用驼峰式命名，首字母大写，比如 `BankCard`

3. 在页面中按照如下的形式使用

   ```javascript
   import AresAPI from 'AresAPI'

   AresAPI.BindCard.cardFindBind(postData).done((resData, res)=>{
     //...
   })
   ```

   ​



## 常量的增加和使用

1. 在 `ares/app/constants` 目录下创建代码文件，比如 `bind_card.js`

   这里需要注意：

   1. 文件命名用火车式，字母全小写
   2. 常量命名用火车式，字母全大写，比如 `STORAGE_KEYS`

2. 在 `ares/app/index/ares_constant.js ` 索引文件中增加引用

   这里需要注意：

   1. 引用的名称，采用火车式，字母全大写，比如 `STORAGE_KEYS`

3. 在页面中按照如下的形式使用

   ```javascript
   import {
     STORAGE_KEYS
   } from 'AresConstant'
   ```
