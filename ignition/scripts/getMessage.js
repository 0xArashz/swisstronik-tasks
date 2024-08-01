const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");


const sendShieldedQuery = async (provider, destination, data) => {
    const rpclink = hre.network.config.url;
    const [encryptedData, usedEncryptedKey] = await encryptDataField(rpclink, data);
    const response = await provider.call({
        to: destination,
        data: encryptedData,
    });
    return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main() {
    const contractAddress = "0x7B16622899ab2370976211B2dAd7FcDa10AAd464";
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("HelloSwisstronik");
    const contract = contractFactory.attach(contractAddress);
    const functionName = "getMessage";
    const responseMessage = await sendShieldedQuery(signer.provider, contractAddress, contract.interface.encodeFunctionData(functionName));
    console.log("Decoded response: ", contract.interface.decodeFunctionResult(functionName, responseMessage)[0]);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});