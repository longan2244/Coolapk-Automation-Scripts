const nodemailer = require('nodemailer');
const { mailConfig } = require('../../config/index.js');

/**
    * 
    * @param {*} userAccount 个人邮箱的账号 ex. xxxx@qq.com
    * @param {*} pass        邮箱开启SMTP服务后得到的授权码
    * @param {*} to          邮件接收者邮箱账号
    * @param {*} params 
    * @param {*} params.subject 邮件的主题
    * @param {*} params.text    邮件的文本内容 可以为空 为空的话，是一个内容为空白的邮件
    * @param {*} params.html    邮件的HTML内容 可以为空
    */
class Email {
  // constructor(userAccount, pass, to, params) {
  constructor({ to }) {
    let email = {
      ...mailConfig,
      to: to,
      params: {
        subject: 'Coolapk数据抓取',
        text: '数据抓取成功',
        html: '<p>数据抓取成功</p>'
      }
    }
    let { userAccount, pass, params } = email

    if (!userAccount || !pass) {
      throw new Error('个人邮箱账号或邮箱授权码不能为空')
    }
    this.userAccount = userAccount
    this.pass = pass
    if (!to) {
      throw new Error('邮件接收者邮箱账号不能为空')
    }
    this.to = to
    if (!params || params.subject === undefined) {
      throw new Error('邮件内容信息不能为空')
    }
    this.mailOptions = params
  }
  sendMail({
    picArr, user, id, message_title, message, product_price, link_url, shareUrl
  }) {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        // 邮箱服务的host: qq: smtp.qq.com; 163: smtp.163.com
        host: 'smtp.qq.com',
        // 开启安全连接，这个开不开都可以，对安全性有要求的话，最好开启
        secureConnection: true,
        // SMTP协议端口号
        port: 465,
        auth: {
          user: this.userAccount,
          pass: this.pass,
        },
        tls: {
          rejectUnauthorized: false, // 拒绝认证就行了， 不然会报证书问题
        },
      });
      // 配置发送内容
      // var mailOptions = {
      //   // 发件人邮箱
      //   from: this.userAccount,
      //   // 收件人邮箱, 多个邮箱地址用逗号隔开
      //   to: this.to,
      //   // 邮件主题
      //   subject: 'Coolapk数据抓取',
      //   html: this.mailOptions.html ? this.mailOptions.html : undefined,
      // }


      let picstr = ''
      picArr.forEach(item => {
        picstr += `<div class="qr_warp">
          <img src="${item}" alt="商品图片">
        </div>`
      })


      var mailOptions = {
        // 发件人邮箱
        from: this.userAccount,
        // 收件人邮箱, 多个邮箱地址用逗号隔开
        to: this.to,
        // 邮件主题
        subject: '【酷安自动化脚本】' + message_title || '新物品',
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>酷安自动化脚本</title>

  <style>
    body,html,div,ul,li,button,p,img,h1,h2,h3,h4,h5,h6 {
      margin: 0;
      padding: 0;
    }

    body,html {
      background: #fff;
      line-height: 1.8;
    }

    h1,h2,h3,h4,h5,h6 {
      line-height: 1.8;
    }

    .email_warp {
      height: 100vh;
      min-height: 500px;
      font-size: 14px;
      color: #212121;
      display: flex;
      /* align-items: center; */
      justify-content: center;
    }

    .logo {
      margin: 3em auto;
      width: 200px;
      height: 60px;
    }

    h1.email-title {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #252525;
    }
.links_btn_box {
      display: flex;
      gap: 10%;
          justify-content: space-between;
    }

    a.links_btn {
      border: 0;
      background: #0F9D58;
      color: #fff;
      width: 40%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      margin: 4px auto;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
      display: block;
      text-decoration: none;
    }

    .warm_tips {
      color: #757575;
      background: #f7f7f7;
      padding: 20px;
    }

    .warm_tips .desc {
      margin-bottom: 20px;
    }

 .qr_box {
           display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .qr_warp {
      width: 25%;
      margin: 8px;
    }

    .qr_warp img {
      max-width: 100%;
      max-height: 100%;
    }

    .email-footer {
      margin-top: 2em;
    }

    #reset-password-email {
      max-width: 500px;
    }
    #reset-password-email .accout_email {
      color: #4C84FF;
      display: block;
      margin-bottom: 20px;
    }
  </style>
</head>

<body>
  <section class="email_warp">
    <div id="reset-password-email">
     
      <h1 class="email-title">
        尊敬的<span>用户${user}</span>您好：
      </h1>
     

      <div class="warm_tips">        
          <p>【酷安自动化脚本】帮你发现一个好物</p>
          <p>商品标题：${message_title}</p>
          <p>商品内容：${message}</p>
          <p style="color: red;">商品价格：${product_price}</p>
          <p>商品地址：${link_url}</p>
          <p>帖子地址：${shareUrl}</p>
    
 <div class="links_btn_box">
    <a class="links_btn" href="${link_url}">访问商品</a>
    <a class="links_btn" href="${shareUrl}">访问帖子</a>
  


    
  </div>

  <div class="qr_box"> ${picstr}</div>
      


        
        <p>如有任何疑问，请通过如下方式与我们联系：</p>
        <p>微信助理：longan2244</p>
        <p>本邮件由系统自动发送，请勿回复。</p>
      </div>

     
    </div>
  </section>
</body>

</html>
        
        `
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      });
    })
  }
}

module.exports = Email