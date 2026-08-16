import{_ as n,o as s,c as e,a3 as p}from"./chunks/framework.D81Tvp8W.js";const g=JSON.parse('{"title":"计算机视觉","description":"","frontmatter":{"title":"计算机视觉","date":"2025-09-02T00:00:00.000Z","categories":["ai","DeepLearning","计算机视觉"],"tags":["AI","深度学习","d2l","DeepLearning"]},"headers":[],"relativePath":"ai/DeepLearning/计算机视觉/index.md","filePath":"ai/DeepLearning/计算机视觉/index.md","lastUpdated":1786872962000}'),t={name:"ai/DeepLearning/计算机视觉/index.md"};function i(l,a,c,o,r,d){return s(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="计算机视觉" tabindex="-1">计算机视觉 <a class="header-anchor" href="#计算机视觉" aria-label="Permalink to &quot;计算机视觉&quot;">​</a></h1><p></p><p>近年来，深度学习一直是提高计算机视觉系统性能的变革力量。 无论是医疗诊断、自动驾驶，还是智能滤波器、摄像头监控，许多计算机视觉领域的应用都与我们当前和未来的生活密切相关。 可以说，最先进的计算机视觉应用与深度学习几乎是不可分割的。 有鉴于此，本章将重点介绍计算机视觉领域，并探讨最近在学术界和行业中具有影响力的方法和应用。</p><p>在 <a href="/MyBlog/ai/DeepLearning/卷积神经网络/index.html">卷积神经网络</a>和 <a href="/MyBlog/ai/DeepLearning/现代卷积神经网络/index.html">现代卷积神经网络</a>中，我们研究了计算机视觉中常用的各种卷积神经网络，并将它们应用到简单的图像分类任务中。 本章开头，我们将介绍两种可以改进模型泛化的方法，即<em>图像增广</em>和<em>微调</em>，并将它们应用于图像分类。 由于深度神经网络可以有效地表示多个层次的图像，因此这种分层表示已成功用于各种计算机视觉任务，例如<em>目标检测</em>（object detection）、<em>语义分割</em>（semantic segmentation）和<em>样式迁移</em>（style transfer）。 秉承计算机视觉中利用分层表示的关键思想，我们将从物体检测的主要组件和技术开始，继而展示如何使用<em>完全卷积网络</em>对图像进行语义分割，然后我们将解释如何使用样式迁移技术来生成像本书封面一样的图像。 最后在结束本章时，我们将本章和前几章的知识应用于两个流行的计算机视觉基准数据集。</p><div class="language-toc vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toc</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>image-augmentation</span></span>
<span class="line"><span>fine-tuning</span></span>
<span class="line"><span>bounding-box</span></span>
<span class="line"><span>anchor</span></span>
<span class="line"><span>multiscale-object-detection</span></span>
<span class="line"><span>object-detection-dataset</span></span>
<span class="line"><span>ssd</span></span>
<span class="line"><span>rcnn</span></span>
<span class="line"><span>semantic-segmentation-and-dataset</span></span>
<span class="line"><span>transposed-conv</span></span>
<span class="line"><span>fcn</span></span>
<span class="line"><span>neural-style</span></span>
<span class="line"><span>kaggle-cifar10</span></span>
<span class="line"><span>kaggle-dog</span></span></code></pre></div>`,5)])])}const _=n(t,[["render",i]]);export{g as __pageData,_ as default};
