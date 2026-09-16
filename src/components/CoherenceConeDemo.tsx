import React from 'react';

import { palette } from '../styles/palette';

/**
 * Schematic of why the superradiant spin-flip enhancement only survives in a
 * narrow forward cone, and why that matters so much.
 *
 * Top: the Galanis / Arvanitaki style detector, a sphere of polarised helium
 * inside a solenoid. A neutrino enters on the axis; the shaded wedge is the
 * range of outgoing directions along which every atom's contribution stays in
 * step. Bottom left: a magnified slice of that cone. Atoms inside it are
 * "coherent" (blue), atoms outside it contribute with effectively random
 * phase (orange). Bottom right: the coherent contributions add like arrows
 * laid end to end, the random ones wander, and the probability of the event
 * goes as the square of the net length.
 *
 * The picture is deliberately symbolic. Cone angles are exaggerated by more
 * than ten orders of magnitude so anything is visible at all, and the arrows
 * are not mapped one-to-one onto the drawn atoms.
 */

type Pt = { x: number, y: number };

const CONE_HALF_DEG_AT_1MEV = 6;   // stylised: half-angle = 6 deg / E[MeV]
const E_MIN = 1;
const E_MAX = 10;
const INSET_CENTER_X = 0.35;       // inset square centre, units of R, on the beam axis
const INSET_HALF = 0.2;            // inset half-side, units of R
const PHASOR_COUNT = 24;           // arrows in the bottom-right chain

/** Small deterministic PRNG so the layout is stable across renders. */
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const apexDistance = (x: number) => x + 1;   // apex is the sphere's left edge, x = -1
const coneHalfAt = (x: number, halfRad: number) => apexDistance(x) * Math.tan(halfRad);
const MAX_HALF_RAD = CONE_HALF_DEG_AT_1MEV * Math.PI / 180;

const ZOOM_X0 = INSET_CENTER_X - INSET_HALF;
const ZOOM_X1 = INSET_CENTER_X + INSET_HALF;

/**
 * Clumpy atoms filling the widest cone slice shown in the zoom. Coordinates
 * are in units of R, y up. Clusters of a few atoms around seeded centres,
 * plus a sprinkling of loners.
 */
const ZOOM_ATOMS: readonly Pt[] = (() => {
  const rand = mulberry32(11);
  const inside = (p: Pt) =>
    p.x >= ZOOM_X0 && p.x <= ZOOM_X1 && Math.abs(p.y) <= coneHalfAt(p.x, MAX_HALF_RAD);
  const out: Pt[] = [];
  const gauss = () => {
    const u = Math.max(rand(), 1e-9), v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  for (let c = 0; c < 22; c++) {
    const centre = { x: ZOOM_X0 + rand() * (ZOOM_X1 - ZOOM_X0), y: (rand() * 2 - 1) * 0.16 };
    const n = 3 + Math.floor(rand() * 5);
    for (let k = 0; k < n; k++) {
      const p = { x: centre.x + gauss() * 0.02, y: centre.y + gauss() * 0.014 };
      if (inside(p)) out.push(p);
    }
  }
  for (let k = 0; k < 40; k++) {
    const p = { x: ZOOM_X0 + rand() * (ZOOM_X1 - ZOOM_X0), y: (rand() * 2 - 1) * 0.17 };
    if (inside(p)) out.push(p);
  }
  return out;
})();

/** Directions for the random (incoherent) phasors, fixed so the chain is stable. */
const RANDOM_PHASES: readonly number[] = (() => {
  const rand = mulberry32(5);
  return Array.from({ length: PHASOR_COUNT }, () => rand() * 2 * Math.PI);
})();

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};

/** Linear blend between two palette hex colours, t = 0 gives a, t = 1 gives b. */
const mix = (a: string, b: string, t: number) => {
  const [ar, ag, ab] = hexToRgb(a), [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t), g = Math.round(ag + (bg - ag) * t), bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
};

/** 1 inside the cone, 0 well outside, with a soft edge just past the boundary. */
const coherence = (angle: number, halfRad: number) => 1 / (1 + (angle / (1.15 * halfRad)) ** 10);

type CoherenceConeDemoProps = {
  initialEnergyMeV?: number,
  caption?: React.ReactNode,
};

const CoherenceConeDemo: React.FunctionComponent<CoherenceConeDemoProps> = ({
  initialEnergyMeV = 3,
  caption,
}) => {
  const [energyMeV, setEnergyMeV] = React.useState(initialEnergyMeV);

  const containerRef = React.useRef<HTMLDivElement>(null);
  // Start narrow and grow into the container (see NeutrinoRangePlot).
  const [width, setWidth] = React.useState(320);
  const uid = React.useId();
  const clipId = `ccd-clip-${uid}`;
  const fadeId = `ccd-fade-${uid}`;
  const arrowInId = `ccd-arrow-in-${uid}`;
  const arrowBlueId = `ccd-arrow-blue-${uid}`;
  const arrowOrangeId = `ccd-arrow-orange-${uid}`;

  React.useEffect(() => {
    const el = containerRef.current;
    if (el === null) return;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ---- model ---- */
  const coneHalf = MAX_HALF_RAD * E_MIN / energyMeV;   // rad
  const coherences = ZOOM_ATOMS.map(p => coherence(Math.atan2(p.y, apexDistance(p.x)), coneHalf));
  const coherentShare = coherences.reduce((s, c) => s + c, 0) / ZOOM_ATOMS.length;
  const alignedCount = Math.round(PHASOR_COUNT * coherentShare);

  /* ---- layout ---- */
  const isNarrow = width < 480;
  const fontSize = isNarrow ? 9.5 : 11;
  const R = Math.min(width * 0.2, 120);
  const topPad = 30;
  const cx = width * 0.5;
  const cy = topPad + R;
  const gap = 36;
  const Z = Math.min(width * 0.42, 240);
  const zoomX = width * 0.04;
  const zoomY = cy + R + gap;
  const graphX = width * 0.52;
  const graphW = width * 0.44;
  const graphY = zoomY;
  const graphH = Z;
  const legendY = zoomY + Z + 18;
  const legendSecondX = isNarrow ? zoomX : zoomX + Z * 0.55;
  const legendSecondY = isNarrow ? legendY + 15 : legendY;
  const height = legendSecondY + 10;

  // sphere coordinates (units of R, y up) -> svg
  const sx = (x: number) => cx + x * R;
  const sy = (y: number) => cy - y * R;

  const apex = { x: sx(-1), y: sy(0) };
  const coneLen = 2.4 * R;
  const conePoly = [
    apex,
    { x: apex.x + coneLen * Math.cos(coneHalf), y: apex.y - coneLen * Math.sin(coneHalf) },
    { x: apex.x + coneLen * Math.cos(coneHalf), y: apex.y + coneLen * Math.sin(coneHalf) },
  ].map(p => `${p.x},${p.y}`).join(' ');

  // solenoid rings around the sphere
  const ringCount = 7;
  const ringRx = R + 9;
  const ringRy = Math.max(4, R * 0.07);
  const ringYs = Array.from({ length: ringCount }, (_, i) => cy - 0.85 * R + i * (1.7 * R / (ringCount - 1)));

  // inset square in svg
  const insetX = sx(ZOOM_X0);
  const insetY = sy(INSET_HALF);
  const insetSide = 2 * INSET_HALF * R;

  // zoom mapping: the inset's 0.4 R square maps onto a Z x Z region
  const zoomScale = Z / (2 * INSET_HALF);
  const zx = (x: number) => zoomX + (x - ZOOM_X0) * zoomScale;
  const zy = (y: number) => zoomY + (INSET_HALF - y) * zoomScale;
  const trapezoid = (halfRad: number) => [
    { x: ZOOM_X0, y: coneHalfAt(ZOOM_X0, halfRad) },
    { x: ZOOM_X1, y: coneHalfAt(ZOOM_X1, halfRad) },
    { x: ZOOM_X1, y: -coneHalfAt(ZOOM_X1, halfRad) },
    { x: ZOOM_X0, y: -coneHalfAt(ZOOM_X0, halfRad) },
  ].map(p => `${zx(p.x)},${zy(p.y)}`).join(' ');
  const outerTrapezoid = trapezoid(MAX_HALF_RAD);
  const innerTrapezoid = trapezoid(coneHalf);
  const outerTopLeft = { x: zx(ZOOM_X0), y: zy(coneHalfAt(ZOOM_X0, MAX_HALF_RAD)) };
  const outerTopRight = { x: zx(ZOOM_X1), y: zy(coneHalfAt(ZOOM_X1, MAX_HALF_RAD)) };
  const dotR = Math.max(1.6, Z * 0.011);
  // fade the near and far ends of the slice instead of drawing edges
  const endFade = (x: number) => {
    const t = (x - ZOOM_X0) / (ZOOM_X1 - ZOOM_X0);
    return Math.min(1, Math.min(t, 1 - t) / 0.18);
  };

  /* ---- probability graph ---- */
  const gPad = { left: 30, right: 12, top: 26, bottom: 8 };
  const chainAreaH = Math.min(78, graphH * 0.36);
  const plotX0 = graphX + gPad.left;
  const plotW = graphW - gPad.left - gPad.right;
  const axisY = graphY + graphH - gPad.bottom - chainAreaH;
  const plotH = axisY - graphY - gPad.top;
  const arrowLen = plotW / PHASOR_COUNT;
  const chain = React.useMemo(() => {
    const pts: Pt[] = [{ x: 0, y: 0 }];
    let x = 0, y = 0;
    for (let i = 0; i < PHASOR_COUNT; i++) {
      let angle = i < alignedCount ? 0 : RANDOM_PHASES[i];
      // keep the random walk inside the strip under the axis
      const limit = chainAreaH / 2 - 8;
      if (Math.abs(y + arrowLen * Math.sin(angle)) > limit) angle = -angle;
      x += arrowLen * Math.cos(angle);
      y += arrowLen * Math.sin(angle);
      pts.push({ x, y });
    }
    return pts;
  }, [alignedCount, arrowLen, chainAreaH]);
  const chainOrigin = { x: plotX0, y: axisY + chainAreaH / 2 + 4 };
  const chainEnd = chain[chain.length - 1];
  const netX = Math.max(0, Math.min(plotW, chainEnd.x));
  const probability = (netX / plotW) ** 2;
  const curveY = (x: number) => axisY - (x / plotW) ** 2 * plotH;
  const parabola = Array.from({ length: 41 }, (_, i) => {
    const x = plotW * i / 40;
    return `${plotX0 + x},${curveY(x)}`;
  }).join(' ');
  const markX = plotX0 + netX;
  const markY = curveY(netX);

  const labelColor = palette.fg1;
  const mutedColor = palette.fg2;
  const frameColor = palette.gray;
  const coilColor = palette.yellow;
  const coherentColor = palette.blue;
  const randomColor = palette.orange;

  return <figure className="d-block my-4 mx-auto" style={{ maxWidth: 'min(100%, 45rem)' }}>
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: 'block', maxWidth: '100%' }}
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx={cx} cy={cy} r={R} />
          </clipPath>
          <linearGradient id={fadeId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={palette.bg0h} stopOpacity={0} />
            <stop offset="0.18" stopColor={palette.bg0h} stopOpacity={1} />
            <stop offset="0.82" stopColor={palette.bg0h} stopOpacity={1} />
            <stop offset="1" stopColor={palette.bg0h} stopOpacity={0} />
          </linearGradient>
          {[[arrowInId, labelColor], [arrowBlueId, coherentColor], [arrowOrangeId, randomColor]].map(([id, color]) =>
            <marker
              key={id} id={id}
              viewBox="0 0 10 10" refX={9} refY={5}
              markerWidth={5} markerHeight={5} orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>)}
        </defs>

        {/* ---- detector: solenoid (back halves), sphere, cone, solenoid (front halves) ---- */}
        {ringYs.map((y, i) =>
          <path
            key={`b${i}`}
            d={`M ${cx - ringRx} ${y} A ${ringRx} ${ringRy} 0 0 1 ${cx + ringRx} ${y}`}
            fill="none" stroke={coilColor} strokeWidth={1} strokeDasharray="3 3" opacity={0.6}
          />)}
        <circle cx={cx} cy={cy} r={R} fill={palette.bg0h} stroke={frameColor} strokeWidth={1} />
        <g clipPath={`url(#${clipId})`}>
          <polygon points={conePoly} fill={palette.green} opacity={0.22} />
          <polygon points={conePoly} fill="none" stroke={palette.green} strokeWidth={1} opacity={0.8} />
          {/* neutrino wave spreading from the impact point */}
          {[0.07, 0.14, 0.21, 0.28].map((r, i) =>
            <circle
              key={i} cx={apex.x} cy={apex.y} r={r * R}
              fill="none" stroke={labelColor} strokeWidth={1} opacity={0.7 - i * 0.15}
            />)}
        </g>
        {ringYs.map((y, i) =>
          <path
            key={`f${i}`}
            d={`M ${cx - ringRx} ${y} A ${ringRx} ${ringRy} 0 0 0 ${cx + ringRx} ${y}`}
            fill="none" stroke={coilColor} strokeWidth={1.25} opacity={0.9}
          />)}
        <text
          x={cx + ringRx + 6} y={cy + R * 0.95}
          fontSize={fontSize} fill={coilColor}
        >solenoid</text>
        <text
          x={cx} y={cy + R * 0.72}
          fontSize={fontSize} fill={mutedColor} textAnchor="middle"
          paintOrder="stroke" stroke={palette.bg0h} strokeWidth={3}
        >polarized ³He</text>

        {/* incoming neutrino */}
        <line
          x1={Math.max(4, apex.x - 1.2 * R)} y1={apex.y} x2={apex.x - 3} y2={apex.y}
          stroke={labelColor} strokeWidth={1.5} markerEnd={`url(#${arrowInId})`}
        />
        <text
          x={Math.max(4, apex.x - 1.2 * R)} y={apex.y - 7}
          fontSize={fontSize} fill={labelColor}
        >ν in</text>

        {/* cone label */}
        <text
          x={cx} y={topPad - 12}
          fontSize={fontSize} fill={palette.green} textAnchor="middle"
        >coherent cone ±{(coneHalf * 180 / Math.PI).toFixed(1)}°</text>

        {/* inset square and callout lines */}
        <rect
          x={insetX} y={insetY} width={insetSide} height={insetSide}
          fill="none" stroke={labelColor} strokeWidth={1}
        />
        <line
          x1={insetX} y1={insetY + insetSide} x2={outerTopLeft.x} y2={outerTopLeft.y}
          stroke={labelColor} strokeWidth={0.75} strokeDasharray="3 3"
        />
        <line
          x1={insetX + insetSide} y1={insetY + insetSide} x2={outerTopRight.x} y2={outerTopRight.y}
          stroke={labelColor} strokeWidth={0.75} strokeDasharray="3 3"
        />

        {/* ---- zoom: a slice of the cone ---- */}
        <polygon points={outerTrapezoid} fill={`url(#${fadeId})`} />
        <polygon points={innerTrapezoid} fill={palette.green} opacity={0.12} />
        <polygon points={innerTrapezoid} fill="none" stroke={palette.green} strokeWidth={1} opacity={0.7} />
        {ZOOM_ATOMS.map((p, i) => {
          const c = coherences[i];
          return <circle
            key={i} cx={zx(p.x)} cy={zy(p.y)} r={dotR}
            fill={mix(randomColor, coherentColor, c)} opacity={0.35 + 0.65 * endFade(p.x)}
          />;
        })}

        {/* legend under the zoom */}
        <circle cx={zoomX + 5} cy={legendY - 3} r={3.5} fill={coherentColor} />
        <text x={zoomX + 12} y={legendY} fontSize={fontSize} fill={labelColor}>
          in step with the wave
        </text>
        <circle cx={legendSecondX + 5} cy={legendSecondY - 3} r={3.5} fill={randomColor} />
        <text x={legendSecondX + 12} y={legendSecondY} fontSize={fontSize} fill={labelColor}>
          effectively random
        </text>

        {/* ---- probability graph ---- */}
        <line x1={plotX0} y1={graphY + gPad.top - 8} x2={plotX0} y2={axisY} stroke={labelColor} strokeWidth={1} />
        <line x1={plotX0} y1={axisY} x2={plotX0 + plotW + 6} y2={axisY} stroke={labelColor} strokeWidth={1} />
        <text
          x={plotX0 - 6} y={graphY + gPad.top - 10}
          fontSize={fontSize} fill={labelColor}
        >probability</text>
        <text
          x={plotX0 + plotW + 6} y={axisY + 12}
          fontSize={fontSize} fill={labelColor} textAnchor="end"
        >net amplitude</text>
        <polyline points={parabola} fill="none" stroke={labelColor} strokeWidth={1.5} />
        <line x1={markX} y1={chainOrigin.y + chainEnd.y} x2={markX} y2={markY} stroke={palette.red} strokeWidth={1.5} />
        <line x1={plotX0} y1={markY} x2={markX} y2={markY} stroke={palette.aqua} strokeWidth={1.5} />
        <text
          x={plotX0 + 4} y={markY < graphY + gPad.top + 4 ? markY + 12 : markY - 4}
          fontSize={fontSize} fill={palette.aqua}
          paintOrder="stroke" stroke={palette.bg0} strokeWidth={3}
        >{(probability * 100).toFixed(probability < 0.1 ? 1 : 0)}% of max</text>

        {/* phasor chain below the axis */}
        {chain.slice(1).map((p, i) => {
          const from = chain[i];
          const aligned = i < alignedCount;
          return <line
            key={i}
            x1={chainOrigin.x + from.x} y1={chainOrigin.y + from.y}
            x2={chainOrigin.x + p.x} y2={chainOrigin.y + p.y}
            stroke={aligned ? coherentColor : randomColor} strokeWidth={1.5}
            markerEnd={`url(#${aligned ? arrowBlueId : arrowOrangeId})`}
          />;
        })}
      </svg>
    </div>

    {/* controls */}
    <div className="d-flex flex-wrap align-items-center gap-3 mt-1" style={{ fontSize: '0.8rem' }}>
      <label className="d-flex align-items-center gap-2 m-0" style={{ flex: '1 1 13rem' }}>
        <span style={{ color: mutedColor, whiteSpace: 'nowrap' }}>
          neutrino energy {energyMeV.toFixed(1)} MeV
        </span>
        <input
          type="range"
          className="form-range"
          min={E_MIN} max={E_MAX} step={0.5}
          value={energyMeV}
          onChange={e => setEnergyMeV(Number(e.target.value))}
          style={{ flex: 1 }}
        />
      </label>
    </div>

    {caption
      ? <figcaption className="figure-caption mt-2"><i>{caption}</i></figcaption>
      : null}
  </figure>;
};

export default CoherenceConeDemo;
