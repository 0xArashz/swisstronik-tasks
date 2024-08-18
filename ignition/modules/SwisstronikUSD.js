const hre = require("hardhat");


async function main() {
    const ownerAddress = process.env.OWNER_ADDRESS;
    const contract = await hre.ethers.deployContract("SwisstronikUSD", [ownerAddress]);
    await contract.waitForDeployment();
    console.log(`SwisstronikUSD contract deployed to ${contract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});