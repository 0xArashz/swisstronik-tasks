const hre = require("hardhat");


async function main() {
    const contract = await hre.ethers.deployContract("SwisstronikPERC20");
    await contract.waitForDeployment();
    console.log(`SwisstronikPERC20 contract deployed to ${contract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});