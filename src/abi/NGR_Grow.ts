const abi = [
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_grow",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "_usdt",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "_dev",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "_burner",
         "type": "address"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "constructor"
   },
   {
     "inputs": [],
     "name": "NGR_GROW__InvalidDepositAmount",
     "type": "error"
   },
   {
     "inputs": [],
     "name": "NGR_GROW__InvalidMaxDeposit",
     "type": "error"
   },
   {
     "inputs": [],
     "name": "NGR_GROW__InvalidMinDeposit",
     "type": "error"
   },
   {
     "inputs": [],
     "name": "NGR_GROW__InvalidWithdraw",
     "type": "error"
   },
   {
     "inputs": [],
     "name": "NGR_GROW__LiquidatorMinDepositNotReached",
     "type": "error"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "uint256",
         "name": "position",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "helixBought",
         "type": "uint256"
       }
     ],
     "name": "Deposit",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "uint256",
         "name": "position",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "totalReceived",
         "type": "uint256"
       }
     ],
     "name": "EarlyExit",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "uint256",
         "name": "position",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "totalReceived",
         "type": "uint256"
       }
     ],
     "name": "Liquidated",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "liquidator",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "totalLiquidatorReceived",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "totalLiquidated",
         "type": "uint256"
       }
     ],
     "name": "LiquidatedOthers",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "uint256",
         "name": "position",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "totalReceived",
         "type": "uint256"
       }
     ],
     "name": "LiquidatedSelf",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "previousOwner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "newOwner",
         "type": "address"
       }
     ],
     "name": "OwnershipTransferred",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "bool",
         "name": "autoReinvest",
         "type": "bool"
       }
     ],
     "name": "SelfAutoReinvest",
     "type": "event"
   },
   {
     "inputs": [],
     "name": "DEPOSIT_LIMIT_1",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "DEPOSIT_LIMIT_2",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "INIT_MAX_DEPOSIT",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "MAX_DEPOSIT_LIMIT",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "MIN_DEPOSIT",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "MIN_PROFIT",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "PERCENT",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "TARGET_PROFIT",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "TCV_DEPOSIT_LIMIT_1",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "TCV_DEPOSIT_LIMIT_2",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "name": "acceptedReturns",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "name": "autoReinvest",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "burnerAmount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "burnerWallet",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "bool",
         "name": "_autoReinvest",
         "type": "bool"
       }
     ],
     "name": "changeAutoReinvest",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_newBurner",
         "type": "address"
       }
     ],
     "name": "changeBurnerWallet",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "currentPositionToLiquidate",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
       },
       {
         "internalType": "bool",
         "name": "_autoReinvest",
         "type": "bool"
       }
     ],
     "name": "deposit",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
       },
       {
         "internalType": "address",
         "name": "_receiver",
         "type": "address"
       }
     ],
     "name": "depositForUser",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "devWallet",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "position",
         "type": "uint256"
       }
     ],
     "name": "earlyExit",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "startPosition",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "positionAmount",
         "type": "uint256"
       }
     ],
     "name": "getPositions",
     "outputs": [
       {
         "components": [
           {
             "internalType": "address",
             "name": "owner",
             "type": "address"
           },
           {
             "internalType": "uint256",
             "name": "depositTime",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "liqTime",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "amountDeposited",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "growAmount",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "liquidationPrice",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "liquidatedAmount",
             "type": "uint256"
           },
           {
             "internalType": "bool",
             "name": "isLiquidated",
             "type": "bool"
           },
           {
             "internalType": "bool",
             "name": "early",
             "type": "bool"
           }
         ],
         "internalType": "struct NGR_with_Grow.Position[]",
         "name": "",
         "type": "tuple[]"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_owner",
         "type": "address"
       }
     ],
     "name": "getUserMainPositions",
     "outputs": [
       {
         "components": [
           {
             "internalType": "uint256",
             "name": "mainDeposit",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "liquidationStartPrice",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "positionId",
             "type": "uint256"
           }
         ],
         "internalType": "struct NGR_with_Grow.UserPositions[]",
         "name": "",
         "type": "tuple[]"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_owner",
         "type": "address"
       }
     ],
     "name": "getUserPositions",
     "outputs": [
       {
         "internalType": "uint256[]",
         "name": "",
         "type": "uint256[]"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_owner",
         "type": "address"
       }
     ],
     "name": "getUserPositionsInfo",
     "outputs": [
       {
         "components": [
           {
             "internalType": "address",
             "name": "owner",
             "type": "address"
           },
           {
             "internalType": "uint256",
             "name": "depositTime",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "liqTime",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "amountDeposited",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "growAmount",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "liquidationPrice",
             "type": "uint256"
           },
           {
             "internalType": "uint256",
             "name": "liquidatedAmount",
             "type": "uint256"
           },
           {
             "internalType": "bool",
             "name": "isLiquidated",
             "type": "bool"
           },
           {
             "internalType": "bool",
             "name": "early",
             "type": "bool"
           }
         ],
         "internalType": "struct NGR_with_Grow.Position[]",
         "name": "",
         "type": "tuple[]"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "grow",
     "outputs": [
       {
         "internalType": "contract IGrow",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "name": "isLiquidator",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256[]",
         "name": "_positions",
         "type": "uint256[]"
       }
     ],
     "name": "liquidatePositions",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "liquidatorAmount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "minLiquidatorThreshold",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "owner",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "posId",
         "type": "uint256"
       }
     ],
     "name": "positions",
     "outputs": [
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "depositTime",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "liqTime",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "amountDeposited",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "growAmount",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "liquidationPrice",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "liquidatedAmount",
         "type": "uint256"
       },
       {
         "internalType": "bool",
         "name": "isLiquidated",
         "type": "bool"
       },
       {
         "internalType": "bool",
         "name": "early",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "queuePosition",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "renounceOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "_burnerAmount",
         "type": "uint256"
       }
     ],
     "name": "setBurnAmount",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "_thresholdAmount",
         "type": "uint256"
       }
     ],
     "name": "setLiquidatorThreshold",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "bool",
         "name": "_autoReinvest",
         "type": "bool"
       }
     ],
     "name": "setSelfAutoReinvest",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "totalAmount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "totalDeposits",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "totalLiquidations",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "totalPaidToLiquidators",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "newOwner",
         "type": "address"
       }
     ],
     "name": "transferOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_devWallet",
         "type": "address"
       }
     ],
     "name": "updateDevWallet",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "usdt",
     "outputs": [
       {
         "internalType": "contract IERC20",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "userMainDeposits",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "mainDeposit",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "liquidationStartPrice",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "positionId",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "name": "userStats",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "totalDeposited",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "totalLiquidated",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "totalEarly",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "otherLiquidationProfits",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   }
 ] as const;

export default abi;