const anchor = require("@project-serum/anchor");
const assert = require("assert");

const { SystemProgram } = anchor.web3;

describe("hello-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it("can increment gif count", async () => {
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

    // Call add_gif
    await program.rpc.addGif(
      "https://media.giphy.com/media/6jvIEDTEW5X9K/giphy.gif",
      {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      }
    );

    // Get the account again and see what changed.
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.info("👀 GIF Count", account.totalGifs.toString());
    assert.equal(account.totalGifs.toNumber(), 1);

    // Access gif_list on the account!
    console.log("👀 GIF List", account.gifList);
  });
});
