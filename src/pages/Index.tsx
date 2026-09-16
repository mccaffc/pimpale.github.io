import TerrainGenIntro from '../components/TerrainGenIntro';
import HomepageDemo from '../components/HomepageDemo';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Articles from '../components/Articles';
import { useMediaQuery } from 'react-responsive'
import MnistOnnxDemo from '../components/MnistOnnxDemo';
import AsideCard from '../components/AsideCard';

import ResumePdfUrl from '../assets/govind_pimpale_resume.pdf?url';

const ResumeUrl = '/resume.html';
const ProjectsUrl = '/projects.html';

import { Arrow90degDown, CaretDownFill, FileEarmarkPdf, Github, GraphUpArrow } from 'react-bootstrap-icons';

type RotatedProps = {
  rotation: number,
  distance: number,
  // when collapsed should this be its own row
  ownRow?: boolean
  children: React.ReactElement | React.ReactElement[]
}

function Rotated(props: RotatedProps) {
  if (!useMediaQuery({ minWidth: 992 })) {
    const mx = `${props.ownRow ? 20 : 1}em`;
    return <div style={{ marginLeft: mx, marginRight: mx }}>
      {props.children}
    </div>
  } else {
    const xDisplacement = Math.cos(props.rotation * (Math.PI / 180));
    let transformCss;

    if (xDisplacement < -0.1) {
      // Left
      transformCss = {
        transformOrigin: "right",
        transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(-100%, -50%)`,
      }
    } else if (xDisplacement > 0.1) {
      // Right
      transformCss = {
        transformOrigin: "left",
        transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(0%, -50%)`,
      };
    } else {
      // Center
      transformCss = {
        transformOrigin: "center",
        transform: `rotate(${props.rotation}deg) translate(${props.distance}em) rotate(${-props.rotation}deg) translate(-50%, -50%)`,
      };
    }

    const blockCss = {
      display: "block",
      position: "absolute" as const,
      top: "50%",
      left: "50%",
    };

    return <div style={{ ...transformCss, ...blockCss }}>
      {props.children}
    </div>
  }
}

type IntroCardProps = {
  title: string,
  children: React.ReactNode
}

const IntroCard: React.FunctionComponent<IntroCardProps> = props =>
  <div className="card my-3" style={{ width: "15rem" }}>
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <div className="card-text">{props.children}</div>
    </div>
  </div>


const Home = () =>
  <Layout>
    <div className="min-vh-100 d-flex justify-content-center flex-wrap mt-5">
      {/* Interactive Label */}
      <Rotated distance={12} rotation={-85} >
        <span data-nosnippet>
          <Arrow90degDown className='fs-1' style={{ transform: "translateY(0.5rem)" }} /><span className='fs-3' style={{ fontFamily: "Permanent Marker" }}> Spin Me!</span>
        </span>
      </Rotated>

      {/* The Demo itself  */}
      <Rotated distance={0} rotation={90} ownRow>
        <HomepageDemo width={400} height={400} style={{ width: "20em", height: "20em" }} />
      </Rotated>


      {/* Data */}
      {/* Right Side */}
      <Rotated distance={15} rotation={-45} >
        <IntroCard title="Research">
          <a href="#research">Exploring AI safety and capabilities forecasting</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={0} >
        <IntroCard title="Software Projects">
          <a href="#projects">Open source tools and libraries</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={45} >
        <IntroCard title="Writing">
          <a href="#articles">Articles on programming and technology</a>
        </IntroCard>
      </Rotated>
      {/* Left Side */}
      <Rotated distance={15} rotation={-45 + 180} >
        <IntroCard title="About">
          <a href="#about">About me, my background, and interests</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={0 + 180} >
        <IntroCard title="Resume">
          <a href={ResumeUrl}>View my professional experience</a>
        </IntroCard>
      </Rotated>
      <Rotated distance={15} rotation={45 + 180} >
        <IntroCard title="Contact" >
          <a href="#contact">Get in touch with me</a>
        </IntroCard>
      </Rotated>
      {/* Down button */}
      <Rotated distance={20} rotation={90} ownRow>
        <a href="#about" className="btn btn-secondary border-dark" aria-label="About"><CaretDownFill /></a>
      </Rotated>
    </div>
    <div id="content" className="container">
      <Section id="about" name="About">
        <h5>Me</h5>
        <p>
          I'm currently a research fellow at <a href="https://www.thefai.org/">Foundation for American Innovation</a>, working on AI and national security policy.
          I was previously a member of technical staff at <a href="https://hud.ai">hud.ai</a>, building a platform for AI evaluations.
          I studied Computer Science and Engineering at UCLA (class of 2025).
          In my free time, I enjoy recreational programming (especially in C).
        </p>
        <ul>
          <li><a href="https://github.com/pimpale/">Github</a></li>
          <li><a href="https://www.linkedin.com/in/govind-pimpale/">LinkedIn</a></li>
          <li><a href={ResumePdfUrl}>Resume</a></li>
        </ul>
        <h5>Projects</h5>
        <p>
          Most of my projects are licensed permissively, usually under MIT or the Unlicense. If they're not on the site,
          you can find them <a href="https://github.com/pimpale/">here</a>. You can also follow me on github to keep up to date on their development.
        </p>
        <h5>Site</h5>
        <p>
          This site was made
          using <a href="https://reactjs.org/">ReactJS</a> and <a href="https://www.typescriptlang.org/">Typescript</a>,
          with the animations in <a href="https://threejs.org/">three.js</a>.
          All content on this site is licensed under the MIT license unless otherwise specified.
          The source of this website can be found <a href="https://github.com/pimpale/pimpale.github.io">here</a>.
        </p>
      </Section>

      <Section id="research" name="Research">
        <h5>Forecasting Frontier Language Model Agent Capabilities</h5>
        <div>
          TL;DR: Developed methods for predicting language model agent capabilities on practical tasks.
          We validate our forecasting approaches by backtesting on existing models, then project that by
          early 2026, frontier LM agents could reach 87% success rate on software development benchmarks like SWE-Bench Verified.
        </div>
        <div className="d-flex justify-content-left">
          <div className='p-3'>
            <a className='btn btn-outline-dark p-2 d-flex align-items-center' href="http://arxiv.org/abs/2502.15850">
              <FileEarmarkPdf className='me-1' /> Arxiv
            </a>
          </div>
          <div className='p-3'>
            <a className='btn btn-outline-dark p-2 d-flex align-items-center' href="https://github.com/pimpale/forecasting-frontier-language-model-agent-capabilities">
              <Github className='me-1' /> Code
            </a>
          </div>
          <div className='p-3'>
            <a className='btn btn-outline-dark p-2 d-flex align-items-center' href="https://pimpale.github.io/forecasting-frontier-language-model-agent-capabilities/">
              <GraphUpArrow className='me-1' /> Interactive Forecast
            </a>
          </div>
        </div>
        <h5 className='mt-4'>Analyzing Probabilistic Methods for Evaluating Agent Capabilities</h5>
        <div>
          TL;DR: Analyzed two methods for estimating AI capabilities on difficult tasks: the milestone method
          and expert best-of-N method. Our analysis reveals both methods reduce variance but introduce bias,
          often underestimating true capabilities. Future work should build on Monte Carlo estimation literature.
        </div>
        <div className="d-flex justify-content-left">
          <div className='p-3'>
            <a className='btn btn-outline-dark p-2 d-flex align-items-center' href="http://arxiv.org/abs/2502.15850">
              <FileEarmarkPdf className='me-1' /> Arxiv
            </a>
          </div>
        </div>
      </Section>

      <Section id="projects" name="Projects">
        <p>
          I've developed a variety of open source projects, including:
        </p>
        <ul>
          <li><b><a href={`${ProjectsUrl}#browser-voxel-game`}>Browser Voxel Game</a></b>: A Minecraft-like voxel game implementation with realistic lighting and shadows</li>
          <li><b><a href={`${ProjectsUrl}#torus-weather-sim`}>Torus Weather Simulation</a></b>: A simulation of weather patterns on a torus-shaped planet</li>
          <li><b><a href={`${ProjectsUrl}#compugenesis`}>Compugenesis</a></b>: A Rust simulation using L-Systems to model plants efficiently</li>
          <li><b><a href={`${ProjectsUrl}#vulkan-voxel-renderer`}>Vulkan Voxel Renderer</a></b>: A voxel renderer built from scratch with Vulkan and C</li>
          <li><b><a href={`${ProjectsUrl}#c-opencl-raymarcher`}>OpenCL Raymarcher</a></b>: A GPU-accelerated raymarcher written in C with OpenCL</li>
          <li><b><a href={`${ProjectsUrl}#lasagna`}>Lasagna</a></b>: A minimal stack-based programming language inspired by Lisp and Forth</li>
        </ul>
        <p>
          <a href={ProjectsUrl}>See detailed project information</a>
        </p>
      </Section>
      <Articles />
      <Section id="contact" name="Contact">
        <p>Feel free to reach out to me through any of these channels:</p>
        <ul>
          <li>Email: gpimpale29 [dot] at [dot] gmail [dot] com</li>
          <li><a href="https://calendly.com/pimpale">Schedule a 30-minute meeting with me</a></li>
          <li><a href="https://github.com/pimpale/">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/govind-pimpale/">LinkedIn</a></li>
        </ul>

        <h5>Things I'd love to talk about</h5>
        <ul>
          <li>How can we forecast LLM Agent abilities</li>
          <li>Building more realistic evaluations</li>
          <li>Research collaborations</li>
          <li>Computer graphics (especially ray tracing)</li>
          <li>Theorem provers</li>
        </ul>
      </Section>
      <Section id="dotd" name="Demo of the Day">
        <AsideCard title="Classify Numbers Client Side!">
          <p className='card-text'>
            This is a demo of running an MNIST model entirely client side with onnxruntime-web.
          </p>
          <MnistOnnxDemo />
        </AsideCard>
      </Section>
    </div>
  </Layout>


import React from 'react';
import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
