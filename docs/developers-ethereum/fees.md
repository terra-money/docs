# Fees

EthAnchor is built using various blockchain infrastructure, which charges fees on their usage. Using EthAnchor incurs fees that are calculated based on the deposit / redeem amount. Fees listed at this section are applied independent of gas spent on Ethereum transactions.

| Operation        | # of Shuttle Fee | # of Terra Tax |
| ---------------- | ---------------- | -------------- |
| `deposit_stable` | Once             | Once           |
| `redeem_stable`  | Once             | Twice          |

## Shuttle Fee

{% hint style="warning" %}
Shuttle ignores transfer requests with a transfer value smaller than **1 UST**.
{% endhint %}

Cross-chain transfers of Terra stablecoins and aTerra tokens between Ethereum and Terra are facilitated with the use of [Shuttle](https://github.com/terra-project/shuttle). Shuttle charges a fee **only** for cross-chain token transfers from Terra to Ethereum, with the fee amount being:&#x20;

$$
\text{shuttleFee}=\text{max} (1\,\text{UST},\,\text{transferAmount} \cdot 0.1\% )
$$

0.1% of the transfer amount is charged as Shuttle fees, decreasing with the transfer amount until the fee reaches the 1 UST minimum. Amount received after fees will be:&#x20;

$$
\text{receiveAmount} = (1-\text{shuttleFee}) \cdot \text{transferAmount}
$$

Note that this fee will be applied **once** for **both** `deposit_stable` and `redeem_stable`.

## Terra Blockchain Tax

Terra stablecoin transfers that occur on the Terra blockchain are require a Terra tax (protocol fee) to be paid. Tax amount is dependent on the transfer amount, represented as:&#x20;

$$
\text{terraTax} = \text{min}(\text{taxCap}, \text{transferAmount}\cdot\text{taxRate})
$$

Tax amount increases with as transfer amount increases, until it reaches a cap of 1 TerraSDR (SDT), currently valued at around \~1.42 UST. Terra SDR is a Terra stablecoin pegged to the International Monetary Fund's Special Drawing Rights (SDR) and its value -- along with the tax cap -- may differ as exchange rates vary with time.

EthAnchor is configured to automatically deduct the amount of stablecoins required for tax before making Terra-side transfers. Thus the post-transfer receive amount will be:&#x20;

$$
\text{receiveAmount} = \frac{1}{1+\text{terraTax}}\cdot\text{transferAmount}
$$

Note that this tax fee is applied **once** for `deposit_stable` and **twice** for `redeem_stable`.
