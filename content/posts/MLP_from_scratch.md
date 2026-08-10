---
title: 'MLP from scratch (WIP)'
draft: false
showToc: true
math: true
---

Here I implemented a MLP from scratch where **The goal was to be able to generate fictional character names**. The full code is available in this [github repo](https://github.com/darylbdr/AI-Sandbox/blob/main/MLP/MLP_from_scratch.ipynb).

I followed the approach introduced in the [Bengio et al. 2003 MLP language model paper](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf) where the MLP architecture proposed in this paper is the following :
{{<figure src="/images/architecture.png" caption="Figure 1: the MLP architecture according to the paper">}}

It is composed of three layers :
- [The Input embedding layer](#the-input-embedding-layer)
- [The TanH layer](#the-tanh-layer)
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
for instance for a context length of 3, the dataset function generates the following input-target pairs :
```
    [. . .] -> n
    [. . n] -> a
    [. n a] -> m
    [n a m] -> e
    [a m e] -> .
```

### 4. Embedding Lookup Table
Once the context indices are prepared, each character index is mapped into a continuous vector space using an embedding matrix $$C \in \mathbb{R}^{\text{vocab-size} \times n_{\text{emb}}}$$ In PyTorch, indexing $C$ with $X$ performs a fast lookup without needing matrix multiplication with one-hot vectors.
```python
    # Embedding matrix initialization
    n_emb = 2  # Dimensionality of the character embedding space
    C = torch.randn((vocab_size, n_emb), generator=gen)

    emb = C[X]
```
<!-- #TODO add an exemple using a word -->
### 5. Concatenating Context Embdeddings
Before feeding the data to the hidden layer, the $n$ context character vectors must be concatenated into a single feature vector of dimension $n_{\text{emb}} \times \text{context-length}$. Instead of using torch.cat (which allocates new memory), we can efficiently reshape the tensor view using PyTorch's .view() method:
```python
    # Flatten context vectors: (num_samples, context_length * n_emb)
    emb_cat = emb.view(emb.shape[0], -1)
```

# The TanH layer
Once we have concatenated the context embeddings into a single vector $x \in \mathbb{R}^{n_{\text{emb}} \cdot \text{context-length}}$, we feed it into the hidden layer.

## 1. Linear Transformation & Pre-activation
The linear layer projects the input embedding vector into a higher-dimensional hidden space $n_{\text{hidden}}$: $$h_{\text{preact}} = x W_1 + b_1$$ $$Where: 
- $W_1 \in \mathbb{R}^{(n_{\text{emb}} \cdot \text{context-length}) \times n_{\text{hidden}}}$ represents the weight matrix.
- $b_1 \in \mathbb{R}^{n_{\text{hidden}}}$ is the bias vector.
 <!-- #TODO In the end the b1 value was set to null due to batch normalization https://arxiv.org/abs/1502.03167 -->

## 2. Activation function (tanH) and saturation

The pre-activation vector passes through a non-linear activation function, $\tanh$: $$h = \tanh(h_{\text{preact}})$$
The $\tanh$ function squashes input values into the range $[-1, 1]$. However, if the pre-activations $h_{\text{preact}}$ have very large positive or negative values, $\tanh$ saturates: $$\frac{d}{dx}\tanh(x) = 1 - \tanh^2(x) \approx 0 \quad \text{when } \vert{}x\vert{} \gg 0$$When activations saturate, their gradients vanish during backpropagation, stopping the network from learning effectively.
<!-- #TODO add the tanh saturation graph -->

## 3. Weight Initialization (Kaiming Init)

According to the [Kaiming init paper](https://arxiv.org/pdf/1502.01852) in order to prevent pre-activations from taking extreme values at initialization, we scale the weight matrix $W_1$. For a $\tanh$ activation, Kaiming initialization prescribes scaling standard normal weights by a gain factor divided by the square root of the fan-in (number of input units): $$\text{std} = \frac{\text{gain}}{\sqrt{\text{fan-in}}} = \frac{5/3}{\sqrt{n_{\text{emb}} \cdot \text{context-length}}}$$
{{<figure src="/images/tanh_regul.png" caption="Figure 3: the tanH graph after Kaiming init" class="full-width-figure">}}