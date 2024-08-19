const axios = require('axios');
const Email = require('./../lib/sendmail.js');








class CoolApkDataFetcherController {
  constructor({ to, id }) {
    this.email = new Email({ to });
    this.to = to
    this.id = id
    this.config = {
      method: 'get',
      url: `https://api.coolapk.com/v6/page/dataList?url=/product/feedList?cacheExpires=60&type=trade&id=${id}&listType=dateline_desc&title=交易&subTitle=&page=1&lastItem=57799003`,
      headers: {
        'User-Agent': ' Dalvik/2.1.0 (Linux; U; Android 9; PCLM10 Build/PQ3A.190705.08151706) (#Build; OPPO; PCLM10; PQ3A.190705.08151706 release-keys; 9) +CoolMarket/14.4.0-2408121-universal',
        'X-Requested-With': ' XMLHttpRequest',
        'X-Sdk-Int': ' 28',
        'X-Sdk-Locale': ' zh-CN',
        'X-App-Id': ' com.coolapk.market',
        'X-App-Token': ' v3JDJ5JDEwJE5qWmpNbUkyTXpVdk1HTmhZelJtWi5NbVpnRS9iRVpCLlRIUzlNY2FUT3duUW0vNE1ZdVlt',
        'X-App-Version': ' 14.4.0',
        'X-App-Code': ' 2408121',
        'X-Api-Version': ' 14',
        'X-App-Device': ' AbsVnbgszc5V2atU2chVGblJHI2AzNxUTM4AjL1AzNwkTMuE0MRBFI7ATMNx0QQByOPBFUPByOPBFUPByOgsDI7AyOhdWQ6VkYnFTUodDeJdmdOdnZ6ZEN4M1arNWdwsWNHNWbDVFR',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'api.coolapk.com',
        'Connection': 'keep-alive',
        'Cookie': 'SESSID=913cb382fe64f06bcd5e4cb02f96a8e92ea35546'
      },
      data: ''
    };
    this.newID = null;
    this.idArr = [];
  }

  async fetchData() {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000 * 60));

      console.log(globalThis.getTime() + '#✅正在轮询' + this.id);
      const { data } = await axios(this.config);
      const { message, ershou_info, id, message_title, picArr, shareUrl } = data.data[0];


      const { product_price = '价格面议', link_url, } = ershou_info;

      if (this.newID !== id) {
        if (this.newID !== null) {
          if (this.idArr.includes(id)) {
            // console.log("重复数据", id, message, product_price, link_url);
          } else {
            // console.log("新数据", this.to, id, message_title, message, product_price, link_url);
            this.email.sendMail({
              picArr,
              user: this.to,
              id, message, product_price, link_url, message_title, shareUrl
            });
          }
        } else {
          // this.email.sendMail({
          //   picArr,
          //   user: this.to,
          //   id, message, product_price, link_url, message_title, shareUrl
          // });
          console.log(this.id + '初始成功');
        }

        this.idArr.push(id);
        this.newID = id;
      } else {
        // console.log("旧数据", id, message_title, message, product_price, link_url);
      }
    } catch (error) {
      // console.log(this.id, error);

    }
  }

  async start() {
    while (true) {
      await this.fetchData();
    }
  }
}

module.exports = CoolApkDataFetcherController;

// export default CoolApkDataFetcherController;

// const fetcher = new CoolApkDataFetcherController();
// fetcher.start();
