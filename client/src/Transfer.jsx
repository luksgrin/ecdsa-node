import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

const textEncoder = new TextEncoder();

function Transfer({ publicKey, setBalance }) {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const address = "0x" + toHex(
      keccak256(
        hexToBytes(publicKey).slice(1) // The first byte indicates whether the key is compressed or not
      )
      .slice(-20)
    );

    const messageHash = keccak256(textEncoder.encode(message));

    // Verify the signature
    const isSigned = secp256k1.verify(
      hexToBytes(signature),
      messageHash,
      hexToBytes(publicKey)
    );

    var recipient = null;
    var amount = null;

    if (!isSigned) {
      alert("The signature is not valid");
      return;
    } else {

      const tx = JSON.parse(message);

      if (tx.hasOwnProperty('amount')) {
        amount = parseInt(tx.amount);
      } else {
        alert("The message does not have an amount");
        return;
      }

      if (tx.hasOwnProperty('recipient')) {
        recipient = tx.recipient;
      } else {
        alert("The transaction does not have a recipient");
        return;
      }
    }

    console.log(recipient, amount, address);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: amount,
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Input Message
        <input
          placeholder="A JSON Schema of your transaction"
          value={message}
          onChange={setValue(setMessage)}
        ></input>
      </label>
      <label>
        Input Signature
        <input
          placeholder="The signed message hash of your transaction"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
