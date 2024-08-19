const moment = require('moment');
const CoolApkDataFetcherController = require('./src/controllers/coolApkDataFetcher.controller.js');
const { task } = require('./config/index.js');
globalThis.getTime = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}
const tasks = []
task.forEach(user => {
  user.ids.forEach((id) => {
    const fetcher = new CoolApkDataFetcherController({
      to: user.to,
      id,
    })
    fetcher.start();
    tasks.push(tasks)
  })
})

console.log('正在轮询' + tasks.length + '个任务');




