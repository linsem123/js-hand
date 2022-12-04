const sw = this;

sw.addEventListener('message', function(event) {
  const clients = sw.clients.matchAll().then(function(clientList) {
    // Every client has unique service id
    const senderId = event.source?.id || 'unknown';
    clientList.forEach(client => {
      if (client.id !== senderId) {
        client.postMessage({
          client: senderId,
          message: event.data
        })
      }
    });
  })

  event.waitUntil(clients);
})