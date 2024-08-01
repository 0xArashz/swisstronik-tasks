const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");


const sendShieldedTransaction = async (signer, destination, data, value) => {
    const rpclink = hre.network.config.url;
    const [encryptedData] = await encryptDataField(rpclink, data);
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {
    const contractAddress = "0x7B16622899ab2370976211B2dAd7FcDa10AAd464";
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("HelloSwisstronik");
    const contract = contractFactory.attach(contractAddress);
    const functionName = "setMessage";
    const messageToSet = "Hello Swisstronik!!";
    const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [messageToSet]), 0);
    await setMessageTx.wait();
    console.log("Transaction Receipt: ", setMessageTx);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});