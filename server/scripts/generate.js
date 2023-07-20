const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { toHex } = require('ethereum-cryptography/utils');

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);
const address = (
    keccak256(
        publicKey.slice(1) // The first byte indicates whether the key is compressed or not
    )
    .slice(-20)
);

/* Print the results
Add the public key to the serverside and set their balances
*/
console.log(
    `Random private key: 0x${toHex(privateKey)}\n`
    + `Associated public key: 0x${toHex(publicKey)}\n`
    + `Associated address: 0x${toHex(address)}`
);