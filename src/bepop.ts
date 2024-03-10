import { AbiCoder, HDNodeWallet, JsonRpcProvider, Mnemonic, ethers } from "ethers";
import { Chain, ETH_CHAIN, POLYGON_CHAIN } from "./config";

export function explorerURL({
    address,
    txSignature,
    baseExplorerUrl
}: {
    address?: string;
    txSignature?: string;
    baseExplorerUrl?: string
}) {
    let baseUrl: string;
    //
    if (address) baseUrl = `${baseExplorerUrl}/address/${address}`;
    else if (txSignature) baseUrl = `${baseExplorerUrl}/tx/${txSignature}`;
    else return "[unknown]";
    const url = new URL(baseUrl);
    return url.toString() + "\n";
}
export function dummyETHAccounts(
    seedPhrase: string,
    from: number,
    to: number
): Array<HDNodeWallet> {
    const accounts: HDNodeWallet[] = [];
    const mnemonic = Mnemonic.fromPhrase(seedPhrase);
    for (let index = from; index <= to; index++) {
        const wallet = HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`);
        accounts.push(wallet)
    }
    return accounts;
}

export function exportEVMAccount(
    seedPhrase: string,
    index: number
): HDNodeWallet {
    const mnemonic = Mnemonic.fromPhrase(seedPhrase);
    const wallet = HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`);
    return wallet
}

export async function swapMaticToWMatic(wallet: ethers.Wallet | HDNodeWallet, amount: number) {
    try {
        const maticWallet = new ethers.Wallet(wallet.privateKey, new JsonRpcProvider(POLYGON_CHAIN.rpc))
        const rawTx = {
            from: maticWallet.address,
            to: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            value: ethers.parseEther(`${amount}`),
            data: "0xd0e30db0" // deposit
        } as ethers.TransactionRequest;
        const receipt = await maticWallet.sendTransaction(rawTx)
        console.log(`${wallet.address} swap ${explorerURL({ txSignature: receipt.hash, baseExplorerUrl: POLYGON_CHAIN.explorer })}`);
    } catch (error) {
        console.log(error)
    }
}

export async function swapWMaticToMatic(wallet: ethers.Wallet | HDNodeWallet, amount: number) {
    try {
        const ethWallet = new ethers.Wallet(wallet.privateKey, new JsonRpcProvider(POLYGON_CHAIN.rpc))
        const rawTx = {
            from: ethWallet.address,
            to: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            value: ethers.parseEther(`${amount}`),
            data: `0x2e1a7d4d${AbiCoder.defaultAbiCoder().encode(["uint256"], [ethers.parseEther(`${amount}`)]).slice(2)}` // withdraw
        } as ethers.TransactionRequest;
        const receipt = await ethWallet.sendTransaction(rawTx)
        console.log(`${wallet.address} swap ${explorerURL({ txSignature: receipt.hash, baseExplorerUrl: POLYGON_CHAIN.explorer })}`);
    } catch (error) {
        console.log(error)
    }
}

export async function swapETHToWETH(wallet: ethers.Wallet | HDNodeWallet, amount: number) {
    try {
        const maticWallet = new ethers.Wallet(wallet.privateKey, new JsonRpcProvider(ETH_CHAIN.rpc))
        const rawTx = {
            from: maticWallet.address,
            to: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            value: ethers.parseEther(`${amount}`),
            data: '0xd0e30db0' // deposit
        } as ethers.TransactionRequest;
        const receipt = await maticWallet.sendTransaction(rawTx)
        console.log(`${wallet.address} swap ${explorerURL({ txSignature: receipt.hash, baseExplorerUrl: ETH_CHAIN.explorer })}`);
    } catch (error) {
        console.log(error)
    }
}

export async function swapWETHToETH(wallet: ethers.Wallet | HDNodeWallet, amount: number) {
    try {
        const ethWallet = new ethers.Wallet(wallet.privateKey, new JsonRpcProvider(ETH_CHAIN.rpc))
        const rawTx = {
            from: ethWallet.address,
            to: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            value: ethers.parseEther(`${amount}`),
            data: `0x2e1a7d4d${AbiCoder.defaultAbiCoder().encode(["uint256"], [ethers.parseEther(`${amount}`)]).slice(2)}` // withdraw
        } as ethers.TransactionRequest;
        const receipt = await ethWallet.sendTransaction(rawTx)
        console.log(`${wallet.address} swap ${explorerURL({ txSignature: receipt.hash, baseExplorerUrl: ETH_CHAIN.explorer })}`);
    } catch (error) {
        console.log(error)
    }
}