const stream = ( socket ) => {
    socket.on( 'subscribe', ( data ) => {
        //subscribe/join a room
        socket.join( data.room );
        socket.join( data.socketId );

        //Inform other members in the room of new user's arrival
        if ( socket.adapter.rooms.has(data.room) === true ) {
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } );
        }
    } );


    socket.on( 'newUserStart', ( data ) => {
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender } );
    } );


    socket.on( 'sdp', ( data ) => {
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } );
    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } );
    } );


    socket.on( 'chat', ( data ) => {
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg } );
    } );

    socket.on( 'chunk send', ( data ) => {
        socket.to( data.room ).emit( 'chunk sended', { sender: data.sender, chunk: data.chunk ,filename:data.filename} );
    });
    
    
    socket.on( 'file send', ( data ) => {
        socket.to( data.room ).emit( 'file sended', { sender: data.sender,filename:data.filename} );
    });

    socket.on( 'chunk recieved', ( data ) => {
        socket.to( data.room ).emit( 'chunk recieved', true );
    });

};

module.exports = stream;
