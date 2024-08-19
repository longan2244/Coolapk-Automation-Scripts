var axios = require('axios');
var fs = require('fs');
let allshop = [];
async function main() {
  let page = 1
  while (true) {
    var config = {
      method: 'get',
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
      }),
      url: `https://api.coolapk.com/v6/page/dataList?url=%2Fpage%3Furl%3D%252Fproduct%252FcategoryDetailList%253Ftype%253Dcategory%2526id%253D0&title=%E7%83%AD%E9%97%A8&subTitle=&page=${page}`,
      headers: {
        'User-Agent': ' Dalvik/2.1.0 (Linux; U; Android 9; PCLM10 Build/PQ3A.190705.08151706) (#Build; OPPO; PCLM10; PQ3A.190705.08151706 release-keys; 9) +CoolMarket/14.4.0-2408121-universal',
        'X-Requested-With': ' XMLHttpRequest',
        'X-Sdk-Int': ' 28',
        'X-Sdk-Locale': ' zh-CN',
        'X-App-Id': ' com.coolapk.market',
        'X-App-Token': ' v3JDJ5JDEwJE5qWmpNbVJtWTJFdk5EQm1NRGM1TnVZV0F5UzJwa2hMV0xWeWZxZ3BiTVRQQm5rZm56LzVP',
        'X-App-Version': ' 14.4.0',
        'X-App-Code': ' 2408121',
        'X-Api-Version': ' 14',
        'X-App-Device': ' AbsVnbgszc5V2atU2chVGblJHI2AzNxUTM4AjL1AzNwkTMuE0MRBFI7ATMNx0QQByOPBFUPByOPBFUPByOgsDI7AyOhdWQ6VkYnFTUodDeJdmdOdnZ6ZEN4M1arNWdwsWNHNWbDVFR',
        'X-Dark-Mode': ' 0',
        'X-App-Channel': ' coolapk',
        'X-App-Mode': ' universal',
        'X-App-Supported': ' 2408121',
        'Host': ' api.coolapk.com',
        'Connection': ' Keep-Alive',
        'Cookie': ' ddid=dec37da7-9660-4704-b1c5-b31da716f804; SESSID=913cb382fe64f06bcd5e4cb02f96a8e92ea35546',
        'Accept': '*/*',
        "Referer": "api.coolapk.com",
      }
    };

    try {
      let { data } = await axios(config)

      data.data.forEach(element => {
        allshop.push({
          id: element.id,
          title: element.title
        });

        // console.log(element.id);
        // console.log(element.title);
      });
    } catch (error) {
      console.log(error);

    }
    // console.log(allshop);
    console.log(page);

    if (page >= 100) {
      console.log(allshop);
      //存储本地
      fs.writeFile('allshop.json', JSON.stringify(allshop), function (err) {
        if (err) {
          console.log('writeFile ERR');

        }
      })
      break
    }

    page++
  }
}
// main()






