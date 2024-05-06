So basically get all users to display by fetching them traditionally on login

Then update a users online status by using the socket "of" method with the name of the controller
    Socket endpoint is triggered when the user logs in(connects) hence online status is updated and when the socket disconnects its updated again(db)
    the newly connected socket broadcasts its connection status to all other connected sockets so that they can be updated realtime on the client side
    when the socket on the client side receives that a user with the given id is online or offline they update the user status in their code
    The socket is authenticated by passing the usual bearer but in a slightly different manner from the client side
    The bearer is passed(as an object) as the second parameter while initializing the io used for socket connection on the client from the client
    to the base endpoint or a particular "endpoint"
    Example
    const socket = io("/home", { auth : "Bearer the-jwt-token-goes-here" })
    So yh basically for the chat feature when a chat is sent    
        1) it is displayed on the client
        2) sent to an http endpoint to save it to the db
        3) then sent to the socket server, which the broadcasts it to all connected socket clients
        4) the client listens for the broadcasted socket event and receives data
    So yh basically when a chat is received on the client
        1) roles are reversed yh so the sender_id is the received_id and vice versa
        2) there is conditional rendering to only display a text for the receiving user if the current chat open has the confirmed sender and receiver_id as the incoming text (client side)
        
    Next the old chats have to be loaded when the chat is opened
        so the socket on the client side sends a request with the sender_id and receiver_id and its both ways so yk the db search is for both
        the chats are fetched and emitted to all connected sockets apparently
        so i return an array to the client. The client loops through the array and assigns properties for each loop element based on the sender_id for the particular element(out of two) the displays the element in the browser

    Next to delete chats theres a http endpoint to delete a chat given the id
        The client also deletes it from display once deleted from the db successfully
        Then the client emits a socket event to the socket on the server side that a chat has been deleted
        The socket server broadcasts the id to all connected sockets and a function is triggered from a that event clears thar chat where it exists

    Same logic to edit a chat

    use updade instead of delete