// Run: node verify.js <signature> <message> <publicKey>
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { hexToBytes, toHex } = require('ethereum-cryptography/utils');

// Create a text encoder to convert the message to bytes
const textEncoder = new TextEncoder();

// Use the command line arguments to get the signature, message, and public key
const signature = process.argv[2];
const message = process.argv[3];
const publicKey = process.argv[4];

// Hash the message
const messageHash = keccak256(textEncoder.encode(message))

// Verify the signature
const isSigned = secp256k1.verify(
    hexToBytes(signature),
    messageHash,
    hexToBytes(publicKey)
);

// If the signature is valid, set the flag to "Valid"
var flag = "Invalid";
if (isSigned) {
    flag = "Valid";
}

// Print the results
console.log(
    `The signature:\n\n${signature}\n\n`
    + `For the message hash:\n\n0x${toHex(messageHash)}\n\n`
    + `And the public key:\n\n${publicKey}\n\n`
    + `Is ${flag}`
);