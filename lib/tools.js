const { execSync } = require('child_process');


module.exports = {
  open: (url)=>{
    // 开启浏览器
    execSync('ps cax | grep "Google Chrome"');
    execSync(
      `osascript chrome.applescript "${encodeURI(url)}"`,
      {
        cwd: __dirname,
        stdio: 'ignore',
      }
    );
  }
};
