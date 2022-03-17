# My first Solana program

This repo contains branches:

* local: which points to a local net
* dev: which points to Solana Devnet

## Deploy

First of all make sure you have enough SOL on your account

```
$ solana balance
3.764757 SOL
```

Or charge your dev account with `solana airdrop 2` (2 SOL is current cap).

Steps to prepare deploy on Devnet.

```
solana config set --url devnet

// Make sure you're on devnet.
solana config get

anchor build

// Get the new program id.
solana address -k target/deploy/hello_anchor-keypair.json

// Update Anchor.toml and lib.rs w/ new program id.
// Make sure Anchor.toml is on devnet.

// Build again.
anchor build
```

Finally launch `anchor deploy`, you will something like

```
$ anchor deploy
Deploying workspace: https://api.devnet.solana.com
Upgrade authority: /Users/pippo/.config/solana/id.json
Deploying program "hello-anchor"...
Program path: /Users/io/github.com/fibo/hello-anchor/target/deploy/hello_anchor.so...
Program Id: 4ACXR9SmbMQNz54U2Er3nBkAo9MjHZK86MtMGfTDKkxA
```

Then get the *Program Id* and go on  [Solana Explorer](https://explorer.solana.com/?cluster=devnet).

For instance my first Solana program is:

https://explorer.solana.com/address/4ACXR9SmbMQNz54U2Er3nBkAo9MjHZK86MtMGfTDKkxA?cluster=devnet

