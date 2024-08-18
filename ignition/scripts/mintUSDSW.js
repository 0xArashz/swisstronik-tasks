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
    const contractAddress = "0xCC6Eb141919a4ECCe087A98B191196E445E06D0f";
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("SwisstronikUSD");
    const contract = contractFactory.attach(contractAddress);
    const functionName = "mint";
    const ownerAddress = process.env.OWNER_ADDRESS;
    const mintAmount = 1000000;
    const encodedData = contract.interface.encodeFunctionData(functionName, [ownerAddress, mintAmount]);
    const transaction = await sendShieldedTransaction(signer, contractAddress, encodedData);
    await transaction.wait();
    console.log("Transaction Receipt: ", transaction);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});