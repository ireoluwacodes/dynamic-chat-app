So basically get all users to display by fetching them traditionally on login

Then update a users online status by using the socket "of" method with the name of the controller
    Socket endpoint is triggered when the user logs in(connects) hence online status is updated and when the socket disconnects its updated again(db)
    the newly connected socket broadcasts its connection status to all other connected sockets so that they can be updated realtime on the client side

