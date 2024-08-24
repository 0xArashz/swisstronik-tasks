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
    const contractAddress = "0x8492a7695883E04e11bDf05B8240dd33b9357E30";
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("SwisstronikPERC721");
    const contract = contractFactory.attach(contractAddress);
    const functionName = "safeMint";
    const ownerAddress = process.env.OWNER_ADDRESS;
    const encodedData = contract.interface.encodeFunctionData(functionName, [ownerAddress]);
    const transaction = await sendShieldedTransaction(signer, contractAddress, encodedData);
    await transaction.wait();
    console.log("Transaction Receipt: ", transaction);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});