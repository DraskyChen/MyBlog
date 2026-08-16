import{_ as n,o as e,c as s,a3 as p}from"./chunks/framework.D81Tvp8W.js";const _=JSON.parse('{"title":"多层感知机","description":"","frontmatter":{"title":"多层感知机","date":"2025-09-02T00:00:00.000Z","categories":["ai","DeepLearning","多层感知机"],"tags":["AI","深度学习","d2l","DeepLearning"]},"headers":[],"relativePath":"ai/DeepLearning/多层感知机/index.md","filePath":"ai/DeepLearning/多层感知机/index.md","lastUpdated":1786872962000}'),i={name:"ai/DeepLearning/多层感知机/index.md"};function t(l,a,c,r,o,d){return e(),s("div",null,[...a[0]||(a[0]=[p(`<h1 id="多层感知机" tabindex="-1">多层感知机 <a class="header-anchor" href="#多层感知机" aria-label="Permalink to &quot;多层感知机&quot;">​</a></h1><p></p><p>在本章中，我们将第一次介绍真正的<em>深度</em>网络。 最简单的深度网络称为<em>多层感知机</em>。多层感知机由多层神经元组成， 每一层与它的上一层相连，从中接收输入； 同时每一层也与它的下一层相连，影响当前层的神经元。 当我们训练容量较大的模型时，我们面临着<em>过拟合</em>的风险。 因此，本章将从基本的概念介绍开始讲起，包括<em>过拟合</em>、<em>欠拟合</em>和模型选择。 为了解决这些问题，本章将介绍<em>权重衰减</em>和<em>暂退法</em>等正则化技术。 我们还将讨论数值稳定性和参数初始化相关的问题， 这些问题是成功训练深度网络的关键。 在本章的最后，我们将把所介绍的内容应用到一个真实的案例：房价预测。 关于模型计算性能、可伸缩性和效率相关的问题，我们将放在后面的章节中讨论。</p><div class="language-toc vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>mlp</span></span>
<span class="line"><span>mlp-scratch</span></span>
<span class="line"><span>mlp-concise</span></span>
<span class="line"><span>underfit-overfit</span></span>
<span class="line"><span>weight-decay</span></span>
<span class="line"><span>dropout</span></span>
<span class="line"><span>backprop</span></span>
<span class="line"><span>numerical-stability-and-init</span></span>
<span class="line"><span>environment</span></span>
<span class="line"><span>kaggle-house-price</span></span></code></pre></div>`,4)])])}const g=n(i,[["render",t]]);export{_ as __pageData,g as default};
