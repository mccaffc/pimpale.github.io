import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import"./modulepreload-polyfill-P2Xu9kJm.js";import{n as t,r as n,t as r}from"./client-DyL1ZotQ.js";import{C as i,O as a,T as o,a as s,b as c,c as l,d as u,h as d,i as f,j as p,l as m,n as h,o as g,r as _,t as v,v as y,w as b,x,y as S}from"./quat-k9g8t3-t.js";import{n as C,r as w,t as T}from"./vec2-WjoyH_Mq.js";var E=e(n()),D=e(r());function O(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}function k(e,t){let n=e.createProgram();for(let r of t)e.attachShader(n,r);if(e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;for(let n of t){if(!e.getShaderParameter(n,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(n));e.deleteShader(n)}return console.log(e.getProgramInfoLog(n)),e.deleteProgram(n),null}function A(e,t,n){let r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,n,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array(t*n*4)),r}function j(e,t,n,r){let i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,n,0,e.RGBA,e.FLOAT,r),i}function M(e,t,n,r){let i=e.createTexture();return e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.DEPTH_COMPONENT32F,t,n,0,e.DEPTH_COMPONENT,e.FLOAT,r),i}function N(e){return e*Math.PI/180}function P(e){let t=e.x,n=e.y,r;return r=t*t+n*n<=1/2?Math.sqrt(1-t*t-n*n):1/2/Math.sqrt(t*t+n*n),new Float32Array([t,-n,r])}var ee=47,F=class{constructor(e,t){this.mouseLoc=null,this.baseQ=v(),this.currQ=v(),this.momentumQ=v(),this.offsetRadius=1,this.currentMomentumLevel=0,this.getNormalizedMouseCoords=e=>{let t=this.canvas.getBoundingClientRect(),n=(t.left+t.right)/2,r=(t.top+t.bottom)/2,i=t.right-t.left,a=t.bottom-t.top,o=Math.min(i,a);return{x:2*(e.clientX-n)/o,y:2*(e.clientY-r)/o}},this.fov=()=>N(ee),this.handleMouseDown=e=>{let t=this.getNormalizedMouseCoords(e);this.mouseLoc={start:t,current:t,previous:t}},this.handleScroll=e=>{this.offsetRadius+=e.deltaY/50,e.preventDefault()},this.handleMouseMove=e=>{if(this.mouseLoc===null)return;this.mouseLoc.previous=this.mouseLoc.current,this.mouseLoc.current=this.getNormalizedMouseCoords(e);let t=P(this.mouseLoc.start),n=P(this.mouseLoc.current);d(t,t),d(n,n),f(this.currQ,t,n)},this.handleMouseUp=e=>{if(this.mouseLoc===null)return;let t=P(this.mouseLoc.previous),n=P(this.mouseLoc.current);d(t,t),d(n,n),f(this.momentumQ,t,n),_(this.baseQ,this.currQ,this.baseQ),this.currQ=v(),this.mouseLoc=null,this.currentMomentumLevel=1},this.discardTouchEvent=e=>e.preventDefault(),this.cleanup=()=>{this.canvas.removeEventListener(`pointerdown`,this.handleMouseDown),this.canvas.removeEventListener(`wheel`,this.handleScroll),window.removeEventListener(`pointermove`,this.handleMouseMove),window.removeEventListener(`pointerup`,this.handleMouseUp),this.canvas.removeEventListener(`touchstart`,this.discardTouchEvent),this.canvas.removeEventListener(`touchmove`,this.discardTouchEvent),this.canvas.removeEventListener(`touchend`,this.discardTouchEvent),this.canvas.removeEventListener(`touchcancel`,this.discardTouchEvent)},this.update=()=>{if(this.mouseLoc===null){let e=g(v(),this.rotationQ,this.momentumQ,this.currentMomentumLevel);this.currentMomentumLevel*=this.dampingFactor,_(this.baseQ,e,this.baseQ)}},this.viewMatrix=()=>{let e=_(v(),this.currQ,this.baseQ);return i(c(),e,[0,0,-this.offsetRadius])},this.viewProjMatrix=(e,t)=>{let n=a(c(),this.fov(),e/t,1,1e3),r=this.viewMatrix();return o(c(),n,r)},this.rotationQ=t.rotation?t.rotation:v(),this.dampingFactor=t.dampingFactor===void 0?.9:t.dampingFactor,this.canvas=e,this.canvas.addEventListener(`pointerdown`,this.handleMouseDown),this.canvas.addEventListener(`wheel`,this.handleScroll),window.addEventListener(`pointermove`,this.handleMouseMove),window.addEventListener(`pointerup`,this.handleMouseUp),this.canvas.addEventListener(`touchstart`,this.discardTouchEvent),this.canvas.addEventListener(`touchmove`,this.discardTouchEvent),this.canvas.addEventListener(`touchend`,this.discardTouchEvent),this.canvas.addEventListener(`touchcancel`,this.discardTouchEvent)}};function I(e){let t=performance.now(),n=new TextDecoder(`utf-8`).decode(e.slice(0,2e3)),r=n.indexOf(`end_header`)+10+1,[i]=n.split(`end_header`),a=i.match(/element vertex (\d+)/);if(!a)throw Error(`Invalid PLY file: missing "element vertex"`);let o=parseInt(a[1]),s=[],c=[],l=[],u=[],d=[],f=e=>1/(1+Math.exp(-e)),p=new DataView(e),m=(e,t,n)=>{let i=r+e*62*4+t*4;return new Float32Array(n-t).map((e,t)=>p.getFloat32(i+t*4,!0))},h=(e,t)=>{let n=r+e*62*4+t*4;return p.getFloat32(n,!0)},g=e=>({position:m(e,0,3),harmonic:m(e,6,9),opacity:h(e,54),scale:m(e,55,58),rotation:m(e,58,62)});for(let e=0;e<o;e++){let{position:t,harmonic:n,opacity:r,scale:i,rotation:a}=g(e),o=0;for(let e=0;e<4;e++)o+=a[e]*a[e];let p=Math.sqrt(o);a=a.map(e=>e/p),l.push(a[1],a[2],a[3],a[0]),i=i.map(e=>Math.exp(e)),u.push(...i),r=f(r),c.push(r);let m=.28209479177387814,h=[.5+m*n[0],.5+m*n[1],.5+m*n[2]];d.push(...h),s.push(...t)}return console.log(`Loaded ${o} gaussians in ${((performance.now()-t)/1e3).toFixed(3)}s`),{count:o,positions:Float32Array.from(s),opacities:Float32Array.from(c),colors:Float32Array.from(d),scales:Float32Array.from(u),rotations:Float32Array.from(l)}}function L(e,t){if(!e)throw Error(t)}function R(e,t){L(e>0),L(t>0);let n=[];for(let r=0;r<e;r++){let i=r/e,a=(r+1)/e;for(let e=0;e<t;e++){let r=e/t,o=(e+1)/t;n.push(C(i,r)),n.push(C(a,r)),n.push(C(i,o)),n.push(C(a,r)),n.push(C(a,o)),n.push(C(i,o))}}return n}var z=class{constructor(e){this.mousePos=null,this.mouseDownListeners=[],this.mouseDragListeners=[],this.mouseMoveListeners=[],this.mouseUpListeners=[],this.mouseClickListeners=[],this.keyDownListeners=[],this.addMouseDownListener=e=>{this.mouseDownListeners.push(e)},this.removeMouseDownListener=e=>{this.mouseDownListeners=this.mouseDownListeners.filter(t=>t!==e)},this.addMouseDragListener=e=>{this.mouseDragListeners.push(e)},this.removeMouseDragListener=e=>{this.mouseDragListeners=this.mouseDragListeners.filter(t=>t!==e)},this.addMouseMoveListener=e=>{this.mouseMoveListeners.push(e)},this.removeMouseMoveListener=e=>{this.mouseMoveListeners=this.mouseMoveListeners.filter(t=>t!==e)},this.addMouseUpListener=e=>{this.mouseUpListeners.push(e)},this.removeMouseUpListener=e=>{this.mouseUpListeners=this.mouseUpListeners.filter(t=>t!==e)},this.addMouseClickListener=e=>{this.mouseClickListeners.push(e)},this.removeMouseClickListener=e=>{this.mouseClickListeners=this.mouseClickListeners.filter(t=>t!==e)},this.addKeyDownListener=e=>{this.keyDownListeners.push(e)},this.removeKeyDownListener=e=>{this.keyDownListeners=this.keyDownListeners.filter(t=>t!==e)},this.handleMouseDown=e=>{let t=this.getMousePos(this.canvas,e);this.mousePos={current:t,previous:t};for(let e of this.mouseDownListeners)e(t)},this.handleMouseUp=e=>{this.mousePos=null;let t=this.getMousePos(this.canvas,e);for(let e of this.mouseUpListeners)e(t)},this.handleMouseDrag=e=>{let t=this.getMousePos(this.canvas,e);for(let e of this.mouseMoveListeners)e(t);if(this.mousePos){this.mousePos={current:t,previous:this.mousePos.current};for(let e of this.mouseDragListeners)e(t)}},this.handleMouseClick=e=>{let t=this.getMousePos(this.canvas,e);for(let e of this.mouseClickListeners)e(t)},this.handleKeyDown=e=>{for(let t of this.keyDownListeners)t(e.key)},this.discardTouchEvent=e=>e.preventDefault(),this.cleanup=()=>{this.canvas.removeEventListener(`pointerdown`,this.handleMouseDown),this.canvas.removeEventListener(`pointermove`,this.handleMouseDrag),window.removeEventListener(`pointerup`,this.handleMouseUp),this.canvas.removeEventListener(`dblclick`,this.handleMouseClick),this.canvas.removeEventListener(`keydown`,this.handleKeyDown),this.canvas.removeEventListener(`touchstart`,this.discardTouchEvent),this.canvas.removeEventListener(`touchmove`,this.discardTouchEvent),this.canvas.removeEventListener(`touchend`,this.discardTouchEvent),this.canvas.removeEventListener(`touchcancel`,this.discardTouchEvent)},this.canvas=e,this.canvas.addEventListener(`pointerdown`,this.handleMouseDown),this.canvas.addEventListener(`pointermove`,this.handleMouseDrag),window.addEventListener(`pointerup`,this.handleMouseUp),this.canvas.addEventListener(`dblclick`,this.handleMouseClick),this.canvas.addEventListener(`keydown`,this.handleKeyDown),this.canvas.addEventListener(`touchstart`,this.discardTouchEvent),this.canvas.addEventListener(`touchmove`,this.discardTouchEvent),this.canvas.addEventListener(`touchend`,this.discardTouchEvent),this.canvas.addEventListener(`touchcancel`,this.discardTouchEvent)}getMousePos(e,t){let n=e.getBoundingClientRect(),r=e.width/n.width,i=e.height/n.height;return[(t.clientX-n.left)*r,(t.clientY-n.top)*i]}};function B(e=1){let t=[],n=[u(1,0,0),u(0,1,0),u(0,0,1)],r=[u(e,0,0),u(0,e,0),u(0,0,e)];for(let e=0;e<3;e++)t.push({position:m(),color:n[e]}),t.push({position:r[e],color:n[e]});return t}var V=t(),H=new Float32Array(R(1,1).flatMap(e=>[e[0],e[1]])),U=`#version 300 es
layout(location=0) in vec3 a_center;
layout(location=1) in vec3 a_col;
layout(location=2) in float a_opacity;
layout(location=3) in vec3 a_covA;
layout(location=4) in vec3 a_covB;
layout(location=5) in uint a_objId;

uniform float W;
uniform float H;
uniform float focal_x;
uniform float focal_y;
uniform float tan_fovx;
uniform float tan_fovy;
uniform float scale_modifier;
uniform mat4 projmatrix;
uniform mat4 viewmatrix;
uniform vec3 boxmin;
uniform vec3 boxmax;

out vec3 splat_color;
out float depth;
out float scale_modif;
out vec4 con_o;
out vec2 xy;
out vec2 pixf;
flat out uint objId;

vec3 computeCov2D(vec3 mean, float focal_x, float focal_y, float tan_fovx, float tan_fovy, float[6] cov3D, mat4 viewmatrix) {
    vec4 t = viewmatrix * vec4(mean, 1.0);

    float limx = 1.3 * tan_fovx;
    float limy = 1.3 * tan_fovy;
    float txtz = t.x / t.z;
    float tytz = t.y / t.z;
    t.x = min(limx, max(-limx, txtz)) * t.z;
    t.y = min(limy, max(-limy, tytz)) * t.z;

    mat3 J = mat3(
        focal_x / t.z, 0, -(focal_x * t.x) / (t.z * t.z),
        0, focal_y / t.z, -(focal_y * t.y) / (t.z * t.z),
        0, 0, 0
    );

    mat3 W =  mat3(
        viewmatrix[0][0], viewmatrix[1][0], viewmatrix[2][0],
        viewmatrix[0][1], viewmatrix[1][1], viewmatrix[2][1],
        viewmatrix[0][2], viewmatrix[1][2], viewmatrix[2][2]
    );

    mat3 T = W * J;

    mat3 Vrk = mat3(
        cov3D[0], cov3D[1], cov3D[2],
        cov3D[1], cov3D[3], cov3D[4],
        cov3D[2], cov3D[4], cov3D[5]
    );

    mat3 cov = transpose(T) * transpose(Vrk) * T;

    cov[0][0] += .3;
    cov[1][1] += .3;
    return vec3(cov[0][0], cov[0][1], cov[1][1]);
}

float ndc2Pix(float v, float S) {
    return ((v + 1.) * S - 1.) * .5;
}

#define hash33(p) fract(sin( (p) * mat3( 127.1,311.7,74.7 , 269.5,183.3,246.1 , 113.5,271.9,124.6) ) *43758.5453123)

// Original CUDA implementation: https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu#L156
void main() {
    vec3 p_orig = a_center;

    // Discard splats outside of the scene bounding box (should not happen)
    // if (p_orig.x < boxmin.x || p_orig.y < boxmin.y || p_orig.z < boxmin.z ||
    //     p_orig.x > boxmax.x || p_orig.y > boxmax.y || p_orig.z > boxmax.z) {
    //         gl_Position = vec4(0, 0, 0, 1);
    //         return;
    //     }

    // Transform point by projecting
    vec4 p_hom = projmatrix * vec4(p_orig, 1);
    float p_w = 1. / (p_hom.w + 1e-7);
    vec3 p_proj = p_hom.xyz * p_w;

    // Perform near culling, quit if outside.
    vec4 p_view = viewmatrix * vec4(p_orig, 1);
    if (p_view.z <= .4) {
        gl_Position = vec4(0, 0, 0, 1);
        return;
    }

    // (Webgl-specific) The covariance matrix is pre-computed on the CPU for faster performance
    float cov3D[6] = float[6](a_covA.x, a_covA.y, a_covA.z, a_covB.x, a_covB.y, a_covB.z);
    // computeCov3D(a_scale, scale_modifier, a_rot, cov3D);

    // Compute 2D screen-space covariance matrix
    vec3 cov = computeCov2D(p_orig, focal_x, focal_y, tan_fovx, tan_fovy, cov3D, viewmatrix);

    // Invert covariance (EWA algorithm)
    float det = (cov.x * cov.z - cov.y * cov.y);
    if (det == 0.) {
        gl_Position = vec4(0, 0, 0, 1);
        return;
    }
    float det_inv = 1. / det;
    vec3 conic = vec3(cov.z, -cov.y, cov.x) * det_inv;

    // Compute extent in screen space (by finding eigenvalues of
    // 2D covariance matrix). Use extent to compute the bounding
    // rectangle of the splat in screen space.

    float mid = 0.5 * (cov.x + cov.z);
    float lambda1 = mid + sqrt(max(0.1, mid * mid - det));
    float lambda2 = mid - sqrt(max(0.1, mid * mid - det));
    float my_radius = ceil(3. * sqrt(max(lambda1, lambda2)));
    vec2 point_image = vec2(ndc2Pix(p_proj.x, W), ndc2Pix(p_proj.y, H));

    // (Webgl-specific) As the covariance matrix is calculated as a one-time operation on CPU in this implementation,
    // we need to apply the scale modifier differently to still allow for real-time scaling of the splats.
    my_radius *= .15 + scale_modifier * .85;
    scale_modif = 1. / scale_modifier;

    // (Webgl-specific) Convert gl_VertexID from [0,1,2,3] to [-1,-1],[1,-1],[-1,1],[1,1]
    vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) - 1.;
    // Vertex position in screen space
    vec2 screen_pos = point_image + my_radius * corner;

    // Store some useful helper data for the fragment stage
    splat_color = a_col;
    con_o = vec4(conic, a_opacity);
    xy = point_image;
    pixf = screen_pos;
    depth = p_view.z;
    objId = a_objId;

    // (Webgl-specific) Convert from screen-space to clip-space
    vec2 clip_pos = screen_pos / vec2(W, H) * 2. - 1.;

    gl_Position = vec4(clip_pos, 0, 1);
}`,W=`#version 300 es
precision highp float;

// time
uniform float time;

// which object is selected
uniform uint selectedObjectId;

// 0 = render all objects
// 1 = render only selected object
// 2 = highlight selected object
uniform uint selectedObjectRenderMode;

in vec3 splat_color;
in float scale_modif;
in float depth;
in vec4 con_o;
in vec2 xy;
in vec2 pixf;
flat in uint objId;

layout(location=0) out vec4 fragColor;
layout(location=1) out vec4 fragInvDepth;

vec3 depth_palette(float x) { 
    x = min(1., x);
    return vec3( sin(x*6.28/4.), x*x, mix(sin(x*6.28),x,.6) );
}

// Original CUDA implementation: https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/main/cuda_rasterizer/forward.cu#L263
void main() {

    // discard splats with wrong objectId
    if (selectedObjectRenderMode == 1u && objId != selectedObjectId) {
        discard;
    }

    // highlight selected object
    vec3 color = splat_color;
    if (selectedObjectRenderMode == 2u && objId == selectedObjectId) {
      color = mix(splat_color, vec3(1.0, 0.0, 0.0), 0.1*mod(time + gl_FragCoord.x/10.0 + gl_FragCoord.y/10.0, 1.0));
    }

    // Resample using conic matrix (cf. "Surface 
    // Splatting" by Zwicker et al., 2001)
    vec2 d = xy - pixf;
    float power = -0.5 * (con_o.x * d.x * d.x + con_o.z * d.y * d.y) - con_o.y * d.x * d.y;

    if (power > 0.) {
        discard;
    }

    // (Custom) As the covariance matrix is calculated in a one-time operation on CPU in this implementation,
    // we need to apply the scale modifier differently to still allow for real-time scaling of the splats.
    power *= scale_modif;

    // Eq. (2) from 3D Gaussian splatting paper.
    float alpha = min(.99f, con_o.w * exp(power));
    
    if (alpha < 1./255.) {
        discard;
    }

    float col_alpha = alpha;

    // with depth we want to avoid including the depth value of faint splats
    float depth_alpha = alpha*float(alpha > 50./255.);

    // Eq. (3) from 3D Gaussian splatting paper.
    fragColor = vec4(color * col_alpha, col_alpha);
    fragInvDepth = vec4(vec3(1.0/depth) * depth_alpha, depth_alpha);
}`,G=(e,t)=>{e[t+0]=-e[t+0],e[t+4]=-e[t+4],e[t+8]=-e[t+8],e[t+12]=-e[t+12]},K=e=>{let t=S(e);return G(t,2),t},q=e=>S(e),J=class{constructor(e){this.sortWorkerBusy=!1,this.lastSortedViewProjMatrix=null,this.sceneGraph=new Map,this.processed_scenegraph=null,this.needs_rebuild=!0,this.get_xsize=()=>this.xsize,this.get_ysize=()=>this.ysize,this.getObject=e=>this.sceneGraph.get(e),this.addObject=(e,t,n,r,i)=>{this.sceneGraph.set(e,{translation:t,rotation:n,object:i,scale:r}),this.needs_rebuild=!0},this.setPositionObject=(e,t)=>{let n=this.sceneGraph.get(e);if(n===void 0)throw Error(`Object with id ${e} does not exist`);n.translation=t,this.needs_rebuild=!0},this.setRotationObject=(e,t)=>{let n=this.sceneGraph.get(e);if(n===void 0)throw Error(`Object with id ${e} does not exist`);n.rotation=t,this.needs_rebuild=!0},this.setScaleObject=(e,t)=>{let n=this.sceneGraph.get(e);if(n===void 0)throw Error(`Object with id ${e} does not exist`);n.scale=t,this.needs_rebuild=!0},this.removeObject=e=>{this.sceneGraph.delete(e),this.needs_rebuild=!0},this.doWorkerSort=e=>{this.sortWorkerBusy=!0,this.lastSortedViewProjMatrix=e,this.sortWorker.postMessage({viewMatrix:this.lastSortedViewProjMatrix,sortingAlgorithm:`count sort`,sceneGraph:this.sceneGraph})},this.recieveUpdatedGaussianData=e=>{let t=(e,t)=>{this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bufferData(this.gl.ARRAY_BUFFER,t,this.gl.STATIC_DRAW)};t(this.buffers.color,e.colors),t(this.buffers.center,e.positions),t(this.buffers.opacity,e.opacities),t(this.buffers.covA,e.cov3Da),t(this.buffers.covB,e.cov3Db),t(this.buffers.objId,e.objectIds),this.processed_scenegraph=e},this.renderDepths=e=>{let t=new Map;this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.useProgram(this.program),this.gl.disable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.ONE_MINUS_DST_ALPHA,this.gl.ONE),this.gl.bindVertexArray(this.vao);let n=this.xsize,r=this.ysize,i=Math.tan(e.fov()*.5),a=i*n/r,o=r/(2*i),s=n/(2*a),c=e.viewMatrix(),l=e.viewProjMatrix(n,r);this.gl.uniform1f(this.wLoc,n),this.gl.uniform1f(this.hLoc,r),this.gl.uniform1f(this.focalXLoc,s),this.gl.uniform1f(this.focalYLoc,o),this.gl.uniform1f(this.tanFovXLoc,a),this.gl.uniform1f(this.tanFovYLoc,i),this.gl.uniform1f(this.scaleModifierLoc,1),this.gl.uniformMatrix4fv(this.viewMatrixLoc,!1,K(c)),this.gl.uniformMatrix4fv(this.projMatrixLoc,!1,q(l)),this.gl.uniform1ui(this.selectedObjectRenderModeLoc,1),this.gl.uniform1f(this.timeLoc,performance.now()/1e3);for(let e of this.sceneGraph.keys()){let i=new Float32Array(n*r*4);this.gl.uniform1ui(this.selectedObjectIdLoc,e),this.processed_scenegraph&&(this.gl.uniform3fv(this.boxMinLoc,this.processed_scenegraph.sceneMin),this.gl.uniform3fv(this.boxMaxLoc,this.processed_scenegraph.sceneMax),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0,this.gl.COLOR_ATTACHMENT1]),this.gl.drawArraysInstanced(this.gl.TRIANGLE_STRIP,0,4,this.processed_scenegraph.count),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT1),this.gl.readPixels(0,0,n,r,this.gl.RGBA,this.gl.FLOAT,i)),t.set(e,i)}return t},this.render=(e,t)=>{this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.disable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.ONE_MINUS_DST_ALPHA,this.gl.ONE),this.gl.bindVertexArray(this.vao);let n=this.xsize,r=this.ysize,i=Math.tan(e.fov()*.5),a=i*n/r,o=r/(2*i),s=n/(2*a),c=e.viewMatrix(),l=e.viewProjMatrix(n,r);t===null?(this.gl.uniform1ui(this.selectedObjectIdLoc,0),this.gl.uniform1ui(this.selectedObjectRenderModeLoc,0)):(this.gl.uniform1ui(this.selectedObjectIdLoc,t),this.gl.uniform1ui(this.selectedObjectRenderModeLoc,2)),this.gl.uniform1f(this.wLoc,n),this.gl.uniform1f(this.hLoc,r),this.gl.uniform1f(this.focalXLoc,s),this.gl.uniform1f(this.focalYLoc,o),this.gl.uniform1f(this.tanFovXLoc,a),this.gl.uniform1f(this.tanFovYLoc,i),this.gl.uniform1f(this.scaleModifierLoc,1),this.gl.uniformMatrix4fv(this.viewMatrixLoc,!1,K(c)),this.gl.uniformMatrix4fv(this.projMatrixLoc,!1,q(l)),this.gl.uniform1f(this.timeLoc,performance.now()/1e3),this.processed_scenegraph&&(this.gl.uniform3fv(this.boxMinLoc,this.processed_scenegraph.sceneMin),this.gl.uniform3fv(this.boxMaxLoc,this.processed_scenegraph.sceneMax),this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0,this.gl.COLOR_ATTACHMENT1]),this.gl.drawArraysInstanced(this.gl.TRIANGLE_STRIP,0,4,this.processed_scenegraph.count))},this.update=e=>{let t=this.needs_rebuild,n=e.viewProjMatrix(this.gl.canvas.width,this.gl.canvas.height);this.processed_scenegraph&&this.lastSortedViewProjMatrix&&x(p(c(),n,this.lastSortedViewProjMatrix))>.1&&(t=!0),t&&!this.sortWorkerBusy&&(this.doWorkerSort(n),this.needs_rebuild=!1)},this.cleanup=()=>{this.sortWorker.terminate(),this.gl.deleteFramebuffer(this.fbo),this.gl.deleteTexture(this.col_tex),this.gl.deleteTexture(this.inv_depth_tex),this.gl.deleteProgram(this.program),this.gl.deleteBuffer(this.buffers.color),this.gl.deleteBuffer(this.buffers.center),this.gl.deleteBuffer(this.buffers.opacity),this.gl.deleteBuffer(this.buffers.covA),this.gl.deleteBuffer(this.buffers.covB),this.gl.deleteBuffer(this.buffers.objId)},this.gl=e,this.program=k(this.gl,[O(this.gl,this.gl.VERTEX_SHADER,U),O(this.gl,this.gl.FRAGMENT_SHADER,W)]),this.gl.useProgram(this.program);let t=(e,t,n)=>{let r=this.gl.getAttribLocation(this.program,e),i=this.gl.createBuffer();if(L(i!==null,`Failed to create buffer`),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i),this.gl.enableVertexAttribArray(r),t===this.gl.UNSIGNED_INT)this.gl.vertexAttribIPointer(r,n,t,0,0);else if(t===this.gl.FLOAT)this.gl.vertexAttribPointer(r,n,t,!1,0,0);else throw Error(`ptr_type not supported`);return this.gl.vertexAttribDivisor(r,1),i};this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.buffers={color:t(`a_col`,this.gl.FLOAT,3),center:t(`a_center`,this.gl.FLOAT,3),opacity:t(`a_opacity`,this.gl.FLOAT,1),covA:t(`a_covA`,this.gl.FLOAT,3),covB:t(`a_covB`,this.gl.FLOAT,3),objId:t(`a_objId`,this.gl.UNSIGNED_INT,1)},this.wLoc=this.gl.getUniformLocation(this.program,`W`),this.hLoc=this.gl.getUniformLocation(this.program,`H`),this.focalXLoc=this.gl.getUniformLocation(this.program,`focal_x`),this.focalYLoc=this.gl.getUniformLocation(this.program,`focal_y`),this.tanFovXLoc=this.gl.getUniformLocation(this.program,`tan_fovx`),this.tanFovYLoc=this.gl.getUniformLocation(this.program,`tan_fovy`),this.scaleModifierLoc=this.gl.getUniformLocation(this.program,`scale_modifier`),this.projMatrixLoc=this.gl.getUniformLocation(this.program,`projmatrix`),this.viewMatrixLoc=this.gl.getUniformLocation(this.program,`viewmatrix`),this.boxMinLoc=this.gl.getUniformLocation(this.program,`boxmin`),this.boxMaxLoc=this.gl.getUniformLocation(this.program,`boxmax`),this.timeLoc=this.gl.getUniformLocation(this.program,`time`),this.selectedObjectRenderModeLoc=this.gl.getUniformLocation(this.program,`selectedObjectRenderMode`),this.selectedObjectIdLoc=this.gl.getUniformLocation(this.program,`selectedObjectId`),this.xsize=this.gl.canvas.width,this.ysize=this.gl.canvas.height,this.fbo=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.col_tex=A(this.gl,this.xsize,this.ysize),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.col_tex,0),this.inv_depth_tex=j(this.gl,this.xsize,this.ysize,new Float32Array(this.xsize*this.ysize*4)),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT1,this.gl.TEXTURE_2D,this.inv_depth_tex,0),this.sortWorker=new Worker(new URL(`/assets/sortWorker-9DqLaQR6.js`,``+import.meta.url),{type:`module`}),this.sortWorker.onmessage=e=>{this.sortWorkerBusy=!1,this.recieveUpdatedGaussianData(e.data.data)}}},Y=`#version 300 es
layout(location=0) in vec3 a_position;
layout(location=1) in vec3 a_color;

uniform mat4 u_view;
uniform mat4 u_view_proj;

out vec3 v_color;
out float v_depth;

void main() {
  vec4 pos = u_view * vec4(a_position, 1);
  v_depth = pos.z/pos.w;
  v_color = a_color;
  gl_Position = u_view_proj * vec4(a_position, 1);
}`,X=`#version 300 es
precision highp float;

in vec3 v_color;
in float v_depth;

layout(location = 0) out vec4 outColor;
layout(location = 1) out vec4 outInvDepth;

void main() {
  outColor = vec4(v_color, 1);
  outInvDepth = vec4(vec3(1.0/v_depth), 1);
}`,Z=class{constructor(e){this.get_xsize=()=>this.xsize,this.get_ysize=()=>this.ysize,this.objects=new Map,this.needs_rebuild=!0,this.buildBuffers=e=>{let t=e.reduce((e,t)=>e+t.vertexes.length,0),n=new Float32Array(t*3),r=new Float32Array(t*3),i=0;for(let t of e){let e=b(c(),t.rotation,t.translation,u(t.scale,t.scale,t.scale));for(let a of t.vertexes)n.set(y(m(),a.position,e),i*3),r.set(a.color,i*3),i+=1}return[n,r,t]},this.update=()=>{if(this.needs_rebuild){let e=[],t=[];for(let n of this.objects.values())n.kind===`triangle`?e.push(n):n.kind===`line`&&t.push(n);let[n,r,i]=this.buildBuffers(e),[a,o,s]=this.buildBuffers(t);this.gl.bindVertexArray(this.tri_vao),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tri_positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,n,this.gl.STATIC_DRAW),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tri_colorBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,r,this.gl.STATIC_DRAW),this.tri_n_vertexes=i,this.gl.bindVertexArray(this.line_vao),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.line_positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,a,this.gl.STATIC_DRAW),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.line_colorBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,o,this.gl.STATIC_DRAW),this.line_n_vertexes=s,this.needs_rebuild=!1}},this.addObject=(e,t)=>{this.objects.set(e,t),this.needs_rebuild=!0},this.setPositionObject=(e,t)=>{let n=this.objects.get(e);if(n===void 0)throw Error(`Object with id ${e} does not exist`);n.translation=t,this.needs_rebuild=!0},this.setRotationObject=(e,t)=>{let n=this.objects.get(e);if(n===void 0)throw Error(`Object with id ${e} does not exist`);n.rotation=t,this.needs_rebuild=!0},this.setScaleObject=(e,t)=>{let n=this.objects.get(e);if(n===void 0)throw Error(`Object with id ${e} does not exist`);n.scale=t,this.needs_rebuild=!0},this.removeObject=e=>{this.objects.delete(e),this.needs_rebuild=!0},this.render=e=>{this.gl.disable(this.gl.BLEND),this.gl.enable(this.gl.DEPTH_TEST),this.gl.useProgram(this.program),this.gl.uniformMatrix4fv(this.viewLoc,!1,K(e.viewMatrix())),this.gl.uniformMatrix4fv(this.viewProjLoc,!1,q(e.viewProjMatrix(this.xsize,this.ysize))),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.gl.drawBuffers([this.gl.COLOR_ATTACHMENT0,this.gl.COLOR_ATTACHMENT1]),this.gl.clear(this.gl.DEPTH_BUFFER_BIT|this.gl.COLOR_BUFFER_BIT),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.bindVertexArray(this.tri_vao),this.gl.drawArrays(this.gl.TRIANGLES,0,this.tri_n_vertexes),this.gl.bindVertexArray(this.line_vao),this.gl.drawArrays(this.gl.LINES,0,this.line_n_vertexes)},this.gl=e,this.program=k(this.gl,[O(this.gl,this.gl.VERTEX_SHADER,Y),O(this.gl,this.gl.FRAGMENT_SHADER,X)]),this.gl.useProgram(this.program);let t=(e,t)=>{let n=this.gl.getAttribLocation(this.program,e),r=this.gl.createBuffer();return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,r),this.gl.enableVertexAttribArray(n),this.gl.vertexAttribPointer(n,t,this.gl.FLOAT,!1,0,0),r};this.tri_vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.tri_vao),this.tri_n_vertexes=0,this.tri_positionBuffer=t(`a_position`,3),this.tri_colorBuffer=t(`a_color`,3),this.line_vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.line_vao),this.line_n_vertexes=0,this.line_positionBuffer=t(`a_position`,3),this.line_colorBuffer=t(`a_color`,3),this.viewLoc=this.gl.getUniformLocation(this.program,`u_view`),this.viewProjLoc=this.gl.getUniformLocation(this.program,`u_view_proj`),this.xsize=this.gl.canvas.width,this.ysize=this.gl.canvas.height,this.fbo=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.fbo),this.col_tex=A(this.gl,this.xsize,this.ysize),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.col_tex,0),this.inv_depth_tex=j(this.gl,this.xsize,this.ysize,new Float32Array(this.xsize*this.ysize*4)),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT1,this.gl.TEXTURE_2D,this.inv_depth_tex,0),this.webgl_depth_tex=M(this.gl,this.xsize,this.ysize,new Float32Array(this.xsize*this.ysize)),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.webgl_depth_tex,0)}},Q=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}`,te=`#version 300 es
precision highp float;
precision highp sampler2D;

// texture 0
uniform sampler2D u_render_tex0;
uniform sampler2D u_inv_depth_tex0;
// texture 1
uniform sampler2D u_render_tex1;
uniform sampler2D u_inv_depth_tex1;

in vec2 v_texCoord;
out vec4 v_outColor;

void main() {
  float inv_depth0 = texture(u_inv_depth_tex0, v_texCoord).r;
  float inv_depth1 = texture(u_inv_depth_tex1, v_texCoord).r;

  if (inv_depth0 > inv_depth1) {
    v_outColor = texture(u_render_tex0, v_texCoord);
  } else {
    v_outColor = texture(u_render_tex1, v_texCoord);
  }
}`,$=class{constructor(e){this.render=(e,t,n,r)=>{this.gl.useProgram(this.program),this.gl.bindVertexArray(this.vao),this.gl.viewport(0,0,this.xsize,this.ysize),this.gl.uniform1i(this.renderTex0Loc,0),this.gl.uniform1i(this.invDepthTex0Loc,1),this.gl.uniform1i(this.renderTex1Loc,2),this.gl.uniform1i(this.invDepthTex1Loc,3),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,r),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.drawArrays(this.gl.TRIANGLES,0,6)},this.gl=e,this.program=k(this.gl,[O(this.gl,this.gl.VERTEX_SHADER,Q),O(this.gl,this.gl.FRAGMENT_SHADER,te)]),this.gl.useProgram(this.program);let t=(e,t)=>{let n=this.gl.getAttribLocation(this.program,e),r=this.gl.createBuffer();return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,r),this.gl.enableVertexAttribArray(n),this.gl.vertexAttribPointer(n,t,this.gl.FLOAT,!1,0,0),r};this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.positionBuffer=t(`a_position`,2),e.bufferData(e.ARRAY_BUFFER,H,e.STATIC_DRAW),this.renderTex0Loc=this.gl.getUniformLocation(this.program,`u_render_tex0`),this.invDepthTex0Loc=this.gl.getUniformLocation(this.program,`u_inv_depth_tex0`),this.renderTex1Loc=this.gl.getUniformLocation(this.program,`u_render_tex1`),this.invDepthTex1Loc=this.gl.getUniformLocation(this.program,`u_inv_depth_tex1`),this.xsize=this.gl.canvas.width,this.ysize=this.gl.canvas.height}},ne=`#version 300 es
in vec2 a_position;
out vec2 v_texCoord;

void main() {
  v_texCoord = a_position;

  // convert from 0->1 to 0->2
  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = (a_position * 2.0) - 1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}`,re=`#version 300 es
precision highp float;
precision highp sampler2D;

// the rendered texture
uniform sampler2D u_render_tex;

in vec2 v_texCoord;
out vec4 v_outColor;

void main() {
  v_outColor = vec4(texture(u_render_tex, v_texCoord).rgb, 1.0);
}`;function ie(e){switch(e){case`x`:return 0;case`y`:return 1;case`z`:return 2;default:throw Error(`Invalid axis`)}}function ae(e){switch(e){case`x`:return u(1,0,0);case`y`:return u(0,1,0);case`z`:return u(0,0,1);default:throw Error(`Invalid axis`)}}var oe=class extends E.Component{constructor(e){super(e),this.canvas=E.createRef(),this.gsEngineColorViz=E.createRef(),this.gsEngineDepthViz=E.createRef(),this.overlayEngineColorViz=E.createRef(),this.overlayEngineDepthViz=E.createRef(),this.fileInput=E.createRef(),this.interface_state={kind:`idle`},this.interface_inputs=[],this.setupVizCanvas=e=>{let t=e.getContext(`webgl2`),n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,H,t.STATIC_DRAW);let r=k(t,[O(t,t.VERTEX_SHADER,ne),O(t,t.FRAGMENT_SHADER,re)]),i=t.getAttribLocation(r,`a_position`);return t.enableVertexAttribArray(i),t.vertexAttribPointer(i,2,this.gl.FLOAT,!1,0,0),{gl:t,program:r,texLoc:t.getUniformLocation(r,`u_render_tex`),tex:A(t,this.props.width,this.props.height)}},this.visualizeTexture=(e,t)=>{let n=e.gl;n.useProgram(e.program),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.tex),n.uniform1i(e.texLoc,0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,this.props.width,this.props.height,0,n.RGBA,n.UNSIGNED_BYTE,t),n.clear(n.DEPTH_BUFFER_BIT|n.COLOR_BUFFER_BIT),n.drawArrays(n.TRIANGLES,0,6)},this.convertRGBA32Tex=e=>{let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=Math.floor(e[n]*255);return t},this.handleFileInputChange=async()=>{let e=this.fileInput.current?.files?.[0];e&&this.gsRendererEngine.addObject(Math.floor(Math.random()*4294967295),u(0,0,0),v(),1,I(await e.arrayBuffer()))},this.getNearestObjectAt=e=>{let t=Math.floor(e[0])+Math.floor(this.gsRendererEngine.get_ysize()-e[1])*this.gsRendererEngine.get_xsize(),n=this.gsRendererEngine.renderDepths(this.camera),r=0,i=null;for(let[e,a]of n){let n=a[4*t];n>r&&(r=n,i=e)}return i},this.animationLoop=()=>{this.camera.update(),this.gsRendererEngine.update(this.camera),this.overlayEngine.update();for(let e of this.interface_inputs)switch(e.kind){case`mouseclick`:switch(this.interface_state.kind){case`idle`:{let t=this.getNearestObjectAt(e.location);t!==null&&(this.interface_state={kind:`selected_object_interface`,selected_object_id:t,selected_object_state:{kind:`idle`},last_mouse_pos:e.location});break}case`selected_object_interface`:{let t=this.getNearestObjectAt(e.location);t===this.interface_state.selected_object_id||t!==null&&(this.interface_state={kind:`selected_object_interface`,selected_object_id:t,selected_object_state:{kind:`idle`},last_mouse_pos:e.location});break}}break;case`keydown`:if(this.interface_state.kind===`selected_object_interface`)switch(e.key){case`r`:{this.interface_state.selected_object_state={kind:`rotate`},this.overlayEngine.removeObject(this.interface_state.selected_object_id);let e=this.gsRendererEngine.getObject(this.interface_state.selected_object_id);this.overlayEngine.addObject(this.interface_state.selected_object_id,{kind:`line`,translation:e.translation,rotation:e.rotation,scale:e.scale,vertexes:B(4)});break}case`g`:{this.interface_state.selected_object_state={kind:`translate`},this.overlayEngine.removeObject(this.interface_state.selected_object_id);let e=this.gsRendererEngine.getObject(this.interface_state.selected_object_id);this.overlayEngine.addObject(this.interface_state.selected_object_id,{kind:`line`,translation:e.translation,rotation:v(),scale:e.scale,vertexes:B(4)});break}case`s`:{this.interface_state.selected_object_state={kind:`scale`,mouse_start:this.interface_state.last_mouse_pos,scale_start:1},this.overlayEngine.removeObject(this.interface_state.selected_object_id);let e=this.gsRendererEngine.getObject(this.interface_state.selected_object_id);this.overlayEngine.addObject(this.interface_state.selected_object_id,{kind:`line`,translation:e.translation,rotation:v(),scale:e.scale,vertexes:B(4)});break}case`x`:case`y`:case`z`:{let t=e.key;this.interface_state.selected_object_state.kind===`rotate`?this.interface_state.selected_object_state={kind:`rotate_with_axis`,axis:t,quat_start:this.gsRendererEngine.getObject(this.interface_state.selected_object_id).rotation,mouse_start:this.interface_state.last_mouse_pos}:this.interface_state.selected_object_state.kind===`translate`&&(this.interface_state.selected_object_state={kind:`translate_with_axis`,axis:t,pos_start:this.gsRendererEngine.getObject(this.interface_state.selected_object_id).translation,mouse_start:this.interface_state.last_mouse_pos});break}case`Escape`:switch(this.interface_state.selected_object_state.kind){case`scale`:case`rotate_with_axis`:case`translate_with_axis`:case`rotate`:case`translate`:this.interface_state.selected_object_state={kind:`idle`},this.overlayEngine.removeObject(this.interface_state.selected_object_id);break;case`idle`:this.interface_state={kind:`idle`}}break;default:console.log(`unhandled key`,e.key)}break;case`mousemove`:if(this.interface_state.kind===`selected_object_interface`)switch(this.interface_state.last_mouse_pos=e.location,this.interface_state.selected_object_state.kind){case`rotate_with_axis`:if(this.interface_state.selected_object_state.axis!==null){let t=w(T(),e.location,this.interface_state.selected_object_state.mouse_start),n=s(v(),ae(this.interface_state.selected_object_state.axis),t[0]*.02);this.gsRendererEngine.setRotationObject(this.interface_state.selected_object_id,_(v(),this.interface_state.selected_object_state.quat_start,n)),this.overlayEngine.setRotationObject(this.interface_state.selected_object_id,_(v(),this.interface_state.selected_object_state.quat_start,n))}break;case`translate_with_axis`:if(this.interface_state.selected_object_state.axis!==null){let t=w(T(),e.location,this.interface_state.selected_object_state.mouse_start),n=l(this.interface_state.selected_object_state.pos_start);n[ie(this.interface_state.selected_object_state.axis)]+=t[0]*.01,this.gsRendererEngine.setPositionObject(this.interface_state.selected_object_id,n),this.overlayEngine.setPositionObject(this.interface_state.selected_object_id,n)}break;case`scale`:{let t=w(T(),e.location,this.interface_state.selected_object_state.mouse_start),n=this.interface_state.selected_object_state.scale_start+t[0]*.01;this.gsRendererEngine.setScaleObject(this.interface_state.selected_object_id,n),this.overlayEngine.setScaleObject(this.interface_state.selected_object_id,n);break}}}this.interface_inputs=[];let e=this.interface_state.kind===`selected_object_interface`?this.interface_state.selected_object_id:null;this.gsRendererEngine.render(this.camera,e);let t=new Uint8Array(this.gsRendererEngine.get_xsize()*this.gsRendererEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.gsRendererEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT0),this.gl.readPixels(0,0,this.gsRendererEngine.get_xsize(),this.gsRendererEngine.get_ysize(),this.gl.RGBA,this.gl.UNSIGNED_BYTE,t);let n=new Float32Array(this.gsRendererEngine.get_xsize()*this.gsRendererEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.gsRendererEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT1),this.gl.readPixels(0,0,this.gsRendererEngine.get_xsize(),this.gsRendererEngine.get_ysize(),this.gl.RGBA,this.gl.FLOAT,n),this.visualizeTexture(this.gsColorVizData,t),this.visualizeTexture(this.gsDepthVizData,this.convertRGBA32Tex(n)),this.overlayEngine.render(this.camera);let r=new Uint8Array(this.overlayEngine.get_xsize()*this.overlayEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.overlayEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT0),this.gl.readPixels(0,0,this.overlayEngine.get_xsize(),this.overlayEngine.get_ysize(),this.gl.RGBA,this.gl.UNSIGNED_BYTE,r);let i=new Float32Array(this.overlayEngine.get_xsize()*this.overlayEngine.get_ysize()*4);this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.overlayEngine.fbo),this.gl.readBuffer(this.gl.COLOR_ATTACHMENT1),this.gl.readPixels(0,0,this.overlayEngine.get_xsize(),this.overlayEngine.get_ysize(),this.gl.RGBA,this.gl.FLOAT,i),this.visualizeTexture(this.overlayColorVizData,r),this.visualizeTexture(this.overlayDepthVizData,this.convertRGBA32Tex(i)),this.compositor.render(this.gsRendererEngine.col_tex,this.gsRendererEngine.inv_depth_tex,this.overlayEngine.col_tex,this.overlayEngine.inv_depth_tex),this.requestID=window.requestAnimationFrame(this.animationLoop)}}componentDidMount(){let e=this.canvas.current;this.camera=new F(e,{rotation:h(v(),0,.001,0)}),this.gl=e.getContext(`webgl2`),this.gl.getExtension(`EXT_color_buffer_float`),this.gl.getExtension(`EXT_float_blend`),this.gsRendererEngine=new J(this.gl),this.overlayEngine=new Z(this.gl),this.compositor=new $(this.gl),this.gsColorVizData=this.setupVizCanvas(this.gsEngineColorViz.current),this.gsDepthVizData=this.setupVizCanvas(this.gsEngineDepthViz.current),this.overlayColorVizData=this.setupVizCanvas(this.overlayEngineColorViz.current),this.overlayDepthVizData=this.setupVizCanvas(this.overlayEngineDepthViz.current),this.cmt=new z(e),this.cmt.addMouseClickListener(e=>this.interface_inputs.push({kind:`mouseclick`,location:e})),this.cmt.addMouseMoveListener(e=>this.interface_inputs.push({kind:`mousemove`,location:e})),this.cmt.addKeyDownListener(e=>this.interface_inputs.push({kind:`keydown`,key:e})),this.requestID=window.requestAnimationFrame(this.animationLoop)}componentWillUnmount(){window.cancelAnimationFrame(this.requestID),this.camera.cleanup()}render(){return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`canvas`,{tabIndex:0,style:this.props.style,className:this.props.className,ref:this.canvas,height:this.props.height,width:this.props.width}),(0,V.jsx)(`br`,{}),(0,V.jsx)(`canvas`,{style:this.props.style,className:this.props.className,ref:this.gsEngineColorViz,height:this.props.height,width:this.props.width}),(0,V.jsx)(`canvas`,{style:this.props.style,className:this.props.className,ref:this.gsEngineDepthViz,height:this.props.height,width:this.props.width}),(0,V.jsx)(`canvas`,{style:this.props.style,className:this.props.className,ref:this.overlayEngineColorViz,height:this.props.height,width:this.props.width}),(0,V.jsx)(`canvas`,{style:this.props.style,className:this.props.className,ref:this.overlayEngineDepthViz,height:this.props.height,width:this.props.width}),(0,V.jsx)(`input`,{ref:this.fileInput,type:`file`,accept:`.ply`,onChange:this.handleFileInputChange})]})}};D.createRoot(document.getElementById(`root`)).render((0,V.jsx)(E.StrictMode,{children:(0,V.jsx)(oe,{width:400,height:400})}));