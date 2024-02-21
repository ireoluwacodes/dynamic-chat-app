So basically get all users to display by fetching them traditionally on login

Then update a users online status by using the socket "of" method with the name of the controller
    Socket endpoint is triggered when the user logs in(connects) hence online status is updated and when the socket disconnects its updated again(db)
    the newly connected socket broadcasts its connection status to all other connected sockets so that they can be updated realtime on the client side
    when the socket on the client side receives that a user with the given id is online or offline they update the user status in their code
    The socket is authenticated by passing the usual bearer but in a slightly different manner from the client side
    The bearer is passed(as an object) as the second parameter while initializing the io used for socket connection on the client from the client
    to the base endpoint or a particular "endpoint"
    Example
    const socket = io("/home", { authorization : "Bearer the-jwt-token-goes-here" })
    