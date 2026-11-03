import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import"./modulepreload-polyfill-P2Xu9kJm.js";import{n as t,r as n,t as r}from"./client-DyL1ZotQ.js";import{t as i}from"./Section-CMotTF6f.js";import{t as a}from"./HrefLink-DD7POFgk.js";import{t as o}from"./ArticleLayout-Chegvux2.js";import{t as s}from"./AsideCard-CeAOR7pj.js";import{d as c,i as l,l as u,n as d,r as f,s as p,t as m,u as h}from"./webgl-C5zzwcd9.js";import{t as g}from"./bootstrap-sMF1ce4T.js";var _=e(n()),v=t(),y=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
`,b=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

const float G = 0.001;

void main() {
  // get the resolution
  ivec2 resolution = textureSize(u_particle_mass_tex, 0);

  float x_off = 1.0/float(resolution.x);
  float y_off = 1.0/float(resolution.y);

  // our current position
  vec2 pos1 = texture(u_particle_position_tex, v_texCoord).xy;

  vec2 p = texture(u_particle_momentum_tex, v_texCoord).xy;

  uint state1 = texture(u_particle_state_tex, v_texCoord).x;
  if(state1 == 0u) {
    for(int y = 0; y < resolution.y; y++) {
      for(int x = 0; x < resolution.x; x++) {
        vec2 loc = vec2(float(x)*x_off, float(y)*y_off);
        uint state2 = texture(u_particle_state_tex, loc).x;
        if(state2 == 0u) {
          float m2 = texture(u_particle_mass_tex, loc).x;
          vec2 pos2 = texture(u_particle_position_tex, loc).xy;
          vec2 r_vec = pos2-pos1;
          float r_mag = length(r_vec);
          vec2 r_hat = r_vec/r_mag;
          vec2 accel = G*m2*r_hat/(r_mag*r_mag);
          if(!isnan(accel.x) && !isnan(accel.y)) {
            p += accel;
          }
        }
      }
    }
  }

  // apply momentum
  value = vec4(p, 0, 0);
}
`,x=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  uint state = texture(u_particle_state_tex, v_texCoord).x;
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  vec2 position = texture(u_particle_position_tex, v_texCoord).xy;
  vec2 momentum = texture(u_particle_momentum_tex, v_texCoord).xy;

  // change position only if live
  if(state == 0u) {
    position = position + momentum/mass;
  }

  value = vec4(position , 0, 1);
}
`,S=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the particle texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out vec4 value;

void main() {
  float mass = texture(u_particle_mass_tex, v_texCoord).x;
  value = vec4(mass, 0, 0, 1);
}
`,C=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp usampler2D;

// the state texture
uniform usampler2D u_particle_state_tex;

// the particle texture
uniform sampler2D u_particle_mass_tex;

// the position texture
uniform sampler2D u_particle_position_tex;

// the momentum texture
uniform sampler2D u_particle_momentum_tex;


// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// the output
out uvec4 value;

const vec2 upperCorner = vec2(0, 0);
const vec2 lowerCorner = vec2(512, 512);

void main() {
  uint state = texture(u_particle_state_tex, v_texCoord).x;
  vec2 position = texture(u_particle_position_tex, v_texCoord).xy;
  if(position == clamp(position, upperCorner, lowerCorner)) {
    value = uvec4(state, 0, 0, 1);
  } else {
    value = uvec4(1, 0, 0, 1);
  }
}
`,w=class extends _.Component{constructor(e){super(e),this.particle_tex_xsize=2,this.particle_tex_ysize=2,this.particle_canvas=_.createRef(),this.render_canvas=_.createRef(),this.range=_.createRef(),this.scalarSelect=_.createRef(),this.velocitySelect=_.createRef(),this.particleStateTextures=[],this.particleStateFramebuffers=[],this.particleMassTextures=[],this.particleMassFramebuffers=[],this.particlePositionTextures=[],this.particlePositionFramebuffers=[],this.particleMomentumTextures=[],this.particleMomentumFramebuffers=[],this.particleStateIndex=0,this.particleMassIndex=0,this.particlePositionIndex=0,this.particleMomentumIndex=0,this.needsReset=!0,this.mousePos=null,this.state_data=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.mass_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.position_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.momentum_data=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*4),this.animationLoop=()=>{if(this.requestID=window.requestAnimationFrame(this.animationLoop),this.needsReset){let e=new Uint32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let t=0;t<e.length;t++)e[t]=0;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),h(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,e);let t=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize);for(let e=0;e<t.length;e++)t[e]=Math.random()*50;this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),u(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,t);let n=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let e=0;e<this.particle_tex_ysize;e++)for(let t=0;t<this.particle_tex_xsize;t++){let r=e*this.particle_tex_xsize+t;n[r*2+0]=t*20+32,n[r*2+1]=e*20+32}this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),c(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,n);let r=new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2);for(let e=0;e<this.particle_tex_ysize;e++)for(let t=0;t<this.particle_tex_xsize;t++){let n=e*this.particle_tex_xsize+t;r[n*2+0]=(Math.random()-.5)*0,r[n*2+1]=(Math.random()-.5)*0}this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]),c(this.gl,0,0,this.particle_tex_xsize,this.particle_tex_ysize,r),this.needsReset=!1}for(let e=0;e<this.range.current.valueAsNumber;e++){{this.gl.useProgram(this.prog_handle_state),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);let e=this.particleStateTextures[this.particleStateIndex],t=this.particleStateFramebuffers[(this.particleStateIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleStateIndex=(this.particleStateIndex+1)%2}{this.gl.useProgram(this.prog_handle_mass),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]);let e=this.particleMassTextures[this.particleMassIndex],t=this.particleMassFramebuffers[(this.particleMassIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMassIndex=(this.particleMassIndex+1)%2}{this.gl.useProgram(this.prog_apply_gravity),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]);let e=this.particleMomentumTextures[this.particleMomentumIndex],t=this.particleMomentumFramebuffers[(this.particleMomentumIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particleMomentumIndex=(this.particleMomentumIndex+1)%2}{this.gl.useProgram(this.prog_move_particle),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMassTextures[this.particleMassIndex]),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleMomentumTextures[this.particleMomentumIndex]);let e=this.particlePositionTextures[this.particlePositionIndex],t=this.particlePositionFramebuffers[(this.particlePositionIndex+1)%2];this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.particlePositionIndex=(this.particlePositionIndex+1)%2}}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleStateFramebuffers[this.particleStateIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA_INTEGER,this.gl.UNSIGNED_INT,this.state_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMassFramebuffers[this.particleMassIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.mass_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particlePositionFramebuffers[this.particlePositionIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.position_data),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.particleMomentumFramebuffers[this.particleMomentumIndex]),this.gl.readPixels(0,0,this.particle_tex_xsize,this.particle_tex_ysize,this.gl.RGBA,this.gl.FLOAT,this.momentum_data),this.draw(this.state_data,this.mass_data,this.position_data,this.momentum_data)},this.editData=null,this.handleMouseDown=e=>{let t=this.getMousePos(this.render_canvas.current,e);this.mousePos={current:t,previous:t};for(let e=0;e<this.position_data.length/4;e++)if(this.state_data[e*4]==0){let n=this.calcRadius(this.mass_data[e*4]);if(Math.hypot(t.x-this.position_data[e*4+0],t.y-this.position_data[e*4+1])<n){this.editData={id:e,dragging:t},this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),h(this.gl,e%this.particle_tex_xsize,e/this.particle_tex_xsize,1,1,Uint32Array.from([1]));break}}},this.handleMouseUp=e=>{this.editData?.dragging&&(this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),c(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particleStateTextures[this.particleStateIndex]),h(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Uint32Array.from([0])),this.editData.dragging=null),this.mousePos=null},this.handleMouseMove=e=>{if(!this.mousePos)return;let t=this.getMousePos(this.render_canvas.current,e);this.mousePos={current:t,previous:this.mousePos.current},this.editData?.dragging&&(this.editData.dragging=t,this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.particlePositionTextures[this.particlePositionIndex]),c(this.gl,this.editData.id%this.particle_tex_xsize,this.editData.id/this.particle_tex_xsize,1,1,Float32Array.from([this.editData.dragging.x,this.editData.dragging.y])))},this.discardTouchEvent=e=>e.preventDefault(),this.calcRadius=e=>1.5*Math.sqrt(e)+5,this.draw=(e,t,n,r)=>{let i=this.render_canvas.current,a=this.render_canvas.current.getContext(`2d`);a.fillStyle=`#000000`,a.fillRect(0,0,i.width,i.height),a.strokeStyle=`#FF0000`;for(let i=0;i<n.length/4;i++){let o=e[i*4],s=n[i*4+0],c=n[i*4+1],l=t[i*4],u=Math.sqrt(l);switch(a.beginPath(),a.arc(s,c,u,0,2*Math.PI),o){case 0:a.fillStyle=`#FFFFFF`;break;default:a.fillStyle=`#FF0000`}a.fill(),a.beginPath(),a.moveTo(s,c);let d=r[i*4+0]/l,f=r[i*4+1]/l;a.lineTo(s+d,c+f),a.stroke(),i==this.editData?.id&&(a.strokeStyle=`#0000FF`,a.beginPath(),a.arc(s,c,this.calcRadius(l),0,2*Math.PI),a.stroke(),a.strokeStyle=`#FF0000`)}}}componentDidMount(){this.gl=this.particle_canvas.current.getContext(`webgl2`),this.gl.getExtension(`EXT_color_buffer_float`);for(let e=0;e<2;e++){let e=f(this.gl,this.particle_tex_xsize,this.particle_tex_ysize);this.particleStateTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleStateFramebuffers.push(t)}for(let e=0;e<2;e++){let e=d(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize));this.particleMassTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMassFramebuffers.push(t)}for(let e=0;e<2;e++){let e=l(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particlePositionTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particlePositionFramebuffers.push(t)}for(let e=0;e<2;e++){let e=l(this.gl,this.particle_tex_xsize,this.particle_tex_ysize,new Float32Array(this.particle_tex_xsize*this.particle_tex_ysize*2));this.particleMomentumTextures.push(e);let t=this.gl.createFramebuffer();this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,e,0),this.particleMomentumFramebuffers.push(t)}let e=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),this.gl.STATIC_DRAW);{this.prog_apply_gravity=m(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,y),p(this.gl,this.gl.FRAGMENT_SHADER,b)]);let t=this.gl.getAttribLocation(this.prog_apply_gravity,`a_position`),n=this.gl.getUniformLocation(this.prog_apply_gravity,`u_particle_state_tex`),r=this.gl.getUniformLocation(this.prog_apply_gravity,`u_particle_mass_tex`),i=this.gl.getUniformLocation(this.prog_apply_gravity,`u_particle_position_tex`),a=this.gl.getUniformLocation(this.prog_apply_gravity,`u_particle_momentum_tex`);this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_apply_gravity),this.gl.uniform1i(n,0),this.gl.uniform1i(r,1),this.gl.uniform1i(i,2),this.gl.uniform1i(a,3)}{this.prog_move_particle=m(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,y),p(this.gl,this.gl.FRAGMENT_SHADER,x)]);let t=this.gl.getAttribLocation(this.prog_move_particle,`a_position`),n=this.gl.getUniformLocation(this.prog_move_particle,`u_particle_state_tex`),r=this.gl.getUniformLocation(this.prog_move_particle,`u_particle_mass_tex`),i=this.gl.getUniformLocation(this.prog_move_particle,`u_particle_position_tex`),a=this.gl.getUniformLocation(this.prog_move_particle,`u_particle_momentum_tex`);this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_move_particle),this.gl.uniform1i(n,0),this.gl.uniform1i(r,1),this.gl.uniform1i(i,2),this.gl.uniform1i(a,3)}{this.prog_handle_mass=m(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,y),p(this.gl,this.gl.FRAGMENT_SHADER,S)]);let t=this.gl.getAttribLocation(this.prog_handle_mass,`a_position`),n=this.gl.getUniformLocation(this.prog_handle_mass,`u_particle_state_tex`),r=this.gl.getUniformLocation(this.prog_handle_mass,`u_particle_mass_tex`);this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_mass),this.gl.uniform1i(n,0),this.gl.uniform1i(r,1)}{this.prog_handle_state=m(this.gl,[p(this.gl,this.gl.VERTEX_SHADER,y),p(this.gl,this.gl.FRAGMENT_SHADER,C)]);let t=this.gl.getAttribLocation(this.prog_handle_state,`a_position`),n=this.gl.getUniformLocation(this.prog_handle_state,`u_particle_state_tex`),r=this.gl.getUniformLocation(this.prog_handle_state,`u_particle_mass_tex`),i=this.gl.getUniformLocation(this.prog_handle_state,`u_particle_position_tex`),a=this.gl.getUniformLocation(this.prog_handle_state,`u_particle_momentum_tex`);this.gl.enableVertexAttribArray(t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0),this.gl.useProgram(this.prog_handle_state),this.gl.uniform1i(n,0),this.gl.uniform1i(r,1),this.gl.uniform1i(i,2),this.gl.uniform1i(a,3)}this.render_canvas.current.addEventListener(`pointerdown`,this.handleMouseDown),this.render_canvas.current.addEventListener(`pointermove`,this.handleMouseMove),window.addEventListener(`pointerup`,this.handleMouseUp),this.render_canvas.current.addEventListener(`touchstart`,this.discardTouchEvent),this.render_canvas.current.addEventListener(`touchmove`,this.discardTouchEvent),this.render_canvas.current.addEventListener(`touchend`,this.discardTouchEvent),this.render_canvas.current.addEventListener(`touchcancel`,this.discardTouchEvent),this.animationLoop()}getMousePos(e,t){let n=e.getBoundingClientRect(),r=e.width/n.width,i=e.height/n.height;return{x:(t.clientX-n.left)*r,y:(t.clientY-n.top)*i}}componentWillUnmount(){this.render_canvas.current.removeEventListener(`pointerdown`,this.handleMouseDown),this.render_canvas.current.removeEventListener(`pointermove`,this.handleMouseMove),window.removeEventListener(`pointerup`,this.handleMouseUp),this.render_canvas.current.removeEventListener(`touchstart`,this.discardTouchEvent),this.render_canvas.current.removeEventListener(`touchmove`,this.discardTouchEvent),this.render_canvas.current.removeEventListener(`touchend`,this.discardTouchEvent),this.render_canvas.current.removeEventListener(`touchcancel`,this.discardTouchEvent),window.cancelAnimationFrame(this.requestID)}render(){return(0,v.jsxs)(`div`,{style:this.props.style,className:this.props.className,children:[(0,v.jsx)(`div`,{children:(0,v.jsx)(`canvas`,{className:`border border-dark`,ref:this.particle_canvas,height:this.particle_tex_xsize,width:this.particle_tex_ysize,hidden:!0})}),(0,v.jsxs)(`div`,{className:`row`,children:[(0,v.jsx)(`div`,{className:`col-md-8 d-flex`,children:(0,v.jsx)(`canvas`,{className:`border border-dark`,ref:this.render_canvas,height:this.props.size,width:this.props.size})}),(0,v.jsx)(`div`,{className:`col-md-4`,children:(0,v.jsxs)(`div`,{className:`border border-dark p-3 m-3`,children:[(0,v.jsx)(`h6`,{children:`Controls`}),(0,v.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,v.jsx)(`label`,{className:`form-label`,children:`Simulation Speed`}),(0,v.jsx)(`input`,{type:`range`,className:`form-range`,min:`0`,max:`5`,step:1,defaultValue:1,ref:this.range})]}),(0,v.jsxs)(`div`,{className:`form-group mb-3`,children:[(0,v.jsx)(`label`,{className:`form-label`,children:`Scalar Field`}),(0,v.jsxs)(`select`,{className:`form-select mb-3`,defaultValue:8,ref:this.scalarSelect,children:[(0,v.jsx)(`option`,{value:32,children:`2^6: 64`}),(0,v.jsx)(`option`,{value:32,children:`2^6: 64`}),(0,v.jsx)(`option`,{value:16,children:`2^8 64`})]}),(0,v.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>this.needsReset=!0,children:`Reset`})]})]})})]})]})}},T=e(r());g(),(0,T.createRoot)(document.getElementById(`root`)).render((0,v.jsx)(_.StrictMode,{children:(0,v.jsx)(()=>(0,v.jsx)(o,{children:(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(i,{name:`Spacewar`,id:`spacewar`,children:[(0,v.jsx)(`p`,{children:(0,v.jsx)(a,{href:`https://github.com/pimpale/spacewar`})}),(0,v.jsx)(`p`,{children:(0,v.jsx)(a,{href:`https://github.com/pimpale/GravitySimulator`})}),(0,v.jsx)(s,{title:`Canvas Setup`,id:`canvas-setup-demo`,children:(0,v.jsx)(w,{className:`mx-auto`,style:{maxWidth:`50em`},size:512})})]})})}),{})}));