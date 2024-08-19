const hre = require("hardhat");


async function main() {
    const ownerAddress = process.env.OWNER_ADDRESS;
    const contract = await hre.ethers.deployContract("SwisstronikERC721", [ownerAddress]);
    await contract.waitForDeployment();
    console.log(`SwisstronikERC721 contract deployed to ${contract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});