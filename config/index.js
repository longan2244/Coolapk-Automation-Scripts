
const Config = {
  /**邮件配置
 * 开启QQ邮箱SMTP服务并获取授权码
 * SMTP服务授权码免费获取教程 https://blog.csdn.net/qq_44275213/article/details/128666542
*/
  mailConfig: {
    userAccount: '1000000@qq.com',
    pass: "qqqqqqqqwwwqewqeeeq", //SMTP服务授权码
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
      "to": "2244420174@qq.com",  //收件人的电子邮件地址
      "ids": [3337, 3444] //产品ID 获取途径 allshop.json
    },
  ]

};




module.exports = Config;

