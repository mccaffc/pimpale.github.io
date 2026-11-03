import React from 'react';
import Hero from '../components/NeutrinoSubmarineHero';
import RangePlot from '../components/NeutrinoRangePlot';
import Cone from '../components/CoherenceConeDemo';

const panel = (C: React.ComponentType<any>) => (props: any) =>
  <div className="fai-chart-panel"><C {...props} /></div>;

export const NeutrinoRangePlot = panel(RangePlot);
export const CoherenceConeDemo = panel(Cone);

export const NeutrinoSubmarineHero = () =>
  <header className="fai-hero">
    <div className="fai-hero-inner">
      <div className="fai-hero-text">
        <p className="fai-hero-label">Research</p>
        <h1 className="fai-display">Can Neutrinos Reveal the Positions of Nuclear Submarines?</h1>
        <p className="fai-hero-byline">
          Govind Pimpale<span className="sep">·</span>Research Fellow, Foundation for American Innovation
        </p>
      </div>
      <div className="fai-hero-art"><Hero /></div>
    </div>
  </header>;
