import * as dotenv from "dotenv";
dotenv.config();
export interface Chain {
    rpc: string,
    explorer: string
    name: string
}
export const ETH_CHAIN = {
    explorer: "https://etherscan.io",
    rpc: "https://eth.llamarpc.com",
    name: "Ethereum"
} as Chain

export const POLYGON_CHAIN = {
    explorer: "https://polygonscan.com",
    rpc: "https://polygon.llamarpc.com",
    name: "Polygon"
} as Chain

export const BNB_CHAIN = {
    explorer: "https://bscscan.com",
    rpc: "https://binance.llamarpc.com",
    name: "BNB chain"
} as Chain

export const SEED_PHRASE: string = process.env.SEED_PHRASE as string