import server from "./server";
import { toHex, hexToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ publicKey, setPublicKey, balance, setBalance, message, setMessage, address, setAddress }) {
  async function onChange(evt) {
    const publicKey = evt.target.value;
    setPublicKey(publicKey);

    if (publicKey) {

      const address = "0x" + toHex(
        keccak256(
          hexToBytes(publicKey).slice(1) // The first byte indicates whether the key is compressed or not
        )
        .slice(-20)
      );
      setAddress(address);

      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);

    } else {
      setBalance(0);
      setAddress(null);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public Key
        <input placeholder="Type your Public Key" value={publicKey} onChange={onChange}></input>
      </label>

      <div>
        This is your address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
