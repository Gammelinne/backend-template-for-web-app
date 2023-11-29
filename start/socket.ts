import Ws from 'App/Services/Ws'
import User from 'App/Models/User'
Ws.boot()

/*
|-------------------------------------------------------
| Socket Routes
|-------------------------------------------------------
*/

Ws.io.on('connection', (socket) => {
  socket.on('join', async (email) => {
    const user = await User.findBy('email', email)
    if (user) {
      socket.join(email)
    } else {
      socket.emit('error', 'Email not found')
    }
  })
})
