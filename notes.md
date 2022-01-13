On trying to broadcast transaction:
```ubuntu  1    terrad tx broadcast --node=tcp://localhost:26657 signedSendTx.json
code: 13
codespace: sdk
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: 'insufficient fees; got: "", required: "38000uaud,38000ucad,28000uchf,196000ucny,180000udkk,25000ueur,22000ugbp,234000uhkd,436000000uidr,2176000uinr,3274000ujpy,33954000ukrw,2266uluna,85714200umnt,250000unok,1520000uphp,20988usdr,250000usek,40000usgd,924000uthb,30000uusd"
  = "38000uaud,38000ucad,28000uchf,196000ucny,180000udkk,25000ueur,22000ugbp,234000uhkd,436000000uidr,2176000uinr,3274000ujpy,33954000ukrw,2266uluna,85714200umnt,250000unok,1520000uphp,20988usdr,250000usek,40000usgd,924000uthb,30000uusd"(gas)
  +""(stability): insufficient fee'
timestamp: ""
tx: null
txhash: CCA18C3CD637C3D04937E5BADE31D0A06A494F7FAA8ACD459190328F7EB9A298
```


same for public node :
```
ubuntu  1    terrad tx broadcast --node=http://public-node.terra.dev:26657/ signedSendTx.json
code: 13
codespace: sdk
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: 'insufficient fees; got: "", required: "105421uaud,96383ucad,69449uchf,491128ucny,480555udkk,64622ueur,55349ugbp,590169uhkd,1090000000uidr,5617131uinr,8337594ujpy,88703066ukrw,2640uluna,212335117umnt,662833unok,3800000uphp,53482usdr,662833usek,102915usgd,2516361uthb,76000uusd"
  = "105421uaud,96383ucad,69449uchf,491128ucny,480555udkk,64622ueur,55349ugbp,590169uhkd,1090000000uidr,5617131uinr,8337594ujpy,88703066ukrw,2640uluna,212335117umnt,662833unok,3800000uphp,53482usdr,662833usek,102915usgd,2516361uthb,76000uusd"(gas)
  +""(stability): insufficient fee'
timestamp: ""
tx: null
txhash: CCA18C3CD637C3D04937E5BADE31D0A06A494F7FAA8ACD459190328F7EB9A298
```

1. Try the above with the actual account from terra station. Disambiguate the difference between node address and user address if that works. 

1. Read the fees reference.

## Fees section (in terrad reference)

- not quite clear how to apply and which part matters to the user and which one to the node operator



______________________________________________

## Setting up Validator


### overview

- Add link to how to set comissions in the overview?

#### setup
- got rid of the additional resources second time
- changed the pubkey command ( not valid shell) (Does the whol json file go in or just hte `key`?)
...
- added the three commands gas flags that jared recommended
- it is not exactly clear in what relationship to each other do the `priv_validator_key.json` and the output of `terrad tendermint show-validator` are to each other.Found my validator in the `tendermint set` buw with a `terrava...` type of signature now.. when did this get assigned? is this important to anything downstream?
There is also `address` returned by the `terrad keys list` : assuming that this one is a just the user address (as opposed to the validator one).



- remade note into a sentence


### oracle section

-had to add --chain-id and gas magic words to consent. it's also not clear, again, which of the keys i should stick for <validator> : why is it still my node's address/key (aka `terra1ru2y342y09tzsnzxl7tf9cva9kp33h0jnsm9ss`) as opposed to my `terravaloper1ru2y342y09tzsnzxl7tf9cva9kp33h0jnlhcqr` address? Terra finder show the latter one btw.

