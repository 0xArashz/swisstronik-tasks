const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");


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
    const contractAddress = "0x904ce923d991eE6170F731582761CD384eE125A2";
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("SwisstronikPERC20");
    const contract = contractFactory.attach(contractAddress);
    const functionName = "transfer";
    const recipientAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
    const amountToSend = 1;
    const encodedData = contract.interface.encodeFunctionData(functionName, [recipientAddress, amountToSend]);
    const transaction = await sendShieldedTransaction(signer, contractAddress, encodedData);
    await transaction.wait();
    console.log("Transaction Receipt: ", transaction);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});