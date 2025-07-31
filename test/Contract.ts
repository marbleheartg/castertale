import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { isAddress } from "viem";

describe("Contract", function () {
  async function fixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const contract = await hre.viem.deployContract("Contract", []);
    const publicClient = await hre.viem.getPublicClient();
    return { contract, owner, otherAccount, publicClient };
  }

  describe("", function () {
    it("", async function () {
      const { contract } = await loadFixture(fixture);

      expect(isAddress(contract.address));
    });
  });
});
