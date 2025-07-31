import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("FloweyModule", (m) => {
  const Flowey = m.contract("Flowey", [""]);

  return { Flowey };
});
