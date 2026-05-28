---
layout: default
title: "Unit 8: Inference for Categorical Data: Chi-Square"
parent: AP Statistics
nav_order: 8
permalink: /notes/ap/stats/catchi/
---

# Unit 8: Inference for Categorical Data: Chi-Square

Chi-square procedures handle categorical data with counts in categories. They compare **observed counts** to **expected counts** and ask whether the differences are larger than random variation would usually produce.

---

## The Chi-Square Distribution

The **chi-square distribution** is a family of right-skewed distributions indexed by degrees of freedom.

:::note
Chi-square values are always nonnegative because they are built from squared differences.
:::

As degrees of freedom increase, the distribution becomes less skewed. For a chi-square distribution,

:::key{name="Mean and standard deviation"}
$$
\mu = df
$$

and

$$
\sigma = \sqrt{2df}.
$$
:::

:::figure{width=480}
![Chi-square distribution placeholder](/assets/APs/AP%20Stats/catchi/chi-square-distribution.png)
:::

---

## The Chi-Square Statistic

All AP chi-square tests use the same general statistic:

:::key{name="Chi-square statistic"}
$$
\chi^2 = \sum \frac{(O-E)^2}{E}.
$$
:::

Here $$O$$ is an observed count and $$E$$ is an expected count. Large values of $$\chi^2$$ indicate that observed counts are far from expected counts.

:::warning
Chi-square tests are right-tailed: the p-value is the probability of getting a chi-square statistic at least as large as the observed one.
:::

---

## Conditions For Chi-Square Tests

:::exam{topic="Chi-square conditions"}
Common conditions:

1. Counts come from a random sample, random assignment, or randomized process.
2. Observations are independent. If sampling without replacement, check the 10% Condition.
3. Expected counts are large enough. AP Statistics commonly uses: all expected counts are at least 5.
:::

:::warning
Use counts, not proportions or percentages, in the chi-square statistic.
:::

---

## Goodness-Of-Fit Test

:::theorem{name="Chi-square goodness-of-fit test"}
A **chi-square goodness-of-fit test** checks whether one categorical variable follows a claimed distribution.

Hypotheses:

- $$H_0$$: The population distribution matches the claimed proportions.
- $$H_a$$: The population distribution does not match the claimed proportions.

Expected counts are

$$
E_i = n p_i,
$$

where $$p_i$$ is the claimed proportion for category $$i$$.

Degrees of freedom:

$$
df = k-1,
$$

where $$k$$ is the number of categories.
:::

:::figure{width=480}
![Goodness of fit table placeholder](/assets/APs/AP%20Stats/catchi/goodness-of-fit.png)
:::

---

## Test Of Independence

:::theorem{name="Chi-square test of independence"}
A **chi-square test of independence** checks whether two categorical variables are associated in one population.

Hypotheses:

- $$H_0$$: The two variables are independent in the population.
- $$H_a$$: The two variables are associated in the population.

Expected count for each cell:

$$
E = \frac{(\text{row total})(\text{column total})}{\text{grand total}}.
$$

Degrees of freedom:

$$
df = (r-1)(c-1),
$$

where $$r$$ is the number of rows and $$c$$ is the number of columns.
:::

---

## Test For Homogeneity

:::theorem{name="Chi-square test for homogeneity"}
A **chi-square test for homogeneity** compares the distribution of one categorical variable across two or more populations or treatments.

Hypotheses:

- $$H_0$$: The category distribution is the same for all populations/treatments.
- $$H_a$$: At least one population/treatment has a different distribution.

The expected count formula is the same as for independence:

$$
E = \frac{(\text{row total})(\text{column total})}{\text{grand total}}.
$$

Degrees of freedom:

$$
df = (r-1)(c-1).
$$
:::

---

## Independence Versus Homogeneity

:::note
The calculations for independence and homogeneity are identical, but the study design and conclusion are different.
:::

| Test | Data source | Question |
| --- | --- | --- |
| Independence | One random sample, classify each individual by two variables | Are the variables associated? |
| Homogeneity | Separate random samples or treatments, classify one variable | Are the distributions the same across groups? |

:::tip
If the problem has one sample and two categorical variables, think independence. If the problem has multiple samples or treatment groups and one categorical outcome, think homogeneity.
:::

---

## Interpreting Contributions

Each cell's contribution is

:::key{name="Cell contribution"}
$$
\frac{(O-E)^2}{E}.
$$
:::

:::tip
Cells with large contributions explain most of the chi-square statistic. After rejecting a null hypothesis, inspect which cells have observed counts much larger or smaller than expected to describe the direction of the association or difference.
:::

---

## Calculator Notes

:::tip
Common calculator tools:

- `χ²GOF-Test`: goodness-of-fit test.
- `χ²-Test`: test of independence or homogeneity using a matrix of observed counts.

For two-way tables, store observed counts in a matrix, run the test, and inspect the expected-count matrix to check conditions.
:::

---

## Working Checklist

:::summary{title="Working checklist"}
1. Identify the test: goodness-of-fit, independence, or homogeneity.
2. State hypotheses in context.
3. Calculate expected counts and check conditions.
4. Compute $$\chi^2$$ and degrees of freedom.
5. Find the right-tail p-value.
6. Conclude in context.
7. If significant, describe which categories/cells drive the result.
:::

---

## Key Equations

:::key{name="Key equations"}
| Idea | Equation |
| --- | --- |
| Chi-square statistic | $$\chi^2=\sum \frac{(O-E)^2}{E}$$ |
| GOF expected count | $$E_i=np_i$$ |
| Two-way expected count | $$E=\frac{(\text{row total})(\text{column total})}{\text{grand total}}$$ |
| GOF degrees of freedom | $$df=k-1$$ |
| Two-way table degrees of freedom | $$df=(r-1)(c-1)$$ |
:::
