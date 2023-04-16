const main = async () => {
  const greet = await ethers.getContractFactory("Greet");
  const contract = await greet.deploy("Hello World !!");
  console.log("Address: ", contract.address);
  console.log("Message: ", await contract.greet());
};

main()
  .then(() => console.log("Success"))
  .catch((error) => console.log("Failure", error));

// CONTRACT_ADDRESS = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
