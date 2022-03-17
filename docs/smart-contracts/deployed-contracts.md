# Deployed Contracts

## Contract Addresses

The core smart contracts of Anchor are deployed on the [Terra blockchain](https://terra.money), and can be found at the below networks:

| Network Classification | Chain ID     |
| ---------------------- | ------------ |
| Mainnet                | `columbus-5` |
| Testnet                | `bombay-12`  |

For money market and liquidations, a separate set of contracts are to be deployed for each Terra stablecoin denomination. Each set, called Markets, will use different Terra denominations as their base currency. Only UST-supporting contracts have been deployed on initial launch.

### bLUNA Smart Contracts

{% tabs %}
{% tab title="Mainnet" %}
#### Core Contracts

| Contract            | Address                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Hub                 | [terra1mtwph2juhj0rvjz7dy92gvl6xvukaxu8rfv8ts](https://finder.terra.money/columbus-4/address/terra1mtwph2juhj0rvjz7dy92gvl6xvukaxu8rfv8ts) |
| Reward              | [terra17yap3mhph35pcwvhza38c2lkj7gzywzy05h7l0](https://finder.terra.money/columbus-4/address/terra17yap3mhph35pcwvhza38c2lkj7gzywzy05h7l0) |
| Rewards Dispatcher  | [terra1q9cs4d4x67u6yvsaswecf0usp2rygdnmrflzfj](https://finder.terra.money/columbus-5/address/terra1q9cs4d4x67u6yvsaswecf0usp2rygdnmrflzfj) |
| Validators Registry | [terra16j67029v236npntxjatwena6kh7rgvkwdkw0tm](https://finder.terra.money/columbus-5/address/terra16j67029v236npntxjatwena6kh7rgvkwdkw0tm) |
| Airdrop Registry    | [terra199t7hg7w5vymehhg834r6799pju2q3a0ya7ae9](https://finder.terra.money/columbus-4/address/terra199t7hg7w5vymehhg834r6799pju2q3a0ya7ae9) |

#### Cw20-Compliant Token Contracts

| Contract             | Address                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Bonded LUNA (bLUNA)  | [terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp](https://finder.terra.money/columbus-4/address/terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp) |
| Staked LUNA (stLUNA) | [terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc](https://finder.terra.money/columbus-5/address/terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc) |
{% endtab %}

{% tab title="Testnet" %}
#### Core Contracts

| Contract            | Address                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Hub                 | [terra1fflas6wv4snv8lsda9knvq2w0cyt493r8puh2e](https://finder.terra.money/testnet/address/terra1fflas6wv4snv8lsda9knvq2w0cyt493r8puh2e) |
| Reward              | [terra1ac24j6pdxh53czqyrkr6ygphdeftg7u3958tl2](https://finder.terra.money/testnet/address/terra1ac24j6pdxh53czqyrkr6ygphdeftg7u3958tl2) |
| Rewards Dispatcher  | [terra1p6ecqfknww4dkehdfsc5u9kqe0x0rvss3j3q5c](https://finder.terra.money/testnet/address/terra1p6ecqfknww4dkehdfsc5u9kqe0x0rvss3j3q5c) |
| Validators Registry | [terra10wt548y4y3xeqfrqsgqlqh424lll8fqxp6dyed](https://finder.terra.money/testnet/address/terra10wt548y4y3xeqfrqsgqlqh424lll8fqxp6dyed) |
| Airdrop Registry    | [terra1334h20c9ewxguw9p9vdxzmr8994qj4qu77ux6q](https://finder.terra.money/testnet/address/terra1334h20c9ewxguw9p9vdxzmr8994qj4qu77ux6q) |

#### Cw20-Compliant Token Contracts

| Contract             | Address                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Bonded LUNA (bLUNA)  | [terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x](https://finder.terra.money/testnet/address/terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x) |
| Staked LUNA (stLUNA) | [terra1e42d7l5z5u53n7g990ry24tltdphs9vugap8cd](https://finder.terra.money/testnet/address/terra1e42d7l5z5u53n7g990ry24tltdphs9vugap8cd) |
{% endtab %}
{% endtabs %}

### bETH Smart Contracts

{% tabs %}
{% tab title="Mainnet" %}
#### Core Contracts on Ethereum

| Contract               | Address                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AnchorVault            | [0xA2F987A546D4CD1c607Ee8141276876C26b72Bdf](https://etherscan.io/address/0xA2F987A546D4CD1c607Ee8141276876C26b72Bdf) |
| BridgeConnectorShuttle | [0x513251faB2542532753972B8FE9A7b60621affaD](https://etherscan.io/address/0x513251faB2542532753972B8FE9A7b60621affaD) |
| RewardsLiquidator      | [0xdb99Fdb42FEc8Ba414ea60b3a189208bBdbfa321](https://etherscan.io/address/0xdb99Fdb42FEc8Ba414ea60b3a189208bBdbfa321) |
| InsuranceConnector     | [0x2BDfD3De0fF23373B621CDAD0aD3dF1580efE701](https://etherscan.io/address/0x2BDfD3De0fF23373B621CDAD0aD3dF1580efE701) |
| bETH ShuttleVault      | [0xF9dcf31EE6EB94AB732A43c2FbA1dC6179c98965](https://etherscan.io/address/0xF9dcf31EE6EB94AB732A43c2FbA1dC6179c98965) |

#### ERC20-Compliant Token Contracts

| Contract | Address                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------- |
| stETH    | [0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84](https://etherscan.io/token/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84) |
| bETH     | [0x707F9118e33A9B8998beA41dd0d46f38bb963FC8](https://etherscan.io/token/0x707F9118e33A9B8998beA41dd0d46f38bb963FC8) |

#### Core Contracts on Terra

| Contract       | Address                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| bETH Reward    | [terra1939tzfn4hn960ychpcsjshu8jds3zdwlp8jed9](https://finder.terra.money/columbus-4/address/terra1939tzfn4hn960ychpcsjshu8jds3zdwlp8jed9) |
| bETH Converter | [terra1emvfel8x7wmvkwjfq3jpa6sq4nsfjjqjm7ucnl](https://finder.terra.money/mainnet/address/terra1emvfel8x7wmvkwjfq3jpa6sq4nsfjjqjm7ucnl)    |

#### CW20-Compliant Token Contracts

| Contract                                       | Address                                                                                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Wormhole webETH Token (Wormhole Wrapped Token) | [terra1u5szg038ur9kzuular3cae8hq6q5rk5u27tuvz](https://finder.terra.money/mainnet/address/terra1u5szg038ur9kzuular3cae8hq6q5rk5u27tuvz)    |
| Bonded ETH (bETH) (Whitelisted on Anchor)      | [terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun](https://finder.terra.money/columbus-4/address/terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun) |
{% endtab %}

{% tab title="Testnet" %}
#### Core Contracts on Ethereum

| Contract                 | Address                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| AnchorVault              | [0xf72B5bC0a05f15CaDB6731e59C7D99C1bFbB2FAb](https://ropsten.etherscan.io/address/0xf72B5bC0a05f15CaDB6731e59C7D99C1bFbB2FAb) |
| BridgeConnectorShuttle   | [0x0f49D26b45D0a9880431D33eAf7CCCb1Ebd67961](https://ropsten.etherscan.io/address/0x0f49D26b45D0a9880431D33eAf7CCCb1Ebd67961) |
| RopstenRewardsLiquidator | [0x81c73492380eC87B464b2E53f7e7f9dD30c7ded9](https://ropsten.etherscan.io/address/0x81c73492380eC87B464b2E53f7e7f9dD30c7ded9) |
| bETH ShuttleVault        | [0xDD7e8f8047D78bB103FAb4bAc1259Da207Da3861](https://ropsten.etherscan.io/address/0xDD7e8f8047D78bB103FAb4bAc1259Da207Da3861) |

#### ERC20-Compliant Token Contracts

| Contract | Address                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| stETH    | [0xd40EefCFaB888C9159a61221def03bF77773FC19](https://ropsten.etherscan.io/token/0xd40EefCFaB888C9159a61221def03bF77773FC19) |
| bETH     | [0xA60100d5e12E9F83c1B04997314cf11685A618fF](https://ropsten.etherscan.io/token/0xA60100d5e12E9F83c1B04997314cf11685A618fF) |

#### Core Contracts on Terra

| Contract       | Address                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| bETH Reward    | [terra1ja3snkedk4t0zp7z3ljd064hcln8dsv5x004na](https://finder.terra.money/testnet/address/terra1ja3snkedk4t0zp7z3ljd064hcln8dsv5x004na) |
| bETH Converter | [terra1g68g7l3xkpm4hvadrqrfc53vtnfhl4dlnjm45u](https://finder.terra.money/testnet/address/terra1g68g7l3xkpm4hvadrqrfc53vtnfhl4dlnjm45u) |

#### CW20-Compliant Token Contracts

| Contract                                       | Address                                                                                                                                 |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Wormhole webETH Token (Wormhole Wrapped Token) | [terra1d74gfj8gs6rskcuu80x3deus7gut77udhdajv7](https://finder.terra.money/testnet/address/terra1d74gfj8gs6rskcuu80x3deus7gut77udhdajv7) |
| Bonded ETH (bETH) (Whitelisted on Anchor)      | [terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l](https://finder.terra.money/testnet/address/terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l) |
{% endtab %}
{% endtabs %}

### ANC-Related Smart Contracts

{% tabs %}
{% tab title="Mainnet" %}
#### Core Contracts

| Contract             | Address                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Gov                  | [terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5](https://finder.terra.money/columbus-4/address/terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5) |
| LP Staking \[Legacy] | [terra1897an2xux840p9lrh6py3ryankc6mspw49xse3](https://finder.terra.money/columbus-4/address/terra1897an2xux840p9lrh6py3ryankc6mspw49xse3) |
| LP Staking           | [terra1h3mf22jm68ddueryuv2yxwfmqxxadvjceuaqz6](https://finder.terra.money/mainnet/address/terra1h3mf22jm68ddueryuv2yxwfmqxxadvjceuaqz6)    |
| Community            | [terra12wk8dey0kffwp27l5ucfumczlsc9aned8rqueg](https://finder.terra.money/columbus-4/address/terra12wk8dey0kffwp27l5ucfumczlsc9aned8rqueg) |
| Collector            | [terra14ku9pgw5ld90dexlyju02u4rn6frheexr5f96h](https://finder.terra.money/columbus-4/address/terra14ku9pgw5ld90dexlyju02u4rn6frheexr5f96h) |
| Distributor          | [terra1mxf7d5updqxfgvchd7lv6575ehhm8qfdttuqzz](https://finder.terra.money/columbus-4/address/terra1mxf7d5updqxfgvchd7lv6575ehhm8qfdttuqzz) |

#### Cw20-Compliant Token Contracts

| Contract           | Address                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Anchor Token (ANC) | [terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76](https://finder.terra.money/columbus-4/address/terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76) |
{% endtab %}

{% tab title="Testnet" %}
#### Core Contracts

| Contract             | Address                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Gov                  | [terra16ckeuu7c6ggu52a8se005mg5c0kd2kmuun63cu](https://finder.terra.money/testnet/address/terra16ckeuu7c6ggu52a8se005mg5c0kd2kmuun63cu) |
| LP Staking \[Legacy] | [terra19nxz35c8f7t3ghdxrxherym20tux8eccar0c3k](https://finder.terra.money/testnet/address/terra19nxz35c8f7t3ghdxrxherym20tux8eccar0c3k) |
| LP Staking           | [terra1q68gyyxqnlh58jacz5r6rxfmxqpmmjv583fzqq](https://finder.terra.money/testnet/address/terra1q68gyyxqnlh58jacz5r6rxfmxqpmmjv583fzqq) |
| Community            | [terra17g577z0pqt6tejhceh06y3lyeudfs3v90mzduy](https://finder.terra.money/testnet/address/terra17g577z0pqt6tejhceh06y3lyeudfs3v90mzduy) |
| Collector            | [terra1hlctcrrhcl2azxzcsns467le876cfuzam6jty4](https://finder.terra.money/testnet/address/terra1hlctcrrhcl2azxzcsns467le876cfuzam6jty4) |
| Distributor          | [terra1z7nxemcnm8kp7fs33cs7ge4wfuld307v80gypj](https://finder.terra.money/testnet/address/terra1z7nxemcnm8kp7fs33cs7ge4wfuld307v80gypj) |

#### Cw20-Compliant Token Contracts

| Contract           | Address                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Anchor Token (ANC) | [terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc](https://finder.terra.money/testnet/address/terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc) |
{% endtab %}
{% endtabs %}

### TerraUSD Market Smart Contracts

{% hint style="danger" %}
### **WARNING**

Sending native tokens with a denomination not supported by the recipient contract will lead to **PERMANENT LOSS OF FUNDS**.
:::

Below are addresses of money market and liquidation contracts that use **TerraUSD** as their base denomination.

#### Money Market

{% tabs %}
{% tab title="Mainnet" %}
#### Core Contracts

| Contract           | Address                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Overseer           | [terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8](https://finder.terra.money/columbus-4/address/terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8) |
| Market             | [terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s](https://finder.terra.money/columbus-4/address/terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s) |
| bLuna Custody      | [terra1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn](https://finder.terra.money/columbus-4/address/terra1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn) |
| bETH Custody       | [terra10cxuzggyvvv44magvrh3thpdnk9cmlgk93gmx2](https://finder.terra.money/columbus-4/address/terra10cxuzggyvvv44magvrh3thpdnk9cmlgk93gmx2) |
| Interest Model     | [terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n](https://finder.terra.money/columbus-4/address/terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n) |
| Distribution Model | [terra14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq](https://finder.terra.money/columbus-4/address/terra14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq) |
| Oracle             | [terra1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t](https://finder.terra.money/columbus-4/address/terra1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t) |

#### Cw20-Compliant Token Contracts

| Contract               | Address                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Anchor TerraUSD (aUST) | [terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu](https://finder.terra.money/columbus-4/address/terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu) |
{% endtab %}

{% tab title="Testnet" %}
#### Core Contracts

| Contract           | Address                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Overseer           | [terra1qljxd0y3j3gk97025qvl3lgq8ygup4gsksvaxv](https://finder.terra.money/testnet/address/terra1qljxd0y3j3gk97025qvl3lgq8ygup4gsksvaxv) |
| Market             | [terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal](https://finder.terra.money/testnet/address/terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal) |
| bLuna Custody      | [terra1ltnkx0mv7lf2rca9f8w740ashu93ujughy4s7p](https://finder.terra.money/testnet/address/terra1ltnkx0mv7lf2rca9f8w740ashu93ujughy4s7p) |
| bETH Custody       | [terra1j6fey5tl70k9fvrv7mea7ahfr8u2yv7l23w5e6](https://finder.terra.money/testnet/address/terra1j6fey5tl70k9fvrv7mea7ahfr8u2yv7l23w5e6) |
| Interest Model     | [terra1m25aqupscdw2kw4tnq5ql6hexgr34mr76azh5x](https://finder.terra.money/testnet/address/terra1m25aqupscdw2kw4tnq5ql6hexgr34mr76azh5x) |
| Distribution Model | [terra1u64cezah94sq3ye8y0ung28x3pxc37tv8fth7h](https://finder.terra.money/testnet/address/terra1u64cezah94sq3ye8y0ung28x3pxc37tv8fth7h) |
| Oracle             | [terra1p4gg3p2ue6qy2qfuxtrmgv2ec3f4jmgqtazum8](https://finder.terra.money/testnet/address/terra1p4gg3p2ue6qy2qfuxtrmgv2ec3f4jmgqtazum8) |

#### Cw20-Compliant Token Contracts

| Contract               | Address                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Anchor TerraUSD (aUST) | [terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl](https://finder.terra.money/testnet/address/terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl) |
{% endtab %}
{% endtabs %}

#### Liquidation Contract

{% tabs %}
{% tab title="Mainnet" %}
#### Core Contracts

| Contract                       | Address                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Liquidation Contract \[Legacy] | [terra1w9ky73v4g7v98zzdqpqgf3kjmusnx4d4mvnac6](https://finder.terra.money/columbus-4/address/terra1w9ky73v4g7v98zzdqpqgf3kjmusnx4d4mvnac6) |
| Liquidation Queue Contract     | [terra1e25zllgag7j9xsun3me4stnye2pcg66234je3u](https://finder.terra.money/columbus-5/address/terra1e25zllgag7j9xsun3me4stnye2pcg66234je3u) |
{% endtab %}

{% tab title="Testnet" %}
#### Core Contracts

| Contract                       | Address                                                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Liquidation Contract \[Legacy] | [terra16vc4v9hhntswzkuunqhncs9yy30mqql3gxlqfe](https://finder.terra.money/testnet/address/terra16vc4v9hhntswzkuunqhncs9yy30mqql3gxlqfe) |
| Liquidation Queue Contract     | [terra18j0wd0f62afcugw2rx5y8e6j5qjxd7d6qsc87r](https://finder.terra.money/testnet/address/terra18j0wd0f62afcugw2rx5y8e6j5qjxd7d6qsc87r) |
{% endtab %}
{% endtabs %}
