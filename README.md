# 酷安自动化脚本

酷安自动化脚本，基于 `node.js` `v18.15.0`，并且确保已安装 `yarn`。由[Longan](https://longans.top/) 开发的自动化脚本。

## 步骤

**修改配置 config\index.js**
``` js

TODO：config\index.js


const Config = {
  /**邮件配置
 * 开启QQ邮箱SMTP服务并获取授权码
 * POP3/IMAP/SMTP/Exchange/CardDAV 授权码获取教程 https://blog.csdn.net/qq_44275213/article/details/128666542
*/
  mailConfig: {
    userAccount: 'xxxxxxx@qq.com',
    pass: "qqqqqqwwwwwwreeeee", //POP3/IMAP/SMTP/Exchange/CardDAV 授权码
  },
  /**
 * 酷安全自动好物系统
 * 填写商品ID 及 邮件地址
 * @type {Array<{
 *   // 收件人的电子邮件地址
 *   to: string,
 *   // 酷安产品 ID 数组      allshop.json
 *   ids: number[]
 * }>}
 */
  task: [
    {
      "to": "1008611@qq.com",  //收件人的电子邮件地址
      "ids": [3337, 3444] //产品ID 获取途径 allshop.json
    },
  ]

};
```


**安装 node_modules**
``` cmd
yarn 
```
**启动项目**
``` cmd
yarn dev
```
**注意**

`任务不能超过5次`
`任务不能超过5次`
`任务不能超过5次`
`任务不能超过5次`


## 特别说明

> 本项目仅供学习交流使用 下载后请于12小时内删除




如果该工具对你有所帮助，可以请我喝一瓶~~农夫山泉~~Star (别人说农夫山泉太奢侈，这里改成Star吧)