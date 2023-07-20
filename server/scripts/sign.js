// Run node sign.js <privateKey> <message>
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { hexToBytes } = require('ethereum-cryptography/utils');

// Create a text encoder to convert the message to bytes
const textEncoder = new TextEncoder();

// Use the command line arguments to get the private key and message
const privateKey = process.argv[2];
const message = process.argv[3];

// Sign the message
const signature = secp256k1.sign(
    keccak256(textEncoder.encode(message)), // Because it needs to be a bytes array
    hexToBytes(privateKey)
);

// Print the results
console.log(
    `Your message:\n\n${message}\n\n`
    + `Signed with private key:\n\n${privateKey}\n\n`
    + `Yields the signature:\n`
    + `r: ${signature.r}\n`
    + `s: ${signature.s}\n`
    + `v: ${signature.recovery}\n\n`
    + `Which is equivalent to the compact signature:\n`
    + `0x${signature.toCompactHex()}`
);