const { execSync } = require('child_process');


module.exports = {
  open: (port)=>{
    // 开启浏览器
    execSync('ps cax | grep "Google Chrome"');
    execSync(
      `osascript chrome.applescript "${encodeURI(
        `http://localhost:${port}`
      )}"`,
      {
        cwd: __dirname,
        stdio: 'ignore',
      }
    );
  }
};
