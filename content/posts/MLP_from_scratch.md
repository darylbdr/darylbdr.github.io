---
title: 'MLP from scratch (WIP)'
draft: false
showToc: true
---

Here I implemented a MLP from scratch where **The goal was to be able to generate fictional character names**. I followed the approach introduced in the [Bengio et al. 2003 MLP language model paper](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf).

the MLP architecture proposed in this paper is the following :
{{<figure src="/images/architecture.png" caption="Figure 1: the MLP architecture according to the paper">}}

It is composed of three layers :
- [The Input embedding layer](#the-input-embedding-layer)
- The TanH layer
- The Softmax layer

# The Input embedding Layer

In Bengio et al.'s paper, the input layer receives a context window of *n* previous tokens and maps each of them into a continuous embedding space.Before feeding sequence data into the neural network, we must preprocess the raw text so that it matches the shape and format expected by the embedding layer.

## Data Preprocessing

### 1. Building the vocabulary
Since this implementation operates at the character level, the vocabulary is composed of every unique character present in the dataset (letters, spaces, hyphens, etc.).

```python
    # extract all unique characters from the dataset
    vocab = sorted(set(list(''.join(names)))) 
    the vocab looks like this : [' ', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', '...z']
```
### 2. Creating Token Mappings (String ↔ Integer)
Neural networks cannot process raw strings directly, so we map each character to a unique integer index :
```python
    # Map characters to unique integer indices
    char_to_idx = { char:idx + 1 for idx, char in enumerate(vocab[2:])}
    char_to_idx.update({'.': 0, '-': 27, ' ': 28})
    ## Reverse mapping: indices back to characters
    idx_to_char = {idx:char for char,idx in char_to_idx.items()}
```
the `.` character is the special token which will serve as the end of sequence token. I mapped it to *0* as a convention but also to make it easier to mask.

### 3. Constructing the N-gram Dataset
To train the model, we use a sliding window mechanism. For each target character we want to predict, we collect the preceding *n* characters as context.
```python
    # Context window setup example
    context = [0] * context_length  # Padded context
    for ch in name + '.':
        X.append(context)
        idx = char_to_idx[ch]
        Y.append(idx)
        context = context[1:] + [idx]  # Slide window
```
for instance for a context length of 3, the dataset function generates the input-target pairs :
```
    [. . .] -> n
    [. . n] -> a
    [. n a] -> m
    [n a m] -> e
    [a m e] -> .
```