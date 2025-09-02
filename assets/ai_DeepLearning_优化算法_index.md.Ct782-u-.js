import{_ as n,c as s,o as p,ag as e}from"./chunks/framework.C2Gjomh7.js";const _=JSON.parse('{"title":"优化算法","description":"","frontmatter":{},"headers":[],"relativePath":"ai/DeepLearning/优化算法/index.md","filePath":"ai/DeepLearning/优化算法/index.md","lastUpdated":1756829839000}'),i={name:"ai/DeepLearning/优化算法/index.md"};function t(l,a,c,d,o,r){return p(),s("div",null,[...a[0]||(a[0]=[e(`<h1 id="优化算法" tabindex="-1">优化算法 <a class="header-anchor" href="#优化算法" aria-label="Permalink to &quot;优化算法&quot;">​</a></h1><p>🏷️<code>chap_optimization</code></p><p>截止到目前，本书已经使用了许多优化算法来训练深度学习模型。优化算法使我们能够继续更新模型参数，并使损失函数的值最小化。这就像在训练集上评估一样。事实上，任何满足于将优化视为黑盒装置，以在简单的设置中最小化目标函数的人，都可能会知道存在着一系列此类“咒语”（名称如“SGD”和“Adam”）。</p><p>但是，为了做得更好，还需要更深入的知识。优化算法对于深度学习非常重要。一方面，训练复杂的深度学习模型可能需要数小时、几天甚至数周。优化算法的性能直接影响模型的训练效率。另一方面，了解不同优化算法的原则及其超参数的作用将使我们能够以有针对性的方式调整超参数，以提高深度学习模型的性能。</p><p>在本章中，我们深入探讨常见的深度学习优化算法。深度学习中出现的几乎所有优化问题都是<em>非凸</em>的。尽管如此，在<em>凸问题</em>背景下设计和分析算法是非常有启发性的。正是出于这个原因，本章包括了凸优化的入门，以及凸目标函数上非常简单的随机梯度下降算法的证明。</p><div class="language-toc vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>:maxdepth: 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>optimization-intro</span></span>
<span class="line"><span>convexity</span></span>
<span class="line"><span>gd</span></span>
<span class="line"><span>sgd</span></span>
<span class="line"><span>minibatch-sgd</span></span>
<span class="line"><span>momentum</span></span>
<span class="line"><span>adagrad</span></span>
<span class="line"><span>rmsprop</span></span>
<span class="line"><span>adadelta</span></span>
<span class="line"><span>adam</span></span>
<span class="line"><span>lr-scheduler</span></span></code></pre></div>`,6)])])}const h=n(i,[["render",t]]);export{_ as __pageData,h as default};
