import inquirer from 'inquirer';
import { BNB_CHAIN, ETH_CHAIN, POLYGON_CHAIN, SEED_PHRASE } from './config';
import { exportEVMAccount, swapETHToWETH, swapMaticToWMatic, swapWETHToETH, swapWMaticToMatic } from './bepop';
import { HDNodeWallet, ethers } from 'ethers';

function listAccount(from: number = 0, to: number = 9) {
    const wallets: HDNodeWallet[] = [];
    for (let index = from; index <= to; index++) {
        const account = exportEVMAccount(SEED_PHRASE, index)
        wallets.push(account)
    }
    return wallets
}
async function swapETHchain(wallet: HDNodeWallet) {
    const swapFunctions = ["ETH -> WETH", "WETH -> ETH"]
    const { swap } = await inquirer.prompt([
        {
            type: 'rawlist',
            loop: false,
            name: 'swap',
            message: 'Swap:',
            default: swapFunctions[0],
            choices: swapFunctions
        }
    ]);;
    const { amount } = await inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'Amount:',
            default: 0.5,
        }
    ]);;
    switch (swap) {
        case "ETH -> WETH":
            await swapETHToWETH(wallet, amount)
            break;
        case "WETH -> ETH":
            await swapWETHToETH(wallet, amount)
            break;
        default:
            break;
    }

}
async function swapPolyChain(wallet: HDNodeWallet) {
    const swapFunctions = ["MATIC -> WMATIC", "WMATIC -> MATIC"]
    const { swap } = await inquirer.prompt([
        {
            type: 'rawlist',
            loop: false,
            name: 'swap',
            message: 'Swap:',
            default: swapFunctions[0],
            choices: swapFunctions
        }
    ]);;
    const { amount } = await inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'Amount:',
            default: 0.5,
        }
    ]);;
    switch (swap) {
        case "MATIC -> WMATIC":
            await swapMaticToWMatic(wallet, amount)
            break;
        case "WMATIC -> MATIC":
            await swapWMaticToMatic(wallet, amount)
            break;
        default:
            break;
    }
}
async function swapBNBchain(wallet: HDNodeWallet) {

}
(async () => {
    const accounts = listAccount()
    const chainSelection = await inquirer.prompt([
        {
            type: 'rawlist',
            name: 'chain',
            message: 'Select Chain:',
            default: ETH_CHAIN.name,
            choices: [ETH_CHAIN.name, POLYGON_CHAIN.name, BNB_CHAIN.name]
        }
    ]);
    const accountSelection = await inquirer.prompt([
        {
            type: 'rawlist',
            loop: false,
            name: 'account',
            message: 'Select Account:',
            default: accounts[0].address,
            choices: accounts.map(item => item.address)
        }
    ]);;
    const wallet: HDNodeWallet = accounts.find(item => item.address == accountSelection.account)!
    switch (chainSelection.chain) {
        case ETH_CHAIN.name:
            swapETHchain(wallet)
            break;
        case POLYGON_CHAIN.name:
            swapPolyChain(wallet)
            break;
        case BNB_CHAIN.name:
            swapBNBchain(wallet)
            break;
        default:
            break;
    }

})()