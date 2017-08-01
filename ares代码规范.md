## android java 代码规范



## ios objective-c 代码规范



##  react native js 代码规范

1.   文件名统一用火车式命名，字母全小写，比如 app.js  bank_card.js

2.   类名统一用驼峰式命名，首字母大写，比如

     ```Js
     class App {
       //...
     }

     class BankCard {
       //...
     }
     ```


4.   常量的格式

     统一用全大写字母，下划线连接，使用 const 关键词声明

     ```javascript
     const TYPE_OF_CERTIFICATE_LIST = [
     	{label: '身份证',value:'01'},
     	{label: '军官证',value:'02'},
     	{label: '户口本',value:'03'},
     	{label: '护照',value: '04'},
     	{label: '回乡证',value: '05'},
     	{label: '警官证',value: '06'},
     	{label: '临时身份证',value: '07'},
     	{label: '文职干部证',value: '08'},
     	{label: '企业代码证',value: '51'},
     	{label: '营业执照',value: '52'},
     	{label: '其他（对公）',value: '99'},
     	{label: '其他（对私）',value: '49'},
     ]
     ```

5.   方法名和变量名统一用驼峰式，首字母小写，比如

     ```javascript
     export default class StringUtils {
       /**
     * "132 3321 1111" -> "13233211111"
     */
     static phoneNumberHuman2Data(humanPhoneNumber){
       return humanPhoneNumber.replace(/ /g, "")
     }
     }
     ```
   ```

6. 变量名声明用 let 关键词，比如

   ```javascript
   let phoneNumber = "13712345678"
   ```

   ​
