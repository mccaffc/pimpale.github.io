import React from 'react';
import { createRoot } from 'react-dom/client';
import type { MDXContent } from 'mdx/types';
import Tex from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

import Section from '../components/Section';
import Figure from '../components/Figure';
import AsideCard from '../components/AsideCard';
import CitationManager, { Citation, CitationBank } from '../components/CitationManager';

import './fai.scss';
import lockupBlack from './brand/logos/Lockup-Black.svg';
import lockupWhite from './brand/logos/Lockup-White.svg';

const components = {
  Section, Figure, AsideCard, Citation, CitationBank, Tex,
  table: (p: any) => <div className="table-responsive"><table className="table" {...p} /></div>,
  img: (p: any) => <img className="img-fluid" {...p} />,
};

const SiteHeader = () =>
  <nav className="fai-topbar">
    <a href="https://thefai.org" aria-label="Foundation for American Innovation">
      <img src={lockupBlack} alt="Foundation for American Innovation" className="fai-topbar-logo" />
    </a>
  </nav>;

const SiteFooter = () =>
  <footer className="fai-footer">
    <div className="fai-footer-inner">
      <img src={lockupWhite} alt="Foundation for American Innovation" className="fai-footer-logo" />
      <p>Washington, DC<span className="sep">·</span><a href="https://thefai.org">thefai.org</a><span className="sep">·</span><a href="https://x.com/joinfai">@joinfai</a></p>
      <p className="fai-footer-fine">© 2026 Govind Pimpale. Interactive figures and text published by the Foundation for American Innovation.</p>
    </div>
  </footer>;

export function mountFaiArticle(Content: MDXContent, variant: 'main' | 'supplement') {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <div className={`fai-page fai-${variant}`}>
        <SiteHeader />
        <main className="fai-article">
          <CitationManager prefix="source-"><Content components={components} /></CitationManager>
        </main>
        <SiteFooter />
      </div>
    </React.StrictMode>,
  );
}
