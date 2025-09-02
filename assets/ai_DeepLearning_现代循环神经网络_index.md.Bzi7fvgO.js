import{_ as n,c as s,o as e,ag as p}from"./chunks/framework.C2Gjomh7.js";const _=JSON.parse('{"title":"现代循环神经网络","description":"","frontmatter":{},"headers":[],"relativePath":"ai/DeepLearning/现代循环神经网络/index.md","filePath":"ai/DeepLearning/现代循环神经网络/index.md","lastUpdated":1756829839000}'),t={name:"ai/DeepLearning/现代循环神经网络/index.md"};function i(r,a,c,l,o,d){return e(),s("div",null,[...a[0]||(a[0]=[p(`<h1 id="现代循环神经网络" tabindex="-1">现代循环神经网络 <a class="header-anchor" href="#现代循环神经网络" aria-label="Permalink to &quot;现代循环神经网络&quot;">​</a></h1><p>🏷️<code>chap_modern_rnn</code></p><p>前一章中我们介绍了循环神经网络的基础知识， 这种网络可以更好地处理序列数据。 我们在文本数据上实现了基于循环神经网络的语言模型， 但是对于当今各种各样的序列学习问题，这些技术可能并不够用。</p><p>例如，循环神经网络在实践中一个常见问题是数值不稳定性。 尽管我们已经应用了梯度裁剪等技巧来缓解这个问题， 但是仍需要通过设计更复杂的序列模型来进一步处理它。 具体来说，我们将引入两个广泛使用的网络， 即<em>门控循环单元</em>（gated recurrent units，GRU）和 <em>长短期记忆网络</em>（long short-term memory，LSTM）。 然后，我们将基于一个单向隐藏层来扩展循环神经网络架构。 我们将描述具有多个隐藏层的深层架构， 并讨论基于前向和后向循环计算的双向设计。 现代循环网络经常采用这种扩展。 在解释这些循环神经网络的变体时， 我们将继续考虑 :numref:<code>chap_rnn</code>中的语言建模问题。</p><p>事实上，语言建模只揭示了序列学习能力的冰山一角。 在各种序列学习问题中，如自动语音识别、文本到语音转换和机器翻译， 输入和输出都是任意长度的序列。 为了阐述如何拟合这种类型的数据， 我们将以机器翻译为例介绍基于循环神经网络的 “编码器－解码器”架构和束搜索，并用它们来生成序列。</p><div class="language-toc vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>:maxdepth: 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>gru</span></span>
<span class="line"><span>lstm</span></span>
<span class="line"><span>deep-rnn</span></span>
<span class="line"><span>bi-rnn</span></span>
<span class="line"><span>machine-translation-and-dataset</span></span>
<span class="line"><span>encoder-decoder</span></span>
<span class="line"><span>seq2seq</span></span>
<span class="line"><span>beam-search</span></span></code></pre></div>`,6)])])}const h=n(t,[["render",i]]);export{_ as __pageData,h as default};
