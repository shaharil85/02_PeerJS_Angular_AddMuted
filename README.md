# Step to do WebRTC through PeerJS

1. Go to peerjs websitef for our references.
https://peerjs.com/

2. Copy the library the link below and put in index.html:
<script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>

3. Insert "esModuleInterop": true to tsconfig.json:
    "compilerOptions": {
        ....
        "esModuleInterop": true,
        ....
    }

4. Do a function for checking or Get our own ID.
5. Do a function for connect and received data. Test the data connection by pressing button.
6. Do a function for video peer connection. 
7. Do a fuction to open camera at first.
8. Do a function to on/off video
9. Do a function to mute/off audio