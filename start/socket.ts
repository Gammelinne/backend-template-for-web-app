import Ws from 'App/Services/Ws'
import User from 'App/Models/User'
Ws.boot()

/*
|-------------------------------------------------------
| Socket Routes
|-------------------------------------------------------
*/

Ws.io.on('connection', (socket) => {
  socket.on('join', async (userId) => {
    console.log(userId)
    const user = await User.findBy('id', userId)
    if (user) {
      socket.join(userId)
    } else {
      socket.emit('error', 'User not found')
    }
  })
})
