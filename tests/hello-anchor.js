const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

describe("hello-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it("Is initialized!", async () => {
    // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.HelloAnchor;

    // Create an account keypair for our program to use.
    const baseAccount = anchor.web3.Keypair.generate();

    const tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.info("Your transaction signature", tx);

    // Fetch data from the account.
    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.info("👀 GIF Count", account.totalGifs.toString());
  });
});
