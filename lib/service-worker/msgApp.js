(function() {
  console.log('Main: Service Worker Message Demo start at here...')

  const sendMsgBtn = document.getElementById('sendMsg')
  const inputMsg = document.getElementById('inputMsg')
  const msgList = document.getElementById('msgList')

  sendMsgBtn.addEventListener('click', function() {
    // Main page share message to subscribed pages
    navigator.serviceWorker.controller.postMessage(inputMsg.value)
  })

  navigator.serviceWorker.addEventListener('message', function(event) {
    msgList.innerHTML += `<li>${event.data.message} <- ${new Date().toLocaleDateString()}</li>`
  })

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./msgSw.js', {scope: './'}).then(reg => {
      console.log(`Main: Registerd Successfully ${reg}`)
    }).catch(err => {
      console.log(`Main: Error ${err}`)
    })
  } else {
    console.log('Main: Not support...')
  }
})()