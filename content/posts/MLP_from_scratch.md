---
title: 'MLP from scratch (WIP)'
draft: false
---

Here I implemented a MLP from scratch. **The goal was to be able to predict the next character based on the three previous ones**. I followed the approach introduced in the [Bengio et al. 2003 MLP language model paper](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf).

Therefore the goal was to build a MLP with the following architecture :
{{<figure src="/images/architecture.png" caption="Figure 1: the MLP architecture according to the paper">}}

This architecture is composed of four layers :
- Input layer
- Embedding layer
- TanH layer
- Softmax layer