# Deposit Rate Subsidization

Anchor Protocol's deposit rate stability is supported by borrow demand from borrower ANC distribution and direct subsidization. Anchor defines a target deposit rate ($$r_{target}$$), and a threshold deposit rate ($$r_{threshold}$$) and constantly attempts to retain a deposit rate close to $$r_{target}$$ and always above $$r_{threshold}$$.

Every epoch, the average deposit rate during the last epoch ($$r_{current}$$) is calculated and compared with the target and threshold rates. Appropriate measures are then made to readjust the deposit rate.

## Borrower ANC Incentives

Anchor's deposit rate is primarily adjusted by calibrating the rate of ANC emission to borrowers ($$e$$), updated through a feedback control algorithm.

### ANC Emission Feedback Control

Anchor alters the ANC emission rate based on a **multiplicative increase / multiplicative decrease feedback control** algorithm, which adjusts the ANC emission rate of the next epoch $$e_{n+1}$$ based on the previous emission rate of $$e_n$$:

$$
e_{n+1} = k \cdot e_n
$$

The feedback control algorithm adjusts incentives with $$r_{average}$$ - the average of $$r_{target}$$ and $$r_{threshold}$$ - as the reference point:

$$
r_{average}=\frac{r_{target}+r_{threshold}}{2}
$$

* If deposit rate is approaching the threshold ($$r_{current} < \frac{r_{threshold}+r_{average}}{2}$$), increase emission by 0.7% ($$k \approx 1.007$$)
* If deposit rate approaches the target ($$r_{current} > \frac{r_{target}+r_{average}}{2}$$), reduce emission by 0.3% ($$k \approx 0.997$$)

where the set $$k$$ values result in a 50% emission increase over a week-long period or a 15% decrease over a week-long period.

## Direct Subsidization

As an additional layer of safety, the protocol directly subsidizes the deposit rate if it is below the threshold rate ($$r_{current}<r_{threshold}$$), funded from the yield reserve's stockpiled stablecoins.&#x20;

An amount required to raise the deposit rate to the threshold is distributed to depositors, which is limited to 10% of the yield reserve's balance per subsidization to prevent excessive drainage. Distributed subsidies are added to the money market’s liquidity, increasing the aTerra exchange rate and appreciating the value of aTerra.
