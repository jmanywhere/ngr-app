const abi = [
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"_usdt",
           "type":"address"
        },
        {
           "internalType":"address",
           "name":"liqOutWallet",
           "type":"address"
        },
        {
           "internalType":"address[]",
           "name":"_owners",
           "type":"address[]"
        }
     ],
     "stateMutability":"nonpayable",
     "type":"constructor"
  },
  {
     "inputs":[
        
     ],
     "name":"NGR__AlreadyLiquidated",
     "type":"error"
  },
  {
     "inputs":[
        
     ],
     "name":"NGR__CannotLiquidate",
     "type":"error"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"NGR__InvalidAmount",
     "type":"error"
  },
  {
     "inputs":[
        
     ],
     "name":"OnlySimulatedBackend",
     "type":"error"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"indexPosition",
           "type":"uint256"
        }
     ],
     "name":"Deposit",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"initialDeposit",
           "type":"uint256"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"earlyFeeTaken",
           "type":"uint256"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"totalWithdrawn",
           "type":"uint256"
        }
     ],
     "name":"EarlyWithdrawal",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"Liquidate",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "internalType":"address",
           "name":"previousOwner",
           "type":"address"
        },
        {
           "indexed":true,
           "internalType":"address",
           "name":"newOwner",
           "type":"address"
        }
     ],
     "name":"OwnershipTransferred",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"Seed",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"positionId",
           "type":"uint256"
        },
        {
           "indexed":false,
           "internalType":"bool",
           "name":"redeposit",
           "type":"bool"
        }
     ],
     "name":"UpdatePositionRedeposit",
     "type":"event"
  },
  {
     "anonymous":false,
     "inputs":[
        {
           "indexed":true,
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "indexed":false,
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"Withdraw",
     "type":"event"
  },
  {
     "inputs":[
        
     ],
     "name":"BASE_PRICE",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"MAX_DEPOSIT",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"MAX_PRICE",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"MIN_DEPOSIT",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"TCV",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"calculateSparksOnDeposit",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"canLiquidate",
     "outputs":[
        {
           "internalType":"bool",
           "name":"",
           "type":"bool"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"bytes",
           "name":"",
           "type":"bytes"
        }
     ],
     "name":"checkUpkeep",
     "outputs":[
        {
           "internalType":"bool",
           "name":"upkeepNeeded",
           "type":"bool"
        },
        {
           "internalType":"bytes",
           "name":"performData",
           "type":"bytes"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"currentHelixPrice",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"currentSparks",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"currentUserPendingLiquidation",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"cycleCounter",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        },
        {
           "internalType":"bool",
           "name":"redeposit",
           "type":"bool"
        }
     ],
     "name":"deposit",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"depositCounter",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        },
        {
           "internalType":"bool",
           "name":"redeposit",
           "type":"bool"
        }
     ],
     "name":"depositForUser",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"devDistributions",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"fullFee",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"devPortion",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"tcvPortion",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"userIndex",
           "type":"uint256"
        }
     ],
     "name":"earlyWithdraw",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"getDS",
     "outputs":[
        {
           "internalType":"int256",
           "name":"",
           "type":"int256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"user",
           "type":"address"
        }
     ],
     "name":"getUserPositions",
     "outputs":[
        {
           "internalType":"uint256[]",
           "name":"",
           "type":"uint256[]"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"liquidate",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"liquidationCounter",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"liquidationOutWallet",
     "outputs":[
        {
           "internalType":"address",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"owner",
     "outputs":[
        {
           "internalType":"address",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "name":"owners",
     "outputs":[
        {
           "internalType":"address",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"bytes",
           "name":"",
           "type":"bytes"
        }
     ],
     "name":"performUpkeep",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"position",
           "type":"uint256"
        }
     ],
     "name":"positions",
     "outputs":[
        {
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"initialDeposit",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"helixAmount",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"sparks",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"depositTime",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"liquidationPrice",
           "type":"uint256"
        },
        {
           "internalType":"uint256",
           "name":"liquidationCycle",
           "type":"uint256"
        },
        {
           "internalType":"bool",
           "name":"redeposit",
           "type":"bool"
        },
        {
           "internalType":"bool",
           "name":"liquidated",
           "type":"bool"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"renounceOwnership",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"seed",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"amount",
           "type":"uint256"
        }
     ],
     "name":"seedAndQuit",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"totalHelix",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"totalPositions",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"newOwner",
           "type":"address"
        }
     ],
     "name":"transferOwnership",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"_wallet",
           "type":"address"
        }
     ],
     "name":"updateLiquidationOutWallet",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address[]",
           "name":"_owners",
           "type":"address[]"
        }
     ],
     "name":"updateOwners",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"uint256",
           "name":"indexId",
           "type":"uint256"
        },
        {
           "internalType":"bool",
           "name":"redeposit",
           "type":"bool"
        }
     ],
     "name":"updatePositionRedeposit",
     "outputs":[
        
     ],
     "stateMutability":"nonpayable",
     "type":"function"
  },
  {
     "inputs":[
        
     ],
     "name":"usdt",
     "outputs":[
        {
           "internalType":"contract IERC20",
           "name":"",
           "type":"address"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"positionIndex",
           "type":"uint256"
        }
     ],
     "name":"userLiquidationStatus",
     "outputs":[
        {
           "internalType":"bool",
           "name":"indexEnabled",
           "type":"bool"
        },
        {
           "internalType":"bool",
           "name":"envAllows",
           "type":"bool"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  },
  {
     "inputs":[
        {
           "internalType":"address",
           "name":"user",
           "type":"address"
        },
        {
           "internalType":"uint256",
           "name":"",
           "type":"uint256"
        }
     ],
     "name":"userPositions",
     "outputs":[
        {
           "internalType":"uint256",
           "name":"positions",
           "type":"uint256"
        }
     ],
     "stateMutability":"view",
     "type":"function"
  }
] as const;

export default abi;