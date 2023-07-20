<details>
<summary>
    Solution instructions
</summary>

I implemented a very simple interface in which one checks their balance with their public key and can send money to another address. The server is very simple and only handles the transfer of funds if the provided signature is valid. The server also keeps track of the balances of each address.

To sign a transaction, the user can use [a utility script I wrote in the `scripts` folder](server/scripts/sign.js). The script takes in the private key of the sender and a message to sign. The message is the transaction data in the form of a string of a JSON object: `{"recipient":<address>, "amount":<amount>}`.

The script then signs the message using the private key and outputs the signature. The signature can then be used to send a transaction.

A working example:

Our environment (randomly generated) is

- Alice's address: `0xd9d4c96ae578fe3c96fbbe0b90e313e80c8e6af0`
    - Private key: `0xc9caad95b64fb3f35309f4c8da7248904df15a9b8fe3bc5981a02fb4eeeba854`
    - Public key: `0x03f3068014a39393b0c7978cc6bd721442bea01a66aaa9503029d4a6d387c3b3c9`
    - Balance: 100
- Bob's address: `0x6c9700c26299dbc82b13713cda7e60335cfeef71`
    - Private key: `0x92055642a3892b73f77a69f64612c09a9329706146c901232d8c2948d386adb8`
    - Public key: `0x02d74cfb3ddd157774260f95605ab5e511a5e919bfd4919056f6c2639323ddad73`
    - Balance: 50

So we sign the transaction that sends 80 from Alice to Bob with the following command:

```bash
node server/scripts/sign.js 0xc9caad95b64fb3f35309f4c8da7248904df15a9b8fe3bc5981a02fb4eeeba854 '{"recipient":"0x6c9700c26299dbc82b13713cda7e60335cfeef71", "amount":"80"}'
```

Which outputs:

```
Your message:

{"recipient":"0x6c9700c26299dbc82b13713cda7e60335cfeef71", "amount":"80"}

Signed with private key:

0xc9caad95b64fb3f35309f4c8da7248904df15a9b8fe3bc5981a02fb4eeeba854

Yields the signature:
r: 58710349880291814178452075350734127140469394077574608081902089814130790830571
s: 11839050830849283910260006356157129750993957625407372835581121102916379778458
v: 0

Which is equivalent to the compact signature:
0x81cce164d992552d66c2450ecc0c713254b8016b076bee9b25654a2cec9111eb1a2caa5199d2bdb5cc65fcc00352181b43abdc2f3a2f2b4c33d9f4110de89d9a
```

Test this in the client by sending a transaction from Alice to Bob using the signature!

> Note that this is unsafe as this signature is subjected to a signature replay vulnerability. This is because the message is not unique. To fix this, we could add a nonce to the message... But hey, this is just a demo to showcase the power of ecdsa!


</details>

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
