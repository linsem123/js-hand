(function() {
  console.log('Main: Demo start at here...')
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js', {scope: './'}).then(reg => {
      console.log(`Main: Registerd Successfully ${reg}`)
    }).catch(err => {
      console.log(`Main: Error ${err}`)
    })
  } else {
    console.log('Main: Not support...')
  }
})()