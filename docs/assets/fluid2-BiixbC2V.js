import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import"./modulepreload-polyfill-P2Xu9kJm.js";import{n as t,r as n,t as r}from"./client-DyL1ZotQ.js";import{n as i,r as a,t as o}from"./ArticleLayout-Chegvux2.js";import{t as s}from"./Section-CMotTF6f.js";import{t as c}from"./HrefLink-DD7POFgk.js";import{t as l}from"./react-katex.m-BGEMX3OG.js";import{t as u}from"./AsideCard-CeAOR7pj.js";import{r as d,t as f}from"./Articles-Dxw5nSDo.js";import{d as p,i as m,l as h,n as g,s as _,t as v}from"./webgl-C5zzwcd9.js";import{t as y}from"./math-CE2mtAM0.js";import{t as b}from"./visibility-haYGA_fr.js";import{t as x}from"./noise-BiwXzFYx.js";import{t as S}from"./canvas-D1zRnp_a.js";import{t as C}from"./arrow-90deg-down-Cs4VSGHB.js";import{t as w}from"./bootstrap-sMF1ce4T.js";var T=e(n()),E=t(),D=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,O=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float textureGood(sampler2D sam, vec2 uv) {
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    float a = texture(sam, (iuv+vec2(0.5,0.5))/res).r;
    float b = texture(sam, (iuv+vec2(1.5,0.5))/res).r;
    float c = texture(sam, (iuv+vec2(0.5,1.5))/res).r;
    float d = texture(sam, (iuv+vec2(1.5,1.5))/res).r;

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  // get the floatwise velocity
  vec2 vel = texture(u_vel_tex, v_texCoord).xy;

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, v_texCoord-vel);

  value = vec4(val, 0.0, 0.0, 0.0);
}
`,k=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;

const float ARROW_TILE_SIZE = 16.0;

// Computes the center pixel of the tile containing pixel pos
vec2 arrowTileCenterCoord(vec2 pos) {
	return (floor(pos / ARROW_TILE_SIZE) + 0.5) * ARROW_TILE_SIZE;
}

// Computes the signed distance from a line segment
float line(vec2 p, vec2 p1, vec2 p2) {
  vec2 center = (p1 + p2) * 0.5;
  float len = length(p2 - p1);
  vec2 dir = (p2 - p1) / len;
  vec2 rel_p = p - center;
  float dist1 = abs(dot(rel_p, vec2(dir.y, -dir.x)));
  float dist2 = abs(dot(rel_p, dir)) - 0.5*len;
  return max(dist1, dist2);
}

// v = field sampled at arrowTileCenterCoord(p), scaled by the length
// desired in pixels for arrows
// Returns a signed distance from the arrow
float arrow(vec2 p, vec2 v) {
  // Make everything relative to the center, which may be fractional
  p -= arrowTileCenterCoord(p);
    
  float mag_v = length(v), mag_p = length(p);
  
  if (mag_v > 0.0) {
    // Non-zero velocity case
    vec2 dir_v = v / mag_v;
    
    // We can't draw arrows larger than the tile radius, so clamp magnitude.
    // Enforce a minimum length to help see direction
    mag_v = clamp(mag_v, 5.0, ARROW_TILE_SIZE * 0.5);

    // Arrow tip location
    v = dir_v * mag_v;

    // Signed distance from shaft
    float shaft = line(p, v, -v);
    // Signed distance from head
    float head = min(line(p, v, 0.4*v + 0.2*vec2(-v.y, v.x)),
                     line(p, v, 0.4*v + 0.2*vec2(v.y, -v.x)));

    return min(shaft, head);
  } else {
    // Signed distance from the center point
    return mag_p;
  }
}

vec3 inferno(float t) {
    const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
    const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
    const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
    const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
    const vec3 c4 = vec3(77.162935699427, -33.40235894210092, -81.80730925738993);
    const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
    const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

void main() {
  // both textures are the same size
  vec2 resolution = vec2(textureSize(u_scalar_tex, 0));

  // coordinate in pixels
  vec2 pxCoord = v_texCoord*resolution;

  vec2 tileCenterCoord = arrowTileCenterCoord(pxCoord);

  vec2 vel_vec = texture(u_vel_tex, tileCenterCoord/resolution).xy;

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = texture(u_scalar_tex, v_texCoord).x;
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,A=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// old normalized mouse position
uniform vec2 u_old_mouse;
// new normalized mouse position
uniform vec2 u_new_mouse;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

void main() {
  // the direction to paint in
  vec2 paintDir = (u_new_mouse - u_old_mouse)*0.001;

  float dist = sdSegment(v_texCoord, u_old_mouse, u_new_mouse);

  if(dist < 0.03) {
    value = texture(u_vel_tex, v_texCoord) + vec4(paintDir, 0.0, 0.0);
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`,j=class extends T.Component{constructor(e){super(e),this.canvas=T.createRef(),this.range=T.createRef(),this.scalarSelect=T.createRef(),this.velocitySelect=T.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),!this.vis.isVisible()&&this.props.runInBackground!==!0)return;let e=this.cmt.mousePos;if(e){let t=this.props.size;this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,y(e.previous.x,0,t)/t,y(t-e.previous.y,0,t)/t),this.gl.uniform2f(this.newMouseLoc,y(e.current.x,0,t)/t,y(t-e.current.y,0,t)/t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}if(this.needsScalarReset){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);let e=parseInt(this.scalarSelect.current?.value),t=new Float32Array(this.props.size*this.props.size);for(let n=0;n<this.props.size;n++){let r=Math.floor(n/(this.props.size/e))%2;for(let i=0;i<this.props.size;i++)Math.floor(i/(this.props.size/e))%2+r==1?t[n*this.props.size+i]=1:t[n*this.props.size+i]=0}h(this.gl,0,0,this.props.size,this.props.size,t),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let e;switch(this.velocitySelect.current?.value){case`curlnoise`:e=x(3,this.props.size,this.props.size,Math.random()*500);break;default:e=new Float32Array(this.props.size*this.props.size*2)}p(this.gl,0,0,this.props.size,this.props.size,e),this.needsVelocityReset=!1}this.gl.useProgram(this.prog_advect_scalar);for(let e=0;e<this.range.current.valueAsNumber;e++){let e=this.scalarTextures[this.scalarIndex],t=this.scalarFramebuffers[(this.scalarIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2}this.gl.useProgram(this.prog_render),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}componentDidMount(){this.gl=this.canvas.current.getContext(`webgl2`),this.gl.getExtension(`EXT_color_buffer_float`);let e=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_advect_scalar=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,D),_(this.gl,this.gl.FRAGMENT_SHADER,O)]);let e=this.gl.getAttribLocation(this.prog_advect_scalar,`a_position`),t=this.gl.getUniformLocation(this.prog_advect_scalar,`u_scalar_tex`),n=this.gl.getUniformLocation(this.prog_advect_scalar,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0);for(let e=0;e<2;e++){let e=g(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size));this.scalarTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.scalarFramebuffers.push(t)}for(let e=0;e<2;e++){new Int32Array(this.props.size*this.props.size*2);let e=m(this.gl,this.props.size,this.props.size,new Float32Array(this.props.size*this.props.size*2));this.velTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.velFramebuffers.push(t)}this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(t,0),this.gl.uniform1i(n,1)}{this.prog_render=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,D),_(this.gl,this.gl.FRAGMENT_SHADER,k)]);let e=this.gl.getAttribLocation(this.prog_render,`a_position`),t=this.gl.getUniformLocation(this.prog_render,`u_scalar_tex`),n=this.gl.getUniformLocation(this.prog_render,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(t,0),this.gl.uniform1i(n,1)}{this.prog_paint_vel=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,D),_(this.gl,this.gl.FRAGMENT_SHADER,A)]);let e=this.gl.getAttribLocation(this.prog_paint_vel,`a_position`),t=this.gl.getUniformLocation(this.prog_paint_vel,`u_vel_tex`);this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,`u_new_mouse`),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,`u_old_mouse`),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(t,1)}this.cmt=new S(this.canvas.current),this.vis=new b(this.canvas.current),this.animationLoop()}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.cmt.cleanup(),this.vis.cleanup()}render(){return(0,E.jsx)(`div`,{style:this.props.style,className:this.props.className,children:(0,E.jsxs)(`div`,{className:`row`,children:[(0,E.jsxs)(`div`,{className:`col-md-8 d-flex`,children:[(0,E.jsxs)(`div`,{className:`text-center pb-3`,hidden:!this.props.showInstructions,children:[(0,E.jsx)(C,{className:`fs-3`,style:{transform:`translateY(0.5rem)`}}),(0,E.jsx)(`span`,{className:`fs-5`,style:{fontFamily:`Permanent Marker`},children:` Drag to Stir!`})]}),(0,E.jsx)(`canvas`,{className:`border border-dark`,ref:this.canvas,height:this.props.size,width:this.props.size})]}),(0,E.jsx)(`div`,{className:`col-md-4`,children:(0,E.jsxs)(`div`,{className:`border border-dark p-3 m-3`,children:[(0,E.jsx)(`h6`,{children:`Controls`}),(0,E.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,E.jsx)(`label`,{className:`form-label`,children:`Simulation Speed`}),(0,E.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`5`,step:1,defaultValue:1,ref:this.range})]}),(0,E.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,E.jsx)(`label`,{className:`form-label`,children:`Scalar Field`}),(0,E.jsxs)(`select`,{className:`form-select mb-3`,defaultValue:8,ref:this.scalarSelect,children:[(0,E.jsx)(`option`,{value:1,children:`Empty`}),(0,E.jsx)(`option`,{value:2,children:`Grid 2`}),(0,E.jsx)(`option`,{value:8,children:`Grid 8`}),(0,E.jsx)(`option`,{value:64,children:`Grid 64`})]}),(0,E.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>this.needsScalarReset=!0,children:`Reset Scalar`})]}),(0,E.jsxs)(`div`,{className:`form-group`,children:[(0,E.jsx)(`label`,{className:`form-label`,children:`Velocity Field`}),(0,E.jsxs)(`select`,{className:`form-select mb-3`,defaultValue:8,ref:this.velocitySelect,children:[(0,E.jsx)(`option`,{value:`empty`,children:`Empty`}),(0,E.jsx)(`option`,{value:`curlnoise`,children:`Curl Noise`})]}),(0,E.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>this.needsVelocityReset=!0,children:`Reset Velocity`})]})]})})]})})}},M=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,N=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float textureGood(sampler2D sam, vec2 uv) {
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    float a = texture( sam, (iuv+vec2(0.5,0.5))/res).r;
    float b = texture( sam, (iuv+vec2(1.5,0.5))/res).r;
    float c = texture( sam, (iuv+vec2(0.5,1.5))/res).r;
    float d = texture( sam, (iuv+vec2(1.5,1.5))/res).r;

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  // get the floatwise velocity
  vec2 vel = texture(u_vel_tex, v_texCoord).xy;

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, v_texCoord-vel);

  value = vec4(val, 0.0, 0.0, 0.0);
}
`,P=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

vec2 textureGood(sampler2D sam, vec2 uv)
{
    vec2 res = vec2(textureSize(sam, 0));
    vec2 st = uv*res - 0.5;

    vec2 iuv = floor( st );
    vec2 fuv = fract( st );

    vec2 a = texture(sam, (iuv+vec2(0.5,0.5))/res).xy;
    vec2 b = texture(sam, (iuv+vec2(1.5,0.5))/res).xy;
    vec2 c = texture(sam, (iuv+vec2(0.5,1.5))/res).xy;
    vec2 d = texture(sam, (iuv+vec2(1.5,1.5))/res).xy;

    return mix( mix( a, b, fuv.x),
                mix( c, d, fuv.x), fuv.y );
}

void main() {
  // get the floatwise velocity
  vec2 vel = texture(u_vel_tex, v_texCoord).xy;

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  vec2 val = textureGood(u_vel_tex, v_texCoord-vel);

  value = vec4(val, 0, 0);
}
`,F=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;


void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get data
  vec2 v01 = texture(u_vel_tex, v_texCoord + vec2(-x_off,+0.000)).xy;
  vec2 v10 = texture(u_vel_tex, v_texCoord + vec2(+0.000,-y_off)).xy;
  vec2 v12 = texture(u_vel_tex, v_texCoord + vec2(+0.000,+y_off)).xy;
  vec2 v21 = texture(u_vel_tex, v_texCoord + vec2(+x_off,+0.000)).xy;

  // calculate divergence using finite differences
  // remember, divergence is df/dx + df/dy
  float divergence = (v01.x - v21.x)/(2.0*x_off)
                   + (v10.y - v12.y)/(2.0*y_off);

  // return divergence
  value = vec4(divergence, 0.0, 0.0, 0.0);
}
`,I=`#version 300 es
precision highp float;
precision highp sampler2D;

// the divergence texture
uniform sampler2D u_divergence_tex;

// the pressure texture of the last iteration
uniform sampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_divergence_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get previous iteration pressure data
  float p01 = texture(u_pressure_tex, v_texCoord + vec2(-x_off,+0.000)).x;
  float p10 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,-y_off)).x;
  float p12 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,+y_off)).x;
  float p21 = texture(u_pressure_tex, v_texCoord + vec2(+x_off,+0.000)).x;

  // get divergence
  float d11 = texture(u_divergence_tex , v_texCoord).x;

  // use the jacobi method to derive the next iteration of pressure at this location
  float p_next = (d11 + p01 + p10 + p12 + p21)/4.0;

  value = vec4(p_next, 0.0, 0.0, 0.0);
}
`,L=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// the pressure texture
uniform sampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  // get neighboring cell distances
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));
  float x_off = 1.0/resolution.x;
  float y_off = 1.0/resolution.y;

  // get pressure data
  float p01 = texture(u_pressure_tex, v_texCoord + vec2(-x_off,+0.000)).x;
  float p10 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,-y_off)).x;
  float p12 = texture(u_pressure_tex, v_texCoord + vec2(+0.000,+y_off)).x;
  float p21 = texture(u_pressure_tex, v_texCoord + vec2(+x_off,+0.000)).x;

  // calculate the gradient
  // remember, the gradient is [df/dx, df/dy]
  vec2 pGradient = vec2((p21 - p01)/resolution.x, (p12 - p10)/resolution.y);

  // adjust the velocity by the pressure gradient
  vec2 vel = texture(u_vel_tex, v_texCoord).xy - pGradient;

  value = vec4(vel, 0, 0);
}
`,R=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// multipler to apply to the scalar texture before drawing
uniform float u_multiplier;

// offset to apply
uniform float u_offset;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;

const float ARROW_TILE_SIZE = 16.0;

// Computes the center pixel of the tile containing pixel pos
vec2 arrowTileCenterCoord(vec2 pos) {
	return (floor(pos / ARROW_TILE_SIZE) + 0.5) * ARROW_TILE_SIZE;
}

// Computes the signed distance from a line segment
float line(vec2 p, vec2 p1, vec2 p2) {
  vec2 center = (p1 + p2) * 0.5;
  float len = length(p2 - p1);
  vec2 dir = (p2 - p1) / len;
  vec2 rel_p = p - center;
  float dist1 = abs(dot(rel_p, vec2(dir.y, -dir.x)));
  float dist2 = abs(dot(rel_p, dir)) - 0.5*len;
  return max(dist1, dist2);
}

// v = field sampled at arrowTileCenterCoord(p), scaled by the length
// desired in pixels for arrows
// Returns a signed distance from the arrow
float arrow(vec2 p, vec2 v) {
  // Make everything relative to the center, which may be fractional
  p -= arrowTileCenterCoord(p);
    
  float mag_v = length(v), mag_p = length(p);
  
  if (mag_v > 0.0) {
    // Non-zero velocity case
    vec2 dir_v = v / mag_v;
    
    // We can't draw arrows larger than the tile radius, so clamp magnitude.
    // Enforce a minimum length to help see direction
    mag_v = clamp(mag_v, 5.0, ARROW_TILE_SIZE * 0.5);

    // Arrow tip location
    v = dir_v * mag_v;

    // Signed distance from shaft
    float shaft = line(p, v, -v);
    // Signed distance from head
    float head = min(line(p, v, 0.4*v + 0.2*vec2(-v.y, v.x)),
                     line(p, v, 0.4*v + 0.2*vec2(v.y, -v.x)));

    return min(shaft, head);
  } else {
    // Signed distance from the center point
    return mag_p;
  }
}

vec3 inferno(float t) {
    const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
    const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
    const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
    const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
    const vec3 c4 = vec3(77.162935699427, -33.40235894210092, -81.80730925738993);
    const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
    const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);

    return c0+t*(c1+t*(c2+t*(c3+t*(c4+t*(c5+t*c6)))));
}

void main() {
  // both textures are the same size
  vec2 resolution = vec2(textureSize(u_scalar_tex, 0));

  // coordinate in pixels
  vec2 pxCoord = v_texCoord*resolution;

  vec2 tileCenterCoord = arrowTileCenterCoord(pxCoord);

  vec2 vel_vec = texture(u_vel_tex, tileCenterCoord/resolution).xy;

  float arrow_dist = arrow(pxCoord, vel_vec * ARROW_TILE_SIZE);
  vec4 arrow_col = vec4(0, 1.0, 0, clamp(arrow_dist, 0.0, 1.0));

  float scalar_val = clamp(texture(u_scalar_tex, v_texCoord).x*u_multiplier + u_offset, 0.0, 1.0);
  vec4 field_col = vec4(inferno(scalar_val), 1.0);

  outColor = mix(arrow_col, field_col, arrow_col.a);
}
`,z=`#version 300 es
precision highp float;
precision highp sampler2D;

// the velocity texture
uniform sampler2D u_vel_tex;

// old mouse position
uniform vec2 u_old_mouse;
// new mouse position
uniform vec2 u_new_mouse;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

void main() {
  // both textures are the same size
  vec2 resolution = vec2(textureSize(u_vel_tex, 0));

  // the direction to paint in
  //vec2 paintDir = 0.01*(u_new_mouse - u_old_mouse)/resolution.y;
  vec2 paintDir = 0.01*(u_new_mouse - u_old_mouse)/resolution.y;

  // coordinate in pixels
  vec2 pxCoord = v_texCoord*resolution;
  float pxDist = sdSegment(pxCoord, u_old_mouse, u_new_mouse);

  if(pxDist < 20.0) {
    value = texture(u_vel_tex, v_texCoord) + vec4(paintDir, 0, 0);
  } else {
    value = texture(u_vel_tex, v_texCoord);
  }
}
`,B=class extends T.Component{constructor(e){super(e),this.canvas=T.createRef(),this.range=T.createRef(),this.scalarSelect=T.createRef(),this.velocitySelect=T.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.pressureTextures=[],this.pressureFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.pressureIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),!this.vis.isVisible()&&this.props.runInBackground!==!0)return;let e=this.cmt.mousePos;if(e&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,y(e.previous.x,0,this.props.xsize),y(this.props.ysize-e.previous.y,0,this.props.ysize)),this.gl.uniform2f(this.newMouseLoc,y(e.current.x,0,this.props.xsize),y(this.props.ysize-e.current.y,0,this.props.ysize)),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){let e=this.props.ysize;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);let t=parseInt(this.scalarSelect.current?.value),n=new Float32Array(this.props.xsize*this.props.ysize);for(let r=0;r<this.props.ysize;r++){let i=Math.floor(r/(e/t))%2;for(let a=0;a<this.props.xsize;a++)Math.floor(a/(e/t))%2+i==1?n[r*this.props.xsize+a]=1:n[r*this.props.xsize+a]=0}h(this.gl,0,0,this.props.xsize,this.props.ysize,n),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),h(this.gl,0,0,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let e;switch(this.velocitySelect.current?.value){case`curlnoise`:e=x(3,this.props.xsize,this.props.ysize,Math.random()*500);break;default:e=new Float32Array(this.props.xsize*this.props.ysize*2)}p(this.gl,0,0,this.props.xsize,this.props.ysize,e),this.needsVelocityReset=!1}for(let e=0;e<this.range.current.valueAsNumber;e++){this.gl.useProgram(this.prog_advect_scalar),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.scalarFramebuffers[(this.scalarIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2,this.gl.useProgram(this.prog_advect_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2,this.gl.useProgram(this.prog_divergence),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.gl.useProgram(this.prog_solve_pressure);for(let e=0;e<15;e++)this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pressureFramebuffers[(this.pressureIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.pressureIndex=(this.pressureIndex+1)%2;this.gl.useProgram(this.prog_apply_pressure_force),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}switch(this.gl.useProgram(this.prog_render),this.gl.activeTexture(this.gl.TEXTURE0),this.state.displayField){case`PRESSURE`:this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.uniform1f(this.renderMultiplier,1),this.gl.uniform1f(this.renderOffset,.5);break;case`DIVERGENCE`:this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.uniform1f(this.renderMultiplier,100),this.gl.uniform1f(this.renderOffset,.5);break;default:this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.uniform1f(this.renderMultiplier,1),this.gl.uniform1f(this.renderOffset,0)}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)},this.state={displayField:`SCALAR`}}componentDidMount(){this.gl=this.canvas.current.getContext(`webgl2`),this.gl.getExtension(`EXT_color_buffer_float`);let e=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);for(let e=0;e<2;e++){let e=g(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.scalarTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.scalarFramebuffers.push(t)}for(let e=0;e<2;e++){let e=m(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize*2));this.velTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.velFramebuffers.push(t)}this.divTexture=g(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.divFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.divTexture,0);for(let e=0;e<2;e++){let e=g(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.pressureTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.pressureFramebuffers.push(t)}{this.prog_advect_scalar=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,M),_(this.gl,this.gl.FRAGMENT_SHADER,N)]);let e=this.gl.getAttribLocation(this.prog_advect_scalar,`c_position`),t=this.gl.getUniformLocation(this.prog_advect_scalar,`u_scalar_tex`),n=this.gl.getUniformLocation(this.prog_advect_scalar,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(t,0),this.gl.uniform1i(n,1)}{this.prog_advect_vel=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,M),_(this.gl,this.gl.FRAGMENT_SHADER,P)]);let e=this.gl.getAttribLocation(this.prog_advect_vel,`c_position`),t=this.gl.getUniformLocation(this.prog_advect_vel,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_vel),this.gl.uniform1i(t,1)}{this.prog_divergence=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,M),_(this.gl,this.gl.FRAGMENT_SHADER,F)]);let e=this.gl.getAttribLocation(this.prog_divergence,`c_position`),t=this.gl.getUniformLocation(this.prog_divergence,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_divergence),this.gl.uniform1i(t,1)}{this.prog_solve_pressure=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,M),_(this.gl,this.gl.FRAGMENT_SHADER,I)]);let e=this.gl.getAttribLocation(this.prog_solve_pressure,`c_position`),t=this.gl.getUniformLocation(this.prog_solve_pressure,`u_divergence_tex`),n=this.gl.getUniformLocation(this.prog_solve_pressure,`u_pressure_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_solve_pressure),this.gl.uniform1i(t,2),this.gl.uniform1i(n,3)}{this.prog_apply_pressure_force=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,M),_(this.gl,this.gl.FRAGMENT_SHADER,L)]);let e=this.gl.getAttribLocation(this.prog_apply_pressure_force,`c_position`),t=this.gl.getUniformLocation(this.prog_apply_pressure_force,`u_vel_tex`),n=this.gl.getUniformLocation(this.prog_apply_pressure_force,`u_pressure_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_pressure_force),this.gl.uniform1i(t,1),this.gl.uniform1i(n,3)}{this.prog_render=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,M),_(this.gl,this.gl.FRAGMENT_SHADER,R)]);let e=this.gl.getAttribLocation(this.prog_render,`c_position`),t=this.gl.getUniformLocation(this.prog_render,`u_scalar_tex`),n=this.gl.getUniformLocation(this.prog_render,`u_vel_tex`);this.renderMultiplier=this.gl.getUniformLocation(this.prog_render,`u_multiplier`),this.renderOffset=this.gl.getUniformLocation(this.prog_render,`u_offset`),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(t,0),this.gl.uniform1i(n,1)}{this.prog_paint_vel=v(this.gl,[_(this.gl,this.gl.VERTEX_SHADER,M),_(this.gl,this.gl.FRAGMENT_SHADER,z)]);let e=this.gl.getAttribLocation(this.prog_paint_vel,`c_position`),t=this.gl.getUniformLocation(this.prog_paint_vel,`u_vel_tex`);this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,`u_new_mouse`),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,`u_old_mouse`),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(t,1)}this.cmt=new S(this.canvas.current),this.vis=new b(this.canvas.current),this.animationLoop()}componentWillUnmount(){this.cmt.cleanup(),this.vis.cleanup(),window.cancelAnimationFrame(this.requestID)}render(){return(0,E.jsx)(`div`,{style:this.props.style,className:this.props.className,children:(0,E.jsxs)(`div`,{className:`row`,children:[(0,E.jsx)(`div`,{className:`col-md-8 d-flex`,children:(0,E.jsxs)(`div`,{children:[(0,E.jsxs)(`div`,{className:`text-center pb-3`,hidden:!this.props.showInstructions,children:[(0,E.jsx)(C,{className:`fs-3`,style:{transform:`translateY(0.5rem)`}}),(0,E.jsx)(`span`,{className:`fs-5`,style:{fontFamily:`Permanent Marker`},children:` Drag to Stir!`})]}),(0,E.jsx)(`canvas`,{className:`border border-dark mx-auto`,ref:this.canvas,height:this.props.ysize,width:this.props.xsize})]})}),(0,E.jsx)(`div`,{className:`col-md-4`,children:(0,E.jsxs)(`div`,{className:`border border-dark p-3`,children:[(0,E.jsx)(`h6`,{children:`Controls`}),(0,E.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,E.jsx)(`label`,{className:`form-label`,children:`Simulation Speed`}),(0,E.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`5`,step:1,defaultValue:1,ref:this.range})]}),(0,E.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,E.jsx)(`label`,{className:`form-label`,children:`Scalar Field`}),(0,E.jsxs)(`select`,{className:`form-select mb-3`,defaultValue:8,ref:this.scalarSelect,children:[(0,E.jsx)(`option`,{value:1,children:`Empty`}),(0,E.jsx)(`option`,{value:2,children:`Grid 2`}),(0,E.jsx)(`option`,{value:8,children:`Grid 8`}),(0,E.jsx)(`option`,{value:64,children:`Grid 64`})]}),(0,E.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>this.needsScalarReset=!0,children:`Reset Scalar`})]}),(0,E.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,E.jsx)(`label`,{className:`form-label`,children:`Velocity Field`}),(0,E.jsxs)(`select`,{className:`form-select mb-3`,defaultValue:8,ref:this.velocitySelect,children:[(0,E.jsx)(`option`,{value:`empty`,children:`Empty`}),(0,E.jsx)(`option`,{value:`curlnoise`,children:`Curl Noise`})]}),(0,E.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>this.needsVelocityReset=!0,children:`Reset Velocity`})]}),(0,E.jsxs)(`div`,{className:`form-group`,children:[(0,E.jsxs)(`div`,{className:`form-check`,children:[(0,E.jsx)(`input`,{type:`radio`,className:`form-check-input`,checked:this.state.displayField===`SCALAR`,onChange:()=>this.setState({displayField:`SCALAR`})}),(0,E.jsx)(`label`,{className:`form-check-label`,children:`View Scalar`})]}),(0,E.jsxs)(`div`,{className:`form-check`,children:[(0,E.jsx)(`input`,{type:`radio`,className:`form-check-input`,checked:this.state.displayField===`PRESSURE`,onChange:()=>this.setState({displayField:`PRESSURE`})}),(0,E.jsx)(`label`,{className:`form-check-label`,children:`View Pressure`})]}),(0,E.jsxs)(`div`,{className:`form-check`,children:[(0,E.jsx)(`input`,{type:`radio`,className:`form-check-input`,checked:this.state.displayField===`DIVERGENCE`,onChange:()=>this.setState({displayField:`DIVERGENCE`})}),(0,E.jsx)(`label`,{className:`form-check-label`,children:`View Divergence`})]})]})]})})]})})}};w(),(0,e(r()).createRoot)(document.getElementById(`root`)).render((0,E.jsx)(T.StrictMode,{children:(0,E.jsx)(()=>(0,E.jsx)(o,{children:(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(s,{id:`overview`,name:`Overview`,children:[(0,E.jsx)(`p`,{children:`Our goals are to:`}),(0,E.jsxs)(`ul`,{children:[(0,E.jsx)(`li`,{children:`explain simply the math behind fluid simulation`}),(0,E.jsx)(`li`,{children:`learn how to use the Navier-Stokes equations to simulate fluids`}),(0,E.jsx)(`li`,{children:`provide working code to simulate 2D incompressible flow`})]}),(0,E.jsx)(`p`,{children:`Prerequisites:`}),(0,E.jsx)(`ul`,{children:(0,E.jsx)(`li`,{children:(0,E.jsx)(f,{a:d.get(`fluid1`)})})}),(0,E.jsx)(`h4`,{className:`mt-5 mb-3`,children:`A Sneak Preview of What We're Building Towards...`}),(0,E.jsx)(u,{title:``,id:``,children:(0,E.jsx)(B,{className:`mx-auto`,style:{maxWidth:`40em`},xsize:400,ysize:400,showInstructions:!0})})]}),(0,E.jsxs)(s,{id:`math-fluid-simulation`,name:`Math of Fluid Simulation`,children:[(0,E.jsx)(`h4`,{children:`Prerequisites`}),(0,E.jsx)(`p`,{children:`This section makes heavy use of multivariable calculus, matrix multiplication, and systems of equations. so if you're not familiar or need a refresher, I recommend checking out these topics:`}),(0,E.jsxs)(`ul`,{children:[(0,E.jsxs)(`li`,{children:[`Vector Multiplication and Matrix Multiplication`,(0,E.jsxs)(`ul`,{children:[(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://www.mathsisfun.com/algebra/matrix-multiplying.html`})}),(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://mathinsight.org/matrix_vector_multiplication`})})]})]}),(0,E.jsxs)(`li`,{children:[`Vector and Scalar Fields`,(0,E.jsxs)(`ul`,{children:[(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/multivariable-functions`})}),(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/ways-to-represent-multivariable-functions/a/vector-fields`})})]})]}),(0,E.jsxs)(`li`,{children:[`Partial Derivatives`,(0,E.jsx)(`ul`,{children:(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives`})})})]}),(0,E.jsxs)(`li`,{children:[`The Gradient of Scalar Fields`,(0,E.jsx)(`ul`,{children:(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives`})})})]}),(0,E.jsxs)(`li`,{children:[`Divergence of a Vector Field`,(0,E.jsx)(`ul`,{children:(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/divergence-and-curl-articles/a/divergence`})})})]}),(0,E.jsxs)(`li`,{children:[`Finite Differences`,(0,E.jsx)(`ul`,{children:(0,E.jsx)(`li`,{children:(0,E.jsx)(c,{href:`https://en.wikipedia.org/wiki/Finite_difference#Relation_with_derivatives`})})})]})]}),(0,E.jsx)(`h4`,{children:`Notation`}),(0,E.jsx)(`p`,{children:`In this article, we'll use the following notation, which is consistent with that used by Khan Academy:`}),(0,E.jsxs)(`ul`,{children:[(0,E.jsxs)(`li`,{children:[`Lowercase letters and greek letters for scalars.`,(0,E.jsx)(`br`,{}),`Examples:`,(0,E.jsxs)(`ul`,{children:[(0,E.jsx)(`li`,{children:(0,E.jsx)(l,{math:`a = 5`})}),(0,E.jsx)(`li`,{children:(0,E.jsx)(l,{math:`y = x^2 + 1`})})]})]}),(0,E.jsxs)(`li`,{children:[`Lowercase letters and greek letters with an arrow on top for vectors.`,(0,E.jsx)(`br`,{}),`Examples:`,(0,E.jsxs)(`ul`,{children:[(0,E.jsx)(`li`,{children:(0,E.jsx)(l,{math:`\\vec v = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}`})}),(0,E.jsx)(`li`,{children:(0,E.jsx)(l,{math:`\\vec f = \\nabla (x^2 + y^2)`})})]})]})]}),(0,E.jsx)(`h4`,{children:`Navier Stokes`}),(0,E.jsx)(`p`,{children:`Fluids are complicated. If we wanted to make our simulation perfectly accurate, we would have to simulate at the molecular level, directly handling the elastic collisions of molecules against each other.`}),(0,E.jsx)(`p`,{children:`Indeed, this intricate level of simulation is often done when dealing with high temperature plasmas. However, there are quite a few downsides to this. First of all, it's really slow. You'd never be able to do this on real time on consumer hardware. And second of all, it's very complicated. We want code that's easy to write and understand, even if you've never had experience in fluid simulation.`}),(0,E.jsx)(`p`,{children:`The good news is that it's not necessary to go to such lengths to have a fairly realistic fluid simulation. Doing so would be complete overkill for most cases, which never see such extreme conditions. So, we'll make a few choice simplifications to make our simulation both fast and easy to understand:`}),(0,E.jsxs)(`ol`,{children:[(0,E.jsxs)(`li`,{children:[`We'll assume our fluid is a continuuum`,(0,E.jsx)(i,{source:`https://en.wikipedia.org/wiki/Derivation_of_the_Navier%E2%80%93Stokes_equations#Basic_assumptions`}),`.`,(0,E.jsxs)(`ul`,{children:[(0,E.jsx)(`li`,{children:`This means that the fluid is a continous substance, and that we can find the derivatives of fluid properties like pressure and velocity.`}),(0,E.jsx)(`li`,{children:`Since all matter is made out of atoms, this isn't actually true, but the effects of this are negligible on the macroscopic scale.`})]})]}),(0,E.jsxs)(`li`,{children:[`We'll assume our fluid is incompressible.`,(0,E.jsx)(`ul`,{children:(0,E.jsxs)(`li`,{children:[`In reality of course, no fluid is perfectly incompressible, but it's a close enough approximation. For example, water is nearly aways incompressible. Even for air, we only really need to start worrying about compressibility when the flow approaches Mach 0.3`,(0,E.jsx)(i,{source:`https://en.wikipedia.org/wiki/Compressible_flow`}),`.`]})})]}),(0,E.jsxs)(`li`,{children:[`We'll assume our fluid has no friction.`,(0,E.jsx)(`ul`,{children:(0,E.jsx)(`li`,{children:`This one is probably the most egregious simplification, but as we'll see, inaccuracies in our simulation give us friction "for free" anyway.`})})]})]}),(0,E.jsx)(`p`,{children:`When we take these assumptions and combine them with the rules of conservation of mass, and the conservation of momentum, we get the incompressible Navier Stokes equations:`}),(0,E.jsx)(l,{block:!0,children:String.raw`
        \begin{gather}
          \frac {\partial \vec{u}} {\partial t} =
          -(\vec{u} \cdot \nabla)\vec{u}
          -\frac {1} {\rho} \nabla{p} \\
          \nabla \cdot \vec{u} = 0
        \end{gather}
      `}),`Where:`,(0,E.jsxs)(`ul`,{children:[(0,E.jsxs)(`li`,{children:[(0,E.jsx)(l,{math:`\\vec u`}),` is the velocity vector field`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(l,{math:`p`}),` is the pressure scalar field`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(l,{math:`\\rho`}),` is the density of the fluid`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(l,{math:`\\frac {\\partial \\vec{u}} {\\partial t}`}),` is the derivative of the velocity vector field with respect to time`]})]}),(0,E.jsxs)(u,{title:`Clarification on Simplified Equation`,children:[`In our case, since we're neglecting friction, we've technically listed the `,(0,E.jsx)(`a`,{href:`https://en.wikipedia.org/wiki/Euler_equations_(fluid_dynamics)`,children:`Euler equations`}),`, which are a special case of the Navier-Stokes equations when the viscosity of the fluid is zero throughout.`,(0,E.jsx)(i,{source:`https://en.wikipedia.org/wiki/Euler_equations_(fluid_dynamics)`}),`. However, most what we're saying applies equally to the Navier-Stokes equations.`]}),(0,E.jsxs)(`p`,{children:[`If you're interested, a derivation of Navier Stokes can be found on Wikipedia here: `,(0,E.jsx)(c,{href:`https://en.wikipedia.org/wiki/Derivation_of_the_Navier%E2%80%93Stokes_equations`}),`, but it's not necessary to understand in order to implement a simulation of it.`]}),(0,E.jsx)(`h4`,{children:`Understanding the Equations`}),(0,E.jsx)(`p`,{children:`The equations, despite being quite short, are pretty confusing.`}),(0,E.jsx)(`p`,{children:`First, we have to understand what's even going on. These equations, as written, are a set of equalities that we can try to apply to a scenario that has:`}),(0,E.jsxs)(`ul`,{children:[(0,E.jsx)(`li`,{children:`A vector field representing velocity at any given point`}),(0,E.jsx)(`li`,{children:`A vector field representing the derivative of this field with respect to time`}),(0,E.jsx)(`li`,{children:`A scalar field representing the pressure at any given point`}),(0,E.jsx)(`li`,{children:`A single scalar value that represents the density of the fluid`})]}),(0,E.jsx)(`p`,{children:`If we have all 4 of these values, then we can check if they satisfy the equations. To do this, imagine we visit every single position on the coordinate plane, and ask: Do the fields at this position satisfy equation 1? Do they satisfy equation 2?`}),(0,E.jsxs)(`ul`,{children:[(0,E.jsxs)(`li`,{children:[`If the answer is yes, `,(0,E.jsx)(`i`,{children:`for every single point on the coordinate plane`}),`, then we can say "yeah, these fields can represent an incompressible fluid"`]}),(0,E.jsxs)(`li`,{children:[`If the answer is no, `,(0,E.jsx)(`i`,{children:`for even a single point`}),`, then we must say "no, these fields don't represent an incompressible fluid"`]})]}),(0,E.jsx)(`p`,{children:`That's literally everything these equations let us do right now, mathematically speaking.`}),(0,E.jsx)(`p`,{children:`But wait, if we have 3 values, shouldn't we be able to solve for the 4th?`}),(0,E.jsxs)(`p`,{children:[`As it turns out, no. The Navier-Stokes equations are notoriously unsolvable in the general case. Given arbitrary initial conditions, we don't even yet know if a globally defined smooth pressure and velocity field that solves the equation exists. This problem, known as Navier-Stokes existence and smoothness, was designated one of the 7 Millenium Prize Problems, and anyone who solves it will recieve a million dollar prize`,(0,E.jsx)(i,{source:`https://www.claymath.org/sites/default/files/navierstokes.pdf`}),`.`]}),(0,E.jsx)(`p`,{children:`That being said, it's definitely possible to numerically approximate solutions, and this is indeed what we have to do. Numerically approximated solutions are never 100% accurate, and since the Navier-Stokes equations are chaotic, we'll eventually diverge from the true state of the fluid.`}),(0,E.jsx)(`p`,{children:`For certain applications, like weather forecasting, this can be a real problem. For others, like video games, it's not as big of a deal. We're focusing on the second use case for now, so we won't worry too much about accuracy, especially where it conflicts with performance.`}),(0,E.jsxs)(u,{title:`Simulating a solution to Navier-Stokes`,children:[(0,E.jsx)(`p`,{children:`Let's walk through what we are going to do to in our simulation.`}),(0,E.jsx)(`ol`,{}),(0,E.jsxs)(`p`,{children:[`In our case, we already have `,(0,E.jsx)(l,{math:`{\\vec u}_{t=0}`}),`, `,(0,E.jsx)(l,{math:`p_{t=0}`}),` and `,(0,E.jsx)(l,{math:`\\rho`}),`, and we want to find `,(0,E.jsx)(l,{math:`{\\frac {\\partial \\vec{u}} {\\partial t}}_{t=0}`}),`. Then, we'll approximate the velocity field one timestep in the future by adding `,(0,E.jsx)(l,{math:`{\\frac {\\partial \\vec{u}} {\\partial t}}_{t=0}`}),` to `,(0,E.jsx)(l,{math:`{\\vec u}_{t=0}`}),` to get `,(0,E.jsx)(l,{math:`{\\vec u}_{t=1}`}),`(This method is sometimes called the "Forward Euler Method"`,(0,E.jsx)(i,{source:`https://en.wikipedia.org/wiki/Euler_method`}),`, and it's one of the simplest and most intuitive ways to solve a differential equation.)`]}),(0,E.jsxs)(`p`,{children:[`We then use `,(0,E.jsx)(l,{math:`{\\vec u}_{t=1}`}),` to find `,(0,E.jsx)(l,{math:`{p}_{t=1}`}),`. We will see that the pressure field can be found directly from velocity field without needing either `,(0,E.jsx)(l,{math:`\\frac {\\partial \\vec{u}} {\\partial t}`}),` or `,(0,E.jsx)(l,{math:`\\rho`}),`.`]})]}),(0,E.jsx)(`h5`,{children:`Equation 1`}),(0,E.jsx)(l,{block:!0,math:String.raw`\frac {\partial \vec{u}} {\partial t} = -(\vec{u} \cdot \nabla)\vec{u} -\frac {1} {\rho} \nabla{p}`}),(0,E.jsx)(`ul`,{children:(0,E.jsxs)(`li`,{children:[(0,E.jsx)(l,{math:String.raw`\frac {\partial \vec{u}} {\partial t}`}),` is key here. It`]})})]}),(0,E.jsxs)(s,{id:`webgl2-advection`,name:`Fluid Advection with WebGL2`,children:[(0,E.jsx)(`p`,{children:`Now, we'll approach the heat equation`}),(0,E.jsx)(u,{title:`Fluid Advection`,id:`fluid-advection-demo`,children:(0,E.jsx)(j,{className:`mx-auto`,style:{maxWidth:`40em`},size:400})})]}),(0,E.jsxs)(s,{id:`webgl2-incompressible`,name:`Incompressible Fluid with WebGL2`,children:[(0,E.jsx)(`p`,{children:`Now, we'll approach the heat equation`}),(0,E.jsx)(u,{title:`Fluid Advection`,id:`fluid-advection-demo`,children:(0,E.jsx)(B,{className:`mx-auto`,style:{maxWidth:`40em`},xsize:400,ysize:800,showInstructions:!1})})]}),(0,E.jsx)(s,{id:`sources`,name:`Sources`,children:(0,E.jsx)(a,{})})]})}),{})}));