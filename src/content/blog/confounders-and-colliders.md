---
title: "Confounders, mediators and colliders"
date: 2027-05-18
summary: "Adjusting for a variable can remove a false association, hide a real effect or create one that wasn't there. Which of the three happens depends on the causal arrows, not on the correlations."
draft: true
---

Adjusting for a variable means holding it fixed, either by putting it in the regression or by comparing like with like. People usually do it because the variable is correlated with both the cause and the outcome, and that isn't enough to tell you whether adjusting helps. Depending on the causal arrows, it can remove a false association, hide a real effect, or create an association that wasn't there.

## Three structures

Call the cause x, the outcome y and the third variable z. In a causal diagram you draw an arrow from each thing to whatever it influences, and z can sit in three different places.

A confounder is a common cause of x and y. Age affects who is given a treatment and also how well people recover, so comparing treated with untreated people mixes the effect of the treatment with the effect of age. Adjust for it.

A mediator lies on the path from x to y. A subsidy might raise farm income by raising yields, which makes yield a mediator between subsidy and income. Adjusting for yield removes the part of the effect that goes through it. If you want the total effect of the subsidy, don't adjust. If you want the part that doesn't go through yield, do. (The labels in the figure assume you want the total effect.)

A collider is caused by both x and y. Two causes that are independent of each other stay independent, unless you look only at cases where the collider takes a particular value or range. Adjusting for z, or selecting on it, opens a path that was closed.

What decides it is where the arrows point. A variable that is correlated with both x and y can be a confounder, a mediator or a collider, and the data alone don't say which.

Numbers help here, so I simulated the first two. For the confounder, 20,000 patients with a standardised age. Older patients are more likely to be treated (the probability is 1/(1 + exp(-1.2 age))), and each standard deviation of age lowers the recovery score by 4. The treatment really adds 3. The treated group ends up older on average (+0.46 standard deviations against -0.45), and the raw difference in mean recovery between treated and untreated comes out at -0.5. The treatment looks mildly harmful. Regress recovery on treatment and age together and the treatment coefficient is 3.1, with age at -4.0. So the unadjusted comparison gets the sign wrong, and nothing in a table of treated against untreated would show it.

For the mediator, 20,000 farms in made-up units, the subsidy handed out at random so there is no confounding to worry about. It raises yield by 0.8 and each unit of yield adds 2 to income. The subsidy also adds 0.5 to income directly. Income on subsidy alone gives 2.1, which is 0.8 x 2 + 0.5, the total effect. Put yield in as well and the subsidy coefficient drops to 0.5 (yield gets 2.0). Both numbers are right. They answer different questions.

## Selection on a collider

Berkson (1946) pointed out that hospital patients are a selected sample. If admission depends on having either of two conditions, the conditions can look associated among patients even when they're unrelated in the population. The same thing happens wherever a sample is chosen by something that both variables feed into.

It takes very little. Draw 500 pairs of scores, x and y, independently from a standard normal distribution. Across all 500 the correlation is -0.02. Now keep only the pairs whose sum exceeds 1, which is 121 of them, a little under a quarter. Among those kept the correlation is -0.60.

![Left, three small diagrams with variables x, y and z: z as a common cause of x and y, z between x and y, and z caused by both. Right, a scatter of 500 pairs of independent scores, with the 121 pairs whose sum exceeds 1 marked, in which the correlation among the marked pairs is -0.60.](figure:confounders-and-colliders "Left: z as a confounder, a mediator and a collider. Right: 500 independent pairs. Keep only the 121 above the dashed line (x + y > 1) and x and y correlate at -0.60.")

The selection rule made the association. Suppose a funder ranks proposals on the sum of two independent scores, say the strength of the idea and the track record of the team, and funds the top quarter. Among the funded proposals the two scores will be negatively related, and anyone looking only at that list could conclude that a strong idea makes up for a weak record, or the other way round. Papers accepted on a mix of novelty and rigour would do the same, if the two were unrelated among the papers submitted.

You don't need to select for this to bite. Putting z in a regression is conditioning on it too. With x and y independent and z = x + y + noise (noise with standard deviation 1), a regression of y on x gives a coefficient of 0.01, as it should. Add z and the coefficient on x becomes -0.50, with z at 0.51. That's what the algebra says: given z, the expected value of y is (z - x)/2, so a higher x has to mean a lower y.

The ecological version is survival. Say the chance of surviving to the census rises with both how well a seedling is suited to the site and how good the site is, and the two start out unrelated. In a quick simulation with those two as standard normals the correlation is 0.01 in the whole cohort, and 38 per cent survive. Among the survivors it's -0.34. Anyone who measures only the survivors will find that well-suited individuals sit on poor sites, and the reverse.

## Where it goes wrong

The commonest mistake, I think, is adjusting for everything that was measured before the treatment, on the grounds that a variable measured earlier can't be a collider. It can. Let z be caused by two things nobody measured, one of which also drives x and the other y. Then z is a collider on the path between x and y, and adjusting for it connects them. In a simulation where x really has no effect on y, the coefficient is -0.01 without z and -0.30 with it. How big this gets depends on how strong the arrows into z are (here they're strong on purpose), and Greenland (2003) worked out how it compares with ordinary confounding bias. What I take from it is that no variable should go in or stay out by default. I want to know which arrows I'm assuming first.

A second one is reading every coefficient in the regression as an effect. The model gives you a number for each covariate, and only the one you built the adjustment set for is meant to be causal. The others would need their own diagrams and usually their own sets. Westreich and Greenland (2013) call this the Table 2 fallacy, after the place in a paper where the table usually appears.

A third is that adjustment can only remove the confounding you measured, and only as well as you measured it. A quick check: x = 0.8 z + noise, y = 0.5 x + z + noise, so the true effect of x is 0.5. The unadjusted slope is 0.98 and adjusting for z gives 0.50. Adjust instead for a noisy copy of z, with measurement noise as large as the variation in z, and you get 0.79. Better than nothing: it takes out about 40 per cent of the bias and leaves the rest.

All of this rests on the diagram being right. A missing arrow is a claim as strong as a drawn one, and "no unmeasured common cause of x and y" is usually the one that matters most and the one the data can't check. Some things can be checked. In the collider diagram x and y should be uncorrelated before adjustment, and every missing arrow in a diagram implies independences of this kind that you can compare with your data. That catches some wrong diagrams. It can't catch an unmeasured confounder.

## What to do

Draw the diagram before choosing what to adjust for. It needn't be elaborate: x, y, the other variables, and an arrow wherever you could defend one. Pearl (1995) gave a rule, the back-door criterion, for reading a valid adjustment set off such a diagram. The set doesn't come from which variables turned out significant, and adding every measured variable isn't a safe default, because a collider among them does damage.

Two more habits. Ask how each unit came to be in the data. A sample chosen by a score, a survey people had to answer, a list of funded projects and a set of published results are all selected, and the selection may be a collider. And say which effect you want before adjusting, total or direct, because the same mediator is right to include for one and wrong for the other.

If I'm looking at someone else's analysis I ask which arrow they're least sure of, and what the estimate becomes if it points the other way. The diagram is also the cheapest record of assumptions. Two analysts who disagree about an adjustment can look at the arrows and find the one they disagree about, which is quicker than arguing about the regression.
