import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import"./modulepreload-polyfill-P2Xu9kJm.js";import{n as t,r as n,t as r}from"./client-DyL1ZotQ.js";import{r as i,t as a}from"./ArticleLayout-Chegvux2.js";import{t as o}from"./Section-CMotTF6f.js";import{t as s}from"./AsideCard-CeAOR7pj.js";import{c,d as l,h as u,i as d,l as f,n as p,s as m,t as h}from"./webgl-C5zzwcd9.js";import{t as g}from"./math-CE2mtAM0.js";import{t as _}from"./noise-BiwXzFYx.js";import{t as v}from"./uvplane-B-WV_thq.js";import{t as y}from"./camera-B_eT_QmP.js";import{t as b}from"./canvas-D1zRnp_a.js";import{t as x}from"./bootstrap-sMF1ce4T.js";var S=e(n()),C=t(),w=`#version 300 es
in vec2 c_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = c_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (c_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,T=String.raw`#version 300 es
precision highp float;
precision highp sampler2D;

const float PI = 3.1415926538;
const float r = 100.0;

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
    // uv in pixels
    vec2 uv_px_raw = uv*vec2(res) - 0.5;

    vec2 uv_px_base = floor(uv_px_raw);
    vec2 uv_px_fract = fract(uv_px_raw);

    float uv_px_base_x_min = mod(uv_px_base.x, res.x);
    float uv_px_base_x_max = mod(uv_px_base.x+1.0, res.x);
    float uv_px_base_y_min = uv_px_base.y;
    float uv_px_base_y_max = uv_px_base.y+1.0;

    if(uv_px_base_y_min < 0.0 || uv_px_base_y_max > res.y) {
        return 0.0;
    }

    float a = texelFetch(sam, ivec2(uv_px_base_x_min,uv_px_base_y_min), 0).r;
    float b = texelFetch(sam, ivec2(uv_px_base_x_max,uv_px_base_y_min), 0).r;
    float c = texelFetch(sam, ivec2(uv_px_base_x_min,uv_px_base_y_max), 0).r;
    float d = texelFetch(sam, ivec2(uv_px_base_x_max,uv_px_base_y_max), 0).r;

    return mix( mix( a, b, uv_px_fract.x),
                mix( c, d, uv_px_fract.x), uv_px_fract.y );
}

void main() {
  float theta = v_texCoord.x * 2.0 * PI - PI;
  float phi = v_texCoord.y * PI;

  // get the floatwise velocity in spherical coordinates
  vec2 vel_sph = texture(u_vel_tex, v_texCoord).xy;

  // get cartesian position
  vec3 pos_crt = vec3(
        r*cos(theta)*sin(phi),
        r*sin(theta)*sin(phi),
        r*cos(phi)
  );

  // 2 basis vectors
  vec3 e_theta_hat = vec3(
      -sin(theta),
      cos(theta),
      0.0
  );

  vec3 e_phi_hat = vec3(
      cos(theta)*cos(phi),
      sin(theta)*cos(phi),
      -sin(phi)
  );

  // https://dynref.engr.illinois.edu/rvs.html
  // v = (dr/dt)*e_r_hat + r*(dtheta/dt)*sin(phi)*e_theta_hat + r*(dphi/dt)*e_phi_hat

  vec3 vel_crt = r*vel_sph.x*sin(phi)*e_theta_hat + r*vel_sph.y*e_phi_hat;

  // we extrapolate the cartesian position the point would have been at a while back
  // (semi lagrangian method)
  vec3 old_pos_crt = pos_crt - vel_crt;

  // convert back to spherical coordinates
  float extrapolated_old_theta = atan(old_pos_crt.y, old_pos_crt.x);
  float extrapolated_old_phi = atan(length(old_pos_crt.xy), old_pos_crt.z);

  vec2 normalized_old_pos_sph = vec2(
      (extrapolated_old_theta + PI)/(2.0*PI),
      extrapolated_old_phi/PI
  );

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  float val = textureGood(u_scalar_tex, normalized_old_pos_sph);

  value = vec4(val, 0.0, 0.0, 0.0);
}
`,E=`#version 300 es
precision highp float;
precision highp sampler2D;

const float PI = 3.1415926538;
const float r = 1.0;


// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

vec2 textureGood(sampler2D sam, vec2 uv) {
    vec2 res = vec2(textureSize(sam, 0));
    // uv in pixels
    vec2 uv_px_raw = uv*vec2(res) - 0.5;

    vec2 uv_px_base = floor(uv_px_raw);
    vec2 uv_px_fract = fract(uv_px_raw);

    float uv_px_base_x_min = mod(uv_px_base.x, res.x);
    float uv_px_base_x_max = mod(uv_px_base.x+1.0, res.x);
    float uv_px_base_y_min = uv_px_base.y;
    float uv_px_base_y_max = uv_px_base.y+1.0;

    if(uv_px_base_y_min < 0.0 || uv_px_base_y_max > res.y) {
        return vec2(0.0, 0.0);
    }

    vec2 a = texelFetch(sam, ivec2(uv_px_base_x_min,uv_px_base_y_min), 0).rg;
    vec2 b = texelFetch(sam, ivec2(uv_px_base_x_max,uv_px_base_y_min), 0).rg;
    vec2 c = texelFetch(sam, ivec2(uv_px_base_x_min,uv_px_base_y_max), 0).rg;
    vec2 d = texelFetch(sam, ivec2(uv_px_base_x_max,uv_px_base_y_max), 0).rg;

    return mix( mix( a, b, uv_px_fract.x),
                mix( c, d, uv_px_fract.x), uv_px_fract.y );
}

void main() {

  // // TODO: this makes it crash: why?
  // value = texture(u_vel_tex, v_texCoord);
  // return;

  float theta = v_texCoord.x * 2.0 * PI - PI;
  float phi = v_texCoord.y * PI;

  // get the floatwise velocity in spherical coordinates
  vec2 vel_sph = texture(u_vel_tex, v_texCoord).xy;

  // get cartesian position
  vec3 pos_crt = vec3(
        r*cos(theta)*sin(phi),
        r*sin(theta)*sin(phi),
        r*cos(phi)
  );

  // 2 basis vectors
  vec3 e_theta_hat = vec3(
      -sin(theta),
      cos(theta),
      0.0
  );

  vec3 e_phi_hat = vec3(
      cos(theta)*cos(phi),
      sin(theta)*cos(phi),
      -sin(phi)
  );

  // https://dynref.engr.illinois.edu/rvs.html
  // v = (dr/dt)*e_r_hat + r*(dtheta/dt)*sin(phi)*e_theta_hat + r*(dphi/dt)*e_phi_hat

  vec3 vel_crt = r*vel_sph.x*sin(phi)*e_theta_hat + r*vel_sph.y*e_phi_hat;

  // we extrapolate the cartesian position the point would have been at a while back
  // (semi lagrangian method)
  vec3 old_pos_crt = pos_crt - vel_crt;

  // convert back to spherical coordinates
  float extrapolated_old_phi = atan(length(old_pos_crt.xy), old_pos_crt.z);
  float extrapolated_old_theta = atan(old_pos_crt.y, old_pos_crt.x);

  // normalize from 0-1
  vec2 normalized_old_pos_sph = vec2(
      (extrapolated_old_theta+PI)/(2.0*PI),
      extrapolated_old_phi/PI
  );

  // now we advect the scalar field:
  // we calculate the scalar value that will be at this location at the next timestep
  vec2 val = textureGood(u_vel_tex, normalized_old_pos_sph);

  value = vec4(val, 0, 0);
}
`,D=`#version 300 es
precision highp float;
precision highp sampler2D;

const float PI = 3.1415926538;
const float r = 100.0;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

vec2 sampleVec2(sampler2D sam, vec2 res, vec2 uv_px) {
    uv_px.x = mod(uv_px.x, res.x);
    if(uv_px.y < 0.0 || uv_px.y > res.y) {
        return vec2(0.0, 0.0);
    }
    return texelFetch(sam, ivec2(uv_px), 0).xy;
}


void main() {
  // get neighboring cell distances
  vec2 res = vec2(textureSize(u_vel_tex, 0));
  vec2 v_px = v_texCoord * res;
  float x_off = 1.0/res.x;
  float y_off = 1.0/res.y;

  // get data
  vec2 v01 = sampleVec2(u_vel_tex, res, v_px + vec2(-1.0,+0.0));
  vec2 v10 = sampleVec2(u_vel_tex, res, v_px + vec2(+0.0,-1.0));
  vec2 v12 = sampleVec2(u_vel_tex, res, v_px + vec2(+0.0,+1.0));
  vec2 v21 = sampleVec2(u_vel_tex, res, v_px + vec2(+1.0,+0.0));

  // // calculate divergence using finite differences
  // float d_theta = (v01.x - v21.x)/(2.0*x_off);
  // float d_phi_sin_phi = (v10.y - v12.y)/(2.0*y_off);
  // float r_sin_phi = r*sin(v_texCoord.y*PI) + 0.01;
  // float divergence = d_theta/r_sin_phi + d_phi_sin_phi/r_sin_phi;

  float divergence = (v01.x - v21.x)/(2.0*x_off) + (v10.y - v12.y)/(2.0*y_off);

  // return divergence
  value = vec4(divergence, 0.0, 0.0, 0.0);
}
`,O=`#version 300 es
precision highp float;
precision highp sampler2D;

const float PI = 3.1415926538;
const float r = 100.0;

// the divergence texture
uniform sampler2D u_divergence_tex;

// the pressure texture of the last iteration
uniform sampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float sampleFloat(sampler2D sam, vec2 res, vec2 uv_px) {
    uv_px.x = mod(uv_px.x, res.x);
    if(uv_px.y < 0.0 || uv_px.y > res.y) {
        return 0.0;
    }
    return texelFetch(sam, ivec2(uv_px), 0).x;
}

void main() {
  // get neighboring cell distances
  vec2 res = vec2(textureSize(u_divergence_tex, 0));
  vec2 v_px = v_texCoord * res;

  // get previous iteration pressure data
  float p01 = sampleFloat(u_pressure_tex, res, v_px + vec2(-1.0,+0.0));
  float p10 = sampleFloat(u_pressure_tex, res, v_px + vec2(+0.0,-1.0));
  float p12 = sampleFloat(u_pressure_tex, res, v_px + vec2(+0.0,+1.0));
  float p21 = sampleFloat(u_pressure_tex, res, v_px + vec2(+1.0,+0.0));

  // get divergence
  float d11 = texture(u_divergence_tex , v_texCoord).x;

  // use the jacobi method to derive the next iteration of pressure at this location
  float p_next = (d11 + p01 + p10 + p12 + p21)/4.0;

  value = vec4(p_next, 0.0, 0.0, 0.0);
}
`,k=`#version 300 es
precision highp float;
precision highp sampler2D;

const float PI = 3.1415926538;
const float r = 100.0;

// the velocity texture
uniform sampler2D u_vel_tex;

// the pressure texture
uniform sampler2D u_pressure_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

float sampleFloat(sampler2D sam, vec2 res, vec2 uv_px) {
    uv_px.x = mod(uv_px.x, res.x);
    //if(uv_px.y < 0.0 || uv_px.y > res.y) {
    //    return 0.0;
    //}
    uv_px.y = clamp(uv_px.y, 0.0, res.y);
    return texelFetch(sam, ivec2(uv_px), 0).x;
}

void main() {
  // get neighboring cell distances
  vec2 res = vec2(textureSize(u_pressure_tex, 0));
  vec2 v_px = v_texCoord * res;

  // get previous iteration pressure data
  float p01 = sampleFloat(u_pressure_tex, res, v_px + vec2(-1.0,+0.0));
  float p10 = sampleFloat(u_pressure_tex, res, v_px + vec2(+0.0,-1.0));
  float p12 = sampleFloat(u_pressure_tex, res, v_px + vec2(+0.0,+1.0));
  float p21 = sampleFloat(u_pressure_tex, res, v_px + vec2(+1.0,+0.0));

  // calculate the gradient
  // remember, the gradient in spherical coordinates is [(1/(r*sin(phi))) * (df/dtheta), (1/r) * (df/dphi)]

  float phi= PI*v_texCoord.y;

  // vec2 pGradient = vec2(
  //     (1.0/(r*sin(phi)))*(p21 - p01)/res.x,
  //     (1.0/r)*(p12 - p10)/res.y
  // );

  vec2 pGradient = vec2(
      (p21 - p01)/res.x,
      (p12 - p10)/res.y
  );


  // adjust the velocity by the pressure gradient
  vec2 vel = texture(u_vel_tex, v_texCoord).xy - pGradient;

  value = vec4(vel, 0, 0);
}
`,A=`#version 300 es
precision highp float;
precision highp sampler2D;

// the scalar texture
uniform sampler2D u_scalar_tex;

// multipler to apply
uniform float u_multiplier;

// offset to apply
uniform float u_offset;

// the velocity texture
uniform sampler2D u_vel_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 outColor;

const float ARROW_TILE_SIZE = 32.0;

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
`,j=`#version 300 es
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
`,M=`#version 300 es
#define PI 3.1415926538

in vec2 a_position;
out vec2 v_texCoord;

const float u_radius = 0.5;

uniform float u_phiAlpha;
uniform float u_thetaAlpha;
uniform float u_lerpAlpha;

uniform mat4 u_worldViewProjection;


void main() {
   float theta = (a_position.x-1.0) * u_thetaAlpha * 2.0 * PI;
   float phi = a_position.y * u_phiAlpha * PI;

   v_texCoord = a_position;

   vec3 oldpos = vec3(
       (a_position.x - 0.5), 
       -(a_position.y - 0.5), 
       0.0
   );
   vec3 newpos = vec3(
       u_radius * cos(theta) * sin(phi),
       u_radius * sin(theta) * sin(phi),
       u_radius * cos(phi)
    );

   vec3 lerpedPos = mix(oldpos, newpos, u_lerpAlpha);

   gl_Position = u_worldViewProjection * vec4(lerpedPos, 1.0);
}
`,N=`#version 300 es
precision highp float;
precision highp sampler2D;

// the rendered texture
uniform sampler2D u_render_tex;

in vec2 v_texCoord;

out vec4 v_outColor;

void main() {
  // color: 0xEBDBB2,
  // v_outColor = vec4(0.922,0.859,0.698, 1.0);
  v_outColor = texture(u_render_tex, vec2(v_texCoord.x, v_texCoord.y));
}
`,P=v(20,20),F=class extends S.Component{constructor(e){super(e),this.canvas=S.createRef(),this.range=S.createRef(),this.scalarSelect=S.createRef(),this.viewSelect=S.createRef(),this.velocitySelect=S.createRef(),this.scalarTextures=[],this.scalarFramebuffers=[],this.velTextures=[],this.velFramebuffers=[],this.pressureTextures=[],this.pressureFramebuffers=[],this.scalarIndex=0,this.velIndex=0,this.pressureIndex=0,this.needsScalarReset=!0,this.needsVelocityReset=!0,this.spherenessRange=S.createRef(),this.thetaRange=S.createRef(),this.phiRange=S.createRef(),this.lerpRange=S.createRef(),this.sphereCanvas=S.createRef(),this.handleSphereChange=()=>{let e=this.spherenessRange.current.valueAsNumber;this.thetaRange.current.valueAsNumber=e,this.phiRange.current.valueAsNumber=e,this.lerpRange.current.valueAsNumber=Math.min(e*1.5,1),this.handleCircularityChange()},this.handleCircularityChange=()=>{let e=this.thetaRange.current.valueAsNumber,t=this.phiRange.current.valueAsNumber,n=this.lerpRange.current.valueAsNumber;this.sphereGl.uniform1f(this.sphereThetaAlpha,e),this.sphereGl.uniform1f(this.spherePhiAlpha,t),this.sphereGl.uniform1f(this.sphereLerpAlpha,n)},this.animationLoop=()=>{this.requestID=window.requestAnimationFrame(this.animationLoop),this.camera.update();let e=this.cmt.mousePos;if(e&&(this.gl.useProgram(this.prog_paint_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.uniform2f(this.oldMouseLoc,g(e.previous.x,0,this.props.xsize),g(this.props.ysize-e.previous.y,0,this.props.ysize)),this.gl.uniform2f(this.newMouseLoc,g(e.current.x,0,this.props.xsize),g(this.props.ysize-e.current.y,0,this.props.ysize)),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2),this.needsScalarReset){let e=this.props.ysize;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]);let t=parseInt(this.scalarSelect.current?.value),n=new Float32Array(this.props.xsize*this.props.ysize);for(let r=0;r<this.props.ysize;r++){let i=Math.floor(r/(e/t))%2;for(let a=0;a<this.props.xsize;a++)Math.floor(a/(e/t))%2+i==1?n[r*this.props.xsize+a]=1:n[r*this.props.xsize+a]=0}f(this.gl,0,0,this.props.xsize,this.props.ysize,n),this.needsScalarReset=!1}if(this.needsVelocityReset){this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),f(this.gl,0,0,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]);let e;switch(this.velocitySelect.current?.value){case`curlnoise`:e=_(3,this.props.xsize,this.props.ysize,Math.random()*500);break;default:e=new Float32Array(this.props.xsize*this.props.ysize*2)}l(this.gl,0,0,this.props.xsize,this.props.ysize,e),this.needsVelocityReset=!1}for(let e=0;e<this.range.current.valueAsNumber;e++){this.gl.useProgram(this.prog_advect_scalar),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.scalarFramebuffers[(this.scalarIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.scalarIndex=(this.scalarIndex+1)%2,this.gl.useProgram(this.prog_advect_vel),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2,this.gl.useProgram(this.prog_divergence),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.gl.useProgram(this.prog_solve_pressure);for(let e=0;e<15;e++)this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.pressureFramebuffers[(this.pressureIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.pressureIndex=(this.pressureIndex+1)%2;this.gl.useProgram(this.prog_apply_pressure_force),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.velTextures[this.velIndex]),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.velFramebuffers[(this.velIndex+1)%2]),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.velIndex=(this.velIndex+1)%2}switch(this.gl.useProgram(this.prog_render),this.gl.activeTexture(this.gl.TEXTURE0),this.viewSelect.current?.value){case`PRESSURE`:this.gl.bindTexture(this.gl.TEXTURE_2D,this.pressureTextures[this.pressureIndex]),this.gl.uniform1f(this.renderMultiplier,1),this.gl.uniform1f(this.renderOffset,.5);break;case`DIVERGENCE`:this.gl.bindTexture(this.gl.TEXTURE_2D,this.divTexture),this.gl.uniform1f(this.renderMultiplier,100),this.gl.uniform1f(this.renderOffset,.5);break;default:this.gl.bindTexture(this.gl.TEXTURE_2D,this.scalarTextures[this.scalarIndex]),this.gl.uniform1f(this.renderMultiplier,1),this.gl.uniform1f(this.renderOffset,0)}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6);{let e=this.camera.getTrackballCameraMatrix(this.props.spheresize,this.props.spheresize);this.sphereGl.uniformMatrix4fv(this.sphereWorldViewProjectionLoc,!1,e),u(this.sphereGl,this.sphereTexture,this.canvas.current),this.sphereGl.activeTexture(this.sphereGl.TEXTURE0),this.sphereGl.bindTexture(this.sphereGl.TEXTURE_2D,this.sphereTexture),this.sphereGl.enable(this.sphereGl.BLEND),this.sphereGl.blendFunc(this.sphereGl.SRC_ALPHA,this.sphereGl.ONE_MINUS_SRC_ALPHA),this.sphereGl.drawArrays(this.sphereGl.TRIANGLES,0,P.length)}}}componentDidMount(){this.gl=this.canvas.current.getContext(`webgl2`),this.gl.getExtension(`EXT_color_buffer_float`);let e=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(v(1,1).flatMap(e=>[e[0],e[1]])),this.gl.STATIC_DRAW);for(let e=0;e<2;e++){let e=p(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.scalarTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.scalarFramebuffers.push(t)}for(let e=0;e<2;e++){let e=d(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize*2));this.velTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.velFramebuffers.push(t)}this.divTexture=p(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize)),this.divFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.divFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.divTexture,0);for(let e=0;e<2;e++){let e=p(this.gl,this.props.xsize,this.props.ysize,new Float32Array(this.props.xsize*this.props.ysize));this.pressureTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.pressureFramebuffers.push(t)}{this.prog_advect_scalar=h(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,w),m(this.gl,this.gl.FRAGMENT_SHADER,T)]);let e=this.gl.getAttribLocation(this.prog_advect_scalar,`c_position`),t=this.gl.getUniformLocation(this.prog_advect_scalar,`u_scalar_tex`),n=this.gl.getUniformLocation(this.prog_advect_scalar,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_scalar),this.gl.uniform1i(t,0),this.gl.uniform1i(n,1)}{this.prog_advect_vel=h(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,w),m(this.gl,this.gl.FRAGMENT_SHADER,E)]);let e=this.gl.getAttribLocation(this.prog_advect_vel,`c_position`),t=this.gl.getUniformLocation(this.prog_advect_vel,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_advect_vel),this.gl.uniform1i(t,1)}{this.prog_divergence=h(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,w),m(this.gl,this.gl.FRAGMENT_SHADER,D)]);let e=this.gl.getAttribLocation(this.prog_divergence,`c_position`),t=this.gl.getUniformLocation(this.prog_divergence,`u_vel_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_divergence),this.gl.uniform1i(t,1)}{this.prog_solve_pressure=h(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,w),m(this.gl,this.gl.FRAGMENT_SHADER,O)]);let e=this.gl.getAttribLocation(this.prog_solve_pressure,`c_position`),t=this.gl.getUniformLocation(this.prog_solve_pressure,`u_divergence_tex`),n=this.gl.getUniformLocation(this.prog_solve_pressure,`u_pressure_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_solve_pressure),this.gl.uniform1i(t,2),this.gl.uniform1i(n,3)}{this.prog_apply_pressure_force=h(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,w),m(this.gl,this.gl.FRAGMENT_SHADER,k)]);let e=this.gl.getAttribLocation(this.prog_apply_pressure_force,`c_position`),t=this.gl.getUniformLocation(this.prog_apply_pressure_force,`u_vel_tex`),n=this.gl.getUniformLocation(this.prog_apply_pressure_force,`u_pressure_tex`);this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_pressure_force),this.gl.uniform1i(t,1),this.gl.uniform1i(n,3)}{this.prog_render=h(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,w),m(this.gl,this.gl.FRAGMENT_SHADER,A)]);let e=this.gl.getAttribLocation(this.prog_render,`c_position`),t=this.gl.getUniformLocation(this.prog_render,`u_scalar_tex`),n=this.gl.getUniformLocation(this.prog_render,`u_vel_tex`);this.renderMultiplier=this.gl.getUniformLocation(this.prog_render,`u_multiplier`),this.renderOffset=this.gl.getUniformLocation(this.prog_render,`u_offset`),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_render),this.gl.uniform1i(t,0),this.gl.uniform1i(n,1)}{this.prog_paint_vel=h(this.gl,[m(this.gl,this.gl.VERTEX_SHADER,w),m(this.gl,this.gl.FRAGMENT_SHADER,j)]);let e=this.gl.getAttribLocation(this.prog_paint_vel,`c_position`),t=this.gl.getUniformLocation(this.prog_paint_vel,`u_vel_tex`);this.newMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,`u_new_mouse`),this.oldMouseLoc=this.gl.getUniformLocation(this.prog_paint_vel,`u_old_mouse`),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_paint_vel),this.gl.uniform1i(t,1)}{this.camera=new y(this.sphereCanvas.current,{}),this.sphereGl=this.sphereCanvas.current.getContext(`webgl2`,{premultipliedAlpha:!1}),this.sphereGl.enable(this.sphereGl.DEPTH_TEST),this.sphereTexture=c(this.sphereGl,this.props.spheresize,this.props.spheresize);let e=h(this.sphereGl,[m(this.sphereGl,this.sphereGl.VERTEX_SHADER,M),m(this.sphereGl,this.sphereGl.FRAGMENT_SHADER,N)]),t=this.sphereGl.getAttribLocation(e,`a_position`),n=this.sphereGl.getUniformLocation(e,`u_render_tex`);this.sphereThetaAlpha=this.sphereGl.getUniformLocation(e,`u_thetaAlpha`),this.spherePhiAlpha=this.sphereGl.getUniformLocation(e,`u_phiAlpha`),this.sphereLerpAlpha=this.sphereGl.getUniformLocation(e,`u_lerpAlpha`),this.sphereWorldViewProjectionLoc=this.sphereGl.getUniformLocation(e,`u_worldViewProjection`);let r=this.sphereGl.createBuffer();this.sphereGl.bindBuffer(this.sphereGl.ARRAY_BUFFER,r),this.sphereGl.bufferData(this.sphereGl.ARRAY_BUFFER,new Float32Array(P.flatMap(e=>[e[0],e[1]])),this.sphereGl.STATIC_DRAW),this.sphereGl.enableVertexAttribArray(t),this.sphereGl.vertexAttribPointer(t,2,this.sphereGl.FLOAT,!1,0,0),this.sphereGl.useProgram(e),this.sphereGl.uniform1f(this.sphereThetaAlpha,0),this.sphereGl.uniform1f(this.spherePhiAlpha,0),this.sphereGl.uniform1f(this.sphereLerpAlpha,0),this.sphereGl.uniform1i(n,0)}this.spherenessRange.current.addEventListener(`input`,this.handleSphereChange),this.thetaRange.current.addEventListener(`input`,this.handleCircularityChange),this.phiRange.current.addEventListener(`input`,this.handleCircularityChange),this.lerpRange.current.addEventListener(`input`,this.handleCircularityChange),this.cmt=new b(this.canvas.current),this.animationLoop()}componentWillUnmount(){this.cmt.cleanup(),this.spherenessRange.current.removeEventListener(`input`,this.handleSphereChange),this.thetaRange.current.removeEventListener(`input`,this.handleCircularityChange),this.phiRange.current.removeEventListener(`input`,this.handleCircularityChange),this.lerpRange.current.removeEventListener(`input`,this.handleCircularityChange),window.cancelAnimationFrame(this.requestID),this.camera.cleanup()}render(){return(0,C.jsx)(`div`,{style:this.props.style,className:this.props.className,children:(0,C.jsxs)(`div`,{className:`row`,children:[(0,C.jsx)(`div`,{className:`col-md-8 d-flex`,children:(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`canvas`,{className:`border border-dark mx-3 my-3`,ref:this.canvas,width:this.props.xsize,height:this.props.ysize}),(0,C.jsx)(`canvas`,{className:`border border-dark mx-3 my-3`,ref:this.sphereCanvas,width:this.props.spheresize,height:this.props.spheresize})]})}),(0,C.jsxs)(`div`,{className:`col-md-4`,children:[(0,C.jsxs)(`div`,{className:`border border-dark p-3 m-3`,children:[(0,C.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`Simulation Speed`}),(0,C.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`5`,step:1,defaultValue:1,ref:this.range})]}),(0,C.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`Scalar Field`}),(0,C.jsxs)(`select`,{className:`form-select mb-3`,defaultValue:8,ref:this.scalarSelect,children:[(0,C.jsx)(`option`,{value:1,children:`Empty`}),(0,C.jsx)(`option`,{value:2,children:`Grid 2`}),(0,C.jsx)(`option`,{value:8,children:`Grid 8`}),(0,C.jsx)(`option`,{value:64,children:`Grid 64`})]}),(0,C.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>this.needsScalarReset=!0,children:`Reset Scalar`})]}),(0,C.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`Velocity Field`}),(0,C.jsxs)(`select`,{className:`form-select mb-3`,defaultValue:8,ref:this.velocitySelect,children:[(0,C.jsx)(`option`,{value:`empty`,children:`Empty`}),(0,C.jsx)(`option`,{value:`curlnoise`,children:`Curl Noise`})]}),(0,C.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>this.needsVelocityReset=!0,children:`Reset Velocity`})]}),(0,C.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`View Field`}),(0,C.jsxs)(`select`,{className:`form-select`,defaultValue:`SCALAR`,ref:this.viewSelect,children:[(0,C.jsx)(`option`,{value:`SCALAR`,children:`Scalar`}),(0,C.jsx)(`option`,{value:`PRESSURE`,children:`Pressure`}),(0,C.jsx)(`option`,{value:`DIVERGENCE`,children:`Divergence`})]})]})]}),(0,C.jsxs)(`div`,{className:`border border-dark p-3 m-3`,children:[(0,C.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`Sphereness`}),(0,C.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`1`,step:`0.05`,defaultValue:`0`,ref:this.spherenessRange})]}),(0,C.jsx)(`div`,{className:`form-group mb-3`,children:(0,C.jsxs)(`details`,{children:[(0,C.jsx)(`summary`,{children:`Advanced Sphere Controls`}),(0,C.jsxs)(`div`,{className:`mx-auto d-block flex-grow-1 `,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`Join Major`}),(0,C.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`1`,step:`0.05`,defaultValue:`0`,ref:this.thetaRange})]}),(0,C.jsxs)(`div`,{className:`mx-auto d-block flex-grow-1 `,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`Join Minor`}),(0,C.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`1`,step:`0.05`,defaultValue:`0`,ref:this.phiRange})]}),(0,C.jsxs)(`div`,{className:`mx-auto d-block flex-grow-1 `,children:[(0,C.jsx)(`label`,{className:`form-label`,children:`Alpha`}),(0,C.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`1`,step:`0.05`,defaultValue:`0`,ref:this.lerpRange})]})]})})]})]})]})})}},I=e(r());x(),(0,I.createRoot)(document.getElementById(`root`)).render((0,C.jsx)(S.StrictMode,{children:(0,C.jsx)(()=>(0,C.jsx)(a,{children:(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(o,{id:`overview`,name:`Overview`,children:[(0,C.jsx)(`p`,{children:`Our goals are to:`}),(0,C.jsxs)(`ul`,{children:[(0,C.jsx)(`li`,{children:`Map the fluid simulation onto a sphere.`}),(0,C.jsx)(`li`,{children:`Make the fluid simulation 3D.`})]})]}),(0,C.jsxs)(o,{id:`Fluid3-unmapped-sphere`,name:`Incompressible Fluid on a Sphere`,children:[(0,C.jsx)(`p`,{children:`Incompressible`}),(0,C.jsx)(s,{title:`Canvas Setup`,id:`canvas-setup-demo`,children:(0,C.jsx)(F,{className:`mx-auto`,style:{maxWidth:`40em`},xsize:400,ysize:400,spheresize:400})})]}),(0,C.jsx)(o,{id:`sources`,name:`Sources`,children:(0,C.jsx)(i,{})})]})}),{})}));