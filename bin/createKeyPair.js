const fs = require('fs')
const path = require('path')
const anchor = require("@project-serum/anchor")


const account = anchor.web3.Keypair.generate()
const output = path.resolve('./helpers/keypair.json')

fs.writeFileSync(output, JSON.stringify(account))
